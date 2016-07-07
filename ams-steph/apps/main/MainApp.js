var ID_DEMO = "knr";
var queue;
var curScreen;
var stage;
var sprites = new Array();
var totalEl = 0;
var loadedEl = 0;
var lMobile = false;

function appReady(){
  showPreloaderapp();
  Global._app.hide();
  showLink33();
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		lMobile = true;
	}

//	lMobile = true;

	if (((jQuery.browser.msie)  && (parseInt(jQuery.browser.version, 10) <= 8))) {
		jQuery(".clipLoader").css("left",480);
		jQuery(".clipLoader").attr("src","img/noIE.png");
		jQuery(".lblLoader").html("I'm sorry, this webapp won't run on Internet Explorer 8,7,6,5,4,3,2,1,0!<br>Try it with IE9 or Chrome, Firefox, Safari...");
	}else{
		if (Pqp.isNull(jQuery.cookie("snd"))){
			jQuery.cookie("snd","1",{expires: 100});
		}
  	preloadImages();
	}
}

function preloadImages(){
	queue = new createjs.LoadQueue(false);
	queue.installPlugin(createjs.Sound);
	queue.addEventListener("fileload", singlePreloaded);
 	queue.addEventListener("complete", allPreloaded);	
 	
	var a = [
 		{id:"team0",src:"img/team0_player.png"}, 
 		{id:"team1",src:"img/team1_player.png"}, 
 		{id:"team2",src:"img/team2_player.png"}, 
 		{id:"team3",src:"img/team3_player.png"}, 
 		{id:"team4",src:"img/team4_player.png"}, 
 		{id:"team5",src:"img/team5_player.png"}, 
 		{id:"team6",src:"img/team6_player.png"},
 		{id:"keeper0",src:"img/team0_keeper.png"}, 
 		{id:"keeper1",src:"img/team1_keeper.png"}, 
 		{id:"keeper2",src:"img/team2_keeper.png"}, 
 		{id:"keeper3",src:"img/team3_keeper.png"}, 
 		{id:"keeper4",src:"img/team4_keeper.png"}, 
 		{id:"keeper5",src:"img/team5_keeper.png"}, 
 		{id:"keeper6",src:"img/team6_keeper.png"},
 		{id:"field",src:"img/field.png"},
 		{id:"ball",src:"img/ball.png"},
 		{id:"ballshadow",src:"img/ballshadow.png"},
 		{id:"arrow",src:"img/arrowGoal.png"},
 		{id:"arrowk8",src:"img/arrowKeeper8.png"},
 		{id:"arrowk4",src:"img/arrowKeeper4.png"},
 		{id:"arrowk2",src:"img/arrowKeeper2.png"},
 		{id:"net",src:"img/net.png"},
 		{id:"shadowplayer",src:"img/shadowPlayer.png"},
 		{id:"shadowkeeper",src:"img/shadowKeeper.png"},
 		{id:"referee",src:"img/referee.png"},
 		{id:"numbers",src:"img/numbers.png"},
 		{id:"flags",src:"img/flags.png"},
 		{id:"nice",src:"img/nice.png"},
 		{id:"attract",src:"img/attract.png"},
 		{id:"clicktostart",src:"img/clicktostart.png"},
 		{id:"countdown",src:"img/countdown.png"},
 		{id:"teamnames",src:"img/teamnames.png"},
 		{id:"panelteams",src:"img/panelTeams.png"},
 		{id:"hitarea",src:"img/hitArea.png"},
 		{id:"sound",src:"img/sound.png"}
	];

	if (!lMobile){
		if ((jQuery.browser.opera) ||(jQuery.browser.mozilla)){
	 		a.push({id:"snd0ogg",src:"snd/jingleScelta.ogg"},
	 		{id:"snd1ogg",src:"snd/fischio.ogg"},
	 		{id:"snd2ogg",src:"snd/folla.ogg"},
	 		{id:"snd3ogg",src:"snd/goal.ogg"},
	 		{id:"snd4ogg",src:"snd/jingleFinale.ogg"},
	 		{id:"snd5ogg",src:"snd/theme.ogg"},
	 		{id:"snd6ogg",src:"snd/nice.ogg"},
	 		{id:"snd7ogg",src:"snd/parata.ogg"},
	 		{id:"snd8ogg",src:"snd/shot.ogg"})
	 	}else{
	 		a.push({id:"snd0mp3",src:"snd/jingleScelta.mp3"},
	 		{id:"snd1mp3",src:"snd/fischio.mp3"},
	 		{id:"snd2mp3",src:"snd/folla.mp3"},
	 		{id:"snd3mp3",src:"snd/goal.mp3"},
	 		{id:"snd4mp3",src:"snd/jingleFinale.mp3"},
	 		{id:"snd5mp3",src:"snd/theme.mp3"},
	 		{id:"snd6mp3",src:"snd/nice.mp3"},
	 		{id:"snd7mp3",src:"snd/parata.mp3"},
	 		{id:"snd8mp3",src:"snd/shot.mp3"});
	 	}
 	}
 	//trace(a);
 	totalEl = a.length;
 	loadedEl = 0;

 	queue.loadManifest(a);
}

function singlePreloaded(e){
	loadedEl++
	var perc =  Math.floor((loadedEl*100)/ totalEl);
	jQuery(".lblLoader").text("Loading wedding game resources ("+perc+"%)");
}

function allPreloaded(e){
  hidePreloaderapp();
  Global._app.show();

	buildSprites();
	buildSounds();
	defineGlobalElements();
	initMainLoop();

	showAttractScreen();
}


function defineGlobalElements(){
	stage = new createjs.Stage(jQuery("#stage")[0]);
}

function showAttractScreen(){
	if (!Pqp.isNull(curScreen)){
		curScreen.destroy();
	}
	curScreen = new Attract(beginMatch);
	curScreen.init();
}

function beginMatch(teams){
	curScreen.destroy();
	curScreen = new PenaltyMatch(teams,endMatch);
	curScreen.init();
}

function endMatch(details){
	stopSound();
	enableMainLoop(false);
	playSound("sndFinale");
	
	// @jdecuyper: do not display final score
	//jQuery("#lblpoint").html(""+curScreen.playerScore+"&nbsp;&nbsp;&nbsp;PTS");
	jQuery("#divshare").show();
	Pqp.addClick(jQuery(".imgPlayagain"),onPlayAgain);
	Pqp.addClick(jQuery(".imgFb"),onShareFb);
	if (curScreen.goal0 < curScreen.goal1){
		jQuery(".imgGameOver").attr("src","img/gameOverLose.png");
	}
}

function onShareFb(){
	var teams = new Array("Japan","W.Germany","Brazil","Italy","England","USA","Argentine");
	var team0 = teams[curScreen.idTeams[0]];
	var team1 = teams[curScreen.idTeams[1]];
	var goal0 = curScreen.goal0;
	var goal1 = curScreen.goal1;
	var punti = curScreen.playerScore;
	window.open("http://www.facebook.com/sharer/sharer.php?u="+escape("http://www.int33h.com/test/knr/facebook.asp?team0="+team0+"&team1="+team1+"&goal0="+goal0+"&goal1="+goal1+"&punti="+punti));

}

function onPlayAgain(){
	location.reload();
}

function initMainLoop(){
 	createjs.Ticker.addListener(window);
 	createjs.Ticker.useRAF = true;
 	createjs.Ticker.setFPS(60);	
 	enableMainLoop(false);

}

function enableMainLoop(lFlag){
	createjs.Ticker.setPaused(!lFlag);
}

function tick(){
	stage.update();
}

