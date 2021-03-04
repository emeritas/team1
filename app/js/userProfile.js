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
    if(!username && !password && !password2 && !description && !email && !file) {
        document.getElementById('sub-err').innerHTML = `Please enter a field you wish to change`
        return false
    }
    if(password && !password2 || !password && password2) {
        document.getElementById('sub-err').innerHTML = `Please enter both passwords: the one you use and the new password`
        return false
    }
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
    let user = await response.json()
    
    if(user === `Incorrect password`){ document.getElementById('sub-err').innerHTML = `Incorrect password. Other data changed succesfully`}
    if(!user || user !== `Incorrect password`){
        document.getElementById('sub-err').innerHTML = `Information successfuly changed`
        inputUsername.value = '';
        inputPassword.value = '';
        inputPassword2.value = '';
        InputDescription.value = '';
        inputEmail.value = '';
    }
    }catch(e) {
        
    }
})
