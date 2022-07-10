let myLibrary = [];
const addBookButton = document.getElementById("addBook");
const cancelAddBookButton = document.getElementById("cancelAddBook");
const addToLibraryButton = document.getElementById("addToLibrary");
const page = document.querySelector(".page");

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
  let read = prompt("Has book been read?");
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  console.log("New book added: " + newBook.info());
  closeForm();
  displayBookPage();
}

function displayBookPage(pageNum = 0) {
  document
    .querySelectorAll(".book")
    .forEach((book) => book.parentNode.removeChild(book));
  for (let i = pageNum * 12; i < pageNum * 12 + 12; i++) {
    let currBook = myLibrary[i];
    if (currBook === undefined) {
      continue;
    } else {
      let bookDiv = document.createElement("div");
      bookDiv.setAttribute("class", "book");
      bookDiv.setAttribute("id", `book${i}`);
      bookDiv.textContent = currBook.title;
      page.appendChild(bookDiv);
    }
  }
}

function openForm() {
  document.getElementById("popupForm").style.display = "block";
}
function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}

addBookButton.addEventListener("click", openForm);
cancelAddBookButton.addEventListener("click", closeForm);
addToLibraryButton.addEventListener("click", addBookToLibrary);

const bookA = new Book("The Hobbit", "J.R.R. Tolkien", 295, "Not read");
const bookB = new Book("The Hobbit", "J.R.R. Tolkien", 295, "Not read");
const bookC = new Book("The Hobbit", "J.R.R. Tolkien", 295, "Not read");

myLibrary.push(bookA, bookB, bookC);
