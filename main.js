
status=""
objects=[];
function preload(){
    
}

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380)
    video.hide()
}

function draw(){
    image(video,0,0,480,380)
    if(status != ""){
        objectDetector.detect(video,gotresult)
        for(i=0; i<objects.length;i++){
            document.getElementById("status").innerHTML="status:objects detected";
            document.getElementById("number_of_objects").innerHTML="number of objects detected are- "+objects.length;
            fill("#2c24bf");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill()
            stroke("#11f5f1");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)

        }
    } 
}

function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded)
    document.getElementById("status").innerHTML="status:detecting objects"
}

function modelLoaded(){
    console.log("modelLoaded")
    status=true
    video.volume(1);
    video.speed(1);
    video.loop()
}
function gotresult(error,results){
if(error){
    console.log(error)
}
else{
    console.log(results)
    objects=results

}
}