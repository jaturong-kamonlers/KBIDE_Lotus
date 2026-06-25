# KBIDE_Lotus

โปรแกรม IDE สำหรับเขียนโปรแกรมบอร์ดในตระกูล **Lotus** (LotusDevkit, LotusDueBot, LotusMegaBot, LotusNanoBot ฯลฯ)

> **Unofficial fork of KBIDE by Maker Asia, customized for Lotus boards.**
> ไม่มีความเกี่ยวข้องกับและไม่ได้รับรองจาก Maker Asia หรือ Lotus Arduibot อย่างเป็นทางการ
> Not affiliated with or endorsed by Maker Asia or Lotus Arduibot.

---

## ที่มา / Attribution

KBIDE_Lotus คือการนำ **KBIDE** (โครงการของ Maker Asia / NECTEC) มาปรับแต่งและเพิ่มชุดไฟล์รองรับบอร์ดสำหรับบอร์ด **Lotus** ภายใต้ MIT License

| ส่วนประกอบ | ผู้สร้าง | License |
|---|---|---|
| KBIDE core | Maker Asia — https://github.com/MakerAsia | MIT |
| KidBright Arduino board | comdet | MIT |
| Lotus Devkit board support | Lotus Arduibot — http://www.lotus-arduibot.com | MIT |
| Plugins | หลายผู้สร้าง | ดู `NOTICE.md` |
| Electron / Chromium | OpenJS / Google | MIT / BSD |
| ESP32 Arduino Core | Espressif | LGPL / Apache 2.0 |

ดูรายละเอียดทั้งหมดในไฟล์ [`NOTICE.md`](NOTICE.md)

---

## License

โครงการนี้ใช้ **MIT License** ตามต้นฉบับ KBIDE
ดูข้อความ license เต็มในไฟล์ `LICENSE` ของแต่ละ component:

- `boards/kidbright-arduino/LICENSE` — Maker Asia core
- `boards/LotusDevkit/LICENSE` — Lotus board support
- `LICENSE.electron.txt`, `LICENSES.chromium.html` — runtime
- `plugins/*/LICENSE` — plugins

---

## คำเตือน (สำคัญ) / Warranty Disclaimer

ซอฟต์แวร์นี้ให้บริการ **"AS IS"** ไม่มีการรับประกันใด ๆ ผู้ใช้ยอมรับความเสี่ยงเอง
รวมถึงความเสียหายที่อาจเกิดขึ้นกับฮาร์ดแวร์ บอร์ด หรือเซนเซอร์

This software is provided **"AS IS"** without warranty of any kind.
Use at your own risk. Authors not liable for any hardware damage.

---

## การติดตั้ง / Installation

> ⚠️ Installer สำหรับ Windows / Ubuntu / Jetson Nano อยู่ระหว่างจัดทำ

ระหว่างนี้ใช้วิธี extract จาก installer KBIDE ต้นฉบับแล้วแทนที่โฟลเดอร์ `boards/LotusDevkit/`, `boards/LotusDueBot/`, ฯลฯ ด้วยเวอร์ชันใน repo นี้

---

## บอร์ดที่รองรับ

- LotusDevkit (ESP32-based)
- LotusDueBot
- LotusMegaBot
- LotusMegaBotPlus
- LotusNanoBot
- KidBright (Arduino API)

## Plugins ที่มีให้

ดูใน `plugins/` — รวมถึง MLX90614, BMP280, DHT, BH1750, HMC5883L, MPU6050, HuskyLens, PCA9685, RTC, Servo, Ultrasonic, NETPIE และอื่น ๆ
