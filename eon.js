window.addEventListener("load", eventWindowLoaded, false);

//Version 1.0 works by listening for clicks and then iterating through an imageLoads array. On load, the library will search for the first function in imageLoads and render it.

function eventWindowLoaded () {
    eon.getStart();
    imageLoads[0]();
    eon.getData();
    eon.imageRenderLoop();
    canvas.addEventListener('click', function() {
      		eon.imageIndex++;
      		console.log(eon.imageIndex);
//if there are more items left to render in imageLoads, version 1.0 randomly selects a transition animation and iterates to the next item.
      		if (eon.imageIndex < imageLoads.length) {
	      		loopSelector = Math.floor(Math.random() * 4) + 1;
	  			if (loopSelector == 1) {
	  				eon.homeStateLoop();
	  			} else if (loopSelector == 2) {
	  				eon.fadeUpLoop();
	  			} else if (loopSelector == 3) {
	  				eon.fadeOutLoop();
	  			} else if (loopSelector == 4) {
	  				eon.collapseLoop();
	  			};
	  		};
      }, false);
};

var eon = {
//sets a timer for transition functions to expire, and sets the index for imageLoads to 0.
	homeStateCount: 0,
	imageIndex: 0,
//initializes the canvas element by finding a canvas with id=canvas, sets it to screen height and width
	getStart: function() {
	  var canvas = document.getElementById("canvas");
      ctx = canvas.getContext("2d");
      canvas.width = screen.width;
      canvas.height = screen.height;
	},
//on click, reset() resets any timer values and loads a new item in imageLoads
	reset: function() {
      		eon.keepFloatingAroundYall = true;
      		eon.keepHomeStatingYall = true;
      		eon.imageRenderCount = 0;
      		eon.homeStateCount = 0;
	    	imageLoads[eon.imageIndex]();
	    	eon.getData();
	    	eon.imageRenderLoop();
	},
	imageRenderCount: 0,
	fadeUpCount: 0,
	fadeInCount: 0,
	keepHomeStatingYall: true,
	keepFloatingAroundYall: true,
//getData is run with each reset. it uses getImageData to get pixel information from the item in imageLoads
	getData: function() {
		particles = [];
		var n = 15;

		var width = canvas.width,
	    height = canvas.height,
	    imageData = ctx.getImageData(0, 0, width, height);

//particlePush is a recursive function that reruns if there are too many particles created to run smoothly.
	    var particlePush = function() {
		    for (var x = 0; x < imageData.width; x++) {
	    		for (var y = 0; y < imageData.height; y++) {
			        var pixelIndex = imageData.width * 4 * y + x * 4,
			        r = imageData.data[pixelIndex],
			        g = imageData.data[pixelIndex + 1],
			        b = imageData.data[pixelIndex + 2],
			        a = imageData.data[pixelIndex + 3]
	             	var selector = Math.floor(Math.random() * n) + 1;
	    	 		if (selector == 1) {
				        if (r !== 255 || g !== 255 && b !== 255) {
					            var posX = Math.floor(Math.random() * 1400),
					                posY = Math.floor(Math.random() * 800);
					            particles.push({
					                position: [posX, posY],
					                destination: [x, y],
					                velocity: [0, 0],
					                permPosition: [0,0],
					                fadeUpSpeed: Math.floor(Math.random() * 8) + 4,
					                fadeUpDisappear: Math.floor(Math.random() * 30) + 15,
					                fadeOutDisappear: Math.floor(Math.random() * 30) + 15,
					                collapseDisappear: Math.floor(Math.random() * 30) + 15,
					                angle: Math.floor(Math.random() * 359) + 1,
					                speed: Math.floor(Math.random() * 20) + 14,
					                homeSpeed: Math.floor(Math.random() * .7) + .2,
					                trueColor: 'rgb('+r+','+g+','+b+')',
					                colorVar: true
					            });
	        			};
	    			};
				};
			};
			if (particles.length > 11000) {
				n += 60;
				particles = [];
				particlePush();
			};
		};
		particlePush();
	},
//imageRender() runs with every reset, to load each new image
	imageRender: function() {
	  ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, 1400, 800);
      //Box
      ctx.strokeStyle = '#000000';
      ctx.strokeRect(1,  1, 1400-2, 800-2);

	  for (var i = 0; i < particles.length; i++) {
    	var particle = particles[i],
        dx = particle.destination[0] - particle.position[0],
        dy = particle.destination[1] - particle.position[1];
 
	    particle.velocity = [dx / 10, dy / 10];
	    particle.position[0] += particle.velocity[0];
	    particle.position[1] += particle.velocity[1];
	    particle.permPosition[0] = particle.position[0];
	    particle.permPosition[1] = particle.position[1];

	    ctx.fillStyle = particle.trueColor;

	    ctx.beginPath();
	    ctx.arc(particle.position[0], particle.position[1],1,0,Math.PI*2,true);
	    ctx.closePath();
	    ctx.fill();
	};
    },
//floatAround is the particle motion controller for once the page is rendered.
    floatAround: function() {
    	 ctx.fillStyle = 'black';
       ctx.fillRect(0, 0, 1400, 800);
      //Box
       ctx.strokeStyle = '#000000';
       ctx.strokeRect(1,  1, 1400-2, 800-2);

		for (var i = 0; i < particles.length; i++) {
	      var particle = particles[i];

			function updateBall() {
		      particle.radians = particle.angle * Math.PI/ 180;
		      particle.xunits = Math.cos(particle.radians) * particle.homeSpeed;
		      particle.yunits = Math.sin(particle.radians) * particle.homeSpeed;
   			};
   			updateBall();
	        
	 		particle.position[0] += particle.xunits;
	 		particle.position[1] += particle.yunits;

	 		ctx.fillStyle = particle.trueColor;
		    ctx.beginPath();
		    ctx.arc(particle.position[0], particle.position[1],1,0,Math.PI*2,true);
		    ctx.closePath();
		    ctx.fill();

		     if (particle.position[0] > particle.permPosition[0]+1 || particle.position[0] < particle.permPosition[0]-1 ) {
		         particle.angle = 180 - particle.angle;
		         updateBall();
		      } else if (particle.position[1] > particle.permPosition[1]+1 || particle.position[1] < particle.permPosition[1]-1) {
		         particle.angle = 360 - particle.angle;
		         updateBall();
		      }
			};
		},
//each transition animation is controlled by its own loop. it sets floatAround to false and expires after a certain count
    imageRenderLoop: function() {
    		if (eon.keepFloatingAroundYall == true) {
	    		if (eon.imageRenderCount < 50) {
		            window.setTimeout(eon.imageRenderLoop, 20);
		            eon.imageRender();
		          	eon.imageRenderCount +=1;
		        } else {
		        	window.setTimeout(eon.imageRenderLoop, 20);
		            eon.floatAround();
		        };
		    };

	},
//a transition animation
	homeState: function() {
	   ctx.fillStyle = 'black';
       ctx.fillRect(0, 0, 1400, 800);
      //Box
       ctx.strokeStyle = '#000000';
       ctx.strokeRect(1,  1, 1400-2, 800-2);

		for (var i = 0; i < particles.length; i++) {
	      var particle = particles[i];

			function updateBall() {
		      particle.radians = particle.angle * Math.PI/ 180;
		      particle.xunits = Math.cos(particle.radians) * particle.speed;
		      particle.yunits = Math.sin(particle.radians) * particle.speed;
   			};
   			updateBall();
	        
	 		particle.position[0] += particle.xunits;
	 		particle.position[1] += particle.yunits;
	 		particle.fadeOutDisappear +=1;


	 	if (particle.fadeOutDisappear< 40) {
			if (i < particles.length) {
		 		ctx.fillStyle = 'magenta';
		 	};
		 	if (i < particles.length*.8) {
		 		ctx.fillStyle = 'green';
		 	};
		 	if (i < particles.length*.6) {
		 		ctx.fillStyle = 'blue';
		 	};
		 	if (i < particles.length*.4) {
		 		ctx.fillStyle = 'orange';
		 	};
		 	if (i < particles.length*.2) {
		 		ctx.fillStyle = 'purple';
		 	};
		};

		    ctx.beginPath();
		    ctx.arc(particle.position[0], particle.position[1],1,0,Math.PI*2,true);
		    ctx.closePath();
		    ctx.fill();

		     if (particle.position[0] > canvas.width || particle.position[0] < 0 ) {
		         particle.angle = 180 - particle.angle;
		         updateBall();
		      } else if (particle.position[1] > canvas.height || particle.position[1] < 0) {
		         particle.angle = 360 - particle.angle;
		         updateBall();
		      }
			};
	},
	homeStateLoop: function() {
		if (eon.keepHomeStatingYall == true) {
			eon.keepFloatingAroundYall = false;
			eon.homeStateCount++;
			if (eon.homeStateCount < 30) {
				window.setTimeout(eon.homeStateLoop, 20);
			        eon.homeState();
		    };
		    if (eon.homeStateCount == 30) {
		    	eon.reset();
		    };
		};
	},
// another transition animation
	fadeUp: function() {
	  ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, 1400, 800);
      //Box
      ctx.strokeStyle = '#000000';
      ctx.strokeRect(1,  1, 1400-2, 800-2);

      for (var i = 0; i < particles.length; i++) {
      	var particle = particles[i];
	    particle.position[1] -= particle.fadeUpSpeed;
	    particle.fadeUpDisappear += 1;
	    if (particle.fadeUpDisappear < 40) {
	    	if (i < particles.length) {
	 		ctx.fillStyle = 'magenta';
	 	};
	 	if (i < particles.length*.8) {
	 		ctx.fillStyle = 'green';
	 	};
	 	if (i < particles.length*.6) {
	 		ctx.fillStyle = 'blue';
	 	};
	 	if (i < particles.length*.4) {
	 		ctx.fillStyle = 'orange';
	 	};
	 	if (i < particles.length*.2) {
	 		ctx.fillStyle = 'purple';
	 	};
	    
	    ctx.beginPath();
	    ctx.arc(particle.position[0], particle.position[1],1,0,Math.PI*2,true);
	    ctx.closePath();
	    ctx.fill();
		};
	   };
	},
	fadeUpLoop: function() {
		if (eon.keepHomeStatingYall == true) {
			eon.keepFloatingAroundYall = false;
			eon.homeStateCount++;
			if (eon.homeStateCount < 30) {
				window.setTimeout(eon.fadeUpLoop, 20);
			        eon.fadeUp();
		    };
		    if (eon.homeStateCount == 30) {
		    	eon.reset();
		    };
		};


	},
//another transition animation
	fadeOut: function() {
		ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, 1400, 800);
      //Box
      ctx.strokeStyle = '#000000';
      ctx.strokeRect(1,  1, 1400-2, 800-2);

      for (var i = 0; i < particles.length; i++) {
      	var particle = particles[i];
	    particle.position[1] += Math.floor(Math.random() * 8) -8;
	    particle.position[0] += Math.floor(Math.random() * 8) -8;
	    particle.fadeOutDisappear += 1;
	    if (particle.fadeOutDisappear < 40) {
	    	if (i < particles.length) {
	 		ctx.fillStyle = 'magenta';
	 	};
	 	if (i < particles.length*.8) {
	 		ctx.fillStyle = 'green';
	 	};
	 	if (i < particles.length*.6) {
	 		ctx.fillStyle = 'blue';
	 	};
	 	if (i < particles.length*.4) {
	 		ctx.fillStyle = 'orange';
	 	};
	 	if (i < particles.length*.2) {
	 		ctx.fillStyle = 'purple';
	 	};
	    
	    ctx.beginPath();
	    ctx.arc(particle.position[0], particle.position[1],1,0,Math.PI*2,true);
	    ctx.closePath();
	    ctx.fill();
		};
	   };
	},
	fadeOutLoop: function() {
		if (eon.keepHomeStatingYall == true) {
			eon.keepFloatingAroundYall = false;
			eon.homeStateCount++;
			if (eon.homeStateCount < 30) {
				window.setTimeout(eon.fadeOutLoop, 20);
			        eon.fadeOut();
		    };
		    if (eon.homeStateCount == 30) {
		    	eon.reset();
		    };
		};
	},
//another transition animation
	collapse: function() {
		ctx.fillStyle = 'black';
      	ctx.fillRect(0, 0, 1400, 800);
      	ctx.strokeStyle = '#000000';
      	ctx.strokeRect(1,  1, 1400-2, 800-2);

	  for (var i = 0; i < particles.length; i++) {
    	var particle = particles[i],
        dx = screen.width/2 - particle.position[0],
        dy = screen.width/2 - particle.position[1];

 		var dxv = Math.floor(Math.random() * 10) + 1;
 		var dyv = Math.floor(Math.random() * 10) + 1;
	    particle.velocity = [dx / dxv, dy / dyv];
	    particle.position[0] += particle.velocity[0];
	    particle.position[1] += particle.velocity[1];
	    particle.collapseDisappear += 1;
	    if (particle.collapseDisappear < 40) {
	    	ctx.fillStyle = particle.trueColor;
	    };

	    ctx.beginPath();
	    ctx.arc(particle.position[0], particle.position[1],1,0,Math.PI*2,true);
	    ctx.closePath();
	    ctx.fill();
	   };
	},
	collapseLoop: function() {
		if (eon.keepHomeStatingYall == true) {
			eon.keepFloatingAroundYall = false;
			eon.homeStateCount++;
			if (eon.homeStateCount < 30) {
				window.setTimeout(eon.collapseLoop, 20);
			        eon.collapse();
		    };
		    if (eon.homeStateCount == 30) {
		    	eon.reset();
		    };
		};
	}

};