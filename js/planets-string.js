(function(){
    "use strict";

    var planetsString = "Mercury|Venus|Earth|Mars|Jupiter|Saturn|Uranus|Neptune";
    var planetsArray;

    /**
     * TODO:
     * Convert planetsString to an array, and save it in a variable named
     * planetsArray.
     * console.log planetsArray to check your work
     */
     planetsArray = planetsString.split("|")
     console.log(planetsArray);

    /**
     * TODO:
     * Create a string with <br> tags between each planet. console.log() your
     * results. Why might this be useful?
     *
     * BONUS:
     * Create another string that would display your planets in an undordered
     * list. You will need an opening AND closing <ul> tags around the entire
     * string, and <li> tags around each planet.
     */

     var str = ""
    planetsArray.forEach( planet =>{
        str += `<br>${planet}`;

    })
    console.log(str)
    document.write(str)


    
    var ul = document.createElement("ul")

    planetsArray.forEach( planet =>{
        var li = document.createElement("li");
        li.setAttribute("class","list1");
        li.innerText = planet;
        ul.appendChild(li)
    })
     
    document.body.appendChild(ul)

})();
