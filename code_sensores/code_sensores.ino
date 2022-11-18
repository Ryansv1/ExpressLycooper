#include <ArduinoJson.h>
#include <OneWire.h>  
#include <DallasTemperature.h>

#define dados 2 
#define pino_sinal_analogico A0


const int sensor2 = 2;
const int sensor4 = 4;
float id_2;

// execução das biblitecas
OneWire oneWire(dados);
DallasTemperature sensors(&oneWire); 

void setup(void) { 
 Serial.begin(9600); 
 Serial.println("Demonstração do funcionamento do sistema");
 
 pinMode(pino_sinal_analogico, INPUT); 
 
 sensors.begin(); 
} 


void loop(void) {
   sensors.requestTemperatures();   
   float id_4 = sensors.getTempCByIndex(0);
   id_2 = analogRead(pino_sinal_analogico);

   // começa a construir os JSON's e printar no serial. Posteriormente com o ESP deve ser trocado de "doc, Serial" para "doc, output" para enviar via http e etc.
   
    StaticJsonDocument<200> doc;  // sensor temperatura
    doc["id"] = sensor2;
    doc["dados"]["valor"] = id_2;
    serializeJsonPretty(doc, Serial);
    Serial.println("");
    delay(2000);

    StaticJsonDocument<200> doc2;  // sensor umidade
    doc2["id"] = sensor4;
    doc2["dados"]["valor"] = id_4;
    serializeJsonPretty(doc2, Serial);
    Serial.println("");
    delay(2000);


}
