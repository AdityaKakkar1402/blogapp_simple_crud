const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//if we want to use logger everywhere
app.use(logger);
let blogList = [];

// lets consider some issue with logger function then
// by this way next function will not run and
// from here only msg will popo up

// function logger(req, res, next) {
//   console.log(req.url);
//   console.log(req.body);
//   let condition = true;
//   if (condition) {
//     return res.status(500).json({
//       message: "something went wrong",
//     });
//   }
//   next();
// }

function logger(req, res, next) {
  console.log(req.url);
  console.log(req.body);
  let condition = false;
  if (condition) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
  next();
}

function isAuth(req, res, next) {
  console.log("user authed");
  next();
}

// app.get("/blogs", logger, isAuth, (req, res) => {
//   return res.status(200).json({
//     data: blogList,
//     success: true,
//   });
// });

// islogger will run first and then isauth
app.get("/blogs", isAuth, (req, res) => {
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
