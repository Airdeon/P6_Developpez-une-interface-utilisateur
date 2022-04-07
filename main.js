window.onload = function () {
    get_best_movie();
    fill_best_movie();
};
function get_best_movie() {
    // Get movie form OCmovie API
    url = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";
    fetch(url)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (value) {
            image_url = value.results[0].image_url
            document.getElementById('top_movie_image').setAttribute("src", image_url)
            document.getElementById('movie_title').innerHTML = value.results[0].title

            console.log(value);
        })
        .catch(function (err) {
            console.log("error")
        })
}
function get_api_json_data(url) {
    fetch(url)
        .then(function (responce) {
            if (responce.ok) {
                return responce.json();
            }
        })
        .then(function (value) {
            console.log(value);
            return value;
        })
        .catch(function (err) {
            console.log("error")
        })
}
function fill_best_movie() {
    var data = get_api_json_data("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score")
    index = 1;
    console.log(data);
    for (let film = 1; film < 8; film++) {
        if (data.results[index] == undefined) {
            url = data.next
            console.log(url)
            data = get_api_json_data(url)
        }
        console.log(data)
        document.getElementById('movie_bloc1').innerHTML += "<a class='movie' onclick=''><img src='" + data.results[index].image_url + "'></img></a>"
        if (film < 8) {
            document.getElementById('movie_bloc1').innerHTML += "<div class='space_between'></div>"
        }
        index++;
    }
}

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