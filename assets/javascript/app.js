var topics = ["pizza", "hot dogs", "hamburgers"];

// Dynamically displaying buttons on page
for (var i = 0; i < topics.length; i++) {
    var button = $("<button>").text(topics[i]);
    button.attr("class", "button");
    $("#buttons").append(button);
}

// Event listener for all buttons
$(document).on("click", ".button", function () {
    // Clearing any GIFs already on the page
    $("#gifs").empty();
    // Getting text of the clicked button to concatenate with queryURL
    var search = $(this).text();
    // Access to GIPHY API
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=AUTbm6TcaRY094k2XXBf2EfgjR4xynUu&limit=5";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var results = response.data;
        // Displaying the rating and gif on the page
        for (var i = 0; i < results.length; i++) {
            var newDiv = $("<div>");
            var image = $("<img>").attr("src", results[i].images.fixed_height.url);
            var rating = $("<p>").text("Rating: " + results[i].rating);
            newDiv.append(rating);
            newDiv.append(image);
            $("#gifs").prepend(newDiv);
        };
    });

});