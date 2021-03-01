// Formos pateikimui
const submit = document.getElementById('submit-review');
const reviewTitle = document.getElementById('review-title');
const reviewCategory = document.getElementById('category');
const reviewContent = document.getElementById('review-content');

getCategories()
async function getCategories() {
    try{
    const response = await fetch('http://localhost:3001/api/category/get', {
        method: "GET",
        headers:{"blog-user-id": webtok}
        })
        let categories = await response.json();
        let i = 0;
        let option = document.createElement("option");
        option.innerText = "Choose Category";
        reviewCategory.append(option)
        categories.forEach(category => {
            i++;
            if(i > 0){
                option = document.createElement("option");
                option.classList = "single-category";
                option.innerText = category.title;
                option.dataset.id = category._id;
                option.value = category.title;
            }
            reviewCategory.append(option)
            
        })
    }catch(e){
        console.log(e)
    }    
}

submit.addEventListener('click', async (e)=> {
    e.preventDefault();
    let title = reviewTitle.value;
    let category = reviewCategory.options[reviewCategory.selectedIndex].dataset.id;
    let content = reviewContent.value;

    let data = {
        title,
        category,
        content
    }
    try{
        const response = await fetch('http://localhost:3001/api/blog', {
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
    console.log(data)
})