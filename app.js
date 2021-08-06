const express=require('express');
const bodyParser=require('body-parser');
const ejs=require('ejs');
const fs=require('fs');
const axios=require('axios');
const mongoose=require('mongoose');
const { stringify } = require('querystring');
const https=require('https');

mongoose.connect("mongodb://localhost:27017/blogposts",{useNewUrlParser:true,useUnifiedTopology:true})

const schema=new mongoose.Schema({

    bt: String,
    bd: String

});

const blogpost=mongoose.model('blogpost',schema);


const schemacontact=new mongoose.Schema({

fn: String,

ln: String,
email: String
});
const contacttable=mongoose.model('contactedperson',schemacontact);


const loginschema=new mongoose.Schema({
    usr:String,
    pswd:String
})

const logintable=mongoose.model('logindetails',loginschema);
// blogpost.deleteMany({},(err)=>{
//     if(err)
//     {
//         console.log(err);
//     }
// })
const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.set('view engine',"ejs");


app.get('/',(req,res)=>{
    res.render('select');
})
app.get('/loginmain',(req,res)=>{
    res.render('loginmain')
})
app.get('/home',(req,res)=>{
    blogpost.find({},(err,result)=>{
            if(err)
            console.log(err);
            else
            {
                
                res.render('index',{posts:result});
            }
    })
   
})
app.get('/signup',(req,res)=>{
    res.render('signup');
})
app.get('/about',(req,res)=>{
    res.render('about')
})
app.get('/success',(req,res)=>{
    res.render('success');
})
app.get('/subscribe',(req,res)=>{
    res.render('subscribe');
})
app.get('/login',(req,res)=>{

    res.render('login');
})
app.get('/form',(req,res)=>{
    res.render('form');
})
app.get('/editpost',(req,res)=>{

        blogpost.findOne({_id:req.query.k},(err,result)=>{

            if(err)
            {
                console.log(err);
            }
            else
            {
                res.render('edit',{post:result,id:req.query.k});
            }
        })
});


app.get('/blogs',(req,res)=>{
    console.log(req.query.k)
    blogpost.findOne({_id:req.query.k},(err,result)=>{
        if(err)
        console.log(err);
        else
        {
            res.render('blog',{post:result});
        }
    })
})

app.get('/deletepost',(req,res)=>{
    blogpost.deleteOne({_id:req.query.k},(err,result)=>{
        if(err)
        console.log(err);
        else
        {
            res.redirect('/home');
        }
    })
})
app.post('/updatepost',(req,res)=>{
        const updateddata={bt:req.body.blogtitle,bd:req.body.blogdetails};
        blogpost.findByIdAndUpdate({_id:req.body.id},updateddata,(err,result)=>{
            if(err)
            {
                console.log(err);
            }
            else
            {
                res.redirect('/home');
            }
        })
})
app.post('/newpost',async (req,res)=>{
        
        const blogtitle=req.body.blogtitle;
       const blogdetail=req.body.blogdetails;
     const post=new blogpost({bt:blogtitle,bd:blogdetail});
        post.save();
      
            res.redirect('/home');

})

app.post('/contact',(req,res)=>{
    const person=new contacttable({fn:req.body.firstname,ln:req.body.lastname,email:req.body.email});
    person.save();
    res.redirect('/success');
})


app.post('/subscribe',async (req,res)=>{
    var firstname=req.body.firstname;
      var lastname=req.body.lastname;
      var email=req.body.email;
      const data={
          members:[{
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstname,
                LNAME:lastname
            }
          }]
      };
      const jsondata=JSON.stringify(data);
      const url='https://us1.api.mailchimp.com/3.0/lists/a9601e6a46';
      const options={
          method:'post',
          auth:'vishi:9514685d84e5d7a14b99c397cd773077-us1'
      }
       const request=https.request(url,options,function(response){
           if(response.statusCode===200)
           {
              res.redirect('/home');
           }
           else
           {
               res.redirect('/subscribe');
           }
            response.on('data',(data)=>{
               console.log("success");
            })
          
       })
        request.write(jsondata);
       request.end();
})

app.post('/login',(req,res)=>{
    var username=req.body.usr;
    var pswd=req.body.pswd;

    logintable.findOne({usr:username},(err,result)=>{
        if(err)
        console.log(err);
        else
        {
            if(pswd===result.pswd)
            {
                res.redirect('/home');
            }
            else
            {
                var p='Invalid';
                var a='Crediantials';
                res.render('login',{data:p,data2:a});
            }
        }
    })
})
app.post('/signup',(req,res)=>{

    var logindetail=new logintable({usr:req.body.usr,pswd:req.body.pswd});
    logintable.find({usr:req.body.usr,pswd:req.body.pswd},(err,result)=>{
        if(err)
        console.log(err);
        else
        {
            if(result.length===0)
            {
                logindetail.save();
            }
        }
    })

    res.redirect('/home');
})


app.listen(process.env.PORT || 4000);











// apikey
// 9514685d84e5d7a14b99c397cd773077-us1
// audience ID
// a9601e6a46