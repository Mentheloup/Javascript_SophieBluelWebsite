// WORKS

export function generateWorks (works) {
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

// BUTTONS
export function generateBoutonsFiltres (listeFiltres) {

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
        generateWorks(works);
    });
};

export function addListenerAllFilter (works) {
    // Les autres filtres
    const allFilters = document.querySelectorAll(".filter-choice:not(#filter-Tous)");

    for (const filter of allFilters) {
        filter.addEventListener("click", function () {
            document.querySelector(".gallery").innerHTML = '';
            generateWorks(works.filter(work => work.category.name === this.value));
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

export function openCloseModalModify () {
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

export function generateGalleryModal (works) {
    // Récupérer le futur parent
    const parentGalleryModal = document.querySelector("#galeryModify");

    parentGalleryModal.innerHTML += '';

    // Boucle pour constituer le bout d'HTML pour chaque work
    for (let i = 0; i < works.length; i++) {
        const work = works[i];

        let newWorkModal = 
        '<div class="littleFigure">'
        + '<img src="' + work.imageUrl +'" alt="'+ work.title +'">'
        + '<button id="' + work.id + '"class="deleteButton"><i class=" fa-solid fa-trash-can"></i></button>'
        + '</div>'
        ;

        parentGalleryModal.innerHTML += newWorkModal;
    }
};

export function switchModalAddPhoto () {
    const modal = document.getElementById("modalModify");
    const modalGallery = document.getElementById("modal-content-gallery");
    const modalAddPicture = document.getElementById("modal-content-add-picture");
    const addPictureButton = document.getElementById("addPicture");
    const spanClose = document.getElementsByClassName("close")[1];
    const spanBack = document.getElementById("back");
    

    // Passer au modal-content AddPhoto
    addPictureButton.onclick = function() {
        modalGallery.style.display = "none";
        modalAddPicture.style.display = "block";
    }

    //Revenir au modal-content Gallery-Add-Photo
    spanBack.onclick = function() {
        modalGallery.style.display = "block";
        modalAddPicture.style.display = "none";
    }

    //Fermer la modal et reset modal-content
    spanClose.onclick = function() {
        modal.style.display = "none";
        modalGallery.style.display = "block";
        modalAddPicture.style.display = "none";
    }
};

export function generateCategories (listeFiltres) {
    
    // Récupérer le futur parent
    const parentGallery = document.querySelector("#categorie");

    parentGallery.innerHTML += '<option value=""></option>' ;

    //Remove useless categorie
    listeFiltres.delete('Tous');

    // Boucle pour constituer le bout d'HTML pour chaque work
    for (const categorie of listeFiltres) {

        let newCategorie = '<option value="' + categorie + '">' + categorie + '</option>';

        parentGallery.innerHTML += newCategorie;
    }
}

export function addListenerDeleteWork (works) {
    const allDeleteButtons = document.querySelectorAll(".deleteButton");
    const token = window.localStorage.getItem("token");

    for (const button of allDeleteButtons) {
        button.addEventListener("click", function () {
            
            let confirmation = confirm("Êtes-vous sûr de vouloir supprimer ?");

            if (confirmation === true) {
                console.log("On demande de supprimer.")
                const id = button.id;
                requestDeleteWork(id, token, works);
            };

        })
    };
}

export function requestDeleteWork(id, token, works) {

    console.log(id);
    console.log(token);

    // try
    // {
        fetch("http://localhost:5678/api/works/" + id,
            {
            method: "DELETE",
            headers: { 
                "Accept" : "*/*",
                "Authorization": `Bearer ` + token
                }
            }).then (() => {
                console.log("Réussi.");
                return generateWorks (works);
            }).then ((data) => {
                console.log(data);
                const workDeleted = document.getElementById(id);
                workDeleted.parentElement.remove();
            }).catch((error) => {
                console.log(error);
            });
        
        let response;

        // Si le serveur renvoie du contenu
        // if (requestDelete.status !== 204) {
        //     response = await requestDelete.json();
        //     console.log(response);
        // }

    //     console.log(requestDelete);
    //     console.log(response);

    //     if (requestDelete.status === 204) {
    //         console.log("C'est supprimé !")

    //         //Supprimer l'élément dans l'HTML, aka le parent du bouton
    //         const workDeleted = document.getElementById(id);
    //         workDeleted.parentElement.remove();
            
    //         generateWorks (works);
    //     } else {
    //         console.log("C'est pas supprimé !")
    //         localStorage.clear();
    //         window.location.href = "login.html";
    //     }

    // }

    // catch (error) {
    //     alert("Erreur lors de la suppression d'image.");
    // }
}

export function checkFormatSizeFile () {

    document.getElementById('inputAddPictureFile').addEventListener('change', function (event) {
        // Récupérer le fichier
        const file = event.target.files[0];

        // Définir taille maximale : ici 4 Mo
        const fileMaxSize = 4 * 1024 * 1024;

        // Définir types de fichier autorisés : ici PNG et JPG
        const fileTypeAutorised = ['image/jpeg', 'image/png'];

        if (file.size > fileMaxSize) {
            alert("L'image ne doit pas dépasser 4 Mo.");
        } else if (!fileTypeAutorised.includes(file.type)) {
            alert("L'image doit être au format JPG ou PNG.");
        } else {
            alert("Image téléchargée.");               
        }
    });

}

export function replacePlaceHolder () {
    // Remplacer le placeholder par l'image
    const sectionAddPicture = document.querySelector('#sectionAddPicture');
    const fileInput = document.getElementById('inputAddPictureFile');
    // const placeHolder = document.querySelector('#placeholderPictureFile');

    fileInput.addEventListener ("change", previewFile);

    function previewFile () {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.addEventListener("load", () => {
        
            let newFile = '<img id="newPictureFile" src="' + reader.result +'" alt="Image téléchargée">';

            sectionAddPicture.innerHTML = '';
            // placeHolder.display = 'none';
            sectionAddPicture.innerHTML += newFile;
        });

        if(file) {
            reader.readAsDataURL(file);
        }
    }

}

// export function canSubmitNewWork () {
//     // Les inputs
//     const inputCategorie = document.getElementById('categorie');
//     const inputTitre = document.getElementById('titre');
//     const inputPicture = document.getElementById('newPictureFile');

//     //Le bouton de submit
//     const submitButton = document.getElementById('validAddPicture');

//     submitButton.addEventListener('click', function (event) {
//        if ((inputCategorie != '') && (inputTitre != null) && (inputPicture)) {
//         submitButton.disabled = false;
//         } 
//     });

// }