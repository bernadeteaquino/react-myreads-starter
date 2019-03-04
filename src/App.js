import React from 'react'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }

    this.changeBookShelfAndRefresh = this.changeBookShelfAndRefresh.bind(this);
  }

  componentDidMount() {
    this.getAllBooks()
  }

  getAllBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  changeBookShelf(book, shelfName) {
    return BooksAPI.update(book, shelfName)
  }

  changeBookShelfAndRefresh(book, shelfName){
    this.changeBookShelf(book, shelfName).then(() => {
      this.getAllBooks()
    })
  }

  getBooks() {
    return this.state.books
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.getBooks()}
            onChangeBookShelf={this.changeBookShelfAndRefresh}
          />
        )}/>
        <Route exact path="/search" render={() => (
          <SearchBooks
            books={this.getBooks()}
            onChangeBookShelf={this.changeBookShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
