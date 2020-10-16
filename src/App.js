const app = require("express")();
const { PORT } = require("./config/");

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => console.log("Working"));
