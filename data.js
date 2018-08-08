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
    clearDivs()
    arrayAmplitudeX = [];
    arrayFixationPointX = [];
    arrayFixationPointY = [];
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

        var tableHeader = makeNumberFromColumnName(stimuliArray[0]);

        var initialFixationPointX = fileStimuli[fileStimulusCenter].positionDegreeX;
        var initialFixationPointY = fileStimuli[fileStimulusCenter].positionDegreeY;
        var initialSaccadicAmplitude = fileStimuli[fileStimulusCenter].amplitude;
        var refValForAmplitudeX = fileStimuli[fileStimulusCenter].amplitude;
        var refValForPx = initialFixationPointX;
        var refValForPy = initialFixationPointY;
        var savedPx = initialFixationPointX;
        var savedPy = initialFixationPointY;
        var savedAmplitudeX = refValForAmplitudeX;
        var initial = true;
        scanTypeFromFile = stimuliArray[1][header[fieldStudioTestName]];

        //Patient data
        var patientName = stimuliArray[1][header[fieldPatientName]];
        var patientSex = stimuliArray[1][header[fieldGender]];
        var dateOfRecord = stimuliArray[1][header[fieldRecordingDate]];
        var scanType = scanTypeString(scanTypeFromFile);
        var numberOfRecords = stimuliArray[0].length * stimuliArray.length;


        document.getElementById('patientData').innerHTML = `
            Patient Name: ${patientName}<br />
            Patient Sex: ${patientSex|| ""}<br />
            Date of scan: ${dateOfRecord}<br />
            Scan Type: ${scanType}<br />
            Number of Records: <b></b>${formatMillion(numberOfRecords)}</b>
            `;
        document.querySelector("#generateContainer").style.display = "block";
        generateButton();

        for (var i = 0; i < stimuliArray.length; i++) {
            if (stimuliArray[i][tableHeader.numberMediaName] !== "" && stimuliArray[i][tableHeader.numberMediaName] !== undefined && ((stimuliArray[i][tableHeader.numberValidityLeft] == 0 && stimuliArray[i][tableHeader.numberValidityRight] == 0) || (stimuliArray[i][tableHeader.numberValidityLeft] == 4 && stimuliArray[i][tableHeader.numberValidityRight] == 4))) {
                //Media Name Number
                if (stimuliArray[i][tableHeader.numberMediaName] === fileStimulusBlack) {
                    refValForAmplitudeX = savedAmplitudeX;
                    refValForPx = savedPx;
                    refValForPy = savedPy;
                 } else {
                    refValForAmplitudeX = fileStimuli[stimuliArray[i][tableHeader.numberMediaName]].amplitude;
                    savedAmplitudeX = refValForAmplitudeX;
                    refValForPx = fileStimuli[stimuliArray[i][tableHeader.numberMediaName]].positionDegreeX;
                    savedPx = refValForPx;
                    refValForPy = fileStimuli[stimuliArray[i][tableHeader.numberMediaName]].positionDegreeY;
                    savedPy = refValForPy;
                }
                //Saccadic Amplitude Number
                var floatSaccadicAmplitude = parseFloat(stimuliArray[i][tableHeader.numberSaccadicAmplitude].replace(",", "."));
                if (initial) {
                    floatSaccadicAmplitude = 0;
                    if (stimuliArray[i][tableHeader.numberFixationPointX] !== "") {
                        initialFixationPointX = parseInt(stimuliArray[i][tableHeader.numberFixationPointX]);
                    }
                    if (stimuliArray[i][tableHeader.numberFixationPointY] !== "") {
                        initialFixationPointY = parseInt(stimuliArray[i][tableHeader.numberFixationPointY]);
                    }
                }
                if (parseInt(stimuliArray[i][tableHeader.numberFixationPointX]) < initialFixationPointX) {
                    initialSaccadicAmplitude -= floatSaccadicAmplitude;
                    initialSaccadicAmplitude = parseFloat(initialSaccadicAmplitude.toFixed(2))
                    initialFixationPointX = parseInt(stimuliArray[i][tableHeader.numberFixationPointX]);
                } else if (parseInt(stimuliArray[i][tableHeader.numberFixationPointX]) > initialFixationPointX) {
                    initialSaccadicAmplitude += floatSaccadicAmplitude;
                    initialSaccadicAmplitude = parseFloat(initialSaccadicAmplitude.toFixed(2))
                    initialFixationPointX = parseInt(stimuliArray[i][tableHeader.numberFixationPointX]);
                }

                if (parseInt(stimuliArray[i][tableHeader.numberFixationPointY]) < initialFixationPointY) {
                    // initialSaccadicAmplitude -= floatSaccadicAmplitude;
                    // initialSaccadicAmplitude = parseFloat(initialSaccadicAmplitude.toFixed(2))
                    initialFixationPointY = parseInt(stimuliArray[i][tableHeader.numberFixationPointY]);
                } else if (parseInt(stimuliArray[i][tableHeader.numberFixationPointY]) > initialFixationPointY) {
                    // initialSaccadicAmplitude += floatSaccadicAmplitude;
                    // initialSaccadicAmplitude = parseFloat(initialSaccadicAmplitude.toFixed(2))
                    initialFixationPointY = parseInt(stimuliArray[i][tableHeader.numberFixationPointY]);
                }
                var valSaccadeAmplitudeX = initialSaccadicAmplitude;
                var valFixationPointX = initialFixationPointX;
                var valFixationPointY = initialFixationPointY;

                arrayAmplitudeX.push([parseInt(stimuliArray[i][tableHeader.numberRecordingTimestamp]), refValForAmplitudeX, valSaccadeAmplitudeX]);
                arrayFixationPointX.push([parseInt(stimuliArray[i][tableHeader.numberRecordingTimestamp]), refValForPx, valFixationPointX]);
                arrayFixationPointY.push([parseInt(stimuliArray[i][tableHeader.numberRecordingTimestamp]), refValForPy, valFixationPointY]);
                arrayGazePointX.push([parseInt(stimuliArray[i][tableHeader.numberRecordingTimestamp]), refValForPx, parseInt(stimuliArray[i][tableHeader.numberGazePointX])]);
                arrayGazePointY.push([parseInt(stimuliArray[i][tableHeader.numberRecordingTimestamp]), refValForPy, parseInt(stimuliArray[i][tableHeader.numberGazePointY])]);
                initial = false;
            }
        }

    };
    reader.readAsBinaryString(evt.target.files[0]);
}
function generateButton(){
    importInfo.innerHTML = '<button class="generateButton" onclick="loadGif();">Generate Chart</button>';
}

function removeButton(){
    importInfo.removeChild(importInfo.firstChild);
}

function loadGif() {
    loadingImage.innerHTML = ' <span>Charts are loading!</span> <div class="lds-css ng-scope"> <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>'
    setTimeout(showChart, 10);
}

function removeGif() {
    while (loadingImage.hasChildNodes()) {
        loadingImage.removeChild(loadingImage.firstChild);
    }
}

function showChart() {
    if (scanTypeFromFile == fieldHorizontalSaccade){
        graphContainer.innerHTML = '<div id="gazePointX" class="chartContainer"></div> <div id="fixationPointX" class="chartContainer"></div> <div id="amplitudeX" class="chartContainer"></div>';
        generateChartAmplitudeX(arrayAmplitudeX);
        generateChartFixedPointX(arrayFixationPointX);
        generateChartGazePointX(arrayGazePointX);
    }
    else if (scanTypeFromFile == fieldVerticalSaccade){
        graphContainer.innerHTML = '<div id="gazePointY" class="chartContainer"></div> <div id="fixationPointY" class="chartContainer"></div>';
        generateChartGazePointY(arrayGazePointY);
        generateChartFixedPointY(arrayFixationPointY);
    } else if (scanTypeFromFile == filedAntiSaccade){
        graphContainer.innerHTML =  '<div id="gazePointX" class="chartContainer"></div> <div id="fixationPointX" class="chartContainer"></div> <div id="amplitudeX" class="chartContainer"></div>';
        generateChartAmplitudeX(arrayAmplitudeX);
        generateChartFixedPointX(arrayFixationPointX);
        generateChartGazePointX(arrayGazePointX);
    } else {
        graphContainer.innerHTML = '<h3>Momentan pentru acest tip de scanare nu exista grafice</h3>';
    }

    removeGif();
    removeButton();
}

function clearDivs() {
    while (graphContainer.hasChildNodes()) {
        graphContainer.removeChild(graphContainer.firstChild);
    }
}

function formatMillion(val) {
    if (val === "" || val === undefined || val === null || val === 0) {
        return "";
    }
    if (Math.abs(val) < 1000) {
        return (val).toFixed(0) + "";
    }
    if (Math.abs(val) < 1000000) {
        return (val / 1000.0).toFixed(0) + "K";
    }
    if (Math.abs(val) < 1000000000) {
        return (val / 1000000.0).toFixed(2) + "M";
    }
    return (val / 1000000000.0).toFixed(2) + "B";
}

function onload() {
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
}
