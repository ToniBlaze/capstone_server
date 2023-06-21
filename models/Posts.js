const mongoose = require("mongoose");

// Comment Schema
const commentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

// Post Schema
const postsSchema = new mongoose.Schema({
  category: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  cover: {
    type: String,
    require: true,
  },
  readTime: {
    value: { type: Number, require: true },
    unit: { type: String, require: true },
  },
  author: {
    name: { type: String, require: true },
    avatar: { type: String, require: false },
  },
  content: {
    type: String,
    require: true,
  },
  comment: [commentSchema],
});

// Mongoose Model
const postModel = mongoose.model("Post", postsSchema);

// Export Module
module.exports = postModel;

// Relazioni DB Mongo
// Embedding - Referencing
// OneToOne - OneToMany - ManyToMany

// Embedding
/* let users = [
    {
        _id: 1,
        name: 'Mario',
        lastname: 'Rossi',
        address: {
            city: 'Roma',
            state: 'Italia'
        },
        age: 45,
        posts: [
            {
                _id: 1,
                title: 'Primo Post',
                text: 'Descrizione Post numero 1',
                date: '2023-06-05'
            },
            {
                _id: 2,
                title: 'Secondo Post',
                text: 'Descrizione Post numero 2',
                date: '2023-06-06'
            }
        ]
    }, 
    {
        _id: 2,
        name: 'Giuseppe',
        lastname: 'Verdi',
        address: {
            city: 'Roma',
            state: 'Italia'
        },
        age: 21,
        posts: [
            {
                _id: 1,
                title: 'Post di Giuseppe',
                text: 'Descrizione Post di Giuseppe',
                date: '2023-06-03'
            }
        ]
    }
];

 */
// Referencing

// Users
/* users = [
    {
        _id: 1,
        name: 'Mario',
        lastname: 'Rossi',
        address: 1,
        age: 45,
        posts: [1, 2]
    }, 
    {
        _id: 2,
        name: 'Giuseppe',
        lastname: 'Verdi',
        address: 1,
        age: 21,
        posts: [3]
    }
];

// Address
let Address = [
    {
        _id: 1,
        city: 'Roma',
        state: 'Italia'
    },
    {
        _id: 2,
        city: 'Milano',
        state: 'Italia'
    },
    {
        _id: 3,
        city: 'Napoli',
        state: 'Italia'
    }
]

// Posts
let posts = [
    {
        _id: 1,
        title: 'Primo Post',
        text: 'Descrizione Post numero 1',
        date: '2023-06-05',
        author_id: 1
    },
    {
        _id: 2,
        title: 'Secondo Post',
        text: 'Descrizione Post numero 2',
        date: '2023-06-06',
        author_id: 1
    },
    {
        _id: 3,
        title: 'Post di Giuseppe',
        text: 'Descrizione Post di Giuseppe',
        date: '2023-06-03',
        author_id: 2
    }
] */
