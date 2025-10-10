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