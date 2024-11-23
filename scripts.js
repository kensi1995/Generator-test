// Preload images function
function preloadImages() {
  surveyData.forEach((data) => {
    if (data.options) {
      data.options.forEach((option) => {
        if (option.imgSrc) {
          const img = new Image();
          img.src = option.imgSrc;
        }
      });
    }
  });
}

// Initialize the survey questions and options
const surveyData = [
  {
    question: "What renovation measures are you planning in the near future?",
    options: [
      { title: "Roof insulation", imgSrc: "Icons/roof.png" },
      { title: "Window replacement", imgSrc: "Icons/replacement.png" },
      { title: "Façade insulation", imgSrc: "Icons/construction.png" },
    ],
  },
  {
    question: "How many residential units does the building have?",
    options: [
      { title: "1-2 units", imgSrc: "Icons/apartments.png" },
      { title: "3-5 units", imgSrc: "Icons/apartments.png" },
      { title: "5-10 units", imgSrc: "Icons/apartments.png" },
      { title: "10-20 units", imgSrc: "Icons/apartments.png" },
      { title: "More than 20 units", imgSrc: "Icons/apartments.png" },
    ],
  },
  {
    question: "Is the building detached or attached?",
    options: [
      { title: "Detached", imgSrc: "Icons/building.png" },
      { title: "Attached", imgSrc: "Icons/building-att.png" },
    ],
  },
  {
    question: "Do you live in it yourself?",
    options: [
      { title: "Yes", imgSrc: "Icons/check.png" },
      { title: "No", imgSrc: "Icons/cancel.png" },
    ],
  },
  {
    question: "Year of construction of the house?",
    options: [
      { title: "Before 1920", imgSrc: "Icons/calendar.png" },
      { title: "1920-1950", imgSrc: "Icons/calendar.png" },
      { title: "1950-1970", imgSrc: "Icons/calendar.png" },
      { title: "1970-1990", imgSrc: "Icons/calendar.png" },
      { title: "After 1990", imgSrc: "Icons/calendar.png" },
    ],
  },
  {
    question: "What heating system is installed?",
    options: [
      { title: "Oil", imgSrc: "Icons/oil-barrel.png" },
      { title: "Gas", imgSrc: "Icons/gas.png" },
      { title: "Wood", imgSrc: "Icons/wood.png" },
    ],
  },
  {
    question: "Have any renovation measures already been carried out?",
    options: [
      { title: "Roof insulation", imgSrc: "Icons/roof.png" },
      { title: "Window replacement", imgSrc: "Icons/replacement.png " },
      { title: "Façade insulation", imgSrc: "Icons/construction.png" },
    ],
  },
  {
    question: "How expensive will these measures be approximately?",
    options: [
      { title: "Under €20,000", imgSrc: "Icons/money-bag.png" },
      { title: "€20,000-€40,000", imgSrc: "Icons/money-bag.png" },
      { title: "€40,000-€60,000", imgSrc: "Icons/money-bag.png" },
      { title: "€60,000-€100,000", imgSrc: "Icons/money-bag.png" },
      { title: "Over €100,000", imgSrc: "Icons/money-bag.png" },
    ],
  },
  {
    question: "Postal code (ZIP)?",
    inputField: true,
    placeholder: "Enter your ZIP code",
    type: "text",
  },
  {
    question: "Enter your address",
    inputField: true,
    placeholder: "Enter your address",
    type: "text",
  },
];

// Store the answers
let answers = {};
let currentQuestionIndex = 0;

// Function to load a question dynamically
function loadQuestion() {
  const questionContainer = document.getElementById("question-container");
  const questionData = surveyData[currentQuestionIndex];

  // Clear the container
  questionContainer.innerHTML = "";

  // Create and style the <h2> element for the question
  const questionTitle = document.createElement("h2");
  questionTitle.textContent = questionData.question;
  questionTitle.style.color = "#5c068c"; // Set the color to #5c068c
  questionTitle.style.textAlign = "center";

  // Append the question title to the container
  questionContainer.appendChild(questionTitle);

  if (questionData.inputField) {
    // For ZIP, Address, and Email questions with input fields
    questionContainer.innerHTML += `  
      <input type="${questionData.type}" id="user-input" placeholder="${questionData.placeholder}">
      <button onclick="handleInputSubmit()">Submit</button>
    `;
  } else {
    // Load options as cards for questions without input fields
    questionData.options.forEach((option) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        ${
          option.imgSrc
            ? `<img src="${option.imgSrc}" alt="${option.title}">`
            : ""
        }
        <div class="card-title">${option.title}</div>
      `;
      card.addEventListener("click", () => handleOptionClick(option.title));
      questionContainer.appendChild(card);
    });
  }

  // Add Back button below the options and question
  if (currentQuestionIndex > 0) {
    const backButton = document.createElement("button");

    // Set the inner HTML to include SVG and text
    backButton.innerHTML = `   
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style="margin-right: 8px;">
      <path d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
    </svg>
    Back
  `;

    // Apply initial styles to the button
    Object.assign(backButton.style, {
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      fontSize: "17px",
      color: "#333",
      textAlign: "center",
      marginTop: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      transition: "opacity 0.3s ease", // Smooth transition for hover effect
    });

    // Add hover effect for opacity
    backButton.addEventListener("mouseover", () => {
      backButton.style.opacity = "0.6";
    });

    backButton.addEventListener("mouseout", () => {
      backButton.style.opacity = "1";
    });

    // Add click event to navigate back
    backButton.addEventListener("click", () => {
      currentQuestionIndex--;
      loadQuestion();
    });

    // Add the Back button below everything (question and options)
    questionContainer.appendChild(backButton);
  }
}

// Handle option selection and move to the next question
function handleOptionClick(selectedOption) {
  // Save the answer
  answers[`question_${currentQuestionIndex}`] = selectedOption;

  // Save answers to localStorage (or send to server in a real app)
  localStorage.setItem("surveyAnswers", JSON.stringify(answers));

  // Move to the next question or finish the survey
  currentQuestionIndex++;
  if (currentQuestionIndex < surveyData.length) {
    loadQuestion();
  } else {
    alert("Survey completed!");
  }
}

// Handle input submission (for ZIP, Address, Email)
function handleInputSubmit() {
  const userInput = document.getElementById("user-input").value;
  answers[`question_${currentQuestionIndex}`] = userInput;

  // Save answers to localStorage
  localStorage.setItem("surveyAnswers", JSON.stringify(answers));

  // Move to the next question or finish the survey
  currentQuestionIndex++;
  if (currentQuestionIndex < surveyData.length) {
    loadQuestion();
  } else {
    alert("Survey completed!");
  }
}

// Preload images before starting the survey
preloadImages();

// Start the survey
loadQuestion();
