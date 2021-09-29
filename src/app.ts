import express from "express";
import http from "http";

const App = ():http.Server => {
  const app = express();

  app.post("/qa/questions", (req, res, next) => {
    req.baseUrl = "";
    res.statusCode = 201;
    res.send();
    next();
  });

  const server = app.listen(8080);

  return server;
};

export default App;
