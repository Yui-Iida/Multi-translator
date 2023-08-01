const API_KEY = "3ebf9f00-145a-b3af-c677-2095065faa45:fx";
const textarea = document.querySelector("#translationTextarea");
const translateButton = document.querySelector(".translateButton");
const lang1 = document.querySelector("#translation1");
const lang2 = document.querySelector("#translation2");
const originalContainer = document.querySelector(".originalContainer");
const errorMessage = document.querySelector(".errorMessage");
const switchMode = document.querySelector(".switchMode");
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
    )}&target_lang=JA`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data && data.translations) {
        lang1.innerText = data.translations[0].text;
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
        lang2.innerText = data.translations[0].text;

        // Fix the height depend on the height of translatedContainer
        const minHeight = window.innerHeight;
        const translatedContainer = document.querySelector(
          ".translatedContainer"
        );
        const translatedContainerHeight = translatedContainer.offsetHeight;
        if (translatedContainerHeight > minHeight) {
          originalContainer.style.height = "auto";
        } else {
          originalContainer.style.height = "100vh";
        }
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
