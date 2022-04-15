// Get the modal
var modal = document.getElementById("Modal");

// Get the button that opens the modal
var btn = document.getElementById("open_modal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function get_list(list){
  let construct_string = " "
  for (let value of list) {
    construct_string += value;
    construct_string += ", ";
  }
  construct_string = construct_string.substring(0, construct_string.length - 2);
  return construct_string
}

// Open the modal
async function load_modal_info(id) {
  let url = "http://localhost:8000/api/v1/titles/" + id;
  data = await get_data(url);

  //get all element of the modal
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

  // Title
  title.innerHTML = data.title;

  // Image
  modal_movie_picture.innerHTML = "<img class=\"movie_picture\" src=\"" + data.image_url + "\">";

  // Genres
  genres.innerHTML = "<b>Genres : </b>" + get_list(data.genres);

  // Out date
  out_date.innerHTML = "<b>Out date : </b>" + data.date_published;

  // Rated
  rated.innerHTML = "<b>Rated : </b>" + data.avg_vote;

  // IMDB Score
  IMDB_score.innerHTML = "<b>IMDB Score : </b>" + data.imdb_score;

  // Directors
  directors.innerHTML = "<b>Directors : </b>" + get_list(data.directors);

  // Actors
  actors.innerHTML = "<b>Actors : </b>" + get_list(data.actors);

  // Duration
  duration.innerHTML = "<b>Duration : </b>" + data.duration + " min";

  // Origines
  origine.innerHTML = "<b>Origines : </b>" + get_list(data.countries);

  // Box Office result
  box_office_result.innerHTML = "<b>Box Office result : </b>" + data.worldwide_gross_income;

  // Resume
  resume.innerHTML = "<b>Description : </b>" + data.description;

  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}