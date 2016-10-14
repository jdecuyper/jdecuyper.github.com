Tristesse = new Object();
Tristesse.numero = 0;
Tristesse.maxDepth = 10000;
Tristesse.nextx = 0;
Tristesse.nexty = 0;

Tristesse.UP_BUTTONS = "#EEEEEE";
Tristesse.instanced = new Array();

Tristesse.init = function(){
	Tristesse.instanced = new Array();
	
  var style;
	
	// Contenitore
  style = $('<style>.tacontainer {   width:330px;   height:210px;   background-color:transparent; position:absolute;};</style>')
  $('html > head').append(style);
	
	// Ombra
  style = $('<style>.tashadow {   width:320px;   height:200px;   background-color:#000;  opacity:0.5;position:absolute};</style>')
  $('html > head').append(style);
	
	// Bordo
  style = $('<style>.taborder {   width:320px;   height:200px;   background-color:#C3C3C3;  position:absolute};</style>')
  $('html > head').append(style);
	
	// titolo
  style = $('<style>.tatitle {   width:320px;   height:20px;   background-color:#C3C3C3;  position:absolute};</style>')
  $('html > head').append(style);
	
	// testo del titolo
  style = $('<style>.tatitletext {   width:310px;   height:14px;   background-color:transparent;  position:absolute};</style>')
  $('html > head').append(style);
	
	// area di drag del titolo
  style = $('<style>.tatitlehitarea {   width:320px;   height:20px;   background-color:transparent;  position:absolute};</style>')
  $('html > head').append(style);
	
	// brackground
  style = $('<style>.tabackground {   width:316px;   height:196px;   background-color:#000080; position:absolute;};</style>')
  $('html > head').append(style);
	
	// contenuto
  style = $('<style>.tacontent {   width:310px;   height:170px;   background-color:transparent; position:absolute; overflow:hidden};</style>')
  $('html > head').append(style);
	
	// contenuto scrollabile
  style = $('<style>.tacontentscroll {   width:310px;   height:170px;   background-color:transparent; position:absolute;};</style>')
  $('html > head').append(style);
	
	// Pulsante di chiusura
  style = $('<style>.tachiudi {   width:10px;   height:14px;   background-color:'+Tristesse.UP_BUTTONS+';  position:absolute ; padding-left:2px};</style>')
  $('html > head').append(style);

	// Hit area di chiusura
  style = $('<style>.tachiudihitarea {   width:12px;   height:14px;   background-color:transparent;  position:absolute};</style>')
  $('html > head').append(style);

	// Pulsante di chiuditutte
  style = $('<style>.tachiudiall {   width:14px;   height:12px;   background-color:'+Tristesse.UP_BUTTONS+';  position:absolute ; padding-left:2px; padding-top:2px};</style>')
  $('html > head').append(style);

	// Hit area di chiusuratutte
  style = $('<style>.tachiudiallhitarea {   width:16px;   height:14px;   background-color:transparent;  position:absolute};</style>')
  $('html > head').append(style);
	
  
}

Tristesse.trace = function(xValue){
  Tristesse.numero++
	
	// Costruisce la finestra
  $("body").append("<div class='tacontainer' id='ta"+Tristesse.numero+"'>");
	Tristesse.instanced.push($("#ta"+Tristesse.numero));
  
  $("#ta"+Tristesse.numero).append("<div class='tashadow' id='tashadow"+Tristesse.numero+"'>");
  $("#tashadow"+Tristesse.numero).css({"left":10,"top":10});
  $("#ta"+Tristesse.numero).append("<div class='taborder' id='taborder"+Tristesse.numero+"'>");
  $("#ta"+Tristesse.numero).append("<div class='tabackground' id='tabackground"+Tristesse.numero+"'>");
  $("#tabackground"+Tristesse.numero).css({"left":2,"top":2});
  
  $("#ta"+Tristesse.numero).append("<div class='tacontent' id='tacontent"+Tristesse.numero+"'>");
  $("#tacontent"+Tristesse.numero).css({"left":5,"top":27});
  
  $("#ta"+Tristesse.numero).append("<div class='tatitle' id='tatitle"+Tristesse.numero+"'>");
  $("#ta"+Tristesse.numero).append("<div class='tatitletext' id='tatitletext"+Tristesse.numero+"'>");
  $("#tatitletext"+Tristesse.numero).css({"left":5,"top":3});
  $("#ta"+Tristesse.numero).append("<div class='tatitlehitarea' id='tatitlehitarea"+Tristesse.numero+"'>");
	
	$("#ta"+Tristesse.numero).append("<div class='tachiudi' id='tachiudi"+Tristesse.numero+"'>");
	$("#ta"+Tristesse.numero).append("<div class='tachiudihitarea' id='tachiudihitarea"+Tristesse.numero+"'>");
  $("#tachiudi"+Tristesse.numero).css({"left":305,"top":3});
  $("#tachiudihitarea"+Tristesse.numero).css({"left":305,"top":3});
	$("#tachiudi"+Tristesse.numero).append("<label id='taclosex"+Tristesse.numero+"'><font color='#000000' face='Courier new' size='2'>X</font></label>");
  $("#taclosex"+Tristesse.numero).css({"position":"absolute","top":-4});
	$("#ta"+Tristesse.numero).append("<div class='tachiudiall' id='tachiudiall"+Tristesse.numero+"'>");
	$("#ta"+Tristesse.numero).append("<div class='tachiudiallhitarea' id='tachiudiallhitarea"+Tristesse.numero+"'>");
  $("#tachiudiall"+Tristesse.numero).css({"left":285,"top":3});
  $("#tachiudiallhitarea"+Tristesse.numero).css({"left":285,"top":3});
	$("#tachiudiall"+Tristesse.numero).append("<label id='taclosexx"+Tristesse.numero+"'><font color='#000000' face='Courier new' size='1'>XX</font></label>");
	$("#taclosexx"+Tristesse.numero).css({"position":"absolute","top":-4});
	$("#tacontent"+Tristesse.numero).append("<div class='tacontentscroll' id='tacontentscroll"+Tristesse.numero+"'>");
  $("#tacontentscroll"+Tristesse.numero).append("<font color='#FFFFFF' face='Courier new' size='2'>"+Tristesse.tratta(xValue)+"</font>");
  $("#tatitletext"+Tristesse.numero).append("<label id='tatextx"+Tristesse.numero+"'><font color='#000000' face='Courier new' size='2'>Window "+Tristesse.numero+"</font></label>");
  $("#tatextx"+Tristesse.numero).css({"position":"absolute","top":-4});
  $("#tatitlehitarea"+Tristesse.numero).bind("mousedown",Tristesse.onMouseDown);
	$("#tachiudihitarea"+Tristesse.numero).bind("click",Tristesse.onChiudi);
	$("#tachiudiallhitarea"+Tristesse.numero).bind("click",Tristesse.onChiudiAll);
	$("#tacontent"+Tristesse.numero).mousewheel(Tristesse.onWheel);
	
	// Posiziona la finestra
	Tristesse.nextPosition();
	$("#ta"+Tristesse.numero).css({"left":Tristesse.nextx,"top":Tristesse.nexty});
	// La porta in alto
	var depth = Tristesse.getNextHighestDepth();
	$("#ta"+Tristesse.numero).css("z-index",depth);
	
}

Tristesse.nextPosition = function(){
	var maxx = $(document).width();
	var maxy = $(document).height();
	Tristesse.nextx += 20;
	Tristesse.nexty += 20;
	if (Tristesse.nextx+330 > maxx){
		Tristesse.nextx = 0
	}
	if (Tristesse.nexty+210 > maxy){
		Tristesse.nexty = 0
	}
}


function trace(xValue){
	if (typeof console != "undefined"){
		console.log(xValue);
	}
}

Tristesse.tratta = function(s){
	var sRet = s.replace(/\n/g,"<br>");
	return sRet;
}

Tristesse.onWheel = function(e, delta, deltaX, deltaY){
	e.preventDefault();
	e.stopPropagation();
	
	var ct = $(this);
	if (delta < 0){
		Tristesse.scrollaSu(ct);
	}else{
		Tristesse.scrollaGiu(ct);
	}
}

Tristesse.scrollaSu = function(ct){
	//var mcFont = $(ct).find("font");
	var mcFont = $("font", ct);
	var mcDiv = $(ct).find("div");
	
	if (mcFont.height() > mcDiv.height()){
		var pos = mcDiv.position();
		if (pos.top < -mcFont.height()+mcDiv.height()){
			mcDiv.css("top",-mcFont.height()+mcDiv.height());
		}else{
			mcDiv.css("top",(pos.top-10));
		}
	}
}


Tristesse.scrollaGiu = function(ct){
	var mcFont = $(ct).find("font");
	var mcDiv = $(ct).find("div");
	
	if (mcFont.height() > mcDiv.height()){
		var pos = mcDiv.position();
		if (pos.top < 0){
			$(mcDiv).css("top",(pos.top+10));
		}else{
			$(mcDiv).css("top",0);
		}	
	}
}


Tristesse.onChiudi = function(e){
	e.preventDefault();
	$(e.target).parent().remove();
}

Tristesse.onChiudiAll = function(e){
	e.preventDefault();
	var mio = $(this).parent();
	//trace(mio);
	
	for (var x=0;x<Tristesse.instanced.length;x++){
		if (Tristesse.instanced[x].attr("id") != mio.attr("id")){
			Tristesse.instanced[x].remove();
		}
	}
	Tristesse.instanced = new Array();
	
}



Tristesse.onMouseDown = function(e){
  e.preventDefault();
  var depth = Tristesse.getNextHighestDepth();
  var pos = $(e.target).parent().position();
  $(e.target).parent().css("z-index",depth);
  Tristesse.currentDrag = $(e.target).parent();
  Tristesse.deltax = e.pageX - pos.left;
  Tristesse.deltay = e.pageY - pos.top;
  $("html").bind("mousemove",Tristesse.onMouseMove);
  $("html").bind("mouseup",Tristesse.onMouseUp); 
}

Tristesse.onMouseMove = function(e){
  Tristesse.currentDrag.css({"left": (e.pageX-Tristesse.deltax)+"px","top":(e.pageY-Tristesse.deltay)+"px"});
}
Tristesse.onMouseUp = function(e){
  $("html").unbind("mousemove",Tristesse.onMouseMove);
  $("html").unbind("mouseup",Tristesse.onMouseUp);
}

Tristesse.getNextHighestDepth = function(){
  Tristesse.maxDepth++;
  return Tristesse.maxDepth;
}

