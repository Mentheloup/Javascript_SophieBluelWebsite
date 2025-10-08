//Gestion connexion
document.getElementById("login-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("mot-de-passe").value;

    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            // Save token to localStorage
            localStorage.setItem("token", data.token);
            // Redirect to homepage or dashboard
            window.location.href = "index.html";
        } else {
            alert("Email ou mot de passe incorrect.");
        }
    } catch (error) {
        alert("Erreur lors de la connexion.");
    }
});




// MARCHE PAS - ERREUR 'CORS'

// connexion();

    // const login = async () => {
    //         await fetch("http://localhost:5678/api/users/login", {
    //             method: "POST",
    //             headers: { Accept : "application/json", "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //                 email: document.querySelector(".inputEmail").value,
    //                 mot_de_passe: document.querySelector(".inputPassword").value, 
    //             })
    //     })
    //     .then((response)=>{
    //         console.log(response);
    //         // if (response)
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });

    // };

    // const formulaireConnexion = document.querySelector(".connexion");
    // formulaireConnexion.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     login();
    // })



// async function connexion() {

//     const formulaireConnexion = document.querySelector(".connexion");

//     formulaireConnexion.addEventListener("submit", async function (event) {

//         // Désactivation du comportement par défaut du navigateur
//         event.preventDefault();

//         // Création de l’objet avec les identifiants
//         // const identifiants = {
//         //     email: event.target.querySelector("[name=email]").value,
//         //     mot_de_passe: event.target.querySelector("[name=mot-de-passe").value,
//         // };

//         // const chargeUtile = JSON.stringify(identifiants);

//         // console.log(chargeUtile);
        
//         // Envoi au serveur

//         // Tentative connexion serveur
//         // const serveurLogin = await fetch("http://localhost:5678/api/users/login", {
//         //         method: "POST",
//         //         headers: { Accept : "application/json", "Content-Type": "application/json" },
//         //         body: chargeUtile
//         // });
        
//         // const login = await serveurLogin.json();
        
//         // console.log(login);

//         // const fakeLogin = {
//         //     "userId" : '2',
//         //     "token" : 'abcd'
//         // };


//         // const responseLogin = JSON.stringify(fakeLogin);

    
//         // Creer un p pour un eventuel echec de connexion
//         const baliseWarningLogin = document.querySelector("#warningLogin");
//         const warningLogin = document.createElement("p");

//         // Gestion succes/echec de connexion
//         if (fakeLogin.userId === '1') {

//             console.log("yooooo");
            
//             // Stockage du token dans le local storage
//             window.localStorage.setItem("token", fakeLogin.token);
            
//             // Renvoi sur la page d'index
//             window.location.replace("./index.html");

//         } else {

//             console.log("yoyo");

//             // Vider le token du local storage
//             window.localStorage.setItem("token", null);

//             // Vider l'HTML de warning puis ajout du message d'erreur
//             baliseWarningLogin.innerText = '';
//             warningLogin.innerText = "Email et/ou mot-de-passe invalide(s).";
//             baliseWarningLogin.appendChild(warningLogin);
//         };

//     });

// };