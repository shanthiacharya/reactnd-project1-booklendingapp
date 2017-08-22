import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books :[]
    }
    this.moveBookToAnotherShelf = this.moveBookToAnotherShelf.bind(this);
    this.getBookById =  this.getBookById.bind(this);
  }


  componentDidMount(){
    BooksAPI.getAll().then((allBooks)=>{
      console.log(allBooks)
      this.setState({books:allBooks})

    })
  }


  getBookById(id) {
    let books
    if (this.state.books){
        books = this.state.books.filter((book) => (book.id === id) )
        if (books.length > 0){
          return books[0]
        } else {
          return null
        }
      }
   }


  moveBookToAnotherShelf(event, book){
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

      <Route path="/searchbooks" render = {({history}) => (
          <SearchBooks
              OnmoveBookToAnotherShelf={(event, book)=>{
              this.moveBookToAnotherShelf (event, book)
              history.push('/')
          }}
          getBookById={this.getBookById}

        />
      )}/>



        <Route exact path="/" render={() => (
          <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
           </div>
          <div className="list-books-content">
            <ListBooks books = {currentlyReading}  shelfTitle = {"Currently Reading"} OnmoveBookToAnotherShelf = {this.moveBookToAnotherShelf} getBookById = {this.getBookById}/>
            <ListBooks books = {wantToRead}  shelfTitle = {"Want To Read"} OnmoveBookToAnotherShelf = {this.moveBookToAnotherShelf} getBookById = {this.getBookById}/>
            <ListBooks books = {read}  shelfTitle = {"Read"} OnmoveBookToAnotherShelf = {this.moveBookToAnotherShelf} getBookById = {this.getBookById}/>
          </div>


        </div>

        )}/>






      </div>
    );
  }
}

export default App;
