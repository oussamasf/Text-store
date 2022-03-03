# Text store server app !

Text storing and processing with different languages ie: Arabic, English and French.

- create/add a text, it will automatically have a “draft” state .
- Then, the text will be submitted for review, in that case, the text will have the state
- “submitted”.
- A “submitted” text can either be “rejected” or “approved”.
- In case the text is rejected (state: “rejected”), It can be submitted again for review (check

# Structure

The structure is based on the MVC architecture

```
    ./
    |-- controllers
    |   |-- errController.js
    |   `-- textController.js

    |-- models
    |   `-- textModel.js

    |-- routers
    |   `-- textRouter.js

    |-- utils
    |   |-- apiFeatures.js
    |   |-- appError.js
    |   `-- catchAsync.js

    |-- .dockerignore
    |-- .gitignore
    |-- readme.md
    |-- config.env
    |-- dockerfile
    |-- package.json
    |-- app.js
    `-- server.js

```

## Files

controlers : handling logic and application side
models : handling the business side
routers : define endpoints
utils : tools and functions
app.js : middlewars
server.js : index

# Requirements

> node 16.13.2
> 
> dotenv: ^16.0.0,
> 
> express: ^4.17.3,
> 
> fuse.js: ^6.5.3,
> 
> mongoose: ^6.2.3,
> 
> morgan: ^1.10.0,
> 
> validator: ^13.7.0

# Run

    `npm start`

NB : test not implemented and change the variable NODE_ENV for production phase

# API endpoints

- **POST** _/text/_ store text with a unique Id to the database.
- **GET** _/text/_ Fetch a list of text with the support of pagination.
- **PATCH** _/text/:textId_ Update text content.
- **GET** _/text/:textId/count_ : Fetch total word number of given a text
- **GET** _/text/:textId/count/:language_ : Fetch total word number based on given text for specific languages ex: fr, ar, en
- **DELETE** _/text/:textId/count_ : Delete a specific text
- **GET** _/text/search?q=\<word>_ Fetch texts based on a fuzzy search using query q.
- **GET** _/text/wait-list/_ Fetch all texts except approved and _/text/wait-list/:state_ for specific state of text
- **GET** _text/wait-list/\<submit|approve|reject>/:id_" Changing the state of a text
