// blocks_huskylens.js for LotusHuskyLens Plugin
'use strict';
if (!Blockly) { console.error('Blockly not found!'); }

var _ALGO_OPTS = [
    ["Face Recognition",   "ALGO_FACE_RECOGNITION"],
    ["Object Tracking",    "ALGO_OBJECT_TRACKING"],
    ["Object Recognition", "ALGO_OBJECT_RECOGNITION"],
    ["Line Tracking",      "ALGO_LINE_TRACKING"],
    ["Color Recognition",  "ALGO_COLOR_RECOGNITION"],
    ["Tag Recognition",    "ALGO_TAG_RECOGNITION"]
];

Blockly.Blocks['huskylens_setup_i2c'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("CAM1"), "INSTANCE")
        .appendField("Setup HuskyLens I2C  Algorithm")
        .appendField(new Blockly.FieldDropdown(_ALGO_OPTS), "ALGO");
    this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(230); this.setTooltip("Setup HuskyLens ผ่าน I2C - วางใน Setup"); this.setHelpUrl("");
}};

Blockly.Blocks['huskylens_setup_uart'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("CAM1"), "INSTANCE")
        .appendField("Setup HuskyLens UART  baud")
        .appendField(new Blockly.FieldDropdown([
            ["9600","9600"],["19200","19200"],["38400","38400"],["57600","57600"],["115200","115200"]
        ]), "BAUD")
        .appendField("Algorithm")
        .appendField(new Blockly.FieldDropdown(_ALGO_OPTS), "ALGO");
    this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(230); this.setTooltip("Setup HuskyLens ผ่าน UART (Serial) - วางใน Setup"); this.setHelpUrl("");
}};

Blockly.Blocks['huskylens_switch_algo'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("CAM1"), "INSTANCE")
        .appendField("Switch Algorithm")
        .appendField(new Blockly.FieldDropdown(_ALGO_OPTS), "ALGO");
    this.setInputsInline(true); this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(230); this.setTooltip("สลับ Algorithm ของ HuskyLens"); this.setHelpUrl("");
}};

Blockly.Blocks['huskylens_request'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("CAM1"), "INSTANCE")
        .appendField("Request")
        .appendField(new Blockly.FieldDropdown([
            ["All","ALL"],["Blocks","BLOCKS"],["Arrows","ARROWS"],["Learned","LEARNED"]
        ]), "REQTYPE");
    this.setInputsInline(true); this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(230); this.setTooltip("ขอข้อมูลจาก HuskyLens 1 เฟรม - วางต้น Loop"); this.setHelpUrl("");
}};

Blockly.Blocks['huskylens_request_id'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("CAM1"), "INSTANCE")
        .appendField("Request by ID");
    this.appendValueInput("ID").setCheck("Number");
    this.setInputsInline(true); this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(230); this.setTooltip("ขอข้อมูลจาก HuskyLens เฉพาะ ID ที่กำหนด"); this.setHelpUrl("");
}};

Blockly.Blocks['huskylens_block_count'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("CAM1"), "INSTANCE")
        .appendField("Block count");
    this.setInputsInline(true); this.setOutput(true,["int","Number"]);
    this.setColour(230); this.setTooltip("จำนวน Block ที่ตรวจพบ"); this.setHelpUrl("");
}};

Blockly.Blocks['huskylens_arrow_count'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("CAM1"), "INSTANCE")
        .appendField("Arrow count");
    this.setInputsInline(true); this.setOutput(true,["int","Number"]);
    this.setColour(230); this.setTooltip("จำนวน Arrow ที่ตรวจพบ"); this.setHelpUrl("");
}};

Blockly.Blocks['huskylens_get_block'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("CAM1"), "INSTANCE")
        .appendField("Block #");
    this.appendValueInput("IDX").setCheck("Number");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
            ["X","x"],["Y","y"],["W","w"],["H","h"],["ID","id"]
        ]), "PROP");
    this.setInputsInline(true); this.setOutput(true,["int","Number"]);
    this.setColour(230); this.setTooltip("อ่านค่า Block ที่ index: X Y W H ID"); this.setHelpUrl("");
}};

Blockly.Blocks['huskylens_get_arrow'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("CAM1"), "INSTANCE")
        .appendField("Arrow #");
    this.appendValueInput("IDX").setCheck("Number");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
            ["X Tail","xTail"],["Y Tail","yTail"],
            ["X Head","xHead"],["Y Head","yHead"],["ID","id"]
        ]), "PROP");
    this.setInputsInline(true); this.setOutput(true,["int","Number"]);
    this.setColour(230); this.setTooltip("อ่านค่า Arrow ที่ index: xTail yTail xHead yHead ID"); this.setHelpUrl("");
}};

Blockly.Blocks['huskylens_is_learned'] = { init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("CAM1"), "INSTANCE")
        .appendField("Is Learned? ID");
    this.appendValueInput("ID").setCheck("Number");
    this.setInputsInline(true); this.setOutput(true,"Boolean");
    this.setColour(230); this.setTooltip("true = พบวัตถุที่มี ID นี้ใน frame ปัจจุบัน"); this.setHelpUrl("");
}};

console.log('LotusHuskyLens blocks loaded!');
