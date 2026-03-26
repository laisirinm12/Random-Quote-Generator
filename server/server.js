const express = require("express");
const cors = require("cors");
const quotes = require("./quotes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "*"
}));

let lastIndex = -1;

/* API endpoint */

app.get("/quote", (req, res) => {

let randomIndex;

do {
randomIndex = Math.floor(Math.random() * quotes.length);
} while (randomIndex === lastIndex);

lastIndex = randomIndex;

res.json(quotes[randomIndex]);

});


/* Health check route (nice for APIs) */

app.get("/", (req, res) => {
res.send("Quote API is running 🚀");
});


/* Start server */

app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});