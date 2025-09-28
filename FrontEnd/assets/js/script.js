// IMPORT
import {fetchWorks, genererListeFiltres, genererBoutonsFiltres, genererWorks, ajouterListenerFilterTous, ajouterListenerAllFilter} from "./fonction_metier.js";


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

ajouterListenerFilterTous (works);
ajouterListenerAllFilter (works);