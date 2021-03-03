// Formos pateikimui
const submit = document.getElementById('submit');
const inputUsername = document.getElementById('InputUsername');
const inputPassword = document.getElementById('InputPassword');
const inputPassword2 = document.getElementById('InputPassword2');
const inputEmail = document.getElementById('InputEmail');
const InputDescription = document.getElementById('InputDescription');
const fileUpload = document.getElementById('fileSubmit');
const webtok1 = localStorage.getItem('blog-user-id');

submit.addEventListener('click', async (e)=> {
    e.preventDefault();
    let username = inputUsername.value;
    let password = inputPassword.value;
    let password2 = inputPassword2.value;
    let description = InputDescription.value;
    let email = inputEmail.value;
    let file = document.getElementById('fileInput').files[0]
    
    let formData = new FormData()
    formData.append('test', file)
    formData.append('username', username)
    formData.append('password', password)
    formData.append('password2', password2)
    formData.append('description', description)
    formData.append('email', email)
    
    try{
        const response = await fetch('http://localhost:3001/api/user', {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'blog-user-id': webtok1
        },
        body:formData
    })
    if(response.status != 200) throw await response.json()
    let user = await response.json()
    console.log(userInfo)
    }catch(e) {
        console.log(e)
    }
})
