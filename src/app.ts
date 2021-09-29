import express from "express";

const App = ():express.Express => {
  const app = express();

  app.post("/qa/questions", (req, res, next) => {
    req.baseUrl = "";
    res.statusCode = 201;
    res.send();
    next();
  });

  app.listen(8080);

  return app;
};

export default App;
