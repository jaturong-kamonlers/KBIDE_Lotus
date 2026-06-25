# LotusBluetooth BLE Plugin

Plugin สำหรับใช้งาน **BLE (Bluetooth Low Energy)** บน KBIDE  
รองรับ **iPhone / iPad / Android / Windows / Mac**  
ทำงานบน **ESP32** เท่านั้น (BLE built-in)

---

## ทำไมต้องใช้ BLE แทน Bluetooth Classic?

| | Bluetooth Classic | BLE |
|--|--|--|
| iPhone / iPad | ❌ ไม่รองรับ | ✅ รองรับเต็มที่ |
| Android | ✅ | ✅ |
| Windows / Mac | ✅ | ✅ |
| AVR (HC-05/06) | ✅ | ❌ |
| ESP32 | ✅ built-in | ✅ built-in |

---

## Protocol ที่ใช้ — Nordic UART Service (NUS)

Plugin นี้ใช้ **Nordic UART Service** ซึ่งเป็นมาตรฐาน BLE ที่ทำให้สื่อสารแบบ Serial ได้ผ่าน BLE

| Channel | UUID | ทิศทาง |
|---------|------|--------|
| Service | `6E400001-...` | — |
| RX | `6E400002-...` | App → ESP32 |
| TX | `6E400003-...` | ESP32 → App (Notify) |

---

## App ที่แนะนำ (ฟรี)

### iPhone / iPad
| App | ลิงก์ | หมายเหตุ |
|-----|-------|---------|
| **nRF Toolbox** | App Store | Nordic อย่างเป็นทางการ รองรับ NUS |
| **LightBlue** | App Store | ดู GATT / ส่งรับข้อมูล |
| **Bluefruit Connect** | App Store | Adafruit รองรับ NUS พร้อม UI |

### Android
| App | ลิงก์ |
|-----|-------|
| **nRF Toolbox** | Play Store |
| **Serial Bluetooth Terminal** | Play Store |
| **Bluefruit Connect** | Play Store |

---

## Blocks ที่มี (สีเขียว)

| Block | คำอธิบาย |
|-------|----------|
| Setup BLE (iPhone/Android) | ตั้งค่า + กำหนดชื่ออุปกรณ์ |
| ส่ง BLE | ส่งข้อมูลไปยัง App |
| ส่ง BLE (ขึ้นบรรทัดใหม่) | ส่ง + `\n` |
| มีข้อมูลจาก BLE? | ตรวจสอบว่ามีข้อมูลเข้า |
| รับ BLE 1 ตัวอักษร | อ่าน 1 char |
| รับข้อความ BLE (String) | อ่านจนถึง newline |
| รับตัวเลข BLE (Int) | อ่านตัวเลขจำนวนเต็ม |
| รับตัวเลข BLE (Float) | อ่านตัวเลขทศนิยม |
| BLE เชื่อมต่ออยู่? | ตรวจสถานะ |

---

## ตัวอย่างโค้ดที่ได้

```cpp
#include "BLE_Plugin.h"

BLE_Plugin _ble_BLE1;

void setup() {
    _ble_BLE1.begin("LotusDevkit");
    // ชื่อ "LotusDevkit" จะปรากฏบน iPhone/Android
}

void loop() {
    // รับคำสั่งจาก App
    if (_ble_BLE1.available()) {
        String cmd = _ble_BLE1.readString();

        if (cmd == "LED_ON") {
            digitalWrite(2, HIGH);
            _ble_BLE1.sendLine("OK: LED ON");
        }
        else if (cmd == "SENSOR") {
            float temp = 28.5;
            _ble_BLE1.sendLine(String(temp, 1));
        }
    }
}
```

---

## วิธีใช้งานกับ iPhone (nRF Toolbox)

1. ติดตั้ง **nRF Toolbox** จาก App Store
2. Upload โค้ดลง ESP32
3. เปิด nRF Toolbox → แตะ **UART**
4. แตะ **CONNECT** → เลือก **LotusDevkit**
5. ส่ง-รับข้อมูลได้ทันที ✅

---

## หมายเหตุ

- Plugin นี้รองรับ **ESP32 เท่านั้น** (ไม่รองรับ AVR)
- สำหรับ AVR ใช้ **LotusBluetooth** (HC-05/06) แทน แต่จะใช้กับ Android/PC เท่านั้น
- BLE รองรับการเชื่อมต่อ **1 อุปกรณ์ต่อครั้ง**
- หาก App ตัดการเชื่อมต่อ ESP32 จะ Advertise ใหม่อัตโนมัติ
