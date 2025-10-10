// IMPORT
import {fetchWorks, genererListeFiltres, genererBoutonsFiltres, genererWorks, addListenerFilterTous, addListenerAllFilter, modeAdmin, modalModify} from "./fonction_metier.js";


// RECUPERER WORKS
const serveur = "http://localhost:5678/api/";

const works = await fetchWorks();

//GENERER BOUTONS FILTRES
const listeFiltres = new Set();

genererListeFiltres (listeFiltres, works);
genererBoutonsFiltres (listeFiltres);


// GENERER WORK A L'OUVERTURE DE LA PAGE

genererWorks (works);

// AJOUT LISTENER FILTER

addListenerFilterTous (works);
addListenerAllFilter (works);

// VERIFICATION TOKEN POUR LE MODE ADMIN

const token = window.localStorage.getItem("token");

modeAdmin (token);

//GESTION MODAL MODIFY
modalModify ();