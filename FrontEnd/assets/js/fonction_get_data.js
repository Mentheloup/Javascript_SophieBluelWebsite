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

// export async function requestDeleteWork(id, token) {

//     const requestDelete = await fetch("http://localhost:5678/api/works/{" + id + "}",
//         {
//         method: "DELETE",
//         headers: { 
//             "Accept" : "*/*",
//             "Authorization": `Bearer ${token}`
//             }
//         }
//     );
    
//     const response = await requestDelete.json();
//     console.log(response);
// }