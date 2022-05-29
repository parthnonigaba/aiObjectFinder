status = "";
object = [];

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();

    video = createCapture(480,380);
    video.hide();

}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model loaded!");
    status = true;
}

function draw(){
    image(video,0,0,480,380);

    if(status != ""){
        objectDetector.detect(video, gotResult);

        for(i = 0; i< object.length; i++){
            document.getElementById("status").innerHTML = "Status: Detecting Objects";
            document.getElementById("number_of_objects").innerHTML = "The number of detected objects are: "+ object.length;

            fill("#FF0000");
            percent = floor(object[i].confidence * 100);
            noFill();
            stroke("#FF0000");
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);

            if(object[i].label == objectName){
                video.stop();
                objectDetecter.detect(gotResult);
                document.getElementById("status").innerHTML = "Object Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(objectName + "found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("status").innerHTML = "Searching for Object";
            }
        }
    }
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object = results;
    
}