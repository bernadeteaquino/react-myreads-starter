import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import './App.css'

class SearchBooks extends Component {
  render() {
    const { booksOnTheShelf } = this.props

    const status = [
      { status: 'currentlyReading', title: 'Currently Reading' },
      { status: 'wantToRead', title: 'Want to Read' },
      { status: 'read', title: 'Read' }
    ];

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          {status.map((value) => {

console.log(booksOnTheShelf)
             console.log(Object.keys(booksOnTheShelf).length)
             console.log(value.status)
            return (
             
              <div className="bookshelf" key={value.status}>
                <h2 className="bookshelf-title">{value.title}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {Object.keys(booksOnTheShelf).length !== 0 && booksOnTheShelf[value.status].map((book) => (
                      <li key={book.id}>
                          <Book book={book}/>
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