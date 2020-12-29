// File Description:
// This is a file which can be exposed as a library that supports the basic CRD(create, read, write) operations.
// Data store is meant to local storage for one single process on single laptop.

//Import Statements
import { localStorage } from "node-localstorage";

//Class DataStore

export class dataStore {
    //Create Method
    /**
     * Create Key-Value Pair In Local Storage.
     * @param {any} key - To set a key for some value
     * @param {any} value - To set a value for a specific key
     * @param {int} time_to_live - Maximum time to read or delete the key-value pair. Default = 0
     */
    create(key, value, time_to_live = 0) {
        localStorage.setItem(key, value);
        console.log("Success");
    }

    //Read Method
    /**
     * Read Key-Value Pair In Local Storage.
     * @param {any} key - To read key-value pair of specific key
     */
    read(key) {
        var temp = localStorage.getItem(key);
        console.log(temp);
    }

    //Delete Method
    /**
     * Delete Key-Value Pair In Local Storage.
     * @param {any} key - To delete key-value pair of specific key
     */
    delete(key) {
        localStorage.removeItem(key);
        console.log("Success");
    }
}