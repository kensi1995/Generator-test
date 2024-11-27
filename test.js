function formatAnswers(answers) {
  const questionsMap = {
    question_0: "What renovation measures are you planning in the near future?",
    question_1: "How many residential units does the building have?",
    question_2: "Is the building detached or attached?",
    question_3: "Year of construction of the house?",
    question_4: "What heating system is installed?",
    question_5: "Have any renovation measures already been carried out?",
    question_6: "How expensive will these measures be approximately?",
    question_7: "Enter your address",
  };

  let formattedAnswers = "";
  for (const [key, value] of Object.entries(answers)) {
    formattedAnswers += `
          <div style="margin-bottom: 15px;">
              <p><strong>Question:</strong> ${questionsMap[key]}</p>
              <p><strong>Answer:</strong> ${value}</p>
          </div>`;
  }
  return formattedAnswers;
}

async function handleSubmit(event) {
  event.preventDefault();

  const fullName = document.getElementById("full-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!fullName || !email || !phone) {
    console.error("All fields are required");
    return;
  }

  // Save user information
  const userInfo = { fullName, email, phone };
  localStorage.setItem("userInfo", JSON.stringify(userInfo));

  // Prepare formatted answers
  const formattedAnswers = formatAnswers(answers);

  // Prepare data to send via EmailJS
  const templateParams = {
    fullName,
    email,
    phone,
    answers: formattedAnswers, // Use formatted answers
  };

  try {
    const response = await emailjs.send(
      "YOUR_SERVICE_ID",
      "YOUR_TEMPLATE_ID",
      templateParams
    );
    console.log("SUCCESS!", response.status, response.text);
    // Redirect to another website
    window.location.href = ""; // Add your redirect URL here
  } catch (error) {
    console.error("FAILED...", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadQuestion();
  preloadImages();

  // Attach handleSubmit to the form
  const form = document.getElementById("user-form");
  if (form) {
    form.addEventListener("submit", handleSubmit);
  }
});
