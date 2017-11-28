/**-----Home----**/
function railroadMainMap(){
	var me = this;
	
	//me.tempMarker = new google.maps.Marker({zIndex: 10, icon: {anchor: new google.maps.Point(16,14), size: new google.maps.Size(33,29), url: "img/georgetown_33_29.png"}});
	
	me.usersOnMap = [];
	me.npsOnMap = [];
	me.officeNetwork = [];
	me.officeLocations = [];
	me.bubble = null;
	me.npbubble = null;

	me.intervals = [];
	
	var DARK_MAP = 'custom_style';
	
	me.mapstyle = [
		  {
			"featureType": "water",
			"elementType": "geometry",
			"stylers": [
			  { "color": "#373737" }
			]
		  },{
			"featureType": "water",
			"elementType": "labels",
			"stylers": [
			  { "color": "#585858" },
			  { "weight": 0.4 }
			]
		  },{
			"featureType": "landscape.natural",
			"stylers": [
			  { "color": "#1e1e1e" }
			]
		  },{
			"featureType": "landscape.man_made",
			"stylers": [
			  { "visibility": "off" }
			]
		  },{
			"featureType": "poi",
			"stylers": [
			  { "visibility": "off" }
			]
		  },{
			"featureType": "road",
			"stylers": [
			  { "visibility": "simplified" },
			  { "color": "#808080" }
			]
		  },{
		  },{
			"featureType": "administrative",
			"elementType": "labels.text",
			"stylers": [
			  { "visibility": "on" },
			  { "color": "#808080" },
			  { "weight": 0.1 },
			  { "lightness": 27 },
			  { "saturation": 1 },
			  { "hue": "#ff0000" },
			  { "gamma": 1 }
			]
		  },
		  {
			"featureType": "administrative.country",
			"elementType": "geometry",
			"stylers": [
			  { "weight": 0.5 }
			]
		  },{
			"featureType": "administrative.province",
			"elementType": "geometry",
			"stylers": [
			  { "weight": 0.5 }
			]
		  },{
			"featureType": "administrative.locality",
			"elementType": "geometry",
			"stylers": [
			  { "weight": 0.5 }
			]
		  },{
			"featureType": "administrative.neighborhood",
			"stylers": [
			  { "weight": 0.5 }
			]
		  },		  
		  {
			"featureType": "transit",
			"stylers": [
			  { "visibility": "off" }
			]
		  },{
			"featureType": "road",
			"elementType": "labels",
			"stylers": [
			  { "visibility": "off" }
			]
		  }
	];
	
	var customMapType = new google.maps.StyledMapType(me.mapstyle, {name:"Dark"});
	
	me.map = new google.maps.Map(document.getElementById('railroad-map'), {
		center: new google.maps.LatLng(32.33888927939217, 6.1015625),
		zoom:2,
		mapTypeControlOptions: {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID, DARK_MAP]
		},		
		mapTypeId: DARK_MAP,
		panControl: false,
		streetViewControl: false,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.SMALL
		}		
	});
	
	me.map.mapTypes.set(DARK_MAP, customMapType);
	//me.tempMarker.setOptions({map: me.map, position: new google.maps.LatLng(38.907682,-77.07182)});
	
	//Listeners

	google.maps.event.addListener(me.map, "click", function(){
		clearIntervals();
		me.clearOfficeNetwork();
		if(me.bubble != null){
			if(me.bubble.isOpen()){me.bubble.close();}
		}
		if(me.npbubble != null){
			if(me.npbubble.isOpen()){me.npbubble.close();}
		}
		me.showNonProfits();
	});
	
	google.maps.event.addListener(me.map, "zoom_changed", function(){
		if(me.map.getZoom()<2){me.map.setZoom(2);return;}
		var czl = me.map.getZoom();
		switch(true){
			case (czl<3):
				me.resizeIcons(16);
				//me.tempMarker.setOptions({icon: {anchor: new google.maps.Point(16,14), size: new google.maps.Size(33,29), url: "img/georgetown_33_29.png"}});
			break;
			case (czl>2 && czl<16):
				me.resizeIcons(32);
				//me.tempMarker.setOptions({icon: {anchor: new google.maps.Point(33,29), size: new google.maps.Size(66,58), url: "img/georgetown_66_58.png"}});
			break;
			case (czl>15 && czl<23):
				me.resizeIcons(64);
				//me.tempMarker.setOptions({icon: {anchor: new google.maps.Point(33,29), size: new google.maps.Size(66,58), url: "img/georgetown_66_58.png"}});
			break;
		}
	});
	
	//Resizing method
	
	me.resizeIcons = function(size){
		switch(size){
			case 16:
				for(i=0;i<me.usersOnMap.length;i++){
					me.usersOnMap[i].setOptions({icon: {anchor: new google.maps.Point(8,8), size: new google.maps.Size(16,16), url: "http://localhost:8080/src/assets/light_bulb_16.png"}});
				}				
				if(me.officeLocations.length>0){
					for(i=0;i<me.officeLocations.length;i++){
						me.officeLocations[i].setOptions({icon: {anchor: new google.maps.Point(8,8), size: new google.maps.Size(16,16), url: "http://localhost:8080/src/assets/star_16.png"}});
					}
				}
				for(i=0;i<me.npsOnMap.length;i++){
					me.npsOnMap[i].setOptions({icon: {anchor: new google.maps.Point(8,8), size: new google.maps.Size(16,16), url: "http://localhost:8080/src/assets/star_16.png"}});
				}				
			break;
			case 32:
				for(i=0;i<me.usersOnMap.length;i++){
					me.usersOnMap[i].setOptions({icon: {anchor: new google.maps.Point(16,16), size: new google.maps.Size(32,32), url: "http://localhost:8080/src/assets/light_bulb_32.png"}});
				}
				if(me.officeLocations.length>0){
					for(i=0;i<me.officeLocations.length;i++){
						me.officeLocations[i].setOptions({icon: {anchor: new google.maps.Point(16,16), size: new google.maps.Size(32,32), url: "http://localhost:8080/src/assets/star_32.png"}});
					}
				}
				if(me.npsOnMap.length>0){
					for(i=0;i<me.npsOnMap.length;i++){
						me.npsOnMap[i].setOptions({icon: {anchor: new google.maps.Point(16,16), size: new google.maps.Size(32,32), url: "http://localhost:8080/src/assets/star_32.png"}});
					}					
				}
			break;
			case 64:
				for(i=0;i<me.usersOnMap.length;i++){
					me.usersOnMap[i].setOptions({icon: {anchor: new google.maps.Point(32,32), size: new google.maps.Size(64,64), url: "http://localhost:8080/src/assets/light_bulb_64.png"}});
				}
				if(me.officeLocations.length>0){
					for(i=0;i<me.officeLocations.length;i++){
						me.officeLocations[i].setOptions({icon: {anchor: new google.maps.Point(32,32), size: new google.maps.Size(64,64), url: "http://localhost:8080/src/assets/star_64.png"}});
					}
				}	
				if(me.npsOnMap.length>0){
					for(i=0;i<me.npsOnMap.length;i++){
						me.npsOnMap[i].setOptions({icon: {anchor: new google.maps.Point(32,32), size: new google.maps.Size(64,64), url: "http://localhost:8080/src/assets/star_64.png"}});
					}	
				}				
			break;			
		}
	}
	
	//Geolocation method
	
	me.geoLocate = function(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(function(data){
				$(".calltoaction").remove();
				$(".map-ui").prepend($('<div class="calltoaction"><p>Join <a href="user-sign-up.php">now</a> to help free slaves, and turn your red marker into a lamp of freedom!</p></div>'));						
				plotUserLocation(data);
			}, 
			function(error){
				//Do this here if user disallows to share her location
				$.get("php/ipgeo.php", plotUserLocation);
			});
		}
		else 
		{	
			//HTML5 Geolocation not supported
			$.get("php/ipgeo.php", plotUserLocation);
		}		
	}
	
	me.clearOfficeNetwork = function(){
		while(me.officeNetwork[0]){
			me.officeNetwork.pop().setMap(null);
		}
		me.officeNetwork.length = 0;
		
		while(me.officeLocations[0]){
			me.officeLocations.pop().setMap(null);
		}
		me.officeLocations.length = 0;		
	}
	
	me.hideNonProfits = function(){
		for(i=0;i<me.npsOnMap.length;i++){
			me.npsOnMap[i].setVisible(false);
		}
	}

	me.showNonProfits = function(){
		for(i=0;i<me.npsOnMap.length;i++){
			me.npsOnMap[i].setVisible(true);
		}
	}
	
	me.loadUsers = function(callback){
		//$.post("php/op.php",{data:JSON.stringify({subject: "load_users"})}, callback);
	}
		
	me.plotUser = function(userdata){
		
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(userdata.user_latitude, userdata.user_longitude),
			icon: {anchor: new google.maps.Point(8,8), size: new google.maps.Size(16,16), url: "http://localhost:8080/src/assets/light_bulb_16.png"},
			map: me.map,
			zIndex: 1
		});
		
		//marker.user_id = userdata.user_id; 
		
		google.maps.event.addListener(marker, "click", function(){
			me.clearOfficeNetwork();
			me.hideNonProfits();
			
			for(i in userdata.user_nonprofits){
				var d = userdata.user_nonprofits[i];
				for(j in d.offices){
					var p = new google.maps.Polyline({
						geodesic:false,
						path: curved_line_generate({
							latStart: marker.getPosition().lat(), 
							lngStart: marker.getPosition().lng(), 
							latEnd: new google.maps.LatLng(d.offices[j].lat, d.offices[j].lng).lat(), 
							lngEnd: new google.maps.LatLng(d.offices[j].lat, d.offices[j].lng).lng()
						}),
						map: me.map,
						strokeColor: '#4475b7',
						strokeOpacity: 1.0,
						strokeWeight: 2,
						icons: [{
							icon: {path: google.maps.SymbolPath.CIRCLE,scale: 2,strokeColor: '#4475b7'},
							offset: '100%'
						}]						
					});
					
					//p.user_id = userdata.user_id;
					
					//animateCircle(p);
					
					me.officeNetwork.push(p);	

					
					var m = new google.maps.Marker({
						position: new google.maps.LatLng(d.offices[j].lat, d.offices[j].lng),
						map: me.map,
						icon: {anchor: new google.maps.Point(8,8), size: new google.maps.Size(16,16), url: "http://localhost:8080/src/assets/star_16.png"}
					});
					
					m.name = d.name;
					m.description = d.description;
					m.url = d.url;
					m.picture = d.picture;
					
					userNonPListener(m);
					
					me.officeLocations.push(m);
				}
			}
			
			if(me.bubble != null){me.bubble.close();}

			//Show bubbles
			me.bubble = new InfoBubble({
				map: me.map,
				shadowStyle: 1,
				borderRadius: 4,
				arrowSize: 10,
				borderWidth: 1,
				borderColor: '#BFBFBF',
				disableAutoPan: true,
				hideCloseButton: false,
				arrowPosition: 50,
				arrowStyle: 0
			});
			
			//me.bubble.setBubbleOffset(150,150);
			
			google.maps.event.addListener(me.bubble, "closeclick", function(){
				clearIntervals();
				me.clearOfficeNetwork();
				me.showNonProfits();
			});

			google.maps.event.addListener(me.bubble, "domready", function(){
				//Attach the below click event after a 500ms delay
				setTimeout(function(){
				
					storeMapView();
					
					$(".see-tracks").click(function(){
						me.animatePolylines();
					});
				}, 500);
			});
			
			me.bubble.setContent("<div class='bubble'><strong class='username'>" + userdata.user_firstname + " " + userdata.user_lastname + "</strong><div class='bubble-avatar' style='background:url(" + userdata.user_picture + ") no-repeat center;background-size:contain;'></div><div class='bubble-attributes'><a href='javascript:void(0)' class='see-tracks'>See my tracks</a></div><div class='bubble-btn-profile'><a href='p/" + userdata.user_id + "/" + userdata.user_firstname + "-" + userdata.user_lastname + "' target='_blank' class='btn-bubble-visitprofile'>View profile</a></div></div>");
			me.bubble.open(me.map, marker);

			
		});
		me.usersOnMap.push(marker);
	}

	me.loadNonprofit= function(callback){
		//$.post("php/op.php",{data:JSON.stringify({subject: "load_nonprofit"})}, callback);

		[{"np_npid":"18","np_description":"CAST provides comprehensive long-term services through a three-pronged empowerment approach which includes Social Services, Legal Services, and Outreach and Training.","np_name":"Coalition to Abolish Slavery","np_picture":"uploads\/logo_cast_1386373965_1389017678.jpg","np_link":"http:\/\/www.castla.org\/","np_location":"Los Angeles, CA","np_latitude":34.052235,"np_longitude":-118.243683},{"np_npid":"10","np_description":"The mission of Living Waters for Girls is to rescue, rehabilitate and restore commercially sexually exploited girls by providing safe refuge and holistic therapeutic services.","np_name":"Living Water for Girls","np_picture":"uploads\/living_1389017915.png","np_link":"http:\/\/www.livingwaterforgirls.org\/","np_location":"Banda Aceh, Aceh, Indonesia","np_latitude":5.55,"np_longitude":95.316666},{"np_npid":"10","np_description":"The mission of Living Waters for Girls is to rescue, rehabilitate and restore commercially sexually exploited girls by providing safe refuge and holistic therapeutic services.","np_name":"Living Water for Girls","np_picture":"uploads\/living_1389017915.png","np_link":"http:\/\/www.livingwaterforgirls.org\/","np_location":"Dhaka, Dhaka Division, Bangladesh","np_latitude":23.709921,"np_longitude":90.407143},{"np_npid":"10","np_description":"The mission of Living Waters for Girls is to rescue, rehabilitate and restore commercially sexually exploited girls by providing safe refuge and holistic therapeutic services.","np_name":"Living Water for Girls","np_picture":"uploads\/living_1389017915.png","np_link":"http:\/\/www.livingwaterforgirls.org\/","np_location":"Thimphu, Bhutan","np_latitude":27.44261,"np_longitude":89.667328},{"np_npid":"7","np_description":"Working with thousands of local partner organizations, we work with people living in poverty striving to exercise their human rights.","np_name":"Oxfam International","np_picture":"uploads\/oxfam-250_0_1386846792_1389017943.jpg","np_link":"http:\/\/www.oxfam.org","np_location":"Melbourne, Victoria, Australia","np_latitude":-37.814106,"np_longitude":144.963287},{"np_npid":"7","np_description":"Working with thousands of local partner organizations, we work with people living in poverty striving to exercise their human rights.","np_name":"Oxfam International","np_picture":"uploads\/oxfam-250_0_1386846792_1389017943.jpg","np_link":"http:\/\/www.oxfam.org","np_location":"K\u00f6ln, Germany","np_latitude":50.937531,"np_longitude":6.960279},{"np_npid":"7","np_description":"Working with thousands of local partner organizations, we work with people living in poverty striving to exercise their human rights.","np_name":"Oxfam International","np_picture":"uploads\/oxfam-250_0_1386846792_1389017943.jpg","np_link":"http:\/\/www.oxfam.org","np_location":"Algiers, Algeria","np_latitude":36.752888,"np_longitude":3.042048},{"np_npid":"3","np_description":"Daily Source is a non profit in the Eastern USA","np_name":"Daily Source","np_picture":"uploads\/DS_1389319624.jpg","np_link":"http:\/\/www.dailysource.com","np_location":"San Francisco, CA, United States","np_latitude":37.774929,"np_longitude":-122.419418},{"np_npid":"3","np_description":"Daily Source is a non profit in the Eastern USA","np_name":"Daily Source","np_picture":"uploads\/DS_1389319624.jpg","np_link":"http:\/\/www.dailysource.com","np_location":"New York City, NY, United States","np_latitude":40.714352,"np_longitude":-74.005974},{"np_npid":"3","np_description":"Daily Source is a non profit in the Eastern USA","np_name":"Daily Source","np_picture":"uploads\/DS_1389319624.jpg","np_link":"http:\/\/www.dailysource.com","np_location":"Los Angeles, CA, United States","np_latitude":34.052235,"np_longitude":-118.243683},{"np_npid":"3","np_description":"Daily Source is a non profit in the Eastern USA","np_name":"Daily Source","np_picture":"uploads\/DS_1389319624.jpg","np_link":"http:\/\/www.dailysource.com","np_location":"Anchorage, AK, United States","np_latitude":61.218056,"np_longitude":-149.900284},{"np_npid":"3","np_description":"Daily Source is a non profit in the Eastern USA","np_name":"Daily Source","np_picture":"uploads\/DS_1389319624.jpg","np_link":"http:\/\/www.dailysource.com","np_location":"Tokyo, Japan","np_latitude":35.689487,"np_longitude":139.691711},{"np_npid":"3","np_description":"Daily Source is a non profit in the Eastern USA","np_name":"Daily Source","np_picture":"uploads\/DS_1389319624.jpg","np_link":"http:\/\/www.dailysource.com","np_location":"Manila, Metro Manila, Philippines","np_latitude":14.599512,"np_longitude":120.984222},{"np_npid":"2","np_description":"Motivating, Inspiring, Supporting, and Serving Sexually Exploited Youth (MISSSEY) advocates and facilitates the empowerment and inner transformation of sexually exploited youth by holistically addressing their specific needs. MISSSEY collaborates to bring about systemic and community change to prevent the sexual exploitation of children and youth through raising awareness, education and policy development.","np_name":"MISSSEY","np_picture":"uploads\/misssey_1389319644.jpg","np_link":"http:\/\/misssey.org\/index.html","np_location":"New York, NY","np_latitude":40.714352,"np_longitude":-74.005974},{"np_npid":"2","np_description":"Motivating, Inspiring, Supporting, and Serving Sexually Exploited Youth (MISSSEY) advocates and facilitates the empowerment and inner transformation of sexually exploited youth by holistically addressing their specific needs. MISSSEY collaborates to bring about systemic and community change to prevent the sexual exploitation of children and youth through raising awareness, education and policy development.","np_name":"MISSSEY","np_picture":"uploads\/misssey_1389319644.jpg","np_link":"http:\/\/misssey.org\/index.html","np_location":"Tokyo, Japan","np_latitude":35.689487,"np_longitude":139.691711},{"np_npid":"17","np_description":"ZOE Children\u2019s Homes is an international Christian organization that rescues children who are at high risk of being sold into slavery, have already been victimized as slaves, have been orphaned, or have suffered other heinous forms of abuse.","np_name":"ZOE Children's Homes","np_picture":"uploads\/zoe_1386371819_1389017860.jpg","np_link":"http:\/\/www.zoechildren.org\/","np_location":"Bangkok Thailand","np_latitude":13.727896,"np_longitude":100.524124},{"np_npid":"17","np_description":"ZOE Children\u2019s Homes is an international Christian organization that rescues children who are at high risk of being sold into slavery, have already been victimized as slaves, have been orphaned, or have suffered other heinous forms of abuse.","np_name":"ZOE Children's Homes","np_picture":"uploads\/zoe_1386371819_1389017860.jpg","np_link":"http:\/\/www.zoechildren.org\/","np_location":"S\u00e3o Paulo, Brazil","np_latitude":-23.55052,"np_longitude":-46.633308},{"np_npid":"8","np_description":"International Justice Mission is a human rights agency that secures justice for victims of slavery, sexual exploitation and other forms of violent oppression.","np_name":"International Justice Mission","np_picture":"uploads\/ijm_1389320016.jpg","np_link":"http:\/\/www.ijm.org","np_location":"HongKong, Hong Kong","np_latitude":22.396427,"np_longitude":114.109497},{"np_npid":"8","np_description":"International Justice Mission is a human rights agency that secures justice for victims of slavery, sexual exploitation and other forms of violent oppression.","np_name":"International Justice Mission","np_picture":"uploads\/ijm_1389320016.jpg","np_link":"http:\/\/www.ijm.org","np_location":"Dubai - United Arab Emirates","np_latitude":25.271139,"np_longitude":55.307484},{"np_npid":"8","np_description":"International Justice Mission is a human rights agency that secures justice for victims of slavery, sexual exploitation and other forms of violent oppression.","np_name":"International Justice Mission","np_picture":"uploads\/ijm_1389320016.jpg","np_link":"http:\/\/www.ijm.org","np_location":"Lagos, Nigeria","np_latitude":6.441158,"np_longitude":3.417977},{"np_npid":"13","np_description":"The mission of Slavery No More is to resource a diversity of the most effective organizations working to combat and abolish modern-day slavery and human trafficking, and to create awareness and a diversity of opportunities for meaningful personal engagement.","np_name":"Slavery No More","np_picture":"uploads\/logo_slavery-no-more_1389320115.png","np_link":"http:\/\/www.slaverynomore.org\/","np_location":"Calabasas, CA, United States","np_latitude":34.138332,"np_longitude":-118.660835},{"np_npid":"15","np_description":"Rapha House programs exist to extend unconditional love to girls who have been rescued out of slavery and sexual exploitation.  Every member of the Rapha House staff has dedicated his or herself to seeing each child at Rapha House restored to sustainable freedom.","np_name":"Raphahouse","np_picture":"uploads\/rapha_1389320309.jpg","np_link":"http:\/\/www.raphahouse.org\/","np_location":"Antananarivo, Madagascar","np_latitude":-18.914871,"np_longitude":47.531612},{"np_npid":"15","np_description":"Rapha House programs exist to extend unconditional love to girls who have been rescued out of slavery and sexual exploitation.  Every member of the Rapha House staff has dedicated his or herself to seeing each child at Rapha House restored to sustainable freedom.","np_name":"Raphahouse","np_picture":"uploads\/rapha_1389320309.jpg","np_link":"http:\/\/www.raphahouse.org\/","np_location":"Phnom Penh, Cambodia","np_latitude":11.558831,"np_longitude":104.917442},{"np_npid":"5","np_description":"Every day, Kiva connects thousands of people to borrowers and partner institutions around the world, working together to create opportunity and alleviate poverty.","np_name":"KIVA","np_picture":"uploads\/kiva_1389320331.jpg","np_link":"http:\/\/www.kiva.org\/","np_location":"Dallas, TX","np_latitude":32.78014,"np_longitude":-96.800453},{"np_npid":"4","np_description":"Streetlight\u2019s Mission is to Eradicate Child Sex Slavery through a 3-tier strategy of Awareness, Prevention, and Aftercare.","np_name":"Streetlight","np_picture":"uploads\/streetlight_1389320349.jpg","np_link":"http:\/\/www.streetlightphx.com\/","np_location":"San Diego, CA","np_latitude":32.715328,"np_longitude":-117.157257},{"np_npid":"4","np_description":"Streetlight\u2019s Mission is to Eradicate Child Sex Slavery through a 3-tier strategy of Awareness, Prevention, and Aftercare.","np_name":"Streetlight","np_picture":"uploads\/streetlight_1389320349.jpg","np_link":"http:\/\/www.streetlightphx.com\/","np_location":"Phoenix, AZ, United States","np_latitude":33.448376,"np_longitude":-112.074036},{"np_npid":"4","np_description":"Streetlight\u2019s Mission is to Eradicate Child Sex Slavery through a 3-tier strategy of Awareness, Prevention, and Aftercare.","np_name":"Streetlight","np_picture":"uploads\/streetlight_1389320349.jpg","np_link":"http:\/\/www.streetlightphx.com\/","np_location":"Vientiane, Vientiane Prefecture, Laos","np_latitude":17.962769,"np_longitude":102.614426},{"np_npid":"11","np_description":"The Freedom Project exists to end human trafficking and slavery. We\u2019re building and equipping a community in the free world to help rescue and restore those enslaved around the world.","np_name":"The Freedom Project","np_picture":"uploads\/freedom project_1389320522.png","np_link":"http:\/\/www.thefreedomproject.org\/","np_location":"Mumbai, Maharashtra, India","np_latitude":19.075983,"np_longitude":72.877655},{"np_npid":"19","np_description":"Treasures is a unique, faith-based outreach and support group for women in the sex industry, including victims of commercialized sexual exploitation and trafficking. As the only organization of its kind based in the adult industry capital of the world (San Fernando Valley in Los Angeles County), our mission is to reach, restore and equip women in order to help them live healthy, flourishing lives.","np_name":"Treasures Ministry","np_picture":"uploads\/treasures_1389320587.png","np_link":"http:\/\/www.iamatreasure.com\/","np_location":"San Francisco, CA","np_latitude":37.774929,"np_longitude":-122.419418},{"np_npid":"19","np_description":"Treasures is a unique, faith-based outreach and support group for women in the sex industry, including victims of commercialized sexual exploitation and trafficking. As the only organization of its kind based in the adult industry capital of the world (San Fernando Valley in Los Angeles County), our mission is to reach, restore and equip women in order to help them live healthy, flourishing lives.","np_name":"Treasures Ministry","np_picture":"uploads\/treasures_1389320587.png","np_link":"http:\/\/www.iamatreasure.com\/","np_location":"Jakarta, Indonesia","np_latitude":-6.211544,"np_longitude":106.845169},{"np_npid":"12","np_description":"Freedom For All is a non-governmental organisation created to draw attention to human rights' abuses and to campaign for the basic and fundamental freedoms enshrined in numerous United Nations' Organisations' treaties and conventions which call upon governments to respect and uphold the rights of all peoples within their jurisdictions.","np_name":"Freedom For All","np_picture":"uploads\/freedom for all_1389747192.jpg","np_link":"http:\/\/www.freedom-for-all.org\/","np_location":"Seattle, WA, United States","np_latitude":47.606209,"np_longitude":-122.332069},{"np_npid":"6","np_description":"As the nation\u2019s leading domestic hunger-relief charity, our food bank network members supply food to more than 37 million Americans each year, including 14 million children and 3 million seniors. Feeding America benefits from the unique relationship between our 202 local member food banks at the front lines of hunger relief and the central efforts of our national office.","np_name":"Feeding America","np_picture":"uploads\/feeding america_1389747217.jpg","np_link":"http:\/\/feedingamerica.org\/","np_location":"Minneapolis, MN","np_latitude":44.983334,"np_longitude":-93.26667},{"np_npid":"16","np_description":"<a href=http:\/\/www.integrativeonc.org\/adminsio\/buyklonopinonline\/#wv>go!!<\/a> klonopin urine - klonopin withdrawal and alcohol","np_name":"CZAISg","np_picture":"uploads\/logo_life-impact-intl_1386370462_1389017888.jpg","np_link":"http:\/\/www.lifeimpactintl.org\/","np_location":"Bangkok Thailand","np_latitude":13.727896,"np_longitude":100.524124},{"np_npid":"16","np_description":"<a href=http:\/\/www.integrativeonc.org\/adminsio\/buyklonopinonline\/#wv>go!!<\/a> klonopin urine - klonopin withdrawal and alcohol","np_name":"CZAISg","np_picture":"uploads\/logo_life-impact-intl_1386370462_1389017888.jpg","np_link":"http:\/\/www.lifeimpactintl.org\/","np_location":"Rangoon, Yangon Region, Myanmar (Burma)","np_latitude":16.799999,"np_longitude":96.150002},{"np_npid":"14","np_description":"Our goal: to end slavery in our lifetime. ","np_name":"Free The Slaves","np_picture":"uploads\/funny_cat_1504725810.jpg","np_link":"https:\/\/www.freetheslaves.net\/","np_location":"Washington, DC, United States","np_latitude":38.90723,"np_longitude":-77.036461},{"np_npid":"1","np_description":"GEMS provides a spectrum of continuous and comprehensive services to address the needs of commercially and sexually exploited girls and young women. Commercial sexual exploitation is intrinsically linked to racism, poverty, gender-based violence, and the criminalization of youth. All these factors are an integral part of any discussion, advocacy work or direct service programming that involves sexual exploitation. All of GEMS programs are based on our philosophy and values that each girl and young woman is ","np_name":"Girls Against Slavery","np_picture":"uploads\/logo_gems_1386811385_1389017839.jpg","np_link":"http:\/\/www.gems-girls.org\/","np_location":"New York, NY, United States","np_latitude":40.714352,"np_longitude":-74.005974},{"np_npid":"9","np_description":"Anti-Slavery International works at local, national and international levels to eliminate all forms of slavery around the world forever. ","np_name":"Anti-Slavery International","np_picture":"uploads\/228068_10150200553493377_8097145_n_1389320288.jpg","np_link":"http:\/\/www.antislavery.org","np_location":"","np_latitude":0,"np_longitude":0},{"np_npid":"9","np_description":"Anti-Slavery International works at local, national and international levels to eliminate all forms of slavery around the world forever. ","np_name":"Anti-Slavery International","np_picture":"uploads\/228068_10150200553493377_8097145_n_1389320288.jpg","np_link":"http:\/\/www.antislavery.org","np_location":"","np_latitude":0,"np_longitude":0}]

	}
	
	me.plotNonProfit = function(npdata){
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(npdata.np_latitude, npdata.np_longitude),
			icon: {anchor: new google.maps.Point(8,8), size: new google.maps.Size(16,16), url: "http://localhost:8080/src/assets/star_16.png"},
			map: me.map,
			zIndex: 1
		});	

		google.maps.event.addListener(marker, "click", function(){
				
			if(me.npbubble != null){me.npbubble.close();}

			//Show bubbles
			me.npbubble = new InfoBubble({
				map: me.map,
				shadowStyle: 1,
				borderRadius: 4,
				arrowSize: 10,
				borderWidth: 1,
				borderColor: '#BFBFBF',
				disableAutoPan: true,
				hideCloseButton: false,
				arrowPosition: 40,
				arrowStyle: 0
			});
			
			if(npdata.np_description.length>118){
				var description = npdata.np_description.substring(0,118) + "...";
			}
			else
			{
				var description = npdata.np_description;
			}

			google.maps.event.addListener(me.npbubble, "domready", function(){
				console.log("np click");
				$(".nonprofitbubble").parent().parent().height($(".nonprofitbubble").parent().parent().height()-18);
			});
			
			me.npbubble.setContent("<div class='bubble nonprofitbubble'><div class='bubble-avatar' style='background:url(" + npdata.np_picture + ") no-repeat center;background-size:contain;'></div><div class='bubble-attributes'><strong style='font-size:12px;'>" + npdata.np_name + "</strong></div><div class='bubble-btn-profile'><a href='n/" + npdata.np_npid + "' target='_blank' class='btn-bubble-visitprofile'>View profile</a></div></div>");
			me.npbubble.open(me.map, marker);

			
		});
		
		me.npsOnMap.push(marker);
	}	
	
	me.animatePolylines = function(){
		
		setMapToDefault();
		
		$(".see-tracks")
			.html("Previous view")
			.off("click")
			.on("click", revertMapView);
		
		for(i=0;i<me.officeNetwork.length;i++){
			animateCircle(me.officeNetwork[i]);
		}
	}
	
	function clearIntervals(){
		while(me.intervals[0]){
			window.clearInterval(me.intervals.pop());
		}
		me.intervals.length = 0;	
	}
	
	function revertMapView(){
	
		clearIntervals();
		
		me.map.setCenter(me.currentMapView.center);
		me.map.setZoom(me.currentMapView.zoom);
		
		$(".see-tracks")
			.off("click")
			.html("See my tracks")
			.click(function(){
				me.animatePolylines();
			});	

		me.clearOfficeNetwork();
		if(me.bubble != null){
			if(me.bubble.isOpen()){me.bubble.close();}
		}
		if(me.npbubble != null){
			if(me.npbubble.isOpen()){me.npbubble.close();}
		}
		me.showNonProfits();			
	}
	
	function storeMapView(){
		me.currentMapView = {zoom: me.map.getZoom(), center: me.map.getCenter()}; 
	}
	
	function setMapToDefault(){
		me.map.setCenter(new google.maps.LatLng(32.33888927939217, 6.1015625));
		me.map.setZoom(2);
	}
	
	function plotUserLocation(result){
		me.userMarker = new google.maps.Marker({map: me.map, position: new google.maps.LatLng(result.coords.latitude, result.coords.longitude)});
	}		

	function animateCircle(line) {
		var count = 0;
		var interval = window.setInterval(function() {
			count = (count + 1) % 200;

			var icons = line.get('icons');
			icons[0].offset = (count / 2) + '%';
			line.set('icons', icons);
			
			
			//This triggers the highlighting of the nonprofits
			if(count / 2 == 99){
				console.log("Reached end");
			}
			
			
		}, 20);	
		me.intervals.push(interval);
	}

	function userNonPListener(d){
		google.maps.event.addListener(d, "click", function(){
				
			if(me.npbubble != null){me.npbubble.close();}

			//Show bubbles
			me.npbubble = new InfoBubble({
				map: me.map,
				shadowStyle: 1,
				borderRadius: 4,
				arrowSize: 10,
				borderWidth: 1,
				borderColor: '#BFBFBF',
				disableAutoPan: true,
				hideCloseButton: false,
				arrowPosition: 40,
				arrowStyle: 0
			});
			
			if(d.description.length>118){
				var description = d.description.substring(0,118) + "...";
			}
			else
			{
				var description = d.description;
			}
			
			me.npbubble.setContent("<div class='bubble'><div class='bubble-avatar' style='background:url(" + d.picture + ") no-repeat center;background-size:contain;'></div><div class='bubble-attributes'><strong class='bubble-attributes-header' style='font-size:15px;'>" + d.name + "</strong><label>" + description + "</label></div><div class='bubble-btn-profile'><a href='np/test' target='_blank' class='btn-bubble-visitprofile'>View profile</a></div></div>");
			me.npbubble.open(me.map, d);

			
		});		
	}	
}

var mainmap = null;

$(document).ready(function(){

  mainmap = new railroadMainMap();

  // Ask for location after 3 minutes
  var startGeo = function(){ mainmap.geoLocate(); };
  setTimeout(startGeo, 180000);

  mainmap.loadUsers(plotUserLocations);
  mainmap.loadNonprofit(plotNonprofits);

  function plotNonprofits(data){
    mainmap.hideNonProfits();
    if(data.length>0){

      for(i=0;i<data.length;i++){
        mainmap.plotNonProfit(data[i]);
      }
    }
  }

  function plotUserLocations(data){
    if(data.length>0){
      for(i=0;i<data.length;i++){
        mainmap.plotUser(data[i]);
      }
    }
  }

});


/**---Profile Map-----**/
var nonprofits = [{"data":{"nonprofit_id":"7","nonprofit_name":"Oxfam International","nonprofit_description":"Working with thousands of local partner organizations, we work with people living in poverty striving to exercise their human rights.","nonprofit_logo":"..\/..\/uploads\/oxfam-250_0_1386846792_1389017943.jpg","nonprofit_link":"http:\/\/www.oxfam.org"},"offices":[{"lat":-37.814106,"lng":144.963287,"location":"Melbourne, Victoria, Australia"},{"lat":50.937531,"lng":6.960279,"location":"K\u00f6ln, Germany"},{"lat":36.752888,"lng":3.042048,"location":"Algiers, Algeria"}]},{"data":{"nonprofit_id":"4","nonprofit_name":"Streetlight","nonprofit_description":"Streetlight\u2019s Mission is to Eradicate Child Sex Slavery through a 3-tier strategy of Awareness, Prevention, and Aftercare.","nonprofit_logo":"..\/..\/uploads\/streetlight_1389320349.jpg","nonprofit_link":"http:\/\/www.streetlightphx.com\/"},"offices":[{"lat":32.715328,"lng":-117.157257,"location":"San Diego, CA"},{"lat":33.448376,"lng":-112.074036,"location":"Phoenix, AZ, United States"},{"lat":17.962769,"lng":102.614426,"location":"Vientiane, Vientiane Prefecture, Laos"}]},{"data":{"nonprofit_id":"6","nonprofit_name":"Feeding America","nonprofit_description":"As the nation\u2019s leading domestic hunger-relief charity, our food bank network members supply food to more than 37 million Americans each year, including 14 million children and 3 million seniors. Feeding America benefits from the unique relationship between our 202 local member food banks at the front lines of hunger relief and the central efforts of our national office.","nonprofit_logo":"..\/..\/uploads\/feeding america_1389747217.jpg","nonprofit_link":"http:\/\/feedingamerica.org\/"},"offices":[{"lat":44.983334,"lng":-93.26667,"location":"Minneapolis, MN"}]},{"data":{"nonprofit_id":"15","nonprofit_name":"Raphahouse","nonprofit_description":"Rapha House programs exist to extend unconditional love to girls who have been rescued out of slavery and sexual exploitation.  Every member of the Rapha House staff has dedicated his or herself to seeing each child at Rapha House restored to sustainable freedom.","nonprofit_logo":"..\/..\/uploads\/rapha_1389320309.jpg","nonprofit_link":"http:\/\/www.raphahouse.org\/"},"offices":[{"lat":-18.914871,"lng":47.531612,"location":"Antananarivo, Madagascar"},{"lat":11.558831,"lng":104.917442,"location":"Phnom Penh, Cambodia"}]}]			
			$(document).ready(function(){
				
				$(".profileimg").css("background", "url(../../uploads/edith-gonzalez-4_1386870829_1389017294.jpg) no-repeat center");
				$(".profileimg").css("background-size", "contain");
				
				var offices = [];
				var connectionLines = [];
				
				var userApproxLocation = new google.maps.LatLng(-4.072244, 39.667519);

				var DARK_MAP = 'custom_style';
				
				var mapstyle = [
		  {
			"featureType": "water",
			"elementType": "geometry",
			"stylers": [
			  { "color": "#373737" }
			]
		  },{
			"featureType": "water",
			"elementType": "labels",
			"stylers": [
			  { "color": "#585858" },
			  { "weight": 0.4 }
			]
		  },{
			"featureType": "landscape.natural",
			"stylers": [
			  { "color": "#1e1e1e" }
			]
		  },{
			"featureType": "landscape.man_made",
			"stylers": [
			  { "visibility": "off" }
			]
		  },{
			"featureType": "poi",
			"stylers": [
			  { "visibility": "off" }
			]
		  },{
			"featureType": "road",
			"stylers": [
			  { "visibility": "simplified" },
			  { "color": "#808080" }
			]
		  },{
		  },{
			"featureType": "administrative",
			"elementType": "labels.text",
			"stylers": [
			  { "visibility": "on" },
			  { "color": "#808080" },
			  { "weight": 0.1 },
			  { "lightness": 27 },
			  { "saturation": 1 },
			  { "hue": "#ff0000" },
			  { "gamma": 1 }
			]
		  },
		  {
			"featureType": "administrative.country",
			"elementType": "geometry",
			"stylers": [
			  { "weight": 0.5 }
			]
		  },{
			"featureType": "administrative.province",
			"elementType": "geometry",
			"stylers": [
			  { "weight": 0.5 }
			]
		  },{
			"featureType": "administrative.locality",
			"elementType": "geometry",
			"stylers": [
			  { "weight": 0.5 }
			]
		  },{
			"featureType": "administrative.neighborhood",
			"stylers": [
			  { "weight": 0.5 }
			]
		  },		  
		  {
			"featureType": "transit",
			"stylers": [
			  { "visibility": "off" }
			]
		  },{
			"featureType": "road",
			"elementType": "labels",
			"stylers": [
			  { "visibility": "off" }
			]
		  }
	];
				
				var customMapType = new google.maps.StyledMapType(mapstyle, {name:"Dark"});
				
							
				var unp_map = new google.maps.Map(document.getElementById("user-selected-nonprofits-map"), {
					center: new google.maps.LatLng(38,10),
					zoom:2,
					mapTypeControlOptions: {
						mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE, DARK_MAP]
					},	
					mapTypeId: DARK_MAP,
					panControl: false,
					streetViewControl: false,
					zoomControlOptions: {
						style: google.maps.ZoomControlStyle.SMALL
					}					
				});
				
				unp_map.mapTypes.set(DARK_MAP, customMapType);
				
				var marker = new google.maps.Marker({
					position: userApproxLocation,
					map: unp_map,
					icon: {anchor: new google.maps.Point(16,16), size: new google.maps.Size(32,32), url: "../../img/light_bulb_32.png"}
				});
				
				 displayNonprofitNetwork(nonprofits);
				
				function displayNonprofitNetwork(network){
					//network is an array that contains all user selected nonprofits and their attributes
					var npicon = {anchor: new google.maps.Point(16,16), size: new google.maps.Size(32,32), url: "../../img/star_32.png"};
					var lineSymbol = {path: google.maps.SymbolPath.CIRCLE,scale: 2,strokeColor: '#4475b7'};

					
					for(i in network){
						for(j in network[i].offices){
							var lat = network[i].offices[j]['lat'];
							var lng = network[i].offices[j]['lng'];
							
							offices.push(new google.maps.Marker({position: new google.maps.LatLng(lat, lng), map: unp_map, icon: npicon}));
							
							var line =new google.maps.Polyline({
									path: curved_line_generate({
										latStart: userApproxLocation.lat(), 
										lngStart: userApproxLocation.lng(), 
										latEnd: new google.maps.LatLng(lat, lng).lat(), 
										lngEnd: new google.maps.LatLng(lat, lng).lng()
									}),
									geodesic: false,
									strokeColor: '#4475b7',
									strokeOpacity: 1.0,
									strokeWeight: 2,
									map:unp_map,
									icons: [{
									  icon: lineSymbol,
									  offset: '100%'
									}]
								});	

							connectionLines.push(line);
							animateCircle(line);
						}
					}
				}
				
				function animateCircle(line) {
					var count = 0;
					window.setInterval(function() {
					  count = (count + 1) % 200;

					  var icons = line.get('icons');
					  icons[0].offset = (count / 2) + '%';
					  line.set('icons', icons);
				  }, 20);
				}				
			});

/**------User Sign Up 2----**/
$(document).ready(function(){
        
        var geocoder = new google.maps.Geocoder();
        
        var location_pointer = new google.maps.places.Autocomplete(document.getElementById("new-user-location-input"));

        var DARK_MAP = 'custom_style';
        
        var mapstyle = [
      {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        { "color": "#373737" }
      ]
      },{
      "featureType": "water",
      "elementType": "labels",
      "stylers": [
        { "color": "#585858" },
        { "weight": 0.4 }
      ]
      },{
      "featureType": "landscape.natural",
      "stylers": [
        { "color": "#1e1e1e" }
      ]
      },{
      "featureType": "landscape.man_made",
      "stylers": [
        { "visibility": "off" }
      ]
      },{
      "featureType": "poi",
      "stylers": [
        { "visibility": "off" }
      ]
      },{
      "featureType": "road",
      "stylers": [
        { "visibility": "simplified" },
        { "color": "#808080" }
      ]
      },{
      },{
      "featureType": "administrative",
      "elementType": "labels.text",
      "stylers": [
        { "visibility": "on" },
        { "color": "#808080" },
        { "weight": 0.1 },
        { "lightness": 27 },
        { "saturation": 1 },
        { "hue": "#ff0000" },
        { "gamma": 1 }
      ]
      },
      {
      "featureType": "administrative.country",
      "elementType": "geometry",
      "stylers": [
        { "weight": 0.5 }
      ]
      },{
      "featureType": "administrative.province",
      "elementType": "geometry",
      "stylers": [
        { "weight": 0.5 }
      ]
      },{
      "featureType": "administrative.locality",
      "elementType": "geometry",
      "stylers": [
        { "weight": 0.5 }
      ]
      },{
      "featureType": "administrative.neighborhood",
      "stylers": [
        { "weight": 0.5 }
      ]
      },      
      {
      "featureType": "transit",
      "stylers": [
        { "visibility": "off" }
      ]
      },{
      "featureType": "road",
      "elementType": "labels",
      "stylers": [
        { "visibility": "off" }
      ]
      }
  ];
        var customMapType = new google.maps.StyledMapType(mapstyle, {name:"Dark"});
        
        var map = new google.maps.Map(document.getElementById("user-location-map-gm"),{
          center: new google.maps.LatLng(45,-100),
          mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE, DARK_MAP]
          },  
          mapTypeId: DARK_MAP,
          panControl: false,
          streetViewControl: false,
          zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL
          },          
          zoom:2
        });
        
        map.mapTypes.set(DARK_MAP, customMapType);
        
        var marker = new google.maps.Marker({});
        
       });