module.exports = function(Blockly) {
  "use strict";

  // -- MQTT Begin (Setup) --
  Blockly.JavaScript["lt_mqtt_begin"] = function(block) {
    var broker = block.getFieldValue('BROKER') || 'rail.kls.ac.th';
    var port = block.getFieldValue('PORT') || '1883';
    var clientId = block.getFieldValue('CLIENT_ID') || 'lotus-client';
    var ssid = block.getFieldValue('SSID') || 'SSID';
    var pass = block.getFieldValue('PASS') || 'PASSWORD';

    let code = '#EXTINC\n' +
      '#include <WiFi.h>\n' +
      '#include <WiFiClient.h>\n' +
      '#include "PubSubClient.h"\n' +
      '#END\n' +
      '#VARIABLE\n' +
      'WiFiClient _mqWifi;\n' +
      'PubSubClient _mqClient(_mqWifi);\n' +
      'String _mqTopicStr = "";\n' +
      'String _mqPayloadStr = "";\n' +
      '#END\n' +
      '#FUNCTION\n' +
      'void _mqCB(const MQTT::Publish& pub) {\n' +
      '  _mqTopicStr = pub.topic();\n' +
      '  _mqPayloadStr = pub.payload_string();\n' +
      '}\n' +
      'void _mqReconnect() {\n' +
      '  if (!_mqClient.connected()) {\n' +
      '    Serial.println("MQTT reconnecting...");\n' +
      '    if (_mqClient.connect("' + clientId + '")) {\n' +
      '      Serial.println("MQTT connected!");\n' +
      '    } else {\n' +
      '      Serial.println("MQTT connect failed");\n' +
      '    }\n' +
      '  }\n' +
      '}\n' +
      '#END\n' +
      'WiFi.begin("' + ssid + '", "' + pass + '");\n' +
      'Serial.print("Connecting WiFi");\n' +
      'int _wifiTimeout = 0;\n' +
      'while (WiFi.status() != WL_CONNECTED && _wifiTimeout < 30) {\n' +
      '  delay(500);\n' +
      '  Serial.print(".");\n' +
      '  _wifiTimeout++;\n' +
      '}\n' +
      'Serial.println("");\n' +
      'if (WiFi.status() == WL_CONNECTED) {\n' +
      '  Serial.println("WiFi connected!");\n' +
      '  Serial.println(WiFi.localIP());\n' +
      '} else {\n' +
      '  Serial.println("WiFi connect failed!");\n' +
      '}\n' +
      '_mqClient.set_server("' + broker + '", ' + port + ');\n' +
      '_mqClient.set_callback(_mqCB);\n' +
      '_mqClient.connect("' + clientId + '");\n';
    return code;
  };

  // -- MQTT Loop --
  Blockly.JavaScript["lt_mqtt_loop"] = function(block) {
    return '_mqReconnect();\n_mqClient.loop();\n';
  };

  // -- MQTT Publish (value inputs: TOPIC + VALUE) --
  Blockly.JavaScript["lt_mqtt_publish"] = function(block) {
    var topic = Blockly.JavaScript.valueToCode(block, 'TOPIC', Blockly.JavaScript.ORDER_ATOMIC) || '"lotus/sensor"';
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC) || '"hello"';
    return '_mqClient.publish(String(' + topic + '), String(' + value + '));\n';
  };

  // -- MQTT Subscribe (value input: TOPIC) --
  Blockly.JavaScript["lt_mqtt_subscribe"] = function(block) {
    var topic = Blockly.JavaScript.valueToCode(block, 'TOPIC', Blockly.JavaScript.ORDER_ATOMIC) || '"lotus/cmd"';
    return '_mqClient.subscribe(String(' + topic + '));\n';
  };

  // -- MQTT When Message Received --
  Blockly.JavaScript["lt_mqtt_on_message"] = function(block) {
    var statements = Blockly.JavaScript.statementToCode(block, 'DO');
    return 'if (_mqTopicStr.length() > 0) {\n' +
      statements +
      '  _mqTopicStr = "";\n' +
      '  _mqPayloadStr = "";\n' +
      '}\n';
  };

  // -- MQTT Topic (matches toolbox: lt_mqtt_msg_topic) --
  Blockly.JavaScript["lt_mqtt_msg_topic"] = function(block) {
    return ['_mqTopicStr', Blockly.JavaScript.ORDER_ATOMIC];
  };

  // -- MQTT Payload (matches toolbox: lt_mqtt_msg_payload) --
  Blockly.JavaScript["lt_mqtt_msg_payload"] = function(block) {
    return ['_mqPayloadStr', Blockly.JavaScript.ORDER_ATOMIC];
  };

  // -- MQTT Connected? --
  Blockly.JavaScript["lt_mqtt_connected"] = function(block) {
    return ['_mqClient.connected()', Blockly.JavaScript.ORDER_ATOMIC];
  };

};
