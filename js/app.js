let update = (bg, scale, pos) => {
    // update position  	
    bg.css('background-repeat', 'no-repeat' )
    bg.css('background-position', `${pos[0]}px ${pos[1]}px` )
    bg.css('background-size', `${scale}%` )
    
    // update display
    $('#url').html(bg.attr('src'));
    $('#pos-x').html(pos[0]);
    $('#pos-y').html(pos[1]);  	
    $('#scale').html(scale.toFixed(2));  
}

$(document).ready( ()=> {
  // setup fullpage
	$('#fullpage').fullpage({scrollingSpeed: 0})
	
  // configure background

  let bg = $('.background-sizer')  
  let pos = (bg.attr('pos') ? bg.attr('pos').split(',') : [0, 0]).map( i => parseFloat(i) );
  let scale = parseFloat(bg.attr('scale') || 100);
  let posDelta = (d) => 5**d
  let scaleDelta = (d) => 0.01 * 10**d
  let deltaIndex = 2;
  
  bg.css('background-image', `url(${bg.attr('src')})` )
  bg.css('background-repeat', 'no-repeat' )  
	update(bg, scale, pos);
	
	$('body').keydown( (e) => {
  	console.log(e.key);
  	// parse key
  	switch (e.key) {  	
      // adjust position
    	case "ArrowLeft":
	    	pos[0] = Math.round( pos[0] - posDelta(deltaIndex) );
    	  break;    	
    	  
    	case "ArrowRight":
	    	pos[0] = Math.round( pos[0] + posDelta(deltaIndex) );
    	  break;

    	case "ArrowUp":
	    	pos[1] =Math.round( pos[1] - posDelta(deltaIndex) );
    	  break;  
    	  
    	case "ArrowDown":
    	pos[1] = Math.round( pos[1] + posDelta(deltaIndex) );
    	  break;    	

    	// adjust scaling  
    	case "=":
    	case "+":
    	  scale = Math.max(0, scale + scaleDelta(deltaIndex));
    	
    	  break; 
    	     	
    	case "-":
    	case "_":
    	  scale = Math.max(0, scale - scaleDelta(deltaIndex));
    	  break;
    	
    	// adjust sensitivity  
    	case "]":
	    	deltaIndex = Math.max(0, Math.min(3, deltaIndex + 1));
    	  break;
    	  
    	case "[":
    	  deltaIndex = Math.max(0, Math.min(3, deltaIndex - 1));
    	  break;
    	  
  	}
  	
  	update(bg, scale, pos);
  })
})