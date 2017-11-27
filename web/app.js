	// var s = Snap(850, 1100);

	// var container = document.getElementById("mapsvg");
	// container.appendChild(s);

// variable for testing
let test = {};

var InitApp = function() {

	// initialize Snap Svg
	let s = Snap("#mapsvg");
	s.attr({viewBox: "0 0 850 1100"}); // allows scaling to browser viewport

	// datastructure of the application data

	let layers = {
		origin: s.circle(162,721,2),
		line: {},
		points: {}, // datasturcture to hold points
		text: { // text description
			stuart: s.text(180, 50, "Stuart Building").attr({"font-size": 50, "fill": "blue", "class": "unselectable pointer-events"}),
			perlstein: s.text(180, 50, "Perlstein Hall").attr({"font-size": 50, "fill": "blue", "class": "unselectable pointer-events"})
		},
		button: [s.rect(10,110,50,50,10,10), s.rect(10,210,50,50,10,10), s.rect(10,310,50,50,10,10)],
		stuart: [s.group(), s.group(), s.group()],
		perlstein: []
	};

	test.layers = layers;
	test.snap = s;

	// Initialize Firebase – please don't steal this API key
	let config = {
		apiKey: "AIzaSyCCpIjWcPGeqdmnk6CcDABpyly7BrQZNhg",
		authDomain: "maptechnology-1506012449347.firebaseapp.com",
		databaseURL: "https://maptechnology-1506012449347.firebaseio.com",
		projectId: "maptechnology-1506012449347",
		storageBucket: "maptechnology-1506012449347.appspot.com",
		messagingSenderId: "365861832460"
	};
	firebase.initializeApp(config);
	let testref = firebase.database().ref('test');

	// loads map 
	function load(building) {
		if (layers.text[building] && layers[building]) {
			for (let key in layers.text) {
				if (key === building) 
					layers.text[key].attr({visibility: "visible"});
				else
					layers.text[key].attr({visibility: "hidden"});
			}

			// TODO: need to update code below to account for n number of floors

			// load svg onto different groups
			// uncomment one of them to set as the default floor to show during initialization
			Snap.load("assets/SB-00.svg", (data) => {
				layers[building][0].append(data);
				layers[building][0].attr({visibility: "hidden"});
			});
			Snap.load("assets/SB-01.svg", (data) => {
				layers[building][1].append(data);
				layers[building][1].attr({visibility: "hidden"});
			});
			Snap.load("assets/SB-02.svg", (data) => {
				layers[building][2].append(data);
				//layers[building][2].attr({visibility: "hidden"});
			});

			// add/update button functionality
			layers.button[0].click(() => {
				layers[building][0].attr({visibility: "visible"});
				layers[building][1].attr({visibility: "hidden"});
				layers[building][2].attr({visibility: "hidden"});
			});
			layers.button[1].click(() => {
				layers[building][0].attr({visibility: "hidden"});
				layers[building][1].attr({visibility: "visible"});
				layers[building][2].attr({visibility: "hidden"});
			});
			layers.button[2].click(() => {
				layers[building][0].attr({visibility: "hidden"});
				layers[building][1].attr({visibility: "hidden"});
				layers[building][2].attr({visibility: "visible"});
			});

		} else {
			console.err("Unable to find given building");
		}
	}

	// stores information
	function update() {
		testref.once('value').then((snapshots) => {
			snapshots.forEach((child) => {
				// console.log(child.key);
				if (!layers.points[child.key]){
					console.log(child.val());
					app.addPointList(child.key, child.val(), 0.25, "black", (child.val()['floor'])? child.val()['floor'] : -1);
				}
			});
		});

		testref.on('child_added', (snapshot) => {
			// console.log(snapshot.key);
			if (!layers.points[snapshot.key]){
				console.log(snapshot.val());
				app.addPointList(snapshot.key, snapshot.val(), 0.25, "black", (snapshot.val()['floor'])? snapshot.val()['floor'] : -1);
			}
		});

		testref.on('child_changed', (snapshot) => {
			// console.log(snapshot.key);
			// console.log(snapshot.val());
			if (layers.points[snapshot.key]) {
				layers.points[snapshot.key].attr({
					cx: snapshot.val().cx,
					cy: snapshot.val().cy,
					rx: snapshot.val().rx,
					ry: snapshot.val().ry
				});
			}
		});

		testref.on('child_removed', (snapshot) => {
			//console.log(snapshot.key);
			//console.log(snapshot.val());
			if (layers.points[snapshot.key]) {
				layers.points[snapshot.key].remove();
				delete points[snapshot.key];
			}
		});

	}

	let app = {
		init: () => {
			load("stuart");
			update();
		},

		addPointList: (id, location, opacity, color, floor) => {
			app.addPoint(id, location.cx, location.cy, location.rx, location.ry, opacity, color, floor);
		},

		addPoint: (id, centerX, centerY, radiusX, radiusY, opacity, color, floor) => {
			let offset = layers.origin.node.getBBox();
			//console.log("rx", radiusX, Util.convert(radiusX), "ry", radiusY, Util.convert(radiusY));
			if (floor > -1 && floor < layers.stuart.length) { // if a floor is specified
				// s.ellipse(centerX, centerY, radiusX, radiusY);
				layers.points[id] = layers.stuart[floor].ellipse().attr({
									cx: offset.x+Util.convert(centerX),
									cy: offset.y-Util.convert(centerY),
									rx: Util.convert(radiusX),
									ry: Util.convert(radiusY),
									fill: color || "blue",
									opacity: opacity || 1
									//strokeWidth:
									//strokeOpacity:
								});
			}
			else {
				layers.points[id] = s.ellipse().attr({
									cx: offset.x+Util.convert(centerX),
									cy: offset.y-Util.convert(centerY),
									rx: Util.convert(radiusX),
									ry: Util.convert(radiusY),
									fill: color || "blue",
									opacity: opacity || 1
								});
			}
		},

		addLine: (id, startX, startY, endX, endY, color, floor, width) => {
			let offset = layers.origin.node.getBBox();

			if (floor > -1 && floor < layers.stuart.length) {
				console.log(layers.stuart[floor]);
				layers.line[id] = layers.stuart[floor].line().attr({
					x1: offset.x + Util.convert(startX),
					y1: offset.y - Util.convert(startY),
					x2: offset.x + Util.convert(endX),
					y2: offset.y - Util.convert(endY),
					stroke: color || "blue",
					strokeWidth: width || 1
				});
			}
			else {
				layers.line[id] = s.line().attr({
					x1: offset.x + Util.convert(startX),
					y1: offset.y - Util.convert(startY),
					x2: offset.x + Util.convert(endX),
					y2: offset.y - Util.convert(endY),
					stroke: color || "blue",
					strokeWidth: width || 1
				});
			}
		},

		getLayers: () => {
			// for debugging purposes, remove later
			return layers;
		}
	};

	return app;
}


var map = InitApp();
map.init();



