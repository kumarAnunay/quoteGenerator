// Api:- https://type.fit/api/quotes

const quoteContainer = document.getElementById("quote-container");
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const twitterBtn = document.getElementById("twitter");
const audioBtn = document.getElementById("audio");
const copyBtn = document.getElementById("copy");
const loader = document.querySelector("span.loader");

function loading() {
    loader.classList.remove("hide");
    quoteContainer.classList.add("hide");
}

function loaded() {
    loader.classList.add("hide");
    quoteContainer.classList.remove("hide");
}

let dataStorage = [];

async function dataFetch() {
    loading();
    const url = "https://type.fit/api/quotes";
    try {
        const response = await fetch(url);
        dataStorage = await response.json();
        console.log(dataStorage);
        quoteGenerator();
        loaded();
    } catch (error) {
        console.log(error);
    }
}

newQuoteBtn.addEventListener("click", quoteGenerator);
twitterBtn.addEventListener("click", twitterPost);

function twitterPost() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;
    window.open(twitterUrl, "_blank");

}

audioBtn.addEventListener("click", () => {
    const audio = new SpeechSynthesisUtterance(`${quote.innerText} by ${author.innerText}`);
    speechSynthesis.speak(audio);
});

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(quote.innerText);
    alert("Copied to ClipBoard");
});

function quoteGenerator() {
    const newQuote = dataStorage[Math.floor(Math.random() * dataStorage.length)];

    const authorName = newQuote.author || "Unknown";
    author.textContent = `-${authorName}`;

    if (newQuote.text.length > 100) {
        quote.classList.add("long-quote");
    }
    else {
        quote.classList.remove("long-quote");
    }
    quote.textContent = newQuote.text;

}

dataFetch();