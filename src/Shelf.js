import React, {Component} from 'react';
import App from './App'

class Shelf extends Component {
  
  
  render() {
   return (
	<div className="bookshelf">
	  <h2 className="bookshelf-title">{this.props.shelfName}</h2>
	  <div className="bookshelf-books">
	    <ol className="books-grid">
		{this.props.currentShelf.map((book) => (
		<li className="book-list-item">
	     	<div className="book">
		<div className="book-top">
		<div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
		<div className="book-shelf-changer">
		   <select>
		   <option value="none" disabled>Move to...</option>
		   <option value="currentlyReading" onClick={this.props.updateShelf(book, 'currentlyReading')}>Currently Reading</option>
		   <option value="wantToRead" onClick={this.props.updateShelf(book, 'wantToRead')}>Want to Read</option>
		   <option value="read" onClick={this.props.updateShelf(book, 'read')}>Read</option>
		   <option value="none" onClick={this.props.updateShelf(book, 'none')}>None</option>
		   </select>
		</div>
		</div>
		<div className="book-title">{book.title}</div>
		<div className="book-authors">{book.authors}</div>
		</div>
		</li>
	       ))}
	    </ol>
	  </div>
	</div>
   ) 
  }
}

export default Shelf
