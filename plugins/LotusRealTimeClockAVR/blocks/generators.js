// generators.js for LotusRTC(DS1307) Plugin
Blockly.JavaScript = Blockly.JavaScript || {};

// ==================== RTC Initialization ====================
Blockly.JavaScript['rtc_begin'] = function(block) {
  var variable_rtc = Blockly.JavaScript.variableDB_.getName(
    block.getFieldValue('RTC_INSTANCE'),
    Blockly.Variables.NAME_TYPE
  );

  var code = `
#EXTINC#include <Wire.h>#END
#EXTINC#include "RtcDS1307.h"#END
#EXTINC#include "RtcDateTime.h"#END
#EXTINC#include "RtcUtility.h"#END

#VARIABLE
RtcDS1307<TwoWire> ${variable_rtc}(Wire);
static char _rtcBuf_${variable_rtc}[20];
static uint16_t _${variable_rtc}_Y  = 2000;
static uint8_t  _${variable_rtc}_Mo = 1;
static uint8_t  _${variable_rtc}_D  = 1;
static uint8_t  _${variable_rtc}_H  = 0;
static uint8_t  _${variable_rtc}_Mi = 0;
static uint8_t  _${variable_rtc}_S  = 0;
static unsigned long _${variable_rtc}_t = 0;
#END

#FUNCTION
void _rtcUpdate_${variable_rtc}() {
  RtcDateTime _dt = ${variable_rtc}.GetDateTime();
  _${variable_rtc}_Y  = _dt.Year();
  _${variable_rtc}_Mo = _dt.Month();
  _${variable_rtc}_D  = _dt.Day();
  _${variable_rtc}_H  = _dt.Hour();
  _${variable_rtc}_Mi = _dt.Minute();
  _${variable_rtc}_S  = _dt.Second();
}
static void _p2(char* &p, uint8_t v) {
  *p++ = '0' + v / 10;
  *p++ = '0' + v % 10;
}
static void _p4(char* &p, uint16_t v) {
  *p++ = '0' + v / 1000;
  *p++ = '0' + (v / 100) % 10;
  *p++ = '0' + (v / 10) % 10;
  *p++ = '0' + v % 10;
}
const char* _rtcFmt_${variable_rtc}(uint8_t f) {
  char* p = _rtcBuf_${variable_rtc};
  switch(f) {
    case 0:
      _p2(p,_${variable_rtc}_H); *p++=':';
      _p2(p,_${variable_rtc}_Mi); *p++=':';
      _p2(p,_${variable_rtc}_S); *p=0; break;
    case 1:
      _p2(p,_${variable_rtc}_H); *p++=':';
      _p2(p,_${variable_rtc}_Mi); *p=0; break;
    case 2:
      _p2(p,_${variable_rtc}_Mi); *p++=':';
      _p2(p,_${variable_rtc}_S); *p=0; break;
    case 3:
      _p2(p,_${variable_rtc}_D); *p++='/';
      _p2(p,_${variable_rtc}_Mo); *p++='/';
      _p4(p,_${variable_rtc}_Y); *p=0; break;
    case 4:
      _p2(p,_${variable_rtc}_D); *p++='/';
      _p2(p,_${variable_rtc}_Mo); *p++='/';
      _p2(p,_${variable_rtc}_Y%100); *p=0; break;
    case 5:
      _p4(p,_${variable_rtc}_Y); *p++='-';
      _p2(p,_${variable_rtc}_Mo); *p++='-';
      _p2(p,_${variable_rtc}_D); *p=0; break;
    case 6:
      _p2(p,_${variable_rtc}_D); *p++='/';
      _p2(p,_${variable_rtc}_Mo); *p++='/';
      _p4(p,_${variable_rtc}_Y); *p++=' ';
      _p2(p,_${variable_rtc}_H); *p++=':';
      _p2(p,_${variable_rtc}_Mi); *p++=':';
      _p2(p,_${variable_rtc}_S); *p=0; break;
    default:
      _rtcBuf_${variable_rtc}[0]='?'; _rtcBuf_${variable_rtc}[1]=0; break;
  }
  return _rtcBuf_${variable_rtc};
}
#END

#SETUP
  ${variable_rtc}.Begin();
  if (!${variable_rtc}.GetIsRunning()) {
    ${variable_rtc}.SetIsRunning(true);
  }
  if (!${variable_rtc}.IsDateTimeValid()) {
    RtcDateTime compiled = RtcDateTime(__DATE__, __TIME__);
    ${variable_rtc}.SetDateTime(compiled);
  }
  _rtcUpdate_${variable_rtc}();
#END
`;
  return code;
};

// ==================== RTC Update (throttle 1 วินาที) ====================
Blockly.JavaScript['rtc_update'] = function(block) {
  var variable_rtc = Blockly.JavaScript.variableDB_.getName(
    block.getFieldValue('RTC_INSTANCE'),
    Blockly.Variables.NAME_TYPE
  );
  // อ่าน I2C แค่ทุก 1000ms เพื่อไม่ให้ bus ยุ่งตลอด
  return `if ((unsigned long)(millis() - _${variable_rtc}_t) >= 1000UL) { _${variable_rtc}_t = millis(); _rtcUpdate_${variable_rtc}(); }\n`;
};

// ==================== Individual Getters ====================
var _rtcFields = {
  'year':   '_Y',
  'month':  '_Mo',
  'day':    '_D',
  'hour':   '_H',
  'minute': '_Mi',
  'second': '_S'
};
Object.keys(_rtcFields).forEach(function(key) {
  Blockly.JavaScript['rtc_get_' + key] = function(block) {
    var variable_rtc = Blockly.JavaScript.variableDB_.getName(
      block.getFieldValue('RTC_INSTANCE'),
      Blockly.Variables.NAME_TYPE
    );
    return [`_${variable_rtc}${_rtcFields[key]}`, Blockly.JavaScript.ORDER_ATOMIC];
  };
});

// ==================== Time Format ====================
var _rtcFmtIndex = {
  'HH:MM:SS':            '0',
  'HH:MM':               '1',
  'MM:SS':               '2',
  'DD/MM/YYYY':          '3',
  'DD/MM/YY':            '4',
  'YYYY-MM-DD':          '5',
  'DD/MM/YYYY HH:MM:SS': '6'
};
Blockly.JavaScript['rtc_format_time'] = function(block) {
  var variable_rtc = Blockly.JavaScript.variableDB_.getName(
    block.getFieldValue('RTC_INSTANCE'),
    Blockly.Variables.NAME_TYPE
  );
  var fmt = block.getFieldValue('FORMAT');
  var idx = _rtcFmtIndex[fmt] || '0';
  return [`_rtcFmt_${variable_rtc}(${idx})`, Blockly.JavaScript.ORDER_ATOMIC];
};

// ==================== Zero Pad ====================
Blockly.JavaScript['rtc_zero_pad'] = function(block) {
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  return [`((_rtcBuf_RTC1[0]='0'+((int)(${value}))/10, _rtcBuf_RTC1[1]='0'+((int)(${value}))%10, _rtcBuf_RTC1[2]=0), _rtcBuf_RTC1)`, Blockly.JavaScript.ORDER_ATOMIC];
};