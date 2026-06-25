// generators_ultrasonic.js for LotusUltrasonic Plugin
// Fixed: #VARIABLE space, FieldNumber values, added mm + detected blocks
'use strict';
Blockly.JavaScript = Blockly.JavaScript || {};

function _uins(b) {
    return Blockly.JavaScript.variableDB_.getName(b.getFieldValue('instance'), Blockly.Variables.NAME_TYPE);
}

// ── Setup ──────────────────────────────────────────────────────
Blockly.JavaScript['ultrasonic_setup'] = function(block) {
    var ins  = _uins(block);
    var trig = block.getFieldValue('TRIG') || '9';
    var echo = block.getFieldValue('ECHO') || '10';
    return `
#EXTINC#include "Ultrasonic.h"#END

#VARIABLE
ULTRASONIC ${ins};
#END

#SETUP
  ${ins}.begin(${trig}, ${echo});
#END
`;
};

// ── Distance cm ────────────────────────────────────────────────
Blockly.JavaScript['ultrasonic_read_distance_cm'] = function(block) {
    var ins = _uins(block);
    return [`${ins}.read_distance_cm()`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ── Distance mm ────────────────────────────────────────────────
Blockly.JavaScript['ultrasonic_read_distance_mm'] = function(block) {
    var ins = _uins(block);
    return [`${ins}.read_distance_mm()`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ── Detected within N cm ───────────────────────────────────────
Blockly.JavaScript['ultrasonic_detected'] = function(block) {
    var ins  = _uins(block);
    var dist = Blockly.JavaScript.valueToCode(block, 'DIST', Blockly.JavaScript.ORDER_ATOMIC) || '30';
    return [`(${ins}.read_distance_cm() <= ${dist} && ${ins}.read_distance_cm() > 0)`, Blockly.JavaScript.ORDER_ATOMIC];
};

console.log('LotusUltrasonic generators loaded!');
