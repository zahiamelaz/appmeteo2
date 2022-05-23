const weatherIcons = {
    'rain':"wi wi-day-rain",
    'Clouds':"wi wi-day-cloudy",
    'Clear':"wi wi-day-sunny",
    'Snow':"wi wi-day-snow",
    'mist':"wi wi-day-fog",
    'Drizzle':"wi wi-day-sleet",
}
       
function capitalize(str){
    return str[0].toUpperCase()+str.slice(1)
    }
         

async function main(withIP = true){
    let ville;
    if(withIP){
    const ip = await fetch(`https://api.ipify.org?format=json`)
        .then(resultat => resultat.json())
        .then(json =>json.ip)    
        
           
    ville = await fetch(`http://ip-api.com/json/${ip}`)
        .then(resultat => resultat.json())
        .then(json => json.city)
        
    }else{
        ville = document.querySelector('#ville').textContent;
    } 

    const meteo =await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=9407b47957a91267f609293d68a405fd&units=metric&lang=fr`)
        .then(resultat => resultat.json())
        .then(data => data
        );
        
        displayWeatherInfos(meteo); 
}
function displayWeatherInfos(data){
    const name = data.name;
    const temperature = data.main.temp;
    console.log(temperature)
    const conditions = data.weather[0].main;
    const description = data.weather[0].description;

    document.querySelector("#ville").innerHTML=name;
    document.querySelector("#temperature").innerHTML= Math.round(temperature);
    document.querySelector("#conditions").innerHTML= capitalize(description);
    document.querySelector('i.wi').className = weatherIcons[conditions];
    document.body.className = conditions.toLowerCase();
}
const ville = document.querySelector('#ville');
ville.addEventListener('click', () =>{
    ville.contentEditable = true;
});

ville.addEventListener('keydown',(e) =>{
    if(e.keyCode === 13){
        e.preventDefault();
        ville.contentEditable =false;
        main(false);
    }
});
main();

        