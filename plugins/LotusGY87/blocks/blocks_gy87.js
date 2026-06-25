// blocks_gy87.js for LotusGY87 Plugin
'use strict';
if (!Blockly) { console.error('Blockly not found!'); }

// ── Setup ──────────────────────────────────────────────────────
Blockly.Blocks['gy87_setup'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("IMU1"), "INSTANCE")
        .appendField("Setup GY-87");
    this.appendDummyInput()
        .appendField("Accel")
        .appendField(new Blockly.FieldDropdown([
            ["±2g","ACCEL_2G"],["±4g","ACCEL_4G"],["±8g","ACCEL_8G"],["±16g","ACCEL_16G"]
        ]), "ACCEL_RANGE")
        .appendField("Gyro")
        .appendField(new Blockly.FieldDropdown([
            ["±250°/s","GYRO_250"],["±500°/s","GYRO_500"],["±1000°/s","GYRO_1000"],["±2000°/s","GYRO_2000"]
        ]), "GYRO_RANGE")
        .appendField("Beta")
        .appendField(new Blockly.FieldNumber(0.1, 0.01, 1.0, 0.01), "BETA");
    this.appendDummyInput()
        .appendField("Sea Level")
        .appendField(new Blockly.FieldNumber(1013.25, 900, 1100, 0.01), "SEA_LEVEL")
        .appendField("hPa");
    this.setInputsInline(false);
    this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(345);
    this.setTooltip("Setup GY-87 (MPU6050 + HMC5883L + BMP180)\nBeta: ค่า Madgwick filter gain (0.01=ช้า/แม่น, 0.5=เร็ว/ไม่แม่น)\nSea Level: ความดันระดับน้ำทะเล (hPa) สำหรับคำนวณความสูง");
    this.setHelpUrl("");
}};

// ── Update ────────────────────────────────────────────────────
Blockly.Blocks['gy87_update'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("IMU1"), "INSTANCE")
        .appendField("Update GY-87");
    this.setInputsInline(true);
    this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(345);
    this.setTooltip("อ่านค่าจากทุก sensor และอัปเดต Madgwick filter - วางต้น Loop");
    this.setHelpUrl("");
}};

// ── Calibrate ─────────────────────────────────────────────────
Blockly.Blocks['gy87_calibrate'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("IMU1"), "INSTANCE")
        .appendField("Calibrate")
        .appendField(new Blockly.FieldNumber(500, 100, 2000, 50), "SAMPLES")
        .appendField("samples");
    this.setInputsInline(true);
    this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(345);
    this.setTooltip("Calibrate MPU6050 (วางบอร์ดให้นิ่งบนพื้นราบ)\nเก็บ N samples คำนวณ offset อัตโนมัติ ใช้เวลา ~1 วินาที");
    this.setHelpUrl("");
}};

// ── Accel ─────────────────────────────────────────────────────
Blockly.Blocks['gy87_accel'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("IMU1"), "INSTANCE")
        .appendField("Accel")
        .appendField(new Blockly.FieldDropdown([["X","X"],["Y","Y"],["Z","Z"]]), "AXIS");
    this.setInputsInline(true);
    this.setOutput(true, ["float","Number"]);
    this.setColour(345);
    this.setTooltip("ค่า Acceleration แกน X/Y/Z (หน่วย g)");
    this.setHelpUrl("");
}};

// ── Gyro ──────────────────────────────────────────────────────
Blockly.Blocks['gy87_gyro'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("IMU1"), "INSTANCE")
        .appendField("Gyro")
        .appendField(new Blockly.FieldDropdown([["X","X"],["Y","Y"],["Z","Z"]]), "AXIS");
    this.setInputsInline(true);
    this.setOutput(true, ["float","Number"]);
    this.setColour(345);
    this.setTooltip("ค่า Angular velocity แกน X/Y/Z (หน่วย °/s)");
    this.setHelpUrl("");
}};

// ── Pitch / Roll / Yaw ────────────────────────────────────────
Blockly.Blocks['gy87_attitude'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("IMU1"), "INSTANCE")
        .appendField(new Blockly.FieldDropdown([
            ["Pitch","PITCH"],["Roll","ROLL"],["Yaw","YAW"]
        ]), "AXIS");
    this.setInputsInline(true);
    this.setOutput(true, ["float","Number"]);
    this.setColour(345);
    this.setTooltip("Pitch/Roll/Yaw จาก Madgwick filter (°)\nPitch: เงยหน้า/ก้มหน้า, Roll: เอียงซ้าย/ขวา, Yaw: หมุนซ้าย/ขวา (ต้องการ Mag)");
    this.setHelpUrl("");
}};

// ── Heading ───────────────────────────────────────────────────
Blockly.Blocks['gy87_heading'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("IMU1"), "INSTANCE")
        .appendField("Heading (°)");
    this.setInputsInline(true);
    this.setOutput(true, ["float","Number"]);
    this.setColour(345);
    this.setTooltip("ทิศทาง 0-360° จาก HMC5883L (Tilt-compensated)\n0°=เหนือ, 90°=ตะวันออก, 180°=ใต้, 270°=ตะวันตก");
    this.setHelpUrl("");
}};

// ── MPU Temp ──────────────────────────────────────────────────
Blockly.Blocks['gy87_mpu_temp'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("IMU1"), "INSTANCE")
        .appendField("MPU Temp (°C)");
    this.setInputsInline(true);
    this.setOutput(true, ["float","Number"]);
    this.setColour(345);
    this.setTooltip("อุณหภูมิจาก MPU6050 (ภายใน chip ไม่ใช่อุณหภูมิอากาศ)");
    this.setHelpUrl("");
}};

// ── BMP180 ────────────────────────────────────────────────────
Blockly.Blocks['gy87_bmp'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("IMU1"), "INSTANCE")
        .appendField("BMP180")
        .appendField(new Blockly.FieldDropdown([
            ["Temperature (°C)","TEMP"],
            ["Pressure (Pa)",   "PRES"],
            ["Altitude (m)",    "ALT"]
        ]), "MEAS");
    this.setInputsInline(true);
    this.setOutput(true, ["float","Number"]);
    this.setColour(345);
    this.setTooltip("BMP180: อุณหภูมิ (°C), ความดัน (Pa), ความสูง (m)");
    this.setHelpUrl("");
}};

// ── Set Accel/Gyro Range ──────────────────────────────────────
Blockly.Blocks['gy87_set_range'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("IMU1"), "INSTANCE")
        .appendField("Set")
        .appendField(new Blockly.FieldDropdown([
            ["Accel Range","ACCEL"],["Gyro Range","GYRO"]
        ]), "SENSOR")
        .appendField(new Blockly.FieldDropdown([
            ["±2g / ±250°/s","0"],["±4g / ±500°/s","1"],
            ["±8g / ±1000°/s","2"],["±16g / ±2000°/s","3"]
        ]), "RANGE");
    this.setInputsInline(true);
    this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(345);
    this.setTooltip("เปลี่ยน range ของ Accel หรือ Gyro ขณะรันโปรแกรม");
    this.setHelpUrl("");
}};

console.log('LotusGY87 blocks loaded!');
