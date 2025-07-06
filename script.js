const option =  {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '643015b29amsh786d8c0f5629d01p1c5395jsn44eb4e279362',
    'x-rapidapi-host': 'weather-by-api-ninjas.p.rapidapi.com'
  }
};

const getWheather = (lat,lon,id) =>{

fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?lat='+lat+'&lon='+lon, option)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    document.getElementById(`${id}_cloud_pct`).innerHTML = data.cloud_pct +"%"
    document.getElementById(`${id}_temp`).innerHTML = data.temp +"°C" 
    document.getElementById(`${id}_feels_like`).innerHTML = data.feels_like + "°C"
    document.getElementById(`${id}_humidity`).innerHTML = data.humidity  + "%"
    document.getElementById(`${id}_min_temp`).innerHTML = data.min_temp + "°C"
    document.getElementById(`${id}_max_temp`).innerHTML = data.max_temp + "°C"
    document.getElementById(`${id}_wind_speed`).innerHTML = Math.floor(data.wind_speed * 3.6) + " km/hr"
    document.getElementById(`${id}_sunrise`).innerHTML = new Date(data.sunrise * 1000).toLocaleTimeString();
    document.getElementById(`${id}_sunset`).innerHTML = new Date(data.sunset * 1000).toLocaleTimeString();
  })
  .catch(err => console.error(err));
}

const getCoordinates = (city , flag)=>{

  fetch('https://api.opencagedata.com/geocode/v1/json?q='+city+'&key=5227cafc945843e5a064aee5dcfefd6d')
  .then(res => res.json())
  .then(data => {
    const lat = data.results[0].geometry.lat;
    const lon = data.results[0].geometry.lng;
    console.log(lat, lon);
    if(flag==0){
      getWheather(lat,lon,city)
    }
    else{
      getWheather(lat,lon,"search")
    }
    
    
  });
}

submit.addEventListener('click' , (e)=>{
  cityName.innerHTML = city.value.charAt(0).toUpperCase() + city.value.slice(1).toLowerCase();
  e.preventDefault()
  getCoordinates(city.value ,1)
})

const cities = [{id:"Shanghai"}, {id:"Boston"} ,{id:"Lucknow"} , {id:"Kolkata"}];
cities.forEach(element => {
  getCoordinates(element.id,0)
}); 