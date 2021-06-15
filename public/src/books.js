function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let borrowedBooks = [];
  let availableBooks = [];
  // use of ternary operator so I only have to look at the value of returned once
  books.forEach((book) => {
    book.borrows[0].returned === false
      ? borrowedBooks.push(book)
      : availableBooks.push(book);
  });
  // each of the variables are arrays which will let us return an array of two arrays.
  return [borrowedBooks, availableBooks];
}

function getBorrowersForBook(book, accounts) {
  const bookBorrows = book.borrows;
  let bookTransactions = [];
  bookBorrows.forEach((transaction) => {
    let accountInfo = accounts.find((account) => account.id === transaction.id);
    accountInfo["returned"] = transaction.returned;
    bookTransactions.push(accountInfo);
  });
  //only need to return the first 10 items in the array.
  return bookTransactions.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
