Attract = function(callback){
	this.callback = Pqp._globalOrContextualized(callback);
	this.team0 = undefined;
	this.team1 = undefined;
	this.currentCountDown = 6; // 1 more
}

Attract.prototype.init = function(){
	this.mc = new createjs.Container();
	stage.addChild(this.mc);

/*	var teams = new Array(0,1,2,3,4,5,6)
	teams = Pqp.shuffle(teams);
	teams = new Array(teams[0],teams[1]);
	Pqp._callCallback(this.callback,teams);*/
	this.showBackground();
	this.showClickToStart();
	enableMainLoop(true);

}

Attract.prototype.showBackground = function(){
	var background = getSpriteById("attract");
	background.x = 0;
	background.y = 0;
	this.mc.addChild(background);
	this.background = background;
}

Attract.prototype.showClickToStart = function(){
	var clicktostart = getSpriteById("clicktostart");
	clicktostart.x = 250;
	clicktostart.y = 614;
	this.mc.addChild(clicktostart);
	this.clicktostart = clicktostart;
	var ct = this;
	this.idto = setTimeout(function(){ct.toggleClickToStart(ct)} , 500);

	stage.enableMouseOver(60);	
	stage.ct = this;
	stage.onClick = function(e){
		stage.onClick = undefined;
		stage.enableMouseOver(0);	
		this.ct.choseTeams();
	}

}

Attract.prototype.toggleClickToStart = function(ct){
	this.clicktostart.visible = !this.clicktostart.visible;
	ct.idto = setTimeout(function(){ct.toggleClickToStart(ct)} , 500);
}

Attract.prototype.destroy = function(){
	this.mc.removeChild(this.background);
	this.mc.removeChild(this.clicktostart);
	this.mc.removeChild(this.panelteams);

	this.mc.removeChild(this.flagleft);
	this.mc.removeChild(this.playerleft);
	this.mc.removeChild(this.nameleft);
	this.mc.removeChild(this.flagright);
	this.mc.removeChild(this.playerright);
	this.mc.removeChild(this.nameright);

	this.mc.removeChild(this.hitl0);
	this.mc.removeChild(this.hitl1);
	this.mc.removeChild(this.hitr0);
	this.mc.removeChild(this.hitr1);


	this.hitl0.onMouseOver = undefined;
	this.hitl0.onClick = undefined;
	this.hitl0.onMouseOut = undefined;
	this.hitl1.onMouseOver = undefined;
	this.hitl1.onClick = undefined;
	this.hitl1.onMouseOut = undefined;
	this.hitr0.onMouseOver = undefined;
	this.hitr0.onClick = undefined;
	this.hitr0.onMouseOut = undefined;
	this.hitr1.onMouseOver = undefined;
	this.hitr1.onClick = undefined;
	this.hitr1.onMouseOut = undefined;

	stage.removeChild(this.mc);	
	stage.update();
	enableMainLoop(false);
	hideSound();
}


Attract.prototype.updateView = function(){
	stage.update();
}

Attract.prototype.choseTeams = function(){
    playSound("sndScelta");
	clearTimeout(this.idto);
	this.clicktostart.visible = false;
	this.showPanel();
	this.setTeams();
	this.updateTeams();
	this.setArrowS();
	this.setCoutdown();
	showSound(0);
}


Attract.prototype.showPanel = function(){
	var panelteams = getSpriteById("panelteams");
	panelteams.x = 0;
	panelteams.y = 538;
	this.mc.addChild(panelteams);
	this.panelteams = panelteams;
}


Attract.prototype.setTeams = function(){
	var tea = new Array(0,1,2,3,4,5,6)
	// @jdecuyper: always pick same teams
	//tea = Pqp.shuffle(tea);
	var t0 = tea[0];
	var t1 = tea[1];

	this.team0 = new TeamPicker(new Array(0,1,2,3,4,5,6));
	this.team0.setCurrent(t0);
	this.team0.exclude(t1);
	this.team1 = new TeamPicker(new Array(0,1,2,3,4,5,6));
	this.team1.setCurrent(t1);
	this.team1.exclude(t0);
}

Attract.prototype.updateTeams = function(){
	if (this.flagleft != undefined){
		this.mc.removeChild(this.flagleft);
	}
	if (this.nameleft != undefined){
		this.mc.removeChild(this.nameleft);
	}
	if (this.playerleft != undefined){
		this.mc.removeChild(this.playerleft);
	}
	if (this.flagright != undefined){
		this.mc.removeChild(this.flagright);
	}
	if (this.playerright != undefined){
		this.mc.removeChild(this.playerright);
	}
	if (this.nameright != undefined){
		this.mc.removeChild(this.nameright);
	}

	var quale = this.team0.getCurrent();

	var flagleft = getSpriteById("flagleft");
	flagleft.gotoAndStop("team"+quale)
	var playerleft = getSpriteById("team"+quale);
	playerleft.gotoAndStop("idle_2");
	var nameleft = getSpriteById("teamnamesleft");
	nameleft.gotoAndStop("team"+quale);

	this.mc.addChild(flagleft);
	flagleft.x = 224;
	flagleft.y = 552;

	this.mc.addChild(playerleft);
	playerleft.x = 224;
	playerleft.y = 667;

	this.mc.addChild(nameleft);
	nameleft.x = 114;
	nameleft.y = 838;

	var quale = this.team1.getCurrent();
	var flagright = getSpriteById("flagright");
	flagright.gotoAndStop("team"+quale)
	var playerright = getSpriteById("team"+quale);
	playerright.gotoAndStop("idle_2");
	var nameright = getSpriteById("teamnamesright");
	nameright.gotoAndStop("team"+quale);

	this.mc.addChild(flagright);
	flagright.x = 736;
	flagright.y = 552;

	this.mc.addChild(playerright);
	playerright.x = 736;
	playerright.y = 667;

	this.mc.addChild(nameright);
	nameright.x = 626;
	nameright.y = 838;

	this.flagleft = flagleft;
	this.playerleft = playerleft;
	this.nameleft = nameleft;
	this.flagright = flagright;
	this.playerright = playerright;
	this.nameright = nameright;


}

Attract.prototype.setArrowS = function(){
	stage.enableMouseOver(60);	

	var hitl0 = getSpriteById("hitareal0");
	hitl0.x = 37
	hitl0.y = 820
	hitl0.alpha = 0.01;
  var cnt = hitl0;
  cnt.ct = this;
  cnt.onMouseOver = function(){
		jQuery(stage.canvas).css("cursor","pointer");
  }
  cnt.onMouseOut = function(){
    jQuery(stage.canvas).css("cursor","default");
  }
  cnt.onClick = function(){
     this.ct.onLeftPrev();
  }	

	var hitl1 = getSpriteById("hitareal1");
	hitl1.x = 412
	hitl1.y = 820
	hitl1.alpha = 0.01;
  var cnt = hitl1;
  cnt.ct = this;
  cnt.onMouseOver = function(){
     jQuery(stage.canvas).css("cursor","pointer");
  }
  cnt.onMouseOut = function(){
     jQuery(stage.canvas).css("cursor","default");
  }
  cnt.onClick = function(){
     this.ct.onLeftNext();
  }	


	var hitr0 = getSpriteById("hitarear0");
	hitr0.x = 544
	hitr0.y = 820
	hitr0.alpha = 0.01;
  var cnt = hitr0;
  cnt.ct = this;
  cnt.onMouseOver = function(){
     jQuery(stage.canvas).css("cursor","pointer");
  }
  cnt.onMouseOut = function(){
     jQuery(stage.canvas).css("cursor","default");
  }
  cnt.onClick = function(){
     this.ct.onRightPrev();
  }	


	var hitr1 = getSpriteById("hitarear1");
	hitr1.x = 919
	hitr1.y = 820
	hitr1.alpha = 0.01;
  var cnt = hitr1;
  cnt.ct = this;
  cnt.onMouseOver = function(){
     jQuery(stage.canvas).css("cursor","pointer");
  }
  cnt.onMouseOut = function(){
     jQuery(stage.canvas).css("cursor","default");
  }
  cnt.onClick = function(){
     this.ct.onRightNext();
  }	


	this.mc.addChild(hitl0);
	this.mc.addChild(hitl1);
	this.mc.addChild(hitr0);
	this.mc.addChild(hitr1);

	this.hitl0 = hitl0
	this.hitl1 = hitl1
	this.hitr0 = hitr0
	this.hitr1 = hitr1

}

Attract.prototype.onLeftPrev = function(){
	var n = this.team0.getPrevious();
	this.team1.exclude(n);
	this.updateTeams();
}
Attract.prototype.onLeftNext = function(){
	var n = this.team0.getNext();
	this.team1.exclude(n);
	this.updateTeams();
}
Attract.prototype.onRightPrev = function(){
	var n = this.team1.getPrevious();
	this.team0.exclude(n);
	this.updateTeams();

}
Attract.prototype.onRightNext = function(){
	var n = this.team1.getNext();
	this.team0.exclude(n);
	this.updateTeams();

}


Attract.prototype.setCoutdown = function(){
	var countdown = getSpriteById("countdown");
	countdown.x = 434
	countdown.y = 571
	
	// @jdecuyper: start game when user clicks on start 
	var cnt = countdown;
    cnt.ct = this;
    cnt.onMouseOver = function(){
       jQuery(stage.canvas).css("cursor","pointer");
    }
    cnt.onMouseOut = function(){
       jQuery(stage.canvas).css("cursor","default");
    }
    cnt.onClick = function(){
	   cnt.ct.startGame();
    }
	
	this.countdown = countdown;
	this.mc.addChild(this.countdown);
	this.updateCountDown(this);
}

Attract.prototype.updateCountDown = function(ct){
	ct.currentCountDown--;
	if (ct.currentCountDown == 0){
		playSound("sndFischio");
		playSound("sndFolla");
	}
	if (ct.currentCountDown > 0){
		ct.countdown.gotoAndStop("a"+ct.currentCountDown);
		this.idto = setTimeout(function(){ct.updateCountDown(ct)} , 1000);
	}else{
		ct.countdown.gotoAndStop("a"+ct.currentCountDown);
		// @jdecuyper: do not start game automatically
		//this.idto = setTimeout(function(){ct.startGame(ct)} , 3000);
	}
}

Attract.prototype.startGame = function(ct){
	teams = new Array(this.team0.getCurrent(),this.team1.getCurrent());
	Pqp._callCallback(this.callback,teams);
}
