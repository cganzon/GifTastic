var topics = ["pizza", "hot dogs", "hamburgers", "chicken", "kbbq"];

// Dynamically displaying buttons on page
function makeButtons() {
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>").text(topics[i]);
        button.addClass("button btn btn-outline-secondary");
        $("#buttons").append(button);
    };
};
// Calling function on page load to generate initial topics
makeButtons();

// Adding new buttons from user input
$(document).on("click", "#addButton", function (event) {
    // Disables the ability for the add button to refresh the page
    event.preventDefault();
    // Clears the buttons div in order to make new buttons with new input added
    $("#buttons").empty();
    // Getting user's text from the input box and making a new button
    var newButton = $("#newButton").val()
    topics.push(newButton);
    // Calling makeButtons function again to regenerate new buttons with user's input added
    makeButtons();
    // Clears text from the input field after the button is made
    $("#newButton").val("");
});

// Event listener for all buttons
$(document).on("click", ".button", function (event) {
    // Prevents any of the dynamically generated buttons from refreshing the page
    event.preventDefault();
    // Clearing any GIFs already on the page
    $("#gifs").empty();
    // Getting text of the clicked button to concatenate with queryURL
    var search = $(this).text();
    // Access to GIPHY API
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=AUTbm6TcaRY094k2XXBf2EfgjR4xynUu&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.data;
        // Displaying the rating and gif on the page
        for (var i = 0; i < results.length; i++) {
            var newDiv = $("<div>");
            newDiv.addClass("card");
            // Using an object to set multiple attributes on the gif
            var image = $("<img>").attr({
                "src": results[i].images.fixed_height_still.url,
                "data-animate": results[i].images.fixed_height.url,
                "data-still": results[i].images.fixed_height_still.url
            });
            image.addClass("gif");
            var rating = $("<p>").text("Rating: " + results[i].rating);
            newDiv.append(rating);
            newDiv.append(image);
            $("#gifs").prepend(newDiv);
        };
    });

});

// Allows GIFs to be paused and played
$(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    console.log(state);
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        // Then, set the image's data-state to animate
        $(this).attr("data-state", "animate");
    }
    // Else set src to the data-still value
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

// small bug where you initially have to double click the GIF to play it

