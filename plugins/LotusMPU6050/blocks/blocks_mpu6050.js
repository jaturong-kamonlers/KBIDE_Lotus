// blocks_mpu6050.js for MPU6050 Plugin
'use strict';

if (!Blockly) {
    console.error('Blockly not found!');
}

// ========== MPU6050 Setup ==========
Blockly.Blocks['mpu6050_setup'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("MPU1"), "INSTANCE")
            .appendField("Setup MPU6050")
            .appendField("address")
            .appendField(new Blockly.FieldDropdown([
                ["0x68 (default)", "0x68"],
                ["0x69 (AD0=HIGH)", "0x69"]
            ]), "ADDRESS");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("ตั้งค่า MPU6050 - วางใน Setup");
        this.setHelpUrl("");
    }
};

// ========== Update (once per loop) ==========
Blockly.Blocks['mpu6050_update'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("MPU1"), "INSTANCE")
            .appendField("Read MPU6050 (once per loop)");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("อ่านค่าจาก MPU6050 ครั้งเดียวต่อรอบ - วางไว้ต้น Loop");
        this.setHelpUrl("");
    }
};

// ========== Read Accelerometer ==========
Blockly.Blocks['mpu6050_read_accel'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("MPU1"), "INSTANCE")
            .appendField("Accel")
            .appendField(new Blockly.FieldDropdown([
                ["X", "X"],
                ["Y", "Y"],
                ["Z", "Z"]
            ]), "AXIS")
            .appendField("(g)");
        this.setInputsInline(true);
        this.setOutput(true, ["float", "Number"]);
        this.setColour(230);
        this.setTooltip("อ่านค่า Accelerometer แกน X/Y/Z (หน่วย g)");
        this.setHelpUrl("");
    }
};

// ========== Read Gyroscope ==========
Blockly.Blocks['mpu6050_read_gyro'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("MPU1"), "INSTANCE")
            .appendField("Gyro")
            .appendField(new Blockly.FieldDropdown([
                ["X", "X"],
                ["Y", "Y"],
                ["Z", "Z"]
            ]), "AXIS")
            .appendField("(deg/s)");
        this.setInputsInline(true);
        this.setOutput(true, ["float", "Number"]);
        this.setColour(230);
        this.setTooltip("อ่านค่า Gyroscope แกน X/Y/Z (หน่วย deg/s)");
        this.setHelpUrl("");
    }
};

// ========== Read Temperature ==========
Blockly.Blocks['mpu6050_read_temp'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("MPU1"), "INSTANCE")
            .appendField("Temperature (°C)");
        this.setInputsInline(true);
        this.setOutput(true, ["float", "Number"]);
        this.setColour(230);
        this.setTooltip("อ่านค่าอุณหภูมิจาก MPU6050 (หน่วย °C)");
        this.setHelpUrl("");
    }
};

// ========== Read Pitch / Roll ==========
Blockly.Blocks['mpu6050_read_angle'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("MPU1"), "INSTANCE")
            .appendField(new Blockly.FieldDropdown([
                ["Pitch", "PITCH"],
                ["Roll",  "ROLL"]
            ]), "ANGLE")
            .appendField("°");
        this.setInputsInline(true);
        this.setOutput(true, ["float", "Number"]);
        this.setColour(230);
        this.setTooltip("อ่านค่ามุม Pitch หรือ Roll (หน่วย องศา)");
        this.setHelpUrl("");
    }
};

// ========== Set Accel Range ==========
Blockly.Blocks['mpu6050_set_accel_range'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("MPU1"), "INSTANCE")
            .appendField("Set Accel Range")
            .appendField(new Blockly.FieldDropdown([
                ["±2g",  "ACCEL_2G"],
                ["±4g",  "ACCEL_4G"],
                ["±8g",  "ACCEL_8G"],
                ["±16g", "ACCEL_16G"]
            ]), "RANGE");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("ตั้งค่าช่วงวัด Accelerometer");
        this.setHelpUrl("");
    }
};

// ========== Set Gyro Range ==========
Blockly.Blocks['mpu6050_set_gyro_range'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("MPU1"), "INSTANCE")
            .appendField("Set Gyro Range")
            .appendField(new Blockly.FieldDropdown([
                ["±250 dps",  "GYRO_250DPS"],
                ["±500 dps",  "GYRO_500DPS"],
                ["±1000 dps", "GYRO_1000DPS"],
                ["±2000 dps", "GYRO_2000DPS"]
            ]), "RANGE");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("ตั้งค่าช่วงวัด Gyroscope");
        this.setHelpUrl("");
    }
};

// ========== Check Connected ==========
Blockly.Blocks['mpu6050_connected'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("MPU1"), "INSTANCE")
            .appendField("Connected?");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(230);
        this.setTooltip("ตรวจสอบว่า MPU6050 เชื่อมต่ออยู่หรือไม่");
        this.setHelpUrl("");
    }
};

console.log('✅ MPU6050 blocks loaded!');
