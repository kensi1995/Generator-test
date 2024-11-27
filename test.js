// emailService.js
import { formatAnswers } from "./helpers.js";
import { loadQuestion } from "./questionRenderer.js";
import { surveyData } from "./surveyData.js";

export async function handleSubmit(event, answers) {
  event.preventDefault();

  const fullName = document.getElementById("full-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!fullName || !email || !phone) {
    console.error("All fields are required");
    return;
  }

  const userInfo = { fullName, email, phone };
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
  const formattedAnswers = formatAnswers(answers);

  const templateParams = {
    fullName,
    email,
    phone,
    answers: formattedAnswers,
  };

  try {
    const response = await emailjs.send(
      "service_ui0u0kj",
      "template_6hexsfp",
      templateParams,
      "3NyKajjvLf1Aa8z2q"
    );
    console.log("SUCCESS!", response.status, response.text);

    // Clear the form
    event.target.reset();

    // Reset survey data and reload the first question
    resetSurvey();

    // Alert the user
    window.alert("The application has been sent!");
  } catch (error) {
    console.error("FAILED...", error);
  }
}

function resetSurvey() {
  const currentQuestionIndex = 0;
  const answers = {};

  // Clear local storage if necessary
  localStorage.removeItem("surveyAnswers");

  // Load the first question
  loadQuestion(currentQuestionIndex, answers, surveyData);
}
