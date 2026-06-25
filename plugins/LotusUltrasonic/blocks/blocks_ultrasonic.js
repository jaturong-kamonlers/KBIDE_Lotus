// blocks_ultrasonic.js for LotusUltrasonic Plugin
// Fixed: FieldVariable type removed (prevent ID conflict), FieldTextInput → FieldNumber
'use strict';

// ── Setup ──────────────────────────────────────────────────────
Blockly.Blocks['ultrasonic_setup'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("US1"), "instance")
            .appendField("Setup Ultrasonic  TRIG")
            .appendField(new Blockly.FieldNumber(9, 0, 21, 1), "TRIG")
            .appendField("ECHO")
            .appendField(new Blockly.FieldNumber(10, 0, 21, 1), "ECHO");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(220);
        this.setTooltip("Setup HC-SR04 Ultrasonic sensor กำหนดขา TRIG และ ECHO");
        this.setHelpUrl("");
    }
};

// ── Read Distance cm ───────────────────────────────────────────
Blockly.Blocks['ultrasonic_read_distance_cm'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("US1"), "instance")
            .appendField("Distance (cm)");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(220);
        this.setTooltip("วัดระยะทางจาก HC-SR04 (หน่วย cm) สูงสุด ~400cm");
        this.setHelpUrl("");
    }
};

// ── Read Distance mm ───────────────────────────────────────────
Blockly.Blocks['ultrasonic_read_distance_mm'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("US1"), "instance")
            .appendField("Distance (mm)");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(220);
        this.setTooltip("วัดระยะทางจาก HC-SR04 (หน่วย mm)");
        this.setHelpUrl("");
    }
};

// ── Object Detected ────────────────────────────────────────────
Blockly.Blocks['ultrasonic_detected'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("US1"), "instance")
            .appendField("Detected within");
        this.appendValueInput("DIST").setCheck("Number");
        this.appendDummyInput().appendField("cm");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(220);
        this.setTooltip("true = มีวัตถุอยู่ภายในระยะที่กำหนด (cm)");
        this.setHelpUrl("");
    }
};

console.log('LotusUltrasonic blocks loaded!');
