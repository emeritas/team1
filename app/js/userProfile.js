// Formos pateikimui
const submit = document.getElementById('submit');
const inputUsername = document.getElementById('InputUsername');
const inputPassword = document.getElementById('InputPasswrod');
const inputPassword2 = document.getElementById('InputPassword2');
const inputEmail = document.getElementById('InputEmail');
const InputDescription = document.getElementById('InputDescription');
const fileUpload = document.getElementById('fileSubmit');
//Headerio Atsijungimui
const logout = document.getElementById('logout');
const webtok = localStorage.getItem('blog-user-id');


logout.addEventListener('click', async () =>{
    const response = await fetch('http://localhost:3001/api/logout', {
    method:'GET',
    headers: {
        'Content-Type': 'application/json',
        'blog-user-id': webtok
    }
}).then(res => res.json()).then(data => console.log(data))
localStorage.removeItem('blog-user-id')
window.location.href = './index.html' 
})

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
        console.log(user)
    } catch (e) {
        console.log(e)
    }
})
