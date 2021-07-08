const express = require('express');
var cors = require('cors');

const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

const searchQueries = [];
const articlesClicked = [];

app.use(bodyParser.json());
//app.use(express.static(process.cwd() + "/my-app/dist/news-search-app/"));

app.use(cors());

app.get('/api/searchQueries', (req, res) => {
  res.json(searchQueries);
});

app.post('/api/searchQuery', (req, res) => {
  const searchQuery = req.body.searchQuery;
  searchQueries.push(searchQuery);
  console.log(searchQueries);
  res.json("search query added");
});

app.get('/api/articlesClicked', (req, res) => {
  res.json(articlesClicked);
});

app.post('/api/articleClicked', (req, res) => {
  const articleClicked = req.body.articleClicked;
  articlesClicked.push(articleClicked);
  console.log(articleClicked);
  res.json("article clicked added");
});

app.get('/', (req,res) => {
  res.sendFile(process.cwd()+"/my-app/dist/news-search-app/index.html")
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
