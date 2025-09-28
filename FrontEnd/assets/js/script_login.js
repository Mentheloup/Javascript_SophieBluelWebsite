ajoutListenerSeConnecter();

function ajoutListenerSeConnecter() {

   const formulaireConnexion = document.querySelector(".connexion");

   formulaireConnexion.addEventListener("submit", function (event) {

   // Désactivation du comportement par défaut du navigateur
    event.preventDefault();

    // Création de l’objet avec les identifiants
    const identifiants = {

        email: event.target.querySelector("[name=email]").value,

        mot_de_passe: event.target.querySelector("[name=mot-de-passe").value,

    };

    // Creer un p pour un eventuel echec de connexion
    const baliseWarningLogin = document.querySelector("#warningLogin");
    const warningLogin = document.createElement("p");

    // Gestion succes/echec de connexion
    if (identifiants.email === "sophie.bluel@test.tld" & identifiants.mot_de_passe === "S0phie") {
        window.location.replace("./index.html");
    } else {

        baliseWarningLogin.innerText = '';
        warningLogin.innerText = "Email et/ou mot-de-passe invalide(s).";
        baliseWarningLogin.appendChild(warningLogin);
    }

    });

}