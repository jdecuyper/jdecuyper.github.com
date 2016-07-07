Tag = new Object();
Tag.TAG_INIT_FAILED_NO_TAGGING = "tag_init_failed_no_tagging";  // Manca il tag "tagging" dentro al file di risorse
Tag.TAG_NOT_ENABLED_IN_THIS_SESSION = "tag_not_enabled_in_this_session"; // Il tag "enabled" è "false" oppure non esiste
Tag.TAG_ERROR_INSUFFICIENT_DATA = "tag_error_insufficient_data"; // Manca il nome della funzione da chiamare oppure mancano i tags
Tag.TAG_READY = "tag_ready"; // Inizializzazione ok
Tag.TAG_KO = "tag_ok"; // Il tag non esiste oppure il tagggin non è abilitato (conseguenza di tag_not_enabled_in_this_session)
Tag.TAG_OK = "tag_ko"; // Il tag ha avuto successo

Tag.on = false;
Tag.separator = "/";
Tag.dict = new Object();
Tag.jsfunction = "";

Tag.init = function(oRes) {
  on = false;
  dict = new Object();
  var sInit = Tag.parse(oRes);
  if (sInit == Tag.TAG_READY) {
    on = true;
  }
  return sInit;
}


Tag.parse = function(oRes){
  // Se non esistono i dati, non tagga
  if (oRes["tagging"] == undefined) {
    return Tag.TAG_INIT_FAILED_NO_TAGGING;
  }
  var o = oRes["tagging"];
  
  // Enabled?
  var s = ("" + o["enabled"]).toLowerCase();
  if (s != "true") {
    return Tag.TAG_NOT_ENABLED_IN_THIS_SESSION;
  }
  // Controlli formali
  if (o["jsfunction"] == undefined) {
    return Tag.TAG_ERROR_INSUFFICIENT_DATA;
  }
  jsfunction = o["jsfunction"];
  
  if (o["tags"] == undefined) {
    return Tag.TAG_ERROR_INSUFFICIENT_DATA;
  }
  
  
  // Compilazione del dictionary
  var a = this.geta(o.tags.tag)
  for (var x=0;x<a.length;x++){
    var tag = a[x];
    var sValue = "" + tag;
    dict[(tag.id).toLowerCase()] = sValue;
    
  }
  return Tag.TAG_READY
}

Tag.geta = function(a) {
  if (a instanceof String){
    return [a];
  }else if (a instanceof Array){
    return a;
  }
  return [];
}

Tag.tag = function(id) {
  if (!on) {
    return Tag.TAG_KO;
  }

  var sTag = dict[id.toLowerCase()];
  if (sTag == undefined) {
    // Effettua sempre il trace se l'id passato non esiste
    trace("Ko tag -> ID:'" + id + "' non esiste.");
    return Tag.TAG_KO;
  }
  Tag.callJs(sTag);
  return Tag.TAG_OK;
}

Tag.callJs = function(tag) {
  
  try{
    window[jsfunction](tag);
    trace("Ok tag -> " + jsfunction + "('" + tag + "')");
  }catch (e){
    trace("Ko tag chiamata alla funzione -> '" + jsfunction + "' che non è definita.");
  }
  
}		


