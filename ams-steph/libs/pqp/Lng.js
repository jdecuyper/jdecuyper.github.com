Lng = new Object();
Lng.MARCA_MESSAGGI_DINAMICI = false;
Lng.LNG = new Object();

Lng.init = function(xml){
  var o = $.xml2json(xml);  
  Lng.parseLng(o);
}

Lng.parseLng = function(o){
  var a = this.geta(o.labels.str);
  for (var x=0;x<a.length;x++){
    var nome = a[x].name;
    var myPattern = /\./g;
    nome = nome.replace(myPattern,"_");
    var val;
    if (a[x].value == undefined){
      val = a[x].text;
    }else{
      val = a[x].value;
    }
    Lng.LNG[nome] = val;
    if (Lng.MARCA_MESSAGGI_DINAMICI){
      val = "§" + val;
    }
  }
}

Lng.geta = function(a) {
  if (a instanceof String){
    return [a];
  }else if (a instanceof Array){
    return a;
  }
  return [];
}


Lng.getMsg = function(sAmbito,arg){

  var sNome = Lng.getMsgName(arg);
  var aMacro = Lng.getMsgArguments(arg);
  var sRadice = sAmbito;
  var sValue = Lng.LNG[sRadice+"_"+sNome];
  var xValue
  var myPattern
  
  if (sValue != undefined){
    for (var x=0;x<aMacro.length;x++){
      sValue = Lng.safeReplace(sValue,"{{"+x+"}}",aMacro[x]);
    }
    myPattern =  /\\n/g
    sValue = sValue.replace(myPattern,"\n");

    myPattern =  /\\t/g
    sValue = sValue.replace(myPattern,"\t");

    if (sValue.indexOf("|") > -1){
      xValue = sValue.split("|");
    }else{
      xValue = sValue;
    }
  }else{
    xValue = "[VALORE_NON_TROVATO -> "+ sRadice+"_"+sNome+"]"
    trace(xValue);
  }
  return xValue;
}

Lng.getMsgName = function(arg){
  return arg[0]
}

Lng.getMsgArguments = function(arg){
  var aMacro = new Array();
  for (var x=1;x<arg.length;x++){
    aMacro.push(arg[x]);
  }
  return aMacro;
}

Lng.l = function(){
  return Lng.getMsg("app",arguments);
}

Lng.safeReplace = function(input, rep, replaceWith){
  var sb = new String();
  var found = false;

  var sLen = input.length;
  var rLen = rep.length;

  for (var i = 0; i < sLen; i++)
  {
    if(input.charAt(i) == rep.charAt(0))
    {   
      found = true;
      for(var j = 0; j < rLen; j++)
      {
        if(!(input.charAt(i + j) == rep.charAt(j)))
        {
          found = false;
          break;
        }
      }
      if(found)
      {
        sb += replaceWith;
        i = i + (rLen - 1);
        continue;
      }
    }
    sb += input.charAt(i);
  }
  return sb;
}


Lng.ln = function(){
	if (Global.LNG == "it"){
		arguments[0] = arguments[0]+"_it"
		return Lng.getMsg("app",arguments);
	}
	arguments[0] = arguments[0]+"_en"
	return Lng.getMsg("app",arguments);
}

