//RECUPERER INFO BACK-END
export async function fetchWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    return works;
}

// WORKS

export function genererWorks (works) {
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

// BUTTONS
export function genererListeFiltres (listeFiltres, works) {

    listeFiltres.add("Tous");

    for (let i = 0; i < works.length; i++) {
        listeFiltres.add(works[i].category.name);
    }

}

export function genererBoutonsFiltres (listeFiltres) {

    //Sous quelle balise
    const baliseFilter = document.querySelector("filter");

    baliseFilter.innerHTML = '';
    
    //Pour chaque element du set, créer bouton
    for (const element of listeFiltres) {

        let nouveauFiltre =
        '<input type="radio" id="filter-'+ element + '" class="filter-choice" name ="filter-choice" value="' + element + '" hidden/>'
        + '<label id="label-filter-' + element +'" for="filter-' + element + '">' + element + '</label>';
        baliseFilter.innerHTML += nouveauFiltre;

    }

    //Checked par défaut le filtre 'Tous'
    const boutonFiltreTous = document.querySelector("#filter-Tous");
    boutonFiltreTous.checked = true;
}

// FILTER

export function ajouterListenerFilterTous (works) {
    // PRISE EN COMPTE DES FILTRES POUR GENERER LES WORKS
    
    // Filtre 'Tous' à part car ne correspond pas à une category existante dans les data
    const filterAll = document.querySelector("#filter-Tous");
    
    filterAll.addEventListener("click", function() {
        // On vide les works
        document.querySelector(".gallery").innerHTML = '';
    
        // On en génère de nouveau, avec ou sans filtre
        genererWorks(works);
    });
};

export function ajouterListenerAllFilter (works) {
    // Les autres filtres
    const allFilters = document.querySelectorAll(".filter-choice:not(#filter-Tous)");

    for (const filter of allFilters) {
        filter.addEventListener("click", function () {
            document.querySelector(".gallery").innerHTML = '';
            genererWorks(works.filter(work => work.category.name === this.value));
        })
    };
};


// VERIFICATION TOKEN POUR LE MODE ADMIN

export function modeAdmin (token) {
    if (token === 'abcd') {

        console.log("Admin !");

        document.getElementById('filterSection').className = "";
    

    } else {

        console.log("Visiteur");
    };
};