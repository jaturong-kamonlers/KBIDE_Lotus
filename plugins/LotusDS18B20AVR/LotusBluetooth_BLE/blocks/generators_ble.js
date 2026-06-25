// generators_ble.js for BLE Plugin
'use strict';

Blockly.JavaScript = Blockly.JavaScript || {};

// ========== Setup BLE ==========
Blockly.JavaScript['ble_setup'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var bleName  = block.getFieldValue('BLE_NAME');

    var code = `
#EXTINC#include "BLE_Plugin.h"#END

#VARIABLE
BLE_Plugin _ble_${instance};
#END

#SETUP
  _ble_${instance}.begin("${bleName}");
#END
`;
    return code;
};

// ========== Send ==========
Blockly.JavaScript['ble_send'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var msg      = Blockly.JavaScript.valueToCode(block, 'MSG', Blockly.JavaScript.ORDER_ATOMIC) || '""';
    return `_ble_${instance}.send(String(${msg}));\n`;
};

// ========== Send Line ==========
Blockly.JavaScript['ble_send_line'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var msg      = Blockly.JavaScript.valueToCode(block, 'MSG', Blockly.JavaScript.ORDER_ATOMIC) || '""';
    return `_ble_${instance}.sendLine(String(${msg}));\n`;
};

// ========== Available ==========
Blockly.JavaScript['ble_available'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    return [`_ble_${instance}.available()`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ========== Read Char ==========
Blockly.JavaScript['ble_read_char'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    return [`String(_ble_${instance}.readChar())`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ========== Read String ==========
Blockly.JavaScript['ble_read_string'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    return [`_ble_${instance}.readString()`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ========== Read Int ==========
Blockly.JavaScript['ble_read_int'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    return [`_ble_${instance}.readInt()`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ========== Read Float ==========
Blockly.JavaScript['ble_read_float'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    return [`_ble_${instance}.readFloat()`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ========== Is Connected ==========
Blockly.JavaScript['ble_connected'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    return [`_ble_${instance}.isConnected()`, Blockly.JavaScript.ORDER_ATOMIC];
};

console.log('✅ BLE generators loaded!');
console.log('Registered:', Object.keys(Blockly.JavaScript).filter(k => k.startsWith('ble_')));
