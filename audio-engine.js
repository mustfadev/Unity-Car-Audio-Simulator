/**
 * Unity Car Audio Simulator - Web Audio Engine
 * Provides pitch modulation, multi-clip crossfading, procedural engine synth fallback,
 * and seamless loop testing corresponding to Unity's AudioSource behavior.
 */

class CarAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.analyser = null;

    // Audio Buffers
    this.buffers = {
      accel: null,
      idle: null,
      start: null,
      pop: null
    };

    // Active Source Nodes
    this.sources = {
      accel: null,
      idle: null
    };

    // Gain Nodes for Crossfading
    this.gains = {
      accel: null,
      idle: null,
      limiter: null
    };

    // Engine State
    this.isRunning = false;
    this.isLimiterActive = false;
    this.useSynth = false;
    this.isLoopTesting = false;

    // Synth Nodes
    this.synth = {
      osc1: null,
      osc2: null,
      subOsc: null,
      noiseNode: null,
      filter: null,
      tonePreset: 'v6'
    };

    // Formula Mode matching user's Unity project
    this.formulaMode = 'networkVehicle'; // 'networkVehicle' | 'msAdapter' | 'standardRpm'

    // Realtime smoothed values (Unity dt * 8f smoothing)
    this.currentSmoothedPitch = 0.55;
    this.currentSmoothedVolume = 0.12;

    // Settings matching user's Unity project (NetworkVehicleController.cs)
    this.settings = {
      minPitch: 0.55,
      maxPitch: 2.80,
      minVol: 0.12,
      maxVol: 1.00,
      idleRpm: 850,
      maxRpm: 7500,
      maxSpeedKmH: 180
    };

    // Limiter stutter timer
    this.limiterPulse = 0;
  }

  // Initialize Web Audio Context on first interaction
  init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContextClass();

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.9, this.ctx.currentTime);

    // Limiter Cutoff Gate
    this.gains.limiter = this.ctx.createGain();
    this.gains.limiter.gain.setValueAtTime(1.0, this.ctx.currentTime);

    // Analyser Node for Visualizer
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 512;
    this.analyser.smoothingTimeConstant = 0.8;

    // Connect: Limiter -> Master -> Analyser -> Destination
    this.gains.limiter.connect(this.masterGain);
    this.masterGain.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);
  }

  async resumeContext() {
    this.init();
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
  }

  // Decode uploaded audio file (Supports MP3, WAV, OGG, AAC)
  async loadAudioFile(slotKey, file) {
    await this.resumeContext();
    try {
      const arrayBuffer = await file.arrayBuffer();
      // Slice arrayBuffer to prevent detachment issues in some browsers
      const bufferCopy = arrayBuffer.slice(0);
      
      const decoded = await new Promise((resolve, reject) => {
        this.ctx.decodeAudioData(bufferCopy, resolve, (err) => {
          reject(err || new Error('تعذر فك ترميز ملف الصوت'));
        });
      });

      this.buffers[slotKey] = decoded;
      return { success: true, duration: decoded.duration, sampleRate: decoded.sampleRate };
    } catch (err) {
      console.error('Audio decode error:', err);
      return { success: false, error: err.message || 'الملف تالف أو صيغته غير مدعومة' };
    }
  }

  // Start engine audio
  async startEngine() {
    await this.resumeContext();
    if (this.isRunning) return;
    this.isRunning = true;

    // Play Engine Start sound (one-shot) if available
    if (this.buffers.start) {
      this.playOneShot(this.buffers.start, 0.9);
    }

    if (this.useSynth || (!this.buffers.accel && !this.buffers.idle)) {
      this.startSynth();
    } else {
      this.startCustomClips();
    }
  }

  // Stop engine audio
  stopEngine() {
    if (!this.isRunning) return;
    this.isRunning = false;
    this.stopCustomClips();
    this.stopSynth();
  }

  // Setup Unity-style AudioSource looping nodes
  startCustomClips() {
    this.stopCustomClips();
    if (!this.ctx) return;

    // Primary Accel / Engine Loop Node
    if (this.buffers.accel) {
      this.sources.accel = this.ctx.createBufferSource();
      this.sources.accel.buffer = this.buffers.accel;
      this.sources.accel.loop = true;

      this.gains.accel = this.ctx.createGain();
      this.gains.accel.gain.setValueAtTime(this.currentSmoothedVolume, this.ctx.currentTime);
      this.sources.accel.connect(this.gains.accel);
      this.gains.accel.connect(this.gains.limiter);

      this.sources.accel.start(0);
    }

    // Secondary Idle Loop Node (if supplied for crossfading)
    if (this.buffers.idle) {
      this.sources.idle = this.ctx.createBufferSource();
      this.sources.idle.buffer = this.buffers.idle;
      this.sources.idle.loop = true;

      this.gains.idle = this.ctx.createGain();
      this.gains.idle.gain.setValueAtTime(1.0, this.ctx.currentTime);
      this.sources.idle.connect(this.gains.idle);
      this.gains.idle.connect(this.gains.limiter);

      this.sources.idle.start(0);
    }
  }

  stopCustomClips() {
    try {
      if (this.sources.accel) {
        this.sources.accel.stop();
        this.sources.accel.disconnect();
        this.sources.accel = null;
      }
      if (this.sources.idle) {
        this.sources.idle.stop();
        this.sources.idle.disconnect();
        this.sources.idle = null;
      }
    } catch (e) {
      // Ignore already stopped
    }
  }

  // Play One-shot sound (e.g. Backfire, Starter)
  playOneShot(buffer, volume = 0.8) {
    if (!this.ctx || !buffer) return;
    const source = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();
    source.buffer = buffer;
    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    source.connect(gain);
    gain.connect(this.masterGain);
    source.start(0);
  }

  // Update Audio parameters based on current RPM, throttle, and speed
  // Implements the EXACT formulas from user's Unity project:
  // Assets/nigga/ThirdPersonShooter/Vehicles/NetworkVehicleController.cs
  // Assets/nigga/ThirdPersonShooter/Vehicles/MSNetworkVehicleAdapter.cs
  updateEngineParameters(currentRpm, throttle, isLimiter, speedKmH = 0, dt = 0.016) {
    if (!this.isRunning || !this.ctx) return { pitch: 1.0, volume: 0.0 };

    const { minPitch, maxPitch, minVol, maxVol, idleRpm, maxRpm, maxSpeedKmH } = this.settings;
    const rpmNorm = Math.min(1.0, Math.max(0.0, (currentRpm - idleRpm) / (maxRpm - idleRpm)));
    const speedRatio = Math.min(1.0, Math.max(0.0, speedKmH / maxSpeedKmH));
    const throttleAbs = Math.abs(throttle);

    let targetPitch = 1.0;
    let targetVol = 0.5;

    if (this.formulaMode === 'networkVehicle') {
      // EXACT FORMULA FROM NetworkVehicleController.cs:
      // float speedPitch = Mathf.Lerp(idlePitch, maxPitch, Mathf.Pow(speedRatio, 0.7f));
      // float throttlePitch = idlePitch + throttleAbs * (maxPitch * 0.65f - idlePitch);
      // float targetPitch = Mathf.Max(speedPitch, throttlePitch);
      const speedPitch = minPitch + (maxPitch - minPitch) * Math.pow(speedRatio, 0.7);
      const throttlePitch = minPitch + throttleAbs * (maxPitch * 0.65 - minPitch);
      targetPitch = Math.max(speedPitch, throttlePitch);

      // VOLUME FORMULA FROM NetworkVehicleController.cs:
      // float targetVol = Mathf.Lerp(idleVol, maxVol, throttleAbs * 0.7f + speedRatio * 0.3f);
      targetVol = minVol + (maxVol - minVol) * (throttleAbs * 0.7 + speedRatio * 0.3);

      // Unity Lerp smoothing: Mathf.Lerp(_engineAudioSource.pitch, targetPitch, dt * 8f);
      const smoothFactor = Math.min(1.0, dt * 8.0);
      this.currentSmoothedPitch += (targetPitch - this.currentSmoothedPitch) * smoothFactor;
      this.currentSmoothedVolume += (targetVol - this.currentSmoothedVolume) * smoothFactor;
    } else if (this.formulaMode === 'msAdapter') {
      // EXACT FORMULA FROM MSNetworkVehicleAdapter.cs:
      const audioRatio = Math.min(1.0, rpmNorm + throttleAbs * 0.25 + speedRatio * 0.15);
      targetPitch = minPitch + (maxPitch - minPitch) * audioRatio;
      targetVol = minVol + (maxVol - minVol) * (throttleAbs * 0.70 + speedRatio * 0.30);

      // Exponential smoothing: 1f - Mathf.Exp(-8f * dt)
      const expFactor = 1.0 - Math.exp(-8.0 * dt);
      this.currentSmoothedPitch += (targetPitch - this.currentSmoothedPitch) * expFactor;
      this.currentSmoothedVolume += (targetVol - this.currentSmoothedVolume) * expFactor;
    } else {
      // Standard Linear RPM Lerp
      targetPitch = minPitch + (maxPitch - minPitch) * rpmNorm;
      targetVol = minVol + (maxVol - minVol) * (0.4 + throttleAbs * 0.6);
      this.currentSmoothedPitch = targetPitch;
      this.currentSmoothedVolume = targetVol;
    }

    const finalPitch = Math.max(0.1, this.currentSmoothedPitch);
    const finalVolume = Math.max(0.0, Math.min(1.5, this.currentSmoothedVolume));

    // Stutter limiter handling (Cut sound rapidly when rev limiter hits)
    if (isLimiter) {
      this.limiterPulse++;
      const stutterGain = (this.limiterPulse % 4 < 2) ? 0.05 : 1.0;
      this.gains.limiter.gain.setValueAtTime(stutterGain, this.ctx.currentTime);

      // Play limiter pop sound occasionally
      if (this.limiterPulse % 6 === 0 && this.buffers.pop) {
        this.playOneShot(this.buffers.pop, 0.7);
      }
    } else {
      this.gains.limiter.gain.setValueAtTime(1.0, this.ctx.currentTime);
    }

    // Apply to Custom Clips (MP3 / WAV)
    if (this.sources.accel) {
      // Unity: AudioSource.pitch = finalPitch
      this.sources.accel.playbackRate.setValueAtTime(finalPitch, this.ctx.currentTime);

      if (this.buffers.idle && this.gains.idle) {
        // Multi-clip crossfade: idle fades down as RPM rises, accel fades up
        const idleVol = Math.max(0.0, 1.0 - rpmNorm * 2.0) * minVol * 1.5;
        this.gains.idle.gain.setValueAtTime(idleVol, this.ctx.currentTime);
        this.gains.accel.gain.setValueAtTime(finalVolume, this.ctx.currentTime);
      } else if (this.gains.accel) {
        // Single clip mode (like NetworkVehicleController.cs):
        this.gains.accel.gain.setValueAtTime(finalVolume, this.ctx.currentTime);
      }
    }

    // Apply to Synth Mode
    if (this.useSynth || (!this.buffers.accel && !this.buffers.idle)) {
      this.updateSynth(currentRpm, throttle, rpmNorm);
      if (this.synth.gainNode) {
        this.synth.gainNode.gain.setValueAtTime(finalVolume * 0.45, this.ctx.currentTime);
      }
    }

    return {
      pitch: finalPitch.toFixed(2),
      volume: finalVolume.toFixed(2)
    };
  }

  // Built-in Procedural Engine Sound Synthesizer
  startSynth() {
    this.stopSynth();
    if (!this.ctx) return;

    // Harmonic Oscillators for Engine Cylinders
    this.synth.osc1 = this.ctx.createOscillator();
    this.synth.osc2 = this.ctx.createOscillator();
    this.synth.subOsc = this.ctx.createOscillator();

    this.synth.osc1.type = 'sawtooth';
    this.synth.osc2.type = 'triangle';
    this.synth.subOsc.type = 'sine';

    // Filter to simulate intake / exhaust resonance
    this.synth.filter = this.ctx.createBiquadFilter();
    this.synth.filter.type = 'lowpass';
    this.synth.filter.frequency.setValueAtTime(450, this.ctx.currentTime);
    this.synth.filter.Q.setValueAtTime(3.5, this.ctx.currentTime);

    // Synth Gain
    this.synth.gainNode = this.ctx.createGain();
    this.synth.gainNode.gain.setValueAtTime(0.35, this.ctx.currentTime);

    // Connect synth chain
    this.synth.osc1.connect(this.synth.filter);
    this.synth.osc2.connect(this.synth.filter);
    this.synth.subOsc.connect(this.synth.gainNode);
    this.synth.filter.connect(this.synth.gainNode);
    this.synth.gainNode.connect(this.gains.limiter);

    this.synth.osc1.start();
    this.synth.osc2.start();
    this.synth.subOsc.start();
  }

  updateSynth(rpm, throttle, rpmNorm) {
    if (!this.synth.osc1) return;

    // Cylinder firing rate calculation
    // Cylinders: V6 = 3 pulses/rev, I4 = 2 pulses/rev, V8 = 4 pulses/rev
    let pulsesPerRev = 3.0; // V6 default
    if (this.synth.tonePreset === 'i4') pulsesPerRev = 2.0;
    if (this.synth.tonePreset === 'v8') pulsesPerRev = 4.0;

    const baseFreq = (rpm / 60) * (pulsesPerRev / 2);
    const time = this.ctx.currentTime;

    this.synth.osc1.frequency.setValueAtTime(Math.max(20, baseFreq), time);
    this.synth.osc2.frequency.setValueAtTime(Math.max(30, baseFreq * 1.5), time);
    this.synth.subOsc.frequency.setValueAtTime(Math.max(15, baseFreq * 0.5), time);

    // Filter opens up as throttle is pressed (engine roar)
    const filterFreq = 300 + (rpmNorm * 2200) + (throttle * 1200);
    this.synth.filter.frequency.setValueAtTime(filterFreq, time);
  }

  stopSynth() {
    try {
      if (this.synth.osc1) {
        this.synth.osc1.stop();
        this.synth.osc1.disconnect();
        this.synth.osc1 = null;
      }
      if (this.synth.osc2) {
        this.synth.osc2.stop();
        this.synth.osc2.disconnect();
        this.synth.osc2 = null;
      }
      if (this.synth.subOsc) {
        this.synth.subOsc.stop();
        this.synth.subOsc.disconnect();
        this.synth.subOsc = null;
      }
      if (this.synth.gainNode) {
        this.synth.gainNode.disconnect();
        this.synth.gainNode = null;
      }
    } catch (e) {
      // ignore
    }
  }

  // Test loop seamlessness (plays clip at normal pitch in loop)
  toggleTestLoop(bufferKey = 'accel') {
    if (this.isLoopTesting) {
      this.stopTestLoop();
      return false;
    }

    const buffer = this.buffers[bufferKey];
    if (!buffer) return false;

    this.resumeContext();
    this.testLoopSource = this.ctx.createBufferSource();
    this.testLoopSource.buffer = buffer;
    this.testLoopSource.loop = true;
    this.testLoopGain = this.ctx.createGain();
    this.testLoopGain.gain.setValueAtTime(0.85, this.ctx.currentTime);

    this.testLoopSource.connect(this.testLoopGain);
    this.testLoopGain.connect(this.analyser);
    this.testLoopSource.start(0);
    this.isLoopTesting = true;
    return true;
  }

  stopTestLoop() {
    if (this.testLoopSource) {
      try {
        this.testLoopSource.stop();
        this.testLoopSource.disconnect();
      } catch (e) {}
      this.testLoopSource = null;
    }
    this.isLoopTesting = false;
  }

  // Trigger Exhaust Pop / Blowoff on sudden throttle drop
  triggerBackfire() {
    if (this.buffers.pop) {
      this.playOneShot(this.buffers.pop, 0.85);
    } else if (this.ctx && this.isRunning) {
      // Synth procedural pop
      const popOsc = this.ctx.createOscillator();
      const popGain = this.ctx.createGain();
      popOsc.type = 'triangle';
      popOsc.frequency.setValueAtTime(120, this.ctx.currentTime);
      popOsc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.12);

      popGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
      popGain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);

      popOsc.connect(popGain);
      popGain.connect(this.masterGain);
      popOsc.start();
      popOsc.stop(this.ctx.currentTime + 0.12);
    }
  }
}
