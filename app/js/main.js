/* const e = require("cors");

console.log('This is the Main.js file. It should be the 3rd and final file'); */

/* const e = require("cors"); */

//REGISTRACIJAI,LOGINUI,ATSIJUNGIMUI,USERIO DUOMENU PAKEITIMUI
const loginSubmit = document.querySelector('#loginSubmit');
const registerSubmit = document.querySelector('#registerSubmit');
const usernameRegister = document.getElementById('username-register');
const passwordRegister = document.getElementById('password-register');
const emailRegister = document.getElementById('email-register');
const usernameLogin = document.getElementById('username-login');
const passwordLogin = document.getElementById('password-login');
const registerErr = document.getElementById('err-register')
const loginErr = document.getElementById('err-login')
const logout = document.getElementById('logout');
const webtok = localStorage.getItem('blog-user-id');
const loggedIn = document.querySelector('.loggedIn')
const body = document.querySelector('body')
const viewMyProfile = document.getElementById('viewMyProfile');
const output = document.getElementById('output');
// BLOGO BOXAI
const blogItem = document.querySelector('.blogImage');

// REDIRECTINIMAS JEIGU USERIS NEPRISIJUNGES
if(localStorage.getItem('loggedIn') === 'false' && window.location.href !== `${window.location.origin}/app/index.html`) {
    window.location.href = '../app/index.html'
}
// JEIGU USERIS PRISIJUNGES UZDEDAMOS KNOPKES IR TT
if(localStorage.getItem('loggedIn') === 'true') {
    body.classList.add('loggedIn');
    userAvatar();
}

getAllPostsAndPopulateUI()

if(loggedIn) userAvatar()
async function userAvatar() {
    try{
    const response = await fetch('http://localhost:3001/api/currentUser', {
        method: "GET",
        headers:{"blog-user-id": webtok}
        })
        let user = await response.json()
        document.getElementById('userAvatar').src = user.profileImageURL
    }catch(e){
        console.log(e)
    }    
}



logout.addEventListener('click', async () =>{
    const response = await fetch('http://localhost:3001/api/logout', {
    method:'GET',
    headers: {
        'Content-Type': 'application/json',
        'blog-user-id': webtok
    }
}).then(res => res.json()).then(data => console.log(data))
localStorage.removeItem('blog-user-id');
localStorage.setItem('loggedIn', false);
window.location.href = '/app/index.html';
})

// Logino fetchas
if(localStorage.getItem('loggedIn') === `false` || !localStorage.getItem('loggedIn')){
    loginSubmit.addEventListener('click', async (e) =>{
        e.preventDefault()
        let username = usernameLogin.value
        let password = passwordLogin.value
        
        if(!username || !password) {
            loginErr.innerHTML = "Please fill in form fields with user information"
            return false;
        }

        let data = {
            username,
            password
        }

        try{
            const response = await fetch('http://localhost:3001/api/login', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        })
        
        if(response.status != 200) throw await response.json()
        response.json()
        let token = response.headers.get('blog-user-id')
        localStorage.setItem('blog-user-id',token)
        localStorage.setItem('loggedIn',true)
        window.location.href = './index.html'
        } catch(e) {
        loginErr.innerHTML = e
        }
    })
    registerSubmit.addEventListener('click', async (e) =>{
        e.preventDefault();

        let username = usernameRegister.value
        let password = passwordRegister.value
        let email = emailRegister.value
        if(!username || !password || !email) {
            registerErr.innerHTML = "Please fill in ALL form fields with user information"
            return false;
        }
        let data = {
            username,
            password,
            email
        }

        try{
            const response = await fetch('http://localhost:3001/api/signup', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        })
        if(response.status != 200) throw await response.json()
        response.json()
        window.location.href = './index.html'
        } catch(e) {
            if(e.keyValue.username) registerErr.innerHTML = `Username already exists.`
            if(e.keyValue.email) registerErr.innerHTML = `Email already exists.`
        }
    })
}

// FETCHINAMI VISI POSTAI
async function getAllPostsAndPopulateUI() {
    let i = 0;
    try{
        const response = await fetch('http://localhost:3001/api/getAllBlogs', {
        method:'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(response.status != 200) throw await response.json()
    let allItems = await response.json()
    console.log(allItems)
    allItems.forEach(currentItem => {
        output.innerHTML += `
        <div class="col-md-6 col-sm-12">
            <div class="oneUserblogItem card card--dark mb-3">
                <div class="oneUserblogItem__image">
                    <img src="${currentItem.coverImageURL}" alt="">
                </div>
                <div class="oneUserblogItem__info">
                    <h3>${currentItem.title}</h3>
                    <h4>${currentItem.author}</h4>
                    <p id='desc${i}' class="blogItem__description">${currentItem.content}</p>
                    <div class="collapse" id="collapseExample${i}">
                        <div id='collapsible-item${i}' class="collapse-item">
                            <p id='collapse-item${i}'>${currentItem.content}</p>
                        </div>
                    </div>
                    <button data-toggle="collapse" href="#collapseExample${i}" class="read-more btn btn-warning">Read More</button>
                </div>
            </div>
        </div>
        `
        i = i + 1;
    });
    readMoreCollapse()
    }catch(e) {
        console.log(e)
    }
}
// READ MORE nu cia idomiai idomiai :)
function readMoreCollapse() {
    const readMoreBtns = document.querySelectorAll('.read-more');
    readMoreBtns.forEach((element,index) => {
        element.addEventListener('click', () => {
            let currParagraph = document.querySelector('#desc'+index)
            let collapsibleItem = document.querySelector('#collapsible-item'+index);
            let allParagraphs = document.querySelectorAll('.blogItem__description');
            let allCollapseItems = document.querySelectorAll('.collapse-item')
            allParagraphs.forEach(element1 => {
                element1.classList.remove('hide_content');
            })
            allCollapseItems.forEach(element2 => {
                element2.classList.add('hide_content');
            })
            if(element.getAttribute('aria-expanded') === null || element.getAttribute('aria-expanded') === 'false') {
                currParagraph.classList.add('hide_content')
                collapsibleItem.classList.remove('hide_content')
                element.innerText = 'Read Less'
            } else {
                currParagraph.classList.remove('hide_content')
                collapsibleItem.classList.add('hide_content')
                element.innerText = 'Read More'
            }
            console.log(currParagraph)
            console.log(collapsibleItem.classList)
        })
    })
} 





