const filter = document.getElementById('filter');


// Get categories for filter
const getCategories = async () => {
    try{
    const response = await fetch('http://localhost:3001/api/category/get', {
        method: "GET",
        headers:{"blog-user-id": webtok}
        })
        let categories = await response.json();
        let i = 0;
        let listItem = document.createElement("li");
        listItem.innerText = "All";
        listItem.dataset.name = "All";
        listItem.classList = "filter__single-item current";
        filter.append(listItem)
        categories.forEach(category => {
            i++;
            if(i > 0){
                listItem = document.createElement("li");
                listItem.classList = "filter__single-item";
                listItem.innerText = category.title;
                listItem.dataset.name = category._id;
            }
            filter.append(listItem)
            
        })
        const allFilterButtons = document.querySelectorAll('.filter__single-item')
        allFilterButtons.forEach(button =>{
            button.addEventListener('click', async () => {
            allFilterButtons.forEach(buttonz => {
                buttonz.classList.remove('current')
            })
            button.classList.add('current')
            
            if(button.dataset.name === `All`) {
                try {
                    const response1 = await fetch('http://localhost:3001/api/getAllBlogs', {
                    method:'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                let allBlogs = await response1.json()
                
                let output = document.getElementById('output')
                output.innerHTML = '';
                allBlogs.forEach(blog => {
                    output.innerHTML += `
                    <div class="col-md-6 col-sm-12">
                        <div class="oneUserblogItem card card--dark mb-3">
                            <div class="oneUserblogItem__image">
                                <img src="${blog.coverImageURL}" alt="">
                            </div>
                            <div class="oneUserblogItem__info">
                                <h3>${blog.title}</h3>
                                <p>Author: ${blog.author}</p>
                                <div class="read-more-block">
                                    <p class="blogItem__description animated fadeIn">${blog.content}</p>
                                </div>
                                <button class="read-more-btn btn btn-warning"><span class="more-btn">Read Review</span><span class="less-btn">Read Less</span></button>
                            </div>
                        </div>
                    </div>
                    `
                })
                readMoreCollapse()
                }catch(e){
                    console.log(e)
                }
                return false
            }
            let name = button.dataset.name
            try {
                let data = {
                    title : name
                }
                
                const response = await fetch('http://localhost:3001/api/blogsByCategory', {
                method: "POST",
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(data)
                })
                let blogs = await response.json()
                let output = document.getElementById('output')
                output.innerHTML = '';
                blogs.forEach(blog => {
                    output.innerHTML += `
                    <div class="col-md-6 col-sm-12">
                        <div class="oneUserblogItem card card--dark mb-3">
                            <div class="oneUserblogItem__image">
                                <img src="${blog.coverImageURL}" alt="">
                            </div>
                            <div class="oneUserblogItem__info">
                                <h3>${blog.title}</h3>
                                <p>Author: ${blog.author}</p>
                                <div class="read-more-block">
                                    <p class="blogItem__description animated fadeIn">${blog.content}</p>
                                </div>
                                <button class="read-more-btn btn btn-warning"><span class="more-btn">Read Review</span><span class="less-btn">Read Less</span></button>
                            </div>
                        </div>
                    </div>
                    `
                })
                readMoreCollapse()
            }catch(e){
                console.log(e)
            }    
        })})
        readMoreCollapse()
    }catch(e){
        console.log(e)
    }    
}
getCategories()

// READ MORE
function readMoreCollapse() {
    
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    readMoreBtns.forEach((btn,index) => {
        btn.addEventListener('click', (e) => {
            let element = e.target;
            let parent = element.parentElement;

            if(parent.classList.contains('show')){
                parent.classList.remove('show');
            }else{
                let allParentElements = document.querySelectorAll('.oneUserblogItem__info');
                allParentElements.forEach(elem => {
                    if(elem.classList.contains('show')){
                        elem.classList.remove('show');
                    }
                })
                parent.classList.add('show');
            }
        })
    })
}




