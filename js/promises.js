
function getLatestCommits(username){
    let url = `https://api.github.com/users/${username}/repos`


    let data = fetch(url, {headers: {'Authorization': GITKEY}})
    data.then( (res) => {
        res.json().then(data=>{

            let firstDate = Date.parse(data[0].updated_at)

            
            let lastRepoUpdate = data.reduce( (last,current,index)=>{
                if(index == data.length-1) return last.name
                return Date.parse(last.updated_at) > Date.parse(current.updated_at) ? last : current; 
            }, data[0]) //parse date so we can get a number to compare
            
            
            let url = `https://api.github.com/repos/${username}/${lastRepoUpdate}/commits`

            //start grabbing the commits from the last repo made
            let commits = fetch(url, {headers: {'Authorization': GITKEY}})
            commits.then( res =>{

                res.json().then(data=>{
                    //we got our last commit
                    let dateSec = Date.parse(data[0].commit.author.date)//gets UNIX time        
                    let date = new Date(dateSec)//sets UNIX time
                    console.log(date)
                })

            })

        })
    })

}

getLatestCommits("jacobgonzalez0")

