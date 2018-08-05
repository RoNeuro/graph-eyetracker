var fieldPatientName = "ParticipantName",
    fieldGender = "[Gender]Value",
    fieldRecordingDate = "RecordingDate",
    fieldStudioTestName = "StudioTestName",
    stimulusLocation = "MediaName",
    fieldRecordingTimeStamp = "RecordingTimestamp",
    fieldFixationPointX = "FixationPointX (MCSpx)",
    fieldFixationPointY = "FixationPointY (MCSpx)",
    fieldSaccadicAmplitude = "SaccadicAmplitude",
    fieldValidityLeft = "ValidityLeft",
    filedValidityRight = "ValidityRight",
    fieldGazePointX = "GazePointX (MCSpx)",
    fieldGazePointY = "GazePointY (MCSpx)",

    fieldVerticalSaccade = "verSacc",
    fieldHorizontalSaccade = "horSacc",
    filedAntiSaccade = "antisaccades",
    scanTypeFromFile = "",

    fileStimulusCenter = '0.bmp',
    fileStimulusBlack = 'black.bmp',
    fileStimulusX10DegreesRight = 'O(+10).bmp',
    fileStimulusX18DegreesRight = 'O(+18).bmp',
    fileStimulusX10DegreesLeft = 'O(-10).bmp',
    fileStimulusX18DegreesLeft = 'O(-18).bmp',
    fileStimulusY8DegreesUp = 'O-(+8).bmp',
    fileStimulusY8DegreesDown = 'O-(-8).bmp',

    position_CenterX = 960,
    position_CenterY = 540,

    position_X10DegreesRight = 1384,
    position_Y10DegreesRight = 540,
    position_X18DegreesRight = 1771,
    position_Y18DegreesRight = 540,
    position_X10DegreesLeft = 534,
    position_Y10DegreesLeft = 540,
    position_X18DegreesLeft = 148,
    position_Y18DegreesLeft = 540,

    position_X8DegreesUp = 960,
    position_Y8DegreesUp = 188,
    position_X8DegreesDown = 960,
    position_Y8DegreesDown = 891,

    ref = {
        // TODO: Replace this with variables
        '18': 1780,
        '-18': 150,
        '10': 1360,
        '-10': 550,
        '0': 960
    };

function scanTypeString(type) {
    if (type === fieldHorizontalSaccade) {
        return "Horizontal Saccade Test";
    } else if (type === filedAntiSaccade) {
        return "Anti Saccade Test";
    } else if (type === fieldVerticalSaccade) {
        return "Vertical Saccade Test";
    } else {
        return "Horizontal Saccade Test";
    }
}

function makeNumberFromColumnName(headerArray) {
    var returnArray = {};
    for (var i = 0; i < headerArray.length; i++) {
        header[headerArray[i]] = i;
        if (headerArray[i] === stimulusLocation) {
            returnArray.numberMediaName = i;
        } else if (headerArray[i] === fieldRecordingTimeStamp) {
            returnArray.numberRecordingTimestamp = i;
        } else if (headerArray[i] === fieldFixationPointX) {
            returnArray.numberFixationPointX = i;
        } else if (headerArray[i] === fieldSaccadicAmplitude) {
            returnArray.numberSaccadicAmplitude = i;
        } else if (headerArray[i] === fieldValidityLeft) {
            returnArray.numberValidityLeft = i;
        } else if (headerArray[i] === filedValidityRight) {
            returnArray.numberValidityRight = i;
        } else if (headerArray[i] === fieldGazePointX) {
            returnArray.numberGazePointX = i;
        } else if (headerArray[i] === fieldGazePointY) {
            returnArray.numberGazePointY = i;
        }
    }
    return (returnArray);
}

function getNumberFromMediaName(name) {
    // TODO: replace this with variables
    return parseInt(name.replace(/[^0-9+-]/g, ""))
}