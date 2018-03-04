import React, { Component } from "react";
import './App.css'
import Shelf from './Shelf';

class WantToRead extends Component {
  constructor(props) {
          super(props);
          this.shelf = 'Want To Read';
        }
  render() {
   return (
     	<div>
			<Shelf />
     	</div>
     )
  }
}

export default WantToRead
