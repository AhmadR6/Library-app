const container = document.querySelector(".book-container");
const addBookBtn = document.getElementById("addBook");
const dialog = document.querySelector("dialog");
const cancelBtn = document.getElementById("cancel");
const bookForm = document.getElementById("bookForm");
const myLibrary = [
  { title: "The Hobbit", author: "J.R.R. Tolkien", pages: 295, read: true },
  {
    title: "The Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    pages: 398,
    read: true,
  },
  { title: "The Two Towers", author: "J.R.R. Tolkien", pages: 327, read: true },
  {
    title: "The Return of the King",
    author: "J.R.R. Tolkien",
    pages: 347,
    read: true,
  },
];
displayBook();
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
      <button class="read" data-index="${index}">${
      book.read ? "Unread" : "Read"
    }</button>
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
  document.querySelectorAll(".read").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      myLibrary[index].read = !myLibrary[index].read;
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
