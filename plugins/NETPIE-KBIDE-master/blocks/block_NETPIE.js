Blockly.Blocks['netpie.setup'] = {
	init: function() {
		this.jsonInit({
			"message0": "NETPIE setup Appid %1 Key %2 Secret %3 Alias %4",
			"args0": [{
				"type": "field_input",
				"name": "appid",
				"text": ""
			}, {
				"type": "field_input",
				"name": "key",
				"text": ""
			}, {
				"type": "field_input",
				"name": "secret",
				"text": ""
			}, {
				"type": "field_input",
				"name": "alias",
				"text": ""
			}],
			"previousStatement": null,
			"nextStatement": null,
			"colour": 0,
			"tooltip": "",
			"helpUrl": ""
		});
	}
};

/*
Blockly.Blocks['netpie.loop'] = {
	init: function() {
		this.jsonInit({
			"message0": "NETPIE loop",
			"previousStatement": null,
			"nextStatement": null,
			"colour": 0,
			"tooltip": "",
			"helpUrl": ""
		});
	}
};
*/

Blockly.Blocks['netpie.on_rev'] = {
	init: function() {
		this.jsonInit({
			"message0": "NETPIE on receiving %1 %2",
			"args0": [{
				"type": "input_dummy"
			}, {
				"type": "input_statement",
				"name": "callback"
			}],
			"previousStatement": null,
			"nextStatement": null,
			"colour": 0,
			"tooltip": "",
			"helpUrl": ""
		});
	}
};

Blockly.Blocks['netpie.chat'] = {
	init: function() {
		this.jsonInit({
			"message0": "NETPIE send %1 to %2",
			"args0": [{
				"type": "input_value",
				"name": "value",
				"align": "RIGHT"
			}, {
				"type": "field_input",
				"name": "topic",
				"text": ""
			}],
			"previousStatement": null,
			"nextStatement": null,
			"colour": 0,
			"tooltip": "",
			"helpUrl": ""
		});
	}
};

Blockly.Blocks['netpie.subscribe'] = {
	init: function() {
		this.jsonInit({
			"message0": "NETPIE subscribe %1",
			"args0": [{
				"type": "field_input",
				"name": "topic",
				"text": ""
			}],
			"previousStatement": null,
			"nextStatement": null,
			"colour": 0,
			"tooltip": "",
			"helpUrl": ""
		});
	}
};

Blockly.Blocks['netpie.get_topic'] = {
	init: function() {
		this.jsonInit({
			"message0": "NETPIE get topic",
			"output": "String",
			"colour": 0,
			"tooltip": "",
			"helpUrl": ""
		});
	}
};

Blockly.Blocks['netpie.get_number'] = {
	init: function() {
		this.jsonInit({
			"message0": "NETPIE read number",
			"output": [
				"Number",
				"Boolean"
			],
			"colour": 0,
			"tooltip": "",
			"helpUrl": ""
		});
	}
};

Blockly.Blocks['netpie.get_text'] = {
	init: function() {
		this.jsonInit({
			"message0": "NETPIE get text",
			"output": "String",
			"colour": 0,
			"tooltip": "",
			"helpUrl": ""
		});
	}
};

Blockly.Blocks['netpie.is_connected'] = {
	init: function() {
		this.jsonInit({
			"message0": "NETPIE is connected",
			"output": [
				"Number",
				"Boolean"
			],
			"colour": 0,
			"tooltip": "",
			"helpUrl": ""
		});
	}
};



