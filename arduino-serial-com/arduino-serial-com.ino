/*
Peripherals:
 - Potentiometer
 - Push-button switch
 - Buzzer
*/

const int POTEN_PIN = A5;
const int BTN_A_PIN = 2;
const int BTN_B_PIN = 3;
const int PIEZO_BUZZ_PIN = 6;

bool btnAState = false;
bool isAPressed = false;

bool btnBState = false;
bool isBPressed = false;

int potentiometerValue = 0;
int previousPotenValue = potentiometerValue;


void setup() {
  pinMode(POTEN_PIN, INPUT);
  pinMode(BTN_A_PIN, INPUT);
  pinMode(BTN_B_PIN, INPUT);
  pinMode(PIEZO_BUZZ_PIN, OUTPUT);

  Serial.begin(9600);
}

void loop() {

  if (Serial.available() > 0) {
    receivingData();
  } else {
    sendingData();
  }
  delay(10);
}

void sendingData() {

  potentiometerValue = analogRead(POTEN_PIN);
  btnAState = digitalRead(BTN_A_PIN);
  btnBState = digitalRead(BTN_B_PIN);

  if (previousPotenValue != potentiometerValue) {
    sendSerialMessage('O', 'O', potentiometerValue);
    previousPotenValue = potentiometerValue;
  }

  if (btnAState && !isAPressed && !btnBState) {
    sendSerialMessage('W', '0', potentiometerValue);
    isAPressed = true;
  } else if (!btnAState && isAPressed) {
    isAPressed = false;
  }

  if (btnBState && !isBPressed && !btnAState) {
    sendSerialMessage('O', 'S', potentiometerValue);
    isBPressed = true;
  } else if (!btnBState && isBPressed) {
    isBPressed = false;
  }

  delay(100);
}

void receivingData() {

  char inByte = Serial.read();

  switch (inByte) {
    case 'P':
      tone(PIEZO_BUZZ_PIN, 500);
      delay(100);
      tone(PIEZO_BUZZ_PIN, 1500);
      delay(500);
      noTone(PIEZO_BUZZ_PIN);
      break;
    case 'N':
      tone(PIEZO_BUZZ_PIN, 300);
      delay(400);
      tone(PIEZO_BUZZ_PIN, 250);
      delay(200);
      noTone(PIEZO_BUZZ_PIN);
      break;
  }
  Serial.flush();
}

void sendSerialMessage(char keyA, char keyB, int potenValue) {
  Serial.print(keyA);
  Serial.print(' ');
  Serial.print(keyB);
  Serial.print(' ');
  Serial.print(potenValue);
  Serial.print(' ');
  Serial.println();
}