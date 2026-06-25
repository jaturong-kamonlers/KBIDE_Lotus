# LotusBMP280 Plugin

Plugin สำหรับใช้งาน **BMP280** (Barometric Pressure & Temperature Sensor) บน KBIDE  
รองรับบอร์ด **LotusNanoBot** (AVR) และ ESP32  
รองรับทั้ง **BMP280** (chip id 0x58) และ **BME280** (chip id 0x60)

## คุณสมบัติ
- อ่านอุณหภูมิ (หน่วย °C)
- อ่านความดันอากาศ (หน่วย hPa)
- คำนวณความสูงจากระดับน้ำทะเล (หน่วย เมตร)
- รองรับ I2C address 0x76 (default) และ 0x77 (SDO=HIGH)
- Auto-detect address หากไม่พบ address แรก

## วงจร (LotusNanoBot)
| BMP280 | LotusNanoBot |
|--------|-------------|
| VCC    | 3.3V        |
| GND    | GND         |
| SDA    | A4          |
| SCL    | A5          |
| SDO    | GND (0x76)  |

## Blocks ที่มี
| Block | คำอธิบาย |
|-------|----------|
| Setup BMP280 | ตั้งค่าเริ่มต้น (ใส่ใน Setup) |
| Read BMP280 (once per loop) | อ่านค่าทุกรอบ (ใส่ต้น Loop) |
| Temperature (°C) | อ่านอุณหภูมิ |
| Pressure (hPa) | อ่านความดันอากาศ |
| Altitude (m) | อ่านความสูง |
| Connected? | ตรวจสอบการเชื่อมต่อ |

## ค่าอ้างอิง
| สิ่งที่วัด | ค่าปกติในประเทศไทย |
|-----------|------------------|
| อุณหภูมิ  | 25 – 40 °C       |
| ความดัน  | 1000 – 1013 hPa  |
| ความสูง  | ขึ้นอยู่กับพื้นที่  |
