import React from 'react'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import LoadingOverlay from 'react-loading-overlay';
import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isLoading: true
    }

    this.changeBookShelfAndRefresh = this.changeBookShelfAndRefresh.bind(this);
  }

  componentDidMount() {
    this.setAsLoading()
    this.getAllBooks()
  }

  getAllBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
        isLoading: false
      }))
    })
  }

  setAsLoading() {
    this.setState(() => ({
      isLoading: true
    }))
  }

  changeBookShelfAndRefresh(book, shelfName){
    this.setAsLoading()
    return BooksAPI.update(book, shelfName).then(() => {
      this.getAllBooks()
    })
  }

  render() {
    return (
      <div className="app">
        <LoadingOverlay
          active={this.state.isLoading}
          spinner>
          <Route exact path='/' render={() => (
              <ListBooks
                books={this.state.books}
                onChangeBookShelf={this.changeBookShelfAndRefresh}
              />
          )}/>
          <Route exact path="/search" render={() => (
            <SearchBooks
              books={this.state.books}
              onChangeBookShelf={this.changeBookShelfAndRefresh}
            />
          )}/>
        </LoadingOverlay>
      </div>      
    )
  }
}

export default BooksApp
