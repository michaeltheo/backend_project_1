const Joi=require('joi');
const express=require('express');

const app=express();
app.use(express.json());

const movies=[
    { id: 1, title: "John Wick" },
    { id: 2, title: "Knives out" },
    { id: 3, title: "Saw" }
];

app.get("/movies", (req, res) => {
    res.send(movies);   
  });

app.post('/movies',(req,res)=>{
    const movie={
        id:movies.length+1,
        title:req.body.title
    };

    if(!req.body.title) return res.status(400).send("No title given");
    movies.push(movies);
    res.send(movie);
    
});

//put method 
app.put('/movies/:id',(req,res)=>{
    const movie=movies.find(m => m.id === parseInt(req.params.id));
    if(!movie){
         res.status(404).send('the movie with the given id was not found');
         return;    
    }

    const {error}=validateMovies(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    movie.title=req.body.title;
    res.send(movie);
});


//delete method 
app.delete('/movies/:id',(req,res)=>{
    const movie=movies.find(m => m.id === parseInt(req.params.id));
    if(!movie){
        return res.status(404).send('the movie with the given id was not found');
    }
    const index=movies.indexOf(movie);
    movies.splice(index,1);
    res.send(movie);
});

//geners
 
const genres=[
    {id:1,name:"Comedy"},
    {id:2,name:"Horror"},
    {id:3,name:"Animated"}
    ];

    app.get("/genres", (req, res) => {
        res.send(genres);   
      });
    
    app.post('/genres',(req,res)=>{
        const genre={
            id:genres.length+1,
            name:req.body.name
        };
        if(!req.body.name) return res.status(400).send("No name given");
        genres.push(genres);
        res.send(genre);
    });

    app.put('/genres/:id',(req,res)=>{
        const genre=genres.find(g => g.id === parseInt(req.params.id));
        if(!genre){
             res.status(404).send('the genre with the given id was not found');
             return;    
        }
    
        const {error}=validateGengre(req.body);
        if(error){
            return res.status(400).send(error.details[0].message);
        }
    
        genre.name=req.body.name;
        res.send(genre);
    });
    
    app.delete('/genres/:id',(req,res)=>{
        const genre=genres.find(g => g.id === parseInt(req.params.id));
        if(!genre){
            return res.status(404).send('the genre with the given id was not found');
        }
        const index=genres.indexOf(genre);
        genres.splice(index,1);
        res.send(genre);
    });
    





























function validateMovies(movie){
    const schema={
        title: Joi.string().min(2).required()
    };
    return Joi.validate(movie,schema);
}

function validateGengre(genre){
    const schema={
        name: Joi.string().min(2).required()
    };
    return Joi.validate(genre,schema);
}





app.listen(3000,()=>{
    console.log("Server running on port 3000");
})
