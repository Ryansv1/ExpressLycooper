#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <OneWire.h>  
#include <DallasTemperature.h>
#include <ESP8266WiFi.h>  

#define dados 2 
#define pino_sinal_analogico A0

const char* ssid     = "SSID";        
const char* password = "PASSWORD";  

const int sensor3 = 3;
const int sensor2 = 2;
const int sensor4 = 4;
float id_2;

// execução das biblitecas
OneWire oneWire(dados);
DallasTemperature sensors(&oneWire); 


void connectWifi();

void setup(void) { 
    Serial.begin(9600);
    connectWifi();
} 

void loop (void) {

   // capta dados sensor temperatura
   sensors.requestTemperatures();   
   float id_4 = sensors.getTempCByIndex(0);

   // capta dados sensor umidade
   id_2 = analogRead(pino_sinal_analogico);
   
   // capta dados sensor pH (falta colocar)

   // começa request post na url do sistema
    Serial.println("posting...");
    String url = "localhost:9090/api/insert";
    HTTPClient http;
    String response;
    
    StaticJsonDocument<200> doc;  // sensor temperatura
    String jsonParams;
    doc["id"] = sensor2;
    doc["dados"]["valor"] = id_2;
    serializeJsonPretty(doc, jsonParams);

    StaticJsonDocument<200> doc2;  // sensor umidade
    doc2["id"] = sensor4;
    doc2["dados"]["valor"] = id_4;
    serializeJsonPretty(doc2, jsonParams);

    StaticJsonDocument<200> doc3;  // sensor pH
    doc3["id"] = sensor3;
    // doc3["dados"]["valor"] = id_3;
    serializeJsonPretty(doc3, jsonParams);

    http.begin(url);
    http.addHeader("Content-Type", "application/json");
    http.POST(jsonParams);
    response = http.getString();
    Serial.println(response);
    
   delay(10000); // 10s de cada request

}


void connectWifi(){
  Serial.begin(115200);         // Start the Serial communication to send messages to the computer
  delay(10);
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
}
