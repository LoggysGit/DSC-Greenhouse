#include <databot2.h>

#define DATA_TRANSMIT_DELAY 1000

//Adafruit_NeoPixel RGBled = Adafruit_NeoPixel(3, LED_PIN, NEO_GRB + NEO_KHZ800); // RGB Led (Doesn't use in code)

// SENSORS
SGP30 airSensor;
SHTC3 humidSensor;
SparkFun_APDS9960 lightSensor = SparkFun_APDS9960();
OneWire oneWire(4); DallasTemperature tempSensor(&oneWire);

void setup(){
  Serial.begin(115200);
  Wire.begin();
  Wire.setClock(400000);

  //Serial.println("POWER ON");

  tempSensor.begin();

  // === CO2/VOC INIT ===
  if (airSensor.begin() == false) {
    Serial.println("400 No SGP30 Detected. CO2 Error");
    while (1);
  }
  airSensor.initAirQuality();

  // === ILLUMINANCE/COLOR INIT ===
  if (!lightSensor.init()) {
    Serial.println("Something went wrong during APDS-9960 init!");
  }
  if (!lightSensor.enableLightSensor(true)) {
    Serial.println("Something went wrong during light sensor init!");
  }//*/

  // === HUMIDITY INIT ===
  humidSensor.begin();
  humidSensor.setMode(SHTC3_CMD_CSE_RHF_LPM);
  humidSensor.sleep(true);

  // === SOUND INIT ===
  if (!initMIC())
  {
    Serial.println("MIC initialization fail");
  }

  delay(100);
  Serial.println(esp_reset_reason());
}

float getCO2()   { return(airSensor.CO2);}
float getHumid() {
    if (humidSensor.update() != SHTC3_Status_Nominal) {
        Serial.println("Humid read failed");
        return -1;
    }
    return humidSensor.toPercent();
}
float getNoise() {
    float n = getLoudness();
    if (isnan(n)) return 0;
    return n;
}
float getTemp()  { return(getExternalTemperature(tempSensor)); }
float getLight() { uint16_t light; lightSensor.readAmbientLight(light); return(light); }
float getVOC()   { return(airSensor.TVOC); }
String getHexCol(){/*
  uint16_t RL, GL, BL;
  lightSensor.readRedLight(RL);
  lightSensor.readGreenLight(GL);
  lightSensor.readBlueLight(BL);
  
  String color = "#";
  color += String(RL, HEX);
  color += String(GL, HEX);
  color += String(BL, HEX);

  return(color);//*/
  return("#");
}

String serializeData(){
  //Serial.println(" > serializing started");

  // Избегаем varargs UB: приводим всё к подходящему типу и используем .c_str() для строк
  airSensor.measureAirQuality();

  //Serial.println(" > air sensor measured");

  char data_buffer[256];

  float temp = getTemp();
  //Serial.println(" > temperature");

  int light = (int)getLight();
  //Serial.println(" > light");

  String col = getHexCol();
  //Serial.println(" > color");

  float humid = getHumid();
  //Serial.println(" > humid");

  float sound = getNoise();
  //Serial.println(" > noise");

  float voc = getVOC();
  //Serial.println(" > voc");

  float co2 = getCO2();
  //Serial.println(" > co2");

  snprintf(
    data_buffer,
    sizeof(data_buffer),
    "{\"temp\": %.2f, \"light\": %d, \"col\": \"%s\", \"humid\": %.2f, \"sound\": %.2f, \"voc\": %.2f, \"co2\": %.2f}",
    temp,
    light,
    col.c_str(),
    humid,
    sound,
    voc,
    co2
  );
  //Serial.println(" > serialized");

  return String(data_buffer);
}

void loop(){
  //Serial.println("-LOOP-");
  delay(10);
  Serial.println(serializeData());
  delay(DATA_TRANSMIT_DELAY / portTICK_PERIOD_MS);
}