const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        alert("Login feature will be connected to the database later.");
    });
}

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        alert("Registration successful! Database connection will be added later.");
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