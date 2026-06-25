// blocks_hmc5883.js for HMC5883L Plugin
'use strict';

if (!Blockly) {
    console.error('Blockly not found!');
}

// ========== HMC5883L Setup (Setup block เท่านั้น) ==========
Blockly.Blocks['hmc5883_setup'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("HMC1"), "INSTANCE")
            .appendField("Setup HMC5883L");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("ตั้งค่า HMC5883L - วางใน Setup");
        this.setHelpUrl("");
    }
};

// ========== Update (once per loop) - standalone block ==========
Blockly.Blocks['hmc5883_update'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("HMC1"), "INSTANCE")
            .appendField("Read HMC5883L (once per loop)");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("อ่านค่าจาก HMC5883L ครั้งเดียวต่อรอบ - วางไว้ต้น Loop");
        this.setHelpUrl("");
    }
};

// ========== Read Heading ==========
Blockly.Blocks['hmc5883_read_heading'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("HMC1"), "INSTANCE")
            .appendField("Heading °");
        this.setInputsInline(true);
        this.setOutput(true, ["float", "Number"]);
        this.setColour(230);
        this.setTooltip("อ่านค่าทิศทาง (องศา 0-360)");
        this.setHelpUrl("");
    }
};

// ========== Read Raw Axis ==========
Blockly.Blocks['hmc5883_read_raw'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("HMC1"), "INSTANCE")
            .appendField("Raw")
            .appendField(new Blockly.FieldDropdown([
                ["X", "X"],
                ["Y", "Y"],
                ["Z", "Z"]
            ]), "AXIS");
        this.setInputsInline(true);
        this.setOutput(true, ["int", "Number"]);
        this.setColour(230);
        this.setTooltip("อ่านค่า Raw ของแกน X/Y/Z");
        this.setHelpUrl("");
    }
};

// ========== Calibrate ==========
Blockly.Blocks['hmc5883_calibrate'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("HMC1"), "INSTANCE")
            .appendField("Calibrate");
        this.appendValueInput("SAMPLES")
            .setCheck("Number")
            .appendField("samples");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("ปรับเทียบ HMC5883L");
        this.setHelpUrl("");
    }
};

// ========== Set Offset ==========
Blockly.Blocks['hmc5883_set_offset'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("HMC1"), "INSTANCE")
            .appendField("Set Offset");
        this.appendValueInput("X_OFFSET")
            .setCheck("Number")
            .appendField("X");
        this.appendValueInput("Y_OFFSET")
            .setCheck("Number")
            .appendField("Y");
        this.appendValueInput("Z_OFFSET")
            .setCheck("Number")
            .appendField("Z");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("ตั้งค่าชดเชย X Y Z");
        this.setHelpUrl("");
    }
};

// ========== Check Available ==========
Blockly.Blocks['hmc5883_available'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("HMC1"), "INSTANCE")
            .appendField("Connected?");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(230);
        this.setTooltip("ตรวจสอบว่า HMC5883L เชื่อมต่ออยู่หรือไม่");
        this.setHelpUrl("");
    }
};

// ========== Set Declination ==========
Blockly.Blocks['hmc5883_declination'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("HMC1"), "INSTANCE")
            .appendField("Declination")
            .appendField(new Blockly.FieldNumber(0, -180, 180), "DECLINATION")
            .appendField("°");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("ตั้งค่า Magnetic Declination (ประเทศไทยประมาณ 0.5°)");
        this.setHelpUrl("");
    }
};

console.log('✅ HMC5883L blocks loaded!');
