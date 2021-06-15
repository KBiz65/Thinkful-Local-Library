function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let borrowedBooks = [];
  let availableBooks = [];
  books.forEach((book) => {
    book.borrows[0].returned === false
      ? borrowedBooks.push(book)
      : availableBooks.push(book);
  });
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
  return bookTransactions.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
