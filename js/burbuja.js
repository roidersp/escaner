

   
   
   var normalize = (function() {
  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", 
      to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};
 
  for(var i = 0, j = from.length; i < j; i++ )
      mapping[ from.charAt( i ) ] = to.charAt( i );
 
  return function( str ) {
      var ret = [];
      for( var i = 0, j = str.length; i < j; i++ ) {
          var c = str.charAt( i );
          if( mapping.hasOwnProperty( str.charAt( i ) ) )
              ret.push( mapping[ c ] );
          else
              ret.push( c );
      }      
      return ret.join( '' );
  }
 
})();

var diameter = $("#indepth_burbujas_container").width(),
 h= $(window).height(),
    format = d3.format(",d"),
    color = d3.scale.category20c();
    
    console.log(diameter);

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, h])
    .padding(20);

var svg = d3.select("#indepth_burbujas_container").append("svg")
    .attr("width", diameter)
    .attr("height", h)
    .attr("class", "bubble");

d3.json("flare.json", function(error, root) {
	
	
  var node = svg.selectAll(".node")
      .data(bubble.nodes(classes(root))
      .filter(function(d) { return !d.children; }))
    .enter().append("g")
      .attr("class", "burbuja_equipos")
      .attr("id",function(d) { return "burbuja_"+(normalize(d.className)).replace(/\s/g,"_"); })
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .attr("width", function(d) { return (d.r)*2; })
	  .attr("height", function(d) { return (d.r)*2; });

  node.append("title")
      .text(function(d) { return d.className + ": " + format(d.value); });


node.append("circle")
      .attr("r", function(d) { return d.r; })
      .attr("radio_o", function(d) { return d.r; })
      .attr("class","circulo_back")
      .attr("fill","transparent");
      

node.append("circle")
      .attr("r", function(d) { return d.r; })
      .style("fill", "#6b333a")
      .attr("radio_o", function(d) { return d.r; })
      .attr("class","circulo_in");

  node.append("circle")
      .attr("r", function(d) { return d.r; })
      .attr("radio_o", function(d) { return d.r; })
      .attr("class","circulo_out")
      .attr("fill","transparent")
      .attr("font_size",function(d) { if(d.r>150){ 
	      	return "40px";
	      }else{
		      if(d.r>120){
			       return "34px";
			   }else{
				   if(d.r>90){ 
					   return "30px";
					  }else{
						  if(d.r>70){ 
							  return "24px";
					  		}else{
					  			if(d.r>50){ 
						  			return "20px";
						  		}else{
						  		return "15px";
								} 
							} 
						  
						} 
						}
						}
		});
     
   
      
  node.append("g")
  	.attr("id",function(d) { return "jugadores_"+(normalize(d.className)).replace(/\s/g,"_"); })
  	.attr("class", "jugadores_cont")
  	.attr("width", function(d) { return (d.r)*2; })
	  .attr("height", function(d) { return (d.r)*2; });

  node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      
      .style("font-size",function(d) { if(d.r>150){ 
	      	return "40px";
	      }else{
		      if(d.r>120){
			       return "34px";
			   }else{
				   if(d.r>90){ 
					   return "30px";
					  }else{
						  if(d.r>70){ 
							  return "24px";
					  		}else{
					  			if(d.r>50){ 
						  			return "20px";
						  		}else{
						  		return "15px";
								} 
							} 
						  
						} 
						}
						}
		})
      .text(function(d) { return d.className.substring(0, d.r / 3); });
});

// Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(root) {
  var classes = [];

  function recurse(name, node) {
    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
    else classes.push({packageName: name, className: node.name, value: node.size});
  }

  recurse(null, root);
  return {children: classes};
}

d3.select(self.frameElement).style("height", diameter + "px");

var text_size;

$(document).on("mouseenter",".burbuja_equipos .circulo_out",function(){
	var m=d3.select(this.parentNode);
	var radio=d3.select(this).attr("radio_o");
	
	
	
	if(radio>80){
		m.select("text").transition()
		.style("font-size","25px");
		m.select(".circulo_in").transition()
		.attr("r",80);
	}else{
		//m.moveToFront();		
		m.select(".circulo_in").transition()
		.attr("r",80);
		
		m.select(".circulo_out").transition()
		.attr("r",80);
		
		
		
		
		m.select(".circulo_back")
		
		.attr("fill","rgb(41, 40, 51)");
		
		m.select(".circulo_back")
		.attr("r",100);
		
		m.moveToFront();
	}
	
	
	
	
	

});

/*$(document).on("mouseenter",".burbuja_equipos .circulo_out ",function(){
	var radio=d3.select(this).parentNode.select("circulo_in").attr("radio_o");
	console.log(radio);
	d3.select(this).parentNode.select("circulo_in").transition()
		.attr("r",80);

});*/


$(document).on("mouseout",".burbuja_equipos .circulo_out",function(){
	var radio=d3.select(this).attr("radio_o");
	console.log(radio);
	var m=d3.select(this.parentNode);
	console.log(m.select(".circulo_in"));
	m.select(".circulo_in").transition()
		.attr("r",radio);
		
	text_size=$(this).attr("font_size");
	
	console.log(text_size);
	
	m.select("text").transition()
		.style("font-size",text_size);
		
	m.select(".circulo_back")
		.attr("fill","transparent");
		

		
	

});

d3.selection.prototype.moveToBack = function() { 
    return this.each(function() { 
        var firstChild = this.parentNode.firstChild; 
        if (firstChild) { 
            this.parentNode.insertBefore(this, firstChild); 
        } 
    }); 
};

d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

