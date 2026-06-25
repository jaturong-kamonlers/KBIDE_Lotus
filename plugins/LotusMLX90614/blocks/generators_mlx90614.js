// generators_mlx90614.js for MLX90614 Plugin
'use strict';

Blockly.JavaScript = Blockly.JavaScript || {};

// ========== MLX90614 Setup ==========
Blockly.JavaScript['mlx90614_setup'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);

    var code = `
#EXTINC#include <Wire.h>#END
#EXTINC#include "MLX90614_Plugin.h"#END

#VARIABLE
MLX90614_Plugin _mlx_${instance};
bool  _mlx_${instance}_ok  = false;
float _mlx_${instance}_obj = 0;
float _mlx_${instance}_amb = 0;
#END

#SETUP
  Wire.begin();
  _mlx_${instance}_ok = _mlx_${instance}.begin();
  delay(100);
#END
`;
    return code;
};

// ========== Update (once per loop) ==========
Blockly.JavaScript['mlx90614_update'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var code = `_mlx_${instance}.update(100);
if (_mlx_${instance}.isUpdated()) {
  _mlx_${instance}_obj = _mlx_${instance}.getObjectTemp();
  _mlx_${instance}_amb = _mlx_${instance}.getAmbientTemp();
}\n`;
    return code;
};

// ========== Read Object Temperature ==========
Blockly.JavaScript['mlx90614_read_object'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    return [`_mlx_${instance}_obj`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ========== Read Ambient Temperature ==========
Blockly.JavaScript['mlx90614_read_ambient'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    return [`_mlx_${instance}_amb`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ========== Check Connected ==========
Blockly.JavaScript['mlx90614_connected'] = function(block) {
    var instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    return [`_mlx_${instance}_ok`, Blockly.JavaScript.ORDER_ATOMIC];
};

console.log('✅ MLX90614 generators loaded!');
console.log('Registered:', Object.keys(Blockly.JavaScript).filter(k => k.startsWith('mlx90614')));
