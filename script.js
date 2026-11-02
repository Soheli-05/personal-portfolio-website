"use strict";

// ========================================
// 1. Select HTML elements
// ========================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

const currentYear = document.getElementById("currentYear");


// ========================================
// 2. Update copyright year automatically
// ========================================

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// ========================================
// 3. Mobile navigation menu
// ========================================

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";

    });


    // Close the menu when a navigation link is clicked

    const navigationItems = navLinks.querySelectorAll("a");

    navigationItems.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            menuToggle.textContent = "☰";

        });

    });


    // Reset the menu when returning to desktop width

    window.addEventListener("resize", function () {

        if (window.innerWidth > 640) {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            menuToggle.textContent = "☰";

        }

    });

}


// ========================================
// 4. Contact form
// ========================================

if (contactForm && formStatus) {

    contactForm.addEventListener("submit", function (event) {

        // Prevent a normal form submission

        event.preventDefault();


        // Check required fields and email format

        if (!contactForm.reportValidity()) {
            return;
        }


        // Read the form values

        const name = document
            .getElementById("name")
            .value
            .trim();

        const email = document
            .getElementById("email")
            .value
            .trim();

        const message = document
            .getElementById("message")
            .value
            .trim();


        // Check for empty or whitespace-only values

        if (!name || !email || !message) {

            formStatus.textContent =
                "Please fill in all fields.";

            return;

        }


        // Replace this with your actual email address

        const recipient = "YOUR_EMAIL@example.com";


        // Prepare the email subject

        const subject = encodeURIComponent(
            "Portfolio Contact - " + name
        );


        // Prepare the email body

        const body = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\n\nMessage:\n" + message
        );


        // Create the email link

        const mailtoLink =
            "mailto:" + recipient +
            "?subject=" + subject +
            "&body=" + body;


        // Display a helpful message

        formStatus.textContent =
            "Opening your email application. Please review and send your message.";


        // Open the visitor's configured email application

        window.location.href = mailtoLink;

    });

}