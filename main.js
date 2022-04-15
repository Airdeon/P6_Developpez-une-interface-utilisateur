window.onload = function () {
    var base_url = "http://localhost:8000/api/v1/titles/"
    get_best_movie(base_url);
    fill_movie(base_url + "?sort_by=-imdb_score", "movie_best");
    fill_movie(base_url + "?genre=Animation&sort_by=-imdb_score", "category_animation");
    fill_movie(base_url + "?genre=Action&sort_by=-imdb_score", "category_action");
    fill_movie(base_url + "?genre=Fantasy&sort_by=-imdb_score", "category_fantasy");
};
async function get_best_movie(base_url) {
    // Get movie form OCmovie API
    let url = base_url + "?sort_by=-imdb_score";
    let data = await get_data(url);

    // transform url for best quality image
    let image_url = data.results[0].image_url;
    let index = image_url.indexOf('_V1_')
    image_url = image_url.substring(0, index+4);
    image_url += ".jpg"

    // Set top movie info
    document.getElementById('top_movie_image').setAttribute("src", image_url);
    document.getElementById('movie_title').innerHTML = data.results[0].title;
    data = await get_data(data.results[0].url);
    document.getElementById('more_info').setAttribute("onclick", "load_modal_info(" + data.id + ")");
    document.getElementById('top_movie_description').innerHTML = data.description;
}

// get json data available on "url"
function get_data(url) {
    return fetch(url)
        .then(data => data.json())
        .catch(error => alert("Erreur : " + error));
}

// Set all category movies
async function fill_movie(url, bloc) {
    let data = await get_data(url);
    if (bloc == "movie_best") {
        var index = 1;
        var number_of_movies = 8;
    }
    else {
        var index = 0;
        var number_of_movies = 7;
    }

    for (let film = index; film < number_of_movies; film++) {
        if (data.results[index] == undefined) {
            url = data.next;
            data = await get_data(url);
            index = 0
        }
        document.getElementById(bloc).innerHTML += "<button id='open_modal' class='movie' onclick='load_modal_info(" + data.results[index].id + ")'><img src='" + data.results[index].image_url + "'></img></button>";
        if (film < 8) {
            document.getElementById(bloc).innerHTML += "<div class='space_between'></div>";
        }
        index++;
    }
}
// Slide movie Left and Right
function slide(id_field, direction) {
    var div = document.getElementById(id_field)
    scrollvalue = 0;
    var slide = setInterval(function () {
        if (direction == "right") {
            div.scrollLeft += 10;

        }
        else if (direction == "left") {
            div.scrollLeft -= 100;

        }
        scrollvalue += 10;
        if (scrollvalue >= 190) {
            window.clearInterval(slide);
        }
    }, 10);
}