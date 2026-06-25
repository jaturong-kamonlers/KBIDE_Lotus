// blocks_servo.js for Servo Plugin
'use strict';

if (!Blockly) {
    console.error('Blockly not found!');
}

// ========== Servo Setup ==========
Blockly.Blocks['lotus_servo_setup'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("SRV1"), "INSTANCE")
            .appendField("Setup Servo pin")
            .appendField(new Blockly.FieldNumber(9, 0, 13, 1), "PIN");
        this.appendDummyInput()
            .appendField("min")
            .appendField(new Blockly.FieldNumber(544, 0, 2400, 1), "MIN_US")
            .appendField("μs  max")
            .appendField(new Blockly.FieldNumber(2400, 0, 2400, 1), "MAX_US")
            .appendField("μs");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("ตั้งค่า Servo กำหนดขา PWM และช่วง pulse width - วางใน Setup");
        this.setHelpUrl("");
    }
};

// ========== Set Angle ==========
Blockly.Blocks['lotus_servo_angle'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("SRV1"), "INSTANCE")
            .appendField("Servo angle");
        this.appendValueInput("ANGLE")
            .setCheck("Number");
        this.appendDummyInput()
            .appendField("°");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("หมุน Servo ไปยังองศาที่กำหนด (0 - 180°)");
        this.setHelpUrl("");
    }
};

// ========== Set Microseconds ==========
Blockly.Blocks['lotus_servo_microseconds'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("SRV1"), "INSTANCE")
            .appendField("Servo pulse");
        this.appendValueInput("US")
            .setCheck("Number");
        this.appendDummyInput()
            .appendField("μs");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("ส่ง pulse width ให้ Servo โดยตรง (หน่วย microseconds เช่น 1000-2000)");
        this.setHelpUrl("");
    }
};

// ========== Detach ==========
Blockly.Blocks['lotus_servo_detach'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("SRV1"), "INSTANCE")
            .appendField("Servo detach");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("หยุดส่ง PWM signal ให้ Servo (ปล่อยให้หมุนได้อิสระ)");
        this.setHelpUrl("");
    }
};

console.log('✅ Servo blocks loaded!');
