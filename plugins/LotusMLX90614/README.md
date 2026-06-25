# LotusMLX90614 Plugin

Plugin สำหรับใช้งาน **MLX90614** เซนเซอร์วัดอุณหภูมิอินฟราเรดแบบไม่สัมผัส บน KBIDE  
รองรับบอร์ด **LotusNanoBot** (AVR) และ ESP32

## คุณสมบัติ
- วัดอุณหภูมิวัตถุแบบไม่สัมผัส (Object Temperature)
- วัดอุณหภูมิแวดล้อม/ตัวเซนเซอร์ (Ambient Temperature)
- ใช้โปรโตคอล **SMBus** (ต่อเป็น I2C)
- I2C address 0x5A (fixed)

## ช่วงการวัด
| ประเภท | ช่วงวัด |
|--------|---------|
| Object Temp | -70 ถึง 380 °C |
| Ambient Temp | -40 ถึง 125 °C |
| ความละเอียด | 0.02 °C |

## วงจร (LotusNanoBot)
| MLX90614 | LotusNanoBot |
|----------|-------------|
| VCC      | 3.3V        |
| GND      | GND         |
| SDA      | A4          |
| SCL      | A5          |

> ⚠️ ต้องมี Pull-up resistor 4.7kΩ ที่ขา SDA และ SCL หากไม่มีใน module

## Blocks ที่มี
| Block | คำอธิบาย |
|-------|----------|
| Setup MLX90614 | ตั้งค่าเริ่มต้น (ใส่ใน Setup) |
| Read MLX90614 (once per loop) | อ่านค่าทุกรอบ (ใส่ต้น Loop) |
| Object Temp (°C) | อุณหภูมิวัตถุที่ชี้ |
| Ambient Temp (°C) | อุณหภูมิแวดล้อม |
| Connected? | ตรวจสอบการเชื่อมต่อ |
