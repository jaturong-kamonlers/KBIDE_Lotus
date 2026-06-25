// blocks_bmp280.js for BMP280 Plugin
'use strict';

if (!Blockly) {
    console.error('Blockly not found!');
}

// ========== BMP280 Setup ==========
Blockly.Blocks['bmp280_setup'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("BMP1"), "INSTANCE")
            .appendField("Setup BMP280")
            .appendField("address")
            .appendField(new Blockly.FieldDropdown([
                ["0x76 (default)", "0x76"],
                ["0x77 (SDO=HIGH)", "0x77"]
            ]), "ADDRESS");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("ตั้งค่า BMP280 - วางใน Setup");
        this.setHelpUrl("");
    }
};

// ========== Update (once per loop) ==========
Blockly.Blocks['bmp280_update'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("BMP1"), "INSTANCE")
            .appendField("Read BMP280 (once per loop)");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("อ่านค่าจาก BMP280 ครั้งเดียวต่อรอบ - วางไว้ต้น Loop");
        this.setHelpUrl("");
    }
};

// ========== Read Temperature ==========
Blockly.Blocks['bmp280_read_temp'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("BMP1"), "INSTANCE")
            .appendField("Temperature (°C)");
        this.setInputsInline(true);
        this.setOutput(true, ["float", "Number"]);
        this.setColour(230);
        this.setTooltip("อ่านค่าอุณหภูมิจาก BMP280 (หน่วย °C)");
        this.setHelpUrl("");
    }
};

// ========== Read Pressure ==========
Blockly.Blocks['bmp280_read_pressure'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("BMP1"), "INSTANCE")
            .appendField("Pressure (hPa)");
        this.setInputsInline(true);
        this.setOutput(true, ["float", "Number"]);
        this.setColour(230);
        this.setTooltip("อ่านค่าความดันอากาศจาก BMP280 (หน่วย hPa)");
        this.setHelpUrl("");
    }
};

// ========== Read Altitude ==========
Blockly.Blocks['bmp280_read_altitude'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("BMP1"), "INSTANCE")
            .appendField("Altitude (m)");
        this.setInputsInline(true);
        this.setOutput(true, ["float", "Number"]);
        this.setColour(230);
        this.setTooltip("อ่านค่าความสูงจากระดับน้ำทะเล (หน่วย เมตร)");
        this.setHelpUrl("");
    }
};

// ========== Check Connected ==========
Blockly.Blocks['bmp280_connected'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("BMP1"), "INSTANCE")
            .appendField("Connected?");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(230);
        this.setTooltip("ตรวจสอบว่า BMP280 เชื่อมต่ออยู่หรือไม่");
        this.setHelpUrl("");
    }
};

console.log('✅ BMP280 blocks loaded!');
