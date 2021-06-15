function findAccountById(accounts, id) {
  const accountObject = accounts.find((account) => account.id === id);
  return accountObject;
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((nameA, nameB) =>
    nameA.name.last.toLowerCase() < nameB.name.last.toLowerCase() ? -1 : 1
  );
}

function getTotalNumberOfBorrows(account, books) {
  let totalBorrows = 0;
  const accountId = account.id;
  books.forEach((book) => {
    totalBorrows += book.borrows.filter(
      (element) => element.id === accountId
    ).length;
  });
  return totalBorrows;
}

// hi there

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;
  const currentlyBorrowed = books.reduce((acc, book) => {
    book.borrows.forEach((element) => {
      if (element.id === accountId && element.returned === false) {
        book["author"] = authors.filter(
          (author) => book.authorId === author.id
        )[0];
        acc.push(book);
      }
    });
    return acc;
  }, []);
  return currentlyBorrowed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
