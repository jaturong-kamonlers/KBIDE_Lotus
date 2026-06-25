# คู่มือการติดตั้ง / Installation Guide

KBIDE_Lotus เป็น **overlay pack** — ต้องติดตั้ง KBIDE ตัวเต็มของ Lotus Arduibot ก่อน แล้วค่อยแตก overlay ของเราทับ

---

## ขั้นตอนหลัก (Overview)

```
1. ติดตั้ง KBIDE base (จาก Lotus Arduibot)
2. ดาวน์โหลด KBIDE_Lotus overlay จาก GitHub Releases
3. รัน install script (หรือ extract manual)
4. เปิด KBIDE ใหม่
```

---

## Step 1: ติดตั้ง KBIDE base

ดาวน์โหลดและติดตั้ง KBIDE ของ Lotus Arduibot จากแหล่งของ Lotus
(โดยปกติจะติดตั้งที่ `C:\KBIDE_Lotus` บน Windows, หรือ `/opt/kbide` บน Linux)

---

## Step 2: ดาวน์โหลด Overlay

ไปที่ https://github.com/jaturong-kamonlers/KBIDE_Lotus/releases

ดาวน์โหลด:
- **Windows**: `KBIDE_Lotus_overlay_<version>.zip`
- **Linux / Jetson Nano**: `KBIDE_Lotus_overlay_<version>.tar.gz`

ตรวจสอบ checksum ด้วยไฟล์ `SHA256SUMS_<version>.txt` (optional แต่แนะนำ)

---

## Step 3: ติดตั้ง Overlay

### 🪟 Windows (PowerShell)

**วิธีง่าย — ใช้ script อัตโนมัติ:**

1. แตก zip ออกมา
2. เปิด PowerShell แบบ **Run as Administrator**
3. รัน:
   ```powershell
   cd <path-ที่แตก-zip>\KBIDE_Lotus_overlay
   Set-ExecutionPolicy -Scope Process Bypass
   .\scripts\install-overlay.ps1
   ```
4. ถ้า KBIDE อยู่ที่อื่นที่ไม่ใช่ `C:\KBIDE_Lotus` ให้ระบุ path:
   ```powershell
   .\scripts\install-overlay.ps1 -KBidePath "D:\KBIDE_Lotus"
   ```

**Script จะทำให้:**
- Backup โฟลเดอร์ `boards\` และ `plugins\` เดิมไปไว้ที่ `backup_<timestamp>/`
- Copy ไฟล์ใหม่ทับ
- ถ้าผิดพลาดสามารถย้อนคืนได้

**วิธี Manual:**

1. ปิด KBIDE ถ้าเปิดอยู่
2. Backup โฟลเดอร์ `C:\KBIDE_Lotus\boards\` และ `C:\KBIDE_Lotus\plugins\` (เผื่อย้อน)
3. Copy เนื้อหาจาก `boards\` และ `plugins\` ใน zip ทับเข้าไป
4. เปิด KBIDE ใหม่

---

### 🐧 Linux / 🤖 Jetson Nano

```bash
# แตกไฟล์
tar -xzf KBIDE_Lotus_overlay_v0.1.0.tar.gz
cd KBIDE_Lotus_overlay

# รัน install script (ระบุ path KBIDE)
chmod +x scripts/install-overlay.sh
sudo ./scripts/install-overlay.sh /opt/kbide
```

ปรับ `/opt/kbide` เป็น path ที่ติดตั้ง KBIDE จริงในเครื่องคุณ

---

## การยืนยันว่าติดตั้งสำเร็จ

1. เปิด KBIDE
2. เลือกบอร์ด **LotusDevkit**
3. ลองสร้างโปรเจกต์ใช้บล็อก **MLX90614 begin** + **MLX90614 ambient temp** + แสดงผลบน OLED
4. Flash โปรเจกต์ → ควรเห็นค่าอุณหภูมิจริง ไม่ใช่ `-999`

---

## การย้อนคืน (Rollback)

ถ้าหลังติดตั้ง overlay แล้วเกิดปัญหา:

### Windows
```powershell
# ใน C:\KBIDE_Lotus
Remove-Item -Recurse boards, plugins
Copy-Item -Recurse backup_<timestamp>\boards .
Copy-Item -Recurse backup_<timestamp>\plugins .
```

### Linux
```bash
cd /opt/kbide  # หรือ path ที่ติดตั้ง
sudo rm -rf boards plugins
sudo cp -r backup_<timestamp>/boards .
sudo cp -r backup_<timestamp>/plugins .
```

---

## ปัญหาที่พบบ่อย / Troubleshooting

| อาการ | สาเหตุที่เป็นไปได้ |
|---|---|
| Script ไม่รัน "cannot be loaded because running scripts is disabled" | PowerShell execution policy — ใช้ `Set-ExecutionPolicy -Scope Process Bypass` ก่อน |
| MLX90614 ยังอ่านได้ -999 หลังติดตั้ง | ตรวจ wiring (VCC 3.3V, SDA=GPIO21, SCL=GPIO22) + ดูใน CHANGELOG ว่าอัปเดต LotusDevkit.h แล้ว |
| KBIDE เปิดไม่ได้หลัง overlay | rollback ด้วยข้างต้น และเปิด issue ใน GitHub พร้อม screenshot |
| Permission denied (Linux) | ใช้ `sudo` ตอนรัน script |
