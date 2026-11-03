/* =================================
   MAISON GLOW — BOOKING SYSTEM
================================= */

const salonWhatsApp = "237695609205";
const formEndpoint = "https://formspree.io/f/xwllwgwg";

const bookingForm = document.getElementById("bookingForm");
const whatsappButton = document.getElementById("whatsappBooking");
const websiteBookingButton =
  document.getElementById("websiteBookingSubmit");

const dateInput = document.getElementById("appointmentDate");

// Prevent past appointment dates
const today = new Date();
const localToday = new Date(
  today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

dateInput.min = localToday;


// COLLECT BOOKING DETAILS

function getBookingDetails() {

  if (!bookingForm.reportValidity()) {
    return null;
  }

  return {
    name: document.getElementById("customerName").value.trim(),
    phone: document.getElementById("customerPhone").value.trim(),
    service: document.getElementById("serviceChoice").value,
    date: document.getElementById("appointmentDate").value,
    time: document.getElementById("appointmentTime").value,
    message: document.getElementById("bookingMessage").value.trim()
  };
}


// WHATSAPP BOOKING

whatsappButton.addEventListener("click", function () {

  const booking = getBookingDetails();

  if (!booking) return;

  const whatsappMessage = `
Hello Maison Glow!

I would like to request an appointment.

Name: ${booking.name}
Phone: ${booking.phone}
Service: ${booking.service}
Preferred Date: ${booking.date}
Preferred Time: ${booking.time}

Additional Details: ${booking.message || "None"}

Please let me know if this appointment is available.

Thank you!
`;

  const whatsappURL =
    "https://wa.me/" +
    salonWhatsApp +
    "?text=" +
    encodeURIComponent(whatsappMessage);

  window.open(whatsappURL, "_blank");

});


// WEBSITE BOOKING SUBMISSION

websiteBookingButton.addEventListener("click", async function () {

  const booking = getBookingDetails();

  if (!booking) return;

  websiteBookingButton.disabled = true;
  websiteBookingButton.textContent = "SENDING REQUEST...";

  const formData = new FormData();

  formData.append("name", booking.name);
  formData.append("phone", booking.phone);
  formData.append("service", booking.service);
  formData.append("preferred_date", booking.date);
  formData.append("preferred_time", booking.time);
  formData.append("additional_details", booking.message);
  formData.append("_subject", "New Maison Glow Appointment Request");

  try {

    const response = await fetch(formEndpoint, {
      method: "POST",
      body: formData,
      headers: {
        "Accept": "application/json"
      }
    });

    if (response.ok) {

      alert(
        "Thank you, " + booking.name + "!\n\n" +
        "Your appointment request has been sent to Maison Glow.\n\n" +
        "We will contact you to confirm availability." +
        "Beauty. Elegance. You"
      );

      bookingForm.reset();

    } else {

      alert(
        "We could not submit your request right now. " +
        "Please try again or book through WhatsApp."
      );

    }

  } catch (error) {

    alert(
      "Connection problem. Please check your internet " +
      "or contact Maison Glow through WhatsApp."
    );

  } finally {

    websiteBookingButton.disabled = false;
    websiteBookingButton.textContent = "SUBMIT BOOKING REQUEST";

  }

});
// MAISON GLOW MOBILE MENU
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
        mainNav.classList.toggle("active");

        const isOpen = mainNav.classList.contains("active");

        menuToggle.textContent = isOpen ? "×" : "☰";
        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    // Close the menu after selecting a navigation link
    mainNav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            mainNav.classList.remove("active");
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        });
    });
}