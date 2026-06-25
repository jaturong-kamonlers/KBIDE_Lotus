// generators_armik.js for LotusArmIK Plugin
'use strict';
Blockly.JavaScript = Blockly.JavaScript || {};

function _ains(b) { return Blockly.JavaScript.variableDB_.getName(b.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE); }

function _armVars(ins) {
    return `
#EXTINC#include <math.h>#END
#EXTINC#if defined(ARDUINO_ARCH_ESP32) || defined(ESP32)
  #include <ESP32Servo.h>
#else
  #include <Servo.h>
#endif#END
#EXTINC#include "LotusArmIK.h"#END

#VARIABLE
LotusArmIK _arm_${ins};
bool _arm_${ins}_ok = false;
#END
`;
}

// ── Setup ──────────────────────────────────────────────────────
Blockly.JavaScript['armik_setup'] = function(b) {
    var ins = _ains(b);
    var dof = b.getFieldValue('DOF') || '3';
    var l1  = b.getFieldValue('L1') || '100';
    var l2  = b.getFieldValue('L2') || '100';
    var l3  = b.getFieldValue('L3') || '80';
    var l4  = b.getFieldValue('L4') || '60';
    return _armVars(ins) + `
#SETUP
  _arm_${ins}.begin((ArmDOF)${dof}, ${l1}.0f, ${l2}.0f, ${l3}.0f, ${l4}.0f);
#END
`;
};

// ── Attach PCA ─────────────────────────────────────────────────
Blockly.JavaScript['armik_attach_pca'] = function(b) {
    var ins   = _ains(b);
    var pcaIns = Blockly.JavaScript.variableDB_.getName(b.getFieldValue('PCA'), Blockly.Variables.NAME_TYPE);
    var joint  = b.getFieldValue('JOINT');
    var ch     = b.getFieldValue('CH');
    var minA   = b.getFieldValue('MIN')    || '0';
    var maxA   = b.getFieldValue('MAX')    || '180';
    var home   = b.getFieldValue('HOME')   || '90';
    var offset = b.getFieldValue('OFFSET') || '0';
    var rev    = b.getFieldValue('REV')    || '0';
    return `
#EXTINC#include "LotusPCA9685.h"#END

#SETUP
  _arm_${ins}.attachPCA9685(&_pca_${pcaIns});
  _arm_${ins}.attachJointPCA(${joint}, ${ch}, ${minA}.0f, ${maxA}.0f, ${home}.0f, ${offset}.0f, ${rev} == 1);
#END
`;
};

// ── Attach Servo ───────────────────────────────────────────────
Blockly.JavaScript['armik_attach_servo'] = function(b) {
    var ins    = _ains(b);
    var joint  = b.getFieldValue('JOINT');
    var pin    = b.getFieldValue('PIN');
    var minA   = b.getFieldValue('MIN')    || '0';
    var maxA   = b.getFieldValue('MAX')    || '180';
    var home   = b.getFieldValue('HOME')   || '90';
    var offset = b.getFieldValue('OFFSET') || '0';
    var rev    = b.getFieldValue('REV')    || '0';
    return `
#SETUP
  _arm_${ins}.attachJointServo(${joint}, ${pin}, ${minA}.0f, ${maxA}.0f, ${home}.0f, ${offset}.0f, ${rev} == 1);
#END
`;
};

// ── Move To XY ─────────────────────────────────────────────────
Blockly.JavaScript['armik_move_xy'] = function(b) {
    var ins = _ains(b);
    var x   = Blockly.JavaScript.valueToCode(b,'X',  Blockly.JavaScript.ORDER_ATOMIC)||'100';
    var y   = Blockly.JavaScript.valueToCode(b,'Y',  Blockly.JavaScript.ORDER_ATOMIC)||'0';
    var phi = Blockly.JavaScript.valueToCode(b,'PHI',Blockly.JavaScript.ORDER_ATOMIC)||'0';
    return `_arm_${ins}_ok = _arm_${ins}.moveTo((float)(${x}), (float)(${y}), (float)(${phi}));\n`;
};

// ── Move To XYZ ────────────────────────────────────────────────
Blockly.JavaScript['armik_move_xyz'] = function(b) {
    var ins = _ains(b);
    var x   = Blockly.JavaScript.valueToCode(b,'X',  Blockly.JavaScript.ORDER_ATOMIC)||'100';
    var y   = Blockly.JavaScript.valueToCode(b,'Y',  Blockly.JavaScript.ORDER_ATOMIC)||'0';
    var z   = Blockly.JavaScript.valueToCode(b,'Z',  Blockly.JavaScript.ORDER_ATOMIC)||'100';
    var phi = Blockly.JavaScript.valueToCode(b,'PHI',Blockly.JavaScript.ORDER_ATOMIC)||'0';
    return `_arm_${ins}_ok = _arm_${ins}.moveTo((float)(${x}), (float)(${y}), (float)(${z}), (float)(${phi}));\n`;
};

// ── Set Joint Angle ────────────────────────────────────────────
Blockly.JavaScript['armik_set_joint'] = function(b) {
    var ins   = _ains(b);
    var joint = b.getFieldValue('JOINT');
    var angle = Blockly.JavaScript.valueToCode(b,'ANGLE',Blockly.JavaScript.ORDER_ATOMIC)||'90';
    return `_arm_${ins}.setJointAngle(${joint}, (float)(${angle}));\n`;
};

// ── Get Joint Angle ────────────────────────────────────────────
Blockly.JavaScript['armik_get_joint'] = function(b) {
    var ins   = _ains(b);
    var joint = b.getFieldValue('JOINT');
    return [`_arm_${ins}.getJointAngle(${joint})`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ── Is Reachable ───────────────────────────────────────────────
Blockly.JavaScript['armik_reachable'] = function(b) {
    var ins = _ains(b);
    var x   = Blockly.JavaScript.valueToCode(b,'X',Blockly.JavaScript.ORDER_ATOMIC)||'100';
    var y   = Blockly.JavaScript.valueToCode(b,'Y',Blockly.JavaScript.ORDER_ATOMIC)||'0';
    return [`_arm_${ins}.isReachable((float)(${x}), (float)(${y}))`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ── Move Home ──────────────────────────────────────────────────
Blockly.JavaScript['armik_home'] = function(b) {
    return `_arm_${_ains(b)}.moveHome();\n`;
};

console.log('LotusArmIK generators loaded!');
