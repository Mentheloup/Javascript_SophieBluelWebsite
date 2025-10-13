//CREER FICHIER GET DATA

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

// BUTTONS
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

export function addListenerFilterTous (works) {
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

export function addListenerAllFilter (works) {
    // Les autres filtres
    const allFilters = document.querySelectorAll(".filter-choice:not(#filter-Tous)");

    for (const filter of allFilters) {
        filter.addEventListener("click", function () {
            document.querySelector(".gallery").innerHTML = '';
            genererWorks(works.filter(work => work.category.name === this.value));
        })
    };
};


// GESTION TOKEN

export function modeAdmin (token) {
    if (token !== null) {

        console.log("Admin !");

        document.getElementById('filterSection').className = "hidden";
        document.getElementById('modifyButton').style = "";
    

    } else {

        console.log("Visiteur");
    };
};

//GESTION MODAL MODIFY

export function modalModify () {
    // Get the modal
    const modal = document.getElementById("modalModify");

    // Get the button that opens the modal
    const modifyButton = document.getElementById("modifyButton");

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];

    const modalGallery = document.getElementById("modal-content-gallery");
    const modalAddPicture = document.getElementById("modal-content-add-picture");

    // When the user clicks the button, open the modal 
    modifyButton.onclick = function() {
    modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        modalGallery.style.display = "block";
        modalAddPicture.style.display = "none";
    }
    }
};

export function galleryModal (works) {
    // Récupérer le futur parent
    const parentGalleryModal = document.querySelector("#galeryModify");

    parentGalleryModal.innerHTML += '';

    // Boucle pour constituer le bout d'HTML pour chaque work
    for (let i = 0; i < works.length; i++) {
        const work = works[i];

        let newWorkModal = 
        '<div class="littleFigure">'
        + '<img src="' + work.imageUrl +'" alt="'+ work.title +'">'
        + '<button class="deleteButton"><i class=" fa-solid fa-trash-can"></i></button>'
        + '</div>'
        ;

        parentGalleryModal.innerHTML += newWorkModal;
    }
};

export function addPhoto () {
    const modal = document.getElementById("modalModify");
    const modalGallery = document.getElementById("modal-content-gallery");
    const modalAddPicture = document.getElementById("modal-content-add-picture");
    const addPictureButton = document.getElementById("addPicture");
    const span = document.getElementsByClassName("close")[1];

    addPictureButton.onclick = function() {
        modalGallery.style.display = "none";
        modalAddPicture.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
        modalGallery.style.display = "block";
        modalAddPicture.style.display = "none";
    }
};

export function genererCategories (listeFiltres) {

    console.log('Hello');
    // Récupérer le futur parent
    const parentGallery = document.querySelector("#categorie");

    parentGallery.innerHTML += '<option value=""></option>' ;

    listeFiltres.delete('Tous');

    // Boucle pour constituer le bout d'HTML pour chaque work
    for (const categorie of listeFiltres) {
        console.log(categorie);
        let newCategorie = '<option value="' + categorie + '">' + categorie + '</option>';

        parentGallery.innerHTML += newCategorie;
    }
}