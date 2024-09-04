const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  //Write your code here
  
  // ===== Start of Task 6 ======
  let username = req.body.username;
  let password = req.body.password;

  if(username && password) {
    if(!isValid(username)) {
        users.push({username: username, password: password});
        return res.status(200).json({message: "The user registered successfully."});
    }
    else
        return res.status(404).json({message: "Unable to register. The user is already existed."});
  }
  else 
    return res.status(404).json({message: "Unable to register user. Please provide username and password."});
  // ===== End of Task 6 ======

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    //Write your code here
    ////===== Start of Task 1 ======
    //let bookList = JSON.stringify(books);
    //return res.status(200).json({message: "Success", bookList: bookList});
    ////===== End of Task 1 ======


    // ===== Start of Task 10 ======
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve("Promise resolved");
            let bookList = JSON.stringify(books);
            return res.status(200).json({message: "Success", bookList: bookList});
        },5000);
    });

    myPromise.then((successMessage) => {
        console.log("From Callback " + successMessage);
    });
    // ===== End of Task 10 ======

});



// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    //Write your code here
    // // ===== Start of Task 2 ======
    // let book = books[req.params.isbn];
    // if(book != null)
    //     return res.status(200).json({message: "Sucess", book: book});
    // else
    //     return res.status(404).json({message: "Not Found"});
    // // ===== End of Task 2 ======


    // ===== Start of Task 11 ======
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve("Promise resolved");
            let book = books[req.params.isbn];
            if(book != null)
                return res.status(200).json({message: "Sucess", book: book});
            else
                return res.status(404).json({message: "Not Found"});
        },5000);
    });

    myPromise.then((successMessage) => {
        console.log("From Callback " + successMessage);
    });
    // ===== End of Task 11 ======

 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    //Write your code here
    // // ===== Start of Task 3 ======
    // let book = Object.values(books).filter(b=>b.author === req.params.author);
    // if(book.length > 0)
    //     return res.status(200).json({message: "Success", book: book});
    // else
    //     return res.status(404).json({message: "Not Found"});
    // // ===== End of Task 3 ======


    // ===== Start of Task 12 ======
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve("Promise resolved");
            let book = Object.values(books).filter(b=>b.author === req.params.author);
            if(book.length > 0)
                return res.status(200).json({message: "Success", book: book});
            else
                return res.status(404).json({message: "Not Found"});
        },5000);
    });

    myPromise.then((successMessage) => {
        console.log("From Callback " + successMessage);
    });
    // ===== End of Task 12 ======
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    //Write your code here
    // ===== Start of Task 4 ======
    // let book = Object.values(books).filter(b=>b.title === req.params.title);
    // if(book.length > 0)
    //     return res.status(200).json({message: "Success", book: book});
    // else
    //     return res.status(404).json({message: "Not Found"});
    // ===== End of Task 4 ======

    // ===== Start of Task 13 ======
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve("Promise resolved");
            let book = Object.values(books).filter(b=>b.title === req.params.title);
            if(book.length > 0)
                return res.status(200).json({message: "Success", book: book});
            else
                return res.status(404).json({message: "Not Found"});
        },5000);
    });

    myPromise.then((successMessage) => {
        console.log("From Callback " + successMessage);
    });
    // ===== End of Task 13 ======
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  // ===== Start of Task 5 ======
  let book = books[req.params.isbn];
  if(book != null) {
    let bookReview = book.reviews;
    return res.status(200).json({message: "Success", review: bookReview});
  }
  else
    return res.status(404).json({message: "Not Found"});
  // ===== End of Task 5 ======
});






module.exports.general = public_users;
