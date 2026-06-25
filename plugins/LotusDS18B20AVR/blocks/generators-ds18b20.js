// generators-ds18b20.js for DS18B20 Temperature Sensor Plugin
Blockly.JavaScript = Blockly.JavaScript || {};

// ==================== DS18B20 Initialization ====================
Blockly.JavaScript['ds18b20_setup'] = function(block) {
  var variable_instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('instance'), Blockly.Variables.NAME_TYPE);
  var number_pin = block.getFieldValue('pin');

  // ใช้ prefix _ds_ เพื่อหลีกเลี่ยง conflict กับ Blockly int variable
  var code = `
#EXTINC#include <OneWire.h>#END
#EXTINC#include <DallasTemperature.h>#END

#VARIABLE
OneWire _oneWire_${variable_instance}(${number_pin});
DallasTemperature _ds_${variable_instance}(&_oneWire_${variable_instance});
float _${variable_instance}_temp = 0;
uint8_t _${variable_instance}_count = 0;
unsigned long _${variable_instance}_t = 0;
bool _${variable_instance}_requested = false;
#END

#SETUP
  _ds_${variable_instance}.begin();
  _ds_${variable_instance}.setWaitForConversion(false);
  _${variable_instance}_count = _ds_${variable_instance}.getDeviceCount();
  _ds_${variable_instance}.requestTemperatures();
  _${variable_instance}_requested = true;
  _${variable_instance}_t = millis();
#END
`;
  return code;
};

// ==================== DS18B20 Update (ต้องเรียกครั้งเดียวต่อรอบ) ====================
Blockly.JavaScript['ds18b20_update'] = function(block) {
  var variable_instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('instance'), Blockly.Variables.NAME_TYPE);
  var code = `if (_${variable_instance}_requested) {
  if ((unsigned long)(millis() - _${variable_instance}_t) >= 800UL) {
    _${variable_instance}_temp = _ds_${variable_instance}.getTempCByIndex(0);
    _ds_${variable_instance}.requestTemperatures();
    _${variable_instance}_t = millis();
  }
} else {
  _ds_${variable_instance}.requestTemperatures();
  _${variable_instance}_requested = true;
  _${variable_instance}_t = millis();
}\n`;
  return code;
};

// ==================== Get Temperature (Celsius) ====================
Blockly.JavaScript['ds18b20_read_temp'] = function(block) {
  var variable_instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('instance'), Blockly.Variables.NAME_TYPE);
  return [`_${variable_instance}_temp`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ==================== Get Temperature (Fahrenheit) ====================
Blockly.JavaScript['ds18b20_read_temp_f'] = function(block) {
  var variable_instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('instance'), Blockly.Variables.NAME_TYPE);
  return [`(_${variable_instance}_temp * 9.0 / 5.0 + 32.0)`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ==================== Get Number of Devices ====================
Blockly.JavaScript['ds18b20_get_device_count'] = function(block) {
  var variable_instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('instance'), Blockly.Variables.NAME_TYPE);
  return [`_${variable_instance}_count`, Blockly.JavaScript.ORDER_ATOMIC];
};
