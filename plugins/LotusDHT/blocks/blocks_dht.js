Blockly.Blocks['dhtesp_setup'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("DhtSensor1",null,["Plugin.DHTesp"],["Plugin.DHTesp"]), "instance")
        .appendField("Setup")
        .appendField(new Blockly.FieldDropdown([["DHT11","DHTesp::DHT11"], ["DHT22","DHTesp::DHT22"], ["AM2302","DHTesp::AM2302"], ["RHT03","DHTesp::RHT03"]]), "dht_type")
        .appendField("pin")
        .appendField(new Blockly.FieldNumber(0, 0, 50), "pin");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Setup DHT sensor - วางใน Setup");
    this.setHelpUrl("");
  }
};

// บล็อกอัปเดตค่า DHT ครั้งเดียวต่อรอบ ต้องวางต้น Loop
Blockly.Blocks['dhtesp_update'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("DhtSensor1",null,["Plugin.DHTesp"],["Plugin.DHTesp"]), "instance")
        .appendField("Read DHT (once per loop)");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("อ่านค่า DHT ครั้งเดียวต่อรอบ (ทุก 2 วินาที)\nต้องวางไว้ต้น Loop ก่อนใช้ Temperature และ Humidity");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['dhtesp_read_temp'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("DhtSensor1",null,["Plugin.DHTesp"],["Plugin.DHTesp"]), "instance")
        .appendField("Temperature \u00b0C");
    this.setInputsInline(true);
    this.setOutput(true, ["float", "Number"]);
    this.setColour(230);
    this.setTooltip("ดึงค่าอุณหภูมิ (ต้องใช้ Read DHT ก่อน)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['dhtesp_read_humid'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("DhtSensor1",null,["Plugin.DHTesp"],["Plugin.DHTesp"]), "instance")
        .appendField("Humidity %");
    this.setInputsInline(true);
    this.setOutput(true, ["float", "Number"]);
    this.setColour(230);
    this.setTooltip("ดึงค่าความชื้น (ต้องใช้ Read DHT ก่อน)");
    this.setHelpUrl("");
  }
};
