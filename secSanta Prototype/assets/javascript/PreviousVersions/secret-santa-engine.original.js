//Template variable clones the div to dynamically add new participants
var template = $('#sections').clone();

var sectionsCount = 0;

// When user clicks .addMe button, adds new participant
$('body').on('click', '.addMe', function () {
	sectionsCount++;

	// Loop through each input
	var section = template.clone().find(':input').each(function () {
		var newId = this.id.slice(0, -1) + sectionsCount;
		this.id = newId;
		$(this).attr('name', newId);
	}).end()
		.appendTo('#sections');
	return false;
});

//Main function for Secret Santa web app/////////////////////////////////////////////////////
// Stores data from form in array and uses that data to pair participants
$('#submitMe').on('click', function () {
	event.preventDefault();
	var participants = [];

	// Create an array for each participant within the participants array
	$('#secretSantaForm').find(".section").each(function () {
		var participant = [
			$(this).find(".nameInput").val()
		];
		participants.push(participant);

	});
	console.log("Here's the  aray: " + participants);
	participants = shuffle(participants);
	console.log("Here's the  shuffled aray: " + participants);
	participants.forEach(matchParticipants);
	console.log("Here are the matched participants");
	console.log(participants);
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




