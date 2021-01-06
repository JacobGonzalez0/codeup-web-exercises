
function get5Day(cords){

    let lat = Math.floor(cords[1])
    let long = Math.floor(cords[0])

    $.ajax("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat +"&lon=" + long + "&appid=" + WEATHERKEY).done( (data,status)=>{
        if(status == "success"){
            console.log(data);
            createCard(data)
        }
    })

}

function geoCode(search){
    var input = ""
    var args = String(search).split(" ")
    args.forEach( (arg,i) =>{
        if(i == search.length-1){
            input += arg;
        }else{
            input += arg;
            input += "%20"
        } 
    })
    
    $.ajax("https://api.mapbox.com/geocoding/v5/mapbox.places/" + input + ".json?access_token=" + MAPBOXAPI).done( (data,status)=>{
        console.log(data.features[0].center)
        get5Day(data.features[0].center)
        
    })
}

geoCode("san antonio")

function createCard(data){

    document.getElementById("fiveDay").innerHTML = ""

    data.list.forEach( (day, i)=>{

        if(i % 8 == 0){


            let card = document.createElement("div")
            card.setAttribute("class","flex-column card m-2 p-0")
            card.setAttribute("style","min-width:12em")

            let hr = [];
            hr.push(document.createElement("hr"))
            hr.push(document.createElement("hr"))
            hr.push(document.createElement("hr"))

            //starts header 
            let header = document.createElement("div")
            header.setAttribute("class","card-header")
            header.innerHTML = day.dt_txt; 

            //starts body
            let body = document.createElement("div");
            body.setAttribute("class","card-body text-center")
            
            let temp = document.createElement("div")
            temp.setAttribute("class","temp");
            temp.setAttribute("class","pb-4")
            temp.innerHTML = day.main.temp + " / " + day.main.feels_like

            let icon = document.createElement("img");
            icon.src = "http://openweathermap.org/img/w/" + day.weather[0].icon + ".png"

            let description = document.createElement("div")
            description.setAttribute("class","description pb-4")
            description.innerHTML = day.weather[0].description

            let humidity = document.createElement("div")
            humidity.setAttribute("class","humidity")
            humidity.innerHTML = day.main.humidity

            let wind = document.createElement("div")
            wind.setAttribute("class","wind")
            wind.innerHTML = day.wind.speed + " MPH" 

            let pressure = document.createElement("div")
            pressure.setAttribute("class","pressure")
            pressure.innerHTML =  day.main.pressure

            body.appendChild(temp)
            body.appendChild(icon)
            body.appendChild(hr[0])
            body.appendChild(description)
            body.appendChild(humidity)
            body.appendChild(hr[1])
            body.appendChild(wind)
            body.appendChild(hr[2])
            body.appendChild(pressure)

            //add to document
            card.appendChild(header);
            card.appendChild(body);

            document.getElementById("fiveDay").appendChild(card)
        }
        


    })

}

document.getElementById("searchBar").addEventListener('change', (e)=>{
    e.preventDefault()
    geoCode(e.target.value)
})


document.getElementById("searchButton").addEventListener('click', (e)=>{
    e.preventDefault()
    geoCode(e.target.value)
})

