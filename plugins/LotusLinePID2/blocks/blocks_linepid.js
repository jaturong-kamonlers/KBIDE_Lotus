// blocks_linepid.js for LotusLinePID Plugin v2
'use strict';
if (!Blockly) { console.error('Blockly not found!'); }

function _lpCountOpts(min, max) {
    var o = [];
    for (var i = min; i <= max; i++) o.push([i+'', i+'']);
    return o;
}

// ── 1. Digital Setup ──
Blockly.Blocks['linepid_setup_digital'] = {
    init: function() {
        var self = this;
        this.appendDummyInput('HEADER')
            .appendField(new Blockly.FieldVariable("PID1"), "INSTANCE")
            .appendField("Setup LinePID Digital sensors")
            .appendField(new Blockly.FieldDropdown(_lpCountOpts(1,16), function(v) {
                self._showPins(parseInt(v)); return v;
            }), "COUNT");
        for (var row = 0; row < 4; row++) {
            var inp = this.appendDummyInput('ROW'+row);
            for (var col = 0; col < 4; col++) {
                var idx = row*4+col;
                inp.appendField('D'+(idx+1)+':')
                   .appendField(new Blockly.FieldNumber(idx+2, 0, 21, 1), 'P'+idx);
            }
        }
        this.setPreviousStatement(true, null); this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("Setup LinePID แบบ Digital (0/1) เลือกจำนวน 1-16 sensor");
        this.setHelpUrl(""); this._showPins(4);
    },
    _showPins: function(count) {
        for (var r = 0; r < 4; r++) {
            var inp = this.getInput('ROW'+r);
            if (inp) inp.setVisible(r*4 < count);
        }
        if (this.rendered) this.render();
    }
};

// ── 2. Analog Setup ──
Blockly.Blocks['linepid_setup_analog'] = {
    init: function() {
        var self = this;
        this.appendDummyInput('HEADER')
            .appendField(new Blockly.FieldVariable("PID1"), "INSTANCE")
            .appendField("Setup LinePID Analog sensors")
            .appendField(new Blockly.FieldDropdown(_lpCountOpts(1,8), function(v) {
                self._showPins(parseInt(v)); return v;
            }), "COUNT");
        for (var row = 0; row < 2; row++) {
            var inp = this.appendDummyInput('ROW'+row);
            for (var col = 0; col < 4; col++) {
                var idx = row*4+col;
                inp.appendField('A'+(idx+1)+':')
                   .appendField(new Blockly.FieldNumber(14+idx, 14, 21, 1), 'P'+idx);
            }
        }
        this.setPreviousStatement(true, null); this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("Setup LinePID แบบ Analog (0-1023) เลือกจำนวน 1-8 sensor");
        this.setHelpUrl(""); this._showPins(4);
    },
    _showPins: function(count) {
        for (var r = 0; r < 2; r++) {
            var inp = this.getInput('ROW'+r);
            if (inp) inp.setVisible(r*4 < count);
        }
        if (this.rendered) this.render();
    }
};

// ── 3. QTR-8A / QTR-8RC Setup ──
Blockly.Blocks['linepid_setup_qtr'] = {
    init: function() {
        var self = this;
        this.appendDummyInput('HEADER')
            .appendField(new Blockly.FieldVariable("PID1"), "INSTANCE")
            .appendField("Setup LinePID QTR")
            .appendField(new Blockly.FieldDropdown([
                ["QTR-8A  (Analog)",  "QTR_A"],
                ["QTR-8RC (Digital)", "QTR_RC"]
            ]), "QTRTYPE")
            .appendField(new Blockly.FieldDropdown([
                ["1 บอร์ด (8 sensors)",  "8"],
                ["2 บอร์ด (16 sensors)", "16"]
            ], function(v) { self._showPins(parseInt(v)); return v; }), "BOARDS");
        this.appendDummyInput('TIMEOUT')
            .appendField("RC timeout")
            .appendField(new Blockly.FieldNumber(2500, 500, 10000, 1), "RC_TIMEOUT")
            .appendField("μs  (QTR-RC only)");
        for (var row = 0; row < 4; row++) {
            var inp = this.appendDummyInput('ROW'+row);
            for (var col = 0; col < 4; col++) {
                var idx = row*4+col;
                inp.appendField('S'+(idx+1)+':')
                   .appendField(new Blockly.FieldNumber(idx+2, 0, 21, 1), 'P'+idx);
            }
        }
        this.setPreviousStatement(true, null); this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("Setup LinePID แบบ QTR-8A (Analog) หรือ QTR-8RC (RC Timing) รองรับ 1-2 บอร์ด");
        this.setHelpUrl(""); this._showPins(8);
    },
    _showPins: function(count) {
        for (var r = 0; r < 4; r++) {
            var inp = this.getInput('ROW'+r);
            if (inp) inp.setVisible(r*4 < count);
        }
        if (this.rendered) this.render();
    }
};

// ── 4. CD74HC4067 Mux Setup ──
Blockly.Blocks['linepid_setup_mux'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("PID1"), "INSTANCE")
            .appendField("Setup LinePID CD74HC4067");
        this.appendDummyInput()
            .appendField("S0:").appendField(new Blockly.FieldNumber(2, 0, 21, 1), "S0")
            .appendField("S1:").appendField(new Blockly.FieldNumber(3, 0, 21, 1), "S1")
            .appendField("S2:").appendField(new Blockly.FieldNumber(4, 0, 21, 1), "S2")
            .appendField("S3:").appendField(new Blockly.FieldNumber(5, 0, 21, 1), "S3");
        this.appendDummyInput()
            .appendField("SIG (Analog):").appendField(new Blockly.FieldNumber(14, 14, 21, 1), "SIG")
            .appendField("EN:").appendField(new Blockly.FieldNumber(255, 0, 255, 1), "EN")
            .appendField("(255=unused)");
        this.setPreviousStatement(true, null); this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("Setup LinePID แบบ CD74HC4067 16-ch Analog Mux\nS0-S3=select pins, SIG=analog input, EN=enable (255=unused)");
        this.setHelpUrl("");
    }
};

// ══ SHARED BLOCKS ══
Blockly.Blocks['linepid_read'] = { init: function() {
    this.appendDummyInput().appendField(new Blockly.FieldVariable("PID1"),"INSTANCE").appendField("Read Sensors");
    this.setInputsInline(true); this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(230); this.setTooltip("อ่านค่า Sensor ทั้งหมดและคำนวณตำแหน่งเส้น - วางต้น Loop"); this.setHelpUrl("");
}};
Blockly.Blocks['linepid_cal_start'] = { init: function() {
    this.appendDummyInput().appendField(new Blockly.FieldVariable("PID1"),"INSTANCE").appendField("Calibrate Start");
    this.setInputsInline(true); this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(230); this.setTooltip("เริ่ม Calibrate รีเซ็ตค่า min/max"); this.setHelpUrl("");
}};
Blockly.Blocks['linepid_cal_sample'] = { init: function() {
    this.appendDummyInput().appendField(new Blockly.FieldVariable("PID1"),"INSTANCE").appendField("Calibrate Sample");
    this.setInputsInline(true); this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(230); this.setTooltip("เก็บตัวอย่างค่า Sensor (วนซ้ำหลายครั้ง)"); this.setHelpUrl("");
}};
Blockly.Blocks['linepid_cal_end'] = { init: function() {
    this.appendDummyInput().appendField(new Blockly.FieldVariable("PID1"),"INSTANCE").appendField("Calibrate End");
    this.setInputsInline(true); this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(230); this.setTooltip("จบการ Calibrate บันทึกค่า min/max"); this.setHelpUrl("");
}};
Blockly.Blocks['linepid_position'] = { init: function() {
    this.appendDummyInput().appendField(new Blockly.FieldVariable("PID1"),"INSTANCE").appendField("Position (0.0-1.0)");
    this.setInputsInline(true); this.setOutput(true,["float","Number"]);
    this.setColour(230); this.setTooltip("ตำแหน่งเส้น 0.0=ซ้าย 0.5=กลาง 1.0=ขวา"); this.setHelpUrl("");
}};
Blockly.Blocks['linepid_online'] = { init: function() {
    this.appendDummyInput().appendField(new Blockly.FieldVariable("PID1"),"INSTANCE").appendField("On Line?");
    this.setInputsInline(true); this.setOutput(true,"Boolean");
    this.setColour(230); this.setTooltip("true = มี Sensor เจอเส้นอย่างน้อย 1 ตัว"); this.setHelpUrl("");
}};
Blockly.Blocks['linepid_set_gains'] = { init: function() {
    this.appendDummyInput().appendField(new Blockly.FieldVariable("PID1"),"INSTANCE").appendField("Set PID");
    this.appendValueInput("KP").setCheck("Number").appendField("Kp");
    this.appendValueInput("KI").setCheck("Number").appendField("Ki");
    this.appendValueInput("KD").setCheck("Number").appendField("Kd");
    this.setInputsInline(true); this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(230); this.setTooltip("ตั้งค่า Kp Ki Kd"); this.setHelpUrl("");
}};
Blockly.Blocks['linepid_set_setpoint'] = { init: function() {
    this.appendDummyInput().appendField(new Blockly.FieldVariable("PID1"),"INSTANCE").appendField("Set Setpoint");
    this.appendValueInput("SP").setCheck("Number");
    this.setInputsInline(true); this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(230); this.setTooltip("ตั้ง Setpoint (ปกติ 0.5 = กึ่งกลาง)"); this.setHelpUrl("");
}};
Blockly.Blocks['linepid_compute'] = { init: function() {
    this.appendDummyInput().appendField(new Blockly.FieldVariable("PID1"),"INSTANCE").appendField("Compute PID");
    this.setInputsInline(true); this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(230); this.setTooltip("คำนวณ PID output จาก position ปัจจุบัน"); this.setHelpUrl("");
}};
Blockly.Blocks['linepid_output'] = { init: function() {
    this.appendDummyInput().appendField(new Blockly.FieldVariable("PID1"),"INSTANCE").appendField("PID Output");
    this.setInputsInline(true); this.setOutput(true,["float","Number"]);
    this.setColour(230); this.setTooltip("ค่า PID output (ลบ=ซ้าย บวก=ขวา)"); this.setHelpUrl("");
}};
Blockly.Blocks['linepid_reset'] = { init: function() {
    this.appendDummyInput().appendField(new Blockly.FieldVariable("PID1"),"INSTANCE").appendField("Reset PID");
    this.setInputsInline(true); this.setPreviousStatement(true,null); this.setNextStatement(true,null);
    this.setColour(230); this.setTooltip("รีเซ็ต integral และ error สะสม"); this.setHelpUrl("");
}};
Blockly.Blocks['linepid_raw'] = { init: function() {
    this.appendDummyInput().appendField(new Blockly.FieldVariable("PID1"),"INSTANCE")
        .appendField("Raw Sensor").appendField(new Blockly.FieldNumber(1,1,16,1),"IDX");
    this.setInputsInline(true); this.setOutput(true,["int","Number"]);
    this.setColour(230); this.setTooltip("ค่าดิบของ Sensor ตัวที่ N (1-16)"); this.setHelpUrl("");
}};

console.log('LotusLinePID v2 blocks loaded!');
