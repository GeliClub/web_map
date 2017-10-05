
var s = Snap(850, 1100);

var sb0 = s.group();
var sb1 = s.group();
var sb2 = s.group();

var ba = s.rect(10,10,50,50,10,10);
var b0 = s.rect(10,110,50,50,10,10);
var b1 = s.rect(10,210,50,50,10,10);
var b2 = s.rect(10,310,50,50,10,10);



Snap.load("assets/SB-00.svg", (data) => {
	sb0.append(data);
});
Snap.load("assets/SB-01.svg", (data) => {
	sb1.append(data);
});
Snap.load("assets/SB-02.svg", (data) => {
	sb2.append(data);
});



ba.click(() => {
	sb0.attr({visibility: "visible"});
	sb1.attr({visibility: "visible"});
	sb2.attr({visibility: "visible"});
});
b0.click(() => {
	if (sb0.attr("visibility") === "visible") 
		sb0.attr({visibility: "hidden"});
	else 
		sb0.attr({visibility: "visible"});
});
b1.click(() => {
	if (sb1.attr("visibility") === "visible") 
		sb1.attr({visibility: "hidden"});
	else 
		sb1.attr({visibility: "visible"});
});
b2.click(() => {
	if (sb2.attr("visibility") === "visible") 
		sb2.attr({visibility: "hidden"});
	else 
		sb2.attr({visibility: "visible"});
});
