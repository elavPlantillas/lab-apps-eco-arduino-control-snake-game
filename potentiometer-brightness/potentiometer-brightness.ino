#define LedPin_1 1
#define LedPin_2 2
#define LedPin_3 3
#define LedPin_4 4
#define LedPin_5 10
#define LedP_6 11
#define LedPin_7 12

#define potentiometerPin A3

#define AllLeds 7

byte LedPinArray[AllLeds] = {LedPin_1, LedPin_2, LedPin_3, LedPin_4, LedPin_5, LedP_6, LedPin_7};

int potentiometerValue = 0;
int previousPotenValue = potentiometerValue;

void setup() {
  //set up all the leds
  for (int i = 0; i < AllLeds; i++) {
    pinMode(LeDPinArray[i], OUTPUT);
  }

  Serial.begin(9600);

}

void loop() {
  // put your main code here, to run repeatedly:
sendingData();
delay(500);
}

void sendingData(){
 potentiometerValue = analogRead(potentiometerPin);

//send serial message each time that potentiometer value changes
 if (previousPotenValue != potentiometerValue) {
    sendSerialMessage(potentiometerValue);

//map the brightness led when potentiometer change
  for (int i = 0; i < AllLeds; i++) {
  int brightness = map(potentiometerValue, 0, 1023, 0, 255);
  analogWrite(LeDPinArray[i], brightness);
  }
  }
  delay(100);
}
//send serial messsage to the server
void sendSerialMessage(int potenValue){
Serial.print(potenValue);
  Serial.print(' ');
  Serial.println();
}


