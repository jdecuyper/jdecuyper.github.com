function buildSprites(){
	var sheet
	// Players
	for (var x=0;x<7;x++){
		sheet = new createjs.SpriteSheet({
			images: [queue.getResult("team"+x)],
			frames: {width: 96, height: 128, regX: 0, regY: 0},
			animations: {
				// idle
				idle_6: {
					frames: [0]
				},
				idle_2: {
					frames: [30]
				},
				run_6: {
					frames: [1,0,2,0],
					frequency: 10
				},
				shot_6: {
					frames: [3,4,5],
					frequency: 10,
					next: "idle_6"
				},
				shot_3: {
					frequency: 10,
					frames: [6,7,24],
					next: "idle_3"
				},
				shot_9: {
					frequency: 10,
					frames: [25,26,8],
					next: "idle_9"
				},
				sad_9: {
					frames: [9]
				},
				sad_3: {
					frames: [10]
				},
				sad_6: {
					frames: [11]
				},
				happy_3: {
					frames: [12,13,13,14,14,15,15,15,15,15,15,15,15],
					frequency: 6
				},
				crosssign: {
					frames: [27,28,29,29,16,16,17,17,18,18,19,19,20,20,20,20,20,20],
					frequency: 5
				},
				idle_3: {
					frames: [22]
				},
				idle_9: {
					frames: [21]
				}

			}
		});
		var anim = new createjs.BitmapAnimation(sheet);
		anim.gotoAndPlay("idle_6");

		sprites.push({id:"team"+x,mc:anim});
	}


	// Keeper
	for (var x=0;x<7;x++){
		sheet = new createjs.SpriteSheet({
			images: [queue.getResult("keeper"+x)],
			frames: {width: 96, height: 160, regX: 0, regY: 32},
			animations: {
				// idle
				idle_4: {
					frames: [6]
				},
				idle_with_ball_4: {
					frames: [7]
				},
				idle_waiting_with_ball_4: {
					frames: [7,7],	
					frequency: 15
				},
				idle_waiting_4: {
					frames: [6,6],	
					frequency: 15
				},
				sad_4: {
					frames: [5,4],
					frequency: 25
				},
				ready_4: {
					frames: [3]
				},
				happy_2: {
					frames: [1,2],
					frequency: 20
				},
				sad_8: {
					frames: [0]
				},
				blockjump_4: {
					frames: [9,8,24]
				},
				blockwait_4: {
					frames: [3],
					frequency: 50
				},
				block_4: {
					frames: [18,17,17,16,16,16],
					frequency: 3
				},
				blocked_4: {
					frames: [16],
					frequency: 50
				},
				block_2: {
					frames: [22,21,21,21,21,20],
					frequency: 3
				},
				blocked_2: {
					frames: [20],
					frequency: 50
				},
				block_8: {
					frames: [12,11,11,11,11,10],
					frequency: 3
				},
				blocked_8: {
					frames: [10],
					frequency: 50
				}
			}
		});
		var anim = new createjs.BitmapAnimation(sheet);
		anim.gotoAndPlay("idle_4");

		sprites.push({id:"keeper"+x,mc:anim});
	}


	// Ball
	sheet = new createjs.SpriteSheet({
		images: [queue.getResult("ball")],
		frames: {width: 64, height: 64, regX: 32, regY: 32},
		animations: {
			// idle
			idle: {
				frames: [0]
			},
			idle_big: {
				frames: [4]
			},
			moving: {
				frames: [0,0,1,1,2,2,3,3]
			},
			movingbig: {
				frames: [4,4,5,5,6,6,7,7]
			}
		}
	});
	anim = new createjs.BitmapAnimation(sheet);
	anim.gotoAndPlay("idle");
	sprites.push({id:"ball",mc:anim});


	// Shadow
	sheet = new createjs.SpriteSheet({
		images: [queue.getResult("ballshadow")],
		frames: {width: 64, height: 64, regX: 32, regY: 32},
		animations: {
			// idle
			idle: {
				frames: [0]
			}
		}
	});
	anim = new createjs.BitmapAnimation(sheet);
	anim.gotoAndPlay("idle");
	sprites.push({id:"ballshadow",mc:anim});

	// Arrow
	sheet = new createjs.SpriteSheet({
		images: [queue.getResult("arrow")],
		frames: {width: 48, height: 36, regX: 48, regY: 18},
		animations: {
			// idle
			idle: {
				frames: [0]
			}
		}
	});
	anim = new createjs.BitmapAnimation(sheet);
	anim.gotoAndPlay("idle");
	sprites.push({id:"arrow",mc:anim});

	// Net
	anim = new createjs.Bitmap(queue.getResult("net"));
	sprites.push({id:"net",mc:anim});

	// Playershadow
	anim = new createjs.Bitmap(queue.getResult("shadowplayer"));
	sprites.push({id:"shadowplayer",mc:anim});

	// Keepershadow
	anim = new createjs.Bitmap(queue.getResult("shadowkeeper"));
	sprites.push({id:"shadowkeeper",mc:anim});

	// arrowk8
	anim = new createjs.Bitmap(queue.getResult("arrowk8"));
	sprites.push({id:"arrowk8",mc:anim});
	// arrowk4
	anim = new createjs.Bitmap(queue.getResult("arrowk4"));
	sprites.push({id:"arrowk4",mc:anim});
	// arrowk2
	anim = new createjs.Bitmap(queue.getResult("arrowk2"));
	sprites.push({id:"arrowk2",mc:anim});

	// referee
	sheet = new createjs.SpriteSheet({
		images: [queue.getResult("referee")],
		frames: {width: 96, height: 128, regX: 0, regY: 0},
		animations: {
			// idle
			idle_2: {
				frames: [0]
			},
			whistle: {
				frames: [1,1,1,2,2,2,3,3,3,0,4],
				frequency: 10,
				next: "idle_3"
			},
			idle_3: {
				frames: [4]
			}
		}
	});
	anim = new createjs.BitmapAnimation(sheet);
	anim.gotoAndPlay("idle_2");
	sprites.push({id:"referee",mc:anim});

	// refereeshadow
	anim = new createjs.Bitmap(queue.getResult("shadowplayer"));
	sprites.push({id:"shadowreferee",mc:anim});

	// nice
	anim = new createjs.Bitmap(queue.getResult("nice"));
	sprites.push({id:"nice",mc:anim});

	// numbers
	sheet = new createjs.SpriteSheet({
		images: [queue.getResult("numbers")],
		frames: {width: 28, height: 60, regX: 0, regY: 0},
		animations: {
			a0: {frames: [0]},
			a1: {frames: [1]},
			a2: {frames: [2]},
			a3: {frames: [3]},
			a4: {frames: [4]},
			a5: {frames: [5]},
			a6: {frames: [6]},
			a7: {frames: [7]},
			a8: {frames: [8]},
			a9: {frames: [9]},
		}
	});
	anim = new createjs.BitmapAnimation(sheet);
	anim.gotoAndPlay("a0");
	sprites.push({id:"numleft",mc:anim});
	anim = new createjs.BitmapAnimation(sheet);
	anim.gotoAndPlay("a0");
	sprites.push({id:"numright",mc:anim});

	// flags
	sheet = new createjs.SpriteSheet({
		images: [queue.getResult("flags")],
		frames: {width: 64, height: 64, regX: 0, regY: 0},
		animations: {
			team0: {frames: [0]},
			team1: {frames: [1]},
			team2: {frames: [2]},
			team3: {frames: [3]},
			team4: {frames: [4]},
			team5: {frames: [5]},
			team6: {frames: [6]}
		}
	});
	anim = new createjs.BitmapAnimation(sheet);
	anim.gotoAndPlay("team0");
	sprites.push({id:"flagleft",mc:anim});

	anim = new createjs.BitmapAnimation(sheet);
	anim.gotoAndPlay("team0");
	sprites.push({id:"flagright",mc:anim});

	// attract
	anim = new createjs.Bitmap(queue.getResult("attract"));
	sprites.push({id:"attract",mc:anim});

	// click to start
	anim = new createjs.Bitmap(queue.getResult("clicktostart"));
	sprites.push({id:"clicktostart",mc:anim});

	// panelteams
	anim = new createjs.Bitmap(queue.getResult("panelteams"));
	sprites.push({id:"panelteams",mc:anim});

	// hitarea
	anim = new createjs.Bitmap(queue.getResult("hitarea"));
	sprites.push({id:"hitareal0",mc:anim});
	anim = new createjs.Bitmap(queue.getResult("hitarea"));
	sprites.push({id:"hitareal1",mc:anim});
	anim = new createjs.Bitmap(queue.getResult("hitarea"));
	sprites.push({id:"hitarear0",mc:anim});
	anim = new createjs.Bitmap(queue.getResult("hitarea"));
	sprites.push({id:"hitarear1",mc:anim});

	// countdown
	sheet = new createjs.SpriteSheet({
		images: [queue.getResult("countdown")],
		frames: {width: 164, height: 28, regX: 0, regY: 0},
		animations: {
			a5: {frames: [0]},
			a4: {frames: [1]},
			a3: {frames: [2]},
			a2: {frames: [3]},
			a1: {frames: [4]},
			a0: {frames: [5]}
		}
	});
	anim = new createjs.BitmapAnimation(sheet);
	anim.gotoAndPlay("a5");
	sprites.push({id:"countdown",mc:anim});	

	// teamnames
	sheet = new createjs.SpriteSheet({
		images: [queue.getResult("teamnames")],
		frames: {width: 284, height: 28, regX: 0, regY: 0},
		animations: {
			team0: {frames: [0]},
			team1: {frames: [1]},
			team2: {frames: [2]},
			team3: {frames: [3]},
			team4: {frames: [4]},
			team5: {frames: [5]},
			team6: {frames: [6]}
		}
	});
	anim = new createjs.BitmapAnimation(sheet);
	anim.gotoAndPlay("team0");
	sprites.push({id:"teamnamesleft",mc:anim});	
	anim = new createjs.BitmapAnimation(sheet);
	anim.gotoAndPlay("team0");
	sprites.push({id:"teamnamesright",mc:anim});	


	// sound
	sheet = new createjs.SpriteSheet({
		images: [queue.getResult("sound")],
		frames: {width: 40, height: 32, regX: 0, regY: 0},
		animations: {
			on: {frames: [0]},
			off: {frames: [1]}
		}
	});
	anim = new createjs.BitmapAnimation(sheet);
	anim.gotoAndPlay("on");
	sprites.push({id:"sound",mc:anim});


}

function getSpriteById(id){
	for (var x=0;x<sprites.length;x++){
		if (sprites[x].id == id){
			return sprites[x].mc;
		}
	}
	return null;
}


function buildSounds(){
	if (!lMobile){
		createjs.Sound.registerSound("snd/jingleScelta.mp3|snd/jingleScelta.ogg", "sndScelta");
		createjs.Sound.registerSound("snd/fischio.mp3|snd/fischio.ogg", "sndFischio");
		createjs.Sound.registerSound("snd/folla.mp3|snd/folla.ogg", "sndFolla");
		createjs.Sound.registerSound("snd/goal.mp3|snd/goal.ogg", "sndGoal");
		createjs.Sound.registerSound("snd/jingleFinale.mp3|snd/jingleFinale.ogg", "sndFinale");
		createjs.Sound.registerSound("snd/theme.mp3|snd/theme.ogg", "sndTheme");
		createjs.Sound.registerSound("snd/nice.mp3|snd/nice.ogg", "sndNice");
		createjs.Sound.registerSound("snd/parata.mp3|snd/parata.ogg", "sndParata");
		createjs.Sound.registerSound("snd/shot.mp3|snd/shot.ogg", "sndShot");
	}
}

function playSound(id,loop){
	if (!lMobile){
		var instance
		if (!loop){
			instance = createjs.Sound.play(id); 
		}else{
			instance  = createjs.Sound.play(id,createjs.Sound.INTERRUPT_ANY, 0, 0, -1); 
		}
	}

}

function stopSound(){
	if (!lMobile){
		createjs.Sound.stop();
	}
}


var soundClip
function showSound(n){
	if (!lMobile){
		if (Pqp.isNull(soundClip)){
			soundClip = getSpriteById("sound");
			soundClip.onClick = function(e){
				if (jQuery.cookie("snd") == "1"){
					jQuery.cookie("snd","0",{expires: 100});
				}else{
					jQuery.cookie("snd","1",{expires: 100});
				}
				settaSoundClip();
			}
		}
		if (n == 0){
			soundClip.x = 4;
			soundClip.y = 4;
		}
		if (n == 1){
			soundClip.x = 4;
			soundClip.y = 68;
		}
		settaSoundClip();
		stage.addChild(soundClip);
	}
}

function hideSound(){
	stage.removeChild(soundClip);
}

function settaSoundClip(){
	if (jQuery.cookie("snd") == "1"){
		soundClip.gotoAndStop("on");
		createjs.Sound.setMute(false)

	}else{
		soundClip.gotoAndStop("off");
		createjs.Sound.setMute(true)
	}

}