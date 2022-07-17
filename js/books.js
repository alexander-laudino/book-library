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

class BookReadPara {
  #p;
  constructor(read) {
    this.#p = document.createElement("p");
    this.#p.setAttribute("class", "isBookRead");
    this.#p.textContent = `Book read: ${read}`;
  }

  getElement() {
    return this.#p;
  }
}

class BookFunctionsDiv {
  #div;
  constructor() {
    this.#div = document.createElement("div");
    this.#div.setAttribute("class", "bookFunctions");
  }

  getElement() {
    return this.#div;
  }
}

class ReadStatusButton {
  #button;
  constructor() {
    this.#button = document.createElement("button");
    this.#button.setAttribute("type", "button");
    this.#button.setAttribute("class", "changeReadStatus");
    this.#button.textContent = "Change Read Status";
    this.#button.addEventListener("click", changeReadStatusOnPage), false;
  }

  getElement() {
    return this.#button;
  }
}

class RemoveBookButton {
  #button;
  constructor() {
    this.#button = document.createElement("button");
    this.#button.setAttribute("type", "button");
    this.#button.setAttribute("class", "removeBook");
    this.#button.textContent = "Remove from Library";
    this.#button.addEventListener("click", removeBookFromLibrary, false);
  }

  getElement() {
    return this.#button;
  }
}

class BookFunctionButtonsDiv {
  #div;
  #removeButton;
  #statusButton;
  constructor() {
    this.#div = new BookFunctionsDiv().getElement();
    this.#removeButton = new RemoveBookButton().getElement();
    this.#statusButton = new ReadStatusButton().getElement();
    this.#div.appendChild(this.#removeButton);
    this.#div.appendChild(this.#statusButton);
  }

  getElement() {
    return this.#div;
  }
}

class BookPageBuilder {
  #title;
  #author;
  #pages;
  #read;
  #bookPage;
  #titleH3;
  #authorH4;
  #pagesPara;
  #bookReadPara;
  #bookFunctionsDiv;
  constructor(currBook, i) {
    this.#title = currBook.title;
    this.#author = currBook.author;
    this.#pages = currBook.pages;
    this.#read = currBook.read;
    this.#bookPage = new BookDiv(i).getElement();
    this.#titleH3 = new TitleH3(this.#title).getElement();
    this.#authorH4 = new AuthorH4(this.#author).getElement();
    this.#pagesPara = new PagesPara(this.#pages).getElement();
    this.#bookReadPara = new BookReadPara(this.#read).getElement();
    this.#bookFunctionsDiv = new BookFunctionButtonsDiv().getElement();
    this.#bookPage.appendChild(this.#titleH3);
    this.#bookPage.appendChild(this.#authorH4);
    this.#bookPage.appendChild(this.#pagesPara);
    this.#bookPage.appendChild(this.#bookReadPara);
    this.#bookPage.appendChild(this.#bookFunctionsDiv);
  }

  getElement() {
    return this.#bookPage;
  }
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
      let bookDiv = new BookPageBuilder(currBook, i).getElement();
      page.appendChild(bookDiv);
    }
  }
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
