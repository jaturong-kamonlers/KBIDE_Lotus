# Changelog

ไฟล์นี้บันทึกการแก้ไขที่ KBIDE_Lotus ทำเพิ่มจาก KBIDE ต้นฉบับ
รูปแบบตามแนวทาง [Keep a Changelog](https://keepachangelog.com/)

---

## [1.0.0] — 2026-06-26

### Added
- **Full Windows installer** (`KBIDE_Lotus_Setup_1.0.0.exe`, 167 MB)
  - NSIS-based installer with LZMA compression (~1.9 GB → 167 MB)
  - Installs to `%LOCALAPPDATA%\Programs\KBIDE_Lotus` (no admin required)
  - Desktop + Start Menu shortcuts
  - Proper Add/Remove Programs uninstaller
  - Uses Lotus icon (kblotusico.ico)
  - Bundles the complete KBIDE runtime + all Lotus boards/plugins + MLX90614 fix

### Notes
- Full installer wraps the maintained KBIDE binary distribution from Maker Asia
- All MIT/BSD/Apache licenses bundled in the installer payload
- Installer signed by NSIS but not code-signed yet (Windows SmartScreen may warn on first run)

---

## [0.1.0] — 2026-06-25

### Fixed — MLX90614 ใช้งานไม่ได้บน LotusDevkit

**อาการ**: เซนเซอร์อุณหภูมิอินฟราเรด MLX90614 อ่านค่าได้เป็น `-999` (sensor not found)

**สาเหตุ** (2 อย่าง):
1. MLX90614 บูตขึ้นมาใน **PWM mode** ตามค่าโรงงาน — ต้องดึง SCL LOW > 2ms ก่อนใช้ I2C เพื่อบังคับเข้า SMBus mode (ตาม datasheet section 8.3.3.1)
2. `SSD1306Wire::init()` ใน OLED library ตั้ง `Wire.setClock(700000)` (700kHz) ซึ่งเร็วเกินไปสำหรับ MLX90614 — ทับ clock 100kHz/50kHz ที่ตั้งไว้

**การแก้ไข** ใน `boards/LotusDevkit/include/LotusDevkit.h`:
- เพิ่ม SCL LOW pulse sequence (5ms LOW + 50ms settle) ก่อน `Wire.begin()`
- เปลี่ยน `Wire.setClock(100000)` → `Wire.setClock(50000)` เพื่อความเสถียร SMBus
- เพิ่ม `Wire.setClock(50000)` อีกครั้งที่ปลายฟังก์ชัน `LotusDevkit()` หลัง `display.init()` เพื่อ override 700kHz กลับมา

**Trade-off**: OLED refresh ที่ 50kHz ช้ากว่า 700kHz (~14×) แต่ยังใช้งานได้ และ MLX90614 อ่านค่าได้ปกติ

### Added — Fahrenheit support สำหรับ MLX90614

`boards/LotusDevkit/include/Adafruit_MLX90614.h` มี method สำหรับ Celsius เท่านั้น
เพิ่ม:
- `readObjectTempF()` — อุณหภูมิวัตถุในหน่วยฟาเรนไฮต์
- `readAmbientTempF()` — อุณหภูมิแวดล้อมในหน่วยฟาเรนไฮต์

ทั้งสอง method ส่งคืน `-999.0f` ถ้า sensor ไม่ทำงาน (ตามแบบเดิม) มิฉะนั้นแปลงจาก Celsius ด้วยสูตร `°F = °C × 9/5 + 32`

ใช้ร่วมกับบล็อก legacy `mlx90614_read_object_f` / `mlx90614_read_ambient_f` ที่ตอนนี้คอมไพล์ผ่านแล้ว
