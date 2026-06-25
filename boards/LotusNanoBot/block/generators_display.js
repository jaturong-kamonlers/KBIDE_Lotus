const nativeImage = require('electron').nativeImage;
var createBuffer = function(pixels,width,height){
  var depth = 4,
      pixelsLen = pixels.length,
      unpackedBuffer = [],
      threshold = 120;

  var buffer = new Buffer((width * (Math.ceil(height / 8) * 8)) / 8);  
  buffer.fill(0x00);
  for (var i = 0; i < pixelsLen; i += depth) {
    var pixelVal = pixels[i + 1] = pixels[i + 2] = pixels[i];
    pixelVal = (pixelVal > threshold)? 1 : 0;    
    unpackedBuffer[i/depth] = pixelVal;
  }
  for(var x = 0;x < width; x++){
    for(var y = 0; y < height; y+=8){
      for(var cy = 0; cy < 8; cy++){
        var iy = y+cy;
        if(iy >= height){ break; }
        buffer[x*Math.ceil(height/8) + Math.floor(y/8)] |= unpackedBuffer[iy*width + x] << cy;
      }
    }
  }
  return buffer;
};

module.exports = function(Blockly){
  'use strict';
  
  Blockly.JavaScript['i2c128x64_create_image'] = function(block) {
    var dataurl = block.inputList[1].fieldRow["0"].src_;
    var image = nativeImage.createFromDataURL(dataurl);
    var size = image.getSize();
    var buff = createBuffer(image.getBitmap(),size.width,size.height);
    var hexStringArr = '';
    for(let i=1;i<=buff.length;i++){
      hexStringArr += (buff[i-1] < 16)? `0x0${buff[i-1].toString(16)},` : `0x${buff[i-1].toString(16)},`;
      if(i % 20 == 0){ hexStringArr += '\n'; }
    }
    hexStringArr = hexStringArr.trim();
    if(hexStringArr.endsWith(',')){
      hexStringArr = hexStringArr.substring(0,hexStringArr.length - 1);
    }
    var code = `(std::vector<uint8_t>{${hexStringArr}})`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['i2c128x64_display_image'] = function(block) {
    var value_img = Blockly.JavaScript.valueToCode(block, 'img', Blockly.JavaScript.ORDER_ATOMIC);
    var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
    var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
    var value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
    var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);  
    var code = `display.drawBitmap(${value_x}, ${value_y}, ${value_img}.data(), ${value_width}, ${value_height}, SSD1306_WHITE);\n`;
    return code;
  };

  Blockly.JavaScript['i2c128x64_display_clear'] = function(block) {  
    return 'display.clearDisplay();\n';
  };

  Blockly.JavaScript['i2c128x64_display_display'] = function(block) {  
    return 'display.display();\n';
  };

  Blockly.JavaScript['i2c128x64_display_print'] = function(block) {
    var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
    var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
    var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_font = block.getFieldValue('font');

    var code = '';
    code += 'display.setTextSize(' + dropdown_font + ');\n';
    code += 'display.setTextColor(SSD1306_WHITE);\n';
    code += 'display.setCursor(' + value_x + ', ' + value_y + ');\n';

    // text_join ใน KBIDE generate เป็น ((String("A")+String(expr)))
    // ใช้ depth-counting parser แยก String(...) ทีละ part
    // รองรับ nested parentheses เช่น RTC1.GetDateTime().Hour()
    var _parts = [];
    var _txt = value_text;
    var _i = 0;
    while (_i < _txt.length) {
      var _m = _txt.indexOf('String(', _i);
      if (_m === -1) break;
      var _start = _m + 7; // เลย "String("
      var _depth = 1;
      var _j = _start;
      while (_j < _txt.length && _depth > 0) {
        if (_txt[_j] === '(') _depth++;
        else if (_txt[_j] === ')') _depth--;
        _j++;
      }
      _parts.push(_txt.substring(_start, _j - 1));
      _i = _m + 7;
    }

    if (_parts.length > 0) {
      // พบ String()+String() pattern → print แยกทีละ part ไม่สร้าง String object
      for (var _pi = 0; _pi < _parts.length; _pi++) {
        var _p = _parts[_pi].trim();
        if (/^".*"$/.test(_p)) {
          // string literal → F() เก็บใน Flash ประหยัด RAM
          code += 'display.print(F(' + _p + '));\n';
        } else {
          // expression (ตัวแปร, RTC call, DHT var) → print ตรงๆ
          code += 'display.print(' + _p + ');\n';
        }
      }
    } else {
      // ไม่มี String() → print ตรงๆ
      if (/^".*"$/.test(value_text.trim())) {
        code += 'display.print(F(' + value_text + '));\n';
      } else {
        code += 'display.print(' + value_text + ');\n';
      }
    }
    return code;
  };

  Blockly.JavaScript['i2c128x64_hilight_text'] = function(block) {
    var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
    var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
    var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_font = block.getFieldValue('font');  
    var code = `
display.setTextSize(${dropdown_font});
display.setTextColor(SSD1306_BLACK, SSD1306_WHITE);
display.setCursor(${value_x}, ${value_y});
display.print(${value_text});
display.setTextColor(SSD1306_WHITE);
`;
    return code;
  };

  // แก้ไขส่วน scroll และ print_display ให้ใช้มาตรฐาน Print ของ Adafruit
  Blockly.JavaScript['i2c128x64_display_print_display'] = function(block) {
    var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
    var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
    var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `
display.clearDisplay();
display.setTextSize(1);
display.setTextColor(SSD1306_WHITE);
display.setCursor(${value_x}, ${value_y});
display.print(${value_text});
display.display();
`;
    return code;
  };

  Blockly.JavaScript['i2c128x64_display_print_number'] = function(block) {
    var value_num = Blockly.JavaScript.valueToCode(block, 'number', Blockly.JavaScript.ORDER_ATOMIC);
    var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
    var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_font = block.getFieldValue('font');  
    var code = `
display.setTextSize(${dropdown_font});
display.setTextColor(SSD1306_WHITE);
display.setCursor(${value_x}, ${value_y});
display.print(${value_num});
`;
    return code;
  };

  Blockly.JavaScript['i2c128x64_display_draw_line'] = function(block) {
    var v_x0 = Blockly.JavaScript.valueToCode(block, 'x0', Blockly.JavaScript.ORDER_ATOMIC);
    var v_y0 = Blockly.JavaScript.valueToCode(block, 'y0', Blockly.JavaScript.ORDER_ATOMIC);
    var v_x1 = Blockly.JavaScript.valueToCode(block, 'x1', Blockly.JavaScript.ORDER_ATOMIC);
    var v_y1 = Blockly.JavaScript.valueToCode(block, 'y1', Blockly.JavaScript.ORDER_ATOMIC);  
    return `display.drawLine(${v_x0}, ${v_y0}, ${v_x1}, ${v_y1}, SSD1306_WHITE);\n`;
  };

  Blockly.JavaScript['i2c128x64_display_draw_rect'] = function(block) {
    var v_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
    var v_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
    var v_w = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
    var v_h = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
    var fill = block.getFieldValue('fill') == 'TRUE';  
    return fill ? `display.fillRect(${v_x}, ${v_y}, ${v_w}, ${v_h}, SSD1306_WHITE);\n` : `display.drawRect(${v_x}, ${v_y}, ${v_w}, ${v_h}, SSD1306_WHITE);\n`;
  };

  Blockly.JavaScript['i2c128x64_display_draw_circle'] = function(block) {
    var v_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
    var v_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
    var v_r = Blockly.JavaScript.valueToCode(block, 'r', Blockly.JavaScript.ORDER_ATOMIC);
    var fill = block.getFieldValue('fill') == 'TRUE';
    return fill ? `display.fillCircle(${v_x}, ${v_y}, ${v_r}, SSD1306_WHITE);\n` : `display.drawCircle(${v_x}, ${v_y}, ${v_r}, SSD1306_WHITE);\n`;
  };

  Blockly.JavaScript['i2c128x64_display_width'] = function(block) {  
    return ['display.width()', Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.JavaScript['i2c128x64_display_height'] = function(block) {  
    return ['display.height()', Blockly.JavaScript.ORDER_ATOMIC];
  };

  // ===== MISSING GENERATORS - ADDED =====

  // draw round rect (i2c128x64_display_draw_progress_bar)
  // บล็อกชื่อ "draw round rect at (X..." ใช้ input: x, y, width, height, progress(radius), fill checkbox
  Blockly.JavaScript['i2c128x64_display_draw_progress_bar'] = function(block) {
    var v_x      = Blockly.JavaScript.valueToCode(block, 'x',        Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var v_y      = Blockly.JavaScript.valueToCode(block, 'y',        Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var v_w      = Blockly.JavaScript.valueToCode(block, 'width',    Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var v_h      = Blockly.JavaScript.valueToCode(block, 'height',   Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var v_r      = Blockly.JavaScript.valueToCode(block, 'progress', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var fill     = block.getFieldValue('fill') == 'TRUE';
    if (fill) {
      return `display.fillRoundRect(${v_x}, ${v_y}, ${v_w}, ${v_h}, ${v_r}, SSD1306_WHITE);\n`;
    } else {
      return `display.drawRoundRect(${v_x}, ${v_y}, ${v_w}, ${v_h}, ${v_r}, SSD1306_WHITE);\n`;
    }
  };

  // set pixel (i2c128x64_display_draw_pixel)
  // บล็อกชื่อ "set pixel (X...,Y...) white color [checkbox]"
  Blockly.JavaScript['i2c128x64_display_draw_pixel'] = function(block) {
    var v_x  = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var v_y  = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var color = block.getFieldValue('color') == 'TRUE' ? 'SSD1306_WHITE' : 'SSD1306_BLACK';
    return `display.drawPixel(${v_x}, ${v_y}, ${color});\n`;
  };

  // scroll text (i2c128x64_display_print_scroll_left)
  // รองรับ 4 ทิศทาง: LEFT, RIGHT, UP, DOWN
  // - ไม่มี clearDisplay() ในตัว → ใช้ร่วมกับ block อื่นบนจอได้
  // - ไม่มี display.display() ในตัว → ต้องใช้ "Show display" block ปิดท้ายเอง
  // - static variable → จำตำแหน่งข้ามรอบ loop ได้ อยู่ใน loop() ถึงจะเคลื่อนไหว
  Blockly.JavaScript['i2c128x64_display_print_scroll_left'] = function(block) {
    var v_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC) || '""';
    var v_step = Blockly.JavaScript.valueToCode(block, 'step', Blockly.JavaScript.ORDER_ATOMIC) || '2';
    var v_x    = Blockly.JavaScript.valueToCode(block, 'x',    Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var v_y    = Blockly.JavaScript.valueToCode(block, 'y',    Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var dir    = block.getFieldValue('dir')  || 'LEFT';
    var font   = block.getFieldValue('font') || '1';
    var uid    = block.id.replace(/[^a-zA-Z0-9]/g,'_');
    var charW  = 6;   // Adafruit default font width per unit
    var charH  = 8;   // Adafruit default font height per unit

    var code = '';
    if (dir === 'LEFT') {
      code = `{
  static int16_t _sx_${uid} = 128;
  String _txt_${uid} = String(${v_text});
  int16_t _tw_${uid} = _txt_${uid}.length() * ${charW} * ${font};
  display.setTextWrap(false);
  display.setTextSize(${font});
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(_sx_${uid}, ${v_y});
  display.print(_txt_${uid});
  _sx_${uid} -= ${v_step};
  if (_sx_${uid} < -_tw_${uid}) { _sx_${uid} = 128; }
}\n`;
    } else if (dir === 'RIGHT') {
      code = `{
  static int16_t _sx_${uid} = -64;
  String _txt_${uid} = String(${v_text});
  int16_t _tw_${uid} = _txt_${uid}.length() * ${charW} * ${font};
  display.setTextWrap(false);
  display.setTextSize(${font});
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(_sx_${uid}, ${v_y});
  display.print(_txt_${uid});
  _sx_${uid} += ${v_step};
  if (_sx_${uid} > 128) { _sx_${uid} = -_tw_${uid}; }
}\n`;
    } else if (dir === 'UP') {
      code = `{
  static int16_t _sy_${uid} = 64;
  display.setTextWrap(false);
  display.setTextSize(${font});
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(${v_x}, _sy_${uid});
  display.print(${v_text});
  _sy_${uid} -= ${v_step};
  if (_sy_${uid} < -(${charH} * ${font})) { _sy_${uid} = 64; }
}\n`;
    } else { // DOWN
      code = `{
  static int16_t _sy_${uid} = -(${charH} * ${font});
  display.setTextWrap(false);
  display.setTextSize(${font});
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(${v_x}, _sy_${uid});
  display.print(${v_text});
  _sy_${uid} += ${v_step};
  if (_sy_${uid} > 64) { _sy_${uid} = -(${charH} * ${font}); }
}\n`;
    }
    return code;
  };

  // ===== END MISSING GENERATORS =====
}