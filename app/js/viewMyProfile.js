const blogAuthor = document.getElementById("author-name");
const blogItems = document.getElementById("blog");
const profilePic = document.getElementById('user-image');
const userDescription = document.getElementById('author-description')
let url = 'http://localhost:3001/api/';


window.addEventListener('DOMContentLoaded', () => {
    token = localStorage.getItem('blog-user-id');
    setUserName();
    getAllItems();

})


getAllItems = async () => {
    try {
        const response = await fetch(url + 'blog', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "blog-user-id": token
            }
        })
        if(response.status != 200) throw await response.json();
        let items = await response.json();
        
        globalItems = items;
        getCategoryTitle(items)
    } catch(e) {
        console.log(e)
    }
}

getCategoryTitle = async (items) => {
    blogItems.innerHTML = ''
    try {
        items.forEach(async (blog, index) => {
            
            const response = await fetch(url + 'category/getTitle/'+ blog.category, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "blog-user-id": token
                }
            }).then(res => res.json()).then(data =>  blogItems.innerHTML +=
                `<div class="blog__item card card--dark">
                        <h4 class="blog__title">${blog.title}</h4>
                        <h6 class="blog__category">${data.title}</h6>
                        <p>${blog.content}</p>
                        <button class="btn-delete" onclick="deleteBlog('${blog._id}', ${index})" style="position:absolute; top:1.2rem; right:1rem; width:30px; height:30px; border:none; border-radius:5px"><i class="far fa-trash-alt"></i></button>
                    </div>`)
        });
 

    } catch(e) {
        console.log(e)
    }

}

deleteBlog = async (id, index) => {
    try {
        globalItems.splice(index, 1)
        getCategoryTitle(globalItems)
        const response = await fetch(url + 'blog/' + id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "blog-user-id": token
            }
        })
    } catch(e) {
        console.log(e)
    }
}


setUserName = async () => {
    try {
        const response = await fetch(url+'currentUser', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "blog-user-id": token
            }
        })
        if(response.status != 200) throw await response.json();
        let user = await response.json();
        profilePic.src = `${user.profileImageURL}`
        if(user.description) userDescription.innerText = `${user.description}`
        blogAuthor.innerText = user.username;
    } catch(e) {
        console.log(e)
    }
}

