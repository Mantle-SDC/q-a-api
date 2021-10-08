import http from "k6/http";

export const options = {
  vus: 150,
  duration: "30s",
};

export default () => {
  const id = Math.floor(Math.random() * 1000013);
  http.get(`http://localhost:8080/qa/questions?product_id=${id}`);
};
