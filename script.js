const container = document.querySelector(".book-container");
const addBookBtn = document.getElementById("addBook");
const dialog = document.querySelector("dialog");
const cancelBtn = document.getElementById("cancel");
const bookForm = document.getElementById("bookForm");
const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});
cancelBtn.addEventListener("click", () => {
  bookForm.reset();
  dialog.close();
});

function addBookToLibrary(book) {
  myLibrary.push(book);
}
function displayBook() {
  container.innerHTML = " ";

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    bookCard.innerHTML = `
      <h2>${book.title}</h2>
      <p>By ${book.author}</p>
      <p>${book.pages} pages</p>
      <p>${book.read ? "Read" : "Not Read"}</p>
      <button class="remove" data-index="${index}">Remove</button>
    `;

    container.appendChild(bookCard);
  });

  document.querySelectorAll(".remove").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      myLibrary.splice(index, 1);
      displayBook();
    });
  });
}

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);
  displayBook();
  bookForm.reset();
  dialog.close();
});
