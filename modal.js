// Get the modal
var modal = document.getElementById("Modal");

// Get the button that opens the modal
var btn = document.getElementById("open_modal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
async function load_modal_info(id) {
  let url = "http://localhost:8000/api/v1/titles/" + id;
  data = await get_data(url);

  let title = document.getElementById('modal_title');
  let modal_movie_picture = document.getElementById("modal_movie_picture")
  let genres = document.getElementById("genres")
  let out_date = document.getElementById("out_date")
  let rated = document.getElementById("rated")
  let IMDB_score = document.getElementById("IMDB_score")
  let directors = document.getElementById("directors")
  let actors = document.getElementById("actors")
  let duration = document.getElementById("duration")
  let origine = document.getElementById("origine")
  let box_office_result = document.getElementById("box_office_result")
  let resume = document.getElementById("resume")

  title.innerHTML = data.title;
  modal_movie_picture.innerHTML = "<img class=\"movie_picture\" src=\"" + data.image_url + "\">";

  // Genres
  let string_genres = ""
  for (let value of data.genres) {
    string_genres += value;
    string_genres += ", ";
  }
  console.log(string_genres);
  string_genres = string_genres.substring(0, string_genres.length - 2);
  genres.innerHTML = "<b>Genres : </b>" + string_genres;

  // Out date
  out_date.innerHTML = "<b>Out date : </b>" + data.date_published;

  // Rated
  rated.innerHTML = "<b>Rated : </b>" + data.avg_vote;

  // IMDB Score
  IMDB_score.innerHTML = "<b>IMDB Score : </b>" + data.imdb_score;

  // Directors
  let string_directors = ""
  for (let value of data.directors) {
    string_directors += value;
    string_directors += ", ";
  }
  string_directors = string_directors.substring(0, string_directors.length - 2);
  directors.innerHTML = "<b>Directors : </b>" + string_directors;

  // Actors
  let string_actors = ""
  for (let value of data.actors) {
    string_actors += value;
    string_actors += ", ";
  }
  string_actors = string_actors.substring(0, string_actors.length - 2);
  actors.innerHTML = "<b>Actors : </b>" + string_actors;

  // Duration
  duration.innerHTML = "<b>Duration : </b>" + data.duration;

  // Origines
  let string_origines = ""
  for (let value of data.countries) {
    string_origines += value;
    string_origines += ", ";
  }
  string_origines = string_origines.substring(0, string_origines.length - 2);
  origine.innerHTML = "<b>Origines : </b>" + string_origines;

  // Box Office result
  box_office_result.innerHTML = "<b>Box Office result : </b>" + data.worldwide_gross_income;

  // Resume
  resume.innerHTML = "<b>Description : </b>" + data.description;


  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  console.log('test')
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}