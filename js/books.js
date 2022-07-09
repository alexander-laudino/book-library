let myLibrary = [];
const addBookButton = document.getElementById("addBook");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

function addBookToLibrary() {
  let title = prompt("Enter book title:");
  let author = prompt("Enter book author:");
  let pages = parseInt(prompt("Enter book pages:"));
  let read = prompt("Have book been read?");
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  console.log("New book added: " + newBook.info());
}

addBookButton.addEventListener("click", addBookToLibrary);
