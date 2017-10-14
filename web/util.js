var Util = {
	convert: (x) => {
		x = x * 3.28084; // 1ft/0.3048meters
		x = x * 1/25; // 1in/25ft
		x = x * 72; // svg DPI
		return x;
	}	
}