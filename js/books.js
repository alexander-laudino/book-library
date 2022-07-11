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
  let title = document.getElementById("bookTitle").value;
  let author = document.getElementById("bookAuthor").value;
  let pages = document.getElementById("bookPages").value;
  let read = document.querySelector('input[name="isBookRead"]:checked').value;
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  console.log("New book added: " + newBook.info());
  closeForm();
  document.querySelector(".formContainer").reset();
  displayBookPage();
}

function removeBookFromLibrary(ev) {
  let bookIndex = parseInt(
    ev.target.parentNode.parentNode.getAttribute("data-index")
  );
  myLibrary.splice(bookIndex, 1);
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
      bookDiv.setAttribute("data-index", `${i}`);
      let bookTitle = document.createElement("h3");
      bookTitle.setAttribute("class", "bookTitle");
      bookTitle.textContent = currBook.title;
      bookDiv.appendChild(bookTitle);
      let bookAuthor = document.createElement("h4");
      bookAuthor.setAttribute("class", "bookAuthor");
      bookAuthor.textContent = currBook.author;
      bookDiv.appendChild(bookAuthor);
      let bookPages = document.createElement("p");
      bookPages.textContent = `Pages: ${currBook.pages}`;
      bookDiv.appendChild(bookPages);
      let bookRead = document.createElement("p");
      bookRead.textContent = `Book read: ${currBook.read}`;
      bookDiv.appendChild(bookRead);
      let bookFunctionDiv = document.createElement("div");
      bookFunctionDiv.setAttribute("class", "bookFunctions");
      let removeBookButton = document.createElement("button");
      removeBookButton.setAttribute("type", "button");
      removeBookButton.setAttribute("class", "removeBook");
      removeBookButton.textContent = "Remove from Library";
      removeBookButton.addEventListener("click", removeBookFromLibrary, false);
      bookFunctionDiv.appendChild(removeBookButton);
      bookDiv.appendChild(bookFunctionDiv);
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
