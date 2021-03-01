const blogAuthor = document.getElementById("author-name");
const blog = document.getElementById("blog");
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
        console.log(items)
        displayAllItems(items)
    } catch(e) {
        console.log(e)
    }
}


displayAllItems = (items) => {
    let blogItems = ''
    items.forEach((blog) => {
        blogItems +=
            `<div class="blog__item card card--dark">
                <h4 class="blog__title">${blog.title}</h4>
                <h6 class="blog__category">${blog.category}</h6>
                <p>${blog.content}</p>
            </div>`
    });
    blog.innerHTML = blogItems;
}


setUserName = async () => {
    blogAuthor.innerText = JSON.parse(localStorage.getItem("blog-username"));
}

