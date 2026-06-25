// generators_huskylens.js for LotusHuskyLens Plugin
'use strict';
Blockly.JavaScript = Blockly.JavaScript || {};

function _hins(b) {
    return Blockly.JavaScript.variableDB_.getName(b.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
}

function _hVars(ins) {
    return `
#EXTINC#include <Wire.h>#END
#EXTINC#include "LotusHuskyLens.h"#END

#VARIABLE
LotusHuskyLens _hl_${ins};
bool _hl_${ins}_ok = false;
#END
`;
}

// ── Setup I2C ──────────────────────────────────────────────────
Blockly.JavaScript['huskylens_setup_i2c'] = function(b) {
    var ins  = _hins(b);
    var algo = b.getFieldValue('ALGO');
    return _hVars(ins) + `
#SETUP
  _hl_${ins}_ok = _hl_${ins}.begin(Wire);
  if (_hl_${ins}_ok) _hl_${ins}.switchAlgorithm(${algo});
  delay(200);
#END
`;
};

// ── Setup UART ─────────────────────────────────────────────────
Blockly.JavaScript['huskylens_setup_uart'] = function(b) {
    var ins  = _hins(b);
    var baud = b.getFieldValue('BAUD') || '9600';
    var algo = b.getFieldValue('ALGO');
    return _hVars(ins) + `
#SETUP
  Serial.begin(${baud});
  _hl_${ins}_ok = _hl_${ins}.begin(Serial);
  if (_hl_${ins}_ok) _hl_${ins}.switchAlgorithm(${algo});
  delay(200);
#END
`;
};

// ── Switch Algorithm ───────────────────────────────────────────
Blockly.JavaScript['huskylens_switch_algo'] = function(b) {
    var ins  = _hins(b);
    var algo = b.getFieldValue('ALGO');
    return `_hl_${ins}.switchAlgorithm(${algo});\ndelay(200);\n`;
};

// ── Request ────────────────────────────────────────────────────
Blockly.JavaScript['huskylens_request'] = function(b) {
    var ins  = _hins(b);
    var type = b.getFieldValue('REQTYPE');
    var callMap = {
        ALL:     `_hl_${ins}.request()`,
        BLOCKS:  `_hl_${ins}.requestBlocks()`,
        ARROWS:  `_hl_${ins}.requestArrows()`,
        LEARNED: `_hl_${ins}.requestLearned()`
    };
    return (callMap[type] || callMap.ALL) + ';\n';
};

// ── Request by ID ──────────────────────────────────────────────
Blockly.JavaScript['huskylens_request_id'] = function(b) {
    var ins = _hins(b);
    var id  = Blockly.JavaScript.valueToCode(b,'ID',Blockly.JavaScript.ORDER_ATOMIC)||'1';
    return `_hl_${ins}.requestByID(${id});\n`;
};

// ── Block Count ────────────────────────────────────────────────
Blockly.JavaScript['huskylens_block_count'] = function(b) {
    return [`_hl_${_hins(b)}.blockCount()`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ── Arrow Count ────────────────────────────────────────────────
Blockly.JavaScript['huskylens_arrow_count'] = function(b) {
    return [`_hl_${_hins(b)}.arrowCount()`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ── Get Block ──────────────────────────────────────────────────
Blockly.JavaScript['huskylens_get_block'] = function(b) {
    var ins  = _hins(b);
    var idx  = Blockly.JavaScript.valueToCode(b,'IDX',Blockly.JavaScript.ORDER_ATOMIC)||'0';
    var prop = b.getFieldValue('PROP');
    return [`_hl_${ins}.getBlock(${idx}).${prop}`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ── Get Arrow ──────────────────────────────────────────────────
Blockly.JavaScript['huskylens_get_arrow'] = function(b) {
    var ins  = _hins(b);
    var idx  = Blockly.JavaScript.valueToCode(b,'IDX',Blockly.JavaScript.ORDER_ATOMIC)||'0';
    var prop = b.getFieldValue('PROP');
    return [`_hl_${ins}.getArrow(${idx}).${prop}`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ── Is Learned ─────────────────────────────────────────────────
Blockly.JavaScript['huskylens_is_learned'] = function(b) {
    var ins = _hins(b);
    var id  = Blockly.JavaScript.valueToCode(b,'ID',Blockly.JavaScript.ORDER_ATOMIC)||'1';
    return [`_hl_${ins}.isLearned(${id})`, Blockly.JavaScript.ORDER_ATOMIC];
};

console.log('LotusHuskyLens generators loaded!');
