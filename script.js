/* =========================================================
   PAGE LOADER
========================================================= */
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("pageLoader");
    if (loader) loader.classList.add("hide");
  }, 400);
});

/* =========================================================
   SCROLL PROGRESS BAR
========================================================= */
window.addEventListener("scroll", () => {
  const bar = document.getElementById("scrollProgress");
  if (!bar) return;

  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const percent = (window.scrollY / height) * 100;
  bar.style.width = percent + "%";
});

/* =========================================================
   MOBILE NAV
========================================================= */
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle?.addEventListener("click", () => {
  navMenu?.classList.toggle("show");
});

/* =========================================================
   HERO FOLLOW GLOW
========================================================= */
const heroGlow = document.querySelector(".hero-glow");

window.addEventListener("mousemove", (e) => {
  if (!heroGlow) return;
  const x = e.clientX - 160;
  const y = e.clientY - 160;
  heroGlow.style.transform = `translate(${x}px, ${y}px)`;
});

/* =========================================================
   HERO PARALLAX
========================================================= */
const layer1 = document.querySelector(".hero-layer-1");
const layer2 = document.querySelector(".hero-layer-2");

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  if (layer1) layer1.style.transform = `translateY(${y * 0.12}px)`;
  if (layer2) layer2.style.transform = `translateY(${y * 0.2}px)`;
});

/* =========================================================
   SCROLL REVEAL
========================================================= */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const screen = window.innerHeight;

  reveals.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < screen - 70) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* =========================================================
   STATS COUNTER
========================================================= */
let statsTriggered = false;
const statNumbers = document.querySelectorAll(".stat-number");

function animateStats() {
  if (statsTriggered) return;

  const statsSection = document.querySelector(".stats-section");
  if (!statsSection) return;

  const top = statsSection.getBoundingClientRect().top;

  if (top < window.innerHeight - 80) {
    statNumbers.forEach((num) => {
      let target = +num.getAttribute("data-target");
      let current = 0;
      let increment = target / 60;

      let counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          num.textContent = target;
          clearInterval(counter);
        } else {
          num.textContent = Math.floor(current);
        }
      }, 20);
    });

    statsTriggered = true;
  }
}

window.addEventListener("scroll", animateStats);

/* =========================================================
   TESTIMONIAL SLIDER
========================================================= */
const track = document.getElementById("testimonialTrack");
const prevBtn = document.getElementById("testPrev");
const nextBtn = document.getElementById("testNext");

let slideIndex = 0;

function moveSlider() {
  if (!track) return;
  const cardWidth = 350 + 30; // width + gap
  track.style.transform = `translateX(${-slideIndex * cardWidth}px)`;
}

nextBtn?.addEventListener("click", () => {
  slideIndex++;
  if (slideIndex > 2) slideIndex = 0;
  moveSlider();
});

prevBtn?.addEventListener("click", () => {
  slideIndex--;
  if (slideIndex < 0) slideIndex = 2;
  moveSlider();
});

// Auto slide
setInterval(() => {
  slideIndex = (slideIndex + 1) % 3;
  moveSlider();
}, 4500);

/* =========================================================
   MAGNETIC BUTTONS
========================================================= */
const magneticButtons = document.querySelectorAll(".btn-magnetic");

magneticButtons.forEach((btn) => {
  btn.addEventListener("mousemove", function (e) {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  btn.addEventListener("mouseleave", function () {
    btn.style.transform = `translate(0, 0)`;
  });
});

/* =========================================================
   BACK TO TOP BUTTON
========================================================= */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (!backToTop) return;

  if (window.scrollY > 650) {
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* =========================================================
   LEAD POPUP (Show at 70% scroll)
========================================================= */
const leadPopup = document.getElementById("leadPopup");
const leadClose = document.getElementById("leadClose");
let popupShown = false;

window.addEventListener("scroll", () => {
  if (!leadPopup || popupShown) return;

  const total =
    document.documentElement.scrollHeight - window.innerHeight;
  const percent = (window.scrollY / total) * 100;

  if (percent > 70) {
    leadPopup.style.display = "flex";
    popupShown = true;
  }
});

leadClose?.addEventListener("click", () => {
  if (!leadPopup) return;
  leadPopup.style.display = "none";
});

/* =========================================================
   EMAILJS CONTACT FORM
========================================================= */
const form = document.getElementById("contactForm");
const submitText = document.getElementById("submitText");
const submitSpinner = document.getElementById("submitSpinner");
const formStatus = document.getElementById("formStatus");

form?.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!submitText || !submitSpinner) return;

  submitText.style.display = "none";
  submitSpinner.style.display = "inline-block";

  const params = {
    from_name: document.getElementById("name").value,
    company: document.getElementById("company").value,
    phone: document.getElementById("phone").value,
    message: document.getElementById("message").value,
  };

  emailjs
    .send("service_584ng44", "template_i0ps02s", params)
    .then(() => {
      submitSpinner.style.display = "none";
      submitText.style.display = "inline-block";
      form.reset();
      openSuccessModal();
      if (formStatus) formStatus.textContent = "";
    })
    .catch(() => {
      submitSpinner.style.display = "none";
      submitText.style.display = "inline-block";
      if (formStatus)
        formStatus.textContent =
          "Something went wrong. Please try again.";
    });
});

/* =========================================================
   SUCCESS MODAL
========================================================= */
const successModal = document.getElementById("successModal");
const modalClose = document.getElementById("modalClose");
const modalOk = document.getElementById("modalOk");

function openSuccessModal() {
  if (!successModal) return;
  successModal.style.display = "flex";
}

modalClose?.addEventListener("click", () => {
  if (successModal) successModal.style.display = "none";
});

modalOk?.addEventListener("click", () => {
  if (successModal) successModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === successModal) {
    successModal.style.display = "none";
  }
});

/* =========================================================
   CHAT WIDGET (FAQ BOT)
========================================================= */
const chatToggle = document.getElementById("chatToggle");
const chatWidget = document.getElementById("chatWidget");
const chatClose = document.getElementById("chatClose");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatBody = document.getElementById("chatBody");

chatToggle?.addEventListener("click", () => {
  if (!chatWidget || !chatToggle) return;
  chatWidget.style.display = "flex";
  chatToggle.style.display = "none";
});

chatClose?.addEventListener("click", () => {
  if (!chatWidget || !chatToggle) return;
  chatWidget.style.display = "none";
  chatToggle.style.display = "flex";
});

chatForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!chatInput || !chatBody) return;

  const text = chatInput.value.trim();
  if (!text) return;

  appendUserMessage(text);
  chatInput.value = "";

  setTimeout(() => {
    const reply = getBotReply(text);
    appendBotMessage(reply);
  }, 600);
});

function appendUserMessage(text) {
  if (!chatBody) return;
  const msg = document.createElement("div");
  msg.className = "chat-message chat-message-user";
  msg.innerHTML = `<p>${text}</p>`;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function appendBotMessage(text) {
  if (!chatBody) return;
  const msg = document.createElement("div");
  msg.className = "chat-message chat-message-bot";
  msg.innerHTML = `<p>${text}</p>`;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

/* =========================================================
   SIMPLE FAQ LOGIC FOR CHATBOT
========================================================= */
function getBotReply(message) {
  const text = message.toLowerCase();

  // Greetings
  if (/\b(hi|hello|hey|namaste)\b/.test(text)) {
    return "Hi! 👋 This is GHK’s instant help. You can ask about services, printing, gifting, prices, delivery time or how to contact us.";
  }

  // Services
  if (
    text.includes("service") ||
    text.includes("what do you do") ||
    text.includes("work") ||
    text.includes("offer")
  ) {
    return "We help brands with printing, branding, corporate gifting, promotional merchandise, office branding, marketing collaterals and retail visibility.";
  }

  // Printing related
  if (
    text.includes("print") ||
    text.includes("printing") ||
    text.includes("card") ||
    text.includes("brochure") ||
    text.includes("pamphlet") ||
    text.includes("flyer")
  ) {
    return "For printing, we handle business cards, letterheads, brochures, flyers, manuals, calendars and more. Share your quantity and size on WhatsApp or in the callback form and we’ll give an exact option.";
  }

  // Gifting / merchandise
  if (
    text.includes("gift") ||
    text.includes("gifting") ||
    text.includes("hamper") ||
    text.includes("combo") ||
    text.includes("merchandise") ||
    text.includes("tshirt") ||
    text.includes("t-shirt") ||
    text.includes("mug") ||
    text.includes("bottle")
  ) {
    return "We provide a range of corporate gifting and merchandise like gift sets, trophies, mugs, bottles, T-shirts, caps, pens, and office-friendly items – all with branding as needed.";
  }

  // Location
  if (
    text.includes("where are you") ||
    text.includes("location") ||
    text.includes("based") ||
    text.includes("office")
  ) {
    return "We are based in Gurugram and support clients across NCR and beyond. For detailed address or visit, please contact us directly on call or WhatsApp.";
  }

  // Pricing / cost / charges
  if (
    text.includes("price") ||
    text.includes("cost") ||
    text.includes("charges") ||
    text.includes("budget") ||
    text.includes("rate")
  ) {
    return "Pricing depends on quantity, material, size and finishing. The fastest way is to share your requirement (item + quantity + approx budget) in the contact form or on WhatsApp at +91 99996 95707 and we’ll suggest a practical option.";
  }

  // Minimum order quantity
  if (
    text.includes("minimum") ||
    text.includes("moq") ||
    text.includes("small order") ||
    text.includes("lowest quantity")
  ) {
    return "Minimum order quantity changes item to item. For many print items, we can support smaller runs; for gifting and merchandise, a minimum quantity is usually needed. Share your exact requirement and we’ll confirm.";
  }

  // Delivery / timelines
  if (
    text.includes("delivery") ||
    text.includes("timeline") ||
    text.includes("how long") ||
    text.includes("time") ||
    text.includes("days")
  ) {
    return "Timelines depend on item and quantity. Simple print jobs can be turned around quickly, while customised gifting or signage may need more days. Share your requirement and date, and we’ll confirm a realistic timeline.";
  }

  // Company profile / PDF
  if (
    text.includes("profile") ||
    text.includes("pdf") ||
    text.includes("company profile")
  ) {
    return "You can download our company profile directly from the site using the 'Download company profile' button in the About section.";
  }

  // Contact details
  if (
    text.includes("contact") ||
    text.includes("phone") ||
    text.includes("email") ||
    text.includes("whatsapp") ||
    text.includes("call")
  ) {
    return "You can reach us at:\n📞 Phone: +91 99996 95707\n✉️ Email: ghkmedia.communications@gmail.com\n💬 WhatsApp: Click the green WhatsApp icon on the website.";
  }

  // Custom quote / enquiry
  if (
    text.includes("quote") ||
    text.includes("enquiry") ||
    text.includes("inquiry") ||
    text.includes("project") ||
    text.includes("order")
  ) {
    return "For a custom quote, please share: item, quantity, any reference or brand guidelines and required date. You can fill the 'Request a callback' form or message us directly on WhatsApp.";
  }

  // Default fallback
  return "Thank you for your message. This chatbot gives quick answers for common questions about services, prices, timelines and contact. For anything specific, please use the contact form or WhatsApp and we’ll respond personally.";
}
const serviceData = {

printing:[
{name:"Books & Magazines",image:"images/services/printing/Books and Magazines.png"},
{name:"Brochures",image:"images/services/printing/Brouchers.png"},
{name:"Business Cards",image:"images/services/printing/BusinessCards.png"},
{name:"Calenders",image:"images/services/printing/Calenders.png"},
{name:"Catalogues",image:"images/services/printing/Catalogues.png"},
{name:"Envelopes",image:"images/services/printing/Envelopes.png"},
{name:"Flyers",image:"images/services/printing/Flyers.png"},
{name:"Letterheads",image:"images/services/printing/Letterheads.png"},
{name:"Training Manuals",image:"images/services/printing/Training Manuals.png"}
],

branding:[
{name:"Canopy & Rollup",image:"images/services/branding/Canopy and Rollup Standies.png"},
{name:"Posters and Banners",image:"images/services/branding/Posters & Banners.png"},
{name:"Corporate Interior Branding",image:"images/services/branding/t.png"},
],

office:[
{name:"Badge Holders",image:"images/services/office/BadgeHolders.png"},
{name:"Card Holders",image:"images/services/office/CardHolders.png"},
{name:"Clip Pads",image:"images/services/office/Clippads.png"},
{name:"ID Cards",image:"images/services/office/id cards.png"},
{name:"Lanyards",image:"images/services/office/Lanyards.png"},
{name:"Pulleys",image:"images/services/office/Pulleys.png"}
],

gifting:[
{name:"Coffee Mugs ",image:"images/services/gifting/Coffee Mugs.png"},
{name:"Leather Articles ",image:"images/services/gifting/Leather Articles.png"},
{name:"Pen Sets ",image:"images/services/gifting/Pen Sets.png"},
{name:"Photo Frames",image:"images/services/gifting/Photo Frame.png"},
{name:"Trophies",image:"images/services/gifting/Trophies.png"}
],

merchandise:[
{name:"Coffee Mugs",image:"images/services/merchandise/coffemugs.png"},
{name:"Keychains",image:"images/services/merchandise/Keychains.png"},
{name:"T-Shirts",image:"images/services/merchandise/tshirts.png"},
{name:"Sports Bottles",image:"images/services/merchandise/sports bottles.png"}
],

custom:[
{name:"Clock",image:"images/services/custom/clock.png"},
{name:"Diaries",image:"images/services/custom/Diaries.png"},
{name:"Laptop Bags",image:"images/services/custom/Laptop Bags.png"},
{name:"Paper Weights",image:"images/services/custom/Screenshot 2026-05-30 104915.png"}
],

packaging:[
{name:"Luxury Gift Box Packaging",image:"images/services/packaging/1st.jpeg"},
{name:"Premium Product Packaging",image:"images/services/packaging/2nd.jpeg"},
{name:"Custom Bottle Packaging",image:"images/services/packaging/3rd.jpeg"},
{name:"Eco-Friendly Packaging Solutions",image:"images/services/packaging/4th.jpeg"}
],

events:[
{name:"Canopy Displays",image:"images/services/events/canopy.png"},
{name:"Rollup Stands",image:"images/services/events/poster banners.png"},
{name:"Office Wall Branding",image:"images/services/events/tochan.png"}
]

};

const cards=document.querySelectorAll(".service-card");
const modal=document.getElementById("serviceModal");
const modalGrid=document.getElementById("modalGrid");
const modalTitle=document.getElementById("modalTitle");

cards.forEach(card=>{

card.addEventListener("click",()=>{

const service=card.dataset.service;

modalGrid.innerHTML="";

modalTitle.innerText=
card.querySelector("h3").innerText;

serviceData[service].forEach(item=>{

modalGrid.innerHTML+=`

<div class="modal-item">

<img src="${item.image}" alt="${item.name}">

<h4>${item.name}</h4>

</div>

`;

});

modal.classList.add("active");

});

});

document.querySelector(".close-modal")
.addEventListener("click",()=>{

modal.classList.remove("active");

});

window.addEventListener("click",(e)=>{

if(e.target===modal){

modal.classList.remove("active");

}

});