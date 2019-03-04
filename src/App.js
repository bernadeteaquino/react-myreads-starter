import React from 'react'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    booksOnTheShelf: {}
  }

  componentDidMount() {
    BooksAPI.getAll().then((result) => {
      const booksOnTheShelf = {};
      result.forEach(book => {
        booksOnTheShelf[book.shelf] = booksOnTheShelf[book.shelf] || []
        booksOnTheShelf[book.shelf].push(book) 
      });

      this.setState(() => ({
        booksOnTheShelf
      }))
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            booksOnTheShelf={this.state.booksOnTheShelf}
          />
        )} />
        <Route exact path="/search" component={SearchBooks}/>
      </div>
    )
  }
}

export default BooksApp
