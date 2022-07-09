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

function displayBookPage() {
  document
    .querySelectorAll(".book")
    .forEach((book) => book.parentNode.removeChild(book));
}

addBookButton.addEventListener("click", addBookToLibrary);

const bookA = new Book("The Hobbit", "J.R.R. Tolkien", 295, "Not read");
const bookB = new Book("The Hobbit", "J.R.R. Tolkien", 295, "Not read");
const bookC = new Book("The Hobbit", "J.R.R. Tolkien", 295, "Not read");

myLibrary.push(bookA, bookB, bookC);
