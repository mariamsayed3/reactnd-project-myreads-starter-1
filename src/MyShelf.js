import React, { Component } from "react";
import Book from "./Book.js";
import { Link } from "react-router-dom";

class MyShelf extends Component {
  render() {
    const myBooks = this.props.books;
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.nameOfShelf}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {myBooks.map((book) => (
                <Book me={book} id={book.id} onClick={this.props.UpdateShelf} />
              ))}
            </ol>
          </div>
        </div>
        <Link className="open-search" to="/search">
          Add new book
        </Link>
      </div>
    );
  }
}

export default MyShelf;
