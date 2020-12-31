/**
 * Example File to demonstrate how to use this file as library
 */

//Importing our datastore file as library
const dataStore = require("./datastore");

//Instantiating the datastore class in our library by creating object for it.
const store = new dataStore();

/** ----------- CRD Operations ------------ */

/**
 * Create Callback
 * Creating JSON object using create method in our library
 * @argument {string} key - To pass key for our key value pair
 * @argument {any} value - To pass Value for our key value pair
 * @argument {int} time_to_live - To pass time to live property in seconds for our key value pair
 */
store.create("Yatendra", 30000, 60); //Valid Callback
store.create("Pratik", 15000, 30); //Valid Callback
store.create("this sentence is more than 32 chars", 0, 0); //It wont create as the key is not capped under 32 char
store.create("Yatendra", 30000, 60); //Invalid Callback as Yatendra key already exists

/**
 * Read Callback
 * Prints Salary property using read method in our library
 * @argument {string} key - To pass key for our key value pair
 */
console.log(store.read("Yatendra")); //Valid Callback if called before time to live property
console.log(store.read("Pratik")); //Valid Callback if called before time to live property
console.log(store.read("Not Key")); //Invalid as such key doesnt exist

/**
 * Delete Callback
 * Delete JSON Object using delete method in our library
 * @argument {string} key - To pass key for our key value pair
 */
store.delete("Pratik"); //Valid Callback if called before time to live property
store.delete("Not Key"); //Invalid as such key doesnt exist