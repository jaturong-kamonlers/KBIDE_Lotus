#include "LotusNanoBot.h"

${EXTINC}
${VARIABLE}
${FUNCTION}

void setup()
{
    pinMode(AIN1, OUTPUT);
	pinMode(AIN2, OUTPUT);
	pinMode(BIN1, OUTPUT);
	pinMode(BIN2, OUTPUT);
	pinMode(PWMA, OUTPUT);
	pinMode(PWMB, OUTPUT);
	pinMode(_BT,INPUT);
	  pinMode(14, INPUT);

	display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
	// ===== Boot splash (persistent) =====
	display.clearDisplay();
	display.setTextColor(WHITE, BLACK);
	display.setTextSize(2);
	display.setCursor(34, 12);          // "Lotus" centered (5 chars * 12px = 60, x=(128-60)/2=34)
	display.print("Lotus");
	display.setTextSize(2);
	display.setCursor(4, 36);           // "NanoBot 2.0" centered as best size-2 fits
	display.print("NanoBot 2.0");
	display.display();
	// ===== C major scale (Do Re Mi Fa Sol La Ti Do, 100ms each) =====
	tone(_BZ, 262, 100); delay(110);    // C  Do
	tone(_BZ, 294, 100); delay(110);    // D  Re
	tone(_BZ, 330, 100); delay(110);    // E  Mi
	tone(_BZ, 349, 100); delay(110);    // F  Fa
	tone(_BZ, 392, 100); delay(110);    // G  Sol
	tone(_BZ, 440, 100); delay(110);    // A  La
	tone(_BZ, 494, 100); delay(110);    // B  Ti
	tone(_BZ, 523, 100); delay(110);    // C5 Do
	noTone(_BZ);

  ${SETUP_CODE}
  ${BLOCKSETUP}
}
void loop()
{
  
  ${LOOP_CODE}
  ${LOOP_EXT_CODE}
}