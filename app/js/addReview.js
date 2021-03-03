// Formos pateikimui
const submit = document.querySelector('#submit-review');
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
                option.dataset.category = category._id;
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
    let category = reviewCategory.options[reviewCategory.selectedIndex].dataset.category;
    let content = reviewContent.value;
    let file = document.getElementById('fileInput').files[0]
    if(!title) {
     document.getElementById('sub-err').innerHTML = `Add a title`
     return false   
    } 
    if(!category) {
        document.getElementById('sub-err').innerHTML = `Add a category`
        return false  
    } 
    if(!content) {
      document.getElementById('sub-err').innerHTML = `Add content`
      return false    
    } 
    if(!file) {
       document.getElementById('sub-err').innerHTML = `Add a background img`
       return false  
    } 
    let formData = new FormData()
    formData.append('test', file)
    formData.append('title', title)
    formData.append('category', category)
    formData.append('content', content)
    
    try{
        const response = await fetch('http://localhost:3001/api/blog', {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'blog-user-id': webtok
        },
        body:formData
    })
    if(response.status != 200) throw await response.json()
    let blog = await response.json()
    
    }catch(e) {
        document.getElementById('sub-err').innerHTML = e
    }
})
