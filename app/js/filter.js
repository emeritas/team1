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
        allFilterButtons.forEach(button => button.addEventListener('click', async () => {
            let name = button.dataset.name
            try {
                let data = {
                    title : name
                }
                console.log(data)
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
                                <h4>${blog.author}</h4>
                                <p id='desc${i}' class="blogItem__description">${blog.content}</p>
                                <div class="collapse" id="collapseExample${i}">
                                    <div id='collapsible-item${i}' class="collapse-item">
                                        <p id='collapse-item${i}'>${blog.content}</p>
                                    </div>
                                </div>
                                <button data-toggle="collapse" href="#collapseExample${i}" class="read-more btn btn-warning">Read More</button>
                            </div>
                        </div>
                    </div>
                    `

                })
            }catch(e){
                console.log(e)
            }    
        }))
    }catch(e){
        console.log(e)
    }    
}
getCategories()




