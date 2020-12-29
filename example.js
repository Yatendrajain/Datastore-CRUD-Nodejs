const dataStore = require("./datastore");

const store = new dataStore();
// store.create("Yatendra", 15000, 60);
console.log(store.read("Yatendra"));
// store.delete("Manuj");