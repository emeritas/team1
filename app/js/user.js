const logout = document.getElementById('logout');
const newReview = document.getElementById('newReview');
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


