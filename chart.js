$(document).ready(function(){

	//amCharts
	var chartData = generateChartData();

	var chart = AmCharts.makeChart("chartdiv",{
		"type": "serial",
  		"theme" : "light",
  		"mouseWheelZoomEnabled":true,
		"legend": {
  			"useGraphSettings": true
  		},
  		"dataProvider": chartData,
  		"synchronizeGrid":true,
  		"valueAxes": [{
    		'id':'v1',
    		'axisColor':'#FF6600',
    		'axisThickness': 2,
    		'axisAlpha': 1,
    		'position': 'right'
    	}, {
 			"id":"v2",
        	"axisColor": "#FCD202",
        	"axisThickness": 2,
        	"axisAlpha": 1,
        	"position": "left"
    	}],
    	"graphs": [{
	    	"valueAxis": "v1",
	        "lineColor": "#FF6600",
	        "bullet": "round",
	        "bulletBorderThickness": 1,
	        "hideBulletsCount": 30,
	        "title": "benchmark",
	        "valueField": "benchAmptitude",
			"fillAlphas": 0
    	},
    	{
	    	"valueAxis": "v2",
	        "lineColor": "#FCD202",
	        "bullet": "square",
	        "bulletBorderThickness": 1,
	        "hideBulletsCount": 30,
	        "title": "patient",
	        "valueField": "amptitude",
			"fillAlphas": 0	
    	}],
    	 // "chartScrollbar": {},
    	"chartScrollbar": {
	        "graph": "g1",
	        "oppositeAxis":false,
	        "offset":30,
	        "scrollbarHeight": 80,
	        "backgroundAlpha": 0,
	        "selectedBackgroundAlpha": 0.1,
	        "selectedBackgroundColor": "#888888",
	        "graphFillAlpha": 0,
	        "graphLineAlpha": 0.5,
	        "selectedGraphFillAlpha": 0,
	        "selectedGraphLineAlpha": 1,
	        "autoGridCount":true,
	        "color":"#AAAAAA"
    	},

		"chartCursor": {
		   	"pan": true,
		    "valueLineEnabled": true,
		    "valueLineBalloonEnabled": true,
		    "cursorAlpha":1,
		    "cursorColor":"#258cbb",
		    "valueLineAlpha":0.2,
		   	"valueZoomable":true
		},
		"categoryField": "time",
		"categoryAxis": {
   			"gridPosition": "start",
  		},
  		"export": {
    		"enabled" : true,
    		"postion" : "bottom-right"
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
     	 		"text": "Sacade"
     	 	}],
	    "valueScrollbar":{
	      "oppositeAxis":true,
	      "offset":50,
	      "scrollbarHeight":10
	    },
	    // "listeners": [{
	    // 	"event": "rendered",
	    // 	"method": function(e){
	    // 		e.chart.valueAxes[0].zoomToValues(-10, 10);
	    // 	}
	    // }]
	});

	// chart.addListener("rendered", zoomChart);
	// zoomChart();

	function generateChartData(){
		var chartData = [];
		var benchAmptitude = 10;
		var amptitude = -10;
		var time = 0;

	for (var i = 0; i < 1000; i++){

	function generateRandomInteger(min, max) {
  		return Math.floor(min + Math.random()*(max+1 - min))
	}
		benchAmptitude = generateRandomInteger(-10, 10);
		amptitude = generateRandomInteger(-10, 10);
		time += 0.500;

		chartData.push({
			time: time,
			benchAmptitude: benchAmptitude,
			amptitude: amptitude
		});
	}
	return chartData;
	};
	
	function zoomChart(){
    	chart.zoomToIndexes(chart.dataProvider.length - 400, chart.dataProvider.length - 1);
	};
})