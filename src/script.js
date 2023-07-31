// const dotenv = require("dotenv");
// // .envファイルを現在の環境変数にロードする
// const env = dotenv.config();
// console.log(env.API_KEY);
const API_KEY = "3ebf9f00-145a-b3af-c677-2095065faa45:fx";
// console.log(apiKey);

const textarea = document.querySelector("#translationTextarea");
const translateButton = document.querySelector(".translateButton");
const lang1 = document.querySelector("#translation1");
const lang2 = document.querySelector("#translation2");
// const API_KEY = process.env.API_KEY;

translateButton.addEventListener("click", () => {
  const inputText = textarea.value.trim();
  const errorMessage = document.querySelector(".errorMessage");

  if (inputText === "") {
    errorMessage.textContent = "Please input original text.";
    errorMessage.style.color = "red";
    return;
  }

  fetch(
    `https://api-free.deepl.com/v2/translate?auth_key=${API_KEY}&text=${encodeURIComponent(
      inputText
    )}&target_lang=JA`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data && data.translations) {
        lang1.textContent = data.translations[0].text;
      } else {
        alert("Translation Failed.");
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });

  fetch(
    `https://api-free.deepl.com/v2/translate?auth_key=${API_KEY}&text=${encodeURIComponent(
      inputText
    )}&target_lang=DE`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data && data.translations) {
        lang2.textContent = data.translations[0].text;
      } else {
        alert("Translation Failed.");
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
});

////////////////////////////////
// Adjust Input Height

function adjustTextareaHeight() {
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
}

textarea.addEventListener("input", adjustTextareaHeight);
