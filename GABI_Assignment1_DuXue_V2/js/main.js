

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

var markersCluster;



function loadScript() {

    $.ajaxSetup({async: false});
	$(document).ready(function() {
/*
 * L.TileLayer.Grayscale is a regular tilelayer with grayscale makeover.
 */

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
			'Google (Satellite)': googleLayerSatellite,
			'Google(Street)': googleLayerStreet,
			'Open Street Maps': openStreeMapLayer
		};
	
		//basemap_0.addTo(map);
		/*pass the */
	   // L.control.layers(basemap_0, {collapsed: false}).addTo(map);
		// var map = L.map('map', {
		//         zoomControl:true, maxZoom:19
		//     }).fitBounds([[1.239634351,103.611407384],[1.48190532348,104.034546575]]);
		// var hash = new L.Hash(map);
		// var additional_attrib = 'created w. <a href="https://github.com/geolicious/qgis2leaf" target ="_blank">qgis2leaf</a> by <a href="http://www.geolicious.de" target ="_blank">Geolicious</a> & contributors<br>';
		// var feature_group = new L.featureGroup([]);
		// var raster_group = new L.LayerGroup([]);
		// //     var basemap_0 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
		// //         attribution: additional_attrib + '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
		// //     }); 
		// //     basemap_0.addTo(map);   
		// var layerOrder=new Array();
		// //dengue case layer
		// var dengueCases = new L.geoJson();
		// $.getJSON("data/Dengue_Case.geojson")    
		//     .done(function(data) {
		//       var info = processData(data);
		//       console.log(info);
		//       createPropSymbols(info.timestamps, info.weeks, data);
			  
		//     })
		//     .fail(function() { alert("There has been a problem loading the data.")});

		// //debug
		
		//console.log(exp_DengueCase);
		//var exp_DengueCaseJSON ;
		});
		//help: process data before deplay on map
		
		
		// var points_rand = L.geoJson(exp_DengueCase, {
	 //    	onEachFeature: function (feature, layer) //functionality on click on feature
	 //        {
	 //        layer.bindPopup("hi! I am one of thousands"); //just to show something in the popup. could be part of the geojson as well!
	 //        }   
		// });
		// map.addLayer(markersCluster);      // add it to the map
		// map.fitBounds(markersCluster.getBounds()); //set view on the cluster exten
	markersCluster = L.markerClusterGroup();
	//console.log(exp_DengueCase);
	$.getJSON("data/Dengue_Case.geojson", function(data) {
    	console.log(data);
    	

   		addMarkerCluster(data);
	});


		// exp_DengueCaseJSON = L.geoJson(exp_DengueCase,{
		// onEachFeature: pop_DengueCase,
		// pointToLayer: function (feature, latlng) {  
		// 	 return L.circleMarker(latlng, { 
		// 		 fillColor: "#f6b800",
		// 		 color: '#ffc92d',
		// 		 weight: 0.5,
		// 		 fillOpacity: 0.6 
		// 		}).on({

		// 			mouseover: function(e) {
		// 				this.openPopup();
		// 				this.setStyle({color: 'yellow'});
		// 			},
		// 			mouseout: function(e) {
		// 				this.closePopup();
		// 				this.setStyle({color: '#537898'});
							
		// 			}

		// 		});
		// 	}
		// });


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
	   
	// //add comment sign to hide this layer on the map in the initial view.
	// feature_group.addLayer(exp_DengueCaseJSON);


		 var overlayMaps = {
			 'Cluster Marker' : markersCluster,
			// 'Dengue Cases': exp_DengueCaseJSON ,
			 'Buildings with Dengue Cases' : exp_SearchBuildWithCasesJSON,
			 'Dengue Cases in 150m Building Buffer': exp_NumCaseInBildingBufferJSON,
			 'Waterways' : exp_waterwaywithincostaloutlineJSON,
			 //'Waterway with 150m Buffer' :exp_waterwaywithincostaloutlinebufferJSON, 
			 'Waterways Intecect Dengue Area' :exp_WaterwayIntercectwithBuildingBufferJSON

			
		 };
		//map.addLayer(openStreeMapLayer);
		map.addLayer(markersCluster);

	   L.control.layers(basemap_0, overlayMaps, {collapsed: false}).addTo(map);
	 // map.fitBounds(markersCluster.getBounds()); //set view on the cluster extent
	   // addLayerChangeEventHandler();
}
	
 	function pop_DengueCase(feature, layer) {                   
			var popupContent = '<table><tr><th scope="row">OBJECTID</th><td>' + Autolinker.link(String(feature.properties['OBJECTID'])) + '</td></tr><tr><th scope="row">POSTAL</th><td>' + Autolinker.link(String(feature.properties['POSTAL'])) + '</td></tr><tr><th scope="row">COUNT_POST</th><td>' + Autolinker.link(String(feature.properties['COUNT_POST'])) + '</td></tr><tr><th scope="row">AREANAME</th><td>' + Autolinker.link(String(feature.properties['AREANAME'])) + '</td></tr><tr><th scope="row">INC_CRC</th><td>' + Autolinker.link(String(feature.properties['INC_CRC'])) + '</td></tr><tr><th scope="row">FMEL_UPD_D</th><td>' + Autolinker.link(String(feature.properties['FMEL_UPD_D'])) + '</td></tr><tr><th scope="row">X_ADDR</th><td>' + Autolinker.link(String(feature.properties['X_ADDR'])) + '</td></tr><tr><th scope="row">Y_ADDR</th><td>' + Autolinker.link(String(feature.properties['Y_ADDR'])) + '</td></tr><tr><th scope="row">EPIWeek</th><td>' + Autolinker.link(String(feature.properties['EPIWeek'])) + '</td></tr><tr><th scope="row">imgIcon</th><td>' + Autolinker.link(String(feature.properties['imgIcon'])) + '</td></tr></table>';
			layer.bindPopup(popupContent);
	}
	//end debug
	function processData(data) {
		var timestamps = [];
		var weeks=[];
		var min = Infinity; 
		var max = -Infinity;

		for (var feature in data.features) {

			var properties = data.features[feature].properties; 

			for (var attribute in properties) { 

				// if ( attribute != 'id' &&
				//      attribute != name’ &&
			 //         attribute != ‘lat’ &&
			//       attribute != ‘lon’ ) {
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

	function createPropSymbols(timestamps, weeks, data) {
			
	   exp_DengueCaseJSON = L.geoJson(data,{
		onEachFeature: pop_DengueCase,
		pointToLayer: function (feature, latlng) {  
			 return L.circleMarker(latlng, { 
				 fillColor: "#708598",
				 color: '#537898',
				 weight: 1,
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
			}
		});

	}
//marker is not displayed

function addMarkerCluster(json) {
    //to modify
    $.each(json.features, function (index, object) {
        //console.log(object.geometry.coordinates);
       // console.log(coordsToLatLng(object.geometry.coordinates));
        //console.log(object.properties['Y_ADDR']);
        var marker = L.marker(new L.LatLng(object.properties['X_ADDR'], object.properties['Y_ADDR']), {});
        //var marker = L.marker( coordsToLatLng(object.geometry.coordinates, false ), {
        //});
       console.log(marker);
       // // var popupContent = '<table><tr><th scope="row">OBJECTID</th><td>' + Autolinker.link(String(feature.properties['OBJECTID'])) + 
       //  '</td></tr><tr><th scope="row">Postal Code</th><td>' + Autolinker.link(String(feature.properties['POSTAL'])) + 
       //  '</td></tr><tr><th scope="row">No. of Cases</th><td>' + Autolinker.link(String(feature.properties['COUNT_POST'])) + 
       //  '</td></tr><tr><th scope="row">Area Name</th><td>' + Autolinker.link(String(feature.properties['AREANAME'])) + 
       //  '</td></tr><tr><th scope="row">Week</th><td>' + Autolinker.link(String(feature.properties['EPIWeek']))+ '</td></tr></table>';

        marker.bindPopup("hi");
        markersCluster.addLayer(marker);
    });
}
	//         pointToLayer: function(feature, latlng) {   

	//         return L.circleMarker(latlng, { 
	//              fillColor: "#708598",
	//              color: '#537898',
	//              weight: 1,
	//              fillOpacity: 0.6 
	//             }).on({

	//                 mouseover: function(e) {
	//                     this.openPopup();
	//                     this.setStyle({color: 'yellow'});
	//                 },
	//                 mouseout: function(e) {
	//                     this.closePopup();
	//                     this.setStyle({color: '#537898'});
							
	//                 }
	//             });
	//         }
	//     });
	//     console.log(dengueCases);
	// }
	


		// //Layer: 'WaterandBuildingBufferClip' classification map
		// function pop_waterandBuildingBufferClip(feature, layer) {                   
		// 	var popupContent = '<table><tr><th scope="row">osm_id</th><td>' + Autolinker.link(String(feature.properties['osm_id'])) + '</td></tr><tr><th scope="row">name</th><td>' + Autolinker.link(String(feature.properties['name'])) + '</td></tr><tr><th scope="row">type</th><td>' + Autolinker.link(String(feature.properties['type'])) + '</td></tr><tr><th scope="row">FID</th><td>' + Autolinker.link(String(feature.properties['FID'])) + '</td></tr><tr><th scope="row">BuildCat</th><td>' + Autolinker.link(String(feature.properties['BuildCat'])) + '</td></tr><tr><th scope="row">PNTCNT</th><td>' + Autolinker.link(String(feature.properties['PNTCNT'])) + '</td></tr><tr><th scope="row">COUNT_POST</th><td>' + Autolinker.link(String(feature.properties['COUNT_POST'])) + '</td></tr></table>';
		// 	layer.bindPopup(popupContent);
		// }

		
		// function doStylewaterandBuildingBufferClip(feature) {
		// 	if (feature.properties.COUNT_POST >= 1.0 && feature.properties.COUNT_POST <= 5.0) {
		// 		return {
		// 			color: '#000000',
		// 			weight: '1.3',
		// 			fillColor: '#f9fb56',
		// 			opacity: '1.0',
		// 			fillOpacity: '1.0',
		// 		}
		// 	}
		// 	if (feature.properties.COUNT_POST >= 5.0 && feature.properties.COUNT_POST <= 10.0) {
		// 		return {
		// 			color: '#000000',
		// 			weight: '1.3',
		// 			fillColor: '#ff7200',
		// 			opacity: '1.0',
		// 			fillOpacity: '1.0',
		// 		}
		// 	}
		// 	if (feature.properties.COUNT_POST >= 10.0 && feature.properties.COUNT_POST <= 53.0) {
		// 		return {
		// 			color: '#000000',
		// 			weight: '1.3',
		// 			fillColor: '#e31a1c',
		// 			opacity: '1.0',
		// 			fillOpacity: '1.0',
		// 		}
		// 	}
		// }

		// var exp_waterandBuildingBufferClipJSON = new L.geoJson(exp_waterandBuildingBufferClip,{
		// 	onEachFeature: pop_waterandBuildingBufferClip,
		// 	style: doStylewaterandBuildingBufferClip
		// });
		//add comment sign to hide this layer on the map in the initial view.
	   // feature_group.addLayer(exp_waterandBuildingBufferClipJSON);
		//feature_group.addLayer(dengueCases);

	    function pop_WaterwayIntercectwithBuildingBuffer(feature, layer) {                  
	        var popupContent = '<table><tr><th scope="row">osm_id</th><td>' + Autolinker.link(String(feature.properties['osm_id'])) + '</td></tr><tr><th scope="row">name</th><td>' + Autolinker.link(String(feature.properties['name'])) + '</td></tr><tr><th scope="row">type</th><td>' + Autolinker.link(String(feature.properties['type'])) + '</td></tr><tr><th scope="row">width</th><td>' + Autolinker.link(String(feature.properties['width'])) + '</td></tr><tr><th scope="row">FID</th><td>' + Autolinker.link(String(feature.properties['FID'])) + '</td></tr></table>';
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
	    
	//     //add comment sign to hide this layer on the map in the initial view.
	//     feature_group.addLayer(exp_WaterwayIntercectwithBuildingBufferJSON);
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

	//     layerOrder[layerOrder.length] = exp_waterwaywithincostaloutlinebufferJSON;
	//     for (index = 0; index < layerOrder.length; index++) {
	//         feature_group.removeLayer(layerOrder[index]);feature_group.addLayer(layerOrder[index]);
	//     }
	//     //add comment sign to hide this layer on the map in the initial view.
	//     feature_group.addLayer(exp_waterwaywithincostaloutlinebufferJSON);
	    function pop_NumCaseInBildingBuffer(feature, layer) {                   
	        var popupContent = '<table><tr><th scope="row">osm_id</th><td>' + Autolinker.link(String(feature.properties['osm_id'])) + '</td></tr><tr><th scope="row">name</th><td>' + Autolinker.link(String(feature.properties['name'])) + '</td></tr><tr><th scope="row">type</th><td>' + Autolinker.link(String(feature.properties['type'])) + '</td></tr><tr><th scope="row">FID</th><td>' + Autolinker.link(String(feature.properties['FID'])) + '</td></tr><tr><th scope="row">BuildCat</th><td>' + Autolinker.link(String(feature.properties['BuildCat'])) + '</td></tr><tr><th scope="row">PNTCNT</th><td>' + Autolinker.link(String(feature.properties['PNTCNT'])) + '</td></tr><tr><th scope="row">COUNT_POST</th><td>' + Autolinker.link(String(feature.properties['COUNT_POST'])) + '</td></tr></table>';
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

	//     //add comment sign to hide this layer on the map in the initial view.
	//     feature_group.addLayer(exp_NumCaseInBildingBufferJSON);
	    function pop_SearchBuildWithCases(feature, layer) {                 
	        
	        var popupContent = '<table><tr><th scope="row">osm_id</th><td>' + Autolinker.link(String(feature.properties['osm_id'])) + '</td></tr><tr><th scope="row">name</th><td>' + Autolinker.link(String(feature.properties['name'])) + '</td></tr><tr><th scope="row">type</th><td>' + Autolinker.link(String(feature.properties['type'])) + '</td></tr><tr><th scope="row">FID</th><td>' + Autolinker.link(String(feature.properties['FID'])) + '</td></tr><tr><th scope="row">BuildCat</th><td>' + Autolinker.link(String(feature.properties['BuildCat'])) + '</td></tr></table>';
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
	   
	//     //add comment sign to hide this layer on the map in the initial view.
	//     feature_group.addLayer(exp_SearchBuildWithCasesJSON);
	//     function pop_buildingwithincostaloutline(feature, layer) {                  
	//         var popupContent = '<table><tr><th scope="row">osm_id</th><td>' + Autolinker.link(String(feature.properties['osm_id'])) + '</td></tr><tr><th scope="row">name</th><td>' + Autolinker.link(String(feature.properties['name'])) + '</td></tr><tr><th scope="row">type</th><td>' + Autolinker.link(String(feature.properties['type'])) + '</td></tr><tr><th scope="row">FID</th><td>' + Autolinker.link(String(feature.properties['FID'])) + '</td></tr><tr><th scope="row">BuildCat</th><td>' + Autolinker.link(String(feature.properties['BuildCat'])) + '</td></tr><tr><th scope="row">AREA</th><td>' + Autolinker.link(String(feature.properties['AREA'])) + '</td></tr><tr><th scope="row">PERIMETER</th><td>' + Autolinker.link(String(feature.properties['PERIMETER'])) + '</td></tr></table>';
	//         layer.bindPopup(popupContent);
	//     }

	//     function doStylebuildingwithincostaloutline(feature) {
	//         switch (feature.properties.BuildCat) {
	//             case 'Commercial':
	//                 return {
	//                     weight: '1.3',
	//                     fillColor: '#dbfb96',
	//                     color: '#000000',
	//                     weight: '1',
	//                     dashArray: '',
	//                     opacity: '1.0',
	//                     fillOpacity: '1.0',
	//                 };
	//                 break;
	//             case 'Educational':
	//                 return {
	//                     weight: '1.3',
	//                     fillColor: '#cff197',
	//                     color: '#353535',
	//                     weight: '1',
	//                     dashArray: '',
	//                     opacity: '1.0',
	//                     fillOpacity: '1.0',
	//                 };
	//                 break;
	//             case 'Agricultural':
	//                 return {
	//                     weight: '1.3',
	//                     fillColor: '#c4e898',
	//                     color: '#353535',
	//                     weight: '1',
	//                     dashArray: '',
	//                     opacity: '1.0',
	//                     fillOpacity: '1.0',
	//                 };
	//                 break;
	//             case 'Industrial':
	//                 return {
	//                     weight: '1.3',
	//                     fillColor: '#a9db8e',
	//                     color: '#353535',
	//                     weight: '1',
	//                     dashArray: '',
	//                     opacity: '1.0',
	//                     fillOpacity: '1.0',
	//                 };
	//                 break;
	//             case 'Medical':
	//                 return {
	//                     weight: '1.3',
	//                     fillColor: '#88cd80',
	//                     color: '#353535',
	//                     weight: '1',
	//                     dashArray: '',
	//                     opacity: '1.0',
	//                     fillOpacity: '1.0',
	//                 };
	//                 break;
	//             case 'Others':
	//                 return {
	//                     weight: '1.3',
	//                     fillColor: '#68be70',
	//                     color: '#353535',
	//                     weight: '1',
	//                     dashArray: '',
	//                     opacity: '1.0',
	//                     fillOpacity: '1.0',
	//                 };
	//                 break;
	//             case 'Public':
	//                 return {
	//                     weight: '1.3',
	//                     fillColor: '#48ae60',
	//                     color: '#353535',
	//                     weight: '1',
	//                     dashArray: '',
	//                     opacity: '1.0',
	//                     fillOpacity: '1.0',
	//                 };
	//                 break;
	//             case 'Religious':
	//                 return {
	//                     weight: '1.3',
	//                     fillColor: '#2da95e',
	//                     color: '#353535',
	//                     weight: '1',
	//                     dashArray: '',
	//                     opacity: '1.0',
	//                     fillOpacity: '1.0',
	//                 };
	//                 break;
	//             case 'Residential':
	//                 return {
	//                     weight: '1.3',
	//                     fillColor: '#1ec486',
	//                     color: '#353535',
	//                     weight: '1',
	//                     dashArray: '',
	//                     opacity: '1.0',
	//                     fillOpacity: '1.0',
	//                 };
	//                 break;
	//             case 'Transport':
	//                 return {
	//                     weight: '1.3',
	//                     fillColor: '#10dfaf',
	//                     color: '#353535',
	//                     weight: '1',
	//                     dashArray: '',
	//                     opacity: '1.0',
	//                     fillOpacity: '1.0',
	//                 };
	//                 break;
	//         }
	//     }
	//     var exp_buildingwithincostaloutlineJSON = new L.geoJson(exp_buildingwithincostaloutline,{
	//         onEachFeature: pop_buildingwithincostaloutline,
	//         style: doStylebuildingwithincostaloutline
	//     });
	//     //add comment sign to hide this layer on the map in the initial view.
	//     feature_group.addLayer(exp_buildingwithincostaloutlineJSON);
	    function pop_waterwaywithincostaloutline(feature, layer) {                  
	        var popupContent = '<table><tr><th scope="row">osm_id</th><td>' + Autolinker.link(String(feature.properties['osm_id'])) + '</td></tr><tr><th scope="row">name</th><td>' + Autolinker.link(String(feature.properties['name'])) + '</td></tr><tr><th scope="row">type</th><td>' + Autolinker.link(String(feature.properties['type'])) + '</td></tr><tr><th scope="row">width</th><td>' + Autolinker.link(String(feature.properties['width'])) + '</td></tr><tr><th scope="row">FID</th><td>' + Autolinker.link(String(feature.properties['FID'])) + '</td></tr></table>';
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
	    
	//     //add comment sign to hide this layer on the map in the initial view.
	//     feature_group.addLayer(exp_waterwaywithincostaloutlineJSON);
		

	//	feature_group.addTo(map);
	//     var title = new L.Control();
	//     title.onAdd = function (map) {
	//         this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
	//         this.update();
	//         return this._div;
	//     };
	//     title.update = function () {
	//         this._div.innerHTML = '<h2>Dengue Cases Distribution 2013</h2>'
	//     };
	//     title.addTo(map);
	// var baseMaps = {
	//     'OSM Standard': basemap_0
	// };
	//     L.control.layers(baseMaps,{"DengueCase": exp_DengueCaseJSON,"waterwaywithincostaloutline": exp_waterwaywithincostaloutlineJSON,"buildingwithincostaloutline": exp_buildingwithincostaloutlineJSON,"SearchBuildWithCases": exp_SearchBuildWithCasesJSON,"NumCaseInBildingBuffer": exp_NumCaseInBildingBufferJSON,"waterwaywithincostaloutlinebuffer": exp_waterwaywithincostaloutlinebufferJSON,"WaterwayIntercectwithBuildingBuffer": exp_WaterwayIntercectwithBuildingBufferJSON,"waterandBuildingBufferClip": exp_waterandBuildingBufferClipJSON},{collapsed:false}).addTo(map);
	//     L.control.scale({options: {position: 'bottomleft',maxWidth: 100,metric: true,imperial: false,updateWhenIdle: false}}).addTo(map);
	//});