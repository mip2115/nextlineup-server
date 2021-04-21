#!/bin/bash


echo `
    mongo mongodb://localhost:27017/music-social-media --eval "
        db.users.drop();
        db.posts.drop();
        db.thoughts.drop();
        db.upvotes.drop();
    "
`

echo `
    mongoimport --jsonArray --db music-social-media --collection users --file scripts/users.json 
    mongoimport --jsonArray --db music-social-media --collection posts --file scripts/posts.json 
    mongoimport --jsonArray --db music-social-media --collection thoughts --file scripts/thoughts.json 
`