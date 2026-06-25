# Third-Party Notices

KBIDE_Lotus คือ derivative work ที่ประกอบด้วย open-source components ดังต่อไปนี้
ผู้ใช้ทุกคนที่ redistribute โครงการนี้ **ต้องเก็บไฟล์ LICENSE ทั้งหมดไว้ครบ**

---

## Core IDE

| Component | Author | License | Path |
|---|---|---|---|
| KBIDE | Maker Asia | MIT | (binary `kbide.exe`) |
| KidBright Arduino board | comdet (Copyright © 2019) | MIT | `boards/kidbright-arduino/LICENSE` |
| KidBright (original) | Maker Asia | MIT | `boards/kidbright/` |

## Board Support Packages

| Board | Author | License |
|---|---|---|
| LotusDevkit | Lotus Arduibot | MIT (`boards/LotusDevkit/LICENSE`) |
| LotusDueBot | Lotus Arduibot | MIT |
| LotusMegaBot | Lotus Arduibot | MIT |
| LotusMegaBotPlus | Lotus Arduibot | MIT |
| LotusNanoBot | Lotus Arduibot | MIT |
| arduino-uno / nano / mega | (community) | MIT-compatible |

## Plugins (`plugins/`)

ทั้งหมดอยู่ภายใต้ MIT หรือ compatible license:

- **LotusArmIK** — Inverse Kinematics for Lotus arms
- **LotusBH1750** — BH1750 ambient light sensor
- **LotusBMP280** — BMP280 pressure/temp sensor
- **LotusDHT** — DHT11/22 (`plugins/LotusDHT/LICENSE` — MIT)
- **LotusDS18B20AVR** — DS18B20 1-Wire temp
- **LotusGY87** — 10-DOF IMU module
- **LotusHMC5883L** — Magnetometer (`plugins/LotusHMC5883L/LICENSE` — MIT)
- **LotusHuskyLens** — DFRobot HuskyLens AI camera
- **LotusLinePID2** — Line-follow PID controller
- **LotusMLX90614** — IR temperature sensor
- **LotusMPU6050** — 6-axis IMU
- **LotusPCA9685** — 16-channel PWM driver
- **LotusRealTimeClockAVR** — RTC for AVR boards
- **LotusServo** — Servo control
- **LotusUltrasonic** — HC-SR04 distance
- **NETPIE-KBIDE** — NETPIE IoT cloud plugin
- **SHT31** — Sensirion SHT31 temp/humidity
- **servo-kbide-arduino-nano** — Nano servo plugin

## Runtime / Toolchain

| Component | License | File |
|---|---|---|
| Electron | MIT | `LICENSE.electron.txt` |
| Chromium | BSD / MIT (multi-license) | `LICENSES.chromium.html` |
| ESP32 Arduino Core (Espressif) | LGPL 2.1+ / Apache 2.0 | `platforms/arduino-esp32/` |
| ESP-IDF (Espressif) | Apache 2.0 | `platforms/esp-idf/` |
| AVR-GCC toolchain | GPL with linking exception | `platforms/arduino-avr/` |
| SAM toolchain | various | `platforms/arduino-sam/` |

## Arduino / C++ Libraries (bundled in `boards/*/include/`, `boards/*/lib/`)

ไลบรารีต่อไปนี้ถูก bundle มา ใช้งานภายใต้ license ของตนเอง — ตรวจสอบในไฟล์ header แต่ละตัว:

- **Adafruit** family (BMP280, MLX90614, NeoPixel, SHT31, TCS34725, HMC5883_U) — BSD/MIT
- **Blynk** — MIT (`include/Blynk/`)
- **ArduinoJson** — MIT
- **DHT sensor library** — MIT
- **SSD1306Wire / SH1106** OLED — MIT
- **RTClib** — MIT
- **QMC5883LCompass** — MIT
- **PMS** dust sensor library — MIT
- **DFRobotDFPlayerMini** — MIT
- **LiquidCrystal_I2C** — public domain / MIT
- **PCF8574** — MIT
- **HuskyLens** — MIT (DFRobot)

---

## Modifications by KBIDE_Lotus Maintainers

โครงการนี้มีการแก้ไขเพิ่มเติมจาก KBIDE ต้นฉบับดังต่อไปนี้
ดูรายละเอียดใน [`CHANGELOG.md`](CHANGELOG.md)

- `boards/LotusDevkit/include/LotusDevkit.h` — แก้ไข I2C clock + MLX90614 PWM exit sequence
- `boards/LotusDevkit/include/Adafruit_MLX90614.h` — เพิ่ม `readObjectTempF()` / `readAmbientTempF()`

---

## ติดต่อ / Contact

หากเป็นเจ้าของลิขสิทธิ์ส่วนใดส่วนหนึ่งและประสงค์จะให้นำส่วนนั้นออกหรือแก้ไขการอ้างอิง โปรดเปิด issue ใน repo นี้
