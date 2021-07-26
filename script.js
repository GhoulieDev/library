const bookContainer = document.getElementById('library')

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
    
    
}

function displayBooks(library){
    for(let book of library){
        
        
    }

}



const harry = new Book('Harry Potter', 'JK Rowling', '250', false)
const game = new Book('Game Of Thrones', 'George RR', '650', true)
const witcher = new Book('Witcher', 'Androv Sapjowski', '500', true)


addBookToLibrary()
displayBooks(myLibrary)





