Blockly.Blocks['SHT31_Setup'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("SHT31Sensor1",null,["Plugin.SHT31esp"],["Plugin.SHT31esp"]), "instance")
        .appendField("Setup SHT31 Temp/Hum Sensor");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#3f93e8");
 this.setTooltip("setup sensor SHT31 ");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['SHT31_readTemp'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("SHT31Sensor1",null,["Plugin.SHT31esp"],["Plugin.SHT31esp"]), "instance")
        .appendField("read temperature °C");
    this.setInputsInline(true);
    this.setOutput(true, ["float", "Number"]);
    this.setColour("#3f93e8");
 this.setTooltip("read temperature in Celsius");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['SHT31_readHumid'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("SHT31Sensor1",null,["Plugin.SHT31esp"],["Plugin.SHT31esp"]), "instance")
        .appendField("read humidity %");
    this.setInputsInline(true);
    this.setOutput(true, ["float", "Number"]);
    this.setColour("#3f93e8");
 this.setTooltip("read humidity in percentage");
 this.setHelpUrl("");
  }
};