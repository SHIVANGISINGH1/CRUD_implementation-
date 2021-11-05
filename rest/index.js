
const methodOverride = require('method-override');// this is to overrides method like you can sent patch and delete request
const express = require('express');
const app = express();
app.set('view engine','ejs');

const path = require('path'); // to run views files from different directories
app.set('views' , path.join(__dirname,'views'));

const { v4: uuid } = require('uuid'); // to generate random ids


app.use(express.urlencoded({ extended: true })); 
app.use(express.json());


app.use(methodOverride('_method'));

let comments = [
    {
        id:uuid(),
        username: 'petty curls',
        comment: 'You are awesome dude'
    },

    {   
        id:uuid(),
        username: 'Todd Chukles',
        comment: 'The man laughs hahaha'
    },

    {   
        id:uuid(),
        username: 'Mariana',
        comment: 'Got the trick cool!!!!!!!!!!!!!!!!!!'
    },

    {   
        id:uuid(),
        username: 'Christy Darry',
        comment: 'efforts worth it dude!'
    }
]



app.get('/comments',(req,res) => {       // to view all comments   
    res.render('comments/index', {comments});
})


app.get('/comments/new' , (req,res) => { // to make new comments
    res.render('comments/new');
})

app.post('/comments' , (req,res) => { // to add new comment to the existing comments
    const {username,comment} = req.body;
    const arr = {username: username,comment: comment, id: uuid()}
    comments.push(arr);
    res.redirect('/comments');
})

app.get('/comments/:id' , (req,res) => { // to show comments with ids
    const {id} = req.params;
    const Comment = comments.find(c => c.id === id);
    console.log(Comment)
    res.render('comments/show', {Comment});
})

app.patch('/comments/:id' , (req,res) => { // to update existing comments
    const {id} = req.params;
    let oldComment = comments.find(c => c.id === id);
    let newComment = req.body.comment;
    oldComment.comment = newComment;
    res.redirect('/comments')
})

app.get('/comments/:id/edit' , (req,res) => { // to edit the existing comment
    const {id} = req.params;
    console.log(id)
    const oldComment = comments.find(c => c.id === id);
    console.log(oldComment)
    res.render('comments/edit', {oldComment});
})

app.delete('/comments/:id' , (req,res) => { // to delete comments
    const {id} = req.params;
    comments = comments.filter(com => com.id !== id);
    res.redirect('/comments');
})

app.listen(3000, () => {
    console.log("On port 3000");
})