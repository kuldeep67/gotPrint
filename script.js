
const max=5,min=3;
var canvasRefrenceObj={id:null, shape:''};
var canvasObj, canvasCount, select;
var enableShapeCreation = false;
var newOption;


document.getElementById('generateShapes').disabled = true;
	canvasCount = Math.floor(Math.random() * (max - min + 1) + min);
  select = document.getElementById('canvasIds');

  for (var i=0; i<canvasCount; i++) {
        newOption = document.createElement("option");
        newOption.value = i;
        newOption.text='c'+i;
        select.appendChild(newOption);
  }

function generateCanvas(){
    canvasObj = [];
      var div='', canvas = null;

      div = document.createElement('div');
      div.className = 'container';
      document.body.appendChild(div);
    	for(var i=0; i < canvasCount; i++)
      	{
          canvas = new Canvas('c'+i);
          div.appendChild(canvas)
          canvasObj[i] = new fabric.Canvas('c'+i, { selection: false });
        }
        document.getElementById('generateCanvas').disabled =true;
        enableShapeCreation = true;
        toggleShapeGeneration();
}

function setCanvasId(){
	canvasRefrenceObj.id = document.getElementById('canvasIds').value;
    toggleShapeGeneration();
}

function setCanvasShape(){
	canvasRefrenceObj.shape = document.getElementById('canvasShape').value;
	toggleShapeGeneration();
}

function createShapes(shape, canvas, id){
  switch(shape){
  	case 'rect': createRect();
    							break;
   case 'triangle': createTriangle();
    							break;
   case 'circle': createCircle();
    							break;
   default: return -1;
  }

    function createRect(){
    	  var rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 20,
        height: 20
      });

      canvas.add(rect);
    }

      function createTriangle(){
    	  var triangle = new fabric.Triangle({
        width: 20,
        height: 30,
        fill: 'red',
        left: 50,
        top: 50
      });
      canvas.add(triangle);
    }

      function createCircle(){
    	  var circle = new fabric.Circle({
        radius: 20,
        fill: 'red',
        left: 150,
        top: 100
      });
      canvas.add(circle);
    }
}

function toggleShapeGeneration(){
	if(canvasRefrenceObj.id !== null && canvasRefrenceObj.shape !== '' && enableShapeCreation){
  	document.getElementById('generateShapes').disabled = false;
    }
    else{
      document.getElementById('generateShapes').disabled = true;
    }
}

function Canvas(id) {
  this.canvas = document.createElement('canvas');
  this.canvas.id = id;
  return this.canvas;
}