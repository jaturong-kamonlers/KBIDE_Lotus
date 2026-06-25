// generators_bmp280.js for BMP280 Plugin
'use strict';

Blockly.JavaScript = Blockly.JavaScript || {};

// ========== BMP280 Setup ==========
Blockly.JavaScript['bmp280_setup'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var address  = block.getFieldValue('ADDRESS');

    var code = `
#EXTINC#include <Wire.h>#END
#EXTINC#include "BMP280_Plugin.h"#END

#VARIABLE
BMP280_Plugin _bmp_${instance}(${address});
bool  _bmp_${instance}_ok    = false;
float _bmp_${instance}_temp  = 0;
float _bmp_${instance}_press = 0;
float _bmp_${instance}_alt   = 0;
#END

#SETUP
  Wire.begin();
  _bmp_${instance}_ok = _bmp_${instance}.begin();
  delay(100);
#END
`;
    return code;
};

// ========== Update (once per loop) ==========
Blockly.JavaScript['bmp280_update'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var code = `_bmp_${instance}.update(100);
if (_bmp_${instance}.isUpdated()) {
  _bmp_${instance}_temp  = _bmp_${instance}.getTemperature();
  _bmp_${instance}_press = _bmp_${instance}.getPressure();
  _bmp_${instance}_alt   = _bmp_${instance}.getAltitude();
}\n`;
    return code;
};

// ========== Read Temperature ==========
Blockly.JavaScript['bmp280_read_temp'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    return [`_bmp_${instance}_temp`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ========== Read Pressure ==========
Blockly.JavaScript['bmp280_read_pressure'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    return [`_bmp_${instance}_press`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ========== Read Altitude ==========
Blockly.JavaScript['bmp280_read_altitude'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    return [`_bmp_${instance}_alt`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ========== Check Connected ==========
Blockly.JavaScript['bmp280_connected'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    return [`_bmp_${instance}_ok`, Blockly.JavaScript.ORDER_ATOMIC];
};

console.log('✅ BMP280 generators loaded!');
console.log('Registered:', Object.keys(Blockly.JavaScript).filter(k => k.startsWith('bmp280')));
