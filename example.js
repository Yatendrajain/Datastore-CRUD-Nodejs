const dataStore = require("./datastore");

const store = new dataStore();
// store.create("Hello", 15000, 60);
console.log(store.read("Hello"));
// store.delete("def");