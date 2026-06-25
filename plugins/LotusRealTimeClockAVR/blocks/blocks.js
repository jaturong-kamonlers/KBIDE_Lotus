// blocks.js for LotusRTC(DS1307) Plugin - Minimal Version
// Only essential blocks for Arduino Nano

// ==================== RTC Initialization ====================
Blockly.Blocks['rtc_begin'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("RTC1", null, ["Plugin.RTC"], ["Plugin.RTC"]), "RTC_INSTANCE")
        .appendField("Initialize RTC");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Initialize DS1307 RTC and sync with PC compile time");
  }
};

// ==================== RTC Update (ต้องวางต้น Loop) ====================
Blockly.Blocks['rtc_update'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("RTC1", null, ["Plugin.RTC"], ["Plugin.RTC"]), "RTC_INSTANCE")
        .appendField("Read RTC (once per loop)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("อ่านค่า RTC ครั้งเดียวต่อรอบ (I2C 1 ครั้ง)\nต้องวางไว้ต้น Loop ก่อนใช้ Get HOUR/MINUTE/SECOND และ Time format\n→ ป้องกัน OLED ค้างจาก I2C ถูกเรียกซ้ำหลายครั้ง");
    this.setHelpUrl("");
  }
};

// ==================== Time Format Blocks ====================

// HH:MM:SS
Blockly.Blocks['rtc_format_time'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("RTC1", null, ["Plugin.RTC"], ["Plugin.RTC"]), "RTC_INSTANCE")
        .appendField("Time format")
        .appendField(new Blockly.FieldDropdown([
          ["HH:MM:SS",   "HH:MM:SS"],
          ["HH:MM",      "HH:MM"],
          ["MM:SS",      "MM:SS"],
          ["DD/MM/YYYY", "DD/MM/YYYY"],
          ["DD/MM/YY",   "DD/MM/YY"],
          ["YYYY-MM-DD", "YYYY-MM-DD"],
          ["DD/MM/YYYY HH:MM:SS", "DD/MM/YYYY HH:MM:SS"]
        ]), "FORMAT");
    this.setInputsInline(true);
    this.setOutput(true, "String");
    this.setColour(230);
    this.setTooltip("แสดงเวลา/วันที่ในรูปแบบที่เลือก เช่น 09:05:03 หรือ 21/02/2026");
    this.setHelpUrl("");
  }
};

// ==================== Individual Getters ====================
const timeFields = ['YEAR', 'MONTH', 'DAY', 'HOUR', 'MINUTE', 'SECOND'];
timeFields.forEach(field => {
  const fieldLower = field.toLowerCase();
  Blockly.Blocks['rtc_get_' + fieldLower] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldVariable("RTC1", null, ["Plugin.RTC"], ["Plugin.RTC"]), "RTC_INSTANCE")
          .appendField("Get " + field);
      this.setOutput(true, "Number");
      this.setColour(230);
      this.setTooltip("Get current " + fieldLower + " from RTC");
    }
  };
});

// Zero-pad number (เช่น 9 → "09")
Blockly.Blocks['rtc_zero_pad'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck("Number")
        .appendField("zero pad");
    this.setInputsInline(true);
    this.setOutput(true, "String");
    this.setColour(230);
    this.setTooltip("เติม 0 นำหน้าเลขหลักเดียว เช่น 9 → \"09\"");
    this.setHelpUrl("");
  }
};
