import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import './App.css'

class SearchBooks extends Component {
    state = {
        books: [],
        firstRender: true
    }

    search = (query) => {
        this.setState(() => ({
            firstRender: false
        }))

        if (query && query.length > 1) {
            BooksAPI.search(query)
            .then((result) => {
                var books = !('error' in result) ? result : []
                this.setState(() => ({
                    books
                }))
            })
        }      
    }

    render() {
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link 
                        to="/"
                        className="close-search"
                        >Close</Link>
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(event) => this.search(event.target.value)}/>
                    </div>
                </div>
                
                <div className="search-books-results">
                    {this.state.books.length > 0 && (
                        <ol className="books-grid">
                            {this.state.books.map((book) => (
                                <li key={book.id}>
                                    <Book book={book}/>
                                </li>
                            ))}
                        </ol>
                   )}
                   {this.state.firstRender === false && this.state.books.length === 0 && (
                       <div className="no-results">
                           Nenhum resultado encontrado!
                        </div>
                   )}
                </div>
            </div>
        )
    }
}

export default SearchBooks