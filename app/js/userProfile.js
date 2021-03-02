// Formos pateikimui
const submit = document.getElementById('submit');
const inputUsername = document.getElementById('InputUsername');
const inputPassword = document.getElementById('InputPassword');
const inputPassword2 = document.getElementById('InputPassword2');
const inputEmail = document.getElementById('InputEmail');
const InputDescription = document.getElementById('InputDescription');
const fileUpload = document.getElementById('fileSubmit');
//Headerio Atsijungimui

const webtok = localStorage.getItem('blog-user-id');



document.getElementById('fileSubmit').addEventListener('click', async (e) => {
    e.preventDefault()
    if (document.getElementById('fileInput').files.length === 0) return
    let file = document.getElementById('fileInput').files[0]

    let formData = new FormData()
    formData.append('test', file)
    
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
