// File Description:
// This is a file which can be exposed as a library that supports the basic CRD(create, read, write) operations.
// Data store is meant to local storage for one single process on single laptop.

//Import Statements
const fs = require("fs");

//Class DataStore
var dataStore = class dataStore {
    //Constructor
    constructor() {
        //Instance Variable
        this.key = "";
        this.value = null;
        this.time_to_live = 0;

        //JSON model
        this.valueobj = { value: this.value, time_to_live: this.time_to_live }; //Value as json object
    }

    getItem(key) {
        let rawdata = fs.readFileSync("storage.json");
        let jsonobj = JSON.parse(rawdata);
        return jsonobj;
    }

    setItem(key, value, time_to_live) {
        let rawdata = fs.readFileSync("storage.json");
        let jsonobj = JSON.parse(rawdata);

        var jsonkey = key;
        var obj = {};
        obj[jsonkey] = { Salary: value, time_to_live: time_to_live };

        jsonobj.push(obj);
        let data = JSON.stringify(jsonobj, null, 2);
        fs.writeFileSync("storage.json", data);
        console.log("Data Successfully Written");
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
        this.key = key;
        this.value = value;
        this.time_to_live = time_to_live;

        var millis = Date.now();
        this.time_to_live = Math.floor(millis / 1000) + this.time_to_live;
        this.valueobj = { value: this.value, time_to_live: this.time_to_live }; //Updating Json Object to append
        var size = Buffer.byteLength(JSON.stringify(this.valueobj)); //Calculating the size of json object
        var sizeInKB = size / 1024; //Calculating the size in KB

        // Error Handling
        if (key.length > 32) {
            console.log("Key is greater than 32 character long.");
        } else if (sizeInKB > 16) {
            console.log("Size of json object exceeds 16KB");
        } else if (JSON.parse(this.getItem(this.key)) != null) {
            console.log("Key already Exist in local Storage");
        } else {
            setItem(this.key, this.value, this.time_to_live);
            console.log(
                "Success! Key: " +
                this.key +
                ", value: " +
                this.value +
                " is added" +
                "\nTime to live: " +
                this.time_to_live,
            );
        }
    }

    //Read Method
    /**
     * Read and returns Key-Value Pair In Local Storage.
     * @param {string} key - To read key-value pair of specific key
     */
    read(key) {
        if (JSON.parse(localStorage.getItem(key)) == null) {
            console.log("Key Doesn't Exist in local Storage");
        } else {
            var millis = Date.now();
            var currentTime = Math.floor(millis / 1000);
            this.valueobj = JSON.parse(localStorage.getItem(key));
            var time = this.valueobj.time_to_live;
            if (currentTime > time) {
                return "Time Expired to read the data";
            } else {
                this.valueobj = localStorage.getItem(key);
                return this.valueobj;
            }
        }
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
            var millis = Date.now();
            var currentTime = Math.floor(millis / 1000);
            this.valueobj = JSON.parse(localStorage.getItem(key));
            var time = this.valueobj.time_to_live;
            if (currentTime > time) {
                return "Time Expired to delete the data";
            } else {
                var deleted_value = localStorage.getItem(key);
                localStorage.removeItem(key);
                console.log(
                    "Success! Key: " + key + ", value: " + deleted_value + " is deleted",
                );
            }
        }
    }
};

module.exports = dataStore;