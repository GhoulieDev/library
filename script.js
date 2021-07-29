const showForm = document.getElementById('add-book');
const cancelForm = document.getElementById('cancel');
const form = document.getElementById('form');
const library = document.getElementById('library-container');

showForm.addEventListener('click', () => {
    form.style.display = 'block';
});

cancelForm.addEventListener('click', () => {
    form.style.display = 'none';
});

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
   displayBook(book);
}

function displayBook(book){
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    const bookTitle = document.createElement('p');
    bookTitle.textContent = book.title;

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

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(bookRead);
    library.appendChild(bookCard)
}

function displayLibrary(library){
    for(let book of library){
        displayBook(book);
    }
}


const book = new Book('test1', 'test', '234', true);
myLibrary.push(book);
const book2 = new Book('test2', 'test', '234', false);
myLibrary.push(book2);
const book3 = new Book('test3', 'test', '234', true);
myLibrary.push(book3);

displayLibrary(myLibrary);


