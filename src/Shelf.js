import React, {Component} from 'react';
import App from './App';
import Book from './Book';

class Shelf extends Component {


  render() {
   return (
	<div className="bookshelf">
	  <h2 className="bookshelf-title">{this.props.shelfName}</h2>
	  <div className="bookshelf-books">
	    <ol className="books-grid">
		    <Book currentShelf={this.props.currentShelf} updateShelf={this.props.updateShelf}/>
	    </ol>
	  </div>
	</div>
   )
  }
}

export default Shelf
