const fs = require("fs");

let rawdata = fs.readFileSync("workout.json");
let jsonobj = JSON.parse(rawdata);
console.log(jsonobj);

var key = "Pratik";
var obj = {};
obj[key] = { value: 1000, time_to_live: 60 };

jsonobj.push(obj);
let data = JSON.stringify(jsonobj, null, 2);
fs.writeFileSync("workout.json", data);
console.log("written");