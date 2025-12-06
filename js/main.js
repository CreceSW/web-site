/**
 * CreceSW - JavaScript Principal
 * Consultora de Marketing y Desarrollo
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos los módulos
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initAnimatedCounters();
    initScrollAnimations();
    initContactForm();
    initActiveNavLink();
});

/**
 * Navegación - Cambia el estilo al hacer scroll
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');

    if (!navbar) return;

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Verificar estado inicial
}

/**
 * Menú Móvil - Toggle del menú en dispositivos móviles
 */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (!mobileMenuBtn || !navLinks) return;

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

/**
 * Scroll Suave - Para enlaces ancla
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);

            if (target) {
                const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Contadores Animados - Animación de números en la sección hero
 */
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');

    if (counters.length === 0) return;

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const step = target / (duration / 16); // 60fps aproximadamente
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    // Usar Intersection Observer para iniciar la animación cuando sea visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

/**
 * Animaciones de Scroll - Animar elementos al entrar en viewport
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .testimonial-card, .about-content, .about-visual');

    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

/**
 * Formulario de Contacto - Validación y envío
 */
function initContactForm() {
    const form = document.getElementById('contact-form');

    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Obtener datos del formulario
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Validación básica
        if (!validateForm(data)) {
            showToast('Por favor, completa todos los campos requeridos.', 'error');
            return;
        }

        // Mostrar estado de carga
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        // Simular envío (aquí iría la lógica real de envío)
        try {
            await simulateFormSubmission(data);
            showToast('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
            form.reset();
        } catch (error) {
            showToast('Hubo un error al enviar el mensaje. Intenta nuevamente.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

/**
 * Validación del formulario
 */
function validateForm(data) {
    const required = ['name', 'email', 'service', 'message'];

    for (const field of required) {
        if (!data[field] || data[field].trim() === '') {
            return false;
        }
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }

    return true;
}

/**
 * Simular envío del formulario
 */
function simulateFormSubmission(data) {
    return new Promise((resolve) => {
        // Simular delay de red
        setTimeout(() => {
            console.log('Formulario enviado:', data);
            resolve();
        }, 1500);
    });
}

/**
 * Mostrar notificación toast
 */
function showToast(message, type = 'success') {
    // Remover toast existente si hay uno
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Crear nuevo toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Mostrar toast
    setTimeout(() => toast.classList.add('show'), 100);

    // Ocultar y remover después de 4 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

/**
 * Actualizar enlace activo en navegación según scroll
 */
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-links a:not(.btn)');

    if (sections.length === 0 || navLinks.length === 0) return;

    const handleScroll = () => {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Verificar estado inicial
}

/**
 * Utilidad: Throttle para optimizar eventos de scroll
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Utilidad: Debounce para optimizar eventos de resize
 */
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/**
 * Parallax Effect para elementos del hero (opcional)
 */
function initParallax() {
    const shapes = document.querySelectorAll('.hero-shape');

    if (shapes.length === 0) return;

    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.scrollY;

        shapes.forEach((shape, index) => {
            const speed = 0.1 * (index + 1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, 16));
}

// Inicializar parallax si se desea
// initParallax();
