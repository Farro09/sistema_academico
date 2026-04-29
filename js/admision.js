// ===== ADMISSION FORM HANDLING =====

document.addEventListener('DOMContentLoaded', function() {
    const admisionForm = document.getElementById('admisionForm');
    const fileInputs = document.querySelectorAll('input[type="file"]');
    const faqItems = document.querySelectorAll('.faq-item');
    const cursoSelect = document.getElementById('curso');
    const metodoPago = document.getElementById('metodoPago');

    // Inicializar estadísticas
    initializeStats();

    // Form Validation
    if (admisionForm) {
        admisionForm.addEventListener('submit', handleFormSubmit);
        admisionForm.addEventListener('input', validateFormField);
        admisionForm.addEventListener('change', updateFormProgress);
    }

    // Precio dinámico
    if (cursoSelect) {
        cursoSelect.addEventListener('change', updateCoursePrice);
        cursoSelect.addEventListener('change', updateInscriptionSummary);
    }

    // File Input Handling
    fileInputs.forEach(input => {
        const wrapper = input.closest('.file-input-wrapper');
        if (wrapper) {
            setupFileInput(input, wrapper);
        }
    });

    // FAQ Accordion
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', toggleFAQ);
        }
    });

    // Set minimum date for interview
    const fechaEntrevista = document.getElementById('fechaEntrevista');
    if (fechaEntrevista) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        fechaEntrevista.min = tomorrow.toISOString().split('T')[0];
    }
});

// ===== INITIALIZE STATS WITH ANIMATION =====

function initializeStats() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===== UPDATE COURSE PRICE =====

function updateCoursePrice() {
    const cursoSelect = document.getElementById('curso');
    const coursePrice = document.getElementById('coursePrice');
    const selectedOption = cursoSelect.options[cursoSelect.selectedIndex];
    const precio = selectedOption.dataset.precio;

    if (precio) {
        coursePrice.textContent = `Matrícula: $${precio}`;
        coursePrice.style.opacity = '1';
    } else {
        coursePrice.textContent = 'Selecciona un curso';
        coursePrice.style.opacity = '0.6';
    }
}

// ===== UPDATE INSCRIPTION SUMMARY =====

function updateInscriptionSummary() {
    const cursoSelect = document.getElementById('curso');
    const summaryNombre = document.getElementById('summaryNombre');
    const summaryPrice = document.getElementById('summaryPrice');
    
    const selectedOption = cursoSelect.options[cursoSelect.selectedIndex];
    const nombreCurso = selectedOption.text || 'No seleccionado';
    const precio = selectedOption.dataset.precio || '0';

    // Extraer solo el nombre del curso sin el precio
    const cursoNombre = nombreCurso.split(' - ')[0];
    
    summaryNombre.textContent = cursoNombre;
    summaryPrice.textContent = precio ? `$${precio}` : 'Por confirmar';

    // Animación
    summaryNombre.style.animation = 'none';
    summaryPrice.style.animation = 'none';
    setTimeout(() => {
        summaryNombre.style.animation = 'fadeInScale 0.4s ease';
        summaryPrice.style.animation = 'fadeInScale 0.4s ease';
    }, 10);
}

// ===== FORM PROGRESS =====

function updateFormProgress() {
    const form = document.getElementById('admisionForm');
    const allInputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let completedFields = 0;

    allInputs.forEach(input => {
        if (input.value.trim() !== '' && input.type !== 'file') {
            completedFields++;
        } else if (input.type === 'file' && input.files.length > 0) {
            completedFields++;
        }
    });

    const progress = Math.round((completedFields / allInputs.length) * 100);
    
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');

    if (progressFill) {
        progressFill.style.width = progress + '%';
    }
    if (progressPercent) {
        progressPercent.textContent = progress;
    }
}

// ===== FORM SUBMISSION =====

function handleFormSubmit(e) {
    e.preventDefault();

    // Validate all fields
    const form = e.target;
    const fields = form.querySelectorAll('[required]');
    let isValid = true;

    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    // Validate checkboxes
    const terminos = form.querySelector('#terminos');
    const privacidad = form.querySelector('#privacidad');

    if (!terminos.checked) {
        showFieldError(terminos, 'Debes aceptar los términos y condiciones');
        isValid = false;
    } else {
        clearFieldError(terminos);
    }

    if (!privacidad.checked) {
        showFieldError(privacidad, 'Debes autorizar el tratamiento de datos');
        isValid = false;
    } else {
        clearFieldError(privacidad);
    }

    if (isValid) {
        submitForm(form);
    } else {
        showToast('Por favor, completa todos los campos requeridos correctamente.', 'error');
        scrollToFirstError();
    }
}

// ===== FIELD VALIDATION =====

function validateFormField(e) {
    const field = e.target;
    if (field.hasAttribute('required')) {
        validateField(field);
    }
    updateFormProgress();
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const name = field.name;
    let isValid = true;
    let errorMessage = '';

    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Este campo es requerido';
    } else {
        switch (type) {
            case 'email':
                if (value && !isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Por favor, ingresa un correo válido';
                }
                break;
            case 'tel':
                if (value && !isValidPhone(value)) {
                    isValid = false;
                    errorMessage = 'Por favor, ingresa un teléfono válido';
                }
                break;
            case 'date':
                if (name === 'fechaNacimiento' && value && !isValidAge(value)) {
                    isValid = false;
                    errorMessage = 'Debes tener al menos 16 años';
                }
                if (name === 'fechaEntrevista' && value && !isValidInterviewDate(value)) {
                    isValid = false;
                    errorMessage = 'La fecha debe ser mayor a hoy';
                }
                break;
            case 'file':
                if (value && !isValidFileSize(field)) {
                    isValid = false;
                    errorMessage = 'El archivo no debe exceder 5MB';
                }
                break;
        }

        // Specific field validations
        if (name === 'dni' && value && !isValidDNI(value)) {
            isValid = false;
            errorMessage = 'Por favor, ingresa un DNI válido';
        }
    }

    if (isValid) {
        clearFieldError(field);
    } else {
        showFieldError(field, errorMessage);
    }

    return isValid;
}

// ===== VALIDATION HELPERS =====

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function isValidDNI(dni) {
    const dniRegex = /^[\d]{6,8}$/;
    return dniRegex.test(dni.replace(/\D/g, ''));
}

function isValidAge(birthDate) {
    const birth = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        return age - 1 >= 16;
    }
    return age >= 16;
}

function isValidInterviewDate(interviewDate) {
    const interview = new Date(interviewDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return interview > today;
}

function isValidFileSize(fileInput) {
    if (fileInput.files.length === 0) return true;
    const maxSize = 5 * 1024 * 1024; // 5MB
    return fileInput.files[0].size <= maxSize;
}

// ===== ERROR HANDLING =====

function showFieldError(field, message) {
    const formGroup = field.closest('.form-group') || field.closest('.checkbox-label');
    if (formGroup) {
        formGroup.classList.add('error');
        const errorSpan = formGroup.querySelector('.form-error');
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    }
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group') || field.closest('.checkbox-label');
    if (formGroup) {
        formGroup.classList.remove('error');
        const errorSpan = formGroup.querySelector('.form-error');
        if (errorSpan) {
            errorSpan.textContent = '';
        }
    }
}

function scrollToFirstError() {
    const firstError = document.querySelector('.form-group.error, .checkbox-label.error');
    if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// ===== FILE INPUT HANDLING =====

function setupFileInput(input, wrapper) {
    const label = wrapper.querySelector('.file-label');

    if (label) {
        // Click to upload
        label.addEventListener('click', function() {
            input.click();
        });

        // Drag and drop
        label.addEventListener('dragover', (e) => {
            e.preventDefault();
            label.style.backgroundColor = 'rgba(102, 126, 234, 0.15)';
            label.style.borderColor = 'var(--secondary)';
            label.style.transform = 'scale(1.02)';
        });

        label.addEventListener('dragleave', () => {
            label.style.backgroundColor = '';
            label.style.borderColor = '';
            label.style.transform = '';
        });

        label.addEventListener('drop', (e) => {
            e.preventDefault();
            label.style.backgroundColor = '';
            label.style.borderColor = '';
            label.style.transform = '';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                input.files = files;
                updateFileLabel(input, label);
            }
        });

        // File selection
        input.addEventListener('change', function() {
            updateFileLabel(this, label);
            validateField(this);
        });
    }
}

function updateFileLabel(input, label) {
    const fileText = label.querySelector('.file-text');
    const fileIcon = label.querySelector('.file-icon');
    if (input.files.length > 0) {
        const fileName = input.files[0].name;
        const fileSize = (input.files[0].size / 1024).toFixed(2);
        if (fileText) {
            fileText.textContent = `✓ ${fileName} (${fileSize}KB)`;
        }
        if (fileIcon) {
            fileIcon.textContent = '✓';
            label.style.borderColor = 'var(--primary)';
        }
    } else {
        if (fileText) {
            fileText.textContent = 'Selecciona archivo o arrastra aquí';
        }
        if (fileIcon) {
            fileIcon.textContent = '📄';
            label.style.borderColor = '';
        }
    }
}

// ===== FORM SUBMISSION =====

function submitForm(form) {
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;

    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    form.classList.add('form-loading');

    // Collect form data
    const formData = new FormData(form);

    // Simulate API call
    setTimeout(() => {
        // Reset form
        form.classList.remove('form-loading');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;

        // Reset progress
        document.getElementById('progressFill').style.width = '0%';
        document.getElementById('progressPercent').textContent = '0';

        // Show success message
        showToast('¡Solicitud enviada correctamente! Nos pondremos en contacto pronto.', 'success');

        // Clear any error states
        form.querySelectorAll('.form-group.error').forEach(group => {
            group.classList.remove('error');
        });

        // Reset summary
        document.getElementById('summaryNombre').textContent = 'No seleccionado';
        document.getElementById('summaryPrice').textContent = '$0';
        document.getElementById('coursePrice').textContent = 'Selecciona un curso';

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);

    // In a real application, you would send the data to a server
    console.log('Form data submitted:', Object.fromEntries(formData));
}

// ===== TOAST NOTIFICATIONS =====

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const messageSpan = toast.querySelector('.toast-message');
    const iconSpan = toast.querySelector('.toast-icon');

    messageSpan.textContent = message;

    if (type === 'error') {
        iconSpan.textContent = '✕';
        toast.style.backgroundColor = '#e74c3c';
    } else {
        iconSpan.textContent = '✓';
        toast.style.backgroundColor = '#27ae60';
    }

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// ===== FAQ ACCORDION =====

function toggleFAQ(e) {
    const faqItem = e.currentTarget.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');

    // Close all other FAQ items
    document.querySelectorAll('.faq-item.active').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });

    // Toggle current item
    faqItem.classList.toggle('active', !isActive);
}

// ===== SCROLL TO TOP =====

const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

