#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <OneWire.h>  
#include <DallasTemperature.h>
#include <ESP8266WiFi.h>  

#define SERVER_IP "192.168.1.102:9090"
 
#define pino_sinal_analogico A0

const int oneWireBus = 4;
const char* ssid     = "eduroam";        
const char* password = "050320188";  

const int sensor3 = 3;
const int sensor2 = 2;
const int sensor4 = 4;
float id_2;

// execução das biblitecas
OneWire oneWire(oneWireBus);
DallasTemperature sensors(&oneWire); 


void setup(){
    Serial.begin(115200);         // Start the Serial communication to send messages to the computer
  delay(100);
  Serial.println('\n');
  
  WiFi.begin(ssid, password);             // Connect to the network
  Serial.print("Connecting to ");
  Serial.print(ssid); Serial.println(" ...");

  int i = 0;
  while (WiFi.status() != WL_CONNECTED) { 
    delay(1000);
    Serial.print(++i); Serial.print(' ');
  }

  Serial.println('\n');
  Serial.println("Connection established!");  
  Serial.print("IP address:\t");
  Serial.println(WiFi.localIP());
  sensor.begin();
}

void loop (void) {

   // capta dados sensor temperatura
   sensors.requestTemperatures();   
   float id_4 = sensors.getTempCByIndex(0);
  
   // capta dados sensor umidade
   id_2 = analogRead(pino_sinal_analogico);

    String json4;
    String json2;
    String json3;
    
    StaticJsonDocument<200> doc4;  // sensor umidade
    doc4["id"] = sensor4;
    doc4["dados"]["valor"] = id_4;
    serializeJsonPretty(doc4, json4);

    StaticJsonDocument<200> doc2;  // sensor umidade
    doc2["id"] = sensor2;
    doc2["dados"]["valor"] = id_2;
    serializeJsonPretty(doc2, json2);
    
 if ((WiFi.status() == WL_CONNECTED)) {

    WiFiClient client;
    HTTPClient http;

    Serial.print("[HTTP] begin...\n");
    // configure traged server and url
    http.begin(client, "http://" SERVER_IP "/api/insert");  // HTTP
    http.addHeader("Content-Type", "application/json");

    Serial.print("[HTTP] POST...\n");
    // start connection and send HTTP header and body

    int httpCode2 = http.POST(json2);

    // httpCode will be negative on error
    if (httpCode2 > 0) {
      // HTTP header has been send and Server response header has been handled
      Serial.printf("[HTTP] POST... code: %d\n", httpCode2);

      // file found at server
      if (httpCode2 == HTTP_CODE_OK) {
        const String& payload = http.getString();
        Serial.println("received payload:\n<<");
        Serial.println(payload);
        Serial.println(">>");
      }
    } else {
      Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode2).c_str());
    }

    http.end();
 }

  if ((WiFi.status() == WL_CONNECTED)) {

    WiFiClient client;
    HTTPClient http;

    Serial.print("[HTTP] begin2...\n");
    // configure traged server and url
    http.begin(client, "http://" SERVER_IP "/api/insert");  // HTTP
    http.addHeader("Content-Type", "application/json");

    Serial.print("[HTTP] POST...\n");
    // start connection and send HTTP header and body

    int httpCode4 = http.POST(json4);

    // httpCode will be negative on error
    if (httpCode4 > 0) {
      // HTTP header has been send and Server response header has been handled
      Serial.printf("[HTTP] POST... code: %d\n", httpCode4);

      // file found at server
      if (httpCode4 == HTTP_CODE_OK) {
        const String& payload = http.getString();
        Serial.println("received payload:\n<<");
        Serial.println(payload);
        Serial.println(">>");
      }
    } else {
      Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode4).c_str());
    }

    http.end();
 }
  delay(10000);
}
