

   
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
    

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, h])
    .padding(20);

var svg = d3.select("#indepth_burbujas_container").append("svg")
    .attr("width", diameter)
    .attr("height", h)
    .attr("class", "bubble");

d3.json("flare.json", function(error, root) {

	var equipos;
	$.getJSON( "js/equipos.json", function( data ) {
	equipos=data.equipos;

	
  var node = svg.selectAll(".node")
      .data(bubble.nodes(classes(root))
      .filter(function(d){  return !d.children; }))
    .enter().append("g")
      .attr("class", "burbuja_equipos")
      .attr("id",function(d) { return "burbuja_"+(normalize(d.className)).replace(/\s/g,"_"); })
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .attr("width", function(d) { return (d.r)*2; })
	  .attr("height", function(d) { return (d.r)*2; });

  node.append("title")
      .text(function(d) {  return d.className + ": " + format(d.value); });

	 node.append("circle")
      .attr("r", function(d) { return d.r; })
      .attr("radio_o", function(d) { return d.r; })
      .attr("class","circulo_back")
      .attr("fill","transparent");

node.append("circle")
      .attr("r", 20)
      .style("fill", "#1b5175")
      .attr("radio_o", function(d) { return d.r; })
      .attr("class","circulo_in")
      .transition()
      	.attr("r",function(d) { return d.r; })
      	.delay(800)
      	.duration(1500)
      	;

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
							  return "18px";
					  		}else{
					  			if(d.r>50){ 
						  			return "16px";
						  		}else{
						  		return "10px";
								} 
							} 
						  
						} 
						}
						}
		});

  node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")     
      .style("opacity","0")
      .style("font-size","12px") 
      .text(function(d) { return d.className.substring(0, d.r / 3); })
		.transition()
	      	.delay(1500)
	      	.duration(2000)
	      	.style("opacity","1")
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
								  return "18px";
						  		}else{
						  			if(d.r>50){ 
							  			return "14px";
							  		}else{
							  		return "10px";
									} 
								} 
							  
							} 
					}
			}
			});
			

      
     var jug=node.append("g")
	  	.attr("id",function(d) { return "jugadores_"+(normalize(d.className)).replace(/\s/g,"_"); })
	  	.attr("name",function(d) { return (normalize(d.className)).replace(/\s/g,"_"); })
	  	.attr("class", "jugadores_cont")
	  	.attr("width", function(d) { return ((d.r)*2)+20; })
		 .attr("height", function(d) { return ((d.r)*2)+20; })
		 .attr("x",0)
		 .attr("y",0)
		 .attr("opacity","0");
		 
		 
		 var def=d3.select("#indepth_burbujas_container svg").insert("defs",":first-child")
		 
		 
		 
		 
		 //var equipo=equipos[""]
		 
		$.each(jug[0], function( i, item ) {
			
			var c=d3.select(item);
			
			var s=(c.attr("name")).toLowerCase();;	
			
			
			var equipo = equipos[s]['jugadores'];
			
			
			
			$.each(equipo, function( i, item ) {
				var nombre=	item['nombre'];
				var apellido = item['apellido'];
				
			/*def.append("pattern")
		 		.attr("width","40px")
		 		.attr("height","40px")
		 		.attr("x","20")
		 		.attr("y","10")
		 		.attr("id",normalize(nombre).replace(/\s/g,"_")+"-"+normalize(apellido).replace(/\s/g,"_"))
		 		.attr("patternUnits","userSpaceOnUse")
		 		/*.append("image")
		 			.attr("xlink:href","images/Jugadores/"+normalize(nombre).replace(/\s/g,"_")+"-"+normalize(apellido).replace(/\s/g,"_")+".png")
		 			.attr("x","0")
		 			.attr("width","40px")
		 		.attr("height","40px")
		 			.attr("y","0");*/
		 			
		 			
		 		var t=c.append("image")
			 		//.attr("clip-path","url(#"+normalize(nombre).replace(/\s/g,"_")+"-"+normalize(apellido).replace(/\s/g,"_")+")")
		 			//.attr("xlink:href","images/Jugadores/"+normalize(nombre).replace(/\s/g,"_")+"-"+normalize(apellido).replace(/\s/g,"_")+".png")
		 			.attr("xlink:href","images/Jugadores/Luis-Montes.png")
		 			.attr("x","10")
		 			.attr("width","40px")
		 			.attr("height","40px")
		 			.attr("y","10");
		 			
		 				
		 			
		 			console.log(c);
		 			
		 	/*c.append("clipPath").attr("id",normalize(nombre).replace(/\s/g,"_")+"-"+normalize(apellido).replace(/\s/g,"_"))
		 		.append("circle")
		 		.attr("fill", "white")
			 	.attr("r","20px");*/
			 
			 	
			 	if(i==0){
				 	t.attr("x",-20)
				 	.attr("y","-110");
			 	}
			 	
			 	
			 	if(i==1){
				 	t.attr("x",43.63)
				 	.attr("y","-83.63");
			 	}
			 	
			 	if(i==2){
				 	t.attr("x",70)
				 	.attr("y","-20");
			 	}
			 	
			 	if(i==3){
				 	t.attr("x","43.63")
				 	.attr("y","43.63");
			 	}
			 	
			 	if(i==4){
				 	t.attr("x",-20)
				 	.attr("y","70");
			 	}
			 	
			 	if(i==5){
				 	t.attr("x","-83.63")
				 	.attr("y","43.63");
			 	}
			 	
			 	if(i==6){
				 	t.attr("x","-110")
				 	.attr("y","-20");
			 	}
			 	
			 	if(i==7){
				 	t.attr("x",-83.63)
				 	.attr("y","-83.63");
			 	}
			 	
			 	
			 	if(i==8){
				 	t.attr("x",-20)
				 	.attr("y","-160");
			 	}
			 	
			 	if(i==9){
				 	t.attr("x",33.57)
				 	.attr("y","-146.29");
			 	}
			 	
			 	if(i==10){
				 	t.attr("x",78.99)
				 	.attr("y","-118.99");
			 	}
			 	
			 	if(i==11){
				 	t.attr("x",109.34)
				 	.attr("y","-73.57");
			 	}
			 	
			 	
		 			
			});
			
			
			
				
			
			 
			
		 			
		});
		 
		 
		
		 
		
		 	
		 /**/
			}); 
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
	
	d3.selectAll(".burbuja_equipos").attr("opacity",".4");
	
	m.attr("opacity","1");
	
	
	m.select("text").transition()
		.style("font-size","15px")
		.style("opacity",1);
	if(radio>80){
		
		m.select(".circulo_in").transition()
		.attr("r",60);
	}else{
		//m.moveToFront();		
		m.select(".circulo_in").transition()
		.attr("r",60);
		
		m.select(".circulo_out").transition()
		.attr("r","120px");
		m.select(".circulo_back")
		
		.attr("fill","rgba(41, 40, 51,1)");
		
		m.select(".circulo_back")
		.attr("r",62);
		
		
	}

	m.select(".jugadores_cont").transition().delay(300).attr("opacity",1);
	
	m.moveToFront();
	
	
	
	
	
	

});

/*$(document).on("mouseenter",".burbuja_equipos .circulo_out ",function(){
	var radio=d3.select(this).parentNode.select("circulo_in").attr("radio_o");
	console.log(radio);
	d3.select(this).parentNode.select("circulo_in").transition()
		.attr("r",80);

});*/


$(document).on("mouseout",".burbuja_equipos .circulo_out",function(){
	d3.selectAll(".burbuja_equipos").attr("opacity","1");
	
	var radio=d3.select(this).attr("radio_o");
	var m=d3.select(this.parentNode);
	
	m.select(".jugadores_cont").transition().attr("opacity",0);
	
	m.select(".circulo_in").transition()
		.attr("r",radio);
	
	m.select(".circulo_out").transition()
		.attr("r",radio);
		
	m.select(".circulo_back").transition()
		.attr("r",radio);
		
	text_size=$(this).attr("font_size");
	
	
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

