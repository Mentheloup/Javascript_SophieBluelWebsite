const serveur = "http://localhost:5678/api/";


//RECUPERER INFO BACK-END
async function fetchWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    return works;
}

const works = await fetchWorks();

// BOUTONS FILTRES

const listeFiltres = new Set();

// On régupère les valeurs des filtres
function genererListeFiltres (works) {

    listeFiltres.add("Tous");

    for (let i = 0; i < works.length; i++) {
        listeFiltres.add(works[i].category.name);
    }

}

// On génère les boutons
function genererBoutonsFiltres (listeFiltres) {

    //Sous quelle balise
    const baliseFilter = document.querySelector("filter");

    baliseFilter.innerHTML = '';
    
    //Pour chaque element du set, créer bouton
    for (const element of listeFiltres) {
        let nouveauFiltre = '<h2 class="filtre-' + element +'">' + element + '</h2>';
        baliseFilter.innerHTML += nouveauFiltre;
    }

    //Mettre filtre 'Tous' en vert par défaut
    const boutonFiltreTous = document.querySelector(".filtre-Tous");
    boutonFiltreTous.classList.add('change-color-filter');
}

// WORKS

// Générer le HTML pour les work
function genererWorks (works) {
    // Récupérer le futur parent
    const parentGalery = document.querySelector(".gallery");

    parentGalery.innerHTML += '';

    // Boucle pour constituer le bout d'HTML pour chaque work
    for (let i = 0; i < works.length; i++) {
        const work = works[i];

        let newWork = 
        '<figure>'
        + '<img src="' + work.imageUrl +'" alt="'+ work.title +'">'
        + '<figcaption>' + work.title + '</figcaption>'
        + '</figure>'
        ;

        parentGalery.innerHTML += newWork;
    }
}

const filter = "Tous";

//UTILISER LES FONCTIONS

genererListeFiltres (works);
genererBoutonsFiltres (listeFiltres);
// genererWorks(works);
genererWorksByFilter(filter, works);

// WORKS FILTRER

const boutonFiltreObjets = document.querySelector(".filtre-Objets");

boutonFiltreObjets.addEventListener("click", function () {

    boutonFiltreObjets.classList.add('change-color-filter');
    console.log("Je veux");

    // for (let i = 0; i < works.length; i++) {
    //     if (works[i].category.name === "Tous") {
    //         genererWorks(works);

    //     } else {
    //         // genererWorks(works.filter(work => work.category.name === works[1].category.name));
            
    //     }
    // };

    let workFilter = works.filter(work => work.category.name === "Objets");

    console.log(workFilter);

    const baliseFilter = document.querySelector("filter");

    baliseFilter.innerHTML = '';

    // genererWorks(workFilter);

    
    // for (let i = 0; i < works.length; i++) {
    //     if (works[i].category.name != "Objets") {
    //         works.filter(work => work.category.name === "Objects");
    //         console.log(works);
    //         return works;
    //     }
    //     else {
    //         return works;
    //     };
    // };

    
});

function genererWorksByFilter (filter, worksList) {
    if (filter.value === "") {
        genererWorks(worksList);
    } else {
        genererWorks(worksList.filter(work => work.category.name === "Objets"));
    };
}