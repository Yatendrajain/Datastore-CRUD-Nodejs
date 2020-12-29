const dataStore = require("./datastore");

const store = new dataStore();
store.create("Yatendra", 20000, 10);
// console.log(store.read("Yatendra"));
// store.delete("Yatendra");