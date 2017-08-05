$(document).ready(function () {

    // Initial array of movies
    var topics = ["Pizza", "Politics", "Praying", "Programming", "Pugs", "Putin"];

    // displayMovieInfo function re-renders the HTML to display the appropriate content
    function displayTopicsInfo() {

        var apiKey = "0bf6b1fd038549429b8dcda43335d372";
        var topic = $(this).attr("data-name");
        var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + topic + "&limit=10&offset=0&rating=G&lang=en";

        // Creating an AJAX call for the specific gif button being clicked
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).done(function(response) {

            var gifURL = response.data;

            for (var i = 0; i < gifURL.length; i++) {

                // Creating a div to hold the gif
                var gifDiv = $("<div class='gif'>");

                // Retrieving the URLs for the gifs
                var newGifURL = gifURL[i].images.downsized.url;

                // Creating an element to hold the gif
                var gif = $("<img>").attr("src", newGifURL);

                // Appending the gif
                gifDiv.append(gif);

                // Putting the entire gif above the previous gifs
                $("#gif-view").prepend(gifDiv);
            }
        });

    }

// Function for displaying movie data
    function renderButtons() {

        // Looping through the array of topics
        $("#buttons-view").empty();

        // Looping through the array of topics
        for (var i = 0; i < topics.length; i++) {

            // Then dynamically generating buttons for each gif in the array
            var a = $("<button>");
            // Adding a class of gif to our button
            a.addClass("gif btn-large waves-effect waves-light light-blue lighten-1");
            // Adding a data-attribute
            a.attr("data-name", topics[i]);
            // Providing the initial button text
            a.text(topics[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }

// This function handles events where a movie button is clicked
    $("#submit-request").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var query = $("#add_a_gif").val().trim();

        // Adding gif from the textbox to our array
        topics.push(query);

        // Calling renderButtons which handles the processing of our topics array
        renderButtons();
    });

// Adding a click event listener to all elements with a class of "gif"
    $(document).on("click", ".gif", displayTopicsInfo);

// Calling the renderButtons function to display the intial buttons
    renderButtons();

});