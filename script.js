/**
 * 1. THE DATA STRUCTURE
 */
const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID(); // Creates a unique stable ID
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read; 
}

// Prototype method: Shared by all book instances to save memory
Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

/**
 * 2. THE CORE LOGIC
 */
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  return newBook;
}

/**
 * 3. THE UI DISPLAY
 */
const libraryContainer = document.querySelector('#library-display');

function displayBooks() {
  // Always clear the old HTML before redrawing the updated array
  libraryContainer.innerHTML = ""; 

  myLibrary.forEach((book) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.setAttribute('data-id', book.id); // The "Bridge" between HTML and JS
    
    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>By: ${book.author}</p>
      <p>${book.pages} pages</p>
      <button class='status-btn'>${book.read ? "Read" : "Not Read"}</button>
      <button class="remove-btn">Remove</button>
    `;
    libraryContainer.appendChild(bookCard);
  });
}

/**
 * 4. EVENT LISTENERS
 */

// A. Handle Clicks inside the Library (Delete & Toggle)
libraryContainer.addEventListener("click", (e) => {
  // Use .closest to find the card even if we clicked the text inside the button
  const bookCard = e.target.closest('.book-card');
  if (!bookCard) return; // Ignore clicks that aren't on a card

  const bookId = bookCard.getAttribute("data-id");
  const index = myLibrary.findIndex(book => book.id === bookId);

  // If "Remove" was clicked
  if (e.target.classList.contains("remove-btn")) {
    myLibrary.splice(index, 1);
    displayBooks();
  }

  // If "Status" was clicked
  if (e.target.classList.contains("status-btn")) {
    myLibrary[index].toggleRead();
    displayBooks();
  }
});

// B. Form & Dialog Logic
const dialog = document.querySelector("#book-dialog");
const showFormBtn = document.querySelector("#show-form");
const bookForm = document.querySelector("#book-form");

// Open the modal
showFormBtn.addEventListener("click", () => dialog.showModal());

// Handle form submission
bookForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents the page from refreshing/reloading
  
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").checked;

  addBookToLibrary(title, author, pages, read);
  displayBooks();
  
  bookForm.reset(); // Clears the inputs for the next time
  dialog.close();   // Closes the modal
});

// cancel btn



document.getElementById('cancelBtn').addEventListener('click', cancelEntry)
function cancelEntry() {
  const bookForm = document.getElementById("book-form");
  if (confirm("Are you sure you want to cancel? Progress will be lost.")) {
    
    bookForm.reset();           // THIS is what actually clears the text boxes
    bookForm.classList.add('hidden'); // This hides the form from view
    
  }
}

/**
 * 5. INITIALIZATION
 */
// Add a starter book so the screen isn't empty
addBookToLibrary('Gunner', 'Mike', 123, true);
displayBooks();