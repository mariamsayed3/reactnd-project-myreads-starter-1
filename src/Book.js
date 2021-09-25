import React, { Component } from "react";

class Book extends Component {
  bookAuthor(arrayOfAuthors) {
    arrayOfAuthors.map((author) => <div> {author}</div>);
  }
  changeMeShelf(book, nameOfTheUpdatedShelf) {
    this.props.onClick(book, nameOfTheUpdatedShelf);
  }

  render() {
    const am = this.props.me;
    return (
      <li>
        <div className="book">
          <div className="book-top" key={this.props.id}>
            {am.hasOwnProperty("imageLinks") ? (
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 160,
                  backgroundImage: `url(${am.imageLinks.thumbnail})`,
                }}
              />
            ) : (
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 160,
                }}
              />
            )}
            <div className="book-shelf-changer">
              <select
                onChange={(event) => {
                  this.changeMeShelf(am, event.target.value);
                }}
                defaultValue={am.shelf}
              >
                <option value="move">Move to...</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{am.title}</div>
          {am.authors !== [] && am.hasOwnProperty("authors") && (
            <div className="book-authors">
              {am.authors.map((author, index) => {
                return <p key={index}>{author}</p>;
              })}
            </div>
          )}
        </div>
      </li>
    );
  }
}
export default Book;
