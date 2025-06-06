// Mobile Navigation
// Navegação Mobile
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

// console.log('Script script.js carregado e rodando!'); // Removendo logs de carregamento para limpar o console

burger.addEventListener('click', () => {
    // Toggle Nav
    // Alterna a Navegação
    nav.classList.toggle('nav-active');
    
    // Animate Links
    // Anima os Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    // Animação do Burger (ícone do menu)
    burger.classList.toggle('toggle');
});

// Smooth Scrolling for Navigation Links
// Scroll Suave para Links de Navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Submission
// Envio do Formulário
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    // Pega os valores do formulário
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // Validate phone number (Brazilian format)
    // Valida número de telefone (formato brasileiro)
    if (phone && !validatePhone(phone)) {
        alert('Por favor, insira um número de WhatsApp válido');
        return;
    }
    
    // Here you would typically send the form data to a server
    // Aqui você normalmente enviaria os dados do formulário para um servidor
    
    // Show success message
    // Mostra mensagem de sucesso
    alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
    
    // Reset form
    // Reseta o formulário
    contactForm.reset();
});

// Validate Brazilian phone number
// Valida número de telefone brasileiro
function validatePhone(phone) {
    const phoneRegex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;
    return phoneRegex.test(phone);
}

// Scroll Animation
// Animação no Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Project Cards Hover Effect
// Efeito Hover nos Cards de Projeto
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add animation to skill tags
// Adiciona animação nas tags de habilidade
const skillTags = document.querySelectorAll('.skill-tags span');

skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'scale(1.1)';
        tag.style.transition = 'transform 0.3s ease';
    });
    
    tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'scale(1)';
    });
});

// Theme Toggle
// Alternador de Tema
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
// Verifica preferência de tema salva
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Project Filtering
// Filtragem de Projetos
const filterButtons = document.querySelectorAll('.filter-btn');
// projectCards is already declared above

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        // Remove a classe ativa de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        // Adiciona a classe ativa ao botão clicado
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                // Show the card: set display first, then remove hidden class with a tiny delay
                // Mostra o card: define o display primeiro, depois remove a classe hidden com um pequeno delay
                 card.style.display = ''; // Make the card visible in the layout flow
                 // Torna o card visível no fluxo do layout
                // Use a very small timeout to allow display change to be registered before animating
                // Use um timeout muito pequeno para permitir que a mudança de display seja registrada antes de animar
                setTimeout(() => {
                    card.classList.remove('hidden'); // Animate the card in
                    // Anima o card (entrada)
                }, 10); // A small delay (e.g., 10ms) can sometimes help ensure repaint before removing class
                 // Um pequeno delay (por exemplo, 10ms) pode ajudar a garantir o repaint antes de remover a classe
            } else {
                // Hide the card: add hidden class to start transition, and set display: none immediately after
                // Oculta o card: adiciona a classe hidden para iniciar a transição, e define display: none imediatamente depois
                card.classList.add('hidden'); // Animate the card out (opacity/scale)
                // Anima o card (saída - opacidade/escala)
                 card.style.display = 'none'; // Immediately remove from layout flow
                 // Remove imediatamente do fluxo do layout
                 // Note: This will cause the layout reflow to happen almost immediately as the card starts animating out.
                 // Nota: Isso fará com que o reflow do layout aconteça quase imediatamente assim que o card começar a animar para fora.
                 // This is the closest we can get to simultaneous hide+reflow with this setup.
                 // Isso é o mais próximo que conseguimos de ocultar+reflow simultâneo com esta configuração.
            }
        });
    });
});
