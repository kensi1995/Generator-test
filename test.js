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
    const value = parseInt(slider.value);
    sliderValue.textContent = `${value.toLocaleString()}€`;

    // Calculate the background color based on the slider value
    const percentage = (value - slider.min) / (slider.max - slider.min);
    const color = `rgb(${Math.round(255 - 255 * percentage)}, ${Math.round(
      255 * percentage
    )}, ${Math.round(200 + 55 * (1 - percentage))})`;

    sliderContainer.style.backgroundColor = color;
  };

  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.onclick = handleSliderSubmit;

  const sliderMarkers = document.createElement("div");
  sliderMarkers.className = "slider-markers";
  sliderMarkers.innerHTML = `<span>0€</span><span>500,000€</span>`;

  sliderContainer.appendChild(slider);
  sliderContainer.appendChild(sliderValue);
  sliderContainer.appendChild(submitButton);
  sliderContainer.appendChild(sliderMarkers);
  container.appendChild(sliderContainer);
}
