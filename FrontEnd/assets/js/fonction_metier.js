import { fetchWorks } from "./fonction_get_data.js";

// WORKS

export function generateWorks (works) {
    // Récupérer le futur parent
    const parentGallery = document.querySelector(".gallery");
    parentGallery.innerHTML = '';

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

        //Apparition du bouton pour la modale
        document.getElementById('filterSection').className = "hidden";
        document.getElementById('modifyButton').style = "";

        //Apparition de la bande 'Mode édition'
        document.getElementById('editionMode').style = "";

        //Apparition bouton logout
        document.getElementById('instagramIcon').insertAdjacentHTML("beforebegin", '<li><a href="index.html" id="logout">logout</a></li>');

    } else {
        console.log("Visiteur");

        //Apparition bouton login
        document.getElementById('instagramIcon').insertAdjacentHTML("beforebegin", '<li id="login"><a href="login.html">login</a></li>');
    };
};

export function addListenerLogout () {
    
    console.log("LOGOUT ?");

    document.getElementById('logout').addEventListener('click', (event) => {

        event.preventDefault();

        localStorage.removeItem('token');
        console.log("LOGOUT !!!");

        // Puis redirige manuellement :
        window.location.href = 'index.html';

    });
}

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

    parentGalleryModal.innerHTML = '';

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

export async function requestDeleteWork(id, token, works) {

    console.log("Suppression du work ID:", id);
    console.log("Token:", token);

    try {
        const response = await fetch("http://localhost:5678/api/works/" + id, {
            method: "DELETE",
            headers: {
                "Accept": "*/*",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status === 204) {
            console.log("Work supprimé avec succès !");

            // Refetch les données depuis l'API
            const updatedWorks = await fetchWorks();

            // Régénérer la galerie principale
            generateWorks(updatedWorks);

            // Régénérer la galerie modale
            generateGalleryModal(updatedWorks);

            // Re-ajouter les listeners pour les nouveaux boutons de suppression
            addListenerDeleteWork();

            console.log("DOM réactualisé !");

        } else if (response.status === 401) {
            console.log("Token invalide, redirection vers login");
            localStorage.clear();
            window.location.href = "login.html";
        } else {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

    } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        alert("Erreur lors de la suppression de l'image. Veuillez réessayer.");
    }
}


export function replacePlaceHolder () {
    // Remplacer le placeholder par l'image
    const sectionAddPicture = document.getElementById('sectionAddPicture');
    const fileInput = document.getElementById('inputAddPictureFile');
    const placeHolder = document.querySelector('#placeholderPictureFile');

    fileInput.addEventListener ("change", previewFile);

    function previewFile () {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.addEventListener("load", () => {
        
            let newFile = '<img id="newPictureFile" src="' + reader.result +'" alt="Image téléchargée">';

            sectionAddPicture.innerHTML = '';
            placeHolder.display = 'none';
            sectionAddPicture.innerHTML += newFile;
        });

        if(file) {
            reader.readAsDataURL(file);
        }
    }

}

// export async function saveWork (file, categorie, titre, token) {    

//     // try {
//     //         const response = await fetch("http://localhost:5678/api/works/" + id, {
//     //             method: "POST",
//     //             headers: {
//     //                 "Accept": "*/*",
//     //                 "Authorization": `Bearer ${token}`,
//     //                 "Content-Type": "application/json"
//     //             },

//     //             body: JSON.stringify(newWork)

//     //         });
//     //     } catch (error) {
//     //         console.error("Erreur lors de l'ajout de la nouvelle création :", error);
//     //         alert("Erreur lors de l'ajout de la nouvelle création. Veuillez réessayer.");
//     //     }

// }

export function addListenerInput () {
    const inputCategorie = document.getElementById('categorie');
    const inputTitre = document.getElementById('title');
    const inputPicture = document.getElementById('inputAddPictureFile');
    const submitButton = document.getElementById('validAddPicture');
    const sectionAddPicture = document.querySelector('#sectionAddPicture');
    const fileMaxSize = 4 * 1024 * 1024;

    submitButton.disabled = true;

    //Création formData à remplir
        const formData = new FormData();

        console.log(formData);

    // DATA

    // const file = inputPicture.files[0];
    // const title = inputTitre.value.trim();
    // const categorie = inputCategorie.value;

    // PROBLEME : l'image n'est affichée qu'après avoir validé 2 fois l'image, pourquoi ?
    const validPicture = () => {
        console.log('Valid Picture')

        const file = inputPicture.files[0];

        const validType = ['image/jpeg', 'image/png'];
        
        //Vérifier le type de l'image
        if (!validType.includes(file.type)) {
            console.log('type');
            alert("L'image doit être au format JPG ou PNG.");
            inputPicture.value = '';
            sectionAddPicture.innerHTML = '';
            submitButton.disabled = true;
            return;
        }

        //Vérifier la taille de l'image
        if (fileMaxSize < file.size) {
            console.log('size file');
            alert("L'image ne doit pas dépasser 4 Mo.");
            inputPicture.value = '';
            sectionAddPicture.innerHTML = '';
            submitButton.disabled = true;
            return;
        }

        // En cas de réussite
        if ((validType.includes(file.type)) && (fileMaxSize > file.size)) {
            alert("Image téléchargée.");

            formData.append('image', file);
            console.log(formData);

            replacePlaceHolder ();
        }
    }
    
    const validForm = () => {
    
        const file = inputPicture.files[0];
        const title = inputTitre.value.trim();
        const categorie = inputCategorie.value;

        console.log(file);
        console.log(title);
        console.log(categorie);

        if (!file || !title || !categorie) {
            console.log('nop');
            submitButton.disabled = true;
            return;
        }

        if (file && title && categorie) {
            console.log('gogogo');

            // Ajout textes au formData
            formData.append('title', title);
            formData.append('categorie', categorie);

            console.log(formData);

            //Activation bouton valider formulaire
            submitButton.disabled = false;
            return;
        }
    }

    // Verification quand input ajoute/modifie
    inputPicture.addEventListener ('change', () => {
       validPicture ();
       validForm();
    });

    inputTitre.addEventListener ('input', validForm);
    inputCategorie.addEventListener ('change', validForm);


}

export function sendForm () {
    //Quand le bouton 'Valider' est disponible
    const formValidNewWork = document.getElementById('formAddPictureFile');

    formValidNewWork.addEventListener("submit", async (event) => {
        event.preventDefault();

        
    });
}