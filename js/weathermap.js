String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

$('form').hide()

$("#hideSearch").click(()=>{

    $('form').fadeToggle()

})

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
    
    }).fail(function() {
        document.body.style.background = 'url("img/clouds.jpg")'
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundAttachment = "fixed"
    })
    
}

function geoCode(search, flag = 0){
    if(typeof search == null)return

    if(typeof search == "object"){// if we give it an array

        $.ajax("https://api.mapbox.com/geocoding/v5/mapbox.places/" + search[0] + "," + search[1] + ".json?access_token=" + MAPBOXAPI).done( (data,status)=>{
        
            document.getElementById("title").innerHTML = data.features[0].text + " - 5 Day Forcast"
            document.getElementById("searchBar").value = data.features[0].text 
            currentLocation = data.features[0].center // sets up easy var to access
            marker.setLngLat(data.features[0].center) //moves marker
            map.flyTo({
                center: data.features[0].center
            }); // fly animation
            get5Day(data.features[0].center) //get forcast
        
        })
        
    }else{ //otherwise its a search term

        if(search.length == "") return;

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
        
        if(flag){ //for autocomplete search
            $.ajax("https://api.mapbox.com/geocoding/v5/mapbox.places/" + input + ".json?access_token=" + MAPBOXAPI).done( (data,status)=>{
                var array = []
                data.features.forEach( location =>{
                    array.push(location.text)
                })
                autocomplete(document.getElementById("searchBar"), array)
            })

            
        }else{
            $.ajax("https://api.mapbox.com/geocoding/v5/mapbox.places/" + input + ".json?access_token=" + MAPBOXAPI).done( (data,status)=>{
        
                changeBackground(data.features[0].text)
                
                document.getElementById("title").innerHTML = data.features[0].text + " - 5 Day Forcast"
                document.getElementById("searchBar").value = data.features[0].text 
                currentLocation = data.features[0].center // sets up easy var to access
                marker.setLngLat(data.features[0].center) //moves marker
                map.flyTo({
                    center: data.features[0].center
                }); // fly animation
                get5Day(data.features[0].center) //get forcast
            
            })
    
        }
        
        

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
})

document.getElementById("searchBar").addEventListener('input', (e)=>{
    geoCode(e.target.value, true)
})



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


function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        document.getElementById("autoList").appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            b.setAttribute("class", "autocomplete-item");
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
}
