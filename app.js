
    let rD={},gD={},bD={};

function myDisplay(){
    var rect={

        x:250,
        y:350,
        width:200,
        height:100
    };


    alert("inside myDisplay Function");
    var cvs=document.getElementById("mycanvas");
    var ctx=cvs.getContext("2d");
    
        // ctx.fillRect(rect.x,rect.y,rect.width,rect.height);
   
    // cvs.addEventListener('click',function(evt){
    //     var mousePos=getMousePos(cvs,evt);
    //     console.log(mousePos);
    //     console.log(isInside(mousePos,rect));
    //     if(isInside(mousePos,rect)){
    //         alert("clicked inside rect");
            
    //     }else{
    //         alert("clicked Outside");
    //     }
    // });
}
// function isInside(mouse_pos,rect){
//     return ((mouse_pos.x>rect.x)&&(mouse_pos.x<rect.x+rect.width)&&(mouse_pos.y<rect.y+rect.height)&&(mouse_pos.y>rect.y))
// }

// function getMousePos(canvas,event){
//     var rect= canvas.getBoundingClientRect();
//     console.log(rect.left+"   "+rect.top)
//     return{
//         x:event.clientX,
//         y: event.clientY
//     }

// }
function inIt(){
    console.log("init");
    document.getElementById("myInput").addEventListener('change',handFiles);
    myDisplay();
}
function handFiles(){
    var theGoods = document.getElementById('myInput').files[0];
    var cv = document.getElementById("mycanvas");
    var img= new Image();
    var reader= new FileReader();
    reader.addEventListener("load",function(){
alert("reader");        

        img.src=reader.result;
        
    });
    img.onload=function(){
      
    // 
    // calcAndGraph(img);
    fitImageOn(cv,img);
    }
    if(theGoods){reader.readAsDataURL(theGoods);}
};
// function calcAndGraph(img){
//     let rD={},gD={},bD={};

//     var cv=document.getElementById("mycanvas");
//     var ctx=cv.getContext("2d");
//     console.log(cv.width+"   "+ cv.height);
  
//     ctx.drawImage(img,0,0,img.width,img.height);
//     const iD=ctx.getImageData(0,0,cv.width,cv.height).data
//     console.log(iD);
//     for(var i=0;i<256;i++){rD[i]=0;gD[i]=0;bD[i]=0};

//     for(var i=0;i<iD.length;i+=4)
//     {
//         rD[iD[i]]++;
//         gD[iD[i+1]]++;
//         bD[iD[i+2]]++;
//     }
//     console.log(rD);

//      histogram(rD,gD,bD,img);

// }
let activeColor='red';
let yAxis=false;










function histogram(r,g,b,img)
{
var div=50;
var y_axis=1000;
let cv=document.getElementById("mycanvas2");
cv.height=1000;
cv.width=700;

let ctx=cv.getContext("2d");
ctx.clearRect(0,0,1000,1000);
for(var i=0;i<256;i++)
{
ctx.beginPath();
ctx.moveTo((i),y_axis-r[i]/div);
ctx.lineTo((i),y_axis);
ctx.strokeStyle="rgb("+i+",0,0)";
ctx.stroke();
ctx.beginPath();
ctx.moveTo((i+256),y_axis-g[i]/ div);
ctx.lineTo((i+256),y_axis);
ctx.strokeStyle="rgb(0,"+i+",0)";
ctx.stroke();
ctx.beginPath();
ctx.moveTo((i+512),y_axis-b[i]/div);
ctx.lineTo((i+512),y_axis);
ctx.strokeStyle="rgb(0,0,"+i+")";
ctx.stroke();
}
}




inIt();


var fitImageOn = function(canvas, imageObj) {

    var context = canvas.getContext('2d');
	var imageAspectRatio = imageObj.width / imageObj.height;
	var canvasAspectRatio = canvas.width / canvas.height;
	var renderableHeight, renderableWidth, xStart, yStart;

	// If image's aspect ratio is less than canvas's we fit on height
	// and place the image centrally along width
	if(imageAspectRatio < canvasAspectRatio) {
		renderableHeight = canvas.height;
		renderableWidth = imageObj.width * (renderableHeight / imageObj.height);
		xStart = (canvas.width - renderableWidth) / 2;
		yStart = 0;
	}

	// If image's aspect ratio is greater than canvas's we fit on width
	// and place the image centrally along height
	else if(imageAspectRatio > canvasAspectRatio) {
		renderableWidth = canvas.width
		renderableHeight = imageObj.height * (renderableWidth / imageObj.width);
		xStart = 0;
		yStart = (canvas.height - renderableHeight) / 2;
	}

	// Happy path - keep aspect ratio
	else {
		renderableHeight = canvas.height;
		renderableWidth = canvas.width;
		xStart = 0;
		yStart = 0;
	}
    context.drawImage(imageObj, xStart, yStart, renderableWidth, renderableHeight);
    
    const iD=context.getImageData(0,0,canvas.width,canvas.height).data
    console.log(iD);
    for(var i=0;i<256;i++){rD[i]=0;gD[i]=0;bD[i]=0};

    for(var i=0;i<iD.length;i+=4)
    {
        rD[iD[i]]++;
        gD[iD[i+1]]++;
        bD[iD[i+2]]++;
    }
    console.log(rD);

     histogram(rD,gD,bD,imageObj);

};




























document.getElementById("btnClear").addEventListener("click",()=>{
    var cv =document.getElementById('mycanvas');
    var ctx=cv.getContext('2d');
    ctx.clearRect(0,0,cv.width,cv.height);
})