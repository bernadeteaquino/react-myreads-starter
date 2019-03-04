import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import './App.css'

class SearchBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBooks: [],
            query: ''
        }

        this.changeBookShelf = this.changeBookShelf.bind(this);
    }

    getShelfBook(searchBook){
        return this.props.books.find(book => {
            return book.id === searchBook.id;
        });
    }

    search(query) {
        BooksAPI.search(query).then((result) => {
            result = result && !('error' in result) ? result : []

            var searchBooks = result.map((searchBook) => {
                var shelfBook = this.getShelfBook(searchBook)
                if (shelfBook !== undefined) {
                    return shelfBook;
                } else {
                    searchBook['shelf'] = 'none'
                    return searchBook
                }
            })

            this.setState(() => ({
                searchBooks,
                query
            }))
        })
    }

    changeBookShelf(book, shelfName) {
        this.props.onChangeBookShelf(book, shelfName).then(() => {
            book['shelf'] = shelfName

            this.setState((prevState) => ({
                searchBooks: prevState.searchBooks
            }))
        })
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
                    {this.state.searchBooks.length > 0 && (
                        <ol className="books-grid">
                            {this.state.query.length > 0 && this.state.searchBooks.map((book) => (
                                <li key={book.id}>
                                    <Book 
                                        book={book}
                                        onChangeBookShelf={this.changeBookShelf}
                                    />
                                </li>
                            ))}
                        </ol>
                   )}
                   {this.state.query.length > 0 && this.state.searchBooks.length === 0 && (
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