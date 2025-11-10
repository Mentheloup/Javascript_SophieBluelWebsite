//RECUPERER INFO BACK-END
export async function fetchWorks(serveur) {
    const response = await fetch(serveur + "works");
    const works = await response.json();
    return works;
}

// FONCTION POUR RECUPERER LES CATEGORIES
export async function fetchCategories (serveur) {
    const response = await fetch(serveur + "categories");
    const categories = await response.json();
    return categories;
}


// CATEGORIES
export function generateListeFiltres (listeFiltres, works) {

    listeFiltres.add("Tous");

    for (let i = 0; i < works.length; i++) {
        listeFiltres.add(works[i].category.name);
    }

}
