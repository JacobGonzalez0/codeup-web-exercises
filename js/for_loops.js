
function showMultiplicationTable(input){
    for(var i = 0; i < 11; i++){
        var str = input + " x " + i + " = " + (i * input);
        console.log(str);
    }
}

function randomOddEven(){
    for(var i = 0; i < 11; i++){
        var num =  Math.floor((Math.random()) * 200)+20;
        if(num % 2 == 0){
            console.log(num + " is Even");
        }else{
            console.log(num + " is Odd");
        }
    }
}

function numPyramid(){
    for(var y = 0; y < 10; y++){
        var str = ""
        for(var x = 0; x < y; x++){
            str += y
        }
        console.log(str)
    }
}

function countDown(){
    var num = 100
    for(var i = 0; i < 20; i++){
        console.log(num)
        num -= 5;
    }
}