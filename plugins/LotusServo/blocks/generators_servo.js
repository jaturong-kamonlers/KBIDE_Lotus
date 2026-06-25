// generators_servo.js for Servo Plugin
'use strict';

Blockly.JavaScript = Blockly.JavaScript || {};

// ========== Servo Setup ==========
Blockly.JavaScript['lotus_servo_setup'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var pin      = block.getFieldValue('PIN');
    var min_us   = block.getFieldValue('MIN_US');
    var max_us   = block.getFieldValue('MAX_US');

    var code = `
#EXTINC#if defined(ARDUINO_ARCH_ESP32) || defined(ESP32)
  #include <ESP32Servo.h>
#else
  #include <Servo.h>
#endif#END

#VARIABLE
Servo _srv_${instance};
int   _srv_${instance}_pin    = ${pin};
int   _srv_${instance}_min    = ${min_us};
int   _srv_${instance}_max    = ${max_us};
int   _srv_${instance}_angle  = 0;
#END

#SETUP
  _srv_${instance}.attach(${pin}, ${min_us}, ${max_us});
  _srv_${instance}.write(0);
  delay(20);
#END
`;
    return code;
};

// ========== Set Angle ==========
Blockly.JavaScript['lotus_servo_angle'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var angle    = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return `_srv_${instance}_angle = constrain(${angle}, 0, 180);\n_srv_${instance}.write(_srv_${instance}_angle);\n`;
};

// ========== Set Microseconds ==========
Blockly.JavaScript['lotus_servo_microseconds'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var us       = Blockly.JavaScript.valueToCode(block, 'US', Blockly.JavaScript.ORDER_ATOMIC) || '1500';
    return `_srv_${instance}.writeMicroseconds(${us});\n`;
};

// ========== Detach ==========
Blockly.JavaScript['lotus_servo_detach'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    return `_srv_${instance}.detach();\n`;
};

console.log('✅ Servo generators loaded!');
console.log('Registered:', Object.keys(Blockly.JavaScript).filter(k => k.startsWith('lotus_servo')));
