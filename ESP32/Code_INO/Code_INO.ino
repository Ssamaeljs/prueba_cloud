#include <WiFi.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>

const char* ssid     = "Internet_UNL";
const char* password = "UNL1859WiFi";

const char* serverUrl1 = "https://computacion.unl.edu.ec/uv/api/dispositivo";
const char* serverUrl2 = "https://computacion.unl.edu.ec/uv/api/guardarMedicion";

#define PIN_UV 36

float latitude = 0.0;
float longitude = 0.0;

void getWiFiLocation() {
  int numNetworks = WiFi.scanNetworks();
  if (numNetworks > 0) {
    latitude = WiFi.RSSI(0);
    longitude = WiFi.channel(0);
    Serial.print("Estimated Latitud: ");
    Serial.println(latitude);
    Serial.print("Estimated Longitud: ");
    Serial.println(longitude);
  } 
}

float medicionuv(){
  float lectura = analogRead(PIN_UV);
  float potValor = 0.0;
  potValor = map(lectura, 0, 4095, 0.0, 1500.0)/100.0;
  Serial.println(potValor);
  return potValor;
}

void loop() {
  HTTPClient http;
  http.begin(serverUrl2);
  http.addHeader("Content-Type", "application/json");
  http.addHeader("x-api-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOiJESVNQT1NJVElWTyIsImlhdCI6MTcwNjcyNzY2OX0.ty5e4gYdhYi3R-5Ppkz1GJP40QMD3VLLoSPSsn3Ptpo"); //Ingresar el token que se genera en el link https://computacion.unl.edu.ec/uv/api/tokenDispositivo

  Serial.println(WiFi.localIP().toString());
 
  StaticJsonDocument<100> doc; 
  doc["identificador"] = 2;                            //Se modifica el identificador en función de la zona asignada
  doc["uv"] = medicionuv();

  String jsonString;
  serializeJson(doc, jsonString);
  int httpResponseCode = http.POST(jsonString);
  if (httpResponseCode > 0) {
    Serial.print("Solicitud POST exitosa, código de respuesta: ");
    Serial.println(httpResponseCode);
    String response = http.getString();
    Serial.println("Respuesta del servidor: " + response);
  } else {
    Serial.print("Error en la solicitud POST, código de error: ");
    Serial.println(httpResponseCode);
  }
  http.end();
  delay(10000);
  //delay(600000);
}

void setup() {
  Serial.begin(9600);

  Serial.println("Conectando a WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando...");
  }
  Serial.println("Conectado a la red WiFi");

  HTTPClient http;
  http.begin(serverUrl1);
  http.addHeader("Content-Type", "application/json");
  http.addHeader("x-api-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOiJESVNQT1NJVElWTyIsImlhdCI6MTcwNjcyNzY2OX0.ty5e4gYdhYi3R-5Ppkz1GJP40QMD3VLLoSPSsn3Ptpo"); //Ingresar el token que se genera en el link https://computacion.unl.edu.ec/uv/api/tokenDispositivo

  Serial.println(WiFi.localIP().toString());
 
  StaticJsonDocument<100> doc; 
  doc["ip"] = WiFi.localIP().toString();
  doc["identificador"] = 2;                             //Se modifica el identificador en función de la zona asignada
  doc["nombre"] = "Area de Contabilidad";               //Nombre de la zona asiganada
  doc["latitud"] = -4.037117820395038;                  //Latitud        Se debe editar si se dispone de modulo gps para optenerlas de ahí
  doc["longitud"] = -79.20424311428734;                 //Longitud

  String jsonString;
  serializeJson(doc, jsonString);
  int httpResponseCode = http.POST(jsonString);
  if (httpResponseCode > 0) {
    Serial.print("Solicitud POST exitosa, código de respuesta: ");
    Serial.println(httpResponseCode);
    String response = http.getString();
    Serial.println("Respuesta del servidor: " + response);
  } else {
    Serial.print("Error en la solicitud POST, código de error: ");
    Serial.println(httpResponseCode);
  }

  http.end();
}