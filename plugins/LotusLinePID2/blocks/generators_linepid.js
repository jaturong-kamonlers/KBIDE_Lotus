// generators_linepid.js for LotusLinePID Plugin v2
'use strict';
Blockly.JavaScript = Blockly.JavaScript || {};

// ─── Helper: สร้าง pin array string ─────────────────────────────
function _lpPins(block, count) {
    var arr = [];
    for (var i = 0; i < count; i++) {
        var p = block.getFieldValue('P'+i);
        arr.push(p !== null ? p : String(i+2));
    }
    return arr.join(', ');
}

// ─── VARIABLE BLOCK ──────────────────────────────────────────────
function _lpVarBlock(instance) {
    return `
#EXTINC#include "LotusLinePID.h"#END

#VARIABLE
LotusLinePID _pid_${instance};
float _pid_${instance}_pos    = 0.5;
float _pid_${instance}_output = 0.0;
bool  _pid_${instance}_online = false;
#END
`;
}

// ── 1. Digital Setup ─────────────────────────────────────────────
Blockly.JavaScript['linepid_setup_digital'] = function(block) {
    var ins   = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var count = parseInt(block.getFieldValue('COUNT')) || 4;
    var pins  = _lpPins(block, count);
    return _lpVarBlock(ins) + `
#VARIABLE
uint8_t _pid_${ins}_pins[${count}] = {${pins}};
#END

#SETUP
  _pid_${ins}.beginDigital(_pid_${ins}_pins, ${count});
  _pid_${ins}.setSetpoint(0.5);
#END
`;
};

// ── 2. Analog Setup ──────────────────────────────────────────────
Blockly.JavaScript['linepid_setup_analog'] = function(block) {
    var ins   = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var count = parseInt(block.getFieldValue('COUNT')) || 4;
    var pins  = _lpPins(block, count);
    return _lpVarBlock(ins) + `
#VARIABLE
uint8_t _pid_${ins}_pins[${count}] = {${pins}};
#END

#SETUP
  _pid_${ins}.beginAnalog(_pid_${ins}_pins, ${count});
  _pid_${ins}.setSetpoint(0.5);
#END
`;
};

// ── 3. QTR Setup ─────────────────────────────────────────────────
Blockly.JavaScript['linepid_setup_qtr'] = function(block) {
    var ins     = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var qtype   = block.getFieldValue('QTRTYPE');   // QTR_A / QTR_RC
    var count   = parseInt(block.getFieldValue('BOARDS')) || 8;
    var timeout = block.getFieldValue('RC_TIMEOUT') || '2500';
    var pins    = _lpPins(block, count);
    var beginCall = (qtype === 'QTR_RC')
        ? `_pid_${ins}.beginQTR_RC(_pid_${ins}_pins, ${count}, ${timeout});`
        : `_pid_${ins}.beginQTR_A(_pid_${ins}_pins, ${count});`;
    return _lpVarBlock(ins) + `
#VARIABLE
uint8_t _pid_${ins}_pins[${count}] = {${pins}};
#END

#SETUP
  ${beginCall}
  _pid_${ins}.setSetpoint(0.5);
#END
`;
};

// ── 4. CD74HC4067 Mux Setup ──────────────────────────────────────
Blockly.JavaScript['linepid_setup_mux'] = function(block) {
    var ins = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var s0  = block.getFieldValue('S0')  || '2';
    var s1  = block.getFieldValue('S1')  || '3';
    var s2  = block.getFieldValue('S2')  || '4';
    var s3  = block.getFieldValue('S3')  || '5';
    var sig = block.getFieldValue('SIG') || '14';
    var en  = block.getFieldValue('EN')  || '255';
    return _lpVarBlock(ins) + `
#SETUP
  _pid_${ins}.beginMux4067(${s0}, ${s1}, ${s2}, ${s3}, ${sig}, ${en});
  _pid_${ins}.setSetpoint(0.5);
#END
`;
};

// ── SHARED GENERATORS ────────────────────────────────────────────
function _ins(b) { return Blockly.JavaScript.variableDB_.getName(b.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE); }

Blockly.JavaScript['linepid_read'] = function(b) {
    var ins = _ins(b);
    return `_pid_${ins}.readSensors();\n_pid_${ins}_pos    = _pid_${ins}.getPosition();\n_pid_${ins}_online = _pid_${ins}.onLine();\n`;
};
Blockly.JavaScript['linepid_cal_start']  = function(b) { return `_pid_${_ins(b)}.calibrateStart();\n`; };
Blockly.JavaScript['linepid_cal_sample'] = function(b) { return `_pid_${_ins(b)}.calibrateSample();\n`; };
Blockly.JavaScript['linepid_cal_end']    = function(b) { return `_pid_${_ins(b)}.calibrateEnd();\n`; };
Blockly.JavaScript['linepid_position']   = function(b) { return [`_pid_${_ins(b)}_pos`,    Blockly.JavaScript.ORDER_ATOMIC]; };
Blockly.JavaScript['linepid_online']     = function(b) { return [`_pid_${_ins(b)}_online`,  Blockly.JavaScript.ORDER_ATOMIC]; };
Blockly.JavaScript['linepid_output']     = function(b) { return [`_pid_${_ins(b)}_output`,  Blockly.JavaScript.ORDER_ATOMIC]; };

Blockly.JavaScript['linepid_set_gains'] = function(b) {
    var ins = _ins(b);
    var kp = Blockly.JavaScript.valueToCode(b,'KP',Blockly.JavaScript.ORDER_ATOMIC)||'1.0';
    var ki = Blockly.JavaScript.valueToCode(b,'KI',Blockly.JavaScript.ORDER_ATOMIC)||'0.0';
    var kd = Blockly.JavaScript.valueToCode(b,'KD',Blockly.JavaScript.ORDER_ATOMIC)||'0.0';
    return `_pid_${ins}.setGains(${kp}, ${ki}, ${kd});\n`;
};
Blockly.JavaScript['linepid_set_setpoint'] = function(b) {
    var sp = Blockly.JavaScript.valueToCode(b,'SP',Blockly.JavaScript.ORDER_ATOMIC)||'0.5';
    return `_pid_${_ins(b)}.setSetpoint(${sp});\n`;
};
Blockly.JavaScript['linepid_compute'] = function(b) {
    var ins = _ins(b);
    return `_pid_${ins}_output = _pid_${ins}.compute();\n`;
};
Blockly.JavaScript['linepid_reset'] = function(b) { return `_pid_${_ins(b)}.resetPID();\n`; };
Blockly.JavaScript['linepid_raw']   = function(b) {
    var idx = parseInt(b.getFieldValue('IDX')) - 1;
    return [`_pid_${_ins(b)}.getRaw(${idx})`, Blockly.JavaScript.ORDER_ATOMIC];
};

console.log('LotusLinePID v2 generators loaded!');
