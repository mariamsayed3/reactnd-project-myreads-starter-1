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
      this.assignShelf(theTargetBook);
      const newState = this.state.thebooks;
      if (Array.isArray(newState)) {
        theTargetBook.map((book) => {
          if (book.hasOwnProperty("shelf") === false) {
            book.shelf = "none";
            BooksAPI.update(book, book.shelf);
          }
          return book;
        });
      }
      this.setState(() => ({
        thebooks: newState,
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
    const avaliableBooks = this.state.thebooks;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" />
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.state.query}
              onChange={(event) => this.changeQueryValue(event.target.value)}
            />
          </div>
        </div>
        {this.state.query !== "" && (
          <div search-books-results>
            <ol className="books-grid">
              {avaliableBooks !== undefined &&
                avaliableBooks !== [] &&
                this.state.query !== "" &&
                Array.isArray(avaliableBooks) &&
                avaliableBooks.map((b) => {
                  return (
                    <Book me={b} key={b.id} onClick={this.props.UpdateShelf} />
                  );
                })}
            </ol>
          </div>
        )}
      </div>
    );
  }
}
export default SearchForm;
