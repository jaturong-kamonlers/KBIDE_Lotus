# LotusDueBot for KBIDE

Lotus shield on **Arduino Due (SAM3X8E)** with:
- 6× TB6612FNG motor drivers (12 direction pins + 6 PWM pins)
- 9 servos (D24..D32)
- 2 start buttons (SW1=D22, SW2=D23)
- Buzzer on D14
- **4 quadrature encoders** (D46/D47, D48/D49, D50/D51, D52/D53)
- 1.8" TFT LCD (ST7735, software SPI: SCK=D12, MOSI(SDA)=D10, CS=D4, DC(A0)=D13, RST=D33)
- Potentiometer on A11, sensor inputs A0..A10
- I2C bus (SDA=D20, SCL=D21) for HMC5883L compass + MPU6050 IMU
- microSD slot (CS=D15)
- Sensor PWM output on D9
- 3× hardware Serial (Serial=D0/D1, Serial1=D18/D19, Serial2=D16/D17)

## Platform setup (one-time)

Arduino Due uses ARM Cortex-M3, not AVR. You need an `arduino-sam` platform
folder under `C:\KBIDE_Lotus\platforms\` with:
- `arm-none-eabi-gcc` toolchain (`tools/`)
- Arduino SAM core (`sdk/cores/arduino`)
- SAM variants (`sdk/variants/arduino_due_x`)
- bossac uploader (`tools/bossac`)
- `compiler.js`, `template.c`, `context.json` analogous to `arduino-avr`

Quickest path:
1. Install Arduino IDE 1.8.x
2. Use **Boards Manager** → install "Arduino SAM Boards (32-bits ARM Cortex-M3)"
3. Locate the installed folder (typically `%LOCALAPPDATA%\Arduino15\packages\arduino\hardware\sam\1.6.12`)
4. Copy/symlink it into `C:\KBIDE_Lotus\platforms\arduino-sam\sdk`
5. Copy `arm-none-eabi-*` from `%LOCALAPPDATA%\Arduino15\packages\arduino\tools\arm-none-eabi-gcc\` into `platforms\arduino-sam\tools`
6. Mirror the structure of `platforms\arduino-avr\` for `compiler.js` etc

If you don't want to set up the platform: open KBIDE to design with blocks,
copy the generated `user_app.cpp` body into a sketch, compile in Arduino IDE.

## License
MIT
