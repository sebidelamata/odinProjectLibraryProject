
const bookList = document.getElementById('book-list');
const bodyClass = document.getElementsByClassName('body');
const body = bodyClass[0];
const addBookButton = document.getElementById('add-book-button');
let deleteButtons;
let readButtons;
let myLibrary = [];

class Book{

    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = false;
    }

    readBook () {
        this.read = true;
    }

};

function addBookToLibrary(book){
    myLibrary[myLibrary.length] = book;
}


function displayLibrary(){

    // clear old library first
    while(bookList.hasChildNodes()){
        bookList.firstChild.remove();
    }

    // create a card for each book in the library consisting of its info
    for(let i = 0; i < myLibrary.length; i++){

        let newLi = document.createElement('li');
        newLi.setAttribute('id', `${i}`);

        let newBookTitle = document.createElement('div');
        newBookTitle.classList.add('book-title');

        let newBookAuthor = document.createElement('div');
        newBookAuthor.classList.add('book-author');

        let newBookPages = document.createElement('div');
        newBookPages.classList.add('book-pages');

        let newBookRead = document.createElement('div');
        newBookRead.classList.add('book-read');

        let newOptions = document.createElement('div');
        newOptions.classList.add('options');

        let newDelete = document.createElement('div');
        let newDeleteIcon = document.createElement('div');
        newDeleteIcon.innerHTML = '<i class="fa fa-trash-o fa-fw"></i>';
        let newDeleteText = document.createElement('div');
        newDeleteText.textContent = 'Remove';
        newDelete.classList.add('delete');

        let newRead = document.createElement('div');
        let newReadIcon = document.createElement('div');
        newReadIcon.innerHTML = '<i class="fa fa-book fa-fw"></i>';
        newReadIcon.setAttribute('id', `read-${i}`);
        let newReadText = document.createElement('div');
        newReadText.textContent = 'Mark as Read';
        newRead.classList.add('read');

        let bookTitle = document.createTextNode(myLibrary[i].title);
        let bookAuthor = document.createTextNode(`by ${myLibrary[i].author}`);
        let bookPages = document.createTextNode(`${myLibrary[i].pages} pages`);
        let bookRead = myLibrary[i].read == true ? document.createTextNode('You have read this book') : document.createTextNode('This book is unread');

        newBookTitle.appendChild(bookTitle);
        newBookAuthor.appendChild(bookAuthor);
        newBookPages.appendChild(bookPages);
        newBookRead.appendChild(bookRead);
        
        // style if a book has been read
        myLibrary[i].read == true ? newBookRead.style.fontStyle = 'italic' : newBookRead.style.fontWeight = '900';
        if(myLibrary[i].read == true){
            newBookRead.style.color = 'grey'
        };      

        newDelete.appendChild(newDeleteIcon);
        newDelete.appendChild(newDeleteText);
        newRead.appendChild(newReadIcon);
        newRead.appendChild(newReadText);
        newOptions.appendChild(newDelete);
        newOptions.appendChild(newRead);

        newLi.appendChild(newBookTitle);
        newLi.appendChild(newBookAuthor);
        newLi.appendChild(newBookPages);
        newLi.appendChild(newBookRead);
        newLi.appendChild(newOptions);

        bookList.appendChild(newLi);

    }


    // need to do for each existing li add lister fo remove/read
    deleteButtons = document.querySelectorAll('.delete');

    if(deleteButtons !== undefined && deleteButtons.length > 0){

        deleteButtons.forEach(function(button) {
            button.addEventListener('click', removeBook);
        });
    
    }
    
    readButtons = document.querySelectorAll('.read');

    if(readButtons !== undefined && readButtons.length > 0){

        readButtons.forEach(function(button) {
            button.addEventListener('click', markBookRead);
        });
    
    }

    console.log(myLibrary);

}

function createFormOnButtonClick(){

    let formDiv = document.createElement('div');
    formDiv.setAttribute('id', 'add-book-form-container');

    let greyout = document.createElement('div');
    greyout.setAttribute('id', 'greyout');

    let form = document.createElement('form');
    form.setAttribute('id', 'form');

    let formNewBookTitle = document.createElement('label')
    formNewBookTitle.setAttribute('for', 'title')
    let formNewBookTitleText = document.createTextNode('Title');
    formNewBookTitle.appendChild(formNewBookTitleText);
    let formNewBookTitleInput = document.createElement('input');
    formNewBookTitleInput.setAttribute('type', 'text');
    formNewBookTitleInput.setAttribute('id', 'title');
    formNewBookTitleInput.setAttribute('name', 'title');
    formNewBookTitleInput.required = true;

    let formNewBookAuthor = document.createElement('label')
    formNewBookAuthor.setAttribute('for', 'author')
    let formNewBookAuthorText = document.createTextNode('Author');
    formNewBookAuthor.appendChild(formNewBookAuthorText);
    let formNewBookAuthorInput = document.createElement('input');
    formNewBookAuthorInput.setAttribute('type', 'text');
    formNewBookAuthorInput.setAttribute('id', 'author');
    formNewBookAuthorInput.setAttribute('name', 'author');
    formNewBookAuthorInput.required = true;

    let formNewBookPages = document.createElement('label')
    formNewBookPages.setAttribute('for', 'pages')
    let formNewBookPagesText = document.createTextNode('Pages');
    formNewBookPages.appendChild(formNewBookPagesText);
    let formNewBookPagesInput = document.createElement('input');
    formNewBookPagesInput.setAttribute('type', 'number');
    formNewBookPagesInput.min = 1;
    formNewBookPagesInput.setAttribute('id', 'pages');
    formNewBookPagesInput.setAttribute('name', 'pages');

    let formNewBookRead = document.createElement('label')
    formNewBookRead.setAttribute('for', 'read')
    let formNewBookReadText = document.createTextNode("I've Already Read This");
    formNewBookRead.appendChild(formNewBookReadText);
    let formNewBookReadInput = document.createElement('input');
    formNewBookReadInput.setAttribute('type', 'checkbox');
    formNewBookReadInput.setAttribute('id', 'read');
    formNewBookReadInput.setAttribute('name', 'read');

    let formNewBookSubmit = document.createElement('input');
    formNewBookSubmit.setAttribute('type', 'submit');
    formNewBookSubmit.setAttribute('value', 'submit');
    formNewBookSubmit.setAttribute('id', 'submit');

    formDiv.appendChild(form);
    form.appendChild(formNewBookTitle);
    form.appendChild(formNewBookTitleInput);
    form.appendChild(formNewBookAuthor);
    form.appendChild(formNewBookAuthorInput);
    form.appendChild(formNewBookPages);
    form.appendChild(formNewBookPagesInput);
    form.appendChild(formNewBookRead);
    form.appendChild(formNewBookReadInput);
    form.appendChild(formNewBookSubmit);

    body.appendChild(formDiv);
    body.appendChild(greyout);

    // remove form if they click outside the box
    let greyoutDiv = document.getElementById('greyout');
    let addBookFormContainer = document.getElementById('add-book-form-container');
    let Bookform = document.getElementById('form');

    function submitNewBook(){
 
        let titleInput = document.getElementById('title').value;
        let authorInput = document.getElementById('author').value;
        let pagesInput = document.getElementById('pages').value;
        let readInput = document.getElementById('read').checked;

        bookList.innerHTML = '';

        let newBook = new Book(
            titleInput,
            authorInput,
            pagesInput,
        )

        addBookToLibrary(newBook);

        if(readInput == true){
            newBook.readBook();
        }

        displayLibrary();
    
    }

    function removeForm(){
    
        greyoutDiv.remove();
        addBookFormContainer.remove();
    
    }

    function submitButtonClick(e){

        submitNewBook();
        e.preventDefault();
        removeForm();

    }

    greyoutDiv.addEventListener('click', removeForm);
    Bookform.addEventListener('submit', submitButtonClick, false);


}

// remove book card
function removeBook(e){

    let button = e.target;

    let bookIndex = button.parentNode.parentNode.parentNode.id;

    if(button.classList[0] === 'fa'){
        bookIndex = button.parentNode.parentNode.parentNode.parentNode.id;
    }

    myLibrary.splice(bookIndex, 1);

    displayLibrary();

}

// similar to above
function markBookRead(e){

    let button = e.target;

    let bookIndex = button.parentNode.parentNode.parentNode.id;

    if(button.classList[0] === 'fa'){
        bookIndex = button.parentNode.parentNode.parentNode.parentNode.id;
    }

    myLibrary[bookIndex].readBook();

    displayLibrary();
}


displayLibrary();

addBookButton.addEventListener('click', createFormOnButtonClick);


