// blocks_pca9685.js for LotusPCA9685 Plugin
'use strict';
if (!Blockly) { console.error('Blockly not found!'); }

Blockly.Blocks['pca9685_setup'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("PCA1"), "INSTANCE")
        .appendField("Setup PCA9685  addr 0x")
        .appendField(new Blockly.FieldDropdown([
            ["40","40"],["41","41"],["42","42"],["43","43"],
            ["44","44"],["45","45"],["46","46"],["47","47"]
        ]), "ADDR")
        .appendField("freq")
        .appendField(new Blockly.FieldNumber(50, 24, 1526, 1), "FREQ")
        .appendField("Hz");
    this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(20);
    this.setTooltip("Setup PCA9685 I2C Servo Driver 16ch\naddr 0x40-0x47 (ตาม jumper A0-A5), freq=50Hz สำหรับ Servo");
    this.setHelpUrl("");
}};

Blockly.Blocks['pca9685_set_angle'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("PCA1"), "INSTANCE")
        .appendField("Set Angle  ch")
        .appendField(new Blockly.FieldNumber(0, 0, 15, 1), "CH");
    this.appendValueInput("ANGLE").setCheck("Number").appendField("angle");
    this.appendDummyInput().appendField("°");
    this.setInputsInline(true);
    this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(20);
    this.setTooltip("สั่ง Servo ที่ channel 0-15 ไปยังองศา 0-180°");
    this.setHelpUrl("");
}};

Blockly.Blocks['pca9685_set_us'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("PCA1"), "INSTANCE")
        .appendField("Set Pulse  ch")
        .appendField(new Blockly.FieldNumber(0, 0, 15, 1), "CH");
    this.appendValueInput("US").setCheck("Number").appendField("pulse");
    this.appendDummyInput().appendField("μs");
    this.setInputsInline(true);
    this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(20);
    this.setTooltip("ส่ง pulse width ให้ channel โดยตรง (microseconds)");
    this.setHelpUrl("");
}};

Blockly.Blocks['pca9685_set_pwm'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("PCA1"), "INSTANCE")
        .appendField("Set PWM Raw  ch")
        .appendField(new Blockly.FieldNumber(0, 0, 15, 1), "CH");
    this.appendValueInput("ON").setCheck("Number").appendField("on");
    this.appendValueInput("OFF").setCheck("Number").appendField("off");
    this.setInputsInline(true);
    this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(20);
    this.setTooltip("ตั้ง PWM raw (0-4095) สำหรับ LED/Motor");
    this.setHelpUrl("");
}};

Blockly.Blocks['pca9685_set_off'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("PCA1"), "INSTANCE")
        .appendField("Set Off  ch")
        .appendField(new Blockly.FieldNumber(0, 0, 15, 1), "CH");
    this.setInputsInline(true);
    this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(20); this.setTooltip("ปิด output channel นี้"); this.setHelpUrl("");
}};

Blockly.Blocks['pca9685_all_off'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("PCA1"), "INSTANCE")
        .appendField("All Channels Off");
    this.setInputsInline(true);
    this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(20); this.setTooltip("ปิด PWM ทุก channel พร้อมกัน"); this.setHelpUrl("");
}};

Blockly.Blocks['pca9685_calibrate'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("PCA1"), "INSTANCE")
        .appendField("Calibrate  ch")
        .appendField(new Blockly.FieldNumber(0, 0, 15, 1), "CH")
        .appendField("min")
        .appendField(new Blockly.FieldNumber(544,  100, 2500, 1), "MIN_US")
        .appendField("max")
        .appendField(new Blockly.FieldNumber(2400, 100, 2500, 1), "MAX_US")
        .appendField("μs");
    this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(20);
    this.setTooltip("ตั้งค่า pulse width min/max ของ channel (ใช้สำหรับ Set Angle)");
    this.setHelpUrl("");
}};

console.log('LotusPCA9685 blocks loaded!');
