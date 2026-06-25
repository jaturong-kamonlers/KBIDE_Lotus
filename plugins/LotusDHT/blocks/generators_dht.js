Blockly.JavaScript['dhtesp_setup'] = function(block) {
  var variable_instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('instance'), Blockly.Variables.NAME_TYPE);
  var dropdown_dht_type = block.getFieldValue('dht_type');
  var number_pin = block.getFieldValue('pin');

  // แก้ไข:
  // 1. ไม่ใช้ delay(2000) ใน #SETUP เพราะทำให้ข้าม splash screen + beep
  // 2. ไม่เพิ่ม TempAndHumidity struct ใน #VARIABLE เพราะกิน RAM
  // 3. ใช้ static local variable ใน loop แทน global struct
  // 4. ใช้ getTempAndHumidity() ครั้งเดียว ไม่แยก getTemperature/getHumidity
  var code = `
#EXTINC#include <Wire.h>#END
#EXTINC#include "DHTesp.h"#END

#VARIABLE
DHTesp ${variable_instance};
float _${variable_instance}_temp = 0;
float _${variable_instance}_humi = 0;
unsigned long _${variable_instance}_t = 0;
#END

#SETUP
  pinMode(${number_pin}, INPUT_PULLUP);
  ${variable_instance}.setup(${number_pin}, ${dropdown_dht_type});
#END
`;
  return code;
};

Blockly.JavaScript['dhtesp_update'] = function(block) {
  var variable_instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('instance'), Blockly.Variables.NAME_TYPE);
  // อ่านค่าทุก 2 วินาที ครั้งเดียวต่อรอบ → ไม่ปิด interrupt ซ้ำ
  var code = `if ((unsigned long)(millis() - _${variable_instance}_t) >= 2000UL) {
  _${variable_instance}_t = millis();
  TempAndHumidity _r = ${variable_instance}.getTempAndHumidity();
  _${variable_instance}_temp = _r.temperature;
  _${variable_instance}_humi = _r.humidity;
}\n`;
  return code;
};

Blockly.JavaScript['dhtesp_read_temp'] = function(block) {
  var variable_instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('instance'), Blockly.Variables.NAME_TYPE);
  // ดึงจากตัวแปรที่เก็บไว้แล้ว ไม่อ่านเซ็นเซอร์ใหม่
  return [`_${variable_instance}_temp`, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['dhtesp_read_humid'] = function(block) {
  var variable_instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('instance'), Blockly.Variables.NAME_TYPE);
  // ดึงจากตัวแปรที่เก็บไว้แล้ว ไม่อ่านเซ็นเซอร์ใหม่
  return [`_${variable_instance}_humi`, Blockly.JavaScript.ORDER_ATOMIC];
};
