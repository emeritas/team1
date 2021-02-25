// Formos pateikimui
const submit = document.getElementById('submit');
const inputUsername = document.getElementById('InputUsername');
const inputPassword = document.getElementById('InputPassword');
const inputPassword2 = document.getElementById('InputPassword2');
const inputEmail = document.getElementById('InputEmail');
const InputDescription = document.getElementById('InputDescription');
const fileUpload = document.getElementById('fileSubmit');
//Headerio Atsijungimui
const logout = document.getElementById('logout');
const webtok = localStorage.getItem('blog-user-id');

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
window.location.href = './index.html';
})

document.getElementById('fileSubmit').addEventListener('click', async (e) => {
    e.preventDefault()
    if (document.getElementById('fileInput').files.length === 0) return
    let file = document.getElementById('fileInput').files[0]

    console.log(document.getElementById('fileInput').files[0])
    let formData = new FormData()
    formData.append('test', file)
    console.log(formData)
    try {
        const response = await fetch('http://localhost:3001/api/uploads', {
        method: 'POST',
        headers: {
            'blog-user-id': webtok
        },
        body: formData
        })
        if (response.status != 200) throw await response.json()
        let user = await response.json()
        console.log('asd')
        document.getElementById('userAvatar').src = user.profileImageURL
    } catch (e) {
        console.log(e)
    }
})

submit.addEventListener('click', async (e)=> {
    e.preventDefault();
    let username = inputUsername.value;
    let password = inputPassword.value;
    let password2 = inputPassword2.value;
    let description = InputDescription.value;
    let email = inputEmail.value;

    let data = {
        username,
        password,
        password2,
        email,
        description
    }
    try{
        const response = await fetch('http://localhost:3001/api/user', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'blog-user-id': webtok
        },
        body:JSON.stringify(data)
    })
    if(response.status != 200) throw await response.json()
    response.json()
    }catch(e) {
        console.log(e)
    }
})