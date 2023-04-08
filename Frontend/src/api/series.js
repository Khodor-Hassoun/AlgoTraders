import axios from "axios";
import { getFormData } from "../util/utils.js";

const axiosURL = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

const FetchMovieNames = () => {
  return new Promise((resolve, reject) => {
    axiosURL
      .get("/movies/")
      .then((res) => {
        let result = res.data;
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const FetchActorNames = () => {
  return new Promise((resolve, reject) => {
    axiosURL
      .get("/actors/")
      .then((res) => {
        let result = res.data;
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const FetchMovieGenres = () => {
  return new Promise((resolve, reject) => {
    axiosURL
      .get("/genres/")
      .then((res) => {
        let result = res.data;
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const FetchMovies = (movie = null, actor = null, director = null, year = null, genre = null) => {
  const parameters = {
    movie: movie,
    actor: actor,
    director: director,
    year: year,
    genre: genre,
  };

  return new Promise((resolve, reject) => {
    axiosURL
      .get("/search/", { params: parameters })
      .then((res) => {
        let result = res.data;
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const CreateSeries = (seriesInfo) => {
  seriesInfo.series_startDate = seriesInfo.series_startDate.format("YYYY-MM-DD");
  return new Promise((resolve, reject) => {
    axiosURL
      .post("/createSeries/", getFormData(seriesInfo))
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const FetchSeries = () => {
  return new Promise((resolve, reject) => {
    axiosURL
      .get("/getSeries/")
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export { FetchMovies, FetchMovieNames, FetchMovieGenres, FetchActorNames, CreateSeries, FetchSeries };
