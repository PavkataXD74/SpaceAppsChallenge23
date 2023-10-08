import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const imagesRoot = "https://images-api.nasa.gov/asset/";
const imageTitles = {
    "NASA's SDO Sees Giant Filament on the Sun": "GSFC_20171208_Archive_e000790",
    "Mercury Globe South Pole": "PIA15164",
    "Capturing Venus Transit from ISS": "GSFC_20171208_Archive_e001747",
    "Earth": "PIA18033",
    "Earth Moon": "PIA00405",
    "Acidalia and Chryse Plains, Mars": "PIA02000",
    "Earth-based Observation of Jupiter": "PIA22936",
    "Saturn with Rhea and Dione false color": "PIA01143",
    "Uranus - Discrete Cloud": "PIA00370",
    "Neptune": "PIA01998",
};

// const horizonsStart = "https://ssd.jpl.nasa.gov/api/horizons.api?COMMAND='";
// const horizonsEnd = "'&OBJ_DATA='YES'&MAKE_EPHEM='YES'&EPHEM_TYPE='OBSERVER'&CENTER='@sun'&START_TIME='2023-10-08'&STOP_TIME='2023-10-09'&STEP_SIZE='1h'&QUANTITIES='1,9,20,23,24,29'&format=text"
// const commandNumber = ["1", "2", "399"];

// const monthNames = [
//     "Jan", "Feb", "Mar", "Apr",
//     "May", "Jun", "Jul", "Aug",
//     "Sep", "Oct", "Nov", "Dec"
// ];

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/main", (req, res) => {
    res.render("index", { page: "horizontal.ejs", nasaData: [] });
});

app.get("/top-down", (req, res) => {
    const nasaData = Array.from({ length: 8 }, () => Math.floor(Math.random() * 360));

    res.render("index", { page: "top_down.ejs", nasaData: nasaData });
//     const year = currentDate.getFullYear();
//     const month = monthNames[currentDate.getMonth()];
//     const day = currentDate.getDate();

//     const hour = currentDate.getHours().toString().padStart(2, '0');

//     const formattedDate = ` ${year}-${month}-${day.toString().padStart(2, '0')}`;

//     axios.all(commandNumber.map(command => axios.get(`${horizonsStart}${command}${horizonsEnd}`)))
//     .then(response => {
//         const degrees= [];
//         for(let i = 0; i < response.length; i++) {
//             const splitResponse = response[i].data.split("\n");
//             let actualData;
            
//             for(let i = 0; i <  splitResponse.length; i++) {
//                 if(splitResponse[i].startsWith(formattedDate) && splitResponse[i].substr(13, 2) === hour) {
//                     actualData = splitResponse[i];
//                 }
//             }
//             const xInMintues = actualData.substr(23, 5);
//             const yInMintues = actualData.substr(35, 6);
//             const x = Number(xInMintues.substr(0, 2)) + (Number(xInMintues.substr(3,2)) / 60) + (Number(xInMintues.substr(5,4)) / 3600);
//             const y = Number(yInMintues.substr(0, 3)) + (Number(yInMintues.substr(4,3)) / 60) + (Number(yInMintues.substr(7,3)) / 3600);
//             let degree = (x / y) * (180 / 3.14);

//             if(degree < 0) {
//                 degree = 360 + degree;
//             }

//             degrees.push(degree);
//         }
//         console.log(degrees);
//         res.render("index", { page: "top_down.ejs", nasaData: [degrees] });
//     })
//     .catch(err => console.log(err.response.data));
})

app.get("/nasa-images", (req, res) => {
    const imageLinks = [];

    axios.all(Object.values(imageTitles).map(id => axios.get(`${imagesRoot}${id}`)))
    .then(response => {
        for(let i = 0; i < response.length; i++) {
            const nasaImage = response[i].data.collection.items.at(-2); 
            imageLinks.push(nasaImage.href);
        }

        res.render("index", { page: "horizontal.ejs", nasaData: imageLinks });
    })
    .catch(err => console.log(err));
})

app.get(["/", "/main"], (req, res) => {
    res.redirect("/main");
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
