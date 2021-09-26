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
    this.setState(
      { query: query },
      this.searchForSpecificBook(this.state.query)
    );
  };
  searchForSpecificBook(stateValue) {
    if (stateValue !== "") {
      BooksAPI.search(stateValue).then((theTargetBook) => {
        this.setState(() => ({
          thebooks: theTargetBook,
        }));
      });
    } else {
      this.setState({ query: "" });
    }
  }
  checking(arrayofbooks, stateQuery) {
    if (
      arrayofbooks !== undefined &&
      arrayofbooks !== [] &&
      stateQuery !== "" &&
      Array.isArray(arrayofbooks)
    )
      return true;
    else return false;
  }

  render() {
    let avaliableBooks;
    const propBooks = this.props.apiBooks;
    if (Array.isArray(this.state.thebooks) && Array.isArray(propBooks)) {
      avaliableBooks = this.state.thebooks.map((searchedBook) => {
        const myBook = propBooks.filter(
          (myBook) => myBook.id === searchedBook.id
        )[0];
        if (myBook) searchedBook.shelf = myBook.shelf;
        else searchedBook.shelf = "none";
        return searchedBook;
      });
    }
    const { queryState } = this.state.query;
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

        {this.state.query !== "" && (
          <div className="search-books-results">
            <ol className="books-grid">
              {this.checking(avaliableBooks, queryState) &&
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
