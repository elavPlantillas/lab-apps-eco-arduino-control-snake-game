const express = require("express"); //protocolo http
const { Server } = require("socket.io"); //webscokets

const { SerialPort, ReadlineParser } = require("serialport");
const PORT = 5050; // No cambiar, es el puerto, ngrok y este puerto deben ser iguales
const SERVER_IP = "172.30.181.32"; // Cambiar por la IP del computador
const bodyParser = require("body-parser");
const { response } = require("express");

//⚙️ HTTP COMMUNICATION SETUP _________________
const app = express();
app.use(express.json());
//permite
app.use("/display", express.static("public-display"));
//============================================ END

//⚙️ SERIAL COMMUNICATION SETUP -------------------------------------------------
const protocolConfiguration = {
  // *New: Defining Serial configurations
  path: "/COM3", //*Change this COM# or usbmodem#####
  baudRate: 9600,
};
const port = new SerialPort(protocolConfiguration);
const parser = port.pipe(new ReadlineParser());
//============================================ END

//⚙️ WEBSOCKET COMMUNICATION SETUP -------------------------------------------------
const httpServer = app.listen(PORT, () => {
  console.table({
    "public-display": `http://${SERVER_IP}:${PORT}/display`,
  });
});
const ioServer = new Server(httpServer, { path: "/real-time" });
//============================================ END

// 🔄 SERIAL COMMUNICATION WORKING_______________
let increase = 0;
let potenValue = 0;
let imgs = 0;
let currentPV = 0;
let previousPotenValue = currentPV;
let steps = [];

parser.on("data", (arduinoData) => {
  let dataArray = arduinoData.split(" ");
  let numberData = parseInt(dataArray);

  if (currentPV > numberData) {
    // INCREASE
    const size = Array.from({ length: currentPV - numberData });
    const newArray = size.map((_, i) => {
      return currentPV - i;
    });
    ioServer.emit("test", {
      potenValue: numberData,
    });
   console.log(newArray);
  } else {
    // DECREASE
    const size = Array.from({ length: numberData - currentPV });
    const newArray = size.map((_, i) => {
      return currentPV + i;
    });
    ioServer.emit("test", {
      potenValue: numberData,
    });
    console.log(newArray);
  }
 console.log(increase);
  currentPV = numberData;


  let arduinoMessage = {
    potenValue: numberData,
  };

  if (previousPotenValue < currentPV) {
    imgs += 1;
    previousPotenValue = currentPV;
    // ioServer.emit("nextImage");
    //onsole.log("next", imgs);
  } else if (previousPotenValue > currentPV) {
    imgs -= 1;
    // ioServer.emit("prevImage");
    //console.log("prev", imgs);
  } else {
    console.log("nule");
  }

  //console.log(arduinoMessage);
});

/* 🔄 WEBSOCKET COMMUNICATION ______________
*/
ioServer.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("nextDisplayScreen", (screen) => {
    console.log(screen);
    socket.broadcast.emit("nextDisplayScreen", screen);
  });
  socket.on("orderForArduino", (orderForArduino) => {
    //port.write
    console.log("point: " + orderForArduino);
  });
});