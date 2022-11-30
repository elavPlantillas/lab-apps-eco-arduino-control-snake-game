const NGROK = `http://${window.location.hostname}:5050`;
let socket = io(NGROK, { path: "/real-time" });

let video;
let imgArray = [];
let currentImage = 0;

function preload() {
  imgArray[0] = loadImage("files/2001.png");
  imgArray[1] = loadImage("files/2002.png");
  imgArray[2] = loadImage("files/2003.png");
  imgArray[3] = loadImage("files/2004.png");
  imgArray[4] = loadImage("files/2005.png");
  imgArray[5] = loadImage("files/2006.png");
  imgArray[6] = loadImage("files/2007.png");
  imgArray[7] = loadImage("files/2008.png");
  imgArray[8] = loadImage("files/2009.png");
  imgArray[9] = loadImage("files/2010.png");
  imgArray[10] = loadImage("files/2011.png");
  imgArray[11] = loadImage("files/2012.png");
  imgArray[12] = loadImage("files/2013.png");
  imgArray[13] = loadImage("files/2014.png");
  imgArray[14] = loadImage("files/2015.png");
  imgArray[15] = loadImage("files/2016.png");
  imgArray[16] = loadImage("files/2017.png");
  imgArray[17] = loadImage("files/2018.png");
  imgArray[18] = loadImage("files/2019.png");
  imgArray[19] = loadImage("files/2020.png");
  imgArray[20] = loadImage("files/2021.png");
}
function nextImage() {
  for (let i = 0; i < imgArray.length; i++) {
    if (imgArray[i] == currentImage) {
      image(imgArray[i], 0, 0);
    }
  }
}
function previousImage() {
  let img = imgArray[0];
  for (let i = 0; i < imgArray.length; i--) {
    if (i == imgArray.length) {
      image(imgArray[i], 0, 0);
    }
  }
}
function setup() {
  createCanvas(windowWidth, windowHeight);
 
}

function draw() {
  background(0, 0, 0);
  image(imgArray[currentImage], 0, 0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/*____________________
Socket event to listen when an arduino message is comming */
socket.on("arduinoMessage", (arduinoMessage) => {
  console.log("arduinoMessage: ");
  console.log(arduinoMessage);
});

socket.on("nextImage", () => {
  // console.log(display);
  if (currentImage < imgArray.length - 1) {
    currentImage++;
  }
});
socket.on("test", (a) => {
  const fixedValue = Math.round(map(a.potenValue, 0, 1023, 0, 20));
  console.log("TESTING", a, fixedValue);
  currentImage = fixedValue;
});

socket.on("prevImage", () => {
  if (currentImage > 0) {
    currentImage--;
  }
});