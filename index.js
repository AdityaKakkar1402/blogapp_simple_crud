const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let blogList = [];

app.get("/blogs", (req, res) => {
  return res.status(200).json({
    data: blogList,
    success: true,
  });
});

app.post("/blogs", (req, res) => {
  blogList.push({
    title: req.body.title,
    content: req.body.content,
    id: Math.floor(Math.random(1000) * 1000),
  });
  return res.status(201).json({
    success: true,
  });
});

app.get("/blogs/:id", (req, res) => {
  const result = blogList.filter((blog) => blog.id == req.params.id);
  return res.status(200).json({
    data: result,
    success: true,
  });
});
app.delete("/blogs/:id", (req, res) => {
  const result = blogList.findIndex((blog) => blog.id == req.params.id);
  if (result > -1) {
    blogList.splice(result, 1);
  }
  return res.status(200).json({
    data: result,
    success: true,
  });
});

app.listen(PORT, () => {
  console.log("server started on" + PORT);
});