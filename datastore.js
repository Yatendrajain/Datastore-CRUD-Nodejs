// Library Description:
// This is a file which can be exposed as a library that supports the basic CRD(create, read, write) operations.
// Data store is meant to local storage for one single process on single laptop.

//Import Statements
const fs = require("fs");

//Class DataStore
var dataStore = class dataStore {
    //Constructor
    //This Constructor initializes key,value and time to live variable.
    //It has an default param will initialize path of the storage if not given during object creation
    constructor(path = "./storage.txt") {
        //Instance Variable
        this.key = "";
        this.value = null;
        this.time_to_live = 0;
        this.path = path;

        //JSON model
        this.valueobj = { value: this.value, time_to_live: this.time_to_live }; //Value as json object
    }

    //createFile Method
    /**
     * Create File at the provided path.
     * @param {string} path - Path to store the storage file
     */
    createFile(filePath) {
        const content = "[]";
        fs.writeFileSync(filePath, content, (err) => {
            if (err) {
                console.log("An err occured" + err);
            } else {
                console.log("file is made");
            }
        });
    }

    //getJSON Method
    /**
     * Returns the whole data stored in the file as array of JSON
     */
    getJSON() {
        let rawdata = fs.readFileSync(this.path);
        let jsonobj = JSON.parse(rawdata);
        return jsonobj;
    }

    //Create Method
    /**
     * Returns true if the required JSON Object is in the array. else returns false.
     * @param {string} key - To check whether the key exists or not
     */
    checkJSON(key) {
        var jsonobj = this.getJSON();
        var flag = false;
        jsonobj.forEach((element) => {
            if (element[key] != null) {
                flag = true;
            }
        });
        return flag;
    }

    getItem(key) {
        var jsonobj = this.getJSON();
        var obj = {};

        for (var x in jsonobj) {
            if (Object.keys(jsonobj[x])[0] == key) {
                obj = jsonobj[x];
            }
        }
        return obj;
    }

    setItem(key, value, time_to_live) {
        let jsonobj = this.getJSON();

        var jsonkey = key;
        var obj = {};
        obj[jsonkey] = { Salary: value, time_to_live: time_to_live };

        jsonobj.push(obj);
        let data = JSON.stringify(jsonobj, null, 2);
        fs.writeFileSync(this.path, data);
        console.log("Data Successfully Written");
    }

    removeItem(key) {
        var jsonobj = this.getJSON();
        var obj = [];

        for (var x in jsonobj) {
            if (Object.keys(jsonobj[x])[0] == key) {
                continue;
            } else {
                obj.push(jsonobj[x]);
            }
        }
        return obj;
    }

    checkTime(key) {
        var millis = Date.now();
        var currentTime = Math.floor(millis / 1000);
        var jsonobj = this.getItem(key);
        var time = jsonobj[key]["time_to_live"];
        if (currentTime > time) {
            return true;
        } else {
            return false;
        }
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

        //Calculating Time
        var millis = Date.now();
        this.time_to_live = Math.floor(millis / 1000) + this.time_to_live;
        this.valueobj = { value: this.value, time_to_live: this.time_to_live }; //Updating Json Object to append

        //Size of value Object
        var size = Buffer.byteLength(JSON.stringify(this.valueobj)); //Calculating the size of json object
        var sizeInKB = size / 1024; //Calculating the size in KB

        //Size of the storage
        var stats = fs.statSync(this.path);
        var fileSize = stats.size;
        var fileSizeInGB = fileSize / (1024 * 1024 * 1024);

        //Checking File Existence
        if (!fs.existsSync(this.path)) {
            this.createFile(this.path);
        }

        // Error Handling
        if (key.length > 32) {
            console.log("Key is greater than 32 character long.");
        } else if (sizeInKB > 16) {
            console.log("Size of json object exceeds 16KB");
        } else if (fileSizeInGB == 1) {
            console.log("Size of Storage exceeds 1 GB");
        } else if (this.checkJSON(this.key)) {
            console.log("Key already Exist in local Storage");
        } else {
            console.log(this.path);
            this.setItem(this.key, this.value, this.time_to_live);
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
        if (!this.checkJSON(key)) {
            console.log("Key Doesn't Exist in local Storage");
        } else {
            if (this.checkTime(key)) {
                return "Time Expired to read the data";
            } else {
                var jsonobj = this.getItem(key);
                this.valueobj = jsonobj[key];
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
        if (!this.checkJSON(key)) {
            console.log("Key Doesn't exist in local storage");
        } else {
            if (this.checkTime(key)) {
                console.log("Time Expired to delete the data");
            } else {
                var deleted_value = this.getItem(key);
                var removedObj = this.removeItem(key);
                let data = JSON.stringify(removedObj, null, 2);
                fs.writeFileSync(this.path, data);
                console.log(
                    "Success! Key: " + key + ", value: " + deleted_value + " is deleted",
                );
            }
        }
    }
};

module.exports = dataStore;