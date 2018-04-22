$(document).ready(function () {
    var reader;
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

    function handleFileSelect(evt) {

        reader = new FileReader();
        reader.onerror = errorHandler;
        reader.onabort = function (e) {
            alert('File read cancelled');
        };
        reader.onload = function (e) {
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
            
             //Patient data
            var patientName = stimuliArray[1][4];
            var patientSex = stimuliArray[1][5];
            var dateOfRecord = stimuliArray[1][7];
            var patientDataElement = document.getElementById('patient-data');
            patientDataElement.innerHTML = "";
            var patientNameElement = document.createElement('div');
            var patientSexElement = document.createElement('div');
            var dateOfRecordElement = document.createElement('div');
            patientNameElement.innerHTML = "Patient Name: " + patientName;
            patientSexElement.innerHTML = "Patient Sex: " + patientSex;
            dateOfRecordElement.innerHTML = "Date of scan: " + dateOfRecord;

            patientDataElement.appendChild(patientNameElement);
            patientDataElement.appendChild(patientSexElement);
            patientDataElement.appendChild(dateOfRecordElement);
            
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
                    arrayFixationPointX.push([parseInt(stimuliArray[i][numberRecordingTimestamp]),refValForPx, initialFixationPoint ]);
                    arrayGazePointX.push([parseInt(stimuliArray[i][numberRecordingTimestamp]),refValForPx, parseInt(stimuliArray[i][numberGazePointX]) ]);
                    arrayGazePointY.push([parseInt(stimuliArray[i][numberRecordingTimestamp]),540, parseInt(stimuliArray[i][numberGazePointY]) ]);
                    initial = false;
                }
            }
            generateChartData(arrayForGraph);
            generateFixedChartData(arrayFixationPointX);
            generateGazePointX(arrayGazePointX);
            generateGazePointY(arrayGazePointY);
        };
        reader.readAsBinaryString(evt.target.files[0]);
    }
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
});







