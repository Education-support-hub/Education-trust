// Main JavaScript for Education Trust Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips and popovers if using Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Filter books by category
function filterBooks(category) {
    const items = document.querySelectorAll('.ebook-item');
    
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            setTimeout(() => {
                item.classList.add('animate-fade-in');
            }, 10);
        } else {
            item.style.display = 'none';
        }
    });

    // Update active button
    document.querySelectorAll('.btn-group button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Donate function
function selectAmount(amount) {
    document.getElementById('donateAmount').value = amount;
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Print functionality
function printResult() {
    window.print();
}

// Toggle navigation menu on mobile
function toggleMenu() {
    const navbar = document.querySelector('.navbar-collapse');
    navbar.classList.toggle('show');
}

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Basic validation
            const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });

            if (isValid) {
                alert('Form submitted successfully!');
                // Here you would typically send data to a server
                form.reset();
            }
        });
    });
});

// Scroll animations
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.card, .section-title').forEach(el => {
        observer.observe(el);
    });
}

// Initialize on page load
window.addEventListener('load', observeElements);