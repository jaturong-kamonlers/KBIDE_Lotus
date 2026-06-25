Blockly.JavaScript['bh1750_begin'] = function(block) {
	var dropdown_address = block.getFieldValue('address');
	var WIRE_OBJ = 'Wire';
	var SDA_PIN = 21, SCL_PIN = 22;
	var IS_AVR = false;

	var board_name = Vue.prototype.$global.board.board_info.name;
	if (board_name == 'kidbright-arduino' || board_name == 'openkb') {
		WIRE_OBJ = 'Wire1';
		SDA_PIN = 4;
		SCL_PIN = 5;
	} else if (board_name == 'ipst-wifi') {
		// ESP32 default: SDA=21, SCL=22 (already set above)
	} else if (board_name == 'LotusNanoBot') {
		// ATmega328P (Arduino Nano) - I2C pins are fixed at A4(SDA) and A5(SCL)
		// Wire.begin() does NOT require pin arguments on AVR platform
		WIRE_OBJ = 'Wire';
		IS_AVR = true;
	}

	var code = '';
	code += '#EXTINC#include <BH1750.h>#END\n';
	code += '#EXTINC#include <Wire.h>#END\n';
	code += '#VARIABLE BH1750 bh(' + dropdown_address + ', &' + WIRE_OBJ + ');#END\n';
	code += '\n';

	if (IS_AVR) {
		// AVR platform: Wire.begin() without pin arguments
		code += WIRE_OBJ + '.begin();\n';
	} else {
		// ESP32 platform: Wire.begin(SDA, SCL)
		code += WIRE_OBJ + '.begin(' + SDA_PIN + ', ' + SCL_PIN + ');\n';
	}

	code += 'bh.begin();\n';
	return code;
};

Blockly.JavaScript['bh1750_read'] = function(block) {
	var code = 'bh.read()';
	return [code, Blockly.JavaScript.ORDER_NONE];
};
