import React, {Component} from 'react';
import App from './App';
import Book from './Book';
import './App.css'

class Shelf extends Component {


  render() {
   return (
	<div className="bookshelf">
	  <h2 className="bookshelf-title">{this.props.shelfName}</h2>
	  <div className="bookshelf-books">
	    <ol className="books-grid">
      {this.props.currentShelf.map((book) => (
       <Book key={book.id} book={book} updateShelf={this.props.updateShelf} />
      ))}
      </ol>
    </div>
	</div>
   )
  }
}

export default Shelf
