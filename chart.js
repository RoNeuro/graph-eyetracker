var charts=[];

function generateChart(data,name,title) {
    var chartData = [];
    var benchAmptitude = 0;
    var amptitude = 0;
    var time = 0;

    for (var i = 0; i < data.length; i++) {
        benchAmptitude = data[i][1];
        amptitude = data[i][2];
        time = data[i][0];

        chartData.push({
            time: time,
            benchAmptitude: benchAmptitude,
            amptitude: amptitude
        });
    }
    var chart = AmCharts.makeChart(name, {
        "type": "serial",
        "theme": "light",
        "mouseWheelZoomEnabled": false,
        "legend": {
            "useGraphSettings": true,
            "position": "right",
        },
        "dataProvider": chartData,
        "synchronizeGrid": true,
        "valueAxes": [{
            'id': 'v1',
            'axisColor': '#FF6600',
            'axisThickness': 2,
            'axisAlpha': 1,
            'position': 'left',
            includeGuidesInMinMax:true,
            reversed:true,
            /*guides:[
                {
                    "fillAlpha": 0,
                    "value": 400
                },
                {
                    "fillAlpha": 0,
                    "value": 700
                }
            ]*/
        }],
        "graphs": [{
            "valueAxis": "v1",
            "lineColor": "#FF6600",
            "bullet": "round",
            "bulletBorderThickness": 2,
            "hideBulletsCount": 30,
            "title": "benchmark",
            "valueField": "benchAmptitude",
            "fillAlphas": 0
        },
            {
                "valueAxis": "v1",
                "lineColor": "#0000ff",
                "bullet": "square",
                "bulletBorderThickness": 2,
                "hideBulletsCount": 30,
                "title": "patient",
                "valueField": "amptitude",
                "fillAlphas": 0
            }],
        "chartScrollbar": {},
        "chartCursor": {
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "cursorAlpha": 1,
            "cursorColor": "#258cbb",
            "valueLineAlpha": 0.2,
        },
        "categoryField": "time",
        "categoryAxis": {
            "gridPosition": "start",
        },
        "export": {
            "enabled": true,
            "postion": "bottom-right"
        },
        "marginRight": 40,
        "marginLeft": 40,
        "autoMarginOffset": 20,
        "balloon": {
            "borderThickness": 1,
            "shadowAlpha": 0
        },
        "titles": [{
            "size": 15,
            "text": title
        }],
    });
    charts.push(chart);
    
    //for (var x in charts) {
    chart.addListener("zoomed", syncZoom);
    chart.addListener("init", addCursorListeners);
    //}
}

function addCursorListeners(event) {
    event.chart.chartCursor.addListener("changed", handleCursorChange);
    event.chart.chartCursor.addListener("onHideCursor", handleHideCursor);
}

function syncZoom(event) {
    for (x in charts) {
        if (charts[x].ignoreZoom) {
            charts[x].ignoreZoom = false;
        }
        if (event.chart != charts[x]) {
            charts[x].ignoreZoom = true;
            charts[x].zoomToCategoryValues(event.startValue, event.endValue);
        }
    }
}

function handleCursorChange(event) {
    for (var x in charts) {
        if (event.chart != charts[x]) {
            charts[x].chartCursor.syncWithCursor(event.chart.chartCursor);
        }
    }
}

function handleHideCursor() {
    for (var x in charts) {
        if (charts[x].chartCursor.hideCursor) {
            charts[x].chartCursor.forceShow = false;
            charts[x].chartCursor.hideCursor(false);
        }
    }
}
