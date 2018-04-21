function generateChartData(arrayForGraph){
var chartData = [];
		var benchAmptitude = 0;
		var amptitude = 0;
		var time = 0;

		for (var i = 0; i < arrayForGraph.length; i++){
			benchAmptitude =  arrayForGraph[i][1];
			amptitude = arrayForGraph[i][2];
			time = arrayForGraph[i][0]

			chartData.push({
				time: time,
				benchAmptitude: benchAmptitude,
				amptitude: amptitude
			});
		}
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
	    		'position': 'left'
	    	}, {
	 			"id":"v2",
	        	"axisColor": "#0000ff",
	        	"axisThickness": 2,
	        	"axisAlpha": 1,
	        	"position": "right"
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
		    	"valueAxis": "v2",
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
	
	
   	console.log("chart", arrayForGraph);
	
		
	return chartData;
	}
