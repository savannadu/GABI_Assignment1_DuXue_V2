

var map;
var exp_DengueCaseJSON;
var openStreeMapLayer;
var googleLayerSatellite;
var googleLayerStreet;
var basemap_0 ;
var exp_DengueCaseJSON;
var exp_NumCaseInBildingBufferJSON;
var exp_SearchBuildWithCasesJSON;
var exp_waterwaywithincostaloutlineJSON;
var exp_waterwaywithincostaloutlinebufferJSON;
var exp_WaterwayIntercectwithBuildingBufferJSON;
var exp_SubZoneandPopulationJSON;

var markersCluster;

function loadScript() {

	map = new L.Map('map', {
		zoomControl:true, 
		maxZoom:19,
		minZoom: 11,
		center: new L.LatLng(1.355312, 103.827068),
		zoom: 12
	}).fitBounds([[1.24528533824,103.502166729],[1.47625489058,104.14378723]]);
	openStreeMapLayer = L.tileLayer.grayscale('http://{s}.tile.osm.org/{z}/{x}/{y}.png',
	{
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}); 
	googleLayerSatellite = new L.Google('SATELLITE');
	googleLayerStreet = new L.Google('ROADMAP');
	basemap_0 = {
		'Open Street Maps': openStreeMapLayer,
		'Google (Satellite)': googleLayerSatellite,
		'Google(Street)': googleLayerStreet
	};

	markersCluster = new L.markerClusterGroup();
	var markersClusterLayer = new L.geoJson(exp_DengueCase,{
		onEachFeature: addMarkerCluster
	});

	// dengue layer
	exp_DengueCaseJSON = L.geoJson(exp_DengueCase,{
	onEachFeature: pop_DengueCase,
	pointToLayer: function (feature, latlng) {  
		 // return L.circleMarker(latlng, { 
			//  fillColor: "#f6b800",
			//  color: '#ffc92d',
			//  weight: 0.5,
			//  fillOpacity: 0.6 
			// }).on({

			// 	mouseover: function(e) {
			// 		this.openPopup();
			// 		this.setStyle({color: 'yellow'});
			// 	},
			// 	mouseout: function(e) {
			// 		this.closePopup();
			// 		this.setStyle({color: '#537898'});
						
			// 	}

			// });
		switch (feature.properties.EPIWeek) {
		case '40':
		return L.circleMarker(latlng, { 
			 fillColor: "#FE2E64",
			 color: '#ffc92d',
			 weight: 0.5,
			 fillOpacity: 0.6 
		}).on({

				mouseover: function(e) {
					this.openPopup();
					this.setStyle({color: 'yellow'});
				},
				mouseout: function(e) {
					this.closePopup();
					this.setStyle({color: '#537898'});
						
				}

			});
		break;
		case '41':
		return L.circleMarker(latlng, { 
			 fillColor: "#FE2EF7",
			 color: '#ffc92d',
			 weight: 0.5,
			 fillOpacity: 0.6 
		}).on({

				mouseover: function(e) {
					this.openPopup();
					this.setStyle({color: 'yellow'});
				},
				mouseout: function(e) {
					this.closePopup();
					this.setStyle({color: '#537898'});
						
				}

			});
		break;
		case '42':
		return L.circleMarker(latlng, { 
			 fillColor: "#9A2EFE",
			 color: '#ffc92d',
			 weight: 0.5,
			 fillOpacity: 0.6 
		}).on({

				mouseover: function(e) {
					this.openPopup();
					this.setStyle({color: 'yellow'});
				},
				mouseout: function(e) {
					this.closePopup();
					this.setStyle({color: '#537898'});
						
				}

			});
		break;
	}

	}
	});


	// resize proportion
	exp_DengueCaseJSON.eachLayer(function(layer) {
		var props = layer.feature.properties;
		var radius = calcPropRadius(props['COUNT_POST']);
		var popupContent = "<b>" + String(props['COUNT_POST']) + 
				" cases reported at this location</b><br>" +
				"<i> on " + props.FMEL_UPD_D +
				"</i> - week </i>" + props.EPIWeek;

		layer.setRadius(radius);
		layer.bindPopup(popupContent, { offset: new L.Point(0,-radius) });
	});


	exp_NumCaseInBildingBufferJSON = new L.geoJson(exp_NumCaseInBildingBuffer,{
		onEachFeature: pop_NumCaseInBildingBuffer,
		style: doStyleNumCaseInBildingBuffer
	});

	exp_SearchBuildWithCasesJSON = new L.geoJson(exp_SearchBuildWithCases,{
		onEachFeature: pop_SearchBuildWithCases,
		style: doStyleSearchBuildWithCases
	});

	exp_waterwaywithincostaloutlineJSON = new L.geoJson(exp_waterwaywithincostaloutline,{
		onEachFeature: pop_waterwaywithincostaloutline,
		style: doStylewaterwaywithincostaloutline
	});

	exp_waterwaywithincostaloutlinebufferJSON = new L.geoJson(exp_waterwaywithincostaloutlinebuffer,{
		onEachFeature: pop_waterwaywithincostaloutlinebuffer,
		style: doStylewaterwaywithincostaloutlinebuffer
	});

	exp_WaterwayIntercectwithBuildingBufferJSON = new L.geoJson(exp_WaterwayIntercectwithBuildingBuffer,{
		onEachFeature: pop_WaterwayIntercectwithBuildingBuffer,
		style: doStyleWaterwayIntercectwithBuildingBuffer
	});

	exp_SubZoneandPopulationJSON = new L.geoJson(exp_SubZoneandPopulation,{
			onEachFeature: pop_SubZoneandPopulation,
			style: doStyleSubZoneandPopulation
		});

	var overlayMaps = {
		'Dengue Case Layer: Cluster Marker' : markersCluster,
		'Dengue Cases Layer: Point Symbol': exp_DengueCaseJSON ,
		'Building Layer: Buildings with Dengue Cases' : exp_SearchBuildWithCasesJSON,
		'Building Layer: 150m Building Buffer': exp_NumCaseInBildingBufferJSON,
		'Waterways Layer: 150m Buffer Intesect Dengue Area' :exp_WaterwayIntercectwithBuildingBufferJSON,
		'Waterways Layer: Line Symbol' : exp_waterwaywithincostaloutlineJSON,
		'Choropleth: Population in Subzone': exp_SubZoneandPopulationJSON
		 //'Waterway with 150m Buffer' :exp_waterwaywithincostaloutlinebufferJSON, 
		};

		map.addLayer(openStreeMapLayer);
		map.addLayer(markersCluster);
		// map.addLayer(exp_DengueCaseJSON);
		var osmGeocoder = new L.Control.OSMGeocoder({
            collapsed: false,
            position: 'topright',
            text: 'Find!',
		});
		osmGeocoder.addTo(map);
		var legend = L.control({position: 'bottomright'});
		legend.onAdd = function (map) {
			var div = L.DomUtil.create('div', 'info legend');
			var innerHTMLString = "<div class='header'>Legend</div>";
			innerHTMLString += "<table class='dengue-legend hide'><tr><td colspan='3'>Dengue Cases</td></tr><tr><td></td><td></td><td></td></tr><tr><td>Week 40</td><td>Week 41</td><td>Week 42</td></tr></table>";
			innerHTMLString += "<table class='buildingbuffer-legend hide'><tr><td colspan='5'>Dengue Cases in 150m Building Buffer</td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td>1-2</td><td>3-4</td><td>5-6</td><td>7-10</td><td>11-53</td></tr></table>";
			innerHTMLString += "<table class='building-legend hide'><tr><td colspan='4'>Buildings with Dengue Cases</td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td>Commercial</td><td>Public</td><td>Residential</td><td>Others</td></tr></table>";
			innerHTMLString += "<table class='waterway-legend hide'><tr><td colspan='5'>Waterways</td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td>canal</td><td>dam</td><td>ditch</td><td>dock</td><td>drain</td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td>river</td><td>stream</td><td>waterfall</td><td>weir</td><td></td></tr></table>";
			innerHTMLString += "<table class='waterwayintersect-legend hide'><tr><td colspan='5'>Waterways Intesect Dengue Area</td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td>canal</td><td>ditch</td><td>drain</td><td>river</td><td>stream</td></tr></table>";
			innerHTMLString += "<table class='population-legend hide'><tr><td colspan='5'>Population in Subzone</td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td>0-7741</td><td>7,741 - 21,731</td><td>21,731- 44,518</td><td>44,518 - 87,199</td><td>87,199 - 137,152</td></tr></table>";
			div.innerHTML = innerHTMLString;
    		return div;
		};
		legend.addTo(map);

		L.control.layers(basemap_0, overlayMaps, {collapsed: false}).addTo(map);

		// when add layer
		map.on('overlayadd', function(eventLayer) {

			if (eventLayer.name === 'Dengue Cases Layer: Point Symbol') {
 				$(".dengue-legend").removeClass("hide");
		    }

		    if (eventLayer.name === 'Waterways Layer: 150m Buffer Intesect Dengue Area') {
		        map.addLayer(exp_WaterwayIntercectwithBuildingBufferJSON);
		        $(".waterwayintersect-legend").removeClass("hide");
		    }

		    if (eventLayer.name === 'Building Layer: 150m Building Buffer') {
		        $(".buildingbuffer-legend").removeClass("hide");
		    }

		    if (eventLayer.name === 'Building Layer: Buildings with Dengue Cases') {
		        $(".building-legend").removeClass("hide");
		    }

		    if (eventLayer.name === 'Waterways Layer: Line Symbol') {
		        $(".waterway-legend").removeClass("hide");
		    }

		    if (eventLayer.name === 'Choropleth: Population in Subzone') {
		        $(".population-legend").removeClass("hide");
		    }

		});

		// when remove layer
		map.on('overlayremove', function(eventLayer) {

		    if (eventLayer.name === 'Dengue Cases Layer: Point Symbol') {
 				$(".dengue-legend").addClass("hide");
		    }

		    if (eventLayer.name === 'Waterways Layer: 150m Buffer Intesect Dengue Area') {
		        $(".waterwayintersect-legend").addClass("hide");
		    }

		    if (eventLayer.name === 'Building Layer: 150m Building Buffer') {
		        $(".buildingbuffer-legend").addClass("hide");
		    }

		    if (eventLayer.name === 'Building Layer: Buildings with Dengue Cases') {
		        $(".building-legend").addClass("hide");
		    }

		    if (eventLayer.name === 'Waterways Layer: Line Symbol') {
		        $(".waterway-legend").addClass("hide");
		    }

		    if (eventLayer.name === 'Choropleth: Population in Subzone') {
		        $(".population-legend").addClass("hide");
		    }

		});

	}
// END initialize
function calcPropRadius(attributeValue) {

	var scaleFactor = 20;
	var area = attributeValue * scaleFactor;
	return Math.sqrt(area/Math.PI)*2;			
}

function pop_DengueCase(feature, layer) { 
	              
	// var popupContent = '<table><tr><th scope="row">OBJECTID</th><td>' + Autolinker.link(String(feature.properties['OBJECTID'])) + '</td></tr><tr><th scope="row">POSTAL</th><td>' + Autolinker.link(String(feature.properties['POSTAL'])) + '</td></tr><tr><th scope="row">COUNT_POST</th><td>' + Autolinker.link(String(feature.properties['COUNT_POST'])) + '</td></tr><tr><th scope="row">AREANAME</th><td>' + Autolinker.link(String(feature.properties['AREANAME'])) + '</td></tr><tr><th scope="row">INC_CRC</th><td>' + Autolinker.link(String(feature.properties['INC_CRC'])) + '</td></tr><tr><th scope="row">FMEL_UPD_D</th><td>' + Autolinker.link(String(feature.properties['FMEL_UPD_D'])) + '</td></tr><tr><th scope="row">X_ADDR</th><td>' + Autolinker.link(String(feature.properties['X_ADDR'])) + '</td></tr><tr><th scope="row">Y_ADDR</th><td>' + Autolinker.link(String(feature.properties['Y_ADDR'])) + '</td></tr><tr><th scope="row">EPIWeek</th><td>' + Autolinker.link(String(feature.properties['EPIWeek'])) + '</td></tr><tr><th scope="row">imgIcon</th><td>' + Autolinker.link(String(feature.properties['imgIcon'])) + '</td></tr></table>';
	// layer.bindPopup(popupContent);
}


function processData(data) {
	var timestamps = [];
	var weeks=[];
	var min = Infinity; 
	var max = -Infinity;

	for (var feature in data.features) {

		var properties = data.features[feature].properties; 

		for (var attribute in properties) { 
			if(attribute =='FMEL_UPD_D'){   
				if ( $.inArray(properties[attribute],timestamps) === -1) {
					timestamps.push(properties[attribute]);     
				}
			} 
			if (attribute == 'EPIWeek'){
				if ( $.inArray(properties[attribute],weeks) === -1) {
					weeks.push(properties[attribute]);      
				}

			}
			if (attribute == 'COUNT_POST'){

				if (properties[attribute] < min) {  
					min = properties[attribute];
				}

				if (properties[attribute] > max) { 
					max = properties[attribute]; 
				}
			}
		}
	}

	return {
		timestamps : timestamps,
		weeks : weeks,
		min : min,
		max : max
	}
}

//marker is not displayed
function addMarkerCluster(feature, layer) {
	var popupContent =  'Week '+ Autolinker.link(String(feature.properties['EPIWeek'])) +' on date '+Autolinker.link(String(feature.properties['FMEL_UPD_D']))+' reported:<table><tr><th scope="row">No of Cases</th><td>'+Autolinker.link(String(feature.properties['COUNT_POST']))+'</td></tr><tr><th scope="row">Postal Code</th><td>' + Autolinker.link(String(feature.properties['POSTAL'])) + '</td></tr></table>';
	// layer.bindPopup(popupContent);
	var myIcon = L.icon({
        iconUrl: 'mosquito.png',
        iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [-20, -20]
    });
	markersCluster.addLayer(new L.Marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]],{ icon: myIcon }).bindPopup(popupContent));
}

function pop_WaterwayIntercectwithBuildingBuffer(feature, layer) {                  
	var popupContent = '<table><tr><th scope="row">Waterway Name</th><td>' + Autolinker.link(String(feature.properties['name'])) + '</td></tr><tr><th scope="row">Waterway Type</th><td>' + Autolinker.link(String(feature.properties['type'])) + '</td></tr></table>';
	layer.bindPopup(popupContent);
}

function doStyleWaterwayIntercectwithBuildingBuffer(feature) {
	switch (feature.properties.type) {
		case 'canal':
		return {
			weight: '1.3',
			fillColor: '#d7191c',
			color: '#d7191c',
			weight: '1',
			dashArray: '',
			opacity: '1.0',
			fillOpacity: '0.7',
		};
		break;
		case 'ditch':
		return {
			weight: '1.3',
			fillColor: '#fdae61',
			color: '#fdae61',
			weight: '1',
			dashArray: '',
			opacity: '1.0',
			fillOpacity: '0.7',
		};
		break;
		case 'drain':
		return {
			weight: '1.3',
			fillColor: '#ffffbf',
			color: '#ffffbf',
			weight: '1',
			dashArray: '',
			opacity: '1.0',
			fillOpacity: '0.7',
		};
		break;
		case 'river':
		return {
			weight: '1.3',
			fillColor: '#abd9e9',
			color: '#abd9e9',
			weight: '1',
			dashArray: '',
			opacity: '1.0',
			fillOpacity: '0.7',
		};
		break;
		case 'stream':
		return {
			weight: '1.3',
			fillColor: '#2c7bb6',
			color: '#2c7bb6',
			weight: '1',
			dashArray: '',
			opacity: '1.0',
			fillOpacity: '0.7',
		};
		break;
	}
}

function pop_waterwaywithincostaloutlinebuffer(feature, layer) {                    
	var popupContent = '<table><tr><th scope="row">osm_id</th><td>' + Autolinker.link(String(feature.properties['osm_id'])) + '</td></tr><tr><th scope="row">name</th><td>' + Autolinker.link(String(feature.properties['name'])) + '</td></tr><tr><th scope="row">type</th><td>' + Autolinker.link(String(feature.properties['type'])) + '</td></tr><tr><th scope="row">width</th><td>' + Autolinker.link(String(feature.properties['width'])) + '</td></tr><tr><th scope="row">FID</th><td>' + Autolinker.link(String(feature.properties['FID'])) + '</td></tr></table>';
	layer.bindPopup(popupContent);
}

function doStylewaterwaywithincostaloutlinebuffer(feature) {
	return {
		color: '#1f78b4',
		fillColor: '#a6cee3',
		weight: 1.3,
		dashArray: '',
		opacity: 0.52,
		fillOpacity: 0.52
	};

}

function pop_NumCaseInBildingBuffer(feature, layer) {                   
	var popupContent = '<table><tr><th scope="row">Building Name</th><td>' + Autolinker.link(String(feature.properties['name'])) + '</td></tr><tr><th scope="row">Catogory</th><td>' + Autolinker.link(String(feature.properties['BuildCat'])) + '</td></tr><tr><th scope="row">No. of Cases</th><td>' + Autolinker.link(String(feature.properties['COUNT_POST'])) + '</td></tr></table>';
	layer.bindPopup(popupContent);

}
	    // help: no border
	    function doStyleNumCaseInBildingBuffer(feature) {
	    	if (feature.properties.COUNT_POST >= 1.0 && feature.properties.COUNT_POST <= 2.0) {
	    		return {
	    			color: '#fdbf6f',
	    			weight: '1.3',
	    			fillColor: '#fdbf6f',
	    			opacity: '1.0',
	    			fillOpacity: '0.6',
	    			borderStyle:"none"
	    		}
	    	}
	    	if (feature.properties.COUNT_POST >= 2.0 && feature.properties.COUNT_POST <= 4.0) {
	    		return {
	    			color: '#fdc67e',
	    			weight: '1.3',
	    			fillColor: '#fdc67e',
	    			opacity: '1.0',
	    			fillOpacity: '0.6',
	    			borderStyle:"none"
	    		}
	    	}
	    	if (feature.properties.COUNT_POST >= 4.0 && feature.properties.COUNT_POST <= 6.0) {
	    		return {
	    			color: '#fcc383',
	    			weight: '1.3',
	    			fillColor: '#fcc383',
	    			opacity: '1.0',
	    			fillOpacity: '0.6',
	    			borderStyle:"none"
	    		}
	    	}
	    	if (feature.properties.COUNT_POST >= 6.0 && feature.properties.COUNT_POST <= 10.0) {
	    		return {
	    			color: '#fc9f67',
	    			weight: '1.3',
	    			fillColor: '#fc9f67',
	    			opacity: '1.0',
	    			fillOpacity: '0.6',
	    			borderStyle:"none"
	    		}
	    	}
	    	if (feature.properties.COUNT_POST >= 10.0 && feature.properties.COUNT_POST <= 53.0) {
	    		return {
	    			color: '#ff4000',
	    			weight: '1.3',
	    			fillColor: '#ff4000',
	    			opacity: '1.0',
	    			fillOpacity: '0.6',
	    			borderStyle:"none"
	    		}
	    	}

	    }

	    function pop_SearchBuildWithCases(feature, layer) {                 

	    	var popupContent = '<table><tr><th scope="row">Name</th><td>' + Autolinker.link(String(feature.properties['name'])) + '</td></tr><tr><th scope="row">Category</th><td>' + Autolinker.link(String(feature.properties['BuildCat'])) + '</td></tr></table>';
	    	layer.bindPopup(popupContent);
	    }

	    function doStyleSearchBuildWithCases(feature) {
	    	switch (feature.properties.BuildCat) {
	    		case 'Commercial':
	    		return {
	    			weight: '1.3',
	    			fillColor: '#d7191c',
	    			color: '#474747',
	    			weight: '1',
	    			dashArray: '',
	    			opacity: '1.0',
	    			fillOpacity: '1.0',
	    		};
	    		break;
	    		case 'Others':
	    		return {
	    			weight: '1.3',
	    			fillColor: '#fdc980',
	    			color: '#474747',
	    			weight: '1',
	    			dashArray: '',
	    			opacity: '1.0',
	    			fillOpacity: '1.0',
	    		};
	    		break;
	    		case 'Public':
	    		return {
	    			weight: '1.3',
	    			fillColor: '#c7e8ad',
	    			color: '#474747',
	    			weight: '1',
	    			dashArray: '',
	    			opacity: '1.0',
	    			fillOpacity: '1.0',
	    		};
	    		break;
	    		case 'Residential':
	    		return {
	    			weight: '1.3',
	    			fillColor: '#2b83ba',
	    			color: '#474747',
	    			weight: '1',
	    			dashArray: '',
	    			opacity: '1.0',
	    			fillOpacity: '1.0',
	    		};
	    		break;
	    	}
	    }

	    function pop_waterwaywithincostaloutline(feature, layer) {                  
	    	var popupContent = '<table><tr><th scope="row">Waterway Name</th><td>' + Autolinker.link(String(feature.properties['name'])) + '</td></tr><tr><th scope="row">Waterway Type</th><td>' + Autolinker.link(String(feature.properties['type'])) + '</td></tr></table>';
	    	layer.bindPopup(popupContent);
	    }

	    function doStylewaterwaywithincostaloutline(feature) {
	    	switch (feature.properties.type) {
	    		case 'canal':
	    		return {
	    			color: '#41ffc0',
	    			weight: '2.3',
	    			dashArray: '',
	    			opacity: '1.0',
	    		};
	    		break;
	    		case 'dam':
	    		return {
	    			color: '#60f2ee',
	    			weight: '2.3',
	    			dashArray: '',
	    			opacity: '1.0',
	    		};
	    		break;
	    		case 'ditch':
	    		return {
	    			color: '#0bd1e6',
	    			weight: '2.3',
	    			dashArray: '',
	    			opacity: '1.0',
	    		};
	    		break;
	    		case 'dock':
	    		return {
	    			color: '#a6bddb',
	    			weight: '2.3',
	    			dashArray: '',
	    			opacity: '1.0',
	    		};
	    		break;
	    		case 'drain':
	    		return {
	    			color: '#74a9cf',
	    			weight: '2.3',
	    			dashArray: '',
	    			opacity: '1.0',
	    		};
	    		break;
	    		case 'river':
	    		return {
	    			color: '#3690c0',
	    			weight: '2.3',
	    			dashArray: '',
	    			opacity: '1.0',
	    		};
	    		break;
	    		case 'stream':
	    		return {
	    			color: '#0570b0',
	    			weight: '2.3',
	    			dashArray: '',
	    			opacity: '1.0',
	    		};
	    		break;
	    		case 'waterfall':
	    		return {
	    			color: '#045a8d',
	    			weight: '2.3',
	    			dashArray: '',
	    			opacity: '1.0',
	    		};
	    		break;
	    		case 'weir':
	    		return {
	    			color: '#023858',
	    			weight: '2.3',
	    			dashArray: '',
	    			opacity: '1.0',
	    		};
	    		break;
	    	}
	    }

	    function pop_SubZoneandPopulation(feature, layer) {					
			var popupContent = '<table><tr><th scope="row">DGPSZ_CODE</th><td>' + Autolinker.link(String(feature.properties['DGPSZ_CODE']))+ '</td></tr><tr><th scope="row">DGPSZ_NAME</th><td>' + Autolinker.link(String(feature.properties['DGPSZ_NAME'])) + '</td></tr><tr><th scope="row">REGION</th><td>' + Autolinker.link(String(feature.properties['REGION']))  + '</td></tr><tr><th scope="row">DGPSZName</th><td>' + Autolinker.link(String(feature.properties['DGPSZName'])) + '</td></tr><tr><th scope="row">Total Population</th><td>' + Autolinker.link(String(feature.properties['TotalPop'])) + '</td></tr><tr><th scope="row">Male Population</th><td>' + Autolinker.link(String(feature.properties['MalePop'])) + '</td></tr><tr><th scope="row">Female Population</th><td>' + Autolinker.link(String(feature.properties['FemalePop'])) + '</td></tr></table>';
			layer.bindPopup(popupContent);
		}

		function doStyleSubZoneandPopulation(feature) {
			if (feature.properties.TotalPop >= 0.0 && feature.properties.TotalPop <= 7741.0) {
				return {
					color: '#848484',
					weight: '1.3',
					fillColor: '#edf8fb',
					opacity: '1.0',
					fillOpacity: '0.6',
				}
			}
			if (feature.properties.TotalPop >= 7741.0 && feature.properties.TotalPop <= 21731.0) {
				return {
					color: '#848484',
					weight: '1.3',
					fillColor: '#b2e2e2',
					opacity: '1.0',
					fillOpacity: '0.6',
				}
			}
			if (feature.properties.TotalPop >= 21731.0 && feature.properties.TotalPop <= 44518.0) {
				return {
					color: '#848484',
					weight: '1.3',
					fillColor: '#66c2a4',
					opacity: '1.0',
					fillOpacity: '0.6',
				}
			}
			if (feature.properties.TotalPop >= 44518.0 && feature.properties.TotalPop <= 87199.0) {
				return {
					color: '#848484',
					weight: '1.3',
					fillColor: '#2ca25f',
					opacity: '1.0',
					fillOpacity: '0.6',
				}
			}
			if (feature.properties.TotalPop >= 87199.0 && feature.properties.TotalPop <= 137152.0) {
				return {
					color: '#848484',
					weight: '1.3',
					fillColor: '#006d2c',
					opacity: '1.0',
					fillOpacity: '0.6',
				}
			}
		}