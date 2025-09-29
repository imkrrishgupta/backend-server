import express from "express";

const app = express()  // It is a powerful object it has so many things that it can do
const port = 3000;
app.use(express.json());  // We will accept anything that will come from FrontEnd as json() format

let teaData = [];  // We will store data in array format
let nextId = 1;  // We will use Id to uniquely identify our data

// add a new tea
app.post("/teas", (req, res) => {  // Whenever we take any data, the chances are high that we will use `post` method...and majority of the time when we want to save the data to the database
    const {name, price} = req.body  // De-structuring the data on the go
    const newTea = {id: nextId++, name, price}  // Now i want to create an object so that I can store the object on the database
    teaData.push(newTea);
    res.status(201).send(newTea);
});

//get all tea
app.get("/teas", (req, res) => {  // We use this bacause whenever our server is restarting the data got vanished....so we created an array and `get` the data in a professional way
    res.status(200).send(teaData);
});

//get a tea with Id
app.get("/teas/:id", (req, res) => {  // How can we get the single tea...since we are storing the Id's we will give the Id.....Whatever we will write after "/teas/" will be my "id"
    const tea = teaData.find(t => t.id === parseInt(req.params.id))  // We will find the tea just like we find in array....whenever we are extracting from the body, we use `req.body()`....but whenever we are extracting anything from the url we use `req.params`
    if (!tea){
        return res.status(404).send("Tea not found");
    }
    res.status(200).send(tea);
});

//update tea
app.put("/teas/:id", (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));

    if (!tea){
        return res.status(404).send("Tea not found");
    }
    const {name, price} = req.body
    tea.name = name;
    tea.price = price;
    res.send(200).send(tea);  // We have never saved the variable `tea`..it's a whole object...that's why it said it like that
});

//delete tea
app.delete("/teas/:id", (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))  // We use index to delete the data not `id`
    if (index === -1){
        return res.status(404).send("Tea not found");
    }
    teaData.splice(index, 1);
    return res.status(204).send("deleted");
});

app.listen(port, () => {
    console.log(`Server is running at port: ${port}...`);
});