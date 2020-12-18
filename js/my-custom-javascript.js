"use strict";

// $(document).ready(function() {

//     // INSERT JAVASCRIPT CODE SAMPLE HERE
//     alert("Page is loaded")
// });

$('p').dblclick((e)=>{
    $(e.target).css("font-size","18px")
})

$('li').hover(e=>{
    $(e.target).css("color","red")
},e=>{
    $(e.target).css("color","black")
})