import bodyParser from "body-parser"; //bodyparser middlewear to parse incoming request bodies, particulary useful for handling POST requests.
import cors from "cors"; //Middleweare to enable cross-origin ResourcesSharing, which allows our application to handle request from different origins.
import dotenv from "dotenv"; //module to load envirnment variables from a `.env` file, keeping sensitive data secure.
import express from "express"; //A webframework for Node.js used to build application's server.
import helmet from "helmet"; //helps secure application by setting various HTTP headers
import mongoose from "mongoose";
import morgan from "morgan"; //HTTP request logger middleweare logging requests.
import multer from "multer"; //Multer middleweare to handle file uplods.
import path from "path"; //provides utilites for working with fle and directory paths.
import { fileURLToPath } from "url"; //fileURLToPath: a utility to get the file path from a `file:` URL.

/* CONFIGURATIONS */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}));
app.use(cors());
app.use("/assets", express.static(path.json(__dirname, 'public/assets')));


   /* File Storage */

const storage = multer.diskStorage({
    destination: function(req, file, cb)
{
    cb(null, "public/assets");
}, 
filename: function (req, file, cb){
    cb(null, file.originalname);
},
});
const upload = multer({storage});


/*Mongoose Setup */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParse:true,
    useUnifiedTopology:true,

}).then(()=>{
    app.listen(PORT, ()=> console.log(`Server Port: ${PORT}`));

}).catch((error)=>console.log(`${error} did not connect`));