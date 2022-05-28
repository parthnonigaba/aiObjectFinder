status = "";

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();

    video = createCapture(480,380);
    video.hide();
}

function start(){
    objectDetection = ml5.objectDetection('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model loaded!");
    status = true;
}

function draw(){
    image(video,0,0,480,380);
}