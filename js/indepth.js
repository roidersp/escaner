var disqus_shortname = 'juanfutbol';
var disqus_identifier;
var disqus_url="626afd40-91b2-4c1d-b95e-8e298ed39c2f";
var disqus_number_c=2;
var disqus_per_page=3;
var tamaño_total=1920;
var ventana_alto = $(window).height();





var indepth_mono_gira = function(){
	var no_mono=1;
	var control = setInterval(function(){
			$(".indepth_mono img").removeClass("mono_active");
			$("#mono_"+no_mono).addClass("mono_active");
			if(no_mono>=4){
				no_mono=1;	
			}else{
				no_mono++;
			}
		}, 1500);
		
		
		
}

indepth_mono_gira();

var indepth_circulos = function(component, width, minw, porcentaje, img){
		var svg = d3.select("#"+component).append("svg") 
		    .attr("xmlns", "http://www.w3.org/2000/svg")
		    .attr("version", "1.1")
		    .attr("viewBox", "0 0 130 150");	
	
		var g=svg.append("g").attr("id","pieChart")
		.attr("transform", "translate(" + 130 / 2 + "," + 130 / 2 + ")");
		var initial_entity = JSON.parse('[{"number":"0"},{"number":"1"}]');
		var color = ["#FFFFFF", "#000000"];
		var diameter= width;
		var donut_center= minw;
		var entity= JSON.parse('[{"number":"'+porcentaje+'"},{"number":"'+(100-porcentaje)+'"}]');
		
		var radius = diameter/2;   //calculate the radius value
		
		var color = d3.scale.ordinal() // assign the color in the array for each pie
		    .range(color);  // color array
		
		var arc = d3.svg.arc()  // draw the circle for the donnut
		    .outerRadius(radius) // size donnut
		    .innerRadius(donut_center/2); // size donut center
		    
		var pie = d3.layout.pie() // draw the piece of pie
		    .sort(null)
		    .value(function (d) { 
		    	 return d.number; 
		    	}); //assing the value of the pie for calculate the size
		
		var path = g.selectAll("path")
		  .data(pie(entity))
		  .enter().append("path")
		  .attr("fill", function(d, i) { return color(i); })
		  .attr("d", arc)
		  .each(function(d) { this._current = d; }); 
		
		  $.each(entity ,function (i, array){
			  array.number = +array.number;
		  });
		 	
		// var timeout = setTimeout(function(){change();},1000);
		
		/*function change() {
		    clearTimeout(timeout);
		    path = path.data(pie(entity)); // compute the new angles
		    path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
		}*/
						  
		function arcTween(a) {
		  	var i = d3.interpolate(this._current, a);
		  	this._current = i(0);
		  	return function(t) {
		    	return arc(i(t));
		};
	}
	
	
svg.append("image")
		.attr("transform", "translate(" + 42 + "," + 42 + ")")
		.attr("width",46)
		.attr("height",46)
		.attr("xlink:href","http://s3.amazonaws.com/stadium-azteca.underdog.gs/page/626afd40-91b2-4c1d-b95e-8e298ed39c2f/final/images/Imgs_dark_"+img+".svg");

}



 function loadDisqus(source, identifier, url) {
if (window.DISQUS) {
   jQuery('#disqus_thread').insertAfter(source);
   /** if Disqus exists, call it's reset method with new parameters **/

    DISQUS.reset({
  reload: true,
  config: function () { 
   this.page.identifier = identifier.toString();    //important to convert it to string
   this.page.url = url;
  }
 });
} else {
//insert a wrapper in HTML after the relevant "show comments" link
	source.append('<div id="disqus_thread"></div>');
   //jQuery('<div id="disqus_thread"></div>').insertAfter(source);
   disqus_identifier = identifier; //set the identifier argument
   disqus_url = url; //set the permalink argument
   disqus_per_page=3;
   //append the Disqus embed script to HTML
   var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
   dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
   jQuery('head').append(dsq);
}
};

loadDisqus($("#indepth_coments"),disqus_url, "http://juanfutbol.com/indepth/"+disqus_url);


$(document).on("click", "#indepth_button_ver" ,function(){
		var position = $(".indepth_content_top").position();
		$('html, body').animate({
			scrollTop: position.top
		}, 2000);
	});


$('#indepth_cover').css("height",(ventana_alto-100)+"px");


$('.indepth_jugador').hover(
         function () {
	       $(this).find(".indepth_jugador_info").hide();
           $(this).find(".indepth_jugador_est").show();
         }, 
         function () {
	         
           $(this).find(".indepth_jugador_est").hide();
           $(this).find(".indepth_jugador_info").show();
         }
     );
     
 s = skrollr.init({
	mobileCheck: function() {
        //hack - forces mobile version to be off
        return false;
     }
});
	 
$(" #skrollr-body").css({
	 "min-height": "1px",
	"position": "relative",
	"top": 0,
	"left": 0, 
	"width": "100%",
	"height": "auto"
 });
     
   
 var device = navigator.userAgent

if (device.match(/Iphone/i)|| device.match(/Ipod/i)|| device.match(/Android/i)|| device.match(/J2ME/i)|| device.match(/BlackBerry/i)|| device.match(/iPhone|iPad|iPod/i)|| device.match(/Opera Mini/i)|| device.match(/IEMobile/i)|| device.match(/Mobile/i)|| device.match(/Windows Phone/i)|| device.match(/windows mobile/i)|| device.match(/windows ce/i)|| device.match(/webOS/i)|| device.match(/palm/i)|| device.match(/bada/i)|| device.match(/series60/i)|| device.match(/nokia/i)|| device.match(/symbian/i)|| device.match(/HTC/i))
 { 
mobile=true;
	$(".indepth_break .indepth_parallax_back").css("background-attachment","scroll");
	
$("#indepth_page4").css("background-attachment","scroll");
$("#indepth_page1").css("background-attachment","scroll");
$("#indepth_page1").css("background-position","center bottom");
}
else
{
	mobile=false;
}




