PenaltyMatch = function(idTeams,callback){
	this.idTeams = idTeams;
	this.callback = Pqp._globalOrContextualized(callback);
	this.human = 0;
	this.cpu = 0;
	this.goal0 = 0;
	this.goal1 = 0;
	this.playerScore = 0;
	this.shot0 = 0;
	this.shot1 = 0;
	this.penalties = 5;
}

PenaltyMatch.prototype.init = function(){
	this.mc = new createjs.Container();
	stage.addChild(this.mc);
	this.showSfondo();
	this.selectSprites();
	this.initRounds();
	this.updatePlayerScore(0);
}

PenaltyMatch.prototype.selectSprites = function(){
	//this.idTeams = Pqp.shuffle(this.idTeams);
	var toss = Pqp.rnd(1);
	toss = 0 
	if (toss == 0){
		this.human = 0
		this.cpu = 1
		this.playerteam0 = getSpriteById("team"+this.idTeams[0]);
		this.playerteam1 = getSpriteById("team"+this.idTeams[1]);
		this.keeperteam0 = getSpriteById("keeper"+this.idTeams[0]);
		this.keeperteam1 = getSpriteById("keeper"+this.idTeams[1]);
	}else{
		this.human = 1
		this.cpu = 0
		this.playerteam0 = getSpriteById("team"+this.idTeams[1]);
		this.playerteam1 = getSpriteById("team"+this.idTeams[0]);
		this.keeperteam0 = getSpriteById("keeper"+this.idTeams[1]);
		this.keeperteam1 = getSpriteById("keeper"+this.idTeams[0]);
	}
}

PenaltyMatch.prototype.destroy = function(){
	stage.removeChild(this.mc);
}

PenaltyMatch.prototype.showSfondo = function(){
	this.mc.addChild(new createjs.Bitmap(queue.getResult("field")));
}

PenaltyMatch.prototype.initRounds = function(){
	this.curRound = 0;
	this.aRounds = new Array();
	this.initNextRound()
}

PenaltyMatch.prototype.initNextRound = function(){
	if (this.someoneHasWon() == -1){
		this.round = new PenaltyRound(this,this.curRound);
		this.round.init();
	}else{
		this.endMatch();
	}
}

PenaltyMatch.prototype.endRound = function(){
	this.curRound++;
	this.initNextRound();
}

PenaltyMatch.prototype.someoneHasWon = function(){
	var round = this.curRound;
	// player 0
	if (this.goal0 - (this.goal1+(this.penalties-this.shot1)) > 0){
		return 0
	}
	// player 1
	if (this.goal1 - (this.goal0+(this.penalties-this.shot0)) > 0){
		return 1
	}

	// @jdecuyper: if draw after 10 shots then move on to end screen
	if (round == 10)
		return 0;

	if (this.shot1 == this.penalties){
		this.penalties++;
	}

	return -1;
}

PenaltyMatch.prototype.endMatch = function(){
	Pqp._callCallback(this.callback);
}

PenaltyMatch.prototype.updatePlayerScore = function(toAdd){
	jQuery("#score").show();
	this.playerScore += toAdd;
	jQuery("#score").text(""+this.playerScore);
}

PenaltyMatch.prototype.updateTries = function(lGoal,n){
	var ref = jQuery("#tmpSeq").clone();
	var where = jQuery("#divteam"+n);
	ref.attr("id","round"+this.curRound);
	if (lGoal){
		ref.attr("src","img/gin.png");
	}else{
		ref.attr("src","img/gout.png");
	}
	ref.show()
	where.append(ref);


}
