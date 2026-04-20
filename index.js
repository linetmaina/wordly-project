const form = document.getElementById("search-form");
const input = document.getElementById("word-input");
const resultDiv = document.getElementById("result");
const errorDiv = document.getElementById("error-message");

// fetch word data
async function fetchWord(word) {
  try {
    // clear UI first
    errorDiv.textContent = "";
    errorDiv.classList.add("hidden");
    resultDiv.innerHTML = "";

    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

    if (!res.ok) {
      throw new Error("Word not found");
    }

    const data = await res.json();

    displayWord(data[0]);

  } catch (error) {
    showError(error.message);
  }
}

// display data
function displayWord(data) {
  resultDiv.innerHTML = "";

  const word = document.createElement("h2");
  word.textContent = data.word;

  const phonetic = document.createElement("p");
  phonetic.textContent = data.phonetic || "No pronunciation";

  const meaning = data.meanings[0];

  const partOfSpeech = document.createElement("p");
  partOfSpeech.textContent = `Part of Speech: ${meaning.partOfSpeech}`;

  const definition = document.createElement("p");
  definition.textContent = `Definition: ${meaning.definitions[0].definition}`;

  const example = document.createElement("p");
  example.textContent =
    `Example: ${meaning.definitions[0].example || "No example available"}`;

  const synonyms = document.createElement("p");
  synonyms.textContent =
    `Synonyms: ${meaning.synonyms?.join(", ") || "None"}`;

  resultDiv.append(
    word,
    phonetic,
    partOfSpeech,
    definition,
    example,
    synonyms
  );
}

// show error
function showError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");
}

// event listener (SPA behavior)
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const word = input.value.trim();

  if (!word) {
    showError("Please enter a word");
    return;
  }

  fetchWord(word);

  input.value = "";
});