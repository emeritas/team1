console.log('This is the Main.js file. It should be the 3rd and final file');

//REGISTRACIJAI IR LOGINUI
const loginSubmit = document.querySelector('#loginSubmit');
const registerSubmit = document.querySelector('#registerSubmit');
const usernameRegister = document.getElementById('username-register');
const passwordRegister = document.getElementById('password-register');
const emailRegister = document.getElementById('email-register');
const usernameLogin = document.getElementById('username-login');
const passwordLogin = document.getElementById('password-login');
const registerErr = document.getElementById('err-register')
const loginErr = document.getElementById('err-login')

// Logino fetchas
loginSubmit.addEventListener('click', async (e) =>{
    e.preventDefault();
    
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
    window.location.href = './user.html'
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

