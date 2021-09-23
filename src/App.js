import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import MyShelf from "./MyShelf.js";
import { Route } from "react-router-dom";
import SearchForm from "./SearchForm.js";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    allBooks: [],
  };
  componentDidMount() {
    BooksAPI.getAll().then((myallBooks) => {
      this.setState(() => ({
        allBooks: myallBooks,
      }));
    });
  }
  onUpdateShelf(book, nameOfNewShelf) {
    BooksAPI.update(book, nameOfNewShelf).then(() => {
      const theAvaliableBooks = this.state.allBooks;
      console.log(theAvaliableBooks);
      this.state.allBooks.map((b) => {
        if (b.id === book.id) {
          b.shelf = nameOfNewShelf;
        }
        return b;
      });

      this.setState(() => ({
        allBooks: theAvaliableBooks,
      }));
    });
  }

  render() {
    const myBooks = this.state.allBooks;
    console.log(myBooks);
    const currentlyReadingFilteration = myBooks.filter(
      (book) => book.shelf === "currentlyReading"
    );
    const wantToReadFilteration = myBooks.filter(
      (book) => book.shelf === "wantToRead"
    );
    const readFilteration = myBooks.filter((book) => book.shelf === "read");
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <MyShelf
                nameOfShelf={"currently reading"}
                books={currentlyReadingFilteration}
                UpdateShelf={this.onUpdateShelf.bind(this)}
              />
              <MyShelf
                nameOfShelf={"want to read"}
                books={wantToReadFilteration}
                UpdateShelf={this.onUpdateShelf.bind(this)}
              />
              <MyShelf
                nameOfShelf={"read"}
                books={readFilteration}
                UpdateShelf={this.onUpdateShelf.bind(this)}
              />
            </div>
          )}
        />
        <Route
          path="/SearchForm"
          render={() => (
            <SearchForm UpdateShelf={this.onUpdateShelf.bind(this)} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
