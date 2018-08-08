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

    fileStimulusCenter = 'O.bmp',
    fileStimulusBlack = 'black.bmp',
    // fileStimulusX10DegreesRight = 'O(+10).bmp',
    // fileStimulusX18DegreesRight = 'O(+18).bmp',
    // fileStimulusX10DegreesLeft = 'O(-10).bmp',
    // fileStimulusX18DegreesLeft = 'O(-18).bmp',
    // fileStimulusY8DegreesUp = 'O-(+8).bmp',
    // fileStimulusY8DegreesDown = 'O-(-8).bmp',

    fileStimuli = {
        'O.bmp': {
            value: 0,
            positionDegreeX: 960,
            positionDegreeY: 540,
        },
        'black.bmp': {
            value: 0,
        },
        'O(+10).bmp': {
            value: 10,
            positionDegreeX: 1384,
            positionDegreeY: 540,
        },
        'O(+18).bmp': {
            value: 18,
            positionDegreeX: 1771,
            positionDegreeY: 540,
        },
        'O(-10).bmp': {
            value: -10,
            positionDegreeX: 534,
            positionDegreeY: 540,
        },
        'O(-18).bmp': {
            value: -18,
            positionDegreeX: 148,
            positionDegreeY: 540,
        },
        'O-(+8).bmp': {
            value: 8,
            positionDegreeX: 960,
            positionDegreeY: 188,
        },
        'O-(-8).bmp': {
            value: -8,
            positionDegreeX: 960,
            positionDegreeY: 891,
        }
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
