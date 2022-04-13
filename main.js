window.onload = function () {
    var base_url = "http://localhost:8000/api/v1/titles/"
    get_best_movie(base_url);
    fill_movie(base_url + "?sort_by=-imdb_score", "movie_best");
    fill_movie(base_url + "?genre=Animation&sort_by=-imdb_score", "category_animation");
    fill_movie(base_url + "?genre=Action&sort_by=-imdb_score", "category_action");
    fill_movie(base_url + "?genre=Fantasy&sort_by=-imdb_score", "category_fantasy");
};
function get_best_movie(base_url) {
    // Get movie form OCmovie API
    url = base_url + "?sort_by=-imdb_score";
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
async function get_api_json_data(url) {
    return await new Promise((resolve, reject) =>{
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                resolve(response.json());
            }
        })

        .catch(function (err) {
            reject(console.log("error"));
        })
    })
}

async function fill_movie(url, bloc) {
    let data = await get_api_json_data(url);
    if (bloc == "movie_best"){
        var index = 1;
        var number_of_movies = 8;
    }
    else{
        var index = 0;
        var number_of_movies = 7;
    }
    console.log(data);

    for (let film = index; film < number_of_movies; film++) {
        if (data.results[index] == undefined) {
            url = data.next;
            console.log(url);
            data = await get_api_json_data(url);
            index = 0
        }
        console.log(bloc);
        document.getElementById(bloc).innerHTML += "<button id='open_modal' class='movie' onclick='load_modal_info(" + data.url + ")'><img src='" + data.results[index].image_url + "'></img></button>";
        if (film < 8) {
            document.getElementById(bloc).innerHTML += "<div class='space_between'></div>";
        }
        index++;
    }
}

function load_modal_info(url){

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