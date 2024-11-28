function preloadImages() {
  surveyData.forEach((data) => {
    if (data.options) {
      data.options.forEach((option) => {
        if (option.imgSrc) {
          const img = new Image();
          img.src = option.imgSrc;
          img.onload = () => console.log(`${option.imgSrc} loaded`);
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
      {
        title: "Roof insulation",
        imgSrc: "Icons/roof.webp",
      },
      { title: "Window replacement", imgSrc: "Icons/replacement.webp" },
      { title: "Façade insulation", imgSrc: "Icons/construction.webp" },
      {
        title: "Heating replacement",
        imgSrc: "Icons/system.webp",
      },
      {
        title: "Floor or basement ceiling insulation",
        imgSrc: "Icons/basement.webp",
      },
      { title: "Heating optimization", imgSrc: "Icons/heater.webp" },
    ],
  },
  {
    question: "How many residential units does the building have?",
    options: [
      { title: "1-2 units", imgSrc: "Icons/1-2units.webp" },
      { title: "3-5 units", imgSrc: "Icons/3-5units.webp" },
      { title: "5-10 units", imgSrc: "Icons/5-10units.webp" },
      { title: "10-20 units", imgSrc: "Icons/10-20units.webp" },
      { title: "More than 20 units", imgSrc: "Icons/apartments.webp" },
    ],
  },
  {
    question: "Is the building detached or attached?",
    options: [
      { title: "Detached", imgSrc: "Icons/homeAlone.webp" },
      { title: "Attached", imgSrc: "Icons/housetwo.webp" },
    ],
  },

  {
    question: "Year of construction of the house?",
    options: [
      { title: "Before 1920", imgSrc: "Icons/calendar.webp" },
      { title: "1920-1950", imgSrc: "Icons/calendar.webp" },
      { title: "1950-1970", imgSrc: "Icons/calendar.webp" },
      { title: "1970-1990", imgSrc: "Icons/calendar.webp" },
      { title: "After 1990", imgSrc: "Icons/calendar.webp" },
    ],
  },
  {
    question: "What heating system is installed?",
    options: [
      { title: "Oil", imgSrc: "Icons/oil-barrel.webp" },
      { title: "Gas", imgSrc: "Icons/gas.webp" },
      { title: "Wood", imgSrc: "Icons/wood.webp" },
    ],
    type: "withInput",
  },
  {
    question: "Have any renovation measures already been carried out?",
    options: [
      {
        title: "Roof insulation",
        imgSrc: "Icons/roof.webp",
      },
      { title: "Window replacement", imgSrc: "Icons/replacement.webp" },
      { title: "Façade insulation", imgSrc: "Icons/construction.webp" },
      {
        title: "Heating replacement",
        imgSrc: "Icons/system.webp",
      },
      {
        title: "Floor or basement ceiling insulation",
        imgSrc: "Icons/basement.webp",
      },
      { title: "Heating optimization", imgSrc: "Icons/heater.webp" },
    ],
  },
  {
    question: "How expensive will these measures be approximately?",
    type: "slider",
    min: 0,
    max: 500000,
    step: 20000,
  },

  {
    question: "Enter your address",
    type: "map",
    inputField: true,
    placeholder: "Enter your address",
  },
];

let answers = {};
let currentQuestionIndex = 0;

function loadQuestion() {
  const questionContainer = document.getElementById("dynamic-container");
  const questionData = surveyData[currentQuestionIndex];
  if (!questionContainer || !questionData) {
    console.error("Element or question data not found");
    return;
  }
  questionContainer.innerHTML = "";
  questionContainer.classList.add("fade-in"); // Add the fade-in class

  const questionTitle = document.createElement("div");
  questionTitle.textContent = questionData.question;
  questionTitle.style.width = "100%";
  questionTitle.style.fontSize = "1.5em";
  questionTitle.style.color = "#5c068c";
  questionTitle.style.fontWeight = "600";
  questionTitle.style.textAlign = "center";
  questionContainer.appendChild(questionTitle);

  if (questionData.type === "map") {
    renderMapQuestion(questionContainer, questionData);
  } else if (questionData.inputField) {
    renderInputFieldQuestion(questionContainer, questionData);
  } else if (questionData.type === "slider") {
    renderSliderQuestion(questionContainer, questionData);
  } else {
    renderOptionsQuestion(questionContainer, questionData);
  }
}

function renderOptionsQuestion(container, data) {
  data.options.forEach((option) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
          ${
            option.imgSrc
              ? `<img class="lazyload" data-src="${option.imgSrc}" alt="${option.title}">`
              : ""
          }
          <div class="card-title">${option.title}</div>
      `;
    card.addEventListener("click", () => handleOptionClick(option.title));
    container.appendChild(card);
  });

  if (data.type === "withInput") {
    // Adding an input field and submit button
    const inputContainer = document.createElement("div");
    inputContainer.classList.add("input-container");

    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.id = "other-input";
    inputField.placeholder = "Other (please specify)";

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.onclick = handleOtherInputSubmit;

    inputContainer.appendChild(inputField);
    inputContainer.appendChild(submitButton);
    container.appendChild(inputContainer);
  }
}

function handleAddressSubmit() {
  const userInput = document.getElementById("input-address").value.trim();
  if (!userInput) {
    console.error("No user input found");
    return;
  }

  answers[`question_${currentQuestionIndex}`] = userInput;
  localStorage.setItem("surveyAnswers", JSON.stringify(answers));

  nextQuestion();
}
function handleOtherInputSubmit() {
  const userInput = document.getElementById("other-input").value.trim();
  if (!userInput) {
    console.error("No user input found");
    return;
  }
  answers[`question_${currentQuestionIndex}`] = userInput;
  localStorage.setItem("surveyAnswers", JSON.stringify(answers));
  nextQuestion();
}

function handleOptionClick(selectedOption) {
  answers[`question_${currentQuestionIndex}`] = selectedOption;
  localStorage.setItem("surveyAnswers", JSON.stringify(answers));

  nextQuestion();
}
function renderSliderQuestion(container, data) {
  const sliderContainer = document.createElement("div");
  sliderContainer.classList.add("slider-container");

  const slider = document.createElement("input");
  slider.type = "range";
  slider.min = data.min;
  slider.max = data.max;
  slider.step = data.step;
  slider.value = data.min;
  slider.id = "cost-slider";

  const sliderValue = document.createElement("span");
  sliderValue.id = "slider-value";
  sliderValue.textContent = `${data.min}€`;

  slider.oninput = function () {
    sliderValue.textContent = `${slider.value}€`;
  };

  sliderContainer.appendChild(slider);
  sliderContainer.appendChild(sliderValue);

  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.onclick = handleSliderSubmit;

  sliderContainer.appendChild(submitButton);
  container.appendChild(sliderContainer);
}

function handleSliderSubmit() {
  const sliderValue = document.getElementById("cost-slider").value;
  answers[`question_${currentQuestionIndex}`] = `${sliderValue}€`;
  localStorage.setItem("surveyAnswers", JSON.stringify(answers));

  nextQuestion();
}

function renderMapQuestion(container, data) {
  // Create the single parent div
  const singleContainer = document.createElement("div");

  // Create the input, button, and map elements
  const addressInput = document.createElement("input");
  const submitButton = document.createElement("button");
  const mapDiv = document.createElement("div");

  // Set attributes and content for the elements
  addressInput.id = "input-address";
  addressInput.placeholder = data.placeholder;
  submitButton.textContent = "Submit";
  submitButton.className = "addressMapBtn";
  mapDiv.id = "map";

  // Attach functionality to the button
  submitButton.onclick = handleAddressSubmit;

  // Append the input, button, and map to the single parent div
  singleContainer.appendChild(addressInput);
  singleContainer.appendChild(submitButton);
  singleContainer.appendChild(mapDiv);

  // Style the parent container
  singleContainer.style.width = "900px";
  singleContainer.style.display = "flex";
  singleContainer.style.flexDirection = "column";
  singleContainer.style.gap = "30px";
  singleContainer.style.alignItems = "center";
  singleContainer.style.marginTop = "20px";

  // Style individual elements
  styleAddressInput(addressInput);
  styleSubmitButton(submitButton);
  styleMapDiv(mapDiv);

  // Append the parent div to the provided container
  container.appendChild(singleContainer);

  // Initialize the map
  initMap();
}

function styleAddressInput(input) {
  input.style.padding = "16px";
  input.style.width = "80%";
  input.style.border = "1px solid #2ed8c3";
  input.style.borderRadius = "5px";
  input.style.fontSize = "18px";
}

function styleSubmitButton(button) {
  button.style.padding = "10px 20px";
  button.style.backgroundColor = "#6dffee";
  button.style.color = "#000000";
  button.style.border = "none";
  button.style.borderRadius = "5px";
  button.style.cursor = "pointer";
  button.style.fontSize = "16px";

  // Add hover effect using event listeners
  button.addEventListener("mouseenter", () => {
    button.style.backgroundColor = "#2ed8c3"; // Change background color on hover
  });

  button.addEventListener("mouseleave", () => {
    button.style.backgroundColor = "#6dffee"; // Revert to original background color
    button.style.color = "#000000"; // Revert to original text color
  });
}

function styleMapDiv(mapDiv) {
  mapDiv.style.height = "400px";
  mapDiv.style.width = "80%";
  mapDiv.style.border = "1px solid #ddd";
  mapDiv.style.borderRadius = "5px";
}

function renderInputFieldQuestion(container, data) {
  container.innerHTML += `
        <input type="${data.type}" id="user-input" placeholder="${data.placeholder}">
        <button onclick="handleInputSubmit()">Submit</button>
      `;
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < surveyData.length) {
    // Add fade-in effect
    const questionContainer = document.getElementById("dynamic-container");
    questionContainer.classList.remove("fade-in"); // Remove the class if it was added before
    void questionContainer.offsetWidth; // Trigger reflow
    questionContainer.classList.add("fade-in");
    loadQuestion();
  } else {
    showForm();
  }
}

function showForm() {
  const questionContainer = document.getElementById("dynamic-container");
  questionContainer.innerHTML = `
  <div  class="formDivStyle">
        <h2 class="form-title">Enter your information</h2>
        <form id="user-form"class="formEditStyle" >
          <input type="text" id="full-name" placeholder="Full Name" required><br>
          <input type="email" id="email" placeholder="Email" required><br>
          <input type="tel" id="phone" placeholder="Phone Number" required><br>
          <button class="formBtn" type="submit">Submit</button>
        </form>
        </div>
      `;

  const form = document.getElementById("user-form");
  form.addEventListener("submit", handleSubmit);
}
//Format question in email
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
      "service_ui0u0kj",
      "template_6hexsfp",
      templateParams,
      "3NyKajjvLf1Aa8z2q"
    );
    console.log("SUCCESS!", response.status, response.text);
    window.alert("The application has been sent!"); // Add your redirect URL here
    event.target.reset();

    // Reset survey data and reload the first question
    resetSurvey();
    // Redirect to another website
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

function initMap() {
  console.log("Initializing map...");
  var mapOptions = {
    mapTypeId: "satellite",
    zoom: 14,
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var pos = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        map.setCenter(pos);
        marker = new google.maps.Marker({
          position: pos,
          map: map,
          draggable: true,
        });
      },
      function () {
        handleNoGeolocation(true);
      }
    );
  } else {
    handleNoGeolocation(false);
  }

  function handleNoGeolocation(errorFlag) {
    var content = errorFlag
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation.";
    var options = {
      map: map,
      position: new google.maps.LatLng(60, 105),
      content: content,
    };
    map.setCenter(options.position);
    marker = new google.maps.Marker({
      position: options.position,
      map: map,
      draggable: true,
    });
  }

  var input = document.getElementById("input-address");
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo("bounds", map);

  var infowindow = new google.maps.InfoWindow();
  marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29),
    draggable: true,
  });

  google.maps.event.addListener(autocomplete, "place_changed", function () {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      console.error("Autocomplete's place contains no geometry");
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
    marker.setIcon({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35),
    });
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = "";
    if (place.address_components) {
      address = [
        (place.address_components[0] &&
          place.address_components[0].short_name) ||
          "",
        (place.address_components[1] &&
          place.address_components[1].short_name) ||
          "",
        (place.address_components[2] &&
          place.address_components[2].short_name) ||
          "",
      ].join(" ");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  loadQuestion();
  preloadImages();
});
