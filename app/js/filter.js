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
                listItem.dataset.name = category.title;
            }
            filter.append(listItem)
            
        })
    }catch(e){
        console.log(e)
    }    
}


getCategories()




