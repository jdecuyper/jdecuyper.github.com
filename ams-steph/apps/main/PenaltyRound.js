PenaltyRound = function(ct,nround){
	this.nround = nround;
	this.ct = ct;
	this.mc = ct.mc;
	this.goal = false;
	this.palo = false;
	this.out = false;
	this.blocked = false;
	this.tryBlockSet = false
	this.blockDirection = -1
	this.ballDirection = -1
	this.stopInteraction = false;
	this.team1Plays = true;
	
	if (nround % 2 == 0){
		this.team1Plays = true;
		if (this.ct.cpu == 0){
			this.keepercpu = false;
		}else{
			this.keepercpu = true;
		}
	}else{
		this.team1Plays = false;
		if (this.ct.cpu == 0){
			this.keepercpu = true;
		}else{
			this.keepercpu = false;
		}
	}
	
	// @jdecuyper: keeper must always be the CPU
	this.keepercpu = true;
	
	this.assignedScore = false;
	this.upUnderPatch = Pqp.rnd(1) == 1 ? true :false;
}

PenaltyRound.UP = 1;
PenaltyRound.DOWN = 2;
PenaltyRound.CENTER = 3;
PenaltyRound.END_ROUND_TIMES = [5000,5000];
PenaltyRound.ARROW_TIME = 30
var ldebug = false;

PenaltyRound.toggleDirection = Pqp.rnd(1) == 1 ? true :false;

PenaltyRound.prototype.init = function(){
	this.placeArrow();
	this.placeBall();
	this.placeNet();
	this.placePlayer();
	this.placeReferee();
	this.placeFlags();
	this.placeScore();
	this.placeNice();
	showSound(1);
	this.updateView();
	var ct = this;
	setTimeout(function(){ct.delayedStart(ct)} , 1000);

}

PenaltyRound.prototype.delayedStart = function(ct){
	ct.whistle();
}

PenaltyRound.prototype.whistle = function(){
	enableMainLoop(true);
	this.referee.gotoAndPlay("whistle");
	this.referee.ct = this;
	var ct = this;
	setTimeout(function(){ct.playFischio(ct)} , 800);
	/*if (this.nround == 0){
		setTimeout(function(){ct.playTheme(ct)} , 3000);
	}*/

	this.referee.onAnimationEnd = function(){
		this.onAnimationEnd = undefined;
		enableMainLoop(false);
		this.ct.startInteraction();

	}
}

PenaltyRound.prototype.playTheme = function(){
	playSound("sndTheme",true);
}
PenaltyRound.prototype.playFischio = function(){
	playSound("sndFischio");	
}

PenaltyRound.prototype.startInteraction = function(){	
	if (this.nround == 0){
		this.playTheme();
	}

	var arrow = this.arrow;
	if (this.keepercpu){
		arrow.visible = true;
	}else{
		if (ldebug){
			arrow.visible = true;
		}else{
			arrow.visible = false;
		}
	}

	this.animateArrow();
	this.setListeners();
	if (ldebug){
		PenaltyRound.ARROW_TIME = 200
	}
	this.keeper.gotoAndPlay("ready_4");
}

PenaltyRound.prototype.updateView = function(){
	//enableMainLoop(true);
	stage.update();
}

PenaltyRound.prototype.placeBall = function(){
	var ball = getSpriteById("ball");
	var shadow = getSpriteById("ballshadow");
	ball.gotoAndStop("idle");
	ball.x = 430;
	ball.y = 526;
	shadow.x = 430;
	shadow.y = 526;
	shadow.visible = true;

	var shadowplayer = getSpriteById("shadowplayer");
	shadowplayer.x = 218;
	shadowplayer.y = 430;
	this.mc.addChild(shadowplayer);
	this.shadowplayer = shadowplayer;

	var shadowkeeper = getSpriteById("shadowkeeper");
	shadowkeeper.x = 638;
	shadowkeeper.y = 430;
	this.mc.addChild(shadowkeeper);
	this.shadowkeeper = shadowkeeper;

	var shadowreferee = getSpriteById("shadowreferee");
	shadowreferee.x = 440+12;
	shadowreferee.y = 220;
	this.mc.addChild(shadowreferee);
	this.shadowreferee = shadowreferee;

	this.mc.addChild(shadow);
	this.mc.addChild(ball);

	this.ball = ball;
	this.shadow = shadow;


}

PenaltyRound.prototype.placeArrow = function(){
	var arrow = getSpriteById("arrow");
	arrow.x = 706;
	arrow.y = 314;
	this.mc.addChild(arrow);
	arrow.visible = false;

	this.arrow = arrow;


	var arrowk8 = getSpriteById("arrowk8");
	var arrowk4 = getSpriteById("arrowk4");
	var arrowk2 = getSpriteById("arrowk2");
	arrowk8.x = 683;	arrowk8.y = 375;
	arrowk4.x = 610;	arrowk4.y = 522;
	arrowk2.x = 683;	arrowk2.y = 587;
	this.mc.addChild(arrowk8);
	this.mc.addChild(arrowk4);
	this.mc.addChild(arrowk2);

	arrowk8.visible = false;
	arrowk4.visible = false;
	arrowk2.visible = false;

	this.arrowk8 = arrowk8;
	this.arrowk4 = arrowk4;
	this.arrowk2 = arrowk2;

}

PenaltyRound.prototype.placeNet = function(){
	var net = getSpriteById("net");
	net.x = 721;
	net.y = 108;
	this.mc.addChild(net);
	this.net = net;

}

PenaltyRound.prototype.placeNice = function(){
	var nice = getSpriteById("nice");
	nice.x = 512;
	nice.y = 193;
	this.mc.addChild(nice);
	this.nice = nice;
	this.nice.visible = false;
}

PenaltyRound.prototype.placeFlags = function(){
	var flagleft = getSpriteById("flagleft");
	flagleft.x = 352;
	flagleft.y = 0;
	flagleft.gotoAndStop("team"+this.ct.idTeams[0]);
	this.mc.addChild(flagleft);
	this.flagleft = flagleft;
	
	var flagright = getSpriteById("flagright");
	flagright.x = 608;
	flagright.y = 0;
	flagright.gotoAndStop("team"+this.ct.idTeams[1]);
	this.mc.addChild(flagright);
	this.flagright = flagright;

}

PenaltyRound.prototype.updateScore = function(){
	this.numleft.gotoAndStop("a"+this.ct.goal0);
	this.numright.gotoAndStop("a"+this.ct.goal1);
}

PenaltyRound.prototype.placeScore = function(){
	var numleft = getSpriteById("numleft");
	numleft.x = 452;
	numleft.y = 0;
	this.mc.addChild(numleft);
	this.numleft = numleft;

	var numright = getSpriteById("numright");
	numright.x = 548;
	numright.y = 0;
	this.mc.addChild(numright);
	this.numright = numright;

}

PenaltyRound.prototype.placePlayer = function(){
	var n = this.nround % 2;
	var player = this.ct["playerteam"+n];
	n == 0 ? n = 1 : n = 0; 
	var keeper = this.ct["keeperteam"+n];



	player.gotoAndStop("idle_6");
	keeper.gotoAndStop("idle_4");

	player.x = 218;
	player.y = 430;

	keeper.x = 638;
	keeper.y = 430;

	this.mc.addChild(player)
	this.mc.addChild(keeper)

	this.player = player;
	this.keeper = keeper;

}

PenaltyRound.prototype.placeReferee = function(){
	
	var referee = getSpriteById("referee");
	referee.x = 440;
	referee.y = 220;
	referee.gotoAndPlay("idle_2");
	this.mc.addChild(referee);
	this.referee = referee;

}

PenaltyRound.prototype.animateArrow = function(){
	var ct = this;
	this.arrow.y = this.randomStartingPoint();
	stage.update();

	if (this.keepercpu){
		PenaltyRound.toggleDirection = !PenaltyRound.toggleDirection;
	}
	if (PenaltyRound.toggleDirection){
		this.idto = setTimeout(function(){ct.moveArrowDown(ct)} , PenaltyRound.ARROW_TIME);
	}else{
		this.idto = setTimeout(function(){ct.moveArrowUp(ct)} , PenaltyRound.ARROW_TIME);
	}
}

PenaltyRound.prototype.randomStartingPoint = function(){
	var a = new Array(250,290,330,370,410,450,490,530,570,610,650,690,730,770,810,850,890);
	a = Pqp.shuffle(a);
	a = Pqp.shuffle(a);
	return a[0];
}


PenaltyRound.prototype.moveArrowDown = function(ct){
	clearTimeout(ct.idto);
	var arrow = ct.arrow;
	arrow.y += 40;
	if (arrow.y == 330){
		arrow.y = 320;
	}
	if (arrow.y == 360){
		arrow.y = 370;
	}
	if (this.keepercpu){
		if (arrow.y > 890) {
			arrow.y = 210;
		}
	}else{
		if (this.upUnderPatch){
			if (arrow.y > 850) {
				arrow.y = 290;
			}
		}else{
			if (arrow.y > 810) {
				arrow.y = 250;
			}
		}
	}

	stage.update();
	ct.idto = setTimeout(function(){ct.moveArrowDown(ct)} , PenaltyRound.ARROW_TIME);
}

PenaltyRound.prototype.moveArrowUp = function(ct){
	clearTimeout(ct.idto);
	var arrow = ct.arrow;
	arrow.y -= 40;
	if (arrow.y == 330){
		arrow.y = 320;
	}
	if (arrow.y == 280){
		arrow.y = 290;
	}
	if (this.keepercpu){
		if (arrow.y < 210) {
			arrow.y = 890;
		}
	}else{
		//var a = new Array(250,290,330,370,410,450,490,530,570,610,650,690,730,770,810,850,890);
		if (this.upUnderPatch){
			if (arrow.y < 290) {
				arrow.y = 850;
			}
		}else{
			if (arrow.y < 250) {
				arrow.y = 810;
			}
		}
	}

	stage.update();
	ct.idto = setTimeout(function(){ct.moveArrowUp(ct)} , PenaltyRound.ARROW_TIME);
}


PenaltyRound.prototype.setListeners = function(){
	stage.enableMouseOver(60);	
	stage.ct = this;
	if (this.keepercpu){
		stage.onMouseDown = function(e){
			trace(e.rawX+ " " +e.rawY);
			if (!((e.rawX <= 40) && (e.rawY <= 96) && (e.rawX >= 0) && (e.rawY >= 64))){
				stage.onMouseDown = undefined;
				stage.enableMouseOver(0);	
				this.ct.initShot();
				this.ct.setTryToBlockCpu();
			}
		}
	}else{
		this.showKeeperArrows(stage.mouseY);
		stage.onMouseDown = function(e){
			if (!((e.rawX <= 40) && (e.rawY <= 96) && (e.rawX >= 0) && (e.rawY >= 64))){			
				stage.onMouseDown = undefined;
				stage.onMouseMove = undefined;
				stage.enableMouseOver(0);	
				this.ct.initShot();
				this.ct.setTryToBlock(e);
			}
		}
		stage.onMouseMove = function(e){
			this.ct.showKeeperArrows(e.rawY);
			
		}

	}
}
PenaltyRound.prototype.showKeeperArrows = function(rawY){
	this.arrowk2.visible = false;
	this.arrowk4.visible = false;
	this.arrowk8.visible = false;
	if (rawY <= 450){
		this.arrowk8.visible = true
	}else if (rawY > 570){
		this.arrowk2.visible = true
	}else{
		this.arrowk4.visible = true
	}

}

PenaltyRound.prototype.initShot = function(){
	var ct = this;

	this.checkEndShot();
	clearTimeout(this.idto);
	this.updateView();
	this.net.visible = false;
	this.incy = 0;
	this.biggerBall = false;

	var arrow = this.arrow;
	if (arrow.y <= 450){
		this.ballDirection = PenaltyRound.UP;
	}else if (arrow.y > 570){
		this.ballDirection = PenaltyRound.DOWN;
	}else{
		this.ballDirection = PenaltyRound.CENTER;
	}

	this.run();
}

PenaltyRound.prototype.checkEndShot = function(){
	var arrow = this.arrow;
	var n = arrow.y;
	if (n < 290){
		this.out = true;
	}else if (n <= 304){
		this.palo = true;
	}else if (n <= 796){
		this.goal = true;
	}else if (n <= 811){
		this.palo = true;
	}else{
		this.out = true;
	}

}

PenaltyRound.prototype.run = function(){
	var player = this.player;
	var keeper = this.keeper;
	var shadowplayer = this.shadowplayer;
	player.gotoAndPlay("run_6");
	var ct = this;
	
	TweenMax.to(player, 0.8, { x:370, ease:Linear.easeNone,onUpdate:this.playerIsMoving,onUpdateParams:[ct],onComplete:this.preShot,onCompleteParams:[ct]} );
	TweenMax.to(shadowplayer, 0.8, { x:370, ease:Linear.easeNone} );
}

PenaltyRound.prototype.setTryToBlockCpu = function(){
	this.tryBlockSet = true
	var n = Pqp.rnd(4);
	if (n < 2){
		this.blockDirection = PenaltyRound.UP;
	}else if (n > 2){
		this.blockDirection = PenaltyRound.DOWN;
	}else{
		this.blockDirection = PenaltyRound.CENTER;
	}
}
PenaltyRound.prototype.setTryToBlock = function(e){
	
	/*250
	290
	330
	370
	410
	450
	490
	530
	570
	610
	650
	690
	730
	770
	810
	850
	890*/

	this.tryBlockSet = true

	//var keeper = this.keeper;
	if (e.rawY <= 450){
		this.blockDirection = PenaltyRound.UP;
	}else if (e.rawY > 570){
		this.blockDirection = PenaltyRound.DOWN;
	}else{
		this.blockDirection = PenaltyRound.CENTER;
	}

}



PenaltyRound.prototype.playerIsMoving = function(ct){
	ct.player.x = Math.floor(ct.player.x);
	ct.updateView();

}
PenaltyRound.prototype.preShot = function(ct){
	ct.shot();
}

PenaltyRound.prototype.shot = function(){
	var ball = this.ball;
	var shadow = this.shadow;
	var arrow = this.arrow;
	var player = this.player;
	playSound("sndShot");
	if (arrow.y < 390){
		player.gotoAndPlay("shot_9");
	}else if (arrow.y > 640){
		player.gotoAndPlay("shot_3");
	}else{
		player.gotoAndPlay("shot_6");
	}

	enableMainLoop(true);

	var x1 = ball.x
	var y1 = ball.y
	var x2 = arrow.x;
	var y2 = arrow.y;
	
	var inc = 170;
	if (this.out){
		inc = 360;
	}

	var x3 = x2 + inc;
	var y3 = (((y2 - y1) / (x2 -x1)) * (x3 - x1)) + y1;

	var ct = this;
	if (this.goal){
		TweenMax.to(ball, 0.40, {delay:0.2, x:x3, y:y3,onStart:this.startShot,onStartParams:[ct], ease:Linear.easeNone,onComplete:this.landBall,onCompleteParams:[ct]} );
		TweenMax.to(shadow, 0.40, {delay:0.2, x:x3, y:y3, onUpdate: this.checkPosition,onUpdateParams:[ct],ease:Linear.easeNone} );
	}else if (this.palo){
		TweenMax.to(ball, 0.20, {delay:0.2, x:x2+15, y:y2,onStart:this.startShot,onStartParams:[ct], ease:Linear.easeNone,onComplete:this.bounce,onCompleteParams:[ct]} );
		TweenMax.to(shadow, 0.20, {delay:0.2, x:x2+15, y:y2, onUpdate: this.checkPosition,onUpdateParams:[ct],ease:Linear.easeNone} );
	}else{
		TweenMax.to(ball, 0.75, {delay:0.2, x:x3, y:y3,onStart:this.startShot,onStartParams:[ct], ease:Linear.easeNone,onComplete:this.landBall,onCompleteParams:[ct]} );
		TweenMax.to(shadow, 0.75, {delay:0.2, x:x3, y:y3, onUpdate: this.checkPosition,onUpdateParams:[ct],ease:Linear.easeNone} );
	}
}

PenaltyRound.prototype.startShot = function(ct) {
	enableMainLoop(false);
	ct.ball.gotoAndPlay("moving");
}
		
PenaltyRound.prototype.checkBallDimensions = function() {
	var ball = this.ball;
	var shadow = this.shadow;

	if (shadow.y - ball.y > 20) {
		if (!this.biggerBall) {
			this.biggerBall = true;
			ball.gotoAndPlay("movingbig");
		}
	}else {
		if (this.biggerBall) {
			this.biggerBall = false;
			ball.gotoAndPlay("moving");
		}
	}
}

PenaltyRound.prototype.bounce = function(ct){
	var ball = ct.ball;
	var shadow = ct.shadow;
	var player = ct.player;

	var x1 = 430;
	var y1 = 1070;
	
	if (ball.y < 400){
		var y1 = -50;
	}
	TweenMax.to(ball, 0.30, {x:x1, y:y1, ease:Linear.easeNone,onComplete:ct.landBall,onCompleteParams:[ct]} );
	TweenMax.to(shadow, 0.30, {x:x1, y:y1, onUpdate: ct.checkPosition,onUpdateParams:[ct],ease:Linear.easeNone} );
}

PenaltyRound.prototype.landBall = function(ct){
	var ball = ct.ball;
	var shadow = ct.shadow;
	if ((ct.out)||(ct.palo)){
		ct.itsNotGoal();
	}else{
		ct.itsGoal();
	}
	TweenMax.to(ball, 0.20, { y:shadow.y, onUpdate: ct.updateBallLanding,onUpdateParams:[ct],ease:Linear.easeNone,onComplete:ct.stopBall,onCompleteParams:[ct]} );
}

PenaltyRound.prototype.playerSad = function(){
	var player = this.player;
	var arrow = this.arrow;
	if (arrow.y < 390){
		player.gotoAndPlay("sad_9");
	}else if (arrow.y > 640){
		player.gotoAndPlay("sad_3");
	}else{
		player.gotoAndPlay("sad_6");
	}
}

PenaltyRound.prototype.crossexult = function(){
	var player = this.player;
	player.gotoAndPlay("crosssign");
	player.onAnimationEnd = this.preExult;
	player.ct = this;
	enableMainLoop(true);
}
PenaltyRound.prototype.preExult = function(e){
	this.onAnimationEnd = undefined;
	enableMainLoop(false);
	this.ct.playerExult(true);

}

PenaltyRound.prototype.playerExult = function(lFlag){
	var player = this.player;
	player.gotoAndPlay("happy_3");
	this.playerUp(this);
	if (lFlag){
		var keeper = this.keeper;
		keeper.y+=8;
		keeper.gotoAndPlay("sad_4");
	}
}

PenaltyRound.prototype.playerUp = function(ct){
	var player = ct.player;
	var end = player.y - 42;

	TweenMax.to(player, 0.20, { y:end, onUpdate: ct.updateView,ease:Linear.easeNone,onComplete:ct.playerDown,onCompleteParams:[ct]} );
}

PenaltyRound.prototype.playerDown = function(ct){
	var player = ct.player;
	var end = player.y + 42;
	TweenMax.to(player, 0.20, { y:end, onUpdate: ct.updateView,ease:Linear.easeNone,onComplete:ct.playerUp,onCompleteParams:[ct]} );
}

PenaltyRound.prototype.updateBallLanding = function(ct){
	ct.checkBallDimensions();
}

PenaltyRound.prototype.stopBall = function(ct){
	var ball = ct.ball;
	ball.gotoAndPlay("idle");	
	if (!ct.goal){
		enableMainLoop(true);
	}
}

PenaltyRound.prototype.checkPosition = function(ct){
	var ball = ct.ball;
	var shadow = ct.shadow;
	var net = ct.net;

	if (ball.x > 730) {
		net.visible = true;
	}
	if (ball.x < 756) {
		ct.incy += 1	;
	}
	ball.y -= ct.incy;

	if ((!ct.out) && (!ct.palo)){
		if (ball.y > 770) {
			ball.y = 770;
		}
		if (shadow.y > 770) {
			shadow.y = 770;
		}
	}

	if (ball.y > shadow.y) {
		ball.y = shadow.y;
	}

	if ((!ct.out) && (!ct.palo)){
		if (shadow.y < 314) {
			shadow.y = 314;
		}
		if (ball.y < 224) {
			ball.y = 224;
		}
	}

	if (ball.x > 550){
		ct.arrowk2.visible = false;
		ct.arrowk4.visible = false;
		ct.arrowk8.visible = false;
		ct.arrow.visible = false;
		stage.onMouseDown = undefined;
		stage.enableMouseOver(0);	

		if (!ct.stopInteraction){
			ct.stopInteraction = true;
			if (ct.tryBlockSet){
				ct.tryBlock();
			}else{
				ct.blockDirection = PenaltyRound.CENTER;
				ct.tryBlock();
			}
		}
	}

	if (ball.x >= 690){
		if (ct.blocked){
			ball.gotoAndStop("idle_big");
			TweenMax.killTweensOf(ball)
			TweenMax.killTweensOf(shadow)
			enableMainLoop(true);
		}

	}
	
	ct.checkBallDimensions();
	ct.updateView();
}


PenaltyRound.prototype.tryBlock = function(){
	var n = this.blockDirection;
	
	if (n == PenaltyRound.UP){
		this.blockUp();
	}else if (n == PenaltyRound.DOWN){
		this.blockDown();
	}else{
		this.blockCenter();
	}
}

PenaltyRound.prototype.blockUp = function(){
	var keeper = this.keeper;
	var shadowkeeper = this.shadowkeeper;
	var arrow = this.arrow;
	var ball = this.ball;
	var b = this.ballDirection;

	

	if (b == PenaltyRound.UP){
		if ((arrow.y == 320) && (this.keepercpu)){
			// Nice!
			
		}else{
			this.blocked = true;
			this.setEndRoundTime(false);
		}
	}
	if ((this.out)||(this.palo)){
		this.blocked = false;
		this.setEndRoundTime(false);
	}

	if (!this.blocked){
		if (this.goal){
			this.setEndRoundTime(true);
		}
	}


	keeper.gotoAndPlay("block_8");
	keeper.ct = this;

	if (this.blocked){
		TweenMax.to(keeper,0.15,{y:arrow.y-40});
		TweenMax.to(shadowkeeper,0.15,{y:arrow.y-40});
		keeper.onAnimationEnd = function(){
			this.gotoAndPlay("blocked_8");
			this.ct.itsNotGoal();

			var shadow = this.ct.shadow;
			shadow.visible = false;
			var ball = this.ct.ball;
			ball.x = this.x+64;
			ball.y = this.y+12;

			this.onAnimationEnd = function(){
				this.onAnimationEnd = undefined;
				this.gotoAndPlay("idle_waiting_with_ball_4");
				var ball = this.ct.ball;
				ball.gotoAndStop("idle");
				ball.x = this.x+40;
				ball.y = this.y+40;
				this.onAnimationEnd = function(){
					this.onAnimationEnd = undefined;
					this.gotoAndPlay("happy_2");
				}

			}
		}
	}else{
		TweenMax.to(keeper,0.15,{y:330});
		TweenMax.to(shadowkeeper,0.15,{y:330});
		keeper.onAnimationEnd = function(){
			this.gotoAndPlay("blocked_8");
			this.onAnimationEnd = function(){
				this.onAnimationEnd = undefined;
				if ((this.ct.out)||(this.ct.palo)){
					this.gotoAndPlay("idle_waiting_4");
					this.onAnimationEnd = function(){
						this.onAnimationEnd = undefined;
						this.gotoAndPlay("happy_2");
					}
				}else{
					this.gotoAndPlay("idle_4");
				}
			}
		}

	}
}

PenaltyRound.prototype.blockDown = function(){
	var keeper = this.keeper;
	var shadowkeeper = this.shadowkeeper;
	var arrow = this.arrow;
	var ball = this.ball;
	var b = this.ballDirection;

	if (b == PenaltyRound.DOWN){
		if ((arrow.y == 770) && (this.keepercpu)){
			// Nice!
			
		}else{
			this.blocked = true;
			this.setEndRoundTime(false);
		}
	}
	if ((this.out)||(this.palo)){
		this.blocked = false;
		this.setEndRoundTime(false);
	}

	if (!this.blocked){
		if (this.goal){
			this.setEndRoundTime(true);
		}
	}

	keeper.gotoAndPlay("block_2");
	keeper.ct = this;


	if (this.blocked){
		TweenMax.to(keeper,0.15,{y:arrow.y-128});
		TweenMax.to(shadowkeeper,0.15,{y:arrow.y-128});
		keeper.onAnimationEnd = function(){
			this.gotoAndPlay("blocked_2");
			this.ct.itsNotGoal();
			var shadow = this.ct.shadow;
			shadow.visible = false;
			var ball = this.ct.ball;
			ball.x = this.x+46;
			ball.y = this.y+96;

			this.onAnimationEnd = function(){
				this.onAnimationEnd = undefined;
				this.gotoAndPlay("idle_waiting_with_ball_4");
				var ball = this.ct.ball;
				ball.gotoAndStop("idle");
				ball.x = this.x+40;
				ball.y = this.y+40;
				this.onAnimationEnd = function(){
					this.onAnimationEnd = undefined;
					this.gotoAndPlay("happy_2");
				}

			}
		}
	}else{
		TweenMax.to(keeper,0.25,{y:730-128});
		TweenMax.to(shadowkeeper,0.25,{y:730-128});
		keeper.onAnimationEnd = function(){
			this.gotoAndPlay("blocked_2");
			this.onAnimationEnd = function(){
				this.onAnimationEnd = undefined;
				if ((this.ct.out)||(this.ct.palo)){
					this.gotoAndPlay("idle_waiting_4");
					this.onAnimationEnd = function(){
						this.onAnimationEnd = undefined;
						this.gotoAndPlay("happy_2");
					}
				}else{
					this.gotoAndPlay("idle_4");
				}
			}
		}

	}
}

PenaltyRound.prototype.blockCenter = function(){
	var keeper = this.keeper;
	var shadowkeeper = this.shadowkeeper;
	var arrow = this.arrow;
	var ball = this.ball;
	var b = this.ballDirection;

	if (b == PenaltyRound.CENTER){
		this.blocked = true;
		this.setEndRoundTime(false);
	}
	if ((this.out)||(this.palo)){
		this.blocked = false;
		this.setEndRoundTime(false);
	}

	if (!this.blocked){
		if (this.goal){
			this.setEndRoundTime(true);
		}
	}

	keeper.ct = this;
	if (this.blocked){
		keeper.gotoAndPlay("block_4");
		

		TweenMax.to(keeper,0.15,{y:arrow.y-86});
		TweenMax.to(shadowkeeper,0.15,{y:arrow.y-86});
		keeper.onAnimationEnd = function(){

			this.gotoAndPlay("blocked_4");
			this.ct.itsNotGoal();
			var shadow = this.ct.shadow;
			shadow.visible = false;
			var ball = this.ct.ball;
			ball.gotoAndStop("idle");
			ball.x = this.x+52;
			ball.y = this.y+60;

			this.onAnimationEnd = function(){
				this.onAnimationEnd = undefined;
				this.gotoAndPlay("idle_waiting_with_ball_4");
				var ball = this.ct.ball;
				ball.gotoAndStop("idle");
				ball.x = this.x+40;
				ball.y = this.y+40;
				this.onAnimationEnd = function(){
					this.onAnimationEnd = undefined;
					this.gotoAndPlay("happy_2");
				}
			}
		}
	}else{
		var end = keeper.y
		keeper.gotoAndPlay("blockwait_4");
		//enableMainLoop(true);
		keeper.onAnimationEnd = function(){
			this.onAnimationEnd = undefined;
			if ((this.ct.out)||(this.ct.palo)){
				this.gotoAndPlay("idle_waiting_4");
				this.onAnimationEnd = function(){
					this.onAnimationEnd = undefined;
					this.gotoAndPlay("happy_2");
				}
			}else{
				this.gotoAndPlay("idle_4");
			}
		}
	}	
}

PenaltyRound.prototype.endRound = function(){
	TweenMax.killAll();
	enableMainLoop(false);
	//stage.removeAllChildren();
	this.updateView();

	this.mc.removeChild(this.shadowplayer);
	this.mc.removeChild(this.shadowkeeper);
	this.mc.removeChild(this.shadow);
	this.mc.removeChild(this.ball);
	this.mc.removeChild(this.arrow);
	this.mc.removeChild(this.net);
	this.mc.removeChild(this.player)
	this.mc.removeChild(this.keeper)
	this.mc.removeChild(this.arrowk8);
	this.mc.removeChild(this.arrowk4);
	this.mc.removeChild(this.arrowk2);
	this.mc.removeChild(this.referee);
	this.mc.removeChild(this.shadowreferee);
	this.mc.removeChild(this.flagleft);
	this.mc.removeChild(this.flagright);
	this.mc.removeChild(this.numleft);
	this.mc.removeChild(this.numright);
	this.mc.removeChild(this.nice);

	this.ct.endRound();
}


PenaltyRound.prototype.setEndRoundTime = function(lGoal){
	var ct = this;
	clearTimeout(this.idend)
	if (lGoal){
		this.idend = setTimeout(function(){ct.endRound(ct)} , PenaltyRound.END_ROUND_TIMES[0]);
	}else{
		this.idend = setTimeout(function(){ct.endRound(ct)} , PenaltyRound.END_ROUND_TIMES[1]);
	}
	if (!this.assignedScore){
		this.assignedScore = true;
		this.assignScore();
	}

}

PenaltyRound.prototype.itsGoal = function(lGoal){
	playSound("sndGoal");

	if (this.keepercpu){
		
		if (this.team1Plays){
		   this.ct.goal0++;
		   this.ct.shot0++;	
		   this.ct.updateTries(true, 0);
		} else {
		   this.ct.goal1++;
		   this.ct.shot1++;
		   this.ct.updateTries(true, 1);
		}
		
		if ((this.arrow.y == 320)||(this.arrow.y == 770)){
			this.showNice();
		}

	} else {
		this.ct.goal1++;
		this.ct.shot1++;
		this.ct.updateTries(true,1);
	}
	
	this.updateScore();

	var finita = this.ct.someoneHasWon();
	if (finita != -1){
		if (finita == 0){ // Human
			var nBonus = this.ct.penalties-this.ct.shot1
			for (var x = 0;x<nBonus;x++){
				this.ct.updatePlayerScore(this.getValueForAutomaticWonRound());
			}
		}
		this.crossexult();
	} else {
		this.playerExult();
	}
}

PenaltyRound.prototype.itsNotGoal = function(lGoal){
	
	if (this.blocked){
		playSound("sndParata");
	}

	if (this.keepercpu){
		if (this.team1Plays){
		   this.ct.shot0++;
		   this.ct.updateTries(false,0);
        } else {
		   this.ct.shot1++;
		   this.ct.updateTries(false,1);
        }
	}else{
		this.ct.shot1++;
		this.ct.updateTries(false,1);
	}

	var finita = this.ct.someoneHasWon();
	this.playerSad();
	
}

PenaltyRound.prototype.assignScore = function(){
	var baseValue = 0 


	if (this.keepercpu){
		baseValue = this.getBasePoints(this.arrow.y);
		if(!this.goal){
			baseValue += 0;
		}else{
			if (this.blocked){
				baseValue += 1500;
			}else{
				baseValue += 5000;
			}
		}
	}else{
		if(!this.goal){
			baseValue += 5000;
		}else{
			if (this.blocked){
				baseValue += 5000;
			}else{
				baseValue += 2500;
			}
		}
	}

	this.ct.updatePlayerScore(baseValue);

}

PenaltyRound.prototype.showNice = function(){
	playSound("sndNice");
	this.nice.visible = true;
	var ct = this;
	setTimeout(function(){ct.hideNice(ct)} , 1500);

}

PenaltyRound.prototype.hideNice = function(){
	this.nice.visible = false;
}

PenaltyRound.prototype.getBasePoints = function(n){
	if (PenaltyRound.toggleDirection){
		if (n == 210) return 2500;
		if (n == 250) return 2500;
		if (n == 290) return 5000;
		if (n == 320) return 8500;
		if (n == 370) return 4500;
		if (n == 410) return 4000;
		if (n == 450) return 3500;
		if (n == 490) return 3000;
		if (n == 530) return 2500;
		if (n == 570) return 2500;
		if (n == 610) return 2500;
		if (n == 650) return 2500;
		if (n == 690) return 3000;
		if (n == 730) return 3500;
		if (n == 770) return 4000;
		if (n == 810) return 3000;
		if (n == 850) return 2500;
		if (n == 890) return 2500;
	}else{
		if (n == 210) return 2500;
		if (n == 250) return 2500;
		if (n == 290) return 3000;
		if (n == 320) return 4000;
		if (n == 370) return 3500;
		if (n == 410) return 3000;
		if (n == 450) return 2500;
		if (n == 490) return 2500;
		if (n == 530) return 2500;
		if (n == 570) return 2500;
		if (n == 610) return 3000;
		if (n == 650) return 3500;
		if (n == 690) return 4000;
		if (n == 730) return 4500;
		if (n == 770) return 8500;
		if (n == 810) return 5000;
		if (n == 850) return 2500;
		if (n == 890) return 2500;
	}

	return 100
}

PenaltyRound.prototype.getValueForAutomaticWonRound = function(){
	return 15000;

}