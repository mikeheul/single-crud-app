# Single CRUD API app (Node JS, Express, MongoDB)

## Installation
- Create a new folder and command to create package.json file
``` bash
npm init -y
```

- Create a new "index.js" file
- For testing
``` javascript
console.log("Hello");
```

``` bash
node index.js
```

- Update package.json
``` json
{
  "name": "single-crud-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "serve": "node index.js" // 
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

- It will run index.js
``` bash
npm run serve
```

- Install Express for backend
``` bash
npm i express
```

- Check if express dependencies are installed in package.json
``` json
"dependencies": {
    "express": "^4.18.3"
}
```

- On https://www.npmjs.com/package/express, copy / paste boilerplate in index.js
``` javascript
const express = require('express')
const app = express()

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
```

- Add request and reponse get method on "/"
``` javascript
app.get('/', (req, res) => {
    res.send("Hello from Node API")
})
```

- In browser : http://localhost:3000 URL will display "Hello from Node API" message
- In VSCode with RapidAPI Client will display all details about this endpoint


