// blocks_armik.js for LotusArmIK Plugin
'use strict';
if (!Blockly) { console.error('Blockly not found!'); }

var _DOF_OPTS = [["2DOF","2"],["3DOF","3"],["4DOF","4"]];
var _JOINT_OPTS = [["Joint 0 (Base/Shoulder)","0"],["Joint 1 (Shoulder/Elbow)","1"],["Joint 2 (Elbow/Wrist)","2"],["Joint 3 (Wrist)","3"]];

// ── Setup Arm ──────────────────────────────────────────────────
Blockly.Blocks['armik_setup'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("ARM1"), "INSTANCE")
        .appendField("Setup Arm IK")
        .appendField(new Blockly.FieldDropdown(_DOF_OPTS), "DOF");
    this.appendDummyInput()
        .appendField("L1")
        .appendField(new Blockly.FieldNumber(100, 1, 2000, 1), "L1")
        .appendField("mm  L2")
        .appendField(new Blockly.FieldNumber(100, 1, 2000, 1), "L2")
        .appendField("mm  L3")
        .appendField(new Blockly.FieldNumber(80,  0, 2000, 1), "L3")
        .appendField("mm  L4")
        .appendField(new Blockly.FieldNumber(60,  0, 2000, 1), "L4")
        .appendField("mm");
    this.setInputsInline(false);
    this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(160);
    this.setTooltip("Setup แขนกล IK เลือก DOF และความยาวแต่ละ link (mm)\n2DOF: L1+L2, 3DOF: L1+L2+L3, 4DOF: L1+L2+L3+L4");
    this.setHelpUrl("");
}};

// ── Attach Joint → PCA9685 ─────────────────────────────────────
Blockly.Blocks['armik_attach_pca'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("ARM1"), "INSTANCE")
        .appendField("Attach")
        .appendField(new Blockly.FieldDropdown(_JOINT_OPTS), "JOINT")
        .appendField("PCA")
        .appendField(new Blockly.FieldVariable("PCA1"), "PCA")
        .appendField("ch")
        .appendField(new Blockly.FieldNumber(0, 0, 15, 1), "CH");
    this.appendDummyInput()
        .appendField("min")
        .appendField(new Blockly.FieldNumber(0,   0, 180, 1), "MIN")
        .appendField("°  max")
        .appendField(new Blockly.FieldNumber(180, 0, 180, 1), "MAX")
        .appendField("°  home")
        .appendField(new Blockly.FieldNumber(90,  0, 180, 1), "HOME")
        .appendField("°  offset")
        .appendField(new Blockly.FieldNumber(0, -90, 90, 1), "OFFSET")
        .appendField("°  reverse")
        .appendField(new Blockly.FieldDropdown([["No","0"],["Yes","1"]]), "REV");
    this.setInputsInline(false);
    this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(160);
    this.setTooltip("เชื่อม Joint กับ PCA9685 channel กำหนดขอบเขต, home, offset, และทิศทาง");
    this.setHelpUrl("");
}};

// ── Attach Joint → Arduino Servo ──────────────────────────────
Blockly.Blocks['armik_attach_servo'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("ARM1"), "INSTANCE")
        .appendField("Attach")
        .appendField(new Blockly.FieldDropdown(_JOINT_OPTS), "JOINT")
        .appendField("Servo pin")
        .appendField(new Blockly.FieldNumber(9, 0, 21, 1), "PIN");
    this.appendDummyInput()
        .appendField("min")
        .appendField(new Blockly.FieldNumber(0,   0, 180, 1), "MIN")
        .appendField("°  max")
        .appendField(new Blockly.FieldNumber(180, 0, 180, 1), "MAX")
        .appendField("°  home")
        .appendField(new Blockly.FieldNumber(90,  0, 180, 1), "HOME")
        .appendField("°  offset")
        .appendField(new Blockly.FieldNumber(0, -90, 90, 1), "OFFSET")
        .appendField("°  reverse")
        .appendField(new Blockly.FieldDropdown([["No","0"],["Yes","1"]]), "REV");
    this.setInputsInline(false);
    this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(160);
    this.setTooltip("เชื่อม Joint กับ Arduino Servo.h pin");
    this.setHelpUrl("");
}};

// ── Move To XY (2DOF/3DOF) ─────────────────────────────────────
Blockly.Blocks['armik_move_xy'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("ARM1"), "INSTANCE")
        .appendField("Move To");
    this.appendValueInput("X").setCheck("Number").appendField("X");
    this.appendValueInput("Y").setCheck("Number").appendField("Y");
    this.appendValueInput("PHI").setCheck("Number").appendField("Wrist φ");
    this.appendDummyInput().appendField("mm / °");
    this.setInputsInline(true);
    this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(160);
    this.setTooltip("สั่งแขนกลไปยัง (X, Y) mm จาก pivot\nWrist φ = 0 แนวนอน (ใช้สำหรับ 3DOF เท่านั้น)");
    this.setHelpUrl("");
}};

// ── Move To XYZ (4DOF) ─────────────────────────────────────────
Blockly.Blocks['armik_move_xyz'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("ARM1"), "INSTANCE")
        .appendField("Move To 3D");
    this.appendValueInput("X").setCheck("Number").appendField("X");
    this.appendValueInput("Y").setCheck("Number").appendField("Y");
    this.appendValueInput("Z").setCheck("Number").appendField("Z");
    this.appendValueInput("PHI").setCheck("Number").appendField("Wrist φ");
    this.appendDummyInput().appendField("mm / °");
    this.setInputsInline(true);
    this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(160);
    this.setTooltip("สั่งแขนกลไปยัง (X, Y, Z) mm สำหรับ 4DOF\nBase หมุนใน XY-plane, แขนยืดใน Z");
    this.setHelpUrl("");
}};

// ── Set Joint Angle ────────────────────────────────────────────
Blockly.Blocks['armik_set_joint'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("ARM1"), "INSTANCE")
        .appendField("Set Joint")
        .appendField(new Blockly.FieldDropdown(_JOINT_OPTS), "JOINT");
    this.appendValueInput("ANGLE").setCheck("Number").appendField("angle");
    this.appendDummyInput().appendField("°");
    this.setInputsInline(true);
    this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(160);
    this.setTooltip("สั่ง Joint โดยตรงด้วยองศา (ข้าม IK)");
    this.setHelpUrl("");
}};

// ── Get Joint Angle ────────────────────────────────────────────
Blockly.Blocks['armik_get_joint'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("ARM1"), "INSTANCE")
        .appendField("Get Joint")
        .appendField(new Blockly.FieldDropdown(_JOINT_OPTS), "JOINT")
        .appendField("angle °");
    this.setInputsInline(true);
    this.setOutput(true, ["float","Number"]);
    this.setColour(160);
    this.setTooltip("อ่านค่าองศาปัจจุบันของ Joint");
    this.setHelpUrl("");
}};

// ── Is Reachable ───────────────────────────────────────────────
Blockly.Blocks['armik_reachable'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("ARM1"), "INSTANCE")
        .appendField("Is Reachable?");
    this.appendValueInput("X").setCheck("Number").appendField("X");
    this.appendValueInput("Y").setCheck("Number").appendField("Y");
    this.appendDummyInput().appendField("mm");
    this.setInputsInline(true);
    this.setOutput(true,"Boolean");
    this.setColour(160);
    this.setTooltip("ตรวจสอบว่า (X, Y) อยู่ใน workspace ของแขนกลหรือไม่");
    this.setHelpUrl("");
}};

// ── Move Home ──────────────────────────────────────────────────
Blockly.Blocks['armik_home'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("ARM1"), "INSTANCE")
        .appendField("Move Home");
    this.setInputsInline(true);
    this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(160);
    this.setTooltip("สั่งแขนกลกลับตำแหน่ง Home ทุก Joint");
    this.setHelpUrl("");
}};

console.log('LotusArmIK blocks loaded!');
