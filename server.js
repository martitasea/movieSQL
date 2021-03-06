const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "",
  connectionLimit: 5,
  database: "moviedb",
});
const port = 3000;
const express = require("express");
const bodyParser = require("body-parser");
const rutas = require("./rutas.js"); //Módulos propios funcionamiento
const app = express();

//---------------------------------------------------------------------------
// MIDDLEWARE
//---------------------------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: false })); //hace accesible la info
app.use(bodyParser.json()); // parse application/json
app.use(express.static("public")); //esta es la carpeta que mandamos a cliente
app.use("/films/:title", express.static(__dirname + "/public"));
app.use("/films/detail/:title", express.static(__dirname + "/public"));
app.use("/film/edit/:title", express.static(__dirname + "/public"));

//---------------------------------------------------------------------------
// MOTOR DE VISTA
//---------------------------------------------------------------------------
app.set("view engine", "./views"); //De donde lee el pug
app.set("view engine", "pug"); //Definimos el motor de vista

//---------------------------------------------------------------------------
//RUTAS
//---------------------------------------------------------------------------

//HOME
app.get("/", rutas.getHome);

//PAGINA DETALLES COGIDOS DE LA API
app.get("/films/:title", rutas.getFilmApi);

//MOSTRAR DETALLES HOME
app.get("/films/detail/:title", rutas.getFilmDetail);

//MOSTRAR EDITAR HOME
app.get("/film/edit/:title", rutas.editFilm);

//BORRAR DE HOME
app.post("/film/delete", rutas.deleteFilm);

//PAGINA DE FORMULARIO
app.get("/form", rutas.getForm);
app.post("/create", rutas.createFilm);
app.post("/update", rutas.updateFilm);

//ENRUTAMIENTO CON LA API
app.get("/api/films/:title", rutas.getApiFilm);

//TODAS LAS DEMÁS PÁGINAS
app.get("*", rutas.getAll);
app.post("/filmsave", rutas.saveFilmApi);

/* ----------------------------------------------------------------------
DEFINICIÓN DEL PUERTO AL QUE TIENEN QUE ATENDER
---------------------------------------------------------------------- */
app.listen(port, () => {
  console.log("-----------------------------------------------------------------------------------------")
  console.log(
    `TU SERVIDOR LOCAL ESTÁ EN LA SIGUIENTE RUTA http://localhost:${port}`
  );
  console.log("-----------------------------------------------------------------------------------------")
});
