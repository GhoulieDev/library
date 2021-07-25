let myLibrary = [];

function Book(title, author, pages, haveRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

function addBookToLibrary(){
    let title = prompt('Enter title');
    let author = prompt('Enter author');
    let pages = prompt('Enter pages');
    let haveRead = prompt('Have you read? T/F');
    const book = new Book(title, author, pages, haveRead)
    myLibrary.push(book);
}

addBookToLibrary()




