import React, {Component} from 'react';
import Book from './Book';
import Buttons from './Buttons'
import App from './App'

class Shelf extends Component {
  constructor(props){
  	super(props);
     this.state = {
    	currentShelf: null
  	}
    this.updateCurrentShelf = this.updateCurrentShelf.bind(this);
  }
	updateCurrentShelf() {
    this.setState(prevState => ({
      currentShelf: 'Hi'
    }));
    }
  
  render() {
   return (
   		<div className="bookshelf">
                  <h2 className="bookshelf-title">{this.state.currentShelf}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
     					<Book />
                    </ol>
                  </div>
                </div>
   ) 
  }
}

export default Shelf
