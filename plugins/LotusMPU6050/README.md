# LotusMPU6050 Plugin

Plugin สำหรับใช้งาน **MPU6050** (6-Axis IMU) บน KBIDE  
รองรับบอร์ด **LotusNanoBot** (AVR) และ ESP32

## คุณสมบัติ
- อ่านค่า Accelerometer แกน X, Y, Z (หน่วย g)
- อ่านค่า Gyroscope แกน X, Y, Z (หน่วย deg/s)
- อ่านอุณหภูมิ (หน่วย °C)
- คำนวณมุม **Pitch** และ **Roll** อัตโนมัติ
- รองรับ I2C address 0x68 (default) และ 0x69 (AD0=HIGH)
- ตั้งค่าช่วงวัด Accel: ±2g / ±4g / ±8g / ±16g
- ตั้งค่าช่วงวัด Gyro: ±250 / ±500 / ±1000 / ±2000 dps

## วงจร (LotusNanoBot)
| MPU6050 | LotusNanoBot |
|---------|-------------|
| VCC     | 3.3V / 5V   |
| GND     | GND         |
| SDA     | A4          |
| SCL     | A5          |
| AD0     | GND (0x68)  |

## Blocks ที่มี
| Block | คำอธิบาย |
|-------|----------|
| Setup MPU6050 | ตั้งค่าเริ่มต้น (ใส่ใน Setup) |
| Read MPU6050 (once per loop) | อ่านค่าทุกรอบ (ใส่ต้น Loop) |
| Accel X/Y/Z (g) | ค่า Accelerometer |
| Gyro X/Y/Z (deg/s) | ค่า Gyroscope |
| Temperature (°C) | อุณหภูมิ |
| Pitch / Roll (°) | มุมเอียง |
| Set Accel Range | ตั้งช่วงวัด Accelerometer |
| Set Gyro Range | ตั้งช่วงวัด Gyroscope |
| Connected? | ตรวจสอบการเชื่อมต่อ |
