import { useEffect, useState } from "react";
import "./styles.css";
// 1. Build a search input to allow the user to enter any movie title. We'll use this input to contact the OMDb API and display any matching movie titles in the UI.
// 2. Render these results below the input.
// 3. Allow the user to click on a movie title from the results, and contact the OMDB API again to get additional details about this movie (title, genre, plot, poster).
// 4. Render these details in the UI.

export default function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState({});
  const [movieDetail, setMovieDetail] = useState({});
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const fetchMovies = async () => {
    await fetch(
      `https://www.omdbapi.com/?apikey=8fc6c84a&t=${search.replace(" ", "+")}`
    )
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        if (data.Error) {
          alert("Movie Not Found");
        }
        setMovies(data);
        setMovieDetail({});
      })
      .catch((e) => {
        console.log("Error Occured", e);
      });
  };
  const getMovieInfo = async () => {
    await fetch(`https://www.omdbapi.com/?apikey=8fc6c84a&i=${movies.imdbID}`)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setMovieDetail(data);
      })
      .catch((e) => {
        console.log("Error Occured", e);
      });
  };
  // useEffect(() => {
  //   console.log("movies", movies);
  // }, [movies]);
  return (
    <div className="App">
      <input onChange={handleChange} type="text" />
      <button onClick={fetchMovies}>Search</button>
      {movies.Title && (
        <div style={{ border: "2px solid black", margin: "10px" }}>
          <span style={{ cursor: "pointer" }} onClick={getMovieInfo}>
            {movies.Title && movies.Title}
          </span>
          <br />
          <span>{movies.Actors && movies.Actors}</span>
          <br />
          <span>
            {movies.imdbRating && `IMDB Rating: ${movies.imdbRating}`}
          </span>
        </div>
      )}
      {movieDetail.Title && (
        <div style={{ border: "2px solid black", margin: "10px" }}>
          <div>
            <img src={movieDetail.Poster} style={{ aspectRatio: "4/4" }} />
          </div>
          <span>{`Title: ${movieDetail.Title}`}</span>
          <br />
          <span>{`Genre:${movieDetail.Genre}`}</span>
          <br />
          <span>{`Plot:${movieDetail.Plot}`}</span>
        </div>
      )}
    </div>
  );
}
