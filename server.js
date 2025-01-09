import express from "express";
const app = express();
const port =3000;
import axios from "axios"

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));

const apiurl="http://localhost:4000/api";

app.get("/", async (req,res)=>{
    try{
        const response= await axios.get(apiurl);
        res.render("index.ejs", {postss: response.data});
    }catch{
        res.send(`<h1>sorry wrong request<h1>`);
    }
})

app.get("/add", (req,res)=>{
    res.render("modify.ejs",{heading:"Add New Blog", submit:"Commit"})
})
app.post("/add", async (req,res)=>{
    try{
        await axios.post(`${apiurl}/add`, req.body);
        res.redirect("/");
    }
    catch{
        res.send(`<h1>sorry wrong request<h1>`);
    }
})

app.get("/edit/:id",async (req,res)=>{
    try{
        const response= await axios.get(`${apiurl}/${req.params.id}`);
      res.render("modify.ejs", {heading:"Edit", submit:"Commit Change", postss:response.data})
    }
    catch{
        res.send(`<h1>sorry wrong request<h1>`);
    }
})
app.post("/edit/:id", async (req,res)=>{
    try{
        const response=await axios.patch(`${apiurl}/edit/${req.params.id}`, req.body)
        console.log(response.data);
        res.redirect("/");
    }
    catch{
        res.send(`<h1>sorry wrong request<h1>`);
    }
})

app.get("/edit/delete/:id", async (req,res)=>{
    try{
        await axios.delete(`${apiurl}/delete/${req.params.id}`);
        res.redirect("/");
    }
    catch{
        res.send(`<h1>sorry wrong request<h1>`);
    }
})

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})