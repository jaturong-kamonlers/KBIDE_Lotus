#include "LotusMegaBotPlus.h"

${EXTINC}
${VARIABLE}
${FUNCTION}

void setup()
{
    // Motor direction pins
    pinMode(M1A, OUTPUT); pinMode(M1B, OUTPUT);
    pinMode(M2A, OUTPUT); pinMode(M2B, OUTPUT);
    pinMode(M3A, OUTPUT); pinMode(M3B, OUTPUT);
    pinMode(M4A, OUTPUT); pinMode(M4B, OUTPUT);
    pinMode(M5A, OUTPUT); pinMode(M5B, OUTPUT);
    pinMode(M6A, OUTPUT); pinMode(M6B, OUTPUT);
    // Motor PWM pins
    pinMode(PWM1, OUTPUT); pinMode(PWM2, OUTPUT); pinMode(PWM3, OUTPUT);
    pinMode(PWM4, OUTPUT); pinMode(PWM5, OUTPUT); pinMode(PWM6, OUTPUT);
    // Start buttons (pull-up)
    pinMode(_SW1, INPUT_PULLUP);
    pinMode(_SW2, INPUT_PULLUP);

    // ===== TFT 1.8" boot splash (persistent until user code overrides) =====
    tft.begin();
    tft.setRotation(0);                            // portrait 128 x 160
    tft.fillScreen(ST77XX_BLACK);
    // "Lotus" at text size 3 -> 5 chars * 18 = 90 px, x = (128 - 90)/2 = 19
    tft.setTextColor(ST77XX_WHITE);
    tft.setTextSize(3);
    tft.setCursor(19, 40);
    tft.print("Lotus");
    // "MegaBot++" at size 2 -> 9 chars * 12 = 108 px, x = (128 - 108)/2 = 10
    tft.setTextSize(2);
    tft.setCursor(10, 75);
    tft.print("MegaBot++");
    // "2.0" at size 2 -> 3 chars * 12 = 36, x = (128-36)/2 = 46
    tft.setCursor(46, 100);
    tft.print("2.0");

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
