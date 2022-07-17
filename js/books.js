let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  changeReadStatus() {
    this.read = this.read === "yes" ? "no" : "yes";
  }
}

class BookDiv {
  #div;
  constructor(i) {
    this.#div = document.createElement("div");
    this.#div.setAttribute("class", "book");
    this.#div.setAttribute("id", `book${i}`);
    this.#div.setAttribute("data-index", `${i}`);
  }

  getElement() {
    return this.#div;
  }
}

class TitleH3 {
  #h3;
  constructor(title) {
    this.#h3 = document.createElement("h3");
    this.#h3.setAttribute("class", "bookTitle");
    this.#h3.textContent = title;
  }

  getElement() {
    return this.#h3;
  }
}

class AuthorH4 {
  #h4;
  constructor(author) {
    this.#h4 = document.createElement("h4");
    this.#h4.setAttribute("class", "bookAuthor");
    this.#h4.textContent = author;
  }

  getElement() {
    return this.#h4;
  }
}

class PagesPara {
  #p;
  constructor(pages) {
    this.#p = document.createElement("p");
    this.#p.textContent = `Pages: ${pages}`;
  }

  getElement() {
    return this.#p;
  }
}

function addBookPages(currBook, bookDiv) {
  let bookPages = document.createElement("p");
  bookPages;
  bookDiv.appendChild(bookPages);
}

function addIsBookRead(currBook, bookDiv) {
  let bookRead = document.createElement("p");
  bookRead.setAttribute("class", "isBookRead");
  bookRead.textContent = `Book read: ${currBook.read}`;
  bookDiv.appendChild(bookRead);
}

function addBookToLibrary() {
  let title = document.getElementById("bookTitle").value;
  let author = document.getElementById("bookAuthor").value;
  let pages = document.getElementById("bookPages").value;
  let read = document.querySelector('input[name="isBookRead"]:checked').value;
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  FormController.closeAddBookForm();
  document.querySelector(".formContainer").reset();
  displayBookPage();
}

function removeBookFromLibrary(e) {
  let bookIndex = parseInt(
    e.target.parentNode.parentNode.getAttribute("data-index")
  );
  myLibrary.splice(bookIndex, 1);
  displayBookPage();
}

function changeReadStatusOnPage(e) {
  let bookIndex = parseInt(
    e.target.parentNode.parentNode.getAttribute("data-index")
  );
  myLibrary[bookIndex].changeReadStatus();
  displayBookPage();
}

function displayBookPage(pageNum = 0) {
  const page = document.querySelector(".page");
  document
    .querySelectorAll(".book")
    .forEach((book) => book.parentNode.removeChild(book));
  for (let i = pageNum * 12; i < pageNum * 12 + 12; i++) {
    let currBook = myLibrary[i];
    if (currBook === undefined) {
      continue;
    } else {
      let bookDiv = new BookDiv(i);
      addBookTitle(currBook, bookDiv);
      addBookAuthor(currBook, bookDiv);
      addBookPages(currBook, bookDiv);
      addIsBookRead(currBook, bookDiv);
      addBookFunctionButtons(bookDiv);
      page.appendChild(bookDiv);
    }
  }
}

function addBookFunctionButtons(bookDiv) {
  let bookFunctionDiv = createBookFunctionsDiv();
  let removeBookButton = addRemoveBookButton();
  let changeReadStatusButton = addChangeReadStatusButton();
  bookFunctionDiv.appendChild(removeBookButton);
  bookFunctionDiv.appendChild(changeReadStatusButton);
  bookDiv.appendChild(bookFunctionDiv);
}

function createBookFunctionsDiv() {
  let bookFunctionDiv = document.createElement("div");
  bookFunctionDiv.setAttribute("class", "bookFunctions");
  return bookFunctionDiv;
}

function addChangeReadStatusButton() {
  let changeReadStatusButton = document.createElement("button");
  changeReadStatusButton.setAttribute("type", "button");
  changeReadStatusButton.setAttribute("class", "changeReadStatus");
  changeReadStatusButton.textContent = "Change Read Status";
  changeReadStatusButton.addEventListener("click", changeReadStatusOnPage),
    false;
  return changeReadStatusButton;
}

function addRemoveBookButton() {
  let removeBookButton = document.createElement("button");
  removeBookButton.setAttribute("type", "button");
  removeBookButton.setAttribute("class", "removeBook");
  removeBookButton.textContent = "Remove from Library";
  removeBookButton.addEventListener("click", removeBookFromLibrary, false);
  return removeBookButton;
}

class FormController {
  static openAddBookForm() {
    document.getElementById("popupForm").style.display = "block";
  }

  static getBookData() {
    return [
      document.getElementById("bookTitle").value,
      document.getElementById("bookAuthor").value,
      document.getElementById("bookPages").value,
      document.querySelector('input[name="isBookRead"]:checked').value,
    ];
  }

  static closeAddBookForm() {
    document.getElementById("popupForm").style.display = "none";
  }
}

class PageButtonController {
  static addListeners() {
    document
      .getElementById("addBook")
      .addEventListener("click", FormController.openAddBookForm);
    document
      .getElementById("cancelAddBook")
      .addEventListener("click", FormController.closeAddBookForm);
    document
      .getElementById("addToLibrary")
      .addEventListener("click", addBookToLibrary);
  }
}

PageButtonController.addListeners();
