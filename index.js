import 'dotenv/config'
import express from 'express';
const app = express();
import mongoose from 'mongoose';
import documentSchema from './model/documentSchema.js'

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

// Database Connection
mongoose.connect(process.env.MONGO_URL,(err) => {
    if(err){
        throw err
    }
    console.log("Connected")
})

//Routes
app.get('/', (req,res) => {
    const code = 
    `This is the default page of CodeBin and this`
    res.render('default', { code, lineNumber : code.split("\n").length })
});

app.get('/new', (req,res) => {
    res.render('new');
});

app.post('/save', async (req,res) => {
    const code = req.body.value;
    console.log(code)
    try{
    const doc = await documentSchema.create({code})  

    console.log(doc)
    res.redirect(`/${doc._id}`);

} catch {
    console.log("error")
}
});

app.get("/:id", async(req,res) => {
    const id = req.params.id;

    try{
        const value = await documentSchema.findById(id);
        res.render('default', {code : value.code, lineNumber : value.code.split("\n").length, isCode:true, duplicateEdit: true, id});
    } catch {
        res.redirect('/new');
    }
})

app.get("/:id/duplicateEdit",async(req,res) => {
    const id = req.params.id

    try{
        const value = await documentSchema.findById(id);
        res.render('new');
    } catch {
        res.redirect('/');
    }
});

//Port on which the app will listen
app.listen(3000);
