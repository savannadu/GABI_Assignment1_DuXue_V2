	function processData(data) {
		var timestamps = [];
		var weeks=[];
		var min = Infinity; 
		var max = -Infinity;

		for (var feature in data.features) {

			var properties = data.features[feature].properties; 

			for (var attribute in properties) { 

				// if ( attribute != 'id' &&
				//   	attribute != name’ &&
			 //  		attribute != ‘lat’ &&
		 	// 		 attribute != ‘lon’ ) {
				if(attribute =='FMEL_UPD_D'){	
					if ( $.inArray(properties[attribute],timestamps) === -1) {
					timestamps.push(attribute);		
					}
				} else if (attribute == 'EPIWeek')
					if ( $.inArray(attribute,weeks) === -1) {
					weeks.push(attribute);		
					}

				} else if (attribute == 'COUNT_POST'){

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
			
		dengue = L.geoJson(data, {		

			pointToLayer: function(feature, latlng) {	

			return L.circleMarker(latlng, { 
				 fillColor: "#708598",
				 color: '#537898'
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
		}).addTo(map);
	}