
function getLatestCommits(username){

    let users = username.split(" ")

    users.forEach( user =>{


        let url = `https://api.github.com/users/${user}/repos`
        if(typeof GITKEY == "undefined"){
            var data = fetch(url)
        }else{
            var data = fetch(url, {headers: {'Authorization': GITKEY}})
        }
        

        data.then( (res) => {

            if(res.status == 200){
                res.json().then(data=>{

                    let firstDate = Date.parse(data[0].updated_at)
        
                    
                    let lastRepoUpdate = data.reduce( (last,current,index)=>{
                        if(index == data.length-1) return last.name
                        return Date.parse(last.updated_at) > Date.parse(current.updated_at) ? last : current; 
                    }, data[0]) //parse date so we can get a number to compare
                    
                    
                    let url = `https://api.github.com/repos/${user}/${lastRepoUpdate}/commits`
        
                    //start grabbing the commits from the last repo made
                    if(typeof GITKEY == "undefined"){
                        var commits = fetch(url)
                    }else{
                        var commits = fetch(url, {headers: {'Authorization': GITKEY}})
                    }
                    
                    commits.then( res =>{
        
                        res.json().then(data=>{
                            //we got our last commit
                            let dateSec = Date.parse(data[0].commit.author.date)//gets UNIX time        
                            let date = new Date(dateSec)//sets UNIX time
                            generateUserInfo({
                                date,
                                username: data[0].author.login,
                                avatar: data[0].author.avatar_url,
                                repo: lastRepoUpdate,
                                commit: data[0].commit.message
                            })
                        })
        
                    })
        
                })
            }else{
                generateUserInfo({
                    date : "Invalid User",
                    username: "Invalid User",
                    avatar: "Invalid User",
                    repo: "Invalid User",
                    commit: "Invalid User"
                })
            }
        
        })
        
    })


    
    

    

}

function wait(ms){

    return new Promise((res,rej)=>{
        console.log("See you in " + (ms/1000).toFixed(1) + " seconds!")
        setTimeout((
            ()=>{
                console.log("Hey im done! It took me " + (ms/1000).toFixed(1) + " seconds to get here.")
                res(ms)
            }
        ),ms)
       
    })
}

//webpage stuff down here

document.getElementById("searchButton").addEventListener("click", (e)=>{
    e.preventDefault()
    generateUserInfo(
        getLatestCommits(document.getElementById("username").value)
    )
})
document.getElementById("searchButton2").addEventListener("click", (e)=>{
    e.preventDefault()
    generateUserInfo(
        getLatestCommits(document.getElementById("usernames").value)
    )
})

document.getElementById("search").addEventListener("submit", (e)=>{
    e.preventDefault()
    generateUserInfo(
         getLatestCommits(document.getElementById("username").value)
    )
    
})

function getTeam(name){

    let codeup = "CodeupClassroom"
    
    let url = `https://api.github.com/orgs/${codeup}/teams`

    
    let data = fetch(url, {headers: {'Authorization': GITKEY}})
    
    data.then( res =>{
        res.json().then( data=>{
            console.log(data)
        })
    })
}

function generateUserInfo(data){

    let target = document.getElementById("data")
    //target.innerHTML = ""

    let row = document.createElement("row")
    row.setAttribute("class", "row");

    //setup columns
    let avatar = document.createElement("img");
    avatar.setAttribute("class", "col-2 ");
    avatar.src = data.avatar;

    let username = document.createElement("col");
    username.setAttribute("class", "col");
    username.innerHTML = data.username;

    let lastRepo = document.createElement("col");
    lastRepo.setAttribute("class", "col");
    lastRepo.innerHTML = data.repo

    let commit = document.createElement("col");
    commit.setAttribute("class", "col");
    commit.innerHTML = data.commit;

    let date = document.createElement("col");
    date.setAttribute("class", "col");
    date.innerHTML = data.date

    row.appendChild(avatar);
    row.appendChild(username);
    row.appendChild(lastRepo);
    row.appendChild(commit);
    row.appendChild(date);
    //append to the target

    target.appendChild(row)

}