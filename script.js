const form = document.getElementById("contactForm");

const languageBtn = document.getElementById("languageBtn");

const languageMenu = document.getElementById("languageMenu");


/* =========================
   CHANGE LANGUAGE
========================= */

function changeLanguage(language) {

    /* Change normal text */

    document.querySelectorAll("[data-en]").forEach(element => {

        element.textContent =
            element.getAttribute(`data-${language}`);

    });


    /* Change placeholders */

    document.querySelectorAll("[data-placeholder-en]").forEach(element => {

        element.placeholder =
            element.getAttribute(`data-placeholder-${language}`);

    });


    /* Change select options */

    document.querySelectorAll("option[data-en]").forEach(option => {

        option.textContent =
            option.getAttribute(`data-${language}`);

    });


    /* Change language button */

    if (language === "en") {

        languageBtn.textContent = "en ▾";

        document.documentElement.lang = "en";

    } else {

        languageBtn.textContent = "🇮🇩 ▾";

        document.documentElement.lang = "id";

    }


    /* Save language */

    localStorage.setItem("language", language);


    /* Close menu */

    languageMenu.classList.remove("show");
}



/* =========================
   LANGUAGE MENU
========================= */

languageBtn.addEventListener("click", event => {

    event.stopPropagation();

    languageMenu.classList.toggle("show");

});


/* Close menu when clicking outside */

document.addEventListener("click", event => {

    if (!event.target.closest(".language")) {

        languageMenu.classList.remove("show");

    }

});



/* =========================
   LOAD SAVED LANGUAGE
========================= */

const savedLanguage =
    localStorage.getItem("language") || "en";

changeLanguage(savedLanguage);



/* =========================
   CONTACT FORM
========================= */

form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const language =
        localStorage.getItem("language") || "en";

    const formData = new FormData(form);

    try {

        const response = await fetch(form.action, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        });


        if (response.ok) {

            if (language === "id") {

                alert(
                    "Terima kasih! Tim Pack & Dash akan segera menghubungi Anda."
                );

            } else {

                alert(
                    "Thank you! The Pack & Dash team will get in touch with you shortly."
                );

            }

            form.reset();

        } else {

            alert(
                "Something went wrong. Please try again."
            );

        }

    } catch (error) {

        alert(
            "Something went wrong. Please check your connection and try again."
        );

    }

});