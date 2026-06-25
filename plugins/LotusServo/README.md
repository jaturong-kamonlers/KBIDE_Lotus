# LotusServo Plugin

Plugin สำหรับควบคุม **Servo Motor** บน KBIDE  
รองรับบอร์ด **LotusNanoBot** (AVR) และ ESP32  
ใช้งาน **หลายตัวพร้อมกัน** ผ่าน Variable

## คุณสมบัติ
- ใช้ Arduino **Servo.h** library (built-in)
- รองรับ Servo หลายตัวพร้อมกันผ่าน Variable (SRV1, SRV2, ...)
- ตั้งค่าช่วง pulse width (min/max μs) ได้อิสระ
- ควบคุมด้วยองศา (0-180°) หรือ microseconds โดยตรง
- รองรับ `detach()` เพื่อหยุดส่ง PWM

## วงจร (LotusNanoBot)
| Servo | LotusNanoBot |
|-------|-------------|
| VCC (แดง) | 5V |
| GND (น้ำตาล/ดำ) | GND |
| Signal (ส้ม/เหลือง) | D3, D5, D6, D9, D10, D11 (PWM pins) |

> ⚠️ **PWM pins บน Arduino Nano**: 3, 5, 6, 9, 10, 11  
> ⚠️ Servo กินไฟมาก ควรต่อ VCC จากแหล่งจ่ายภายนอก ไม่ใช่จาก Arduino

## Blocks ที่มี
| Block | คำอธิบาย |
|-------|----------|
| Setup Servo pin | กำหนดขา PWM และช่วง pulse (ใส่ใน Setup) |
| Servo angle °| หมุนไปยังองศาที่กำหนด (0-180°) |
| Servo pulse μs | ส่ง pulse width โดยตรง (เช่น 1000-2000 μs) |
| Servo detach | หยุดส่ง PWM signal |

## ค่า pulse width มาตรฐาน
| ค่า | ความหมาย |
|-----|---------|
| 544 μs | 0° (default min) |
| 1500 μs | 90° (กึ่งกลาง) |
| 2400 μs | 180° (default max) |

## ตัวอย่างการใช้หลายตัว
- สร้าง Variable ชื่อ `SRV1` สำหรับ Servo ตัวที่ 1 ที่ขา 9
- สร้าง Variable ชื่อ `SRV2` สำหรับ Servo ตัวที่ 2 ที่ขา 10
- แต่ละตัวมีค่า pin และ pulse range เป็นของตัวเอง
