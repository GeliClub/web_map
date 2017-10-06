
//var url = "https://api.iitrtclab.com/indoorLocation/getIndoorLocationJSON?test=true&json=";
var url = "https://api.iitrtclab.com/indoorLocation/getIndoorLocationJSON?";
var param1 = "[{\"Major\":101,\"Minor\":175,\"Rssi\":-91.0},{\"Major\":101,\"Minor\":175,\"Rssi\":-92.0},{\"Major\":101,\"Minor\":175,\"Rssi\":-93.0},{\"Major\":101,\"Minor\":202,\"Rssi\":-80.0},{\"Major\":101,\"Minor\":202,\"Rssi\":-83.0}]";
var param2 = "[{\"Major\":101,\"Minor\":140,\"Rssi\":-91.0},{\"Major\":101,\"Minor\":140,\"Rssi\":-92.0},{\"Major\":101,\"Minor\":156,\"Rssi\":-80.0},{\"Major\":101,\"Minor\":191,\"Rssi\":-83.0}]"; // room 229

$.getJSON(url, {
	test: "true",
	json: param2
}).done((data) => {
	console.log(data);
	addPoint(data['x0'], data['y0'], 5, data['Floor']);
});
