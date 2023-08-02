import { API_KEY } from "./config.js";

const originalLang = document.querySelector(".originalLang");
const textarea = document.querySelector("#translationTextarea");
const translateButton = document.querySelector(".translateButton");
const translation1 = document.querySelector("#translation1");
const translation2 = document.querySelector("#translation2");
const lang1 = document.querySelector(".lang1");
const lang2 = document.querySelector(".lang2");
const originalContainer = document.querySelector(".originalContainer");
const errorMessage = document.querySelector(".errorMessage");
const switchMode = document.querySelector(".switchMode");
const translatedContainer = document.querySelector(".translatedContainer");
let darkMode = false;

translateButton.addEventListener("click", () => {
  const inputText = textarea.value.trim();
  const minHeight = window.innerHeight;
  const originalContainerHeight = originalContainer.offsetHeight;
  const translatedContainerHeight = translatedContainer.offsetHeight;
  const windowWidth = window.innerWidth;

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
        if (detectedLang === "EN") {
          originalLang.innerText = "ENGLISH";

          fetch(
            `https://api-free.deepl.com/v2/translate?auth_key=${API_KEY}&text=${encodeURIComponent(
              inputText
            )}&target_lang=JA`
          )
            .then((response) => response.json())
            .then((data) => {
              if (data && data.translations) {
                translation1.innerText = data.translations[0].text;
                lang1.innerText = "JAPANESE";
              }
            });

          fetch(
            `https://api-free.deepl.com/v2/translate?auth_key=${API_KEY}&text=${encodeURIComponent(
              inputText
            )}&target_lang=DE`
          )
            .then((response) => response.json())
            .then((data) => {
              if (data && data.translations) {
                translation2.innerText = data.translations[0].text;
                lang2.innerText = "GERMAN";
              }
            })
            .then(() => {
              translatedContainer.style.height = "auto";
              if (windowWidth >= 768) {
                if (translatedContainerHeight > originalContainerHeight) {
                  originalContainer.style.height = "auto";
                } else {
                  originalContainer.style.height = "100vh";
                }
              }
            });
        }

        if (detectedLang === "JA") {
          originalLang.innerText = "JAPANESE";

          fetch(
            `https://api-free.deepl.com/v2/translate?auth_key=${API_KEY}&text=${encodeURIComponent(
              inputText
            )}&target_lang=EN`
          )
            .then((response) => response.json())
            .then((data) => {
              if (data && data.translations) {
                translation1.innerText = data.translations[0].text;
                lang1.innerText = "ENGLISH";
              }
            });

          fetch(
            `https://api-free.deepl.com/v2/translate?auth_key=${API_KEY}&text=${encodeURIComponent(
              inputText
            )}&target_lang=DE`
          )
            .then((response) => response.json())
            .then((data) => {
              if (data && data.translations) {
                translation2.innerText = data.translations[0].text;
                lang2.innerText = "GERMAN";
              }
            })
            .then(() => {
              if (windowWidth >= 768) {
                if (translatedContainerHeight > minHeight) {
                  originalContainer.style.height = "auto";
                } else {
                  originalContainer.style.height = "100vh";
                }
              }
            });
        }

        if (detectedLang === "DE") {
          originalLang.innerText = "GERMAN";

          fetch(
            `https://api-free.deepl.com/v2/translate?auth_key=${API_KEY}&text=${encodeURIComponent(
              inputText
            )}&target_lang=JP`
          )
            .then((response) => response.json())
            .then((data) => {
              if (data && data.translations) {
                translation1.innerText = data.translations[0].text;
                lang1.innerText = "JAPANESE";
              }
            });

          fetch(
            `https://api-free.deepl.com/v2/translate?auth_key=${API_KEY}&text=${encodeURIComponent(
              inputText
            )}&target_lang=EN`
          )
            .then((response) => response.json())
            .then((data) => {
              if (data && data.translations) {
                translation2.innerText = data.translations[0].text;
                lang2.innerText = "ENGLISH";
              }
            })
            .then(() => {
              if (windowWidth >= 768) {
                if (translatedContainerHeight > minHeight) {
                  originalContainer.style.height = "auto";
                } else {
                  originalContainer.style.height = "100vh";
                }
              }
            });
        }
      } else {
        alert("Translation Failed.");
      }
    })
    .catch((error) => {
      alert("Translation Failed.");
    });
});

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
