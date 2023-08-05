let input = document.getElementById("searchInput");
let con = document.getElementById("searchResults");
let url = "https://apis.ccbp.in/book-store";
let spinnerEl = document.getElementById("spinner");
let booklist;

function createAndAppend(book) {
    let {
        imageLink,
        author
    } = book;

    let bookcon = document.createElement("div");

    let img = document.createElement("img");
    img.src = imageLink;
    img.classList.add("image");
    bookcon.appendChild(img);

    let para = document.createElement("p");
    para.textContent = author;
    para.classList.add("para");
    bookcon.appendChild(para);
    bookcon.classList.add("col-6");
    con.appendChild(bookcon);

}

function display(results) {
    for (let i of results) {

        createAndAppend(i);
    }
}

let options = {
    method: "GET"
};
fetch(url, options)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        booklist = data;
        let {
            search_results
        } = data;
        display(search_results);
    });

function searchBook(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        con.textContent = "";

        let inp = input.value;
        let url1 = "https://apis.ccbp.in/book-store?title=" + inp;
        console.log(url1);
        let options = {
            method: "GET"
        };
        fetch(url1, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                booklist = data;
                let {
                    search_results
                } = data;
                display(search_results);
            });


    }

}

input.addEventListener("keydown", searchBook);