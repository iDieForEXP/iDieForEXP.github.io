//Standalone variables
var numRoll;
var numBaseAddition;
var numStatModifier;
var numRelevantStatValue;
var numOpponentRelevantStatValue;
var numStatAddition;
var numExperience;
var prevRoll;
var numOpponentRoll;
var numSuccessFactor;
var numFailureFactor;
var numCritMod;
var numPerceptionBonus;
var meleePowerDice = 10;
var meleeSwiftDice = 8;
var gunplayDice = 6;
var sniperDice = 8;
var blastDice = 10;
var numDamage;
var prevDamage;
var numBlock;
var prevBlock;
var numDodge;
var prevDodge;

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
var boolRanged;
var boolAimSuccess;
var boolCrit;

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

function BlockRoll() {
	numStamina = Number(document.getElementById("bxStamina").value);
	document.getElementById("blockduplicate").style.visibility = "hidden";
	if (document.getElementById("blocktype").value === "Unarmed") {
		numBlock = Math.floor(Math.random() * 6 + 1);
		document.getElementById("blockreporter").innerHTML = "Your Block total is a(n) " + numBlock + "!";
	}
	else {
		numBlock = (Math.floor(Math.random() * 6 + 1) + (numStamina/2));
		document.getElementById("blockreporter").innerHTML = "Your Block total is a(n) " + numBlock + "!";
	}
	
	if (numBlock === prevBlock){
		document.getElementById("blockduplicate").style.visibility = "visible";
	}
	
	prevBlock = numBlock;
	
}

function DodgeRoll() {
	document.getElementById("dodgerollreporter").innerHTML = "lololol";
	
	numAgility = Number(document.getElementById("bxAgility").value);
	numOpponentAgility = Number(document.getElementById("bxEnemiesAgility").value);
	numOpponentPerception = Number(document.getElementById("bxEnemiesPerception").value);
	numDodge = Math.floor(Math.random() * 20 + 1);
	numSuccessFactor = numAgility;
	document.getElementById("dodgeduplicate").style.visibility = "hidden";
	
	if (document.getElementById("boxGymnastics").checked === true) {
		numSuccessFactor = numSuccessFactor + 1;
	}
	
	if (document.getElementById("boxRangedAttack").checked === true) {
		if (numSuccessFactor > 10) {
			numSuccessFactor = numSuccessFactor - numOpponentPerception;
			if (numSuccessFactor <= 10) {
				numSuccessFactor = 11;
			}
		}
	}
	else {
		if (numSuccessFactor > 10) {
			numSuccessFactor = numSuccessFactor - numOpponentAgility;
			if (numSuccessFactor <= 10){
				numSuccessFactor = 11;
			}
		}
	}
	
	if (numDodge === prevDodge){
		document.getElementById("dodgeduplicate").style.visibility = "visible";
	}
	
	document.getElementById("dodgerollreporter").innerHTML = "You rolled a(n) " + numDodge + ".";
	numFailureFactor = 20 - numSuccessFactor;
	document.getElementById("dodgebeatreporter").innerHTML = "You needed a " + (numFailureFactor + 1) + " or higher.";
	if (numDodge >= numFailureFactor + 1) {
		document.getElementById("dodgereporter").innerHTML = "It was a SUCCESS!";
	}
	else {
		document.getElementById("dodgereporter").innerHTML = "It was a FAILURE!";
	}
	
	prevDodge = numDodge;
}

function AttackRoll() {

	//Loading Variables Up From User Input
	
	numStrength = Number(document.getElementById("bxStrength").value);
	numStamina = Number(document.getElementById("bxStamina").value);
	numAgility = Number(document.getElementById("bxAgility").value);
	numIntelligence = Number(document.getElementById("bxIntelligence").value);
	numCharisma = Number(document.getElementById("bxCharisma").value);
	numPerception = Number(document.getElementById("bxPerception").value);
	numOpponentAgility = Number(document.getElementById("bxEnemiesAgility").value);
	numOpponentPerception = Number(document.getElementById("bxEnemiesPerception").value);
	boolRanged = false;
	numRelevantStatValue = 0;
	numCritMod = 2;
	boolAimSuccess = false;
	numPerceptionBonus = numPerception / 4;
	document.getElementById("attacktargetreporter").innerHTML = "...";
	
	document.getElementById("attackduplicate").style.visibility = "hidden";
	
	if (document.getElementById("boxSniper").checked === true) {
		numPerceptionBonus = numPerception / 2;
	}
	
	numRoll = Math.floor(Math.random() * 20 + 1) + numPerceptionBonus;
	boolCrit = false;
	if (numRoll-numPerceptionBonus === 20) {
		boolCrit = true;
	}
	document.getElementById("attacktargetreporter").innerHTML = "";
	
	if (document.getElementById("boxMercy").checked === true) {
		numCritMod = 3;
	}
	if (document.getElementById("boxBrute").checked === true) {
		meleePowerDice = 12;
		if (numRoll - numPerceptionBonus >= 18){
			boolCrit = true;
		}
	}
	if (document.getElementById("boxDuelist").checked === true) {
		meleeSwiftDice = 10;
		if (numRoll - numPerceptionBonus >= 18){
			boolCrit = true;
		}
	}
	if (document.getElementById("boxGunslinger").checked === true) {
		gunplayDice = 8;
		if (numRoll - numPerceptionBonus >= 18){
			boolCrit = true;
		}
	}
	if (document.getElementById("boxAssassin").checked === true) {
		sniperDice = 10;
		if (numRoll - numPerceptionBonus >= 18){
			boolCrit = true;
		}
	}
	if (document.getElementById("boxManiac").checked === true) {
		blastDice = 13;
		if (numRoll - numPerceptionBonus >= 18){
			boolCrit = true;
		}
	}
	
	//Aim Check
	switch (document.getElementById("aimchecktype").value) {
		case "N/A":
			boolAimSuccess = true;
			break;
		case "Likely":
			if (numRoll > 4){
				boolAimSuccess = true;
			}
			else {
				boolAimSuccess = false;
			}
			break;
		case "Standard":
			if (numRoll > 8) {
				boolAimSuccess = true;
			}
			else {
				boolAimSuccess = false;
			}
			break;
		case "Difficult":
			if (numRoll > 15) {
				boolAimSuccess = true;
			}
			else {
				boolAimSuccess = false;
			}
			break;
		case "Unlikely":
			if (numRoll > 18) {
				boolAimSuccess = true;
			}
			else {
				boolAimSuccess = false;
			}
			break;
		case "Miraculous":
			if (numRoll > 19) {
				boolAimSuccess = true;
			}
			else {
				boolAimSuccess = false;
			}
			break;
	}
	
	if (document.getElementById("attacktype").value === "Gunplay" || document.getElementById("attacktype").value === "Sniper" || document.getElementById("attacktype").value === "Blast"){
		boolRanged = true;
	}
	if (document.getElementById("attacktype").value === "Unarmed" || document.getElementById("attacktype").value === "Melee(Swift)" || document.getElementById("attacktype").value === "Melee(Power)"){
		boolRanged = false;
	}
	if (boolRanged === true) {
		numRelevantStatValue = numPerception;
		numOpponentRelevantStatValue = numOpponentPerception;
	}
	if (boolRanged === false) {
		numRelevantStatValue = numAgility;
		numOpponentRelevantStatValue = numOpponentAgility;
	}
	
	switch (document.getElementById("targetzone").value) {
		case "Head":
			if ((((numRoll - numPerceptionBonus) + numRelevantStatValue) - (Math.floor(Math.random() * 20 + 1) + numOpponentRelevantStatValue)) >= 15){
				document.getElementById("attacktargetreporter").innerHTML = "HEAD SHOT!!!";
				boolCrit = true;
			}
			break;
		case "Eyes":
			if ((((numRoll - numPerceptionBonus) + numRelevantStatValue) - (Math.floor(Math.random() * 20 + 1) + numOpponentRelevantStatValue)) >= 20){
				document.getElementById("attacktargetreporter").innerHTML = "EYE SHOT!!!";
			}
			break;
		case "WristsorAnkles":
			if ((((numRoll - numPerceptionBonus) + numRelevantStatValue) - (Math.floor(Math.random() * 20 + 1) + numOpponentRelevantStatValue)) >= 10){
				document.getElementById("attacktargetreporter").innerHTML = "WRIST/ANKLE SHOT!!!";
			}
			break;
		case "ArmsorLegs":
			if ((((numRoll - numPerceptionBonus) + numRelevantStatValue) - (Math.floor(Math.random() * 20 + 1) + numOpponentRelevantStatValue)) >= 7){
				document.getElementById("attacktargetreporter").innerHTML = "LIMB SHOT!!!";
			}
			break;
		case "InternalOrgan":
			if ((((numRoll - numPerceptionBonus) + numRelevantStatValue) - (Math.floor(Math.random() * 20 + 1) + numOpponentRelevantStatValue)) >= 8){
				document.getElementById("attacktargetreporter").innerHTML = "ORGAN SHOT!!!";
			}
			break;
	}
	
	if (document.getElementById("weaponskill").value === "Basic") {
		if (document.getElementById("attacktype").value === "Melee(Power)" && boolCrit === false){
			numDamage = Math.floor(Math.random() * meleePowerDice + 1);
			document.getElementById("attackreporter").innerHTML = "Your Attack HIT for a total of " + numDamage + " damage!";
		}
		if (document.getElementById("attacktype").value === "Melee(Power)" && boolCrit === true){
			numDamage = ((Math.floor(Math.random() * meleePowerDice + 1)) * numCritMod);
			document.getElementById("attackreporter").innerHTML = "Your Attack HIT for a CRITICAL of " + numDamage + " damage!";
		}
		if (document.getElementById("attacktype").value === "Melee(Swift)" && boolCrit === false){
			numDamage = Math.floor(Math.random() * meleeSwiftDice + 1);
			document.getElementById("attackreporter").innerHTML = "Your Attack HIT for a total of " + numDamage + " damage!";
		}
		if (document.getElementById("attacktype").value === "Melee(Swift)" && boolCrit === true){
			numDamage = ((Math.floor(Math.random() * meleeSwiftDice + 1)) * numCritMod);
			document.getElementById("attackreporter").innerHTML = "Your Attack HIT for a CRITICAL of " + numDamage + " damage!";
		}
		if (document.getElementById("attacktype").value === "Gunplay"){
			if (boolAimSuccess === true && boolCrit === true){
				numDamage = ((Math.floor(Math.random() * gunplayDice + 1)) * numCritMod);
				document.getElementById("attackreporter").innerHTML = "Your Attack HIT for a CRITICAL of " + numDamage + " damage!";
			}
			if (boolAimSuccess === true && boolCrit === false){
				numDamage = Math.floor(Math.random() * gunplayDice + 1)
				document.getElementById("attackreporter").innerHTML = "Your Attack HIT for a total of " + numDamage + " damage!";
			}
			if (boolAimSuccess === false){
				document.getElementById("attackreporter").innerHTML = "Your Attack MISSED!";
			}
		}
		if (document.getElementById("attacktype").value === "Sniper"){
			if (boolAimSuccess === true && boolCrit === true){
				numDamage = ((Math.floor(Math.random() * sniperDice + 1)) * numCritMod);
				document.getElementById("attackreporter").innerHTML = "Your Attack HIT for a CRITICAL of " + numDamage + " damage!";
			}
			if (boolAimSuccess === true && boolCrit === false){
				numDamage = Math.floor(Math.random() * sniperDice + 1);
				document.getElementById("attackreporter").innerHTML = "Your Attack HIT for a total of " + numDamage + " damage!";
			}
			if (boolAimSuccess === false){
				document.getElementById("attackreporter").innerHTML = "Your Attack MISSED!";
			}
		}
		if (document.getElementById("attacktype").value === "Blast"){
			if (boolAimSuccess === true && boolCrit === true){
				numDamage = ((Math.floor(Math.random() * blastDice + 1)) * numCritMod);
				document.getElementById("attackreporter").innerHTML = "Your Attack HIT for a CRITICAL of " + numDamage + " damage!";
			}
			if (boolAimSuccess === true && boolCrit === false){
				numDamage = Math.floor(Math.random() * blastDice + 1);
				document.getElementById("attackreporter").innerHTML = "Your Attack HIT for a total of " + numDamage + " damage!";
			}
			if (boolAimSuccess === false){
				document.getElementById("attackreporter").innerHTML = "Your Attack MISSED!";
			}
		}
		if (document.getElementById("attacktype").value === "Unarmed" && boolCrit === false){
			numDamage = Math.floor(Math.random() * 4 + 1);
			document.getElementById("attackreporter").innerHTML = "Your Attack HIT for a total of " + numDamage + " damage!";
		}
		if (document.getElementById("attacktype").value === "Unarmed" && boolCrit === true){
			numDamage = ((Math.floor(Math.random() * 4 + 1)) * numCritMod);
			document.getElementById("attackreporter").innerHTML = "Your Attack HIT for a CRITICAL of " + numDamage + " damage!";
		}
	}
	
	if (document.getElementById("weaponskill").value === "Experienced") {
		if (document.getElementById("attacktype").value === "Melee(Power)" && boolCrit === false){
			numDamage = Math.floor(Math.floor(Math.random() * meleePowerDice + 1) + (numStrength/2) + (numStamina/4));
			document.getElementById("attackreporter").innerHTML = "Your Attack HIT for a total of " + numDamage + " damage!";
		}
		if (document.getElementById("attacktype").value === "Melee(Power)" && boolCrit === true){
			numDamage = Math.floor((Math.floor(Math.random() * meleePowerDice + 1) + (numStrength/2) + (numStamina/4)) * numCritMod);
			document.getElementById("attackreporter").innerHTML = "Your Attack HIT for a CRITICAL of " + numDamage + " damage!";
		}
		if (document.getElementById("attacktype").value === "Melee(Swift)" && boolCrit === false){
			numDamage = Math.floor(Math.floor(Math.random() * meleeSwiftDice + 1) + (numStrength/2) + (numAgility/4));
			document.getElementById("attackreporter").innerHTML = "Your Attack HIT for a total of " + numDamage + " damage!";
		}
		if (document.getElementById("attacktype").value === "Melee(Swift)" && boolCrit === true){
			numDamage = Math.floor((Math.floor(Math.random() * meleeSwiftDice + 1) + (numStrength/2) + (numAgility/4)) * numCritMod);
			document.getElementById("attackreporter").innerHTML = "Your Attack HIT for a CRITICAL of " + numDamage + " damage!";
		}
		if (document.getElementById("attacktype").value === "Gunplay"){
			if (boolAimSuccess === true && boolCrit === true){
				numDamage = Math.floor((Math.floor(Math.random() * gunplayDice + 1) + (numAgility/2) + (numStamina/4)) * numCritMod);
				document.getElementById("attackreporter").innerHTML = "Your Attack HIT for a CRITICAL of " + numDamage + " damage!";
			}
			if (boolAimSuccess === true && boolCrit === false){
				numDamage = Math.floor(Math.floor(Math.random() * gunplayDice + 1) + (numAgility/2) + (numStamina/4));
				document.getElementById("attackreporter").innerHTML = "Your Attack HIT for a total of " + numDamage + " damage!";
			}
			if (boolAimSuccess === false){
				document.getElementById("attackreporter").innerHTML = "Your Attack MISSED!";
			}
		}
		if (document.getElementById("attacktype").value === "Sniper"){
			if (boolAimSuccess === true && boolCrit === true){
				numDamage = Math.floor((Math.floor(Math.random() * sniperDice + 1) + (numPerception/2) + (numStrength/4)) * numCritMod);
				document.getElementById("attackreporter").innerHTML = "Your Attack HIT for a CRITICAL of " + numDamage + " damage!";
			}
			if (boolAimSuccess === true && boolCrit === false){
				numDamage = Math.floor(Math.floor(Math.random() * sniperDice + 1) + (numPerception/2) + (numStrength/4));
				document.getElementById("attackreporter").innerHTML = "Your Attack HIT for a total of " + numDamage + " damage!";
			}
			if (boolAimSuccess === false){
				document.getElementById("attackreporter").innerHTML = "Your Attack MISSED!";
			}
		}
		if (document.getElementById("attacktype").value === "Blast"){
			if (boolAimSuccess === true && boolCrit === true){
				numDamage = Math.floor((Math.floor(Math.random() * blastDice + 1) + (numStrength/2) + (numPerception/4)) * numCritMod);
				document.getElementById("attackreporter").innerHTML = "Your Attack HIT for a CRITICAL of " + numDamage + " damage!";
			}
			if (boolAimSuccess === true && boolCrit === false){
				numDamage = Math.floor(Math.floor(Math.random() * blastDice + 1) + (numStrength/2) + (numPerception/4));
				document.getElementById("attackreporter").innerHTML = "Your Attack HIT for a total of " + numDamage + " damage!";
			}
			if (boolAimSuccess === false){
				document.getElementById("attackreporter").innerHTML = "Your Attack MISSED!";
			}
		}
		if (document.getElementById("attacktype").value === "Unarmed" && boolCrit === false){
			numDamage = Math.floor(Math.floor(Math.random() * 4 + 1) + (numAgility/2) + (numStrength/4));
			document.getElementById("attackreporter").innerHTML = "Your Attack HIT for a total of " + numDamage + " damage!";
		}
		if (document.getElementById("attacktype").value === "Unarmed" && boolCrit === true){
			numDamage = Math.floor((Math.floor(Math.random() * 4 + 1) + (numAgility/2) + (numStrength/4)) * numCritMod);
			document.getElementById("attackreporter").innerHTML = "Your Attack HIT for a CRITICAL of " + numDamage + " damage!";
		}
	}
	
	if (numDamage === prevDamage){
		document.getElementById("attackduplicate").style.visibility = "visible";
	}
	
	prevDamage = numDamage;
	
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
