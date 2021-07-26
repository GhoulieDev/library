let myLibrary = [];

function Book(title, author, pages, haveRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

function addBookToLibrary(){
    myLibrary.push(harry);
    myLibrary.push(game);
    myLibrary.push(witcher);
    myLibrary.push(shan);
}

function displayBooks(library){
    for(let book of library){
        console.log(book.title)
    }

}

const harry = new Book('Harry Potter', 'JK Rowling', '250', false)
const game = new Book('Game Of Thrones', 'George RR', '650', true)
const witcher = new Book('Witcher', 'Androv Sapjowski', '500', true)
const shan = new Book('Cirque Du Freak', 'Darren Shan', '305', true)

addBookToLibrary()
displayBooks(myLibrary)




