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
        console.log(categories);
        // document.getElementById('userAvatar').src = user.profileImageURL
    }catch(e){
        console.log(e)
    }    
}