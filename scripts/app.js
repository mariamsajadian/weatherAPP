const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const setMap = document.querySelector('.map-container');

const updateDat = (data) => {

    console.log(data);
    const { cityDetails, weather } = data;

    // update details tempalte 
    details.innerHTML = `<h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>`;

    setMap.innerHTML = `<div id="map-container-google-1" class="z-depth-1-half map-container" style="height: 250px">
    <iframe src="https://maps.google.com/maps?q=${cityDetails.EnglishName}&t=&z=13&ie=UTF8&iwloc=&output=embed  " frameborder="0"
      style="border:0" allowfullscreen></iframe>
  </div>`;
    console.log(setMap.innerHTML);

    //update the night/day and icon img
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);
    
    // remove the d-none class if present
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none')
 
    }
    if (setMap.classList.contains('d-none')) {
        setMap.classList.remove('d-none');
    }
};

const updateCity = async (city) => {
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);
    return { cityDetails, weather };
};

// prevent default action
cityForm.addEventListener('submit', e => {
    e.preventDefault();
    // get city value from form
    const city = cityForm.city.value.trim();// localstorage.setItem
    cityForm.reset();

    //update the ui with new city
    updateCity(city)
        .then(data => updateDat(data))
        .catch(err => console.log(err));
        // set local storage
        localStorage.setItem('cityItem', city );
});

if (localStorage.getItem('cityItem')){

    updateCity(localStorage.getItem('cityItem'))// it is promise then. is required
    .then(data => updateDat(data))
    .catch(err => alert("Enter a city name in input"));
}


