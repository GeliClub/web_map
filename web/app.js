
var s = Snap(850, 1100);

var c = s.circle( 200,200,10 );

var sb1, sb2;

Snap.load("assets/SB-01.svg", (data) => {
	sb1 = data;
	s.append(data);
});
Snap.load("assets/SB-02.svg", (data) => {
	sb2 = data;
	s.append(data);
});


//var hoverover = function() { g.animate({ transform: 's2r45,150,150' }, 1000, mina.bounce ) };
//var hoverout = function() { g.animate({ transform: 's1r0,150,150' }, 1000, mina.bounce ) };