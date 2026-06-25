// blocks_ble.js for BLE Plugin
'use strict';

if (!Blockly) {
    console.error('Blockly not found!');
}

// ========== Setup BLE ==========
Blockly.Blocks['ble_setup'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("BLE1"), "INSTANCE")
            .appendField("Setup BLE")
            .appendField("Name")
            .appendField(new Blockly.FieldTextInput("LotusDevkit"), "BLE_NAME");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("Initialize BLE (Bluetooth Low Energy) - supports iPhone / iPad / Android. Place in Setup.");
        this.setHelpUrl("");
    }
};

// ========== Send ==========
Blockly.Blocks['ble_send'] = {
    init: function() {
        this.appendValueInput("MSG")
            .setCheck(["String","Number","Boolean"])
            .appendField(new Blockly.FieldVariable("BLE1"), "INSTANCE")
            .appendField("BLE Send");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("Send data via BLE to App.");
        this.setHelpUrl("");
    }
};

// ========== Send Line ==========
Blockly.Blocks['ble_send_line'] = {
    init: function() {
        this.appendValueInput("MSG")
            .setCheck(["String","Number","Boolean"])
            .appendField(new Blockly.FieldVariable("BLE1"), "INSTANCE")
            .appendField("BLE Send Line");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("Send data with newline via BLE.");
        this.setHelpUrl("");
    }
};

// ========== Available ==========
Blockly.Blocks['ble_available'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("BLE1"), "INSTANCE")
            .appendField("BLE Available?");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(230);
        this.setTooltip("Check if data has been received from BLE.");
        this.setHelpUrl("");
    }
};

// ========== Read Char ==========
Blockly.Blocks['ble_read_char'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("BLE1"), "INSTANCE")
            .appendField("BLE Read Char");
        this.setInputsInline(true);
        this.setOutput(true, "String");
        this.setColour(230);
        this.setTooltip("Read 1 character from BLE.");
        this.setHelpUrl("");
    }
};

// ========== Read String ==========
Blockly.Blocks['ble_read_string'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("BLE1"), "INSTANCE")
            .appendField("BLE Read String");
        this.setInputsInline(true);
        this.setOutput(true, "String");
        this.setColour(230);
        this.setTooltip("Read a string from BLE (until newline).");
        this.setHelpUrl("");
    }
};

// ========== Read Int ==========
Blockly.Blocks['ble_read_int'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("BLE1"), "INSTANCE")
            .appendField("BLE Read Int");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Read an integer from BLE.");
        this.setHelpUrl("");
    }
};

// ========== Read Float ==========
Blockly.Blocks['ble_read_float'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("BLE1"), "INSTANCE")
            .appendField("BLE Read Float");
        this.setInputsInline(true);
        this.setOutput(true, "float");
        this.setColour(230);
        this.setTooltip("Read a float number from BLE.");
        this.setHelpUrl("");
    }
};

// ========== Is Connected ==========
Blockly.Blocks['ble_connected'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("BLE1"), "INSTANCE")
            .appendField("BLE Connected?");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(230);
        this.setTooltip("Check if a device is connected via BLE.");
        this.setHelpUrl("");
    }
};

console.log('✅ BLE blocks loaded!');
