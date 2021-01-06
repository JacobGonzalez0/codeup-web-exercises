
function createCard(data){

    data.forEach( day=>{

        let card = document.createElement("div")
        card.setAttribute("class","card flex-column mx-2")

        let hr = [];
        hr.push(document.createElement("hr"))
        hr.push(document.createElement("hr"))
        hr.push(document.createElement("hr"))

        //starts header 
        let header = document.createElement("div")
        header.setAttribute("class","card-header")
        header.innerHTML = data.date; 

        //starts body
        let body = document.createElement("div");
        body.setAttribute("class","card-body text-center")
        
        let temp = document.createElement("div")
        temp.setAttribute("class","temp");
        temp.innerHTML = data.temp

        let icon = document.createElement("img");
        icon.src = "icon-goes-here"

        let description = document.createElement("div")
        description.setAttribute("class","description pb-4")
        description.innerHTML = data.description

        let humidity = document.createElement("div")
        humidity.setAttribute("class","humidity")
        humidity.innerHTML = data.temp

        let wind = document.createElement("div")
        wind.setAttribute("class","wind")
        wind.innerHTML = data.temp

        let pressure = document.createElement("div")
        pressure.setAttribute("class","pressure")
        pressure.innerHTML = data.temp

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


    })

}

createCard([0,0,0])