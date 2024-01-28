import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
const BarraVoz = (props) => {
  const { dispositivos, setSelectedUVData } = props;

  const data = dispositivos.map((dispositivo) => {
    let uv = 0;
    let fecha;
    dispositivo.medicion.map((medicion) => {
      fecha = medicion.fecha;
      uv = medicion.uv;
    });
    return {
      geometry: [dispositivo.latitud, dispositivo.longitud],
      name: dispositivo.identificador,
      uv: uv,
      fecha: fecha,
    };
  });

  const [texto, setTexto] = useState("");
  const commands = [
    {
      command: "Hola *",
      callback: (device) => {
        setTexto(`Hola ${device}`);
      },
      command: "Buscame los dispositivos con UV mayor a * .",
      callback: (uv) => {
        setTexto(`Dispositivos con UV mayor a ${uv}`);
      },
    },
  ];

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands: commands });
  const startListening = () => {
    resetTranscript();
    setTexto();
    SpeechRecognition.startListening({ language: "es-EC", continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    console.log(transcript);
  };
  return (
    <div className="input-group mb-3">
      <input
        style={{
          borderRadius: "5px",
          background: "rgba(255, 255, 255, 0)",
          width: "80%",
          height: "30px",
          color: "white",
          border: "1px solid white",
        }}
        type="search"
        className="me-2"
        placeholder={"Buscar Dispositivo por Voz"}
      ></input>
      <button
        className="btn btn-outline-primary"
        onMouseDown={startListening}
        onMouseUp={stopListening}
        onTouchStart={startListening}
        onTouchEnd={stopListening}
        onTouchCancel={stopListening}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-mic-mute"
          viewBox="0 0 16 16"
        >
          <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4 4 0 0 0 12 8V7a.5.5 0 0 1 1 0zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a5 5 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4m3-9v4.879l-1-1V3a2 2 0 0 0-3.997-.118l-.845-.845A3.001 3.001 0 0 1 11 3" />
          <path d="m9.486 10.607-.748-.748A2 2 0 0 1 6 8v-.878l-1-1V8a3 3 0 0 0 4.486 2.607m-7.84-9.253 12 12 .708-.708-12-12z" />
        </svg>
      </button>
    </div>
  );
};

export default BarraVoz;