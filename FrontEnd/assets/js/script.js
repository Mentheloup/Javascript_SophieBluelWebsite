// IMPORT
import {fetchWorks, genererListeFiltres, genererBoutonsFiltres, genererWorks} from "./fonction_metier.js";


// RECUPERER WORKS
const serveur = "http://localhost:5678/api/";

const works = await fetchWorks();

//GENERER BOUTONS FILTRES
const listeFiltres = new Set();

genererListeFiltres (listeFiltres, works);
genererBoutonsFiltres (listeFiltres);


// GENERER WORK A L'OUVERTURE DE LA PAGE

genererWorks (works);

// PRISE EN COMPTE DES FILTRES POUR GENERER LES WORKS

// Filtre 'Tous' à part car ne correspond pas à une category existante dans les date
const filterAll = document.querySelector("#filter-Tous");

filterAll.addEventListener("click", function() {
    // On vide les works
    document.querySelector(".gallery").innerHTML = '';

    // On en génère de nouveau, avec ou sans filtre
    genererWorks(works);
});

// Les autres filtres
const allFilters = document.querySelectorAll(".filter-choice:not(#filter-Tous)");

for (const filter of allFilters) {
    filter.addEventListener("click", function () {
        document.querySelector(".gallery").innerHTML = '';
        genererWorks(works.filter(work => work.category.name === this.value));
    })
};
