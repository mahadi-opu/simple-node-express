const express = require('express');
var cors = require('cors')
const app = express();
const port =5000;



app.use(cors())
app.use(express.json());


app.get('/',(req,res) =>{
    res.send('asfsdafaskdfdasfds with node mon automatic restart');
})

const users =[
    {
        id:0, 
        name:'Mahadi Hasan',
        email:'mahadi@gmail.com',
        phone:'01924224778'
    },
    {
        id:1, 
        name:'Nishanul Habib',
        email:'nishanul@gmail.com',
        phone:'01924224778'
    },
    {
        id:2, 
        name:'Muhaiminul Habib',
        email:'muhaiminul@gmail.com',
        phone:'01924224778'
    },
    {
        id:3, 
        name:'Taima Tabassum',
        email:'taima@gmail.com',
        phone:'01924224778'
    }
]

// GEt Method
app.get('/users',(req, res)=>{
    const search =req.query.search;
   if(search){
        const searchResult = users.filter(user => user.name.toLocaleLowerCase().includes(search));
        res.send(searchResult);
   }
   else{
       res.send(users)
   }
});

// Post Method
app.post('/users',(req,res)=>{
    const newUser =req.body;
    newUser.id = users.length;
    users.push(newUser);
    console.log('hitting the post',req.body)
   // res.send(JSON.stringify(newUser))
    res.json(newUser);
})



//Dynamic Api
app.get('/users', (req,res)=> {
    res.send(users)
});

app.get('/users/:id',(req,res) =>{
    const id = req.params.id;
    const user =users[id];
    res.send(user);
})

app.get('/fruits',(req,res)=>{
    res.send(['mango', 'Oranges', 'banna', 'apple'])
})

app.listen(port, () =>{
    console.log('Listianing to port',port);
})