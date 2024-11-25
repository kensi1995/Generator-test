const API_KEY = "AIzaSyD4y6v2wl_dYJyLX5CG7bNw6AZOHtkKIEk";

document.addEventListener("DOMContentLoaded", () => {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
});
