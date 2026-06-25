Blockly.JavaScript['netpie.setup'] = function(block) {
	var text_appid = block.getFieldValue('appid');
	var text_key = block.getFieldValue('key');
	var text_secret = block.getFieldValue('secret');
	var text_alias = block.getFieldValue('alias');

	var code = '';
	code += '#EXTINC#include <WiFi.h>#END\n';
	code += '#EXTINC#include <MicroGear.h>#END\n';
	code += '#EXTINC#include <AuthClient.h>#END\n';
	code += '#EXTINC#include <MQTTClient.h>#END\n';
	code += '#EXTINC#include <PubSubClient.h>#END\n';
	code += '#EXTINC#include <SHA1.h>#END\n';
	code += '#VARIABLE #define APPID   "' + text_appid + '" #END\n';
	code += '#VARIABLE #define KEY     "' + text_key + '" #END\n';
	code += '#VARIABLE #define SECRET  "' + text_secret + '" #END\n';
	code += '#VARIABLE #define ALIAS   "' + text_alias + '" #END\n';
	code += '#VARIABLE WiFiClient client; #END\n';
	code += '#VARIABLE MicroGear microgear(client); #END\n';
	code += '\n';
	code += 'microgear.on(CONNECTED, [](char *attribute, uint8_t* msg, unsigned int msglen) {\n';
    code += '  microgear.setAlias(ALIAS);\n';
    code += '});\n';
	code += 'microgear.init(KEY, SECRET, ALIAS);\n';
	code += 'microgear.connect(APPID);\n';
	code += '\n';
	code += '#EXTINC#include "KBEvent.h"#END\n';
	code += '#VARIABLE KBEvent kbevt;#END\n';
	code += 'kbevt.attach("NETPIEJob",KBEventType::EVERY, [](){\n';
	code += '  static uint32_t connect_timer = millis();\n';
	code += '  if (microgear.connected()) {\n';
    code += '    microgear.loop();\n';
    code += '  } else {\n';
    code += '    if ((millis() - connect_timer) >= 5000) {\n';
    code += '      microgear.connect(APPID);\n';
    code += '      connect_timer = millis();\n';
    code += '    }\n';
	code += '  }\n';
	code += '}, 100);\n';
	return code;
};

Blockly.JavaScript['netpie.loop'] = function(block) {
	var code = '';
	code += 'static uint32_t connect_timer = millis();\n';
	code += 'if (microgear.connected()) {\n';
    code += '  microgear.loop();\n';
    code += '} else {\n';
    code += '  if ((millis() - connect_timer) >= 5000) {\n';
    code += '    microgear.connect(APPID);\n';
    code += '    connect_timer = millis();\n';
    code += '  }\n';
	code += '}\n';
	return code;
};

Blockly.JavaScript['netpie.on_rev'] = function(block) {
	var statements_callback = Blockly.JavaScript.statementToCode(block, 'callback');
	var code = '';
	code += 'microgear.on(MESSAGE, [](char *topic, uint8_t* msg, unsigned int msglen) {\n';
    code += '  msg[msglen] = \'\\0\';\n';
    code += statements_callback;
    code += '});\n';
	return code;
};

Blockly.JavaScript['netpie.chat'] = function(block) {
	var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC) || '""';
	var text_topic = block.getFieldValue('topic');
	var code = 'if (microgear.connected()) { microgear.chat("' + text_topic + '", String(' + value_value + ').c_str()); }\n';
	return code;
};

Blockly.JavaScript['netpie.subscribe'] = function(block) {
	var text_topic = block.getFieldValue('topic');
	var code = 'microgear.subscribe("' + text_topic + '");\n';
	return code;
};

Blockly.JavaScript['netpie.get_topic'] = function(block) {
	var code = 'String(topic)';
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['netpie.get_number'] = function(block) {
	var code = '(String((char*)msg).toFloat())';
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['netpie.get_text'] = function(block) {
	var code = '(String((char*)msg))';
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['netpie.is_connected'] = function(block) {
	var code = 'microgear.connected()';
	return [code, Blockly.JavaScript.ORDER_NONE];
};
