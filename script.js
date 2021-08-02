const showForm = document.getElementById('add-book');
const cancelForm = document.getElementById('cancel');
const form = document.getElementById('form');
const library = document.getElementById('library-container');

showForm.addEventListener('click', () => {
    form.style.display = 'block';
});

cancelForm.addEventListener('click', closeForm);

form.addEventListener('submit', event => {
    //stops the default behaviour of a submitted form refreshing the page becuase currently thats not wanted behaviour
    event.preventDefault();
    addBookToLibrary();
    form.reset();
    closeForm();
});

let myLibrary = [];

function Book(title, author, pages, haveRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

Book.prototype.toggleRead = function(event){
    console.log(this)
    if(this.haveRead){
        event.target.textContent = 'Not Read'
        event.target.classList.remove('read');
        event.target.classList.add('not-read');  
    }else{
        event.target.textContent = 'Read'
        event.target.classList.remove('not-read');
        event.target.classList.add('read');  
    }
    this.haveRead = !this.haveRead;
    console.log(this)
    
    // let id = event.target.parentNode.dataset.id;
    // if(myLibrary[id].haveRead){
    //     myLibrary[id].haveRead = !myLibrary[id].haveRead
    //     event.target.textContent = 'Not Read'
    //     event.target.classList.remove('read');
    //     event.target.classList.add('not-read');
    // }else{
    //     myLibrary[id].haveRead = !myLibrary[id].haveRead
    //     event.target.textContent = 'Read'
    //     event.target.classList.remove('not-read');
    //     event.target.classList.add('read'); 
    // }
}

function addBookToLibrary(){
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let haveRead = document.getElementById('read').checked;
    const book = new Book(title, author, pages, haveRead);
    myLibrary.push(book);
    //sets the id of a new book to be the last entry value of the array, as a new book will always be at the end
    let id = myLibrary.length-1;
    displayBook(book, id);
}

function displayBook(book, id){
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.dataset.id = id;
    
    const bookTitle = document.createElement('p');
    bookTitle.textContent = book.title;
    bookTitle.style.fontWeight = 600;
    if(bookTitle.textContent.length > 20){
        bookTitle.style.fontSize = '16px';
    }
    
    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = book.author;

    const bookPages = document.createElement('p');
    bookPages.textContent = book.pages + ' pages';

    const bookRead = document.createElement('button');
    //bind to pass in the book object for using with 'this' inside the toggleRead prototype method to prevent the default use of referencing the button
    bookRead.addEventListener('click', book.toggleRead.bind(book));
    if(book.haveRead){
        bookRead.textContent = 'Read';
        bookRead.classList.add('read')
    }else{
        bookRead.textContent = 'Not Read';
        bookRead.classList.add('not-read')
    }
    const removeBookButton = document.createElement('button');
    removeBookButton.textContent = 'Remove';
    removeBookButton.classList.add('remove')
    removeBookButton.addEventListener('click', removeBook);
    
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(bookRead);
    bookCard.appendChild(removeBookButton);
    library.appendChild(bookCard);
}

function removeBook(event){
    //accesses the bookCard of the node that the remove button was fired on, removes it from the array of books via data-id
    myLibrary.splice(event.target.parentNode.dataset.id, 1);
    while(library.firstChild){
        library.removeChild(library.firstChild);
    }
    displayLibrary(myLibrary);
}

function displayLibrary(library){
    for(let i = 0; i < library.length; i++){
        displayBook(library[i], i);
    }
}

function closeForm(){
    form.style.display = 'none'; 
}


