import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const renderForm = (res, view, data = {}) => {
  const { userName = '', userInput = '', postName = '' } = data;
  res.render(view, { userName, userInput, postName });
};

app.get('/', (req, res) => {
  renderForm(res, "index.ejs", req.query);
});

app.get('/submit', (req, res) => {
  renderForm(res, "submit.ejs");
 });

app.post('/submit', (req, res) => {
  const { userInput, userName, postName } = req.body;
  console.log('Data received:', userInput, userName, postName);
  res.redirect(`/?userName=${encodeURIComponent(userName)}&userInput=${encodeURIComponent(userInput)}&postName=${encodeURIComponent(postName)}`);
});

app.get('/edit', (req, res) => {
  renderForm(res, "edit", req.query);
 });

 app.post('/edit', (req, res) => {
  const { userInput, userName, postName } = req.body;
  console.log('Data received:', userInput, userName, postName);
  res.redirect(`/?userName=${encodeURIComponent(userName)}&userInput=${encodeURIComponent(userInput)}&postName=${encodeURIComponent(postName)}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});