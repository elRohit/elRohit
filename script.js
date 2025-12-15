// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Active navigation highlighting
const sections = document.querySelectorAll("section[id]")
const navLinks = document.querySelectorAll(".nav-link")

function highlightNavigation() {
  const scrollPosition = window.scrollY + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("data-section") === sectionId) {
          link.classList.add("active")
        }
      })
    }
  })
}

window.addEventListener("scroll", highlightNavigation)

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all fade-in-up elements
document.querySelectorAll(".fade-in-up").forEach((el) => {
  observer.observe(el)
})

// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle")
const navLinksContainer = document.querySelector(".nav-links")

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinksContainer.style.display = navLinksContainer.style.display === "flex" ? "none" : "flex"

    // Animate hamburger icon
    menuToggle.classList.toggle("active")
  })
}

// Contact form submission
const contactForm = document.getElementById("contact-form")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const data = Object.fromEntries(formData)

    // Show success message (you can customize this)
    alert("¡Gracias por tu mensaje! Te contactaré pronto.")

    // Reset form
    contactForm.reset()

    // In a real application, you would send this data to a server
    console.log("Form data:", data)
  })
}

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero-content")

  if (hero && scrolled < 800) {
    hero.style.transform = `translateY(${scrolled * 0.3}px)`
    hero.style.opacity = 1 - scrolled * 0.001
  }
})

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Add scroll reveal animations
window.addEventListener("scroll", () => {
  const reveals = document.querySelectorAll(".fade-in-up")

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < windowHeight - elementVisible) {
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    }
  })
})

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".nav")
  if (window.scrollY > 50) {
    nav.style.background = "rgba(10, 22, 40, 0.95)"
    nav.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
  } else {
    nav.style.background = "rgba(10, 22, 40, 0.9)"
    nav.style.boxShadow = "none"
  }
})

// Add cursor follow effect (optional)
document.addEventListener("mousemove", (e) => {
  const cards = document.querySelectorAll(".project-card, .skill-category, .contact-method")

  cards.forEach((card) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    card.style.setProperty("--mouse-x", `${x}px`)
    card.style.setProperty("--mouse-y", `${y}px`)
  })
})

// Initialize animations on page load
window.addEventListener("load", () => {
  document.querySelector(".hero-content").classList.add("fade-in")
})
