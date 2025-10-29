// IMPORT
import {generateBoutonsFiltres, generateWorks, addListenerFilterTous, addListenerAllFilter, modeAdmin, openCloseModalModify, generateGalleryModal, addListenerInput, switchModalAddPhoto, generateCategories, addListenerDeleteWork, addListenerLogout} from "./fonction_metier.js";
import {fetchWorks, generateListeFiltres} from "./fonction_get_data.js";

// RECUPERER WORKS
const serveur = "http://localhost:5678/api/";

const works = await fetchWorks();

//GENERER BOUTONS FILTRES
const listeFiltres = new Set();

generateListeFiltres (listeFiltres, works);
generateBoutonsFiltres (listeFiltres);


// GENERER WORK A L'OUVERTURE DE LA PAGE

generateWorks (works);

// AJOUT LISTENER FILTER

addListenerFilterTous (works);
addListenerAllFilter (works);

// VERIFICATION TOKEN POUR LE MODE ADMIN

const token = window.localStorage.getItem("token");

modeAdmin (token);

if (token !== null) {
    addListenerLogout();
}

//GESTION MODAL MODIFY
openCloseModalModify ();
generateGalleryModal (works);
switchModalAddPhoto ();
generateCategories (listeFiltres);
addListenerDeleteWork(works);
addListenerInput();