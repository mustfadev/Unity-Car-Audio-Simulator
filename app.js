/**
 * Unity Car Audio Simulator - UI & Physics Controller
 * Monochrome Black & White Edition with Bilingual Support (EN / AR)
 * GitHub Pages Ready
 */

document.addEventListener('DOMContentLoaded', () => {
  // Instances
  const audio = new CarAudioEngine();

  // ==========================================
  // Bilingual (i18n) Dictionary
  // ==========================================
  const translations = {
    en: {
      appTitle: "Unity Car Audio Simulator",
      appSubtitle: "Gas Pedal Physics, RPM Pitch Modulation & Audio Loop Tester for Unity",
      engineOff: "ENGINE OFF",
      engineRunning: "ENGINE RUNNING",
      ignitionBtn: "ENGINE<br>START / STOP",
      spaceHint: "[SPACE]",
      tachoTitle: "RPM Tachometer & Telemetry",
      limiterBadge: "REV LIMITER",
      formulaLabel: "Applied Audio Formula:",
      presetNetworkVehicle: "Your Project: NetworkVehicleController.cs (0.55x - 2.8x)",
      presetMsAdapter: "Your Project: MSNetworkVehicleAdapter.cs (Exponential Smooth)",
      presetStandard: "Standard Unity RPM Pitch Lerp",
      telemetryTitle: "Live Unity AudioSource Values:",
      throttleInput: "Throttle Input:",
      simSpeed: "Simulated Speed:",
      visualizerTitle: "Audio Waveform & Loop Continuity",
      loopReady: "Loop: Ready for MP3/WAV",
      loopPlaying: "Loop: CONTINUOUS REPEAT",
      pedalTitle: "Interactive Gas Pedal",
      pedalHint: "Hold <b>W</b>, <b>↑</b> or Click & Drag",
      dropHint: "📁 Drag & Drop any <b>MP3</b> or <b>WAV</b> file directly here to test!",
      pedalPress: "Click or Hold W to Rev",
      preciseThrottle: "Throttle Level Slider:",
      modeNeutral: "Neutral Revving",
      modeDrive: "Drive Gear Mode",
      audioConfigTitle: "Audio Setup & Tuning",
      tabCustom: "MP3 / WAV Files",
      tabSynth: "Built-in Synth",
      audioDesc: "Load your car sound clips to test loops and pitch variation. Touching the pedal automatically starts playback:",
      slotAccelTitle: "Engine Accel / Primary Loop",
      accelFilePlaceholder: "Drop an MP3 here or click Browse",
      browseBtn: "Browse",
      testLoopBtn: "Test Loop",
      stopTestLoopBtn: "Stop Loop",
      slotIdleTitle: "Idle Loop (Optional)",
      crossfadeBadge: "Crossfade",
      idleFilePlaceholder: "Plays at zero throttle (Optional)",
      slotStartTitle: "Engine Starter (One-Shot)",
      startFilePlaceholder: "Plays on engine ignition (Optional)",
      slotPopTitle: "Exhaust Pop / Turbo Blowoff",
      popBadge: "Release",
      popFilePlaceholder: "Triggers on quick throttle release",
      synthTitle: "Procedural Engine Sound Synthesizer",
      synthDesc: "Built-in Web Audio API engine generator that creates real multi-cylinder rumble and intake suction without any external audio files.",
      engineTone: "Engine Configuration:",
      unityCalibrationTitle: "Unity Pitch & RPM Calibration",
      btnExportCode: "📋 Export C# Script",
      paramMinPitch: "Min Pitch (Idle):",
      paramMaxPitch: "Max Pitch (Redline):",
      paramIdleRpm: "Idle RPM:",
      paramMaxRpm: "Redline RPM:",
      paramAttack: "RPM Attack (Rev Speed):",
      paramDecay: "RPM Decay (Engine Brake):",
      modalTitle: "Ready-to-Use Unity C# Script",
      modalDesc: "Copy and paste this script directly onto your car GameObject in Unity:",
      copyCodeBtn: "Copy Code to Clipboard",
      copiedSuccess: "✓ Copied to Clipboard!",
      footerText: "Unity Car Audio & Throttle Simulator | Open Source & GitHub Ready",
      keyW: "W",
      keyThrottle: "Throttle",
      keyIgnition: "Ignition",
      keyLoop: "Test Loop"
    },
    ar: {
      appTitle: "مختبر صوت محرك السيارة",
      appSubtitle: "محاكاة دعسة البنزين والـ Pitch Shift وفحص اللوب لمحرك Unity",
      engineOff: "المحرك متوقف (OFF)",
      engineRunning: "المحرك يعمل (RUNNING)",
      ignitionBtn: "ENGINE<br>START / STOP",
      spaceHint: "[مسافة]",
      tachoTitle: "عداد الـ RPM ولوحة القياس",
      limiterBadge: "قاطع الدوران (LIMITER)",
      formulaLabel: "معادلة الصوت المطبقة:",
      presetNetworkVehicle: "مشروعك: NetworkVehicleController.cs (0.55x - 2.8x)",
      presetMsAdapter: "مشروعك: MSNetworkVehicleAdapter.cs (Exponential Smooth)",
      presetStandard: "نمط يونتي التقليدي: Standard RPM Lerp",
      telemetryTitle: "قيم Unity AudioSource الآن (مطابقة لكودك):",
      throttleInput: "نسبة الدعسة:",
      simSpeed: "السرعة التقديرية:",
      visualizerTitle: "مخطط الموجات الصوتية واللوب المباشر",
      loopReady: "جاهز لاختبار MP3/WAV",
      loopPlaying: "اللوب: شغال متكرر",
      pedalTitle: "دعسة البنزين التفاعلية",
      pedalHint: "اضغط <b>W</b>، <b>↑</b> أو بالماوس",
      dropHint: "📁 اسحب وأفلت أي ملف <b>MP3</b> أو <b>WAV</b> هنا مباشرة لتجربته!",
      pedalPress: "اضغط بالماوس أو استخدم W للدعس",
      preciseThrottle: "تحكم دقيق بمستوى الدعسة (Slider):",
      modeNeutral: "وضع الفاضي (Neutral Revving)",
      modeDrive: "وضع القيادة والسرعة (Drive Mode)",
      audioConfigTitle: "ملفات الصوت وضبط يونتي",
      tabCustom: "ملفاتي (MP3 / WAV)",
      tabSynth: "المركب الآلي (Synth)",
      audioDesc: "اختر ملف صوت المحرك لتجربته مع الدعسة. لمس الدعسة يشغل الصوت تلقائياً:",
      slotAccelTitle: "صوت التسارع / محرك اللعبة الأساسي",
      accelFilePlaceholder: "اسحب ملف MP3 هنا أو اضغط اختيار",
      browseBtn: "اختيار",
      testLoopBtn: "فحص اللوب",
      stopTestLoopBtn: "إيقاف الفحص",
      slotIdleTitle: "صوت السكون (Idle Loop)",
      crossfadeBadge: "تلاشي متداخل",
      idleFilePlaceholder: "سكون عند عدم الدعس (اختياري)",
      slotStartTitle: "صوت السلف / التشغيل (Starter)",
      startFilePlaceholder: "يشتغل عند التشغيل (اختياري)",
      slotPopTitle: "باك فاير / تفريغ تيربو (Pop)",
      popBadge: "عند ترك الدعسة",
      popFilePlaceholder: "يشتغل عند رفع الدعسة فجأة",
      synthTitle: "مركب صوت المحرك المدمج (Synth)",
      synthDesc: "يولد صوت محرك حقيقي تلقائياً عبر Web Audio API لتجربة التفاعل دون الحاجة لملفات مسبقة.",
      engineTone: "نغمة المحرك:",
      unityCalibrationTitle: "إعدادات معادلة الـ Pitch والـ RPM في Unity",
      btnExportCode: "📋 كود C# الجاهز",
      paramMinPitch: "أقل سرعة طبقة (Min Pitch):",
      paramMaxPitch: "أعلى سرعة طبقة (Max Pitch):",
      paramIdleRpm: "دوران السكون (Idle RPM):",
      paramMaxRpm: "الحد الأقصى (Redline RPM):",
      paramAttack: "سرعة صعود الـ RPM (Attack):",
      paramDecay: "سرعة هبوط الـ RPM (Decay):",
      modalTitle: "كود Unity C# الجاهز حسب إعداداتك",
      modalDesc: "انسخ هذا الكود وضعه في سكربت الصوت الخاص بسيارتك في Unity:",
      copyCodeBtn: "نسخ الكود إلى الحافظة (Copy)",
      copiedSuccess: "✓ تم النسخ بنجاح!",
      footerText: "أداة فحص صوت السيارة ولوب المحرك المخصصة لـ Unity | جاهزة لـ GitHub",
      keyW: "W",
      keyThrottle: "دعسة",
      keyIgnition: "تشغيل/إطفاء",
      keyLoop: "فحص اللوب"
    }
  };

  let currentLang = 'en';

  function applyLanguage(lang) {
    currentLang = lang;
    const isRtl = lang === 'ar';
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    // Update active button state
    document.getElementById('btnLangEn').classList.toggle('active', lang === 'en');
    document.getElementById('btnLangAr').classList.toggle('active', lang === 'ar');
  }

  document.getElementById('btnLangEn').addEventListener('click', () => applyLanguage('en'));
  document.getElementById('btnLangAr').addEventListener('click', () => applyLanguage('ar'));

  // DOM Elements - Gauges & Telemetry
  const tachoCanvas = document.getElementById('tachometerCanvas');
  const tachoCtx = tachoCanvas.getContext('2d');
  const visualizerCanvas = document.getElementById('visualizerCanvas');
  const visCtx = visualizerCanvas.getContext('2d');

  const digitalRpm = document.getElementById('digitalRpm');
  const currentGear = document.getElementById('currentGear');
  const limiterIndicator = document.getElementById('limiterIndicator');
  const livePitchVal = document.getElementById('livePitchVal');
  const liveVolumeVal = document.getElementById('liveVolumeVal');
  const liveThrottleVal = document.getElementById('liveThrottleVal');
  const liveSpeedVal = document.getElementById('liveSpeedVal');
  const loopStatusBadge = document.getElementById('loopStatusBadge');
  const projectPresetSelect = document.getElementById('projectPresetSelect');
  const pedalDropZone = document.getElementById('pedalDropZone');

  // DOM Elements - Engine Ignition & Status
  const ignitionBtn = document.getElementById('ignitionBtn');
  const engineStatusTag = document.getElementById('engineStatusTag');
  const engineStatusText = document.getElementById('engineStatusText');

  // DOM Elements - Pedal
  const pedalFootplate = document.getElementById('pedalFootplate');
  const pedalChamber = document.querySelector('.pedal-chamber');
  const pedalFill = document.getElementById('pedalFill');
  const pedalPercent = document.getElementById('pedalPercent');
  const throttleRange = document.getElementById('throttleRange');
  const sliderValDisplay = document.getElementById('sliderValDisplay');

  // DOM Elements - Modes
  const btnNeutral = document.getElementById('btnNeutral');
  const btnDrive = document.getElementById('btnDrive');

  // DOM Elements - Audio Slots & Tabs
  const tabCustomAudio = document.getElementById('tabCustomAudio');
  const tabSynth = document.getElementById('tabSynth');
  const customAudioPanel = document.getElementById('customAudioPanel');
  const synthPanel = document.getElementById('synthPanel');
  const synthToneSelect = document.getElementById('synthToneSelect');

  const accelFileInput = document.getElementById('accelFileInput');
  const accelFileName = document.getElementById('accelFileName');
  const slotAccel = document.getElementById('slotAccel');
  const testAccelLoopBtn = document.getElementById('testAccelLoopBtn');

  const idleFileInput = document.getElementById('idleFileInput');
  const idleFileName = document.getElementById('idleFileName');
  const slotIdle = document.getElementById('slotIdle');

  const startFileInput = document.getElementById('startFileInput');
  const startFileName = document.getElementById('startFileName');
  const slotStart = document.getElementById('slotStart');

  const popFileInput = document.getElementById('popFileInput');
  const popFileName = document.getElementById('popFileName');
  const slotPop = document.getElementById('slotPop');

  // DOM Elements - Unity Tuning Calibration
  const paramMinPitch = document.getElementById('paramMinPitch');
  const paramMinPitchVal = document.getElementById('paramMinPitchVal');
  const paramMaxPitch = document.getElementById('paramMaxPitch');
  const paramMaxPitchVal = document.getElementById('paramMaxPitchVal');
  const paramIdleRpm = document.getElementById('paramIdleRpm');
  const paramIdleRpmVal = document.getElementById('paramIdleRpmVal');
  const paramMaxRpm = document.getElementById('paramMaxRpm');
  const paramMaxRpmVal = document.getElementById('paramMaxRpmVal');
  const paramAttack = document.getElementById('paramAttack');
  const paramAttackVal = document.getElementById('paramAttackVal');
  const paramDecay = document.getElementById('paramDecay');
  const paramDecayVal = document.getElementById('paramDecayVal');

  // DOM Elements - Modal
  const btnExportUnityCode = document.getElementById('btnExportUnityCode');
  const unityCodeModal = document.getElementById('unityCodeModal');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const unityCodeSnippet = document.getElementById('unityCodeSnippet');
  const btnCopySnippet = document.getElementById('btnCopySnippet');

  // State
  let currentRpm = 0;
  let targetRpm = 0;
  let throttleInput = 0;
  let isPedalMouseDown = false;
  let isKeyThrottleDown = false;
  let driveMode = 'neutral';
  let currentGearIndex = 0;
  let simulatedSpeed = 0;
  let isRevLimiter = false;
  let previousThrottle = 0;
  let lastFrameTime = performance.now();

  const gears = [
    { name: '1', ratio: 3.4, speedFactor: 18 },
    { name: '2', ratio: 2.1, speedFactor: 32 },
    { name: '3', ratio: 1.4, speedFactor: 50 },
    { name: '4', ratio: 1.0, speedFactor: 75 },
    { name: '5', ratio: 0.8, speedFactor: 100 }
  ];

  function syncSettings() {
    audio.settings.minPitch = parseFloat(paramMinPitch.value);
    audio.settings.maxPitch = parseFloat(paramMaxPitch.value);
    audio.settings.idleRpm = parseInt(paramIdleRpm.value);
    audio.settings.maxRpm = parseInt(paramMaxRpm.value);
  }
  syncSettings();

  // ==========================================
  // Ignition Button
  // ==========================================
  async function toggleIgnition() {
    if (!audio.isRunning) {
      await audio.startEngine();
      ignitionBtn.classList.add('running');
      engineStatusTag.classList.add('active');
      engineStatusText.textContent = translations[currentLang].engineRunning;
      targetRpm = audio.settings.idleRpm;
    } else {
      audio.stopEngine();
      ignitionBtn.classList.remove('running');
      engineStatusTag.classList.remove('active');
      engineStatusText.textContent = translations[currentLang].engineOff;
      targetRpm = 0;
      simulatedSpeed = 0;
    }
  }

  ignitionBtn.addEventListener('click', toggleIgnition);

  // ==========================================
  // Pedal & Throttle Control
  // ==========================================
  function setThrottle(val, source = 'direct') {
    throttleInput = Math.max(0, Math.min(1, val));
    const percent = Math.round(throttleInput * 100);

    // Auto-start engine if user touches or presses pedal
    if (throttleInput > 0.05 && !audio.isRunning) {
      toggleIgnition();
    }

    if (source !== 'slider') {
      throttleRange.value = percent;
      sliderValDisplay.textContent = `${percent}%`;
    }

    // 3D Pedal Visual Reaction (Monochrome Luxury)
    const tiltDegrees = throttleInput * 26;
    const sinkTranslate = throttleInput * 14;
    pedalFootplate.style.transform = `rotateX(${tiltDegrees}deg) translateY(${sinkTranslate}px)`;
    pedalFootplate.style.boxShadow = `0 ${15 - throttleInput * 10}px ${35 - throttleInput * 15}px rgba(0,0,0,0.95)`;

    pedalFill.style.height = `${percent}%`;
    pedalPercent.textContent = `${percent}%`;
    liveThrottleVal.textContent = `${percent}%`;

    // Detect sudden throttle drop for backfire / pop sound
    if (previousThrottle > 0.65 && throttleInput < 0.2 && audio.isRunning) {
      audio.triggerBackfire();
    }
    previousThrottle = throttleInput;
  }

  pedalChamber.addEventListener('mousedown', (e) => {
    isPedalMouseDown = true;
    updatePedalFromPointer(e);
  });

  window.addEventListener('mousemove', (e) => {
    if (isPedalMouseDown) {
      updatePedalFromPointer(e);
    }
  });

  window.addEventListener('mouseup', () => {
    if (isPedalMouseDown) {
      isPedalMouseDown = false;
      if (!isKeyThrottleDown) {
        setThrottle(0);
      }
    }
  });

  function updatePedalFromPointer(e) {
    const rect = pedalChamber.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    const ratio = Math.max(0, Math.min(1, relativeY / rect.height));
    setThrottle(ratio);
  }

  throttleRange.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value) / 100;
    sliderValDisplay.textContent = `${e.target.value}%`;
    setThrottle(val, 'slider');
  });

  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    if (e.code === 'KeyW' || e.code === 'ArrowUp') {
      isKeyThrottleDown = true;
      e.preventDefault();
    } else if (e.code === 'Space') {
      e.preventDefault();
      toggleIgnition();
    } else if (e.code === 'KeyL') {
      e.preventDefault();
      testAccelLoopBtn.click();
    }
  });

  window.addEventListener('keyup', (e) => {
    if (e.code === 'KeyW' || e.code === 'ArrowUp') {
      isKeyThrottleDown = false;
      e.preventDefault();
    }
  });

  btnNeutral.addEventListener('click', () => {
    driveMode = 'neutral';
    btnNeutral.classList.add('active');
    btnDrive.classList.remove('active');
    currentGearIndex = 0;
    currentGear.textContent = 'N';
  });

  btnDrive.addEventListener('click', () => {
    driveMode = 'drive';
    btnDrive.classList.add('active');
    btnNeutral.classList.remove('active');
    currentGearIndex = 0;
    currentGear.textContent = gears[0].name;
  });

  // ==========================================
  // Audio Slots & File Uploads (MP3 / WAV / OGG)
  // ==========================================
  function setupFileInput(input, fileNameEl, slotEl, bufferKey) {
    input.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      fileNameEl.textContent = `Loading: ${file.name}...`;
      const res = await audio.loadAudioFile(bufferKey, file);
      if (res.success) {
        fileNameEl.textContent = `✓ ${file.name} (${res.duration.toFixed(2)}s)`;
        slotEl.classList.add('loaded');
        loopStatusBadge.textContent = `Loop Ready: ${file.name}`;
        
        tabCustomAudio.click();

        if (!audio.isRunning) {
          await toggleIgnition();
        } else if (!audio.useSynth) {
          audio.startCustomClips();
        }
      } else {
        fileNameEl.textContent = `Error: ${res.error}`;
      }
    });
  }

  setupFileInput(accelFileInput, accelFileName, slotAccel, 'accel');
  setupFileInput(idleFileInput, idleFileName, slotIdle, 'idle');
  setupFileInput(startFileInput, startFileName, slotStart, 'start');
  setupFileInput(popFileInput, popFileName, slotPop, 'pop');

  // ==========================================
  // Drag and Drop Audio Files directly onto Pedal / Page
  // ==========================================
  ['dragenter', 'dragover'].forEach(eventName => {
    window.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      pedalDropZone.classList.add('drag-active');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    window.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      pedalDropZone.classList.remove('drag-active');
    }, false);
  });

  window.addEventListener('drop', async (e) => {
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      accelFileName.textContent = `Processing: ${file.name}...`;
      const res = await audio.loadAudioFile('accel', file);
      if (res.success) {
        accelFileName.textContent = `✓ ${file.name} (${res.duration.toFixed(2)}s)`;
        slotAccel.classList.add('loaded');
        loopStatusBadge.textContent = `Loop Ready: ${file.name}`;
        tabCustomAudio.click();
        if (!audio.isRunning) {
          await toggleIgnition();
        } else if (!audio.useSynth) {
          audio.startCustomClips();
        }
      } else {
        accelFileName.textContent = `Error decoding ${file.name}: ${res.error}`;
      }
    }
  });

  // Project Preset Selector
  if (projectPresetSelect) {
    projectPresetSelect.addEventListener('change', (e) => {
      const mode = e.target.value;
      audio.formulaMode = mode;
      if (mode === 'networkVehicle') {
        paramMinPitch.value = 0.55;
        paramMaxPitch.value = 2.80;
        paramMinPitchVal.textContent = '0.55';
        paramMaxPitchVal.textContent = '2.80';
        paramIdleRpm.value = 850;
        paramMaxRpm.value = 7500;
        paramIdleRpmVal.textContent = '850';
        paramMaxRpmVal.textContent = '7500';
      } else if (mode === 'msAdapter') {
        paramMinPitch.value = 0.55;
        paramMaxPitch.value = 2.50;
        paramMinPitchVal.textContent = '0.55';
        paramMaxPitchVal.textContent = '2.50';
        paramIdleRpm.value = 800;
        paramMaxRpm.value = 7000;
        paramIdleRpmVal.textContent = '800';
        paramMaxRpmVal.textContent = '7000';
      } else if (mode === 'standardRpm') {
        paramMinPitch.value = 0.65;
        paramMaxPitch.value = 2.20;
        paramMinPitchVal.textContent = '0.65';
        paramMaxPitchVal.textContent = '2.20';
      }
      syncSettings();
    });
  }

  // Test Loop button for Accel
  testAccelLoopBtn.addEventListener('click', () => {
    if (!audio.buffers.accel) {
      alert(currentLang === 'ar' ? 'يرجى رفع ملف صوت التسارع أولاً لفحص اللوب.' : 'Please load or drop an engine sound file first to test loop seamlessness.');
      return;
    }
    const isPlaying = audio.toggleTestLoop('accel');
    testAccelLoopBtn.textContent = isPlaying ? translations[currentLang].stopTestLoopBtn : translations[currentLang].testLoopBtn;
    testAccelLoopBtn.style.background = isPlaying ? '#ffffff' : '';
    testAccelLoopBtn.style.color = isPlaying ? '#000000' : '';
    loopStatusBadge.textContent = isPlaying ? translations[currentLang].loopPlaying : translations[currentLang].loopReady;
  });

  // Mode Tabs (Custom vs Synth)
  tabCustomAudio.addEventListener('click', () => {
    tabCustomAudio.classList.add('active');
    tabSynth.classList.remove('active');
    customAudioPanel.classList.add('active');
    synthPanel.classList.remove('active');
    audio.useSynth = false;
    if (audio.isRunning) {
      audio.stopSynth();
      audio.startCustomClips();
    }
  });

  tabSynth.addEventListener('click', () => {
    tabSynth.classList.add('active');
    tabCustomAudio.classList.remove('active');
    synthPanel.classList.add('active');
    customAudioPanel.classList.remove('active');
    audio.useSynth = true;
    if (audio.isRunning) {
      audio.stopCustomClips();
      audio.startSynth();
    }
  });

  synthToneSelect.addEventListener('change', (e) => {
    audio.synth.tonePreset = e.target.value;
  });

  // Calibration Sliders
  function bindSlider(slider, display, onChange) {
    slider.addEventListener('input', (e) => {
      display.textContent = e.target.value;
      syncSettings();
      if (onChange) onChange(e.target.value);
    });
  }

  bindSlider(paramMinPitch, paramMinPitchVal);
  bindSlider(paramMaxPitch, paramMaxPitchVal);
  bindSlider(paramIdleRpm, paramIdleRpmVal);
  bindSlider(paramMaxRpm, paramMaxRpmVal);
  bindSlider(paramAttack, paramAttackVal);
  bindSlider(paramDecay, paramDecayVal);

  // ==========================================
  // Physics & Animation Loop
  // ==========================================
  function physicsLoop(now) {
    const dt = Math.min(0.1, (now - lastFrameTime) / 1000);
    lastFrameTime = now;

    const { idleRpm, maxRpm } = audio.settings;
    const attackSpeed = parseFloat(paramAttack.value);
    const decaySpeed = parseFloat(paramDecay.value);

    // Keyboard smooth ramp
    if (isKeyThrottleDown) {
      setThrottle(Math.min(1, throttleInput + dt * 4.5), 'key');
    } else if (!isPedalMouseDown && throttleRange.value == 0) {
      if (throttleInput > 0) {
        setThrottle(Math.max(0, throttleInput - dt * 6.0), 'return');
      }
    }

    if (audio.isRunning) {
      if (driveMode === 'neutral') {
        const rpmRange = maxRpm - idleRpm;
        targetRpm = idleRpm + (rpmRange * throttleInput);

        if (targetRpm >= maxRpm * 0.985 && currentRpm >= maxRpm * 0.97) {
          isRevLimiter = true;
          targetRpm = maxRpm * 0.93;
        } else {
          isRevLimiter = false;
        }

        const lerpRate = (targetRpm > currentRpm) ? attackSpeed : decaySpeed;
        currentRpm += (targetRpm - currentRpm) * Math.min(1, dt * lerpRate);

        currentGear.textContent = 'N';
        simulatedSpeed = Math.max(0, simulatedSpeed - dt * 10);
      } else {
        currentGear.textContent = gears[currentGearIndex].name;
        targetRpm = idleRpm + ((maxRpm - idleRpm) * throttleInput);

        const currentGearObj = gears[currentGearIndex];
        const lerpRate = (targetRpm > currentRpm) ? (attackSpeed * 0.75) : decaySpeed;
        currentRpm += (targetRpm - currentRpm) * Math.min(1, dt * lerpRate);

        if (currentRpm > maxRpm * 0.92 && currentGearIndex < gears.length - 1) {
          currentGearIndex++;
          currentRpm = currentRpm * 0.68;
          audio.triggerBackfire();
        } else if (currentRpm < idleRpm * 1.5 && currentGearIndex > 0 && throttleInput < 0.2) {
          currentGearIndex--;
          currentRpm = currentRpm * 1.35;
        }

        simulatedSpeed = Math.round((currentRpm / maxRpm) * currentGearObj.speedFactor * 1.8);
      }
    } else {
      currentRpm = Math.max(0, currentRpm - dt * 2500);
      isRevLimiter = false;
      simulatedSpeed = 0;
    }

    if (isRevLimiter) {
      limiterIndicator.classList.add('active');
    } else {
      limiterIndicator.classList.remove('active');
    }

    // Update Web Audio Engine pitch & volume
    const audioStatus = audio.updateEngineParameters(currentRpm, throttleInput, isRevLimiter, simulatedSpeed, dt);
    
    // Telemetry readouts
    digitalRpm.textContent = Math.round(currentRpm).toLocaleString();
    livePitchVal.textContent = `${audioStatus.pitch}x`;
    liveVolumeVal.textContent = audioStatus.volume;
    liveSpeedVal.textContent = `${simulatedSpeed} km/h`;

    // Render Monochrome Canvas Visuals
    drawMonochromeTachometer(currentRpm, maxRpm, idleRpm);
    drawMonochromeVisualizer();

    requestAnimationFrame(physicsLoop);
  }

  // ==========================================
  // Canvas Tachometer Dial - Pure Monochrome White & Black
  // ==========================================
  function drawMonochromeTachometer(rpm, maxRpm, idleRpm) {
    const w = tachoCanvas.width;
    const h = tachoCanvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const radius = w * 0.42;

    tachoCtx.clearRect(0, 0, w, h);

    // Outer Dial Face (Obsidian Dark)
    tachoCtx.beginPath();
    tachoCtx.arc(cx, cy, radius, 0, Math.PI * 2);
    tachoCtx.fillStyle = '#0d0d11';
    tachoCtx.fill();
    tachoCtx.lineWidth = 3;
    tachoCtx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    tachoCtx.stroke();

    const startAngle = Math.PI * 0.75;
    const endAngle = Math.PI * 2.25;
    const sweep = endAngle - startAngle;

    // Background Track Ring
    tachoCtx.beginPath();
    tachoCtx.arc(cx, cy, radius * 0.85, startAngle, endAngle);
    tachoCtx.lineWidth = 12;
    tachoCtx.strokeStyle = '#1e1e24';
    tachoCtx.stroke();

    // Redline Track arc (Last 18% of the gauge)
    const redlineRatio = 0.82;
    const redlineStartAngle = startAngle + sweep * redlineRatio;
    tachoCtx.beginPath();
    tachoCtx.arc(cx, cy, radius * 0.85, redlineStartAngle, endAngle);
    tachoCtx.lineWidth = 12;
    tachoCtx.strokeStyle = 'rgba(255, 51, 75, 0.6)';
    tachoCtx.stroke();

    // Active RPM Monochrome Gradient Arc
    const rpmNorm = Math.min(1.0, Math.max(0, rpm / maxRpm));
    if (rpmNorm > 0.01) {
      tachoCtx.beginPath();
      tachoCtx.arc(cx, cy, radius * 0.85, startAngle, startAngle + sweep * rpmNorm);
      tachoCtx.lineWidth = 12;
      
      const arcGrad = tachoCtx.createLinearGradient(0, cy, w, cy);
      arcGrad.addColorStop(0, '#71717a');
      arcGrad.addColorStop(0.7, '#e4e4e7');
      arcGrad.addColorStop(1, '#ffffff');
      
      tachoCtx.strokeStyle = arcGrad;
      tachoCtx.stroke();
    }

    // Tick Marks & Numbers (0 to maxRpm/1000)
    const totalTicks = Math.round(maxRpm / 1000);
    for (let i = 0; i <= totalTicks; i++) {
      const tickNorm = i / totalTicks;
      const angle = startAngle + sweep * tickNorm;
      const isRedline = tickNorm >= redlineRatio;

      const innerR = radius * 0.73;
      const outerR = radius * 0.84;

      const x1 = cx + Math.cos(angle) * innerR;
      const y1 = cy + Math.sin(angle) * innerR;
      const x2 = cx + Math.cos(angle) * outerR;
      const y2 = cy + Math.sin(angle) * outerR;

      tachoCtx.beginPath();
      tachoCtx.moveTo(x1, y1);
      tachoCtx.lineTo(x2, y2);
      tachoCtx.lineWidth = (i % 1 === 0) ? 3 : 1.5;
      tachoCtx.strokeStyle = isRedline ? 'rgba(255, 51, 75, 0.9)' : 'rgba(255, 255, 255, 0.85)';
      tachoCtx.stroke();

      const textR = radius * 0.62;
      const tx = cx + Math.cos(angle) * textR;
      const ty = cy + Math.sin(angle) * textR;

      tachoCtx.font = "bold 13px 'Orbitron', monospace";
      tachoCtx.textAlign = 'center';
      tachoCtx.textBaseline = 'middle';
      tachoCtx.fillStyle = isRedline ? '#ff334b' : '#a1a1aa';
      tachoCtx.fillText(i.toString(), tx, ty);
    }

    // Glowing Pure White Needle
    const needleAngle = startAngle + sweep * rpmNorm;
    const needleLen = radius * 0.88;
    const nx = cx + Math.cos(needleAngle) * needleLen;
    const ny = cy + Math.sin(needleAngle) * needleLen;

    tachoCtx.save();
    tachoCtx.shadowColor = (rpmNorm >= redlineRatio) ? 'rgba(255, 51, 75, 0.9)' : 'rgba(255, 255, 255, 0.95)';
    tachoCtx.shadowBlur = 14;

    tachoCtx.beginPath();
    tachoCtx.moveTo(cx, cy);
    tachoCtx.lineTo(nx, ny);
    tachoCtx.lineWidth = 4;
    tachoCtx.strokeStyle = (rpmNorm >= redlineRatio) ? '#ff334b' : '#ffffff';
    tachoCtx.lineCap = 'round';
    tachoCtx.stroke();
    tachoCtx.restore();

    // Precision Center Hub
    tachoCtx.beginPath();
    tachoCtx.arc(cx, cy, 18, 0, Math.PI * 2);
    tachoCtx.fillStyle = '#1c1c22';
    tachoCtx.fill();
    tachoCtx.lineWidth = 3;
    tachoCtx.strokeStyle = '#ffffff';
    tachoCtx.stroke();
  }

  // ==========================================
  // Canvas Realtime Waveform Visualizer - Pure White
  // ==========================================
  const bufferData = new Uint8Array(256);
  function drawMonochromeVisualizer() {
    const w = visualizerCanvas.width;
    const h = visualizerCanvas.height;

    visCtx.fillStyle = '#09090b';
    visCtx.fillRect(0, 0, w, h);

    if (!audio.analyser || (!audio.isRunning && !audio.isLoopTesting)) {
      visCtx.beginPath();
      visCtx.moveTo(0, h / 2);
      visCtx.lineTo(w, h / 2);
      visCtx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      visCtx.lineWidth = 1.5;
      visCtx.stroke();
      return;
    }

    audio.analyser.getByteTimeDomainData(bufferData);

    visCtx.lineWidth = 2;
    visCtx.strokeStyle = '#ffffff';
    visCtx.shadowColor = 'rgba(255, 255, 255, 0.8)';
    visCtx.shadowBlur = 8;
    visCtx.beginPath();

    const sliceWidth = w / bufferData.length;
    let x = 0;

    for (let i = 0; i < bufferData.length; i++) {
      const v = bufferData[i] / 128.0;
      const y = (v * h) / 2;

      if (i === 0) {
        visCtx.moveTo(x, y);
      } else {
        visCtx.lineTo(x, y);
      }
      x += sliceWidth;
    }

    visCtx.stroke();
    visCtx.shadowBlur = 0;
  }

  // ==========================================
  // Unity C# Script Exporter
  // ==========================================
  function generateUnityCSharpCode() {
    const minP = parseFloat(paramMinPitch.value).toFixed(2);
    const maxP = parseFloat(paramMaxPitch.value).toFixed(2);
    const idleR = parseInt(paramIdleRpm.value);
    const maxR = parseInt(paramMaxRpm.value);

    if (audio.formulaMode === 'networkVehicle') {
      return `// ========================================================
// Unity Car Engine Audio - NetworkVehicleController.cs Matching
// ========================================================
using UnityEngine;

public class NetworkVehicleAudioSimulator : MonoBehaviour
{
    [Header("Audio Components")]
    public AudioSource _engineAudioSource;
    public AudioClip engineAudioClip;

    [Header("Pitch Tuning (Configured from Web Simulator)")]
    public float idlePitch = ${minP}f;
    public float maxPitch = ${maxP}f;
    public float idleVol = 0.12f;
    public float maxVol = 1.0f;
    public float maxSpeedKmH = 180f;

    [Header("Vehicle Inputs")]
    public float CurrentSpeedKmH = 0f;
    [Range(-1f, 1f)] public float _currentThrottle = 0f;
    public bool HasDriver = true;

    void Start()
    {
        if (_engineAudioSource == null)
        {
            _engineAudioSource = gameObject.AddComponent<AudioSource>();
            _engineAudioSource.clip = engineAudioClip;
            _engineAudioSource.loop = true;
            _engineAudioSource.playOnAwake = false;
            _engineAudioSource.spatialBlend = 1.0f;
        }
    }

    void Update()
    {
        float dt = Time.deltaTime;
        float speedKmH = CurrentSpeedKmH;

        if (_engineAudioSource != null)
        {
            if (HasDriver)
            {
                if (!_engineAudioSource.isPlaying) _engineAudioSource.Play();

                float speedRatio = Mathf.Clamp01(speedKmH / maxSpeedKmH);
                float throttleAbs = Mathf.Abs(_currentThrottle);

                // PITCH: Smooth curve matching speed & throttle
                float speedPitch = Mathf.Lerp(idlePitch, maxPitch, Mathf.Pow(speedRatio, 0.7f));
                float throttlePitch = idlePitch + throttleAbs * (maxPitch * 0.65f - idlePitch);
                float targetPitch = Mathf.Max(speedPitch, throttlePitch);

                _engineAudioSource.pitch = Mathf.Lerp(_engineAudioSource.pitch, targetPitch, dt * 8f);

                // VOLUME: Load variation
                float targetVol = Mathf.Lerp(idleVol, maxVol, throttleAbs * 0.7f + speedRatio * 0.3f);
                _engineAudioSource.volume = Mathf.Lerp(_engineAudioSource.volume, targetVol, dt * 8f);
            }
            else
            {
                _engineAudioSource.volume = 0f;
                if (_engineAudioSource.isPlaying) _engineAudioSource.Stop();
            }
        }
    }
}`;
    }

    return `// ========================================================
// Unity Car Engine Audio Controller (Standard Lerp Mode)
// ========================================================
using UnityEngine;

public class CarEngineAudio : MonoBehaviour
{
    public AudioSource engineAudioSource;
    public float minPitch = ${minP}f;
    public float maxPitch = ${maxP}f;
    public float idleRPM = ${idleR}f;
    public float maxRPM = ${maxR}f;
    [Range(0f, 10000f)] public float currentRPM;

    void Start()
    {
        if (engineAudioSource != null)
        {
            engineAudioSource.loop = true;
            if (!engineAudioSource.isPlaying) engineAudioSource.Play();
        }
    }

    void Update()
    {
        float rpmRatio = Mathf.Clamp01((currentRPM - idleRPM) / (maxRPM - idleRPM));
        if (engineAudioSource != null)
        {
            engineAudioSource.pitch = Mathf.Lerp(minPitch, maxPitch, rpmRatio);
            engineAudioSource.volume = Mathf.Lerp(0.7f, 1.0f, rpmRatio);
        }
    }
}`;
  }

  btnExportUnityCode.addEventListener('click', () => {
    unityCodeSnippet.textContent = generateUnityCSharpCode();
    unityCodeModal.classList.add('open');
  });

  btnCloseModal.addEventListener('click', () => {
    unityCodeModal.classList.remove('open');
  });

  unityCodeModal.addEventListener('click', (e) => {
    if (e.target === unityCodeModal) unityCodeModal.classList.remove('open');
  });

  btnCopySnippet.addEventListener('click', () => {
    navigator.clipboard.writeText(unityCodeSnippet.textContent).then(() => {
      btnCopySnippet.textContent = translations[currentLang].copiedSuccess;
      setTimeout(() => {
        btnCopySnippet.textContent = translations[currentLang].copyCodeBtn;
      }, 2000);
    });
  });

  // Start Animation Loop
  requestAnimationFrame(physicsLoop);
});
