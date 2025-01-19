const authorContainer = document.getElementById("author-container");
const loadMoreBtn = document.querySelector(".btn");


let startingIndex = 0;
let endingIndex = 8;
let authorDataArr = new Array();


/* fetching data from the server */
fetch("https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json")
.then((res) => res.json())
.then((data) => {
    console.log(data);
    authorDataArr = data;
    // console.log("Author Data Array: ", authorDataArr)
    displayAuthors(authorDataArr.slice(startingIndex, endingIndex));
})
.catch( err => authorContainer.innerHTML = `<p class="error-msg"> "There was an error loading the authors" </p>`);



function displayAuthors(authors){
    authors.forEach(({author,image, url, bio}, index) =>{
        authorContainer.innerHTML += `<div id="${index}" class="user-card">
                                       <h2 class="author-name">${author}</h2>"
                                       <img class="user-img" src="${image}" alt="${author} avatar">
                                       <div class="divider"></div>
                                       <p class="bio">${bio.length > 50 ? bio.slice(0,50) + "..." : bio}
                                       <a class="author-link" href="${url}" target="_blank"> ${author}'s author page </a>
                                     </div>`
    });
}


// function to fetch more author when we click on button

const fetchMoreAuthors = () =>{
    startingIndex += 8
    endingIndex += 8;
    displayAuthors(authorDataArr.slice(startingIndex,endingIndex));

    if(authorDataArr.length <= endingIndex){
        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = "No more Data to load."
        loadMoreBtn.style.cursor = "not-allowed";
    }
}

loadMoreBtn.addEventListener("click", function(){
    fetchMoreAuthors();
})