const users = [
    {
        id: 1,
        name: 'ryan',
        email: 'ryan@codeup.com',
        languages: ['clojure', 'javascript'],
        yearsOfExperience: 5
    },
    {
        id: 2,
        name: 'luis',
        email: 'luis@codeup.com',
        languages: ['java', 'scala', 'php'],
        yearsOfExperience: 6
    },
    {
        id: 3,
        name: 'zach',
        email: 'zach@codeup.com',
        languages: ['javascript', 'bash'],
        yearsOfExperience: 7
    },
    {
        id: 4,
        name: 'fernando',
        email: 'fernando@codeup.com',
        languages: ['java', 'php', 'sql'],
        yearsOfExperience: 8
    },
    {
        id: 5,
        name: 'justin',
        email: 'justin@codeup.com',
        languages: ['html', 'css', 'javascript', 'php'],
        yearsOfExperience: 9
    }
];

let knowsThreeLang = users.filter( user => user.languages.length >= 3)
console.log("All users that know 3 or more languages: ")
console.log(knowsThreeLang)
let emails = users.map( user => user.email)
console.log("All users emails: ")
console.log(emails)
let totalYears = users.reduce((total, user) =>{
    return total + user.yearsOfExperience
}, 0)
let averageYears = totalYears / users.length
console.log("Average years of everyones work experience: " + averageYears)
let longestEmail = users.reduce((total, user, i) =>{
    if(i == users.length-1) return total.email // the last user counted is the longest
    return total.email.length > user.email.length ? total : user;
}, users[0])
console.log("The longest email is: " + longestEmail)
let userList = users.reduce((total, user, i) =>{
    if(i == users.length-1) return total += user.name + "."
    return total += user.name + ", "
}, "")
console.log("All users: " + userList)
