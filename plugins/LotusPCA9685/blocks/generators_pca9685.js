// generators_pca9685.js for LotusPCA9685 Plugin
'use strict';
Blockly.JavaScript = Blockly.JavaScript || {};

function _pins(b) { return Blockly.JavaScript.variableDB_.getName(b.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE); }

function _pcaVars(ins) {
    return `
#EXTINC#include <Wire.h>#END
#EXTINC#include "LotusPCA9685.h"#END

#VARIABLE
LotusPCA9685 _pca_${ins};
#END
`;
}

Blockly.JavaScript['pca9685_setup'] = function(b) {
    var ins  = _pins(b);
    var addr = '0x' + b.getFieldValue('ADDR');
    var freq = b.getFieldValue('FREQ') || '50';
    return _pcaVars(ins) + `
#SETUP
  _pca_${ins}.begin(${addr}, ${freq}.0f);
  delay(10);
#END
`;
};

Blockly.JavaScript['pca9685_set_angle'] = function(b) {
    var ins   = _pins(b);
    var ch    = b.getFieldValue('CH');
    var angle = Blockly.JavaScript.valueToCode(b,'ANGLE',Blockly.JavaScript.ORDER_ATOMIC)||'90';
    return `_pca_${ins}.setAngle(${ch}, ${angle});\n`;
};

Blockly.JavaScript['pca9685_set_us'] = function(b) {
    var ins = _pins(b);
    var ch  = b.getFieldValue('CH');
    var us  = Blockly.JavaScript.valueToCode(b,'US',Blockly.JavaScript.ORDER_ATOMIC)||'1500';
    return `_pca_${ins}.setMicroseconds(${ch}, ${us});\n`;
};

Blockly.JavaScript['pca9685_set_pwm'] = function(b) {
    var ins = _pins(b);
    var ch  = b.getFieldValue('CH');
    var on  = Blockly.JavaScript.valueToCode(b,'ON', Blockly.JavaScript.ORDER_ATOMIC)||'0';
    var off = Blockly.JavaScript.valueToCode(b,'OFF',Blockly.JavaScript.ORDER_ATOMIC)||'2048';
    return `_pca_${ins}.setPWM(${ch}, ${on}, ${off});\n`;
};

Blockly.JavaScript['pca9685_set_off'] = function(b) {
    return `_pca_${_pins(b)}.setOff(${b.getFieldValue('CH')});\n`;
};

Blockly.JavaScript['pca9685_all_off'] = function(b) {
    return `_pca_${_pins(b)}.setAllOff();\n`;
};

Blockly.JavaScript['pca9685_calibrate'] = function(b) {
    var ins = _pins(b);
    var ch  = b.getFieldValue('CH');
    var mn  = b.getFieldValue('MIN_US') || '544';
    var mx  = b.getFieldValue('MAX_US') || '2400';
    return `_pca_${ins}.calibrate(${ch}, ${mn}, ${mx});\n`;
};

console.log('LotusPCA9685 generators loaded!');
