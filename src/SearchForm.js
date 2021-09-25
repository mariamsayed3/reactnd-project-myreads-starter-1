import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book.js";
import * as BooksAPI from "./BooksAPI.js";

class SearchForm extends Component {
  state = {
    query: "",
    thebooks: [],
  };

  changeQueryValue = (query) => {
    this.setState(() => ({
      query: query,
    }));
    if (this.state.query !== "") {
      this.searchForSpecificBook();
    }
  };
  searchForSpecificBook() {
    BooksAPI.search(this.state.query).then((theTargetBook) => {
      this.setState(() => ({
        thebooks: theTargetBook,
      }));
    });
  }
  assignShelf(result) {
    const theAPIbooks = this.props.apiBooks;
    if (Array.isArray(theAPIbooks) && theAPIbooks !== []) {
      theAPIbooks.map((apibook) => {
        this.nestedloops(apibook, result);
      });
    }
  }

  nestedloops(everybookinsideAPI, mapValue) {
    if (Array.isArray(mapValue) && mapValue !== []) {
      mapValue.map((mybook) => {
        if (mybook.id === everybookinsideAPI.id) {
          mybook.shelf = everybookinsideAPI.shelf;
          BooksAPI.update(mybook, everybookinsideAPI.shelf);
        }
        return mybook;
      });
    }
    this.setState(() => ({
      thebooks: mapValue,
    }));
  }

  render() {
    let avaliableBooks;
    if (Array.isArray(this.state.thebooks)) {
      avaliableBooks = this.state.thebooks.map((searchedBook) => {
        const myBook = this.props.apiBooks.filter(
          (myBook) => myBook.id === searchedBook.id
        )[0];
        if (myBook) searchedBook.shelf = myBook.shelf;
        else searchedBook.shelf = "none";
        return searchedBook;
      });
    }
    const { queryState } = this.state.query;
    const { updateShelf } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" />
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={queryState}
              onChange={(event) => this.changeQueryValue(event.target.value)}
            />
          </div>
        </div>
        {queryState !== "" && (
          <div search-books-results>
            <ol className="books-grid">
              {avaliableBooks !== undefined &&
                avaliableBooks !== [] &&
                queryState !== "" &&
                Array.isArray(avaliableBooks) &&
                avaliableBooks.map((b) => {
                  return <Book me={b} key={b.id} onClick={updateShelf} />;
                })}
            </ol>
          </div>
        )}
      </div>
    );
  }
}
export default SearchForm;
