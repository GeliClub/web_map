
//var url = "https://api.iitrtclab.com/indoorLocation/getIndoorLocationJSON?test=true&json=";
var url = "https://api.iitrtclab.com/indoorLocation/getIndoorLocationJSON?";
// var param1 = "[{\"Major\":101,\"Minor\":175,\"Rssi\":-91.0},{\"Major\":101,\"Minor\":175,\"Rssi\":-92.0},{\"Major\":101,\"Minor\":175,\"Rssi\":-93.0},{\"Major\":101,\"Minor\":202,\"Rssi\":-80.0},{\"Major\":101,\"Minor\":202,\"Rssi\":-83.0}]";
var param2 = "[{\"Major\":101,\"Minor\":140,\"Rssi\":-91.0},{\"Major\":101,\"Minor\":140,\"Rssi\":-92.0},{\"Major\":101,\"Minor\":156,\"Rssi\":-80.0},{\"Major\":101,\"Minor\":191,\"Rssi\":-83.0}]"; // room 229

var param3 = "[{\"Major\":101,\"Minor\":140,\"Rssi\":-51.0},{\"Major\":101,\"Minor\":140,\"Rssi\":-52.0},{\"Major\":101,\"Minor\":156,\"Rssi\":-91.0},{\"Major\":101,\"Minor\":191,\"Rssi\":-91.0}]"; // room 229

var json = {"deviation": 6.90362902791986, "y0": 14.143063062636797, "BTs": [{"min": 147, "proximity": 2, "floor": 2, "avg_rssi": -53.892276795284445, "y": 12.526937613537996, "x": 11.15477383840724, "maj": 101}, {"min": 138, "proximity": 2, "floor": 2, "avg_rssi": -59.450359729600315, "y": 15.484317613781835, "x": 18.575287609270795, "maj": 101}, {"min": 140, "proximity": 5, "floor": 2, "avg_rssi": -65.71391254656905, "y": 15.634693066409822, "x": 7.394378665219882, "maj": 101}], "real_y": 14.196893569939407, "real_x": 7.7343211189817245, "real_floor": 2, "x0": 14.637740274126605, "est_floor": 2};
 
var off1 = origin.node.getBBox();

function Get(Url){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",Url,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

var json_obj = JSON.parse(Get('https://api.iitrtclab.com/indoorLocation/getIndoorLocationJSON?test=true&json=[{"Major":101,"Minor":175,"Rssi":-91.0},{"Major":101,"Minor":175,"Rssi":-92.0},{"Major":101,"Minor":175,"Rssi":-93.0},{"Major":101,"Minor":202,"Rssi":-80.0},{"Major":101,"Minor":202,"Rssi":-83.0}]'));
//var position_json = getJSONP('https://api.iitrtclab.com/indoorLocation/getIndoorLocationJSON?test=true&json=[{"Major":101,"Minor":175,"Rssi":-91.0},{"Major":101,"Minor":175,"Rssi":-92.0},{"Major":101,"Minor":175,"Rssi":-93.0},{"Major":101,"Minor":202,"Rssi":-80.0},{"Major":101,"Minor":202,"Rssi":-83.0}]', function(data){
console.log(json_obj);

var estimate_position_x = json_obj.x0;
var estimate_position_y = json_obj.y0;
console.log(estimate_position_x);
console.log(estimate_position_y);


var bts = json["BTs"];

for (var i in bts) {
	console.log(bts[i]);
	console.log(label);
	addPoint(bts[i].x, bts[i].y, 5, 2);
	var label = bts[i]["maj"] + "-" + bts[i]["min"];
	var text = s.text(off1.x+convert(bts[i].x),  off1.y-convert(bts[i].y) + 10, label);
    text.attr({"font-size": 10, "fill": "black"});
	adderrorcircle(bts[i].x, bts[i].y, 2, 2);
}

addtestestimatePoint(json["x0"], json["y0"], 5, 2);
addtestrealPoint(json["real_x"], json["real_y"], 5, 2);

//Draw Line of standard deviation:
var t1 = s.line(off1.x+convert(json["x0"]),off1.y-convert(json["y0"]),convert(json["real_x"])+off1.x,off1.y-convert(json["real_y"]));
t1.attr({stroke: "#000", strokeWidth: 2});

/*
More than 3 parameters are needed for trilateration

-50 is usually the highest/hottest power -> closest (go for -51)

Database is in meters
*/

function createLineElement(x, y, length, angle) {
    var line = document.createElement("div");
    var styles = 'border: 1px solid black; '
               + 'width: ' + length + 'px; '
               + 'height: 0px; '
               + '-moz-transform: rotate(' + angle + 'rad); '
               + '-webkit-transform: rotate(' + angle + 'rad); '
               + '-o-transform: rotate(' + angle + 'rad); '  
               + '-ms-transform: rotate(' + angle + 'rad); '  
               + 'position: absolute; '
               + 'top: ' + y + 'px; '
               + 'left: ' + x + 'px; ';
    line.setAttribute('style', styles);  
    return line;
}

