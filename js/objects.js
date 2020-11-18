(function() {
    "use strict";

    /**
     * TODO:
     * Create an object with firstName and lastName properties that are strings
     * with your first and last name. Store this object in a variable named
     * `person`.
     *
     * Example:
     *  > console.log(person.firstName) // "Rick"
     *  > console.log(person.lastName) // "Sanchez"
     */

     var person = {
         //var name : value ,
         firstName: "Jacob",
         lastName: "Gonzalez"
     }


    /**
     * TODO:
     * Add a sayHello method to the person object that returns a greeting using
     * the firstName and lastName properties.
     * console.log the returned message to check your work
     *
     * Example
     * > console.log(person.sayHello()) // "Hello from Rick Sanchez!"
     */

     person.sayHello = function(){
         return "Hello from " + this.firstName + " " + this.lastName;
     }

     console.log(person.sayHello())

    /** TODO:
     * HEB has an offer for the shoppers that buy products amounting to
     * more than $200. If a shopper spends more than $200, they get a 12%
     * discount. Write a JS program, using conditionals, that logs to the
     * browser, how much Ryan, Cameron and George need to pay. We know that
     * Cameron bought $180, Ryan $250 and George $320. Your program will have to
     * display a line with the name of the person, the amount before the
     * discount, the discount, if any, and the amount after the discount.
     *
     * Uncomment the lines below to create an array of objects where each object
     * represents one shopper. Use a foreach loop to iterate through the array,
     * and console.log the relevant messages for each person
     */

    var shoppers = [
        {name: 'Cameron', amount: 180},
        {name: 'Ryan', amount: 250},
        {name: 'George', amount: 320}
    ];


    shoppers.forEach( person =>{ // asking each shopper 

        if(person.amount >= 200){ // and this is the question aka if statement

            //creating the output thats needed
            console.log(person.name + " paid $" + person.amount.toFixed(2) + " and after the discount paid $" + (person.amount - (person.amount * .12)).toFixed(2));
            
        }else{

            //they didnt get the out
            console.log(person.name + " paid $" + person.amount.toFixed(2) + " with no discount");
        }
        
    })

    /** TODO:
     * Create an array of objects that represent books and store it in a
     * variable named `books`. Each object should have a title and an author
     * property. The author property should be an object with properties
     * `firstName` and `lastName`. Be creative and add at least 5 books to the
     * array
     *
     * Example:
     * > console.log(books[0].title) // "The Salmon of Doubt"
     * > console.log(books[0].author.firstName) // "Douglas"
     * > console.log(books[0].author.lastName) // "Adams"
     */

     //i dont know many books so i generated book names with the following :)
     function nameGenerator(flag){
        var n1 = Math.floor(Math.random() * 8) // names
        var n2 = Math.floor(Math.random() * 5) // last

        var names = ["James","Alex","Jones","Carl","Peter","Horris","Indiana","Carter","Jackson"]
        var last = ["Peterson","Gonzalez","Smith","Williams","Miller","Anderson"]

        if(flag){
            return names[n1];
        }
        return last[n2]
     }

     function bookGenerator(){
         var n1 = Math.floor(Math.random() * 5) // place
         var n2 = Math.floor(Math.random() * 5) // adj
         var n3 = Math.floor(Math.random() * 1) // connector

         var place = ["Halls","Cave","Trails","Fountain","School","House","Hospital"]
         var adj = ["Scary thoughts","Confusing Elements","Magical McGuffin","Crystal Skull","Friendship Problems","Endless Loop"]
         var connector = [" and the "," in the "]

         return nameGenerator(true) + connector[n3] + place[n1] + " of " + adj[n2]
     }

     var books = []

     for(var i = 0; i < 5; i++){
        var obj = {} // create temp object to manipulate
        obj.title = bookGenerator() // create the book 
        obj.author = {} // start object in object
        obj.author.firstName = nameGenerator(true) // generate names
        obj.author.lastName = nameGenerator()
        books.push(obj) //put the book in the array
     }

    

    /**
     * TODO:
     * Loop through the books array and output the following information about
     * each book:
     * - the book number (use the index of the book in the array)
     * - the book title
     * - author's full name (first name + last name)
     *
     * Example Console Output:
     *
     *      Book # 1
     *      Title: The Salmon of Doubt
     *      Author: Douglas Adamsa
     *      ---
     *      Book # 2
     *      Title: Walkaway
     *      Author: Cory Doctorow
     *      ---
     *      Book # 3
     *      Title: A Brief History of Time
     *      Author: Stephen Hawking
     *      ---
     *      ...
     */

     books.forEach( (book,i) =>{
         console.log("Book #"+ (i+1))
         console.log("Title: " + book.title)
         console.log("Author: " + book.author.firstName + " " + book.author.lastName);
         console.log("---")
     })


    /**
     * Bonus:
     * - Create a function named `createBook` that accepts a title and author
     *   name and returns a book object with the properties described
     *   previously. Refactor your code that creates the books array to instead
     *   use your function.
     * - Create a function named `showBookInfo` that accepts a book object and
     *   outputs the information described above. Refactor your loop to use your
     *   `showBookInfo` function.
     * 
     */

     function createBook(title, authorFirst, authorLast){
        var obj = {} 
        obj.title = title 
        obj.author = {} 
        obj.author.firstName = authorFirst 
        obj.author.lastName = authorLast
        return obj //returns book
     }

     
     for(var i = 0; i < 5; i++){
        createBook(
            bookGenerator(),
            nameGenerator(true),
            nameGenerator()
         )
     }

     function showBookInfo(book){
        console.log("Title: " + book.title)
        console.log("Author: " + book.author.firstName + " " + book.author.lastName);
        console.log("---")
     }

     books.forEach( (book) =>{
        showBookInfo(book)
    })


})();
