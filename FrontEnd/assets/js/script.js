// IMPORT
import {genererBoutonsFiltres, addListenerFilterTous, addListenerAllFilter, modeAdmin, openCloseModalModify, generateGalleryModal, switchModalAddPhoto, generateCategories} from "./fonction_metier.js";
import {fetchWorks, genererListeFiltres, genererWorks} from "./fonction_get_data.js";

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
openCloseModalModify ();
generateGalleryModal (works);
switchModalAddPhoto ();
generateCategories (listeFiltres);