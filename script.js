//Standalone variables
var numRoll;
var numBaseAddition;
var numStatModifier;
var numRelevantStatValue;
var numStatAddition;
var numExperience;
var prevRoll;
var numOpponentRoll;
var numSuccessFactor;
var numFailureFactor;

//Variables whose values are put into textboxes by the user
var numStrength;
var numStamina;
var numAgility;
var numIntelligence;
var numCharisma;
var numPerception;
var numCircumstantialFactors;
var numOpponentAgility;
var numOpponentPerception;

//Boolean variables 


//CheckRoll Button Push
function CheckRoll() {
	
	//Loading Variables Up From User Input
	numStrength = Number(document.getElementById("bxStrength").value);
	numStamina = Number(document.getElementById("bxStamina").value);
	numAgility = Number(document.getElementById("bxAgility").value);
	numIntelligence = Number(document.getElementById("bxIntelligence").value);
	numCharisma = Number(document.getElementById("bxCharisma").value);
	numPerception = Number(document.getElementById("bxPerception").value);
	numCircumstantialFactors = Number(document.getElementById("bxCircumstantialFactors").value);
	
	//Making the Roll
	numRoll = Math.floor(Math.random() * 20 + 1);
	if (document.getElementById("duplicate").style.visibility === "visible"){
		document.getElementById("duplicate").style.visibility = "hidden";
	}
	
	//Checking to see if the roll was a duplicate
	if (numRoll === prevRoll) {
		document.getElementById("duplicate").style.visibility = "visible";
	}
	
	//Checking the complexity of the check
	switch (document.getElementById("Complexity").value){
		case "Simple":
			numBaseAddition = 10;
			numStatModifier = 2;
			break;
		case "Complex":
			numBaseAddition = 0;
			numStatModifier = 1;
			break;
	}
	
	//Checking the stat associated and marking it as the calculated stat
	switch (document.getElementById("CheckType").value) {
		case "Strength":
			numRelevantStatValue = numStrength;
			break;
		case "Stamina":
			numRelevantStatValue = numStamina;
			break;
		case "Agility":
			numRelevantStatValue = numAgility;
			break;
		case "Intelligence":
			numRelevantStatValue = numIntelligence;
			break;
		case "Charisma":
			numRelevantStatValue = numCharisma;
			break;
		case "Perception":
			numRelevantStatValue = numPerception;
			break;
	}
	
	//Determining how much value of a stat effects your chances of success
	numStatAddition = numRelevantStatValue / numStatModifier;
	
	//Determining your factor of success
	numSuccessFactor = numBaseAddition + numStatAddition + numCircumstantialFactors;
	
	//If success factor is a 20 or higher, set it to 19 since one can always roll a 1
	if (numSuccessFactor >= 20){
		numSuccessFactor = 19;
	}
	
	//Calculating the number you need to beat
	numFailureFactor = 20 - numSuccessFactor;
	
	//If failure factor is a 20 or higher, set it to 19 since one can always roll a 20
	if (numFailureFactor >= 20) {
		numFailureFactor = 19;
	}
	
	//Calculating amount of experience possible to be earned
	numExperience = numFailureFactor * 5;
	
	//Reporting on the successfulness or not
	if (numRoll >= numFailureFactor + 1){
		document.getElementById("success").innerHTML = "It was a SUCCESS!";
	}
	if (numRoll === 20){
		document.getElementById("success").innerHTML = "It was a CRITICAL SUCCESS!";
	}
	if (numRoll < numFailureFactor + 1){
		document.getElementById("success").innerHTML = "It was a FAILURE!";
		numExperience = 0;
	}
	if (numRoll === 1){
		document.getElementById("success").innerHTML = "It was a CRITICAL FAILURE!";
		numExperience = 0;
	}
	
	//Reporting the dice roll
	document.getElementById("rolltotal").innerHTML = "You rolled a(n) " + numRoll + ".";
	
	//Reporting the standards
	document.getElementById("rollstandards").innerHTML = "You needed a(n) " + (numFailureFactor + 1) + " or higher.";
	
	//Reporting experience gain
	document.getElementById("experience").innerHTML = "Experience Payout: " + numExperience + " exp!";
	
	//Saving last roll
	prevRoll = numRoll;
}

function ChangePic() {
	switch (document.getElementById("Sin").value){
		case "N/A":
			document.getElementById("picturebox").src = "images/blank.jpg";
			break;
		case "Lust":
			document.getElementById("picturebox").src = "images/lust.jpg";
			break;
		case "Envy":
			document.getElementById("picturebox").src = "images/envy.jpg";
			break;
		case "Greed":
			document.getElementById("picturebox").src = "images/greed.jpg";
			break;
		case "Wrath":
			document.getElementById("picturebox").src = "images/wrath.jpg";
			break;
		case "Gluttony":
			document.getElementById("picturebox").src = "images/gluttony.jpg";
			break;
		case "Sloth":
			document.getElementById("picturebox").src = "images/sloth.jpg";
			break;
		case "Pride":
			document.getElementById("picturebox").src = "images/pride.jpg";
			break;
	}
}
