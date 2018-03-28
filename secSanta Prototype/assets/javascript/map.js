


var partyAddress;
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDLN3xvbcjFVqcg9yDl2-0sBaR_CNt0SvY",
    authDomain: "mapapi-f40ea.firebaseapp.com",
    databaseURL: "https://mapapi-f40ea.firebaseio.com",
    projectId: "mapapi-f40ea",
    storageBucket: "",
    messagingSenderId: "890218358654"
};
firebase.initializeApp(config);


// // Create a variable to reference the database
var database = firebase.database();
// var newAddress = {
//     address: "1675 Broadway, Denver CO"
// };
//#locationSubmitBtn
$('#submit').on('click', function () {
    var newAddress = $('#location').val().trim();
    database.ref('/locations').push(newAddress);
})

database.ref('/locations').limitToLast(1).on("child_added", function (snapshot) {
    partyAddress = snapshot.val().replace(/ /g, "+");
    console.log(partyAddress);
    getMap();

})

function getMap() {
    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + partyAddress + "&key=AIzaSyB8ykdYPnNswf6X7Hd5qHz4RT4WicH5NhE";
    var lat;
    var long;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.results[0].geometry.location.lat);
        console.log(response.results[0].geometry.location.lng);
        lat = response.results[0].geometry.location.lat;
        long = response.results[0].geometry.location.lng;
        map.setCenter({ lat: lat, lng: long });
    });
}


function initMap() {
    if (lat == undefined) {
        lat = 39.7457833;
    }
    if (long == undefined) {
        long = -104.9857172
    }
    var centerCity = { lat: lat, lng: long };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: centerCity
    });
    var marker = new google.maps.Marker({
        position: centerCity,
        map: map
    });
}
