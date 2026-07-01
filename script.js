const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-menu a");
const year = document.querySelector("#year");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const submitButton = document.querySelector("[data-submit-button]");
const formId = "b6pfykks4jm";
const forminit = typeof Forminit !== "undefined" ? new Forminit() : null;

if (year) {
    year.textContent = new Date().getFullYear();
}

if (navToggle) {
    navToggle.addEventListener("click", () => {
        const isOpen = document.body.classList.toggle("nav-open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });
}

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
        navToggle?.setAttribute("aria-expanded", "false");
    });
});

const setFormStatus = (message, type = "") => {
    if (!formStatus) {
        return;
    }

    formStatus.textContent = message;
    formStatus.className = `form-status${type ? ` form-status-${type}` : ""}`;
};

if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        if (!forminit) {
            setFormStatus(
                "The contact form could not load. Please email julie@warnassociates.co.nz.",
                "error",
            );
            return;
        }

        setFormStatus("Sending your enquiry...");
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
        }

        try {
            const { error } = await forminit.submit(
                formId,
                new FormData(contactForm),
            );

            if (error) {
                setFormStatus(
                    error.message || "Something went wrong. Please try again.",
                    "error",
                );
                return;
            }

            contactForm.reset();
            setFormStatus(
                "Thank you, your enquiry has been sent successfully.",
                "success",
            );
        } catch (error) {
            setFormStatus(
                "Something went wrong. Please try again or email us directly.",
                "error",
            );
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Submit Enquiry";
            }
        }
    });
}
