const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    let selectedUser = users.filter(u=> u.username === username );
    if(selectedUser.length > 0)
        return true;
    else
        return false;
}

const authenticatedUser = (username,password)=>{ //returns boolean
    //write code to check if username and password match the one we have in records.
    let selectedUser = users.filter(u=> u.username === username && u.password === password );
    if(selectedUser.length > 0)
        return true;
    else
        return false;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here

    // ===== Start of Task 7 ======
    username = req.body.username;
    password = req.body.password;

    if (!username || !password) {
        return res.status(404).json({ message: "Please make sure username or password must not be empty." });
    }

    if(authenticatedUser(username, password)) {
        //save JWT token and 
        let accessToken = jwt.sign({ data: password }, 
            'access', { expiresIn: 60 });
        req.session.authorization = { accessToken, username };
        return res.status(200).json({ message: "Login successfully" });
    }
    else
        return res.status(404).json({ message: "Unable to login. The password might be wrong or user do not registered yet." });
    // ===== End of Task 7 ======
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
    // ===== Start of Task 8 ======
    let username = req.session.authorization['username'];
    let reviewParam = req.body.review;
    let book = books[req.params.isbn];

    book["reviews"][username] = { review: reviewParam };

    //return success message
    return res.status(200).json({ message: "Success", book: book });  
    // ===== End of Task 8 ======
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    // ===== Start of Task 9 ======
    let username = req.session.authorization['username'];

    if(username) {
        delete books[req.params.isbn]["reviews"][username];
        return res.status(200).json({ message: "Delete the review successfully", book: books[req.params.isbn]});
    }
    // ===== End of Task 9 ======
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
