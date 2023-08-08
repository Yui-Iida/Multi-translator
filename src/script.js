import { API_KEY } from "./config.js";

const originalLang = document.querySelector(".originalLang");
const textarea = document.querySelector("#translationTextarea");
const translateButton = document.querySelector(".translateButton");
const errorMessage = document.querySelector(".errorMessage");
const switchMode = document.querySelector(".switchMode");
const translatedBoxes = document.querySelector("#translatedBoxes");

let darkMode = false;

translateButton.addEventListener("click", () => {
  const inputText = textarea.value.trim();

  if (inputText === "") {
    errorMessage.textContent = "Please input original text.";
    errorMessage.style.color = "yellow";
    errorMessage.style.marginBottom = "10px";
    errorMessage.classList.add("font-poppins");
    return;
  }

  fetch(
    `https://api-free.deepl.com/v2/translate?auth_key=${API_KEY}&text=${encodeURIComponent(
      inputText
    )}&target_lang=EN`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data && data.translations) {
        let detectedLang = data.translations[0].detected_source_language;
        fillTranslatedTexts(detectedLang, inputText);
      } else {
        alert("Translation Failed.");
      }
    })
    .catch((error) => {
      console.error("Translation Failed.", error);
    });
});

function fillTranslatedTexts(detectedLang, inputText) {
  const languages = [
    { name: "JAPANESE", code: "JA" },
    { name: "ENGLISH", code: "EN" },
    { name: "GERMAN", code: "DE" },
    { name: "PORTUGUESE", code: "PT" },
    { name: "FRENCH", code: "FR" },
  ];

  languages.forEach((language) => {
    if (detectedLang !== language.code) {
      const div = document.createElement("div");
      const h1 = document.createElement("h1");
      const p = document.createElement("p");

      div.className =
        "output2 h-auto bg-black p-10 pb-6 rounded-md dark:bg-gray-900";
      h1.className =
        "lang2 text-3xl text-green-600 font-semibold font-poppins mb-4 text-center dark:text-fuchsia-400";
      p.className =
        "text-black font-poppins mb-8 text-white dark:text-slate-300";

      div.appendChild(h1);
      div.appendChild(p);

      fetch(
        `https://api-free.deepl.com/v2/translate?auth_key=${API_KEY}&text=${encodeURIComponent(
          inputText
        )}&target_lang=${language.code}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.translations) {
            p.innerText = data.translations[0].text;
            h1.innerText = language.name;

            translatedBoxes.appendChild(div);
          }
        })
        .catch((e) => {
          console.error("error: ", e);
        });
    } else {
      originalLang.innerText = language.name;
    }
  });
}

////////////////////////////////
// Adjust Input Height

function adjustTextareaHeight() {
  errorMessage.textContent = "";
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
}

textarea.addEventListener("input", adjustTextareaHeight);

////////////////////////////////
// Switch dark/light mode

switchMode.addEventListener("click", () => {
  if (!darkMode) {
    document.documentElement.classList.add("dark");
    switchMode.textContent = "☀️";
    darkMode = true;
  } else {
    document.documentElement.classList.remove("dark");
    switchMode.textContent = "☽";
    darkMode = false;
  }
});
