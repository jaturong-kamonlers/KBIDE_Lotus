
// ==================== DS18B20 Initialization ====================
Blockly.Blocks['ds18b20_setup'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("DS18B201"), "instance")
        .appendField("Setup DS18B20 pin")
        .appendField(new Blockly.FieldNumber(2, 0, 50), "pin");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Setup DS18B20 sensor - วางใน Setup");
    this.setHelpUrl("");
  }
};

// ==================== DS18B20 Update (ต้องวางต้น Loop) ====================
Blockly.Blocks['ds18b20_update'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("DS18B201"), "instance")
        .appendField("Read DS18B20 (once per loop)");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("อ่านค่าอุณหภูมิจาก DS18B20 ครั้งเดียวต่อรอบ\nต้องวางไว้ต้น Loop ก่อนใช้ Get Temperature");
    this.setHelpUrl("");
  }
};

// ==================== Get Temperature (Celsius) ====================
Blockly.Blocks['ds18b20_read_temp'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("DS18B201"), "instance")
        .appendField("Temperature \u00b0C");
    this.setInputsInline(true);
    this.setOutput(true, ["float", "Number"]);
    this.setColour(230);
    this.setTooltip("ดึงค่าอุณหภูมิ (ต้องใช้ Read DS18B20 ก่อน)");
    this.setHelpUrl("");
  }
};

// ==================== Get Temperature in Fahrenheit ====================
Blockly.Blocks['ds18b20_read_temp_f'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("DS18B201"), "instance")
        .appendField("Temperature \u00b0F");
    this.setInputsInline(true);
    this.setOutput(true, ["float", "Number"]);
    this.setColour(230);
    this.setTooltip("ดึงค่าอุณหภูมิ (ฟาห์เรนไฮต์) - ต้องใช้ Read DS18B20 ก่อน");
    this.setHelpUrl("");
  }
};

// ==================== Get Number of Devices ====================
Blockly.Blocks['ds18b20_get_device_count'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("DS18B201"), "instance")
        .appendField("number of devices");
    this.setInputsInline(true);
    this.setOutput(true, ["int", "Number"]);
    this.setColour(230);
    this.setTooltip("จำนวนเซ็นเซอร์ DS18B20 ที่เชื่อมต่ออยู่");
    this.setHelpUrl("");
  }
};
