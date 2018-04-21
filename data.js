$(document).ready(function(){ 
	var reader;
  var progress = document.querySelector('.percent');

  function abortRead() {
    reader.abort();
  }

  function errorHandler(evt) {
    switch(evt.target.error.code) {
      case evt.target.error.NOT_FOUND_ERR:
        alert('File Not Found!');
        break;
      case evt.target.error.NOT_READABLE_ERR:
        alert('File is not readable');
        break;
      case evt.target.error.ABORT_ERR:
        break; // noop
      default:
        alert('An error occurred reading this file.');
    };
  }

  function updateProgress(evt) {
    // evt is an ProgressEvent.
    if (evt.lengthComputable) {
      var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
      // Increase the progress bar length.
      if (percentLoaded < 100) {
        progress.style.width = percentLoaded + '%';
        progress.textContent = percentLoaded + '%';
      }
    }
  }

  function handleFileSelect(evt) {
    // Reset progress indicator on new file selection.
    progress.style.width = '0%';
    progress.textContent = '0%';

    reader = new FileReader();
    reader.onerror = errorHandler;
    reader.onprogress = updateProgress;
    reader.onabort = function(e) {
      alert('File read cancelled');
    };
    reader.onloadstart = function(e) {
      document.getElementById('progress_bar').className = 'loading';
    };
    reader.onload = function(e) {
      // Ensure that the progress bar displays 100% at the end.
      progress.style.width = '100%';
      progress.textContent = '100%';
      setTimeout("document.getElementById('progress_bar').className='';", 2000);
      var text = reader.result;
//       console.log(text);
       stimuliArray = text.split('\n').map(function(ln){
//       console.log(ln); 
      return ln.split('\t');
    });
     
    console.log(stimuliArray);
      
 for (var i= 0; i < stimuliArray[0].length; i++){
      if (stimuliArray[0][i] === "MediaName"){
        var numberMediaName = i;
      }else if (stimuliArray[0][i] === "RecordingTimestamp"){
        var numberRecordingTimestamp = i;
      }else if (stimuliArray[0][i] === "FixationPointX (MCSpx)"){
        var numberFixationPointX = i;  
      }else if (stimuliArray[0][i] === "SaccadicAmplitude"){
        var numberSaccadicAmplitude = i;
      }else if (stimuliArray[0][i] === "ValidityLeft"){
        var numberValidityLeft = i;
      }else if (stimuliArray[0][i] === "ValidityRight"){
        var numberValidityRight = i;
      } 
    } 
    console.log(numberMediaName, numberRecordingTimestamp, numberFixationPointX, numberSaccadicAmplitude, numberValidityLeft, numberValidityRight);
      
    var arrayForGraph = [];
    var initialMediaName = 0;
    var initialFixationPoint = 0;
    var initialSaccadicAmplitude = 0.0;
var numberFromMediaName;
    for (var i=0; i < stimuliArray.length; i++){
      if (stimuliArray[i][numberMediaName] !== "" && stimuliArray[i][numberMediaName] !== undefined && ((stimuliArray[i][numberValidityLeft] == 0 && stimuliArray[i][numberValidityRight] == 0) || (stimuliArray[i][numberValidityLeft] == 4 && stimuliArray[i][numberValidityRight] == 4))){
        //Media Name Number
        if (stimuliArray[i][numberMediaName] === "black.bmp") {
          numberFromMediaName = initialMediaName;
        } else if (stimuliArray[i][numberMediaName] === "O.bmp") {
          numberFromMediaName = 0;
          initialMediaName = numberFromMediaName;
        } else {
          numberFromMediaName = parseInt(stimuliArray[i][numberMediaName].replace(/[^0-9+-]/g,""));
          initialMediaName = numberFromMediaName;
        }
        //Saccadic Amplitude Number
        var floatSaccadicAmplitude = parseFloat(stimuliArray[i][numberSaccadicAmplitude].replace(",","."));
        if (parseInt(stimuliArray[i][numberFixationPointX]) < initialFixationPoint) {
          initialSaccadicAmplitude -= floatSaccadicAmplitude;
          initialSaccadicAmplitude=parseFloat(initialSaccadicAmplitude.toFixed(2))
          initialFixationPoint = stimuliArray[i][numberFixationPointX];
        } else if (parseInt(stimuliArray[i][numberFixationPointX]) > initialFixationPoint) {
          initialSaccadicAmplitude += floatSaccadicAmplitude;
          initialSaccadicAmplitude=parseFloat(initialSaccadicAmplitude.toFixed(2))
          initialFixationPoint = stimuliArray[i][numberFixationPointX];
        }
        
        arrayForGraph.push([parseInt(stimuliArray[i][numberRecordingTimestamp]), numberFromMediaName, initialSaccadicAmplitude]);
      }      
    }
    console.log(arrayForGraph);
generateChartData(arrayForGraph);
//create chart! 

	
	
    }
    reader.readAsBinaryString(evt.target.files[0]);
  }
  
    
  document.getElementById('files').addEventListener('change', handleFileSelect, false);
});




