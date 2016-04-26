"use strict";

/* TODO
- Fixa till utseendet (lägg gärna CSS i en separat fil)
- * När man startar spelet så ska timern inte hoppa till, fyll på med text
- Om tid finns, visa om man svarat rätt eller fel på frågan, t.ex. genom att lägga till en CSS-klass, setTimeout
- * I slutet, visa poäng
- * Fixa timern så att även minuter fungerar
- Om tid finns, kunna välja kategori (nu är allt JS)
- Om tid finns, kunna blanda svarsalternativen
*/

// variabler
var questionBank;
var timer;
var minuter;
var currentSecond = 0;
var currentMinute = 0;
var currentQuestion = 0;
var points = 0;

// timer
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;

// questionTextContainer
var qTextCnt = document.getElementById("questionText");
var a1TextCnt = document.getElementById("answer1");
var a2TextCnt = document.getElementById("answer2");
var a3TextCnt = document.getElementById("answer3");
var image = document.getElementById("image");

init();

/*
* Denna funktion ska bara köras en gång när man kommer in på sidan
* och har till uppgift att hämta in frågorna från JSON-filen, och
* sedan köra igång spelet om inhämtningen lyckades
*/
function init() {
	// En ajax-request för att ladda in frågorna från JSON-filen
	var questionLoader = new XMLHttpRequest();
	
	// Tvinga ändring av filtyp
	questionLoader.overrideMimeType("application/json");
	questionLoader.open('GET', 'questions.json', true);

	questionLoader.onreadystatechange = function() {
		if(questionLoader.readyState == 4 && questionLoader.status == 200) {

			questionBank = JSON.parse(questionLoader.responseText);

			document.getElementById("startGame").addEventListener("click", startGame);
		}
	}

	// Dölj lista answer på startsida
	var divsAnswer = document.getElementsByClassName("answer");
  	for (var i = 0; i < divsAnswer.length; i++) {
		divsAnswer[i].style.display = "none";
	}

	questionLoader.send();
}

function startGame() {
	document.getElementById("startGame").removeEventListener("click", startGame);
	document.getElementById("start").style.display = "none";

	// Visa lista answer
	var divsAnswer = document.getElementsByClassName("answer");
  	for (var i = 0; i < divsAnswer.length; i++) {
		divsAnswer[i].style.display = "inline-block";
	}

	// Skapa en timer som anropar funktionen countSeconds varje sekund
	// 1 sekund = 1000 ms
	timer = setInterval(setTime, 1000);

	// Gör det möjligt att klicka på svarsalternativen
	a1TextCnt.addEventListener("click", checkAnswer);
	a2TextCnt.addEventListener("click", checkAnswer);
	a3TextCnt.addEventListener("click", checkAnswer);

	nextQuestion(); // Visa första frågan
}

function checkAnswer(e) {
	var userAnswer = e.target.id;
	userAnswer = userAnswer.replace("answer", "");

	if(userAnswer == questionBank.javascript[currentQuestion].correct) {
		points++;
	}

	if(currentQuestion < questionBank.javascript.length-1) {
		// Visa bara nästa fråga om det finns fler frågor att visa,
		// annars avsluta spelet
		currentQuestion++;
		nextQuestion();
	} else {
		// Avsluta spelet, anropa funktionen endGame()
		endGame();
	}
}

function nextQuestion() {
	// Hämta data från JSON-fil
	qTextCnt.innerHTML = questionBank.javascript[currentQuestion].question;
	a1TextCnt.innerHTML = questionBank.javascript[currentQuestion].answer1;
	a2TextCnt.innerHTML = questionBank.javascript[currentQuestion].answer2;
	a3TextCnt.innerHTML = questionBank.javascript[currentQuestion].answer3;
	var getImage = questionBank.javascript[currentQuestion].image;
	var currentImage = "<img id='serieImage' src='"+getImage+"'>"; // Skapa img-tag
	image.innerHTML = currentImage;
}

function endGame() {
	console.log("end");
	// Dölj frågorna
	document.getElementById("question").style.display = 'none';

	// Visa poänger
	var showPoints = "";
	if (points == 0) {
		showPoints = "You got <b>" + points + "</b> points.<br>Don't you love Netflix? :O";
	}
	else if (points == 1) {
		showPoints = "You got <b>" + points + "</b> point.<br>Nice! You have a social life :)";
	}
	else if (points == 2) {
		showPoints = "You got <b>" + points + "</b> points.<br>Maybe you are just not a big fan of TV-series.";
	}
	else {
		showPoints = "You got <b>" + points + "</b> points.<br>Don't you think you're spending too much time in front of the TV?";
	}
	document.getElementById("points").innerHTML = showPoints;

	// Stoppa timern
	clearInterval(timer);
}

function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if(valString.length < 2)
    {
        return "0" + valString;
    }
    else
    {
        return valString;
    }
}

/*function countSeconds() {

	currentSecond++; // Varje sekund, öka värdet med 1

	var seconds = "";

	if (currentSecond < 60) {
		if (currentSecond < 10) {
			// 00:00
			seconds = "00:0" + currentSecond;
			document.getElementById("timer").innerHTML = seconds;
		}
		else {
			seconds = "00:" + currentSecond;
			document.getElementById("timer").innerHTML = seconds;
		}
	}
	else {
		currentSecond = 0;

		if (currentSecond < 60) {
			if (currentSecond < 10) {
				// 00:00
				seconds = currentSecond;
				document.getElementById("timer").innerHTML = seconds;
			}
			else {
				seconds = currentSecond;
				document.getElementById("timer").innerHTML = seconds;
			}
		}
	}
}

function countMinutes() {
	currentMinute++;
			
	var minutes = "";

	if (currentMinute < 60) {
		if (currentMinute < 10) {
			minutes = "0" + currentMinute + ":";
			document.getElementById("timer").innerHTML = minutes;
		}
		else {
			minutes = "0" + currentMinute + ":";
			document.getElementById("timer").innerHTML = minutes;
		}
	}
}
*/










