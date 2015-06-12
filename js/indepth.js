var disqus_shortname = 'juanfutbol';
var disqus_identifier;
var disqus_url="concentradora";
var disqus_number_c=2;
var disqus_per_page=3;
var tamaño_total=1920;
var ventana_alto = $(window).height();
var color = ["#e40047", "#ccc5c5", "#1fe9bb"];
var p_ganados=0; 
var p_empatados=0; 
var p_perdidos=0;
var ju=0;
var mas_min=new Array();
var max_min=1500;
var colores=['#0090D5','#28ACE0','#6FD9F8','#8FEFF9','#4CFCD2','#36BF9E','#F73981','#B71557','#8E1652','#8E1652'];
var ventana_ancho;
var oculto=[true,true];

$(".indepth_partidos_boton").on("click",function(){
	
	console.log()
	nume=$(this).attr("num");
	if(oculto[nume-1]){
		$("#indepth_tabla_"+nume).show();
		$(this).addClass("menos");
		oculto[nume-1]=false;
	}else{
		$("#indepth_tabla_"+nume).hide();
		$(this).removeClass("menos");
		oculto[nume-1]=true;
	}
	
	
	
})

$("#indepth_menu").hover(
	function(){
		ventana_ancho = $(window).width();
		if(ventana_ancho>600){
			$(".indepth_menu_item").animate({
				width: "146px"
			},500);
		}
	},
	function(){
		ventana_ancho = $(window).width();
		if(ventana_ancho>600){
			$(".indepth_menu_item").animate({
				width: "18px"
			},500);
		}
		
		
	}
);

/*$(".indepth_menu_item").hover(
	function(){
		
		$(this).find(".indepth_ball").css("background-color", "#149ce9");
	},
	function(){
		$(this).find(".indepth_ball").css("background-color", "none");
		
		
	}
)*/

var indepth_menu=function(){
	$('.indepth_cover').waypoint(function(direction) {
		$("#indepth_menu").fadeOut();
		$(".indepth_share").fadeOut();
	});
	
	 $('#indepth_page1').waypoint(function(direction) {
		 if(direction=='down'){
			 $("#indepth_menu").fadeIn("slow");
			 $(".indepth_share").fadeIn("slow");
			 $("#pbarra").fadeIn("slow");
		 }else{
			  $("#indepth_menu").fadeOut();
			  $("#pbarra").fadeOut();
			   $(".indepth_share").fadeOut();
			   
		 }
		 
		 $("#indepth_menu").show();
		  $(".indepth_share").show();
		 $(".indepth_menu_item").removeClass("active");
		 var num_menu=$(this).attr("num");
		 $("#indepth_menu_0").addClass("active");
		 
		
	},{offset: '50%'});
	
	 $('#indepth_page6').waypoint(function(direction) {
		 if(direction=='down'){
			 $("#indepth_menu").fadeOut();
			 $(".indepth_share").fadeOut("slow");
			  $("#pbarra").css("position","initial");
		 }else{
			  $("#indepth_menu").fadeIn("slow");
			  $(".indepth_share").fadeIn("slow");
			  $("#pbarra").css("position","fixed");
		 }
		 
		
	},{offset: 'bottom-in-view'});
	
	
	$(document).on("click",".indepth_menu_item",function(){
		 var num_menu=$(this).attr("num");
		 var position = $("#indepth_page"+num_menu).offset();
		 console.log(position);
		 
			 f_top=position.top;
			 
			 if(num_menu==4)
			 	f_top=f_top-100;
			 
			 console.log(f_top);
	
		$('html, body').animate({
			scrollTop: f_top
		}, 000);
		$(".indepth_menu_item").removeClass("active");
		 $("#indepth_menu_"+num_menu).addClass("active");	
	 });
	
	$(".indepth_page_content").waypoint(function(direction){
		 $("#indepth_menu").show();
		 $(".indepth_share").show();
		 $("#pbarra").show();
		 $(".indepth_menu_item").removeClass("active");
		 var num_menu=$(this).attr("num");
		 $("#indepth_menu_"+num_menu).addClass("active");		 
	},{offset: '70px'});
	
	$(".indepth_page_content").waypoint(function(direction){
		 $("#indepth_menu").show();
		 $(".indepth_share").show();
		 $("#pbarra").show();
		 $(".indepth_menu_item").removeClass("active");
		 var num_menu=$(this).attr("num");
		 $("#indepth_menu_"+num_menu).addClass("active");
		 
	},{offset: 'bottom-in-view'});
	
	$("#indepth_page_content").waypoint(function(direction){
		$(".indepth_menu_item").removeClass("active");
		 $("#indepth_menu_0").addClass("active");
	},{offset: 'bottom-in-view'});
	
	 $("#indepth_menu").hide();
}

indepth_menu();

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


var indepth_equipos = function(){
	var goleadores=new Array();
	var gminutos=new Array();
	var estados= new Array();
	var goles_total=0;
	var goles_cabeza=0;
	var goles_pieder=0;
	var goles_pieizq=0;
	$.getJSON( urlIndepth+"js/equipos.json", function( data ) {
		
		var equipos=data.equipos;
		$.each(equipos, function( i, item ) {
			var jugadores=item.jugadores;
				$.each(jugadores, function( j, subitem ) {
					var min=parseInt(subitem.minutos);
					var jug_min = new Array();
					 jug_min['nombre']=subitem.nombre+" "+subitem.apellido;
					 jug_min['minutos']=subitem.minutos;
					
					if(gminutos.length==0){
						gminutos.push(jug_min);
					}else{
						if(parseInt(gminutos[0]['minutos'])<=min){
							gminutos.unshift(jug_min);
						}else{
							var min_l=gminutos[gminutos.length-1]['minutos'];
							if(parseInt(min_l)>=parseInt(min)){
								gminutos.push(jug_min);
							}else{
								$.each(gminutos, function( k, gol_item ) {
									min2=parseInt(gol_item['minutos']);
									if(min2<=min){
										gminutos.splice(k, 0,jug_min);
										return false;
									};
								});
							}
						}
					}
					
					var jug_gol = new Array();
					jug_gol['nombre']=subitem.nombre+" "+subitem.apellido;
					var goles=parseInt(subitem.goles.cabeza)+parseInt(subitem.goles.pie_der)+parseInt(subitem.goles.pie_izq);
					goles_total=goles+goles_total;
					jug_gol['goles']=goles;
					jug_gol['cabeza']=subitem.goles.cabeza;
					jug_gol['pie_der']=subitem.goles.pie_der;
					jug_gol['pie_izq']=subitem.goles.pie_izq;
					
					goles_cabeza=parseInt(jug_gol['cabeza'])+goles_cabeza;
					goles_pieder=goles_pieder+parseInt(jug_gol['pie_der']);
					goles_pieizq=goles_pieizq+parseInt(jug_gol['pie_izq']);

					if(goleadores.length==0){
						goleadores.push(jug_gol);
					}else{
						if(parseInt(goleadores[0]['goles'])<=goles){
							goleadores.unshift(jug_gol);
						}else{
							var min_l=goleadores[goleadores.length-1]['goles'];
								if(parseInt(min_l)>=parseInt(goles)){
									goleadores.push(jug_gol);
								}else{
									$.each(goleadores, function( k, gol_item ) {
										min2=parseInt(gol_item['goles']);
										if(min2<=goles){
											goleadores.splice(k, 0,jug_gol);
											return false;
										};
									});
								}
						}
					}
					
					var m_estado=subitem.estado;
					
					
					
					if((estados[m_estado])){

						var lo=estados[m_estado]+1;
						estados[m_estado]=lo;
					}else{
						estados[m_estado]=1;
					}
				});
		});
				
		estados=estados.sort();
		
		var estados_n= new Array();
		
		for(var estado in estados){
			var datos= new Array();
			
			datos['numero']=estados[estado];
			datos['nombre']=estado;
			
			
			if(estados_n.length==0){
				estados_n.push(datos);
			}else{
				if(parseInt(estados_n)[0]<=estados[estado]){
					estados_n.unshift(datos);
				}else{
					var min_l=estados_n[estados_n.length-1]['numero'];
					if(parseInt(min_l)>=parseInt(estados[estado])){
						estados_n.push(datos);
					}else{
						$.each(estados_n, function( k, gol_item ) {
							min2=parseInt(gol_item['numero']);
							if(min2<=estados[estado]){
								estados_n.splice(k, 0,datos);
								return false;
							};
						});
					}
				}
			}
		}
		
		var estado_max=estados_n[0]['numero'];
		var estado_min=estados_n[estados_n.length-1]['numero'];
		var rango=estado_max-estado_min;
		var k=9;
		var amplitud=rango/k;
		
		
		$.each(estados_n, function( i, estado ) {
			var color;
			var num=estado['numero'];
			var nombre=normalize(estado['nombre']).replace(/\s/g,"_").toLowerCase();
			
			
			/*for( j=0;j<=k;j++){
				if(num>=(estado_min+(j*amplitud)) && num<=(estado_min+((j+1)*amplitud)) ){
					color=colores[j];
				}
			}*/
			
			if(num>10){
				color=colores[9];
			}else{
				color=colores[num-1];
			}
			
			var indepth_mapa=$("#indepth_mapa_estados");
			
			
			if(i<15){
				
				/*<div class="indepth_edo_data" id="indepth_edo1">
					<div class="indepth_edo_box">10</div>
					<div class="indepth_edo_nombre">Jalisco</div>
				</div>*/
				/*var indepth_tabla_item=(document.createElement('div')).addClass('indepth_edo_data').css("background-color",color);
				.append(indepth_tabla_item)*/
				
				indepth_mapa.append(createDiv('indepth_edo'+i, 'indepth_edo_data','none'));
				
				 var cont=$('#indepth_edo'+i);
				 cont.append(createDiv('', 'indepth_edo_box',color));
				 var mapa_num_estado= $('#indepth_edo'+i+" .indepth_edo_box");
				 mapa_num_estado.html(num);
				 cont.append(createDiv('', 'indepth_edo_nombre',''));
				 var mapa_nombre_estado= $('#indepth_edo'+i+" .indepth_edo_nombre");
				 mapa_nombre_estado.html(estado['nombre']);
				
				
				
				/*<div class="indepth_edo_data" id="indepth_edo1">
									<div class="indepth_edo_box">10</div>
									<div class="indepth_edo_nombre">Jalisco</div>
								</div>*/
				
			}			
			$("#"+nombre).css("fill",color);
		});
						
		for(var i=0;i<11;i++){
			var id_div=$("#indepth_barra_jugmin_"+(i+1));
			var jugador=gminutos[i];
			var h_jug=(jugador["minutos"]/ max_min)*100;
			id_div.find(".indepth_jugmin_mins").html(jugador["minutos"]);
			id_div.find(".indepth_jugmin_foto").attr("src",urlIndepth+"images/Jugadores2/"+normalize(jugador["nombre"]).replace(/\s/g,"_")+".png");
			id_div.find(".indepth_linea_barra").css("height",h_jug+"%");
			var id_name=$("#indepth_jugmin_jugador_"+(i+1));
			id_name.find(".indepth_jugmin_name").html(jugador["nombre"]);
			
			var id_div_movil=$("#indepth_min_jug_item"+(i+1));
			id_div_movil.find(".indepth_min_jug_nom").html(jugador["nombre"]);
			id_div_movil.find(".indepth_min_jug_mins").html(jugador["minutos"]);
			id_div_movil.find(".indepth_min_jug_bar_in").css("width",h_jug+"%")
			
			
		};
		
		var gol_cont=$("#indepth_goleadores_container");
		
		for(var i=0;i<15;i++){
			var jugador=goleadores[i];
			var img=urlIndepth+"images/Jugadores2/"+normalize(jugador["nombre"]).replace(/\s/g,"_")+".png"
			var g=gol_cont.append('<div class="indepth_goleador_circulo" id="indepth_goleador_circulo'+i+'"></div>');
			var cir=$("#indepth_goleador_circulo"+i);
			cir.html('<img src="'+img+'">');
			cir.attr("nombre",jugador["nombre"]);
			cir.attr("total",jugador["goles"]);
			cir.attr("cabeza",jugador["cabeza"]);
			cir.attr("pie_der",jugador["pie_der"]);
			cir.attr("pie_izq",jugador["pie_izq"]);
		};
		
		gol_cont.append('<div class="indepth_goleador_circulo" id="indepth_goleador_circulo_total"></div>');
		var cir=$("#indepth_goleador_circulo_total");
		cir.attr("cabeza", goles_cabeza);
		cir.attr("pie_der", goles_pieder);
		cir.attr("pie_izq", goles_pieizq);
		cir.attr("total",goles_total);
		cir.attr("nombre","Total")
		.html("TOTAL");
		
		var goleador=$("#indepth_goleador_container");
		
		goleador.find(".indepth_barra_nombre_jug div").html("Total");
		goleador.find(".indepth_barra_goles_cont div").html(goles_total);
		goleador.find("#indepth_goles_cabeza .indepth_numero_goles div").html(goles_cabeza);
		goleador.find("#indepth_goles_derecha .indepth_numero_goles div").html(goles_pieder);
		goleador.find("#indepth_goles_izquierda .indepth_numero_goles div").html(goles_pieizq);
		
	});
	
	var goleador=$("#indepth_goleador_container");

	$(document).on("mouseover",".indepth_goleador_circulo",function(){
		var gl=$(this);
		goleador.find(".indepth_barra_nombre_jug div").html(gl.attr("nombre"));
		goleador.find(".indepth_barra_goles_cont div").html(gl.attr("total"));
		goleador.find("#indepth_goles_cabeza .indepth_numero_goles div").html(gl.attr("cabeza"));
		goleador.find("#indepth_goles_derecha .indepth_numero_goles div").html(gl.attr("pie_der"));
		goleador.find("#indepth_goles_izquierda .indepth_numero_goles div").html(gl.attr("pie_izq"));
		
	});	
	
}

indepth_equipos();

 var createDiv = function(newid, newclass,color) {
    return $('<div/>', {
              id: newid,
              class: newclass,
              css:{
                 backgroundColor: color
              }
            });
 } 

var indepth_pastel = function(component,entity,diameter,donut_center,color ){
		var svg = d3.select("#"+component+" .indepth_grafica_partidos").append("svg") 
		    .attr("xmlns", "http://www.w3.org/2000/svg")
		    .attr("version", "1.1")
		    .attr("viewBox", "0 0 130 130");	
	
		var g=svg.append("g").attr("id","pieChart")
		.attr("transform", "translate(" + 130 / 2 + "," + 130 / 2 + ")");
		var initial_entity = JSON.parse('[{"number":"0"},{"number":"1"}]');
		
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
}


var indepth_circulos = function(component, width, minw, datos, img){
	
		var ganados=0, perdidos=0, empatados=0;
		var col_ganados=$("#"+component+ " .indepth_partidos_columna.ganados");
		var col_empatados=$("#"+component+ " .indepth_partidos_columna.empatados");
		var col_perdidos=$("#"+component+ " .indepth_partidos_columna.perdidos");
	
		$.each(datos.partido, function( i, item ) {
			
			var local="visitante";
			var marcador;
				
			if((item.tipo).toLowerCase()=="local"){
				marcador="<span>"+item.goles_a_favor+"</span>"+"-"+item.goles_encontra;
				 local="local";
			}else{
				marcador=item.goles_encontra+"-"+"<span>"+item.goles_a_favor+"</span>";
			}
			
			//marcador="<span>"+item.goles_a_favor+"</span>"+"-"+item.goles_encontra;
				
			var item_col='<div class="partido_item '+local+'"><div class="indepth_escudo_team"><img src="'+urlIndepth+'images/Banderas/'+(normalize(item.equipo)).replace(" ","_")+'.png" ></div><div class="indepth_team_cont_out"><div class="indepth_team_cont"><div class="indepth_nombre_team">'+item.equipo+'</div><div class="indepth_marcador_team">'+marcador+'</div></div></div></div>';
			
			//empatados
			if(item.goles_a_favor==item.goles_encontra){
				col_empatados.find(".indepth_partidos_container").append(item_col);
				empatados++;
				p_empatados++;
			}
			
			//ganados
			if(item.goles_a_favor>item.goles_encontra){
				col_ganados.find(".indepth_partidos_container").append(item_col);
				ganados++;
				p_ganados++;
			}
			
			//perdidos
			if(item.goles_a_favor<item.goles_encontra){
				col_perdidos.find(".indepth_partidos_container").append(item_col);
				perdidos++;
				p_perdidos++;
			}

         	
         });
		
		var entity= JSON.parse('[{"number":"'+perdidos+'"},{"number":"'+empatados+'"},{"number":"'+ganados+'"}]');
		var diameter= width;
		var donut_center= minw;
		
		
		indepth_pastel(component,entity,diameter,donut_center,color );
	
		var total=perdidos+empatados+ganados;
		$("#"+component+" .indepth_grafica_partidos .indepth_grafica_total").html(total);
		col_perdidos.find(".indepth_partido_circulo_num").html(perdidos);
		col_empatados.find(".indepth_partido_circulo_num").html(empatados);
		col_ganados.find(".indepth_partido_circulo_num").html(ganados);
		
		
	}
	
	
	var indepth_goles = function(tipo,data,g_pp){
		var goles=[0,0,0,0,0,0];
		var container = $(".indepth_graficas_goles."+tipo);
		g_oficiales=data.oficiales;
		g_amistosos=data.amistosos;
		
		//oficiales
		
		var o_total=0;
		
		$.each(g_oficiales, function( i, item ) {
			o_total=o_total+parseInt(item);
		});
		
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
		
		goles[0]=parseInt(g_oficiales["15"])+parseInt(g_amistosos["15"])+parseInt(goles[0]);
		goles[1]=parseInt(g_oficiales["30"])+parseInt(g_amistosos["30"])+parseInt(goles[1]);
		goles[2]=parseInt(g_oficiales["45"])+parseInt(g_amistosos["45"])+parseInt(goles[2]);
		goles[3]=parseInt(g_oficiales["60"])+parseInt(g_amistosos["60"])+parseInt(goles[3]);
		goles[4]=parseInt(g_oficiales["75"])+parseInt(g_amistosos["75"])+parseInt(goles[4]);
		goles[5]=parseInt(g_oficiales["90"])+parseInt(g_amistosos["90"])+parseInt(goles[5]);

		

		return goles;
		
	}
	
	var oficiales;
	var amistosos;
	
	$.getJSON( urlIndepth+"js/partidos.json", function( data ) {
		oficiales=data.oficiales;
		amistosos=data.amistosos;
      
		var total=oficiales.partido.length+amistosos.partido.length;
		//$("#indepth_numero_dirigidos").html(total);
      
		indepth_circulos("grafica_oficiales", 130, 105, oficiales, "Oficiales");
	
		indepth_circulos("grafica_amistosos", 130, 105, amistosos, "Amistosos");
		
		var entity= JSON.parse('[{"number":"'+p_perdidos+'"},{"number":"'+p_empatados+'"},{"number":"'+p_ganados+'"}]');
		
		
		indepth_pastel("grafica_total",entity,130,105,color );
		
		$("#grafica_total .indepth_grafica_partidos .indepth_grafica_total").html(p_perdidos+p_empatados+p_ganados);
		
		$("#grafica_total .indepth_partidos_circulo.perdidos .indepth_partido_circulo_num").html(p_perdidos);
		$("#grafica_total .indepth_partidos_circulo.empatados .indepth_partido_circulo_num").html(p_empatados);
		$("#grafica_total .indepth_partidos_circulo.ganados .indepth_partido_circulo_num").html(p_ganados);
		
      
    });
    
    
    $.getJSON( urlIndepth+"js/goles.json", function( data ) {
		goles_afavor=data.goles.a_favor;
		goles_encontra=data.goles.en_contra;
		
		
		var f=indepth_goles("favor", goles_afavor);
		var co=indepth_goles("contra", goles_encontra);
		

		var container = $(".indepth_graficas_goles.total");
		
		var o_total=0;
		var a_total=0;
		
		$.each(f, function( i, item ) {
			o_total=o_total+parseInt(item);
		});
		
		container.find(".goles_oficiales .indepth_grafica_text span").html(o_total);
		
		container.find(".goles_oficiales #indepth_grafica_numeros_15").html(f[0]);
		container.find(".goles_oficiales #indepth_grafica_numeros_30").html(f[1]);
		container.find(".goles_oficiales #indepth_grafica_numeros_45").html(f[2]);
		container.find(".goles_oficiales #indepth_grafica_numeros_60").html(f[3]);
		container.find(".goles_oficiales #indepth_grafica_numeros_75").html(f[4]);
		container.find(".goles_oficiales #indepth_grafica_numeros_90").html(f[5]);
		
		
		$.each(co, function( i, item ) {
			a_total=a_total+parseInt(item);
		})
		
		container.find(".goles_amistosos .indepth_grafica_text span").html(a_total);
		
		container.find(".goles_amistosos #indepth_grafica_numeros_15").html(co[0]);
		container.find(".goles_amistosos #indepth_grafica_numeros_30").html(co[1]);
		container.find(".goles_amistosos #indepth_grafica_numeros_45").html(co[2]);
		container.find(".goles_amistosos #indepth_grafica_numeros_60").html(co[3]);
		container.find(".goles_amistosos #indepth_grafica_numeros_75").html(co[4]);
		container.find(".goles_amistosos #indepth_grafica_numeros_90").html(co[5]);
		
      
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




