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

