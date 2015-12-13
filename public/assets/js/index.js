var a1 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var a2 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var a3 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var a4 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");

var audioArr = [a1,a2,a3,a4];

$(document).ready(function() {
	$(".js-power").on("click", power);
	$(".btn-strict").on("click", strictFun);
	$(".space").on("click",spaceClick)
});


var MAX_LEVEL = 20;
var SPEED = 1500;
var SPEED2 = 1000;
var SPEED3 = 600;
var SPEED4 = 300;
var repeat = false;
var SLEEP = 3000;
var sleepTimeout = null;
var delay=SPEED;
var level=0;
var step=0;
var on=false;
var levelArr = [];
var strict=false;
var player = false;
var $round = $(".round");

function zeroGame () {
	step=0;
	level=0;
	delay=SPEED;
	levelArr=[];
	player = false;
	clearTimeout(sleepTimeout);
}


function power () {
	$(this).toggleClass("active");
	if (on===false)
	{
		$round.fadeIn(500);
		$round.html("-")
		on=true;
		var x = randomSpace(0,3);
		levelArr.push(x);
		level = 1;
		$round.html(level);
		loop();
		return;
	}
	//else
	$(".highlight").removeClass("highlight");
	zeroGame();
	$round.fadeOut(500);
	on=false;
	return;
}

function loop () {
	if (on===false){
		$round.html("");
		return;
	}
	player=false;
	if (step>=level) {
		playerTurn();
		return;
	};
	turnOnSpace(levelArr[step++]);
}

function playerTurn () {

	repeat = false;
	player = true;
	step=0;
	sleeper();
}

function sleeper () {
	sleepTimeout = setTimeout(function () {
		$round.html("!");
		var interval = setInterval(function  () {
			$round.toggle();
		},200)

		repeat = true;
		step=0; // zero step before loop
		setTimeout(function  () {
			if (strict){
				zeroGame();
				level=1;
				var x=randomSpace(0,3);
				levelArr.push(x);
			}
			$round.show();
			clearInterval(interval);
			$round.html(level);
			loop();

		},1800);

	},SLEEP);
}

function turnOffSpace () {
	$(".highlight").removeClass("highlight");
	setTimeout(function () {
		loop();
	},200);
}

function turnOnSpace (id) {
	$("#"+id).addClass("highlight");
	audioArr[levelArr[step-1]].play();
	setTimeout(function  () {
		turnOffSpace();
	},delay);
}

function randomSpace (min,max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}


function strictFun () {
	$(this).toggleClass("active");
	strict = (strict===false)? true : false;
}

function spaceClick () {
	if (repeat===true)
	{
		step=level; // stop the loop
		repeat = false;
		return;
	}
	if (player===false)
		return;

/**
 * After Click clear (clear sleeper) left time for repeat
 * And set again
 */
	clearTimeout(sleepTimeout);
	sleeper();
	var space = $(this).attr("id");
	audioArr[space].play();
	$("#"+space).addClass("highlight");
/**
 * if wrong button has been hit do follow:
 * clear sleeper Timeout 
 * Remove highlight from button after few time
 * Display ! on panel screen
 * Check if strict button is active
 * if so reset game
 *
 * if last correct button has been hit
 */
 if (space!=levelArr[step])
 {		
	clearTimeout(sleepTimeout);

 	setTimeout(function  () {
 		$("#"+space).removeClass("highlight");
 	},300);


 	$round.html("!");
 	var interval = setInterval(function  () {
 		$round.toggle();
 	},200)

 	repeat = true;
		step=0; // zero step before loop
		setTimeout(function  () {
			if (strict){
				zeroGame();
				level=1;
				var x=randomSpace(0,3);
				levelArr.push(x);
			}
			$round.show();
			clearInterval(interval);
			$round.html(level);
			loop();

		},1800);

		return;
	}
	step++;

/**
 * it all set was correct then
 * clear sleeper's time
 * remove highligth
 * random new space
 * check what level is and set corresponding speed to the delay
 * add random to game array and start new loop after little delay (1800)
 */
	if (step>=level){
		clearTimeout(sleepTimeout);
		
		var x = randomSpace(0,3);
		setTimeout(function  () {
			$("#"+space).removeClass("highlight");
		},300);

		if (level===4) 
			delay = SPEED2;
		if (level===8)
			delay = SPEED3;
		if (level===12)
			delay = SPEED4;
		if (level===MAX_LEVEL){
			player=false;
			clearTimeout(sleepTimeout);
			theEnd();
		return;
		}


		step = 0;
		levelArr.push(x);
		level++;
		$round.html(level);
		player=false;
		setTimeout(function  () {
			loop();
		},1800);

		return;
	}

	setTimeout(function  () {
		$("#"+space).removeClass("highlight");
	},300);
}

function theEnd () {
	$round.html("**");
	var interval = setInterval(function Victory () {
		$round.toggle();
	},200);

		setTimeout(function  () {
			zeroGame();
			level=1;
			var x=randomSpace(0,3);
			levelArr.push(x);                   
			$round.show();
			clearInterval(interval);
			$round.html(level);
			loop();

		},7000);

}