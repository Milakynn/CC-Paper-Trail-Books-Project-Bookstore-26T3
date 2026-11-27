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

    checkoutBtn.addEventListener(
        "click",
        async () => {

            const user =
                JSON.parse(
                    localStorage.getItem("loggedInUser")
                );

            const response = await fetch(
                "https://obscure-broccoli-5g74w94x4g9f4r9r-5000.app.github.dev/checkout",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        user_id: user.user_id
                    })
                }
            );

            const data = await response.json();

            alert(data.message);

            location.reload();

        }
    );

}

const editProfileBtn = document.getElementById("editProfileBtn");

if (editProfileBtn) {

    editProfileBtn.addEventListener("click", () => {

        const user =
            JSON.parse(
                localStorage.getItem("loggedInUser")
            );

        const newName =
            prompt(
                "Enter your new name:",
                user.full_name
            );

        if (!newName) {
            return;
        }

        user.full_name = newName;

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(user)
        );

        document.getElementById("profileName").textContent =
            newName;

        alert("Profile updated successfully");

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

const booksContainer = document.getElementById("booksContainer");

if (booksContainer) {

    fetch("https://obscure-broccoli-5g74w94x4g9f4r9r-5000.app.github.dev/books")
        .then((response) => response.json())
        .then((books) => {

            booksContainer.innerHTML = "";

            books.forEach((book) => {

                const card = document.createElement("div");
                card.className = "book-card";

                const title = document.createElement("h3");
                title.textContent = book.title;

                const author = document.createElement("p");
                author.textContent = `Author: ${book.author}`;

                const category = document.createElement("p");
                category.textContent = `Category: ${book.category}`;

                const price = document.createElement("p");
                price.textContent = `$${book.price}`;

                const button = document.createElement("button");
                button.textContent = "Add to Cart";

                button.addEventListener("click", () => addToCart(book.book_id));

                card.appendChild(title);
                card.appendChild(author);
                card.appendChild(category);
                card.appendChild(price);
                card.appendChild(button);

                booksContainer.appendChild(card);

            });

        })
        .catch((error) => {

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

const adminPage = document.getElementById("adminPage");

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

const adminBooksTable = document.getElementById("adminBooksTable");

if (adminBooksTable) {

    fetch("https://obscure-broccoli-5g74w94x4g9f4r9r-5000.app.github.dev/books")
        .then(response => response.json())
        .then(books => {

            adminBooksTable.innerHTML = "";

            books.forEach((book) => {

                const row = document.createElement("tr");

                const idCell = document.createElement("td");
                idCell.textContent = String(book.book_id);

                const titleCell = document.createElement("td");
                titleCell.textContent = book.title;

                const authorCell = document.createElement("td");
                authorCell.textContent = book.author;

                const priceCell = document.createElement("td");
                priceCell.textContent = `$${book.price}`;

                const actionsCell = document.createElement("td");

                const editButton = document.createElement("button");

                editButton.textContent = "Edit";
                editButton.className = "edit-btn";

                editButton.addEventListener("click", () => editBook(book));

                const deleteButton = document.createElement("button");

                deleteButton.textContent = "Delete";
                deleteButton.className = "delete-btn";

                deleteButton.addEventListener("click", () => deleteBook(book.book_id));

                actionsCell.appendChild(editButton);
                actionsCell.appendChild(deleteButton);

                row.appendChild(idCell);
                row.appendChild(titleCell);
                row.appendChild(authorCell);
                row.appendChild(priceCell);
                row.appendChild(actionsCell);

                adminBooksTable.appendChild(row);

            });

        })
        .catch(error => {

            console.error(error);

        });

}

async function deleteBook(bookId) {

    const confirmed =
        confirm("Are you sure you want to delete this book?");

    if (!confirmed) {
        return;
    }

    const response = await fetch(
        `https://obscure-broccoli-5g74w94x4g9f4r9r-5000.app.github.dev/delete-book/${bookId}`,
        {
            method: "DELETE"
        }
    );

    const data = await response.json();

    alert(data.message);

    location.reload();

}

async function editBook(book) {

    const newTitle =
        prompt("Title:", book.title);

    if (!newTitle) return;

    const newAuthor =
        prompt("Author:", book.author);

    if (!newAuthor) return;

    const newCategory =
        prompt("Category:", book.category);

    if (!newCategory) return;

    const newPrice =
        prompt("Price:", book.price);

    if (!newPrice) return;

    const response = await fetch(
        `https://obscure-broccoli-5g74w94x4g9f4r9r-5000.app.github.dev/update-book/${book.book_id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: newTitle,
                author: newAuthor,
                category: newCategory,
                price: newPrice
            })
        }
    );

    const data = await response.json();

    alert(data.message);

    location.reload();

}

async function addToCart(bookId) {

    const user =
        JSON.parse(
            localStorage.getItem("loggedInUser")
        );

    console.log(user);


    if (!user) {

        alert("Please login first");

        return;

    }

    const response = await fetch(
        "https://obscure-broccoli-5g74w94x4g9f4r9r-5000.app.github.dev/add-to-cart",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: user.user_id,
                book_id: bookId
            })
        }
    );

    const data = await response.json();

    alert(data.message);

}

const cartTableBody = document.getElementById("cartTableBody");

if (cartTableBody) {

    const user =
        JSON.parse(
            localStorage.getItem("loggedInUser")
        );

    fetch(
        `https://obscure-broccoli-5g74w94x4g9f4r9r-5000.app.github.dev/cart/${user.user_id}`
    )

    .then(response => response.json())

    .then(cartItems => {

        cartTableBody.innerHTML = "";

        let total = 0;

        cartItems.forEach(item => {

            const row =
                document.createElement("tr");

            const itemTotal =
                item.price * item.quantity;

            total += itemTotal;

            row.innerHTML = `
                <td>${item.title}</td>
                <td>$${item.price}</td>
                <td>${item.quantity}</td>
                <td>$${itemTotal.toFixed(2)}</td>
            `;

            cartTableBody.appendChild(row);

        });

        document.getElementById(
            "cartTotal"
        ).textContent =
            `$${total.toFixed(2)}`;

    });

}