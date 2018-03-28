	1. Line 146: There was a form defined for "partyDeets"
		a. Changed this to a div & it fixed the problem
	2. Added updated Map.js script 
		a. Script is now using same DB as secret-santa-engine-v2.js
		b. Map.js:
			i. Comment out firebase config code blocks
			ii. Bottom of deets.html file:
				1) Load secret-santa-engine.v2.js 1st
				2) Then load map.js
	3. retrievewishlist.js:
		a. Comment out firebase config data
Link reference to js file at bottom of deets.html
