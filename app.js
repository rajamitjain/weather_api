const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")
})

app.post("/cityData",function(req,res){
    const query=req.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=71e98c212ac54b759a8c6336cd7b99c8&units=metric";
    https.get(url,function(response){
      response.on("data",function(data){
        const weatherData = JSON.parse(data);
        const temp=weatherData.main.temp;
        const description=weatherData.weather[0].description;
        const iconid = weatherData.weather[0].icon;
        const imageUrl="http://openweathermap.org/img/wn/"+iconid+"@2x.png";
        res.write("<style>body{background-color:silver;text-align:center;padding-top:200px;}</style><h1> The Temperature in "+query+" is "+ temp+ " degrees celsius</h1>");
        res.write("<h3> The Weather description is : "+ description + " </h3>");
        res.write("<img src="+imageUrl+">");
        res.send();
      })
    })

})



app.listen(3000,function(){
  console.log("Server is up and runnin");
})
