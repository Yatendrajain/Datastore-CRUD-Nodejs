// File Description:
// This is a file which can be exposed as a library that supports the basic CRD(create, read, write) operations.
// Data store is meant to local storage for one single process on single laptop.

//Import Statements
var LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");

//Class DataStore
var dataStore = class dataStore {
    //Constructor
    constructor() {
        this.key = "";
        this.value = null;
        this.time_to_live = 0;
        this.valueobj = { value: this.value, time_to_live: this.time_to_live }; //Value as json object
        this.jsonobj = { key: this.value }; //Initializing JSON Object
    }

    //Create Method
    /**
     * Create Key-Value Pair In Local Storage.
     * @param {string} key - To set a key for some value
     * @param {any} value - To set a value for a specific key
     * @param {int} time_to_live - Maximum time to read or delete the key-value pair. Default = 0
     */
    create(key, value, time_to_live = 0) {
        //Variable Declaration
        this.valueobj = { value: value, time_to_live: time_to_live }; //Updating Json Object to append
        var size = Buffer.byteLength(JSON.stringify(this.valueobj)); //Calculating the size of json object
        var sizeInKB = size / 1024; //Calculating the size in KB

        // Error Handling
        if (key.length > 32) {
            console.log("Key is greater than 32 character long.");
        } else if (sizeInKB > 16) {
            console.log("Size of json object exceeds 16KB");
        } else if (JSON.parse(localStorage.getItem(key)) != null) {
            console.log("Key already Exist in local Storage");
        } else {
            localStorage.setItem(key, JSON.stringify(this.valueobj));
            console.log(
                "Success! Key: " +
                key +
                ", value: " +
                value +
                " is added" +
                "\nTime to live: " +
                time_to_live,
            );
        }
    }

    //Read Method
    /**
     * Read and returns Key-Value Pair In Local Storage.
     * @param {string} key - To read key-value pair of specific key
     */
    read(key) {
        this.value = localStorage.getItem(key);
        return this.value;
    }

    //Delete Method
    /**
     * Delete Key-Value Pair In Local Storage.
     * @param {string} key - To delete key-value pair of specific key
     */
    delete(key) {
        //Error Handling
        if (localStorage.getItem(key) == null) {
            console.log("Key doesn't exist in local storage");
        } else {
            var deleted_value = localStorage.getItem(key);
            localStorage.removeItem(key);
            console.log(
                "Success! Key: " + key + ", value: " + deleted_value + " is deleted",
            );
        }
    }
};

module.exports = dataStore;