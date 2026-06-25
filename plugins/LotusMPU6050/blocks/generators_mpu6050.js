// generators_mpu6050.js for MPU6050 Plugin
'use strict';

Blockly.JavaScript = Blockly.JavaScript || {};

// ========== MPU6050 Setup ==========
Blockly.JavaScript['mpu6050_setup'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var address  = block.getFieldValue('ADDRESS');

    var code = `
#EXTINC#include <Wire.h>#END
#EXTINC#include "MPU6050_Plugin.h"#END

#VARIABLE
MPU6050_Plugin _mpu_${instance}(${address});
bool  _mpu_${instance}_ok     = false;
float _mpu_${instance}_ax     = 0;
float _mpu_${instance}_ay     = 0;
float _mpu_${instance}_az     = 0;
float _mpu_${instance}_gx     = 0;
float _mpu_${instance}_gy     = 0;
float _mpu_${instance}_gz     = 0;
float _mpu_${instance}_temp   = 0;
float _mpu_${instance}_pitch  = 0;
float _mpu_${instance}_roll   = 0;
#END

#SETUP
  Wire.begin();
  _mpu_${instance}_ok = _mpu_${instance}.begin();
  delay(100);
#END
`;
    return code;
};

// ========== Update (once per loop) ==========
Blockly.JavaScript['mpu6050_update'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var code = `_mpu_${instance}.update(50);
if (_mpu_${instance}.isUpdated()) {
  _mpu_${instance}_ax    = _mpu_${instance}.getAccelX();
  _mpu_${instance}_ay    = _mpu_${instance}.getAccelY();
  _mpu_${instance}_az    = _mpu_${instance}.getAccelZ();
  _mpu_${instance}_gx    = _mpu_${instance}.getGyroX();
  _mpu_${instance}_gy    = _mpu_${instance}.getGyroY();
  _mpu_${instance}_gz    = _mpu_${instance}.getGyroZ();
  _mpu_${instance}_temp  = _mpu_${instance}.getTemperature();
  _mpu_${instance}_pitch = _mpu_${instance}.getPitch();
  _mpu_${instance}_roll  = _mpu_${instance}.getRoll();
}\n`;
    return code;
};

// ========== Read Accelerometer ==========
Blockly.JavaScript['mpu6050_read_accel'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var axis = block.getFieldValue('AXIS');
    var varMap = { X: 'ax', Y: 'ay', Z: 'az' };
    return [`_mpu_${instance}_${varMap[axis]}`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ========== Read Gyroscope ==========
Blockly.JavaScript['mpu6050_read_gyro'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var axis = block.getFieldValue('AXIS');
    var varMap = { X: 'gx', Y: 'gy', Z: 'gz' };
    return [`_mpu_${instance}_${varMap[axis]}`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ========== Read Temperature ==========
Blockly.JavaScript['mpu6050_read_temp'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    return [`_mpu_${instance}_temp`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ========== Read Pitch / Roll ==========
Blockly.JavaScript['mpu6050_read_angle'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var angle = block.getFieldValue('ANGLE');
    var varMap = { PITCH: 'pitch', ROLL: 'roll' };
    return [`_mpu_${instance}_${varMap[angle]}`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ========== Set Accel Range ==========
Blockly.JavaScript['mpu6050_set_accel_range'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var range = block.getFieldValue('RANGE');
    return `_mpu_${instance}.setAccelRange(${range});\n`;
};

// ========== Set Gyro Range ==========
Blockly.JavaScript['mpu6050_set_gyro_range'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var range = block.getFieldValue('RANGE');
    return `_mpu_${instance}.setGyroRange(${range});\n`;
};

// ========== Check Connected ==========
Blockly.JavaScript['mpu6050_connected'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    return [`_mpu_${instance}_ok`, Blockly.JavaScript.ORDER_ATOMIC];
};

console.log('✅ MPU6050 generators loaded!');
console.log('Registered:', Object.keys(Blockly.JavaScript).filter(k => k.startsWith('mpu6050')));
