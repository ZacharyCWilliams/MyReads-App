import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import Book from './Book'
import Search from './Search'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'


class BooksApp extends React.Component {

  state = {
      showSearchPage: false,
      books: [],
      searchingFor: []
    }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
	     this.setState({ books });
	    });
    }

  componentDidUpdate(bookID, event) {
    console.log('bookID: ', bookID)
    console.log('event.target.value: ', event.target.value)
    let newListOfBooks = BooksAPI.update(bookID, event.target.value)
    console.log('newListOfBooks: ', newListOfBooks)
    let booksbooksbooks = newListOfBooks.then(BooksAPI.getAll().then((books) => {this.setState({books: books})}))
    console.log('booksbooksbooks: ', booksbooksbooks)
  }

  searchFunctionality(event){
    BooksAPI.search(event.target.value).then((results) => {
      this.setState({ searchingFor: results });
    });
  }

  render() {

  let allBooks = this.state.books;
  console.log('allBooks: ', allBooks)

  let currentlyReadingShelf = allBooks.filter((book) => {return book.shelf === 'currentlyReading'})
	console.log('Currently Reading Shelf: ', currentlyReadingShelf);

	let readBookShelf = allBooks.filter((book) => {return book.shelf === 'read'})
	console.log('Read Shelf: ', readBookShelf);

	let wantToReadShelf = allBooks.filter((book) => {return book.shelf === 'wantToRead'})
	console.log('Want To Read Shelf: ', wantToReadShelf);

  let searchBooks = this.state.searchingFor


  console.log('this.state.searchingFor: ', this.state.searchingFor)
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</Link>
              <div className="search-books-input-wrapper">

                <input className='inputClassTest' type="text" placeholder="Search by title or author" onChange={(event) => this.searchFunctionality(event)}/>
                { <ol className="books-grid">
                    {searchBooks.map((book) => (
                      <Search book={book} updateShelf={this.componentDidUpdate.bind(this)} />
                    ))}
                    </ol>
                    }
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
            </div>
            <div className="open-search">
              <Link to='/search' onClick={() => this.setState({ showSearchPage: true })}>Add a book</Link>
            </div>
		<Shelf shelfName='Currently Reading' currentShelf={currentlyReadingShelf} updateShelf={this.componentDidUpdate.bind(this)} />
		<Shelf shelfName='Read' currentShelf={readBookShelf} updateShelf={this.componentDidUpdate.bind(this)} />
		<Shelf shelfName='Want To Read' currentShelf={wantToReadShelf} updateShelf={this.componentDidUpdate.bind(this)} />
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
