# LotusGY87 Plugin

Plugin สำหรับ **GY-87 10DOF IMU Module** บน KBIDE  
รวม 3 sensor ในตัวเดียว: **MPU6050 + HMC5883L + BMP180**  
ใช้ **Madgwick AHRS Filter** คำนวณ Pitch/Roll/Yaw แม่นยำ

## Sensor ที่รองรับ
| Sensor | ข้อมูล | I2C Addr |
|--------|--------|----------|
| MPU6050 | Accel X/Y/Z, Gyro X/Y/Z, Temp | 0x68 |
| HMC5883L | Mag X/Y/Z, Heading 0-360° | 0x1E (ผ่าน bypass) |
| BMP180 | Temperature, Pressure, Altitude | 0x77 |

## วงจร (LotusNanoBot / Arduino Nano)
| GY-87 | Arduino |
|-------|---------|
| VCC | 3.3V หรือ 5V |
| GND | GND |
| SDA | A4 |
| SCL | A5 |

> ⚠️ GY-87 มี level shifter ในตัว รองรับทั้ง 3.3V และ 5V

## Blocks ทั้งหมด (10 Blocks)
| Block | คำอธิบาย |
|-------|----------|
| Setup GY-87 | กำหนด Accel/Gyro range, Madgwick Beta, Sea Level |
| Update GY-87 | อ่านทุก sensor + อัปเดต filter (วางต้น Loop) |
| Calibrate | เก็บ offset Accel+Gyro (วางบอร์ดให้นิ่ง) |
| Accel X/Y/Z | ค่า Acceleration (หน่วย g) |
| Gyro X/Y/Z | ค่า Angular velocity (°/s) |
| Pitch / Roll / Yaw | มุมจาก Madgwick filter (°) |
| Heading (°) | ทิศทาง 0-360° (Tilt-compensated) |
| MPU Temp (°C) | อุณหภูมิ chip ของ MPU6050 |
| BMP180 | อุณหภูมิ / ความดัน / ความสูง |
| Set Accel/Gyro Range | เปลี่ยน range ขณะรันโปรแกรม |

## ค่า Madgwick Beta
| Beta | ผล |
|------|----|
| 0.01 | ช้า แม่นยำ เหมาะกับการวัดที่นิ่ง |
| 0.1  | ค่า default สมดุลดี |
| 0.5  | ตอบสนองเร็ว แต่ drift มากขึ้น |

## Flow การใช้งานพื้นฐาน
```
Setup:
  Setup GY-87 (Accel ±2g, Gyro ±250°/s, Beta=0.1)
  Calibrate 500 samples  ← วางบอร์ดนิ่ง

Loop:
  Update GY-87
  pitch = Pitch
  roll  = Roll
  yaw   = Yaw
  dir   = Heading
```

## หมายเหตุ AVR (LotusNanoBot)
- BMP180 ใช้ OSS=3 (highest precision) delay ~26ms ต่อครั้ง
- ควรเรียก `update()` ทุก ~50ms หรือช้ากว่านั้น
- HMC5883L เข้าถึงผ่าน I2C bypass ของ MPU6050 (ไม่ต้องต่อสาย extra)
