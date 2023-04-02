
const bookList = document.getElementById('book-list');
let myLibrary = [];

function Book(title, author, pages, read){

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;

    this.readBook = function(){
        this.read = true;
    }

}

function addBookToLibrary(book){
    myLibrary[myLibrary.length] = book;
}

const book1 = new Book(
    'DieHard',
    'Bruce Whatshisface',
    500,
);

const book2 = new Book(
    'Who Wants To Be a Millionare',
    'Young Dame Judy Dench',
    1000000,
);

addBookToLibrary(book1);
addBookToLibrary(book2);

book2.readBook();

function displayLibrary(){

    // create a card for each book in the library consisting of its info
    for(let i = 0; i < myLibrary.length; i++){

        let newLi = document.createElement('li');

        let newBookTitle = document.createElement('div');
        newBookTitle.classList.add('book-title');

        let newBookAuthor = document.createElement('div');
        newBookAuthor.classList.add('book-author');

        let newBookPages = document.createElement('div');
        newBookPages.classList.add('book-pages');

        let newBookRead = document.createElement('div');
        newBookRead.classList.add('book-read');

        let bookTitle = document.createTextNode(myLibrary[i].title);
        let bookAuthor = document.createTextNode(`by ${myLibrary[i].author}`);
        let bookPages = document.createTextNode(`${myLibrary[i].pages} pages`);
        let bookRead = myLibrary[i].read == true ? document.createTextNode('You have read this book') : document.createTextNode('This book is unread');

        newBookTitle.appendChild(bookTitle);
        newBookAuthor.appendChild(bookAuthor);
        newBookPages.appendChild(bookPages);
        newBookRead.appendChild(bookRead);

        newLi.appendChild(newBookTitle);
        newLi.appendChild(newBookAuthor);
        newLi.appendChild(newBookPages);
        newLi.appendChild(newBookRead);

        bookList.appendChild(newLi);

    }
}

displayLibrary();