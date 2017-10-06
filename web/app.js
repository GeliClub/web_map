
var s = Snap(850, 1100);
var points = []; // user location list

var sb = [s.group(), s.group(), s.group()]; // stuart floors

var origin = s.circle(162,721,2);
origin.attr({visibility: "hidden"});

// buttons
var ba = [s.rect(10,10,50,50,10,10)];
var b0 = [s.rect(10,110,50,50,10,10)];
var b1 = [s.rect(10,210,50,50,10,10)];
var b2 = [s.rect(10,310,50,50,10,10)];


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

var scale = 12; // need get correct scaling

function addPoint(x,y,r,f) {
	var offset = origin.node.getBBox();
	if (f > -1 && f < sb.length)
		points.push(sb[f].circle(offset.x+scale*x,offset.y-scale*y,r).attr({"fill":"blue"}));
	else
		points.push(s.circle(offset.x+scale*x,offset.y-scale*y,r).attr({"fill":"blue"}));
}

var text = s.text(180, 50, "Stuart Building");
text.attr({"font-size": 50, "fill": 'blue'})

ba[0].click(() => {
	sb[0].attr({visibility: "visible"});
	sb[1].attr({visibility: "visible"});
	sb[2].attr({visibility: "visible"});
});
b0[0].click(() => {
	if (sb[0].attr("visibility") === "visible") 
		sb[0].attr({visibility: "hidden"});
	else 
 		sb[0].attr({visibility: "visible"});
});
b1[0].click(() => {
	if (sb[1].attr("visibility") === "visible") 
		sb[1].attr({visibility: "hidden"});
	else 
		sb[1].attr({visibility: "visible"});
});
b2[0].click(() => {
	if (sb[2].attr("visibility") === "visible") 
		sb[2].attr({visibility: "hidden"});
	else 
		sb[2].attr({visibility: "visible"});
});
