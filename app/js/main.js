
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

if(window.location.href === "http://127.0.0.1:5501/app/index.html") getAllPostsAndPopulateUI();

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
        if(!response){
            loginErr.innerHTML = `Wrong username or password`
            return false}
        if(response.status != 200) throw await response.json();
        let login = await response.json();
        console.log(login)
        let token = response.headers.get('blog-user-id')
        localStorage.setItem('blog-user-id',token)
        localStorage.setItem('loggedIn',true)
        window.location.href = './index.html'
        } catch(e) {
            console.log(e)
            loginErr.innerHTML = e;
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
            allItems.forEach(currentItem => {
                output.innerHTML += `
                <div class="col-md-6 col-sm-12">
                    <div class="oneUserblogItem card card--dark mb-3">
                        <div class="oneUserblogItem__image">
                            <img src="${currentItem.coverImageURL}" alt="">
                        </div>
                        <div class="oneUserblogItem__info">
                            <h3>${currentItem.title}</h3>
                            <p>Author: ${currentItem.author}</p>
                            <div class="read-more-block">
                                <p class="blogItem__description animated fadeIn">${currentItem.content}</p>
                            </div>
                            <button class="read-more-btn btn btn-warning"><span class="more-btn">Read Review</span><span class="less-btn">Read Less</span></button>
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

// READ MORE
function readMoreCollapse() {
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    readMoreBtns.forEach((btn,index) => {
        btn.addEventListener('click', (e) => {
            let element = e.target;
            let parent = element.parentElement;
            if(parent.classList.contains('show')){
                parent.classList.remove('show');
            }else{
                let allParentElements = document.querySelectorAll('.oneUserblogItem__info');
                allParentElements.forEach(elem => {
                    if(elem.classList.contains('show')){
                        elem.classList.remove('show');
                    }
                })
                parent.classList.add('show');
            }
        })
    })
}



// footer date
document.querySelector("#current-year").innerHTML = new Date().getFullYear();





