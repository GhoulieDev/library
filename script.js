const showForm = document.getElementById('add-book');
const cancelForm = document.getElementById('cancel');
const form = document.getElementById('form');
const library = document.getElementById('library-container');

showForm.addEventListener('click', () => {
    form.style.display = 'block';
});

cancelForm.addEventListener('click', closeForm);

form.addEventListener('submit', event => {
    //Stops the default behaviour of a submitted form refreshing the page becuase currently thats not wanted behaviour
    event.preventDefault();
    addBookToLibrary();
    form.reset();
    closeForm();
});

class BookClass {
    constructor(title, author, pages, haveRead){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.haveRead = haveRead;
    }

    toggleRead = (event) => {
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
        setStorage(myLibrary);
    }
}

function addBookToLibrary(){
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let haveRead = document.getElementById('read').checked;
    const book = new BookClass(title, author, pages, haveRead);
    myLibrary.push(book);
    //Sets the id of a new book to be the last entry value of the array, as a new book will always be at the end
    let id = myLibrary.length-1;
    displayBook(book, id);
    setStorage(myLibrary);
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
    //Bind to pass in the book object for using with 'this' inside the toggleRead prototype method to prevent the default use of referencing the button
    //bookRead.addEventListener('click', book.toggleRead.bind(book));

    //No need for .bind now that I've converted to classes because the context of 'this' in the toggle read method has been bound to the object via the constructor
    bookRead.addEventListener('click', book.toggleRead);
   
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
    //Accesses the bookCard of the node that the remove button was fired on, removes it from the array of books via data-id
    myLibrary.splice(event.target.parentNode.dataset.id, 1);
    while(library.firstChild){
        library.removeChild(library.firstChild);
    }
    displayLibrary(myLibrary);
    setStorage(myLibrary)
}

function displayLibrary(library){
    for(let i = 0; i < library.length; i++){
        displayBook(library[i], i);
    }
}

function closeForm(){
    form.style.display = 'none'; 
}

//Local storage keys/values are always stored as strings so we need to make use of the stringify to send them and parse to receive them back into our program as objects
function setStorage(array){
    localStorage.setItem('library', JSON.stringify(array));
}

function getStorage(){
    if(localStorage.library){
        return JSON.parse(localStorage.getItem('library'));
    }else{
        return []
    }
}

//When receiveing parsed objects back from local storage the prototype methods are lost so we use the Book constructor to remake them
function reconstructLibrary(array){
    return array.map(obj => {
        const book = new BookClass(obj.title, obj.author, obj.pages, obj.haveRead);
        return book;
    })
}

let myLibrary = reconstructLibrary(getStorage());
displayLibrary(myLibrary);

