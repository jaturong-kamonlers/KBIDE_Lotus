# LotusMegaBot++ for KBIDE

Lotus shield on Arduino Mega 2560 with:
- 6× TB6612FNG motor drivers (12 direction pins + 6 PWM pins)
- 9 servos (D26..D34)
- 2 start buttons (SW1=D35, SW2=D37)
- Buzzer on D36
- 2 quadrature encoders (D2/D3 and D18/D19; second conflicts with Serial1)
- 1.8" TFT LCD (ST7735, HW SPI: SCK=D52, MOSI=D51, CS=D42, DC=D43, RST=D38)
- Potentiometer on A15, sensor inputs A0..A14, digital sensors D39..D49

### Platform
arduino-avr (ATmega2560)

### License
MIT
