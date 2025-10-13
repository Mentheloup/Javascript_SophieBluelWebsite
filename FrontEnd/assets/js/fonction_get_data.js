//RECUPERER INFO BACK-END
export async function fetchWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    return works;
}

// CATEGORIES
export function generateListeFiltres (listeFiltres, works) {

    listeFiltres.add("Tous");

    for (let i = 0; i < works.length; i++) {
        listeFiltres.add(works[i].category.name);
    }

}