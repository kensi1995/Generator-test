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
      { title: "Roof insulation", imgSrc: "Icons/roof.png" },
      { title: "Window replacement", imgSrc: "Icons/replacement.png" },
      { title: "Façade insulation", imgSrc: "Icons/construction.png" },
    ],
  },
  {
    question: "How many residential units does the building have?",
    options: [
      { title: "1-2 units", imgSrc: "Icons/1-2units.png" },
      { title: "3-5 units", imgSrc: "Icons/4-5units.png" },
      { title: "5-10 units", imgSrc: "Icons/5-10units.png" },
      { title: "10-20 units", imgSrc: "Icons/10-20units.png" },
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
      { title: "Window replacement", imgSrc: "Icons/replacement.png" },
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
    type: "map",
    inputField: true,
    placeholder: "Enter your address",
  },
];

let answers = {};
let currentQuestionIndex = 0;

function loadQuestion() {
  const questionContainer = document.getElementById("question-container");
  const questionData = surveyData[currentQuestionIndex];

  if (!questionContainer || !questionData) {
    console.error("Element or question data not found");
    return;
  }

  questionContainer.innerHTML = "";

  const questionTitle = document.createElement("h2");
  questionTitle.textContent = questionData.question;
  questionTitle.style.color = "#5c068c";
  questionTitle.style.textAlign = "center";
  questionContainer.appendChild(questionTitle);

  if (questionData.type === "map") {
    renderMapQuestion(questionContainer, questionData);
  } else if (questionData.inputField) {
    renderInputFieldQuestion(questionContainer, questionData);
  } else {
    renderOptionsQuestion(questionContainer, questionData);
  }
}

function renderMapQuestion(container, data) {
  const mapDiv = document.createElement("div");
  const addressInput = document.createElement("input");
  const submitButton = document.createElement("button");

  mapDiv.id = "map";
  addressInput.id = "input-address";
  addressInput.placeholder = data.placeholder;
  submitButton.textContent = "Submit";
  submitButton.onclick = handleAddressSubmit;

  styleAddressInput(addressInput);
  styleMapDiv(mapDiv);

  container.appendChild(addressInput);
  container.appendChild(submitButton);
  container.appendChild(mapDiv);

  initMap();
}

function styleAddressInput(input) {
  input.style.padding = "13px";
  input.style.width = "80%";
  input.style.marginTop = "10px";
  input.style.border = "1px solid #2ed8c3";
  input.style.borderRadius = "5px";
  input.style.marginBottom = "10%";
  input.style.fontSize = "18px";
}

function styleMapDiv(mapDiv) {
  mapDiv.style.height = "400px";
}

function renderInputFieldQuestion(container, data) {
  container.innerHTML += `
    <input type="${data.type}" id="user-input" placeholder="${data.placeholder}">
    <button onclick="handleInputSubmit()">Submit</button>
  `;
}

function renderOptionsQuestion(container, data) {
  data.options.forEach((option) => {
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
    container.appendChild(card);
  });
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

function handleInputSubmit() {
  const userInput = document.getElementById("user-input").value.trim();
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

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < surveyData.length) {
    loadQuestion();
  } else {
    showForm();
  }
}

function showForm() {
  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = `
    <h2 class="form-title" >Enter your information</h2>
    <form id="user-form">
      <input type="text" id="full-name" placeholder="Full Name" required><br>
      <input type="email" id="email" placeholder="Email" required><br>
      <input type="tel" id="phone" placeholder="Phone Number" required><br>
      <button type="submit">Submit</button>
    </form>
  `;

  const form = document.getElementById("user-form");
  form.addEventListener("submit", handleSubmit);
}

function handleSubmit(event) {
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

  // Redirect to another website
  window.location.href =
    "https://calendly.com/envisionenergie/kostenloses-strategiegesprach";
}

function initMap() {
  console.log("Initializing map...");
  var mapOptions = {
    zoom: 12,
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
});
