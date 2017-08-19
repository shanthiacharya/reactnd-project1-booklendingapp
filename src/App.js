import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.MoveBookToAnotherShelf = this.MoveBookToAnotherShelf.bind(this);
  }
  state = {
    books :[]

  }

  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({books})
       console.log (books)
    })
  }


  getBookbyId (id) {
    let books
    if (this.state.books){
        books: this.state.books.filter((book)=> (book.id === id) )
        if (books.length > 0){
          return books[0]
        } else {
          return null
        }
      }
   }


  MoveBookToAnotherShelf(event, book){
    let shelfValue = event.target.value
    BooksAPI.update(book,shelfValue).then(() => {
    book.shelf = shelfValue
    this.setState(state => ({
      books: state.books.filter((abook) => abook.id !==book.id ).concat([book])

    }))
    })
  }

  render() {

    const {books} = this.state
     books.sort(sortBy('title'))
    let currentlyReading: null
    let wantToRead: null
    let read:null
    currentlyReading = books.filter ((book) => book.shelf === 'currentlyReading')
    wantToRead = books.filter ((book) => book.shelf === 'wantToRead')
    read = books.filter ((book) => book.shelf === 'read')

    return (
      <div className="App">
        <Route exact path="/" render={() => (
          <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
           </div>
          <div className="list-books-content">
            <ListBooks books = {currentlyReading}  shelfTitle = {"Currently Reading"} onMoveBooktoAnotherShelf = {this.MoveBooktoAnotherShelf} getBookbyId = {this.getBookbyId}/>
            <ListBooks books = {wantToRead}  shelfTitle = {"Want To Read"} onMoveBooktoAnotherShelf = {this.MoveBooktoAnotherShelf} getBookbyId = {this.getBookbyId}/>
            <ListBooks books = {read}  shelfTitle = {"Read"} onMoveBooktoAnotherShelf = {this.MoveBooktoAnotherShelf} getBookbyId = {this.getBookbyId}/>
          </div>


        </div>

        )}/>

        <Route path="/searchbooks" render = {(history) => (
            <SearchBooks/>


        )}/>

      </div>
    );
  }
}

export default App;
