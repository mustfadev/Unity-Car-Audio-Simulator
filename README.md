# 🏎️ Unity Car Audio & Throttle Simulator

[![License: MIT](https://img.shields.io/badge/License-MIT-white.svg?style=for-the-badge)](LICENSE)
[![Unity 3D](https://img.shields.io/badge/Unity%203D-Compatible-lightgrey.svg?style=for-the-badge&logo=unity)](https://unity.com/)
[![Web Audio API](https://img.shields.io/badge/Web%20Audio%20API-Native-black.svg?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Ready-green.svg?style=for-the-badge)](https://pages.github.com/)

An ultra-clean, monochrome (black & white) web simulator designed to test car engine sound loops, pitch shifting, and gas pedal throttle response before integrating them into Unity 3D games.

---

## 🌟 Key Features

- **🎯 1:1 Unity AudioSource Replication**: Accurately simulates `AudioSource.pitch = Mathf.Lerp(...)` and volume modulation corresponding to vehicle speed and throttle input.
- **⚡ Native MP3 / WAV Drag & Drop**: Drag and drop any audio loop directly onto the gas pedal to test it immediately.
- **🔄 Seamless Loop Checker**: Dedicated "Test Loop" feature to listen for popping or seams in your audio clips before deploying to your game.
- **🎹 3D Mechanical Gas Pedal**: Interactive racing pedal with physical spring-return physics, controllable via mouse drag, slider, or keyboard (`W` / `↑` arrow).
- **🎛️ Rev Limiter & Backfire Simulation**: Realistic stutter cutoff at redline (7,000–9,500 RPM) and exhaust pop on quick throttle release.
- **🔊 Built-in Procedural Engine Synthesizer**: Web Audio API oscillator fallback (V6, Inline-4, V8) allowing immediate testing even without external audio files.
- **📋 1-Click Unity C# Code Export**: Instantly export a ready-to-use C# script pre-configured with your exact calibrated pitch and RPM values.
- **🌐 Bilingual Support**: Full English and Arabic toggle with instant RTL/LTR layout flipping.
- **🖤 High-Contrast Monochrome Aesthetic**: Sleek obsidian and white luxury racing telemetry style.

---

## 🚀 Quick Start (Local)

1. Clone or download this repository:
   ```bash
   git clone https://github.com/mustfadev/Unity-Car-Audio-Simulator.git
   ```
2. Simply double-click `index.html` to open it in any modern web browser (Chrome, Edge, Firefox, Safari).
3. Press **SPACE** or click **ENGINE START / STOP** to start the engine.
4. Hold **W** or the **↑** arrow key to rev the engine!

---

## 🌐 Deploying to GitHub Pages (1-Minute Setup)

This repository is completely zero-dependency and 100% static:
1. Push this folder to your GitHub repository.
2. Go to your repository on GitHub -> **Settings** -> **Pages**.
3. Under **Branch**, select `main` (or `master`) and `/root`, then click **Save**.
4. Your simulator is live worldwide!

---

## 🎮 Keyboard Controls

| Key | Action |
| :--- | :--- |
| **W** or **↑** | Press Gas Pedal (Throttle Rev) |
| **SPACE** | Start / Stop Engine Ignition |
| **L** | Toggle Continuous Loop Test |

---

## 📁 Repository File Structure

```text
unity-car-audio-tester/
├── index.html         # Main dashboard layout & UI structure
├── style.css          # Monochrome black & white styling & animations
├── audio-engine.js    # Web Audio API engine & procedural synth
├── app.js             # Physics loop, tachometer rendering & i18n
├── LICENSE            # MIT Open-Source License
├── .gitignore         # Git ignore rules
└── README.md          # Documentation (English & Arabic)
```

---

## 🇸🇦 الدليل بالعربية (Arabic Guide)


### طريقة التشغيل:
1. افتح الملف `index.html` بالضغط عليه مرتين في أي متصفح.
2. اضغط زر **ENGINE START** (أو زر **Space**) لتشغيل المحرك.
3. اضغط على حرف **W** أو السهم للأعلى **↑** أو اسحب دعسة البنزين بالماوس للدعس وسماع ارتفاع دوران المحرك (RPM) وتغير نغمة الصوت.
4. اسحب أي ملف **MP3** أو **WAV** وأفلته مباشرة فوق الدعسة لتجربته فوراً.
5. اضغط زر **"📋 كود C# الجاهز"** لنسخ الكود الجاهز ووضعه مباشرة في سيارتك داخل Unity!

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
