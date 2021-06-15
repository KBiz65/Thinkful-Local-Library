function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.filter((book) => book.borrows[0].returned === false).length;
}

function getMostCommonGenres(books) {
  // I preferred not to do this with a map method as I was able to write the code more
  // effectively without it but it was a requirement of the assignment.
  const count = books.reduce((acc, { genre }) => {
    if (acc[genre]) {
      acc[genre] += 1;
    } else {
      acc[genre] = 1;
    }
    return acc;
  }, {});

  const sorted = _sortObjectByValues(count);

  return sorted.map((name) => ({ name, count: count[name] })).slice(0, 5);
}

function getMostPopularBooks(books) {
  let mostPopularBooks = [];
  books.sort((bookA, bookB) =>
    bookA.borrows.length < bookB.borrows.length ? 1 : -1
  );

  for (const book of books) {
    const bookObject = { name: book.title, count: book.borrows.length };
    mostPopularBooks.push(bookObject);
  }
  return mostPopularBooks.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  let mostPopularAuthors = [];
  for (const author of authors) {
    // first we need to call a helper function to get and array of
    // all books by a specific author.
    let booksByAuthor = _getBooksByAuthor(books, author.id);
    let borrowedCount = 0;
    for (const book of booksByAuthor) {
      borrowedCount += book.borrows.length;
    }
    // this will create the author object with the author's name and
    // number of times their books have been checked out.
    const authorObject = {
      name: `${author["name"].first} ${author["name"].last}`,
      count: borrowedCount,
    };
    mostPopularAuthors.push(authorObject);
  }
  return mostPopularAuthors
    .sort((authorA, authorB) => (authorA.count < authorB.count ? 1 : -1))
    .slice(0, 5);
}

// HELPER FUCTIONS
function _getBooksByAuthor(books, authorId) {
  return books.filter((book) => book.authorId === authorId);
}

function _sortObjectByValues(object) {
  const keys = Object.keys(object);
  return keys.sort((keyA, keyB) => {
    if (object[keyA] > object[keyB]) {
      return -1;
    } else if (object[keyB] > object[keyA]) {
      return 1;
    } else {
      return 0;
    }
  });
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
