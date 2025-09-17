const serveur = "http://localhost:5678/api/";

async function fetchWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    return works;
}

const works = await fetchWorks();

function genererWorks (works) {
// Récupérer le futur parent
const parentGalery = document.querySelector(".gallery");

parentGalery.innerHTML += '';

    // Boucle pour constituer le bout d'HTML pour chaque work
    for (let i = 0; i < works.length; i++) {
        const work = works[i];

        console.log(work);

    let newWork = 
      '<figure>'
    + '<img src="' + work.imageUrl +'" alt="'+ work.title +'">'
    + '<figcaption>' + work.title + '</figcaption>'
    + '</figure>'
    ;

    parentGalery.innerHTML += newWork;
    // parentGalery.appendChild(newWork);
    }
}

genererWorks(works);