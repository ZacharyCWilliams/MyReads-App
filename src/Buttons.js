import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CurrentlyReading from './CurrentlyReading.js';
import Read from './read.js';
import WantToRead from './WantToRead.js'

class Buttons extends Component {
  render() {
    let wantToReadList = 'Want To Read';
   return (
   		<Router>
			<div>
              <Route path="/currently-reading" component={CurrentlyReading}/>
              <Route path="/read" component={Read}/>
              <Route path="/want-to-read" component={WantToRead}/>
			<div className="buttons-test">
				<Link to="/want-to-read" className="select" style={{ textDecoration: 'none' }}>
					<p className='read-button'>Want To Read</p>
				</Link>
     			<Link to="/currently-reading" onClick={updateCurrentShelf} className="select" style={{ textDecoration: 'none' }}>
					<p className='read-button-2'>Currently Reading</p>
				</Link>
				<Link to="/read" className='select' style={{ textDecoration: 'none' }}>
					<p className='read-button'>Read</p>
				</Link>
			</div>
			</div>
		</Router>
   ) 
  }
}

export default Buttons
