const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const cheerio = require("cheerio"); //adding cheerio to add dom functionality
const $ = cheerio.load(fs.readFileSync(__dirname + "/index.html")); //naming it $ to make it familiar with JQuery
const result = cheerio.load(fs.readFileSync(__dirname + "/result.html")); //loading the result page for dom manipulation
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, '/')));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});
 //logging is helpful
app.post("/", function(req, res){
    
    var gradepoints = [];  //declaring it before is extremely important
    var credits = [];
    gradepoints = req.body.points; //there are multiple inputs with the name name so this returns an array. 
    credits = req.body.credits;
    var weightedSum = 0;  //declaring it before is extremely important
    var creditsSum = 0;  //declaring it before is extremely important
    for(var i = 0; i < gradepoints.length; i++)
    {
	if((credits[i]) == '' && gradepoints[i] == ''){
	    credits[i] = 0;
	    gradepoints[i] = 0;
	}
	weightedSum = weightedSum + parseInt(credits[i]) * parseInt(gradepoints[i]);
	creditsSum = creditsSum + parseInt(credits[i]);
    }
    var sgpa = weightedSum/creditsSum;
    var sgpaString = sgpa.toString(10);
    result("em").text(sgpaString);
    res.send(result.html());
    

});
app.listen(3000, function(){
    console.log("Server started at port 3000");
});

var row = '<tr><td><input name="cName" placeholder="Course Name" type="text" value=""/></td><td><input name="credits" type="text" placeholder="Credits" value=""/></td><td><input name="points" type="text" placeholder="Grade Points" value=""/></td></tr>';


app.post("/addrow", function(req, res){ //this works yayy :)
    $("table").append(row);
    res.send($.html());
    console.log($.html());
});

//finally completed :)
