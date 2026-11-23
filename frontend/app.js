const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {

            const response = await fetch(
                "https://obscure-broccoli-5g74w94x4g9f4r9r-5000.app.github.dev/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (data.success) {

                localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(data.user)
                );

                alert("Login successful!");

                window.location.href = "profile.html";

            } else {

                alert(data.message);

            }

        } catch(error) {

            console.error(error);

            alert("Login failed.");

        }

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

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify({
                    full_name: fullName,
                    email: email,
                    role: "customer"
                })
            );

            alert(data.message);

            window.location.href = "profile.html";

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

const profileName = document.getElementById("profileName");

if (profileName) {

    const user =
        JSON.parse(
            localStorage.getItem("loggedInUser")
        );

    if (user) {

        document.getElementById("profileName").textContent =
            user.full_name;

        document.getElementById("profileEmail").textContent =
            user.email;

        document.getElementById("profileRole").textContent =
            user.role;

    }

}

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("loggedInUser");

        alert("Logged out successfully");

        window.location.href = "login.html";

    });

}

const profilePage = document.getElementById("profileName");

if (profilePage) {

    const user = JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    if (!user) {

        alert("Please login first.");

        window.location.href = "login.html";

    }

}

const booksContainer =
    document.getElementById("booksContainer");

if (booksContainer) {

    fetch(
        "https://obscure-broccoli-5g74w94x4g9f4r9r-5000.app.github.dev/books"
    )

    .then(response => response.json())

    .then(books => {

        booksContainer.innerHTML = "";

        books.forEach(book => {

            booksContainer.innerHTML += `
                <div class="book-card">
                    <h3>${book.title}</h3>

                    <p>
                        Author:
                        ${book.author}
                    </p>

                    <p>
                        Category:
                        ${book.category}
                    </p>

                    <p>
                        $${book.price}
                    </p>

                    <button
                        onclick="addToCart(${book.book_id})">
                        Add to Cart
                    </button>
                </div>
            `;

        });

    })

    .catch(error => {

        console.error(error);

    });

}

const addBookForm =
    document.getElementById("addBookForm");

if (addBookForm) {

    addBookForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const title =
                document.getElementById("title").value;

            const author =
                document.getElementById("author").value;

            const category =
                document.getElementById("category").value;

            const price =
                document.getElementById("price").value;

            const response = await fetch(
                "https://obscure-broccoli-5g74w94x4g9f4r9r-5000.app.github.dev/add-book",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title,
                        author,
                        category,
                        price
                    })
                }
            );

            const data = await response.json();

            alert(data.message);

        }
    );

}

const adminPage =
    document.getElementById("adminPage");

if (adminPage) {

    const user =
        JSON.parse(
            localStorage.getItem("loggedInUser")
        );

    if (!user || user.role !== "admin") {

        alert("Admin access only.");

        window.location.href = "index.html";

    }

}