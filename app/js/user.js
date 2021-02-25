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
localStorage.removeItem('blog-user-id')
window.location.href = './index.html' 
})