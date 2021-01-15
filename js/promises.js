
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

function generateUserInfo(data){

    let target = document.getElementById("data")
    //target.innerHTML = ""

    let row = document.createElement("div")
    row.setAttribute("class", "card m-2");
    row.setAttribute("style", "width:18em")

    //setup columns
    let avatar = document.createElement("img");
    avatar.setAttribute("class", "card-img-top");
    avatar.src = data.avatar;

    let list = document.createElement("ul");
    list.setAttribute("class","list-group list-group-flush")

    let username = document.createElement("li");
    username.setAttribute("class", "list-group-item");
    username.innerHTML = "<strong>Username:</strong> " + data.username;

    let lastRepo = document.createElement("li");
    lastRepo.setAttribute("class", "list-group-item");
    lastRepo.innerHTML = "<strong>Last Repo:</strong> " + data.repo

    let commit = document.createElement("li");
    commit.setAttribute("class", "list-group-item");
    commit.innerHTML = "<strong>Commit Msg:</strong> " + data.commit;

    let date = document.createElement("li");
    date.setAttribute("class", "list-group-item");
    date.innerHTML = "<strong>Date:</strong> " + data.date

    row.appendChild(avatar);
    list.appendChild(username);
    list.appendChild(lastRepo);
    list.appendChild(commit);
    list.appendChild(date);
    row.appendChild(list)
    //append to the target

    target.appendChild(row)

}