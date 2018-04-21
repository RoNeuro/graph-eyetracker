$(document).ready(function () {
    var reader;
    var progress = document.querySelector('.percent');
    function abortRead() {
        reader.abort();
    }

    function errorHandler(evt) {
        switch (evt.target.error.code) {
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
        }
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
        reader.onabort = function (e) {
            alert('File read cancelled');
        };
        reader.onloadstart = function (e) {
            document.getElementById('progress_bar').className = 'loading';
        };
        reader.onload = function (e) {
            // Ensure that the progress bar displays 100% at the end.
            progress.style.width = '100%';
            progress.textContent = '100%';
            setTimeout("document.getElementById('progress_bar').className='';", 2000);
            var text = reader.result;
            stimuliArray = text.split('\n').map(function (ln) {
                return ln.split('\t');
            });
            var ref = {
                '18': 1780,
                '-18': 150,
                '10': 1360,
                '-10': 550,
                '0': 960
            };
            console.log(stimuliArray);

            for (var i = 0; i < stimuliArray[0].length; i++) {
                if (stimuliArray[0][i] === "MediaName") {
                    var numberMediaName = i;
                } else if (stimuliArray[0][i] === "RecordingTimestamp") {
                    var numberRecordingTimestamp = i;
                } else if (stimuliArray[0][i] === "FixationPointX (MCSpx)") {
                    var numberFixationPointX = i;
                } else if (stimuliArray[0][i] === "SaccadicAmplitude") {
                    var numberSaccadicAmplitude = i;
                } else if (stimuliArray[0][i] === "ValidityLeft") {
                    var numberValidityLeft = i;
                } else if (stimuliArray[0][i] === "ValidityRight") {
                    var numberValidityRight = i;
                } else if (stimuliArray[0][i] === "GazePointX (MCSpx)") {
                    var numberGazePointX = i;
                } else if (stimuliArray[0][i] === "GazePointY (MCSpx)") {
                    var numberGazePointY = i;
                }
            }
            console.log(numberMediaName, numberRecordingTimestamp, numberFixationPointX, numberSaccadicAmplitude, numberValidityLeft, numberValidityRight);

            var arrayForGraph = [];
            var arrayFixationPointX = [];
            var arrayGazePointX = [];
            var arrayGazePointY = [];
            var initialMediaName = 0;
            var initialFixationPoint = 0;
            var initialSaccadicAmplitude = 0.0;
            var numberFromMediaName;
            var refValForPx = 0;
            var initial = true;
            for (var i = 0; i < stimuliArray.length; i++) {

                if (stimuliArray[i][numberMediaName] !== "" && stimuliArray[i][numberMediaName] !== undefined && ((stimuliArray[i][numberValidityLeft] == 0 && stimuliArray[i][numberValidityRight] == 0) || (stimuliArray[i][numberValidityLeft] == 4 && stimuliArray[i][numberValidityRight] == 4))) {
                    //Media Name Number
                    if (stimuliArray[i][numberMediaName] === "black.bmp") {
                        numberFromMediaName = initialMediaName;
                    } else if (stimuliArray[i][numberMediaName] === "O.bmp") {
                        numberFromMediaName = 0;
                        initialMediaName = numberFromMediaName;
                        refValForPx = ref['0'];
                    } else {
                        numberFromMediaName = parseInt(stimuliArray[i][numberMediaName].replace(/[^0-9+-]/g, ""));
                        initialMediaName = numberFromMediaName;
                        refValForPx = ref[numberFromMediaName + ""];
                    }
                    //Saccadic Amplitude Number
                    var floatSaccadicAmplitude = parseFloat(stimuliArray[i][numberSaccadicAmplitude].replace(",", "."));
                    if (initial) {
                        floatSaccadicAmplitude = 0;
                        initialFixationPoint = parseInt(stimuliArray[i][numberFixationPointX]);
                    }
                    if (parseInt(stimuliArray[i][numberFixationPointX]) < initialFixationPoint) {
                        initialSaccadicAmplitude -= floatSaccadicAmplitude;
                        initialSaccadicAmplitude = parseFloat(initialSaccadicAmplitude.toFixed(2))
                        initialFixationPoint = parseInt(stimuliArray[i][numberFixationPointX]);
                    } else if (parseInt(stimuliArray[i][numberFixationPointX]) > initialFixationPoint) {
                        initialSaccadicAmplitude += floatSaccadicAmplitude;
                        initialSaccadicAmplitude = parseFloat(initialSaccadicAmplitude.toFixed(2))
                        initialFixationPoint = parseInt(stimuliArray[i][numberFixationPointX]);
                    }

                    arrayForGraph.push([parseInt(stimuliArray[i][numberRecordingTimestamp]), numberFromMediaName, initialSaccadicAmplitude]);
                    arrayFixationPointX.push([parseInt(stimuliArray[i][numberRecordingTimestamp]), initialFixationPoint, refValForPx]);
                    arrayGazePointX.push([parseInt(stimuliArray[i][numberRecordingTimestamp]), parseInt(stimuliArray[i][numberGazePointX]), refValForPx]);
                    arrayGazePointY.push([parseInt(stimuliArray[i][numberRecordingTimestamp]), parseInt(stimuliArray[i][numberGazePointX]), 540]);
                    initial = false;
                }
            }
            generateChartData(arrayForGraph);
        };
        reader.readAsBinaryString(evt.target.files[0]);
    }
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
});







