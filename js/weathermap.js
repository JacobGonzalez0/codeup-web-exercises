String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

function get5Day(cords){

    let long = Math.floor(cords[0])
    let lat = Math.floor(cords[1])

    $.ajax("https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + lat +"&lon=" + long + "&appid=" + WEATHERKEY).done( (data,status)=>{
        if(status == "success"){
            createCard(data)
        }
    })

}

function changeBackground(city){

    var input = ""
    var args = String(city).split(" ")
    args.forEach( (arg,i) =>{
        if(i == args.length-1){
            input += arg;
        }else{
            input += arg;
            input += "-"
        } 
    })
    
    
    $.ajax("https://api.teleport.org/api/urban_areas/slug:" + input.toLowerCase() + "/images/").done( (data,status)=>{
        
        document.body.style.background = 'url("' + data.photos[0].image.web + '")'
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundAttachment = "fixed"
    
    })
    
}

function geoCode(search){

    if(typeof search == "object"){// if we give it an array

        $.ajax("https://api.mapbox.com/geocoding/v5/mapbox.places/" + search[0] + "," + search[1] + ".json?access_token=" + MAPBOXAPI).done( (data,status)=>{
        
            document.getElementById("title").innerHTML = data.features[0].text + " - 5 Day Forcast"
            currentLocation = data.features[0].center // sets up easy var to access
            marker.setLngLat(data.features[0].center) //moves marker
            map.flyTo({
                center: data.features[0].center
            }); // fly animation
            get5Day(data.features[0].center) //get forcast
        
        })
        
    }else{ //otherwise its a search term
        var input = ""
        var args = String(search).split(" ")
        args.forEach( (arg,i) =>{
            if(i == args.length-1){
                input += arg;
            }else{
                input += arg;
                input += "%20"
            } 
        })
        
        $.ajax("https://api.mapbox.com/geocoding/v5/mapbox.places/" + input + ".json?access_token=" + MAPBOXAPI).done( (data,status)=>{
        
            changeBackground(data.features[0].text)
            
            document.getElementById("title").innerHTML = data.features[0].text + " - 5 Day Forcast"
            currentLocation = data.features[0].center // sets up easy var to access
            marker.setLngLat(data.features[0].center) //moves marker
            map.flyTo({
                center: data.features[0].center
            }); // fly animation
            get5Day(data.features[0].center) //get forcast
        
        })
    }

    
}

function createCard(data){

    document.getElementById("fiveDay").innerHTML = ""

    //knowing the data we get from the JSON
    //we parse it using a forEach for the array we get
    data.list.forEach( (day, i)=>{

        if(i % 8 == 0){ //lets us see every day, 40/5 gets us 8

            //the overall card container
            let card = document.createElement("div")
            card.setAttribute("class","text-white flex-column card m-2 p-0")
            card.setAttribute("style","min-width:12em; background: rgba(0,0,0,.65)")

            //Putting the hr's in an array to keep better track of them
            let hr = [];
            hr.push(document.createElement("hr"))
            hr.push(document.createElement("hr"))
            hr.push(document.createElement("hr"))

            //starts header 
            let header = document.createElement("div")
            header.setAttribute("class","card-header text-center  font-weight-bold");
            header.setAttribute("style","background-image: linear-gradient( 180deg, rgba(25,120,190,1) 0%, rgba(37,60,119,1) 90% );")
            let date = new Date()
            date.setTime(day.dt * 1000)
            header.innerHTML = date.toLocaleDateString()

            //starts body
            let body = document.createElement("div");
            body.setAttribute("class","card-body text-center")
            
            let temp = document.createElement("div")
            temp.setAttribute("class","temp");
            temp.setAttribute("class","pb-4")
            temp.innerHTML = day.main.temp + "&degF / " + day.main.feels_like + "&degF"

            let icon = document.createElement("img");
            icon.src = "http://openweathermap.org/img/w/" + day.weather[0].icon + ".png"

            let description = document.createElement("div")
            description.setAttribute("class","description pb-4")
            description.innerHTML = day.weather[0].description.toProperCase()

            let humidity = document.createElement("div")
            humidity.setAttribute("class","humidity")
            humidity.innerHTML = "Humidity: " + day.main.humidity + "%"

            let wind = document.createElement("div")
            wind.setAttribute("class","wind")
            wind.innerHTML = "Wind: " + day.wind.speed + " MPH" 

            let pressure = document.createElement("div")
            pressure.setAttribute("class","pressure")
            pressure.innerHTML =  "Pressure: " + day.main.pressure

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

var currentLocation = [-98.4951, 29.4246]

document.getElementById("searchBar").addEventListener('change', (e)=>{
    e.preventDefault()
    geoCode(e.target.value)
})//


document.getElementById("searchButton").addEventListener('click', (e)=>{
    e.preventDefault()
    geoCode(e.target.value)
})

geoCode("san antonio")

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-98, 39],
    zoom: 7.5
});

var marker = new mapboxgl.Marker({
    draggable:true,
}).setLngLat([12.550343, 55.665957]).addTo(map);

marker.on("dragend", (e)=>{
    var cords = [
        marker.getLngLat().lng,
        marker.getLngLat().lat]
    geoCode(cords)
    //get5Day(cords)
})
