const showForm = document.getElementById('add-book');
const cancelForm = document.getElementById('cancel');
const form = document.getElementById('form');
const library = document.getElementById('library-container');

showForm.addEventListener('click', () => {
    form.style.display = 'block';
});

cancelForm.addEventListener('click', closeForm);

form.addEventListener('submit', event => {
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

function addBookToLibrary(){
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let haveRead = document.getElementById('read').checked;
    const book = new Book(title, author, pages, haveRead);
    myLibrary.push(book);
    let id = myLibrary.length-1;
    displayBook(book, id);
}

function displayBook(book, id){
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.dataset.id = id;
    
    const bookTitle = document.createElement('p');
    bookTitle.textContent = book.title;
    if(bookTitle.textContent.length > 20){
        bookTitle.style.fontSize = '16px';
    }

    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = book.author;

    const bookPages = document.createElement('p');
    bookPages.textContent = book.pages;

    const bookRead = document.createElement('button');
    if(book.haveRead){
        bookRead.textContent = 'Read';
    }else{
        bookRead.textContent = 'Not Read';
    }
    const removeBookButton = document.createElement('button');
    removeBookButton.textContent = 'Remove Book';
    removeBookButton.addEventListener('click', removeBook);
    
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(bookRead);
    bookCard.appendChild(removeBookButton);
    library.appendChild(bookCard);
}

function displayLibrary(library){
    for(let i = 0; i < library.length; i++){
        displayBook(library[i], i);
    }
}

function closeForm(){
    form.style.display = 'none'; 
}

function removeBook(event){
    myLibrary.splice(event.target.parentNode.dataset.id, 1);
    while(library.firstChild){
        library.removeChild(library.firstChild);
    }
    displayLibrary(myLibrary);
}




