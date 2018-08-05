var arrayForGraph = [];
var arrayFixationPointX = [];
var arrayGazePointX = [];
var arrayGazePointY = [];


var header = {

};

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
    console.log("in handlefileselect.")
    arrayForGraph = [];
    arrayFixationPointX = [];
    arrayGazePointX = [];
    arrayGazePointY = [];
    scanTypeFromFile = "";

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

        console.log("stimuliArray : ", stimuliArray);
        var tableHeader = makeNumberFromColumnName(stimuliArray[0]);

        console.log(tableHeader.numberMediaName, tableHeader.numberRecordingTimestamp, tableHeader.numberFixationPointX, tableHeader.numberSaccadicAmplitude, tableHeader.numberValidityLeft, tableHeader.numberValidityRight);


        var initialMediaName = 0;
        var initialFixationPoint = 0;
        var initialSaccadicAmplitude = 0.0;
        var numberFromMediaName;
        var refValForPx = 0;
        var initial = true;
        scanTypeFromFile = stimuliArray[1][header[fieldStudioTestName]];

        //Patient data
        var patientName = stimuliArray[1][header[fieldPatientName]];
        var patientSex = stimuliArray[1][header[fieldGender]];
        var dateOfRecord = stimuliArray[1][header[fieldRecordingDate]];
        var scanType = scanTypeString(scanTypeFromFile);
        var numberOfRecords = stimuliArray[0].length * stimuliArray.length;


        document.getElementById('patient-data').innerHTML = `
            Patient Name: ${patientName}<br />
            Patient Sex: ${patientSex|| ""}<br />
            Date of scan: ${dateOfRecord}<br />
            Scan Type: ${scanType}<br />
            Number of Records: <b></b>${formatMillion(numberOfRecords)}</b>
            `;
        document.querySelector("#generateContainer").style.display = "block";

        for (var i = 0; i < stimuliArray.length; i++) {
            if (stimuliArray[i][tableHeader.numberMediaName] !== "" && stimuliArray[i][tableHeader.numberMediaName] !== undefined && ((stimuliArray[i][tableHeader.numberValidityLeft] == 0 && stimuliArray[i][tableHeader.numberValidityRight] == 0) || (stimuliArray[i][tableHeader.numberValidityLeft] == 4 && stimuliArray[i][tableHeader.numberValidityRight] == 4))) {
                //Media Name Number
                if (stimuliArray[i][tableHeader.numberMediaName] === fileStimulusCenter) {
                    numberFromMediaName = initialMediaName;
                } else if (stimuliArray[i][tableHeader.numberMediaName] === fileStimulusBlack) {
                    numberFromMediaName = 0;
                    initialMediaName = numberFromMediaName;
                    refValForPx = ref['0'];
                } else {
                    numberFromMediaName = getNumberFromMediaName(stimuliArray[i][tableHeader.numberMediaName]);
                    initialMediaName = numberFromMediaName;
                    refValForPx = ref[numberFromMediaName + ""];
                }
                //Saccadic Amplitude Number
                var floatSaccadicAmplitude = parseFloat(stimuliArray[i][tableHeader.numberSaccadicAmplitude].replace(",", "."));
                if (initial) {
                    floatSaccadicAmplitude = 0;
                    if (stimuliArray[i][tableHeader.numberFixationPointX] !== "") {
                        initialFixationPoint = parseInt(stimuliArray[i][tableHeader.numberFixationPointX]);
                    }
                }
                if (parseInt(stimuliArray[i][tableHeader.numberFixationPointX]) < initialFixationPoint) {
                    initialSaccadicAmplitude -= floatSaccadicAmplitude;
                    initialSaccadicAmplitude = parseFloat(initialSaccadicAmplitude.toFixed(2))
                    initialFixationPoint = parseInt(stimuliArray[i][tableHeader.numberFixationPointX]);
                } else if (parseInt(stimuliArray[i][tableHeader.numberFixationPointX]) > initialFixationPoint) {
                    initialSaccadicAmplitude += floatSaccadicAmplitude;
                    initialSaccadicAmplitude = parseFloat(initialSaccadicAmplitude.toFixed(2))
                    initialFixationPoint = parseInt(stimuliArray[i][tableHeader.numberFixationPointX]);
                }

                arrayForGraph.push([parseInt(stimuliArray[i][tableHeader.numberRecordingTimestamp]), tableHeader.numberFromMediaName, initialSaccadicAmplitude]);
                arrayFixationPointX.push([parseInt(stimuliArray[i][tableHeader.numberRecordingTimestamp]), refValForPx, initialFixationPoint]);
                arrayGazePointX.push([parseInt(stimuliArray[i][tableHeader.numberRecordingTimestamp]), refValForPx, parseInt(stimuliArray[i][tableHeader.numberGazePointX])]);
                arrayGazePointY.push([parseInt(stimuliArray[i][tableHeader.numberRecordingTimestamp]), 540, parseInt(stimuliArray[i][tableHeader.numberGazePointY])]);
                initial = false;
            }
        }

    };
    reader.readAsBinaryString(evt.target.files[0]);
}

function showChart() {
    generateChartData(arrayForGraph);
    generateFixedChartData(arrayFixationPointX);
    generateGazePointX(arrayGazePointX);
    generateGazePointY(arrayGazePointY);
}

function formatMillion(val) {
    if (val === "" || val === undefined || val === null || val === 0) {
        return "";
    }
    if (Math.abs(val) < 1000) {
        return (val).toFixed(0) + ""
    }
    if (Math.abs(val) < 1000000) {
        return (val / 1000.0).toFixed(0) + "K"
    }
    if (Math.abs(val) < 1000000000) {
        return (val / 1000000.0).toFixed(2) + "M"
    }
    return (val / 1000000000.0).toFixed(2) + "B"
}

function onload() {
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
}