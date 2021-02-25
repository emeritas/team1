/* const e = require("cors");

console.log('This is the Main.js file. It should be the 3rd and final file'); */

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
const loggedIn = document.getElementById('loggedIn')
const body = document.querySelector('body')

if(localStorage.getItem('loggedIn') === 'true') {
    body.classList.add('loggedIn')
}

if(body.classList.contains('loggedIn')) {
    document.getElementById('signup').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.getElementById('loggedIn').style.display = 'flex'
} else {
    document.getElementById('signup').style.display = 'flex';
    document.getElementById('login').style.display = 'flex';
    document.getElementById('loggedIn').style.display = 'none'
}


if(!loggedIn.classList.contains('hide')) userAvatar()
async function userAvatar() {
    try{
    const response = await fetch('http://localhost:3001/api/currentUser', {
        method: "GET",
        headers:{"blog-user-id": webtok}
        })
        let user = await response.json()
        console.log(user)
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
/* loggedIn.classList.add('hide')
document.getElementById('login').classList.remove('hide')
document.getElementById('signup').classList.remove('hide')
document.getElementById('ModalLoginForm').style.display = 'block';
document.querySelector('.modal-backdrop').style.display = 'block';
document.querySelector('.modal-open').style.overflow = 'hidden'; */
window.location.href = './index.html'
})

userAvatar()
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
/* document.getElementById('login').addEventListener('click', () => {
    document.getElementById('ModalLoginForm').style.display = 'flex';
}) */
// Logino fetchas
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

// Register fetchas
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

