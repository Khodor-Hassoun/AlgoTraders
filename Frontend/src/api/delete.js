import axios from "axios";
const axiosURL = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

const DeleteSeries = (id) => {
  return new Promise((resolve, reject) => {
    axiosURL
      .post("/deleteSeries/", { id })
      .then((res) => {
        console.log("res");
        let result = res.data;
        resolve(result);
      })
      .catch((err) => {
        console.log({ id });
        reject(err);
      });
  });
};

export { DeleteSeries };
