# DS1307 RTC Module Library for KBIDE

DS1307 Real-Time Clock module plugin for KBIDE (KidBright IDE) supporting Arduino AVR boards.

## Features

- 🕐 **Real-Time Clock** - Keep track of time even when powered off (requires CR2032 battery)
- 📅 **Full Date/Time** - Year, Month, Day, Hour, Minute, Second
- 🔄 **Auto Sync** - Option to sync with PC compile time
- 📡 **Square Wave Output** - Configurable output: 1Hz, 4kHz, 8kHz, 32kHz
- 💾 **EEPROM Support** - 32KB AT24C32 EEPROM onboard (optional)

## Hardware Requirements

- DS1307 RTC Module
- I2C connection (SDA, SCL)
- CR2032 battery for backup power

## Wiring

| DS1307 Pin | Arduino Pin |
|------------|-------------|
| VCC        | 5V          |
| GND        | GND         |
| SDA        | A4 (SDA)    |
| SCL        | A5 (SCL)    |

## Available Blocks

### 1. Initialize RTC
Initialize the DS1307 module with optional PC time sync.

### 2. Set Date/Time
Set custom date and time manually.

### 3. Get Current Date/Time
Read current date/time from RTC.

### 4. Get Individual Values
Get Year, Month, Day, Hour, Minute, Second separately.

### 5. Format Timestamp
Format date/time as string:
- `YYYY/MM/DD HH:MM:SS`
- `DD/MM/YYYY HH:MM:SS`
- `HH:MM:SS DD/MM/YYYY`

### 6. Square Wave Output
Configure SQW pin output mode.

## Example Usage

1. **Initialize RTC** - Place in setup
2. **Read Time** - Use "Get Hour/Minute/Second" blocks
3. **Display** - Use "Format timestamp" for LCD/Serial display

## Technical Details

- I2C Address: `0x68`
- Communication: I2C (Wire library)
- Voltage: 5V (with 3.3V compatible I2C)
- Accuracy: ±2 minutes/year (typical)

## Version History

- **1.0.3** - Fixed code generation bugs
- **1.0.2** - Added timestamp formatting
- **1.0.1** - Initial release

## License

MIT License

## Support

For issues and questions, please open an issue on GitHub.
