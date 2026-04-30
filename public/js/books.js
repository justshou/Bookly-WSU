// loadBooks: fetches books from the server and injects cards into #booksRow
async function loadBooks() {
  try {
    const res = await fetch("/getAllBooks");
    const books = await res.json();

    const row = document.getElementById("booksRow");
    if (!row) return;

    row.innerHTML = "";

    books.forEach((book) => {
      const col = document.createElement("div");
      col.className = "col";

      const isReserved = !!book.access_id;

      col.innerHTML = `
        <div class="card shadow-sm ${isReserved ? "bg-light opacity-50" : ""}" style="position: relative;">
          ${
            isReserved
              ? `<span class="badge bg-danger position-absolute top-0 start-0 m-2">Reserved</span>`
              : ""
          }

          <img src="${book.book_image_url || "bookly%20images/default.jpg"}" 
               alt="${book.book_name || ""}" 
               style="object-fit:cover; width:100%; height:225px;" />

          <div class="card-body">
            <p class="card-text text-center">
              ${book.book_name || ""}<br>
              <small class="text-muted">${book.author || ""}</small>
            </p>

            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-secondary btn-view">
                  View
                </button>
              </div>
              <small class="text-muted">ISBN: ${book.isbn || "N/A"}</small>
            </div>
          </div>
        </div>
      `;

      row.appendChild(col);

      const btn = col.querySelector(".btn-view");
      if (btn) {
        btn.addEventListener("click", () => {
          const modalEl = document.getElementById("bookModal");
          if (!modalEl) return;
          const modalTitle = modalEl.querySelector(".modal-title");
          const modalBody = modalEl.querySelector(".modal-body");
          if (modalTitle) modalTitle.textContent = book.book_name || "Book";
          if (modalBody)
            modalBody.innerHTML = `
              <img src="${book.book_image_url || "bookly%20images/default.jpg"}" alt="${book.book_name || ""}" style="width:100%; height:225px; object-fit:cover;" class="mb-3" />
              <p>${book.description || ""}</p>
              <p>Author: ${book.author || ""}</p>
              <p>ISBN: ${book.isbn || 0}</p>
            `;
          const reserveBtn = modalEl.querySelector("#reserveBtn");

          if (reserveBtn) {
            if (book.access_id) {
              reserveBtn.textContent = "Already Reserved";
              reserveBtn.disabled = true;
            } else {
              reserveBtn.textContent = "Reserve";
              reserveBtn.disabled = false;

              reserveBtn.onclick = async () => {
                const access_id = prompt("Enter your access ID:");
                if (!access_id) return;

                const response = await fetch("/reserveBook", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    id: book.id,
                    access_id: access_id,
                  }),
                });

                const result = await response.json();
                alert(result.message);

                if (result.status === "ok") {
                  loadBooks();
                  const modal = bootstrap.Modal.getInstance(modalEl);
                  modal.hide();
                }
              };
            }
          }
          const bsModal = new bootstrap.Modal(modalEl);
          bsModal.show();
        });
      }
    });
  } catch (err) {
    console.error("Failed to load books", err);
  }
}

document.addEventListener("DOMContentLoaded", loadBooks);
