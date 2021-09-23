import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book.js";
import * as BooksAPI from "./BooksAPI.js";

class SearchForm extends Component {
  state = {
    query: "",
    thebooks: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        thebooks: books,
      }));
    });
  }

  changeQueryValue = (query) => {
    this.setState(() => ({
      query: query.trim(),
    }));
  };

  render() {
    const avaliableBooks = this.state.thebooks;
    const afterFilteration = avaliableBooks.filter((book) =>
      book.title.toLowerCase().includes(this.state.query.toLowerCase())
    );

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
              {afterFilteration.map((book) => (
                <Book me={book} onClick={this.props.UpdateShelf} />
              ))}
            </ol>
          </div>
        )}
      </div>
    );
  }
}
export default SearchForm;
