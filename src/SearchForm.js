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
                    <Book me={b} id={b.id} onClick={this.props.UpdateShelf} />
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
