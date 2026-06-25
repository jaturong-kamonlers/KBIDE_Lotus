Blockly.Blocks['bh1750_begin'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("BH1750 begin at")
			.appendField(new Blockly.FieldDropdown([["0x23","0x23"], ["0x5C","0x5C"]]), "address");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(230);
		this.setTooltip("Config BH1750 to Continuously H-Resolution Mode and setup I2C");
		this.setHelpUrl("https://github.com/maxpromer/BH1750_Arduino");
	}
};

Blockly.Blocks['bh1750_read'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("BH1750 read light level (lx)");
		this.setOutput(true, null);
		this.setColour(230);
		this.setTooltip("Read and Masurement data from BH1750");
		this.setHelpUrl("https://github.com/maxpromer/BH1750_Arduino");
	}
};
