# Welcome to eon.js!

This is a small javascript library that renders any HTML5 canvas state into pixels. It was written with the purposes of data visualization and stylistic text rendering in mind, but don't let that stop you from using it any way you see fit.

# Eon is small and easy to use.

Feel free to tinker with it any way you see fit. Version 1.0 has plenty of room for improvement, and it's the author's wish that it be used and built upon for any purpose.

#Use:
Simply create var imageLoads = [ ]; and add as many HTML5 Canvas states as you want to it, in function form, and Eon will take care of the rest. For example:

var imageLoads = [

	function() {
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.font = "120px sans-serif";
		ctx.textBaseline = "top";
		ctx.textAlign = 'center';
		ctx.fillStyle = "orange";
		ctx.fillText('Welcome to Eon.js.', canvas.width/2, 200);
	},
	function() {
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.font = "100px sans-serif";
		ctx.textBaseline = "top";
		ctx.textAlign = 'center';
		ctx.fillStyle = "blue";
		ctx.fillText('A Data Visualization', canvas.width/2, 100);
		ctx.fillText('Library', canvas.width/2, 300);
		ctx.fillText('for HTML5 Canvas', canvas.width/2, 500);
	}
};

This will load two HTML5 Canvas states into Eon. Eon will render the first upon page load, and everytime the canvas is clicked, Eon will transition to the next item in imageLoads. Eon renders the colors you specify.

Eon also recursively adjusts its particle amount if a Canvas state is very dense in color and content, so feel free to load your Canvas states up!

# Coming Soon:
Choosing pre-built transition animations instead of a random transition being loaded each time
Image compatability
More transitions
Motion Graphic Typeface
mobile optimization

#Customization tips:
Adding transition animations is easy. following the style set in eon.js, just add the transition and a transition loop, then load them into the click event listener.
