    import express from 'express';
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req,res) => {
    const code =
`This is the default page of CodeBin`
    res.render('default', { code, lineNumber : code.split("\n").length })
});

app.get('/new', (req,res) => {
    res.render('new');
});

app.listen(3000);
