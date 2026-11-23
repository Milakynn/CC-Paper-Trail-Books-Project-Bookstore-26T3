const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        alert("Login feature will be connected to the database later.");
    });
}

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        try {

            const fullName = document.getElementById("fullName").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            console.log("Submitting registration...");

            const response = await fetch(
                "https://obscure-broccoli-5g74w94x4g9f4r9r-5000.app.github.dev/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        full_name: fullName,
                        email: email,
                        password: password
                    })
                }
            );

            console.log(response);

            const data = await response.json();

            alert(data.message);

        } catch (error) {

            console.error(error);

            alert("Registration failed. Check console.");

        }

    });

}

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", () => {

        const filter = searchInput.value.toLowerCase();

        const books = document.querySelectorAll(".book-card");

        books.forEach(book => {

            const text = book.textContent.toLowerCase();

            if (text.includes(filter)) {
                book.style.display = "block";
            } else {
                book.style.display = "none";
            }

        });

    });

}

const addToCartBtn = document.getElementById("addToCartBtn");

if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
        alert("Book added to cart!");
    });
}

const checkoutBtn = document.getElementById("checkoutBtn");

if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
        alert("Checkout functionality will be connected later.");
    });
}

const editProfileBtn = document.getElementById("editProfileBtn");

if (editProfileBtn) {
    editProfileBtn.addEventListener("click", () => {
        alert("Profile editing will be implemented later.");
    });
}

const addBookBtn = document.getElementById("addBookBtn");

if (addBookBtn) {
    addBookBtn.addEventListener("click", () => {
        alert("Add Book functionality will be connected later.");
    });
}