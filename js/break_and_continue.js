function numberSkip(){
    var skipped
    do{
        skipped = prompt("Enter an odd number between 1 - 50", 23)
        //Sanitizes the input and prompts the user for another number if its not in the parms
    } while(isNaN(skipped) || skipped < 0 || skipped > 51 || skipped % 2 == 0)

    var count = 1
    console.log("Here is an odd number: " + count);
    while(count <49){
        count += 2;
        if(count == skipped) {
            //skips the odd number given to us
            console.log("Yikes! Skipping number: " + skipped);
            continue;
        }
        console.log("Here is an odd number: " + count);
    }
}