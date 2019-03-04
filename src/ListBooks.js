import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import './App.css'

class SearchBooks extends Component {
  getBooksByShelf(books, shelfName) {
    return books.filter(book => book.shelf === shelfName);
  }

  render() {
    const { books } = this.props

    const shelfStatus = [
      { key: 'currentlyReading', title: 'Currently Reading' },
      { key: 'wantToRead', title: 'Want to Read' },
      { key: 'read', title: 'Read' }
    ];

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          {shelfStatus.map((status) => {
            return (
              <div className="bookshelf" key={status.key}>
                <h2 className="bookshelf-title">{status.title}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.getBooksByShelf(books, status.key).map((book) => (
                      <li key={book.id}>
                          <Book book={book} onChangeBookShelf={this.props.onChangeBookShelf}/>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )
          })}

          <div className="open-search">
            <Link 
              to="/search"
              >Add a book</Link>
          </div>
        </div>
      </div>
  )}
}

export default SearchBooks;