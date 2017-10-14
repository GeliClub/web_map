	var s = Snap(850, 1100);
	var points = {}; // user location list
	var sb = [s.group(), s.group(), s.group()]; // stuart floors
	var origin = s.circle(162,721,2);
	var button = [s.rect(10,10,50,50,10,10), s.rect(10,110,50,50,10,10), s.rect(10,210,50,50,10,10), s.rect(10,310,50,50,10,10)];
	var text = s.text(180, 50, "Stuart Building")
		.attr({"font-size": 50, "fill": "blue", "class": "unselectable pointer-events"});

var InitInterface = function() {

	// Initialize Firebase – please don't steal this API key
	var config = {
		apiKey: "AIzaSyCCpIjWcPGeqdmnk6CcDABpyly7BrQZNhg",
		authDomain: "maptechnology-1506012449347.firebaseapp.com",
		databaseURL: "https://maptechnology-1506012449347.firebaseio.com",
		projectId: "maptechnology-1506012449347",
		storageBucket: "maptechnology-1506012449347.appspot.com",
		messagingSenderId: "365861832460"
	};
	firebase.initializeApp(config);


	function load() {
		// load svg onto different groups
		Snap.load("assets/SB-00.svg", (data) => {
			sb[0].append(data);
			sb[0].attr({visibility: "hidden"});
		});
		Snap.load("assets/SB-01.svg", (data) => {
			sb[1].append(data);
			sb[1].attr({visibility: "hidden"});
		});
		Snap.load("assets/SB-02.svg", (data) => {
			sb[2].append(data);
			//sb[2].attr({visibility: "hidden"});
		});

		// add button click functionality
		button[0].click(() => {
			sb[0].attr({visibility: "visible"});
			sb[1].attr({visibility: "visible"});
			sb[2].attr({visibility: "visible"});
		});
		button[1].click(() => {
			if (sb[0].attr("visibility") === "visible") 
				sb[0].attr({visibility: "hidden"});
			else 
		 		sb[0].attr({visibility: "visible"});
		});
		button[2].click(() => {
			if (sb[1].attr("visibility") === "visible") 
				sb[1].attr({visibility: "hidden"});
			else 
				sb[1].attr({visibility: "visible"});
		});
		button[3].click(() => {
			if (sb[2].attr("visibility") === "visible") 
				sb[2].attr({visibility: "hidden"});
			else 
				sb[2].attr({visibility: "visible"});
		});

	}

	var interface = {
		init: () => {
			load();
		},

		addPoint: (id, centerX, centerY, radiusX, radiusY, opacity, color, floor) => {
			var offset = origin.node.getBBox();
			console.log("rx", radiusX, Util.convert(radiusX), "ry", radiusY, Util.convert(radiusY));
			if (floor > -1 && floor < sb.length) { // if a floor is specified
				// s.ellipse(centerX, centerY, radiusX, radiusY);
				points[id] = sb[floor].ellipse().attr({
									cx: offset.x+Util.convert(centerX),
									cy: offset.y-Util.convert(centerY),
									rx: Util.convert(radiusX),
									ry: Util.convert(radiusY),
									fill: color,
									opacity: opacity
									//strokeWidth:
									//strokeOpacity:
								});
			}
			else {
				points[id] = s.ellipse().attr({
									cx: offset.x+Util.convert(centerX),
									cy: offset.y-Util.convert(centerY),
									rx: Util.convert(radiusX),
									ry: Util.convert(radiusY),
									fill: color,
									opacity: opacity
								});
			}
		}
	};

	return interface;
}


var app = InitInterface();
app.init();



