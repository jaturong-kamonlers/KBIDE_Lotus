// generators_hmc5883.js for HMC5883L Plugin
'use strict';

Blockly.JavaScript = Blockly.JavaScript || {};

// ========== HMC5883L Setup ==========
Blockly.JavaScript['hmc5883_setup'] = function(block) {
  var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);

  var code = `
#EXTINC#include <Wire.h>#END
#EXTINC#include "HMC5883L_Plugin.h"#END

#VARIABLE
HMC5883L_Plugin _hmc_${instance};
bool _hmc_${instance}_ok = false;
float _hmc_${instance}_heading = 0;
int16_t _hmc_${instance}_x = 0;
int16_t _hmc_${instance}_y = 0;
int16_t _hmc_${instance}_z = 0;
#END

#SETUP
  _hmc_${instance}_ok = _hmc_${instance}.begin();
  delay(100);
  _hmc_${instance}_heading = _hmc_${instance}.getHeading();
  _hmc_${instance}_x = _hmc_${instance}.getX();
  _hmc_${instance}_y = _hmc_${instance}.getY();
  _hmc_${instance}_z = _hmc_${instance}.getZ();
#END
`;
  return code;
};

// ========== Update (once per loop) ==========
Blockly.JavaScript['hmc5883_update'] = function(block) {
  var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
  var code = `_hmc_${instance}.update(500);
if (_hmc_${instance}.isUpdated()) {
  _hmc_${instance}_heading = _hmc_${instance}.getCachedHeading();
  _hmc_${instance}_x = _hmc_${instance}.getX();
  _hmc_${instance}_y = _hmc_${instance}.getY();
  _hmc_${instance}_z = _hmc_${instance}.getZ();
}\n`;
  return code;
};

// ========== Read Heading ==========
Blockly.JavaScript['hmc5883_read_heading'] = function(block) {
  var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
  return [`_hmc_${instance}_heading`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ========== Read Raw Axis ==========
Blockly.JavaScript['hmc5883_read_raw'] = function(block) {
  var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
  var axis = block.getFieldValue('AXIS');
  var code;
  if (axis === 'X') code = `_hmc_${instance}_x`;
  else if (axis === 'Y') code = `_hmc_${instance}_y`;
  else code = `_hmc_${instance}_z`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// ========== Calibrate ==========
Blockly.JavaScript['hmc5883_calibrate'] = function(block) {
  var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
  var samples = Blockly.JavaScript.valueToCode(block, 'SAMPLES', Blockly.JavaScript.ORDER_ATOMIC) || '500';
  return `_hmc_${instance}.calibrate(${samples});\n`;
};

// ========== Set Offset ==========
Blockly.JavaScript['hmc5883_set_offset'] = function(block) {
  var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
  var x = Blockly.JavaScript.valueToCode(block, 'X_OFFSET', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var y = Blockly.JavaScript.valueToCode(block, 'Y_OFFSET', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  var z = Blockly.JavaScript.valueToCode(block, 'Z_OFFSET', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  return `_hmc_${instance}.setCalibrationOffsets(${x}, ${y}, ${z});\n`;
};

// ========== Check Available ==========
Blockly.JavaScript['hmc5883_available'] = function(block) {
  var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
  return [`_hmc_${instance}_ok`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ========== Set Declination ==========
Blockly.JavaScript['hmc5883_declination'] = function(block) {
  var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
  var declination = block.getFieldValue('DECLINATION');
  return `_hmc_${instance}.setDeclination(${declination});\n`;
};

console.log('✅ HMC5883L generators loaded!');
console.log('Registered:', Object.keys(Blockly.JavaScript).filter(k => k.startsWith('hmc5883')));
