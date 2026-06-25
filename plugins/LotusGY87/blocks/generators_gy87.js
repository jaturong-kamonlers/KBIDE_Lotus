// generators_gy87.js for LotusGY87 Plugin
'use strict';
Blockly.JavaScript = Blockly.JavaScript || {};

function _gins(b) { return Blockly.JavaScript.variableDB_.getName(b.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE); }

function _gy87Vars(ins) {
    return `
#EXTINC#include <Wire.h>#END
#EXTINC#include <math.h>#END
#EXTINC#include "LotusGY87.h"#END

#VARIABLE
LotusGY87 _gy87_${ins};
#END
`;
}

// ── Setup ──────────────────────────────────────────────────────
Blockly.JavaScript['gy87_setup'] = function(b) {
    var ins  = _gins(b);
    var ar   = b.getFieldValue('ACCEL_RANGE') || 'ACCEL_2G';
    var gr   = b.getFieldValue('GYRO_RANGE')  || 'GYRO_250';
    var beta = b.getFieldValue('BETA')        || '0.1';
    var sea  = b.getFieldValue('SEA_LEVEL')   || '1013.25';
    return _gy87Vars(ins) + `
#SETUP
  _gy87_${ins}.begin();
  _gy87_${ins}.setAccelRange(${ar});
  _gy87_${ins}.setGyroRange(${gr});
  _gy87_${ins}.setMadgwickBeta(${beta}f);
  _gy87_${ins}.setSeaLevel(${sea}f);
  delay(100);
#END
`;
};

// ── Update ────────────────────────────────────────────────────
Blockly.JavaScript['gy87_update'] = function(b) {
    return `_gy87_${_gins(b)}.update();\n`;
};

// ── Calibrate ─────────────────────────────────────────────────
Blockly.JavaScript['gy87_calibrate'] = function(b) {
    var ins     = _gins(b);
    var samples = b.getFieldValue('SAMPLES') || '500';
    return `_gy87_${ins}.calibrate(${samples});\n`;
};

// ── Accel ─────────────────────────────────────────────────────
Blockly.JavaScript['gy87_accel'] = function(b) {
    var ins  = _gins(b);
    var axis = b.getFieldValue('AXIS');
    var fn   = { X:'accelX', Y:'accelY', Z:'accelZ' }[axis] || 'accelX';
    return [`_gy87_${ins}.${fn}()`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ── Gyro ──────────────────────────────────────────────────────
Blockly.JavaScript['gy87_gyro'] = function(b) {
    var ins  = _gins(b);
    var axis = b.getFieldValue('AXIS');
    var fn   = { X:'gyroX', Y:'gyroY', Z:'gyroZ' }[axis] || 'gyroX';
    return [`_gy87_${ins}.${fn}()`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ── Pitch / Roll / Yaw ────────────────────────────────────────
Blockly.JavaScript['gy87_attitude'] = function(b) {
    var ins  = _gins(b);
    var axis = b.getFieldValue('AXIS');
    var fn   = { PITCH:'pitch', ROLL:'roll', YAW:'yaw' }[axis] || 'pitch';
    return [`_gy87_${ins}.${fn}()`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ── Heading ───────────────────────────────────────────────────
Blockly.JavaScript['gy87_heading'] = function(b) {
    return [`_gy87_${_gins(b)}.heading()`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ── MPU Temp ──────────────────────────────────────────────────
Blockly.JavaScript['gy87_mpu_temp'] = function(b) {
    return [`_gy87_${_gins(b)}.mpuTemp()`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ── BMP180 ────────────────────────────────────────────────────
Blockly.JavaScript['gy87_bmp'] = function(b) {
    var ins  = _gins(b);
    var meas = b.getFieldValue('MEAS');
    var fn   = { TEMP:'bmpTemperature', PRES:'bmpPressure', ALT:'bmpAltitude' }[meas] || 'bmpTemperature';
    return [`_gy87_${ins}.${fn}()`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ── Set Range ─────────────────────────────────────────────────
Blockly.JavaScript['gy87_set_range'] = function(b) {
    var ins    = _gins(b);
    var sensor = b.getFieldValue('SENSOR');
    var range  = b.getFieldValue('RANGE') || '0';
    if (sensor === 'ACCEL') {
        var rmap = ['ACCEL_2G','ACCEL_4G','ACCEL_8G','ACCEL_16G'];
        return `_gy87_${ins}.setAccelRange((AccelRange)${range});\n`;
    } else {
        return `_gy87_${ins}.setGyroRange((GyroRange)${range});\n`;
    }
};

console.log('LotusGY87 generators loaded!');
