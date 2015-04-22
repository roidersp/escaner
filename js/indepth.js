var disqus_shortname = 'juanfutbol';
var disqus_identifier;
var disqus_url="626afd40-91b2-4c1d-b95e-8e298ed39c2f";
var disqus_number_c=2;
var disqus_per_page=3;
var tamaño_total=1920;
var ventana_alto = $(window).height();


$("#indepth_page6").on("click",function() {
	d3.selectAll("polygon").attr("fill","#e42a2c");
});





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


var indepth_circulos = function(component, width, minw, datos, img){
	
		var ganados=0, perdidos=0, empatados=0;
		var col_ganados=$("#"+component+ " .indepth_partidos_columna.ganados");
			var col_empatados=$("#"+component+ " .indepth_partidos_columna.empatados")
			var col_perdidos=$("#"+component+ " .indepth_partidos_columna.perdidos")
	
		$.each(datos.partido, function( i, item ) {
			
			
			var marcador;
				
			if(item.tipo=="local"){
				marcador=item.goles_a_favor+"-"+item.goles_encontra;
			}else{
				marcador=item.goles_encontra+"-"+item.goles_a_favor;
			}
				
			var item_col='<div class="partido_item"><div class="indepth_escudo_team"><img src="images/Banderas/'+(normalize(item.equipo)).replace(" ","_")+'.png" ></div><div class="indepth_team_cont_out"><div class="indepth_team_cont"><div class="indepth_nombre_team">'+item.equipo+'</div><div class="indepth_marcador_team">'+marcador+'</div></div></div></div>';
			
			//empatados
			if(item.goles_a_favor==item.goles_encontra){
				col_empatados.find(".indepth_partidos_container").append(item_col);
				empatados++;
			}
			
			//ganados
			if(item.goles_a_favor>item.goles_encontra){
				col_ganados.find(".indepth_partidos_container").append(item_col);
				ganados++
			}
			
			//perdidos
			if(item.goles_a_favor<item.goles_encontra){
				col_perdidos.find(".indepth_partidos_container").append(item_col);
				perdidos++
			}

         	
         });
		
		 
	
		var svg = d3.select("#"+component+" .indepth_grafica_partidos").append("svg") 
		    .attr("xmlns", "http://www.w3.org/2000/svg")
		    .attr("version", "1.1")
		    .attr("viewBox", "0 0 130 130");	
	
		var g=svg.append("g").attr("id","pieChart")
		.attr("transform", "translate(" + 130 / 2 + "," + 130 / 2 + ")");
		var initial_entity = JSON.parse('[{"number":"0"},{"number":"1"}]');
		var color = ["#e82b2c", "#8b8c8f", "#6bdb6b"];
		var diameter= width;
		var donut_center= minw;
		var entity= JSON.parse('[{"number":"'+perdidos+'"},{"number":"'+empatados+'"},{"number":"'+ganados+'"}]');
		
		
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
		 						  
		function arcTween(a) {
		  	var i = d3.interpolate(this._current, a);
		  	this._current = i(0);
		  	return function(t) {
		    	return arc(i(t));
		};
	}
	
		var total=perdidos+empatados+ganados;
		$("#"+component+" .indepth_grafica_partidos .indepth_grafica_total").html(total);
		col_perdidos.find(".indepth_partido_circulo_num").html(perdidos);
		col_empatados.find(".indepth_partido_circulo_num").html(empatados);
		col_ganados.find(".indepth_partido_circulo_num").html(ganados);
		
		
	}
	
	
	var indepth_goles = function(tipo,data){
		var container = $(".indepth_graficas_goles."+tipo);
		g_oficiales=data.oficiales;
		g_amistosos=data.amistosos;
		
		//oficiales
		
		var o_total=0;
		
		$.each(g_oficiales, function( i, item ) {
			o_total=o_total+parseInt(item);
		})
		
		container.find(".goles_oficiales .indepth_grafica_text span").html(o_total);
		
		container.find(".goles_oficiales #indepth_grafica_numeros_15").html(g_oficiales["15"]);
		container.find(".goles_oficiales #indepth_grafica_numeros_30").html(g_oficiales["30"]);
		container.find(".goles_oficiales #indepth_grafica_numeros_45").html(g_oficiales["45"]);
		container.find(".goles_oficiales #indepth_grafica_numeros_60").html(g_oficiales["60"]);
		container.find(".goles_oficiales #indepth_grafica_numeros_75").html(g_oficiales["75"]);
		container.find(".goles_oficiales #indepth_grafica_numeros_90").html(g_oficiales["90"]);
				
		
		//amistosos
		
		var a_total=0;
		
		$.each(g_amistosos, function( i, item ) {
			a_total=a_total+parseInt(item);
		})
		
		
		container.find(".goles_amistosos .indepth_grafica_text span").html(a_total);
		
		container.find(".goles_amistosos #indepth_grafica_numeros_15").html(g_amistosos["15"]);
		container.find(".goles_amistosos #indepth_grafica_numeros_30").html(g_amistosos["30"]);
		container.find(".goles_amistosos #indepth_grafica_numeros_45").html(g_amistosos["45"]);
		container.find(".goles_amistosos #indepth_grafica_numeros_60").html(g_amistosos["60"]);
		container.find(".goles_amistosos #indepth_grafica_numeros_75").html(g_amistosos["75"]);
		container.find(".goles_amistosos #indepth_grafica_numeros_90").html(g_amistosos["90"]);
		
		

		

		
		
	}
	
	var oficiales;
	var amistosos;
	
	$.getJSON( "js/partidos.json", function( data ) {
		oficiales=data.oficiales;
		amistosos=data.amistosos;
      
		var total=oficiales.partido.length+amistosos.partido.length;
		$("#indepth_numero_dirigidos").html(total);
      
		indepth_circulos("grafica_oficiales", 130, 105, oficiales, "Oficiales");
	
		indepth_circulos("grafica_amistosos", 130, 105, amistosos, "Amistosos");
      
    });
    
    
    $.getJSON( "js/goles.json", function( data ) {
		goles_afavor=data.goles.a_favor;
		goles_encontra=data.goles.en_contra;
		
		
		indepth_goles("favor", goles_afavor);
		indepth_goles("contra", goles_encontra);
		
      
    });
	
	//var p_oficiales=
	
	
	
	
	


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




