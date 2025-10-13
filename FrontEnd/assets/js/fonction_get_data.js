//RECUPERER INFO BACK-END
export async function fetchWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    return works;
}

// WORKS

export function genererWorks (works) {
    // Récupérer le futur parent
    const parentGallery = document.querySelector(".gallery");

    parentGallery.innerHTML += '';

    // Boucle pour constituer le bout d'HTML pour chaque work
    for (let i = 0; i < works.length; i++) {
        const work = works[i];

        let newWork = 
        '<figure>'
        + '<img src="' + work.imageUrl +'" alt="'+ work.title +'">'
        + '<figcaption>' + work.title + '</figcaption>'
        + '</figure>'
        ;

        parentGallery.innerHTML += newWork;
    }
}

// CATEGORIES
export function genererListeFiltres (listeFiltres, works) {

    listeFiltres.add("Tous");

    for (let i = 0; i < works.length; i++) {
        listeFiltres.add(works[i].category.name);
    }

}