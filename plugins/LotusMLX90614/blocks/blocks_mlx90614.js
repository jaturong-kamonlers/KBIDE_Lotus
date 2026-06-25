// blocks_mlx90614.js for MLX90614 Plugin
'use strict';

if (!Blockly) {
    console.error('Blockly not found!');
}

// ========== MLX90614 Setup ==========
Blockly.Blocks['mlx90614_setup'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("MLX1"), "INSTANCE")
            .appendField("Setup MLX90614");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("ตั้งค่า MLX90614 เซนเซอร์วัดอุณหภูมิอินฟราเรด - วางใน Setup");
        this.setHelpUrl("");
    }
};

// ========== Update (once per loop) ==========
Blockly.Blocks['mlx90614_update'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("MLX1"), "INSTANCE")
            .appendField("Read MLX90614 (once per loop)");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("อ่านค่าจาก MLX90614 ครั้งเดียวต่อรอบ - วางไว้ต้น Loop");
        this.setHelpUrl("");
    }
};

// ========== Read Object Temperature ==========
Blockly.Blocks['mlx90614_read_object'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("MLX1"), "INSTANCE")
            .appendField("Object Temp (°C)");
        this.setInputsInline(true);
        this.setOutput(true, ["float", "Number"]);
        this.setColour(230);
        this.setTooltip("อ่านอุณหภูมิวัตถุที่ชี้ (หน่วย °C) - ช่วงวัด -70 ถึง 380 °C");
        this.setHelpUrl("");
    }
};

// ========== Read Ambient Temperature ==========
Blockly.Blocks['mlx90614_read_ambient'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("MLX1"), "INSTANCE")
            .appendField("Ambient Temp (°C)");
        this.setInputsInline(true);
        this.setOutput(true, ["float", "Number"]);
        this.setColour(230);
        this.setTooltip("อ่านอุณหภูมิแวดล้อม (อุณหภูมิตัวเซนเซอร์เอง) หน่วย °C");
        this.setHelpUrl("");
    }
};

// ========== Check Connected ==========
Blockly.Blocks['mlx90614_connected'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("MLX1"), "INSTANCE")
            .appendField("Connected?");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(230);
        this.setTooltip("ตรวจสอบว่า MLX90614 เชื่อมต่ออยู่หรือไม่");
        this.setHelpUrl("");
    }
};

console.log('✅ MLX90614 blocks loaded!');
