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
        let nouveauFiltre = '<h2>' + element + '</h2>';
        baliseFilter.innerHTML += nouveauFiltre;
    }
}

// WORKS

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

//UTILISER LES FONCTIONS

genererListeFiltres (works);
genererBoutonsFiltres (listeFiltres);
genererWorks(works);