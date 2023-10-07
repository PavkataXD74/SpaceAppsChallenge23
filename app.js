import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const imagesRoot = "https://images-api.nasa.gov/search?keywords=";
const imageTitles = [
    "mercury,globe,south,pole",
    "capturing,venus,transit,from,iss",
    "earth",
    "mars,2003",
    "composite,image,of,the,planet,mars,taken,by,hubble,space,telescope",
    "earth-based,observation,of,jupiter",
    "saturn,with,rhea,and,dione,false,color",
    "keck,telescope,views,of,uranus",
    "neptune",
    "earth,moon",
    "europa"
]

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("earth");

    // axios.all(imageTitles.map((title, index) => axios.get(`${imagesRoot}${title}`)))
    // axios.get(`${imagesRoot}mercury`)
    // .then(response => {
    //     const randomImage = response.data.collection.items[Math.floor(Math.random() * 100)];
    //     console.log(randomImage.data);
    //     console.log("\n\n\n\n");
    //     res.render("main", {data: randomImage.links[0].href});
    // })
    // .catch(err => console.log(err));
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});