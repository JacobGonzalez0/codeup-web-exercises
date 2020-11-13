function doubler(){
    var num = 2;
    while(num < 65536){
        console.log(num*2)
        num *= 2;
    }
}

function iceCream(){

    var allCones = Math.floor(Math.random() * 50) + 50;

    do{
        var bought = Math.floor(Math.random() * 5) + 1;

        if(bought > allCones){
            console.log("Cannot sell you " + bought + " cones I only have " + allCones);
            continue;
        }else if(bought == allCones){
            console.log("Yay! I sold them all!")
            break;
        }

        allCones -= bought;
        console.log(bought + " cones sold..")

    }while(allCones >= 1)
}