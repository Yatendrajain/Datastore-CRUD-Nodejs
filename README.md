# <center>**DATASTORE**</center>

### <center>**Problem Statement:**</center>

This is a file which can be exposed as a library that supports the basic CRD(create, read, write) operations. Data store is meant to local storage for one single process on single laptop. The datastore is exposed as a library to clients that can instantiate a class and work with the datastore.

### <center>**Getting Started**</center>

To get started with this library, run the npm installer to get all the system requirements and to run the program without any error.<br>
Run the following command: <br>

```Javascript
npm install
```

After running this command in command shell a node_modules folder will be created which will make run the program without error and in node environment.

### <center>**File Structure:**</center>

As this is a file which is exposed as library so the file structure is kept very simple.

1. **datastore.js** : This is the main file which will be exposed as library. It has the class which the client can instantiate and all the methods to be used.
2. **example.js** : This is the file where everything is implemented and demonstrate how the library can be used.
3. **package.json and package-lock.json** : Setting files for node js

### <center>**How to run datastore.js:**</center>

Whole implementation of datastore.js is demonstrated in example.js. This is a breif summary of running the file as library.

### Examples:

1. ### **Initialising class in your example.js**

```javascript
//Importing our datastore file as library
const dataStore = require("./datastore");

//Instantiating the datastore class in our library by creating object for it.
const store = new dataStore();
```

2. ### **Creating Initial Key Value Pair**

```javascript
store.create("Yatendra", 30000, 60); //Valid Callback
store.create("Pratik", 15000, 30); //Valid Callback
store.create("this sentence is more than 32 chars", 0, 0); //It wont create as the key is not capped under 32 char
store.create("Yatendra", 30000, 60); //Invalid Callback as Yatendra key already exists
```

3. ### **Reading existing Key Value Pair**

```javascript
console.log(store.read("Yatendra")); //Valid Callback if called before time to live property
console.log(store.read("Pratik")); //Valid Callback if called before time to live property
console.log(store.read("Not Key")); //Invalid as such key doesnt exist
```

4. ### **Deleting Existing key value pair**

```javascript
store.delete("Pratik"); //Valid Callback if called before time to live property
store.delete("Not Key"); //Invalid as such key doesnt exist
```

5. ### **Running Example.js and use datastore.js** <br> After writing all your code in your example.js file, open the command prompt and run -

```javascript
node example.js
```
