let currentQuote = "";


/* PRELOAD BACKGROUND IMAGES (performance improvement) */

const images = ["rose.jpg","galaxy.jpg","sunrise.jpg","wisdom.jpg"];

images.forEach(src => {
const img = new Image();
img.src = src;
});


/* MAIN QUOTE FUNCTION */

async function getQuote(){

  const quoteText = document.getElementById("quoteText");
  const quoteAuthor = document.getElementById("quoteAuthor");

  try{

    quoteText.textContent = "⏳ Loading quote...";
    quoteAuthor.textContent = "";

    const API_URL = "https://random-quote-generator-1mle.onrender.com";

    const response = await fetch(`${API_URL}/quote`);

    const data = await response.json();

    quoteText.textContent = data.text;
    quoteAuthor.textContent = "- " + data.author;

    currentQuote = data.text + " - " + data.author;

    /* THEME SWITCH */

    switch(data.category){
      case "love":
        document.body.style.backgroundImage = "url('rose.jpg')";
        break;

      case "coding":
        document.body.style.backgroundImage = "url('galaxy.jpg')";
        break;

      case "motivation":
        document.body.style.backgroundImage = "url('sunrise.jpg')";
        break;

      case "wisdom":
        document.body.style.backgroundImage = "url('wisdom.jpg')";
        break;
    }

  } catch(error){

    quoteText.textContent =
    "⚠️ Server is waking up... click again in a few seconds";

    quoteAuthor.textContent = "";
  }
}


/* BUTTON EVENT */

document.getElementById("newQuote").addEventListener("click", getQuote);


/* LOAD QUOTE ON PAGE START */

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(getQuote, 500);
});


/* COPY FEATURE */

document.getElementById("copyQuote").addEventListener("click", () => {

const quote = document.getElementById("quoteText").textContent;
const author = document.getElementById("quoteAuthor").textContent;

navigator.clipboard.writeText(quote + " " + author);

const btn = document.getElementById("copyQuote");

btn.textContent = "Copied!";

setTimeout(() => {
btn.textContent = "Copy";
},1500);

});


/* DOWNLOAD IMAGE */

document.getElementById("downloadQuote").addEventListener("click", async () => {

const title = document.getElementById("title");
const buttons = document.getElementById("buttons");

/* hide unwanted elements */

title.style.display = "none";
buttons.style.display = "none";

/* capture screen */

const canvas = await html2canvas(document.body);

const link = document.createElement("a");

link.download = "quote.png";
link.href = canvas.toDataURL();

link.click();

/* restore elements */

title.style.display = "block";
buttons.style.display = "flex";

});


/* KEYBOARD SHORTCUTS (nice usability feature) */

document.addEventListener("keydown",(e)=>{

if(e.key === "Enter" && e.target.tagName !== "BUTTON"){
  e.preventDefault();
  getQuote();
}

if(e.key.toLowerCase() === "c"){
navigator.clipboard.writeText(currentQuote);
}

});