const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const https = require("https");

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(request,response){
  response.sendFile(__dirname +"/index.html")


app.post("/", function(request,response){
  const query = request.body.cityName;
  const appid = "454f0e304a934fd1b3741e0568342d7a"
  const url = "https://api.openweathermap.org/data/2.5/weather?appid="+ appid + "&q=" + query + "&units=metric"
  https.get(url, function(res){
    console.log(res.statusCode);

    res.on("data", function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const desc = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      // console.log(desc);
      response.write("<h1>Temperature in "+query + " is "+ temp+ " degree Celcius</h1>");
      response.write("<h3>The weather conditions is "+ desc+ " </h3>");
      response.write("<img src = " + imageurl +">");
      response.send()
    })
  });
});
})


app.listen(3000, function(){
  console.log("Starting server")
});
