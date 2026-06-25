# LotusHuskyLens Plugin

Plugin สำหรับใช้งาน **HuskyLens AI Camera** บน KBIDE  
รองรับบอร์ด **LotusNanoBot** (AVR) และ ESP32  
เชื่อมต่อผ่าน **I2C** หรือ **UART** เลือกได้

## Algorithm ที่รองรับ
| Algorithm | คำอธิบาย |
|-----------|----------|
| Face Recognition | จดจำและติดตามใบหน้า |
| Object Tracking | ติดตามวัตถุที่เรียนรู้ไว้ |
| Object Recognition | แยกแยะประเภทวัตถุ |
| Line Tracking | ติดตามเส้น (ใช้กับหุ่นยนต์) |
| Color Recognition | จดจำสี |
| Tag Recognition | อ่าน AprilTag |

## วงจร

### I2C (LotusNanoBot)
| HuskyLens | LotusNanoBot |
|-----------|-------------|
| VCC | 5V |
| GND | GND |
| SDA | A4 |
| SCL | A5 |

### UART (LotusNanoBot)
| HuskyLens | LotusNanoBot |
|-----------|-------------|
| VCC | 5V |
| GND | GND |
| TX | RX (D0) |
| RX | TX (D1) |

> ⚠️ UART mode ใช้ Serial0 (D0/D1) ทำให้ไม่สามารถ Serial.print() debug ได้พร้อมกัน

## Blocks ทั้งหมด (10 Blocks)
| Block | คำอธิบาย |
|-------|----------|
| Setup HuskyLens I2C | เชื่อมต่อผ่าน I2C + เลือก Algorithm |
| Setup HuskyLens UART | เชื่อมต่อผ่าน UART + baud + Algorithm |
| Switch Algorithm | สลับ Algorithm ขณะรันโปรแกรม |
| Request | อ่าน frame จาก HuskyLens (All/Blocks/Arrows/Learned) |
| Request by ID | อ่านเฉพาะ ID ที่กำหนด |
| Block count | จำนวน Block ที่ตรวจพบ |
| Arrow count | จำนวน Arrow ที่ตรวจพบ |
| Block # [X/Y/W/H/ID] | อ่านค่า Block ที่ index |
| Arrow # [xTail/yTail/xHead/yHead/ID] | อ่านค่า Arrow ที่ index |
| Is Learned? ID | ตรวจสอบว่าพบวัตถุที่ ID นี้ไหม |

## ตัวอย่างการใช้งาน (Face Tracking)
```
Setup: วาง Setup HuskyLens I2C → Algorithm: Face Recognition

Loop:
  Request All
  ถ้า Block count > 0:
    x = Block #0 X
    y = Block #0 Y
    → ใช้ x, y ควบคุม Servo หันตาม
```

## ค่าพิกัด HuskyLens
- **X**: 0-320 (ซ้าย → ขวา)
- **Y**: 0-240 (บน → ล่าง)
- **W, H**: ขนาด bounding box (pixels)
- **ID**: หมายเลขที่ HuskyLens เรียนรู้ไว้ (1, 2, 3, ...)
