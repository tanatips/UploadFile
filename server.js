const express = require("express");
const cors = require('cors');
const app = express();
const fileupload = require("express-fileupload");
// Set up a whitelist and check against it:
var whitelist = ['http://localhost:9000/upload','http://localhost:3000'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));
app.use(fileupload());

app.get('/',(req,res)=>{
    //res.json({message:'API upload!'})
    res.sendFile(__dirname+"/index.html");
});
app.get('/general',(req,res)=>{

});
app.get('/protected',(req,res)=>{

});
app.post('/upload',(req,res)=>{
    if(req.files){
        console.log(req.files);
        var file= req.files.filename;
            filename = file.name;
            file.mv("./upload/"+filename,function(err){
                if(err){
                    console.log(err);
                    //res.send("error occured");
                    res.json({message:err});
                }
                else{
                    res.json({message:"Done"});
                }
            })
    }
})
app.listen(9000,()=>{
    console.log('Application is running on port 9000')
})