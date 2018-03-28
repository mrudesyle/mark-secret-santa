
$(document).ready(function(){
// Initialize Firebase
var config = {
	apiKey: "AIzaSyDv2FsrJadHox9lm9ccXWDfqKtAipU4u_M",
	authDomain: "secretsantaprototype-1ea82.firebaseapp.com",
	databaseURL: "https://secretsantaprototype-1ea82.firebaseio.com",
	projectId: "secretsantaprototype-1ea82",
	storageBucket: "secretsantaprototype-1ea82.appspot.com",
	messagingSenderId: "462928145575"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();
var fbparticipant = [];
var count = "";

$('body').on('click', '.addMe', function () {
	event.preventDefault();
	
	var lngth = fbparticipant.length;
	database.ref().orderByChild("name").equalTo("Diana").on("child_added", function(childSnapshot){
		//set snapshot variable to hold participant names from firebase
		var sv = childSnapshot.val();
		console.log(childSnapshot.val());
		//push names into participants array
		fbparticipant.push(sv);
		console.log(fbparticipant);
		console.log(fbparticipant.length);
		count = fbparticipant.length;
		getCount();
	
	})
	
function getCount(){
	console.log("Here's the current count:" +count);
	
}
	
	
});


//Main function for Secret Santa web app/////////////////////////////////////////////////////
// Stores data from form in array and uses that data to pair participants
$('#submitMe').on('click', function () {
	event.preventDefault();
	var participants = [];
	
	// console.log("Size of participant array: ");
	// console.log(participant.length);
	for (i=0; i<fbparticipant.length; i++){
		var participant = [fbparticipant[i]];
		participants.push(participant);
		// console.log(fbparticipant[i]);
	}

	console.log("Here's the Array: " + participants);
	participants = shuffle(participants);
	console.log("Length of Participants Array: " + participants.length);
	console.log("Here's the  shuffled aray: " + participants);
	participants.forEach(matchParticipants);
	// console.log("Here are the matched participants");
	// console.log(participants);

})


/**
 * Function that will randomly shuffle an array. 
 * Fisher-Yates (aka Knuth) Shuffle
 * http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
};

// Function to match participants with recipients 
// Matches current participant in array with the next participant in array
// Unless they are the last, in which case matches them with the first participant in array
function matchParticipants(participant, index, array) {
	//Check for last participant in array & push with first participant in array
	if (index === array.length - 1) {
		participant.push(array[0][0]);
		console.log(participant);
	} else {
		participant.push(array[index + 1][0]);
		console.log(participant);
	}
};


})