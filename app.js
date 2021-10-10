const GITHUBAPI = 'https://api.github.com/users/';

const mainEl = document.getElementById('main');

const formEl = document.getElementById('form');

const search = document.getElementById('search');




async function getUser(username){
    const resp = await fetch(GITHUBAPI + (username || 'adesholly'))
    const respondData = await resp.json();
    
    createUserCard(respondData);
}


async function getRepos(username){
    const resp = await fetch(GITHUBAPI + (username || 'adesholly') + '/repos') 
    const respondData = await resp.json();
    console.log(respondData)
    createRepoCard(respondData);

}


function createUserCard(user){

    const userHTML = `
       <div class="card">
            <div class="image-card">
                <img src="${user.avatar_url}" alt="${user.name}" />
            </div>
            <div class="info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
                <ul>
                    <li>${user.followers}<strong>Followers</strong> </li>
                    <li>${user.following}<strong>Following</strong> </li>
                    <li>${user.public_repos}<strong>Repository</strong> </li>
                </ul>
                <div class="repos" id="repos"> </div>
            </div>
        </div>
    
    `;
    mainEl.innerHTML = userHTML;

}


function createRepoCard(repos){
    const reposEl = document.getElementById('repos');

    repos.forEach(repo => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repo');
        
        repoEl.href = repo.html_url;
        repoEl.target = "blank";
        repoEl.innerText = repo.name;
        
        reposEl.appendChild(repoEl);

    });
}

formEl.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = search.value;

    if(user){
        getUser(user);

        search.value = '';
        getRepos(user)
    }
}); 