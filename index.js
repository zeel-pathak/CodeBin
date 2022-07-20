import 'dotenv/config'
import express from 'express';
const app = express();
import mongoose from 'mongoose';
import documentSchema from './model/documentSchema.js'
import {text} from './text.js'

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

// Database Connection
mongoose.connect(process.env.MONGO_URL,(err) => {
    if(err){
        throw err
    }
})

//Routes
app.get('/', (req,res) => {
    const code = text

    res.render('default', { code, lineNumber : code.split("\n").length, page: "> Home" })
});

app.get('/new', (req,res) => {
    res.render('new', {page:"> new"});
});

app.post('/save', async (req,res) => {
    const code = req.body.value;
 
    try{
        const doc = await documentSchema.create({code})  
        res.redirect(`/${doc._id}`);
    } catch {  
        res.render('new', {value: code});
    }
});

app.get("/:id", async(req,res) => {
    const id = req.params.id;

    try{
        const value = await documentSchema.findById(id);
        res.render('default', {code : value.code, lineNumber : value.code.split("\n").length, isCode:true, duplicateEdit: true, justText:true, id, page: "> Code"});
    } catch {
        res.redirect('/new');
    }
})

app.get("/:id/duplicateEdit",async(req,res) => {
    const id = req.params.id

    try{
        const value = await documentSchema.findById(id);
        res.render('new', {value: value.code, page: "> duplicate & edit"});
    } catch {
        res.redirect(`/${id}`);
    }
});

app.get("/:id/justText", async(req,res) => {
    
    const id = req.params.id
    try{
        const value = await documentSchema.findById(id);
        res.render('jusText', {value: value.code, page: "> just text"});
    } catch {
        res.redirect(`/${id}`);
    }
});


// API for CLI tool


//Port on which the app will listen
const port = process.env.PORT || 5000;
app.listen(port);
