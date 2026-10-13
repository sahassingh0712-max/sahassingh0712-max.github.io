
/* ======================================
   GHOST-07 | Interactive Portfolio
====================================== */

// 1. Dynamic typing effect
const typingText = document.getElementById("typingText");

const roles = [
    "Software Developer",
    "AI/ML Enthusiast",
    "Java Programmer",
    "Web Developer"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typingText) return;

    const currentRole = roles[roleIndex];

    if (deleting) {
        characterIndex--;
    } else {
        characterIndex++;
    }

    typingText.textContent = currentRole.substring(0, characterIndex);

    let delay = deleting ? 45 : 85;

    if (!deleting && characterIndex === currentRole.length) {
        deleting = true;
        delay = 1300;
    } else if (deleting && characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 350;
    }

    setTimeout(typeEffect, delay);
}

if (typingText) {
    typeEffect();
}


// 2. Mobile navigation menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    // Close menu after clicking a navigation link
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}


// 3. Scroll reveal animation
const revealElements = document.querySelectorAll(
    ".section-heading, .about-card, .skill-card, " +
    ".project-card, .certification-card, .resume-card, .contact-card"
);

revealElements.forEach(element => {
    element.classList.add("js-reveal");
});

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(element => {
        element.classList.add("is-visible");
    });
}


// 4. Active navigation link while scrolling
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navItems.forEach(link => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === "#" + entry.target.id
                    );
                });
            }
        });
    }, {
        rootMargin: "-25% 0px -60% 0px"
    });

    sections.forEach(section => sectionObserver.observe(section));
}


// 5. Automatic current year in footer
const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// 6. Console signature
console.log(
    "%c GHOST-07 | SAHAS SINGH ",
    "background:#101923;color:#38d9ff;" +
    "font-size:16px;font-weight:bold;padding:10px;"
);

console.log("AI • CODE • PRECISION");

/* GHOST-07 | Mouse-follow glow */

(() => {
    // Prevent creating the glow more than once
    if (document.getElementById("mouse-glow")) return;

    // Enable only for mouse/trackpad devices
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        return;
    }

    const glow = document.createElement("div");
    glow.id = "mouse-glow";
    glow.setAttribute("aria-hidden", "true");
    document.body.appendChild(glow);

    let moveFrame = null;
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener("mousemove", (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;

        if (moveFrame) return;

        moveFrame = requestAnimationFrame(() => {
            glow.style.left = `${mouseX}px`;
            glow.style.top = `${mouseY}px`;
            glow.classList.add("active");
            moveFrame = null;
        });
    });

    document.addEventListener("mouseleave", () => {
        glow.classList.remove("active");
    });

    document.addEventListener("mouseenter", () => {
        glow.classList.add("active");
    });
})();

/* GHOST-07 | Active Navbar Section */

(() => {
    const navLinks = [...document.querySelectorAll(".nav-link")];

    if (!navLinks.length) {
        console.warn("Smart Navbar: .nav-link elements not found.");
        return;
    }

    const sections = navLinks
        .map(link => {
            const id = link.getAttribute("href");

            if (!id || !id.startsWith("#") || id.length < 2) {
                return null;
            }

            const section = document.getElementById(id.slice(1));

            return section ? { link, section } : null;
        })
        .filter(Boolean);

    if (!sections.length) {
        console.warn("Smart Navbar: Matching section IDs not found.");
        return;
    }

    const setActiveLink = (activeSection) => {
        sections.forEach(({ link, section }) => {
            const isActive = section === activeSection;

            link.classList.toggle("active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    };

    const observer = new IntersectionObserver(entries => {
        const visibleSections = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length) {
            setActiveLink(visibleSections[0].target);
        }
    }, {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.1, 0.25, 0.5]
    });

    sections.forEach(({ section }) => observer.observe(section));
})();

/* GHOST-07 | Interactive Terminal Commands */

(() => {
    const form = document.getElementById("terminal-form");
    const input = document.getElementById("terminal-command");
    const output = document.getElementById("terminal-output");

    if (!form || !input || !output) return;

    const commands = {
        help: () => [
            "AVAILABLE COMMANDS",
            "------------------",
            "help     - Show available commands",
            "about    - About GHOST-07",
            "skills   - Technical skills",
            "projects - Portfolio projects",
            "github   - Open GitHub profile",
            "linkedin - Open LinkedIn profile",
            "clear    - Clear terminal screen"
        ],

        about: () => [
            "IDENTITY: GHOST-07",
            "ROLE: CSE - AI/ML Student",
            "FOCUS: Software Development, AI/ML and Web Technologies",
            "MISSION: Build practical projects and keep learning."
        ],

        skills: () => [
            "TECHNICAL SKILLS",
            "----------------",
            "Programming: Java, Python, C#",
            "Web: HTML, CSS, JavaScript",
            "Interests: AI/ML, NLP, Data Structures",
            "Note: Update this list to match your current skills."
        ],

        projects: () => [
            "PROJECT DIRECTORY",
            "-----------------",
            "PROJECT_01: Resume Screening System",
            "PROJECT_02: Student Attendance Analytics",
            "PROJECT_03: AI Web Application",
            "Status: Explore the portfolio cards for details."
        ],

        github: () => [
            "Opening GitHub profile..."
        ],

        linkedin: () => [
            "Opening LinkedIn profile..."
        ]
    };

    
function printLine(text, className = "") {
    const line = document.createElement("p");

    if (className) {
        line.className = className;
    }

    output.appendChild(line);

    // Type command output one character at a time
    if (className === "terminal-command-line") {
        line.textContent = text;
        return;
    }

    line.classList.add("terminal-typing");

    let index = 0;
    const speed = 18;

    function typeNextCharacter() {
        if (index < text.length) {
            line.textContent += text.charAt(index);
            index++;

            output.scrollTop = output.scrollHeight;
            setTimeout(typeNextCharacter, speed);
        } else {
            line.classList.remove("terminal-typing");
        }
    }

    typeNextCharacter();
}


    function runCommand(rawCommand) {
        const command = rawCommand.trim().toLowerCase();

        if (!command) return;

        printLine("ghost@GHOST-07:~$ " + rawCommand, "terminal-command-line");

        if (command === "clear") {
            output.replaceChildren();
            return;
        }

        if (command === "github") {
            printLine(commands.github()[0]);
            window.open(
                "https://github.com/sahassingh0712-max",
                "_blank",
                "noopener,noreferrer"
            );
            return;
        }

        if (command === "linkedin") {
            printLine(commands.linkedin()[0]);
            window.open(
                "https://www.linkedin.com/in/sahas-singh-93aaaa372/",
                "_blank",
                "noopener,noreferrer"
            );
            return;
        }

        if (commands[command]) {
            commands[command]().forEach(line => printLine(line));
        } else {
            printLine(
                `Command not found: ${command}. Type "help" for available commands.`
            );
        }

        output.scrollTop = output.scrollHeight;
    }

    form.addEventListener("submit", event => {
        event.preventDefault();

        const command = input.value;
        runCommand(command);
        input.value = "";
        input.focus();
    });
})();
