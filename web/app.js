
var s = Snap(850, 1100);

var sb1 = s.group();
var sb2 = s.group();

var b0 = s.rect(10,10,50,50,10,10);
var b1 = s.rect(10,80,50,50,10,10);
var b2 = s.rect(10,150,50,50,10,10);



Snap.load("assets/SB-01.svg", (data) => {
	sb1.append(data);
});

Snap.load("assets/SB-02.svg", (data) => {
	sb2.append(data);
});



b0.click(() => {
	sb1.attr({visibility: "visible"});
	sb2.attr({visibility: "visible"});
});
b1.click(() => {
	sb1.attr({visibility: "visible"});
	sb2.attr({visibility: "hidden"});
});
b2.click(() => {
	sb1.attr({visibility: "hidden"});
	sb2.attr({visibility: "visible"});
});


//var hoverover = function() { g.animate({ transform: 's2r45,150,150' }, 1000, mina.bounce ) };
//var hoverout = function() { g.animate({ transform: 's1r0,150,150' }, 1000, mina.bounce ) };