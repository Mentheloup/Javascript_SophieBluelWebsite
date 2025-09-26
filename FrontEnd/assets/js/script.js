import {fetchWorks, genererListeFiltres, genererBoutonsFiltres, genererWorks} from "./fonction_metier.js";

const serveur = "http://localhost:5678/api/";

const works = await fetchWorks();

console.log(works);

// BOUTONS FILTRES

const listeFiltres = new Set();

// const filter = "Tous";

// //UTILISER LES FONCTIONS

genererListeFiltres (listeFiltres, works);

console.log(listeFiltres);
genererBoutonsFiltres (listeFiltres);
genererWorks(works);

// genererWorksByFilter(filter, works);

// // WORKS FILTRER

// const boutonFiltreObjets = document.querySelector(".filtre-Objets");

// boutonFiltreObjets.addEventListener("click", function () {

//     boutonFiltreObjets.classList.add('change-color-filter');
//     console.log("Je veux");

//     // for (let i = 0; i < works.length; i++) {
//     //     if (works[i].category.name === "Tous") {
//     //         genererWorks(works);

//     //     } else {
//     //         // genererWorks(works.filter(work => work.category.name === works[1].category.name));
            
//     //     }
//     // };

//     let workFilter = works.filter(work => work.category.name === "Objets");

//     console.log(workFilter);

//     const baliseFilter = document.querySelector("filter");

//     baliseFilter.innerHTML = '';

//     // genererWorks(workFilter);

    
//     // for (let i = 0; i < works.length; i++) {
//     //     if (works[i].category.name != "Objets") {
//     //         works.filter(work => work.category.name === "Objects");
//     //         console.log(works);
//     //         return works;
//     //     }
//     //     else {
//     //         return works;
//     //     };
//     // };

    
// });

// function genererWorksByFilter (filter, worksList) {
//     if (filter.value === "") {
//         genererWorks(worksList);
//     } else {
//         genererWorks(worksList.filter(work => work.category.name === "Objets"));
//     };
// }