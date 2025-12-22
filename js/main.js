document.addEventListener('DOMContentLoaded', () => {
    // Кнопка "Записаться" на главной — переход на курсы
    const signupBtn = document.querySelector('.hero .btn-signup');
    if (signupBtn) {
        signupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'pages/courses.html';
        });
    }

    // Модальное окно заявки на курс
    const modal = document.getElementById('enrollModal');
    const closeBtn = document.querySelector('.modal-close');
    const modalCourseName = document.getElementById('modalCourseName');
    const courseSelect = document.getElementById('courseSelect');
    const formWrapper = document.getElementById('enrollFormWrapper');
    const successMessage = document.getElementById('successMessage');
    const closeSuccessBtn = document.querySelector('.btn-close-success');
    const enrollForm = document.getElementById('enrollForm');

    if (modal) {
        // Все кнопки с классом btn-program
        const programBtns = document.querySelectorAll('.btn-program');

        programBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Если текст кнопки "Бесплатно" — переходим на бесплатный курс
                if (btn.textContent.trim() === 'Бесплатно') {
                    window.location.href = 'free-course.html';
                    return;
                }

                // Иначе — открываем модалку (платные курсы)
                e.preventDefault();

                const programRow = btn.closest('.program-row') || btn.closest('.small-card');
                let courseTitle = 'Курс по Tilda';
                if (programRow) {
                    const titleEl = programRow.querySelector('h3');
                    if (titleEl) courseTitle = titleEl.textContent.trim();
                }

                modalCourseName.textContent = courseTitle;
                if (courseSelect) courseSelect.value = courseTitle;

                formWrapper.style.display = 'block';
                successMessage.style.display = 'none';

                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        });

        // Закрытие модалки
        function closeModal() {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', closeModal);

        // Отправка формы
        if (enrollForm) {
            enrollForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const inputs = enrollForm.querySelectorAll('input[required]');
                let allFilled = true;
                inputs.forEach(input => {
                    if (!input.value.trim()) allFilled = false;
                });

                if (allFilled) {
                    formWrapper.style.display = 'none';
                    successMessage.style.display = 'block';

                    successMessage.style.opacity = '0';
                    successMessage.style.transform = 'translateY(30px)';
                    successMessage.style.transition = 'all 0.6s ease';
                    setTimeout(() => {
                        successMessage.style.opacity = '1';
                        successMessage.style.transform = 'translateY(0)';
                    }, 50);

                    enrollForm.reset();
                } else {
                    alert('Пожалуйста, заполните все поля!');
                }
            });
        }
    }

    // Форма подбора курса
    const consultForm = document.getElementById('consultForm');
    const consultSuccessOverlay = document.getElementById('consultSuccess');
    const closeConsultBtn = document.querySelector('.btn-close-consult');

    if (consultForm) {
        consultForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = consultForm.querySelector('input[type="email"]').value.trim();
            const designLevel = consultForm.querySelector('.design-level').value;
            const tildaLevel = consultForm.querySelector('.tilda-level').value;

            if (email && designLevel && tildaLevel) {
                consultSuccessOverlay.classList.add('show');
                consultForm.reset();
            } else {
                alert('Пожалуйста, заполните все поля');
            }
        });
    }

    if (closeConsultBtn) {
        closeConsultBtn.addEventListener('click', () => {
            consultSuccessOverlay.classList.remove('show');
        });
    }

   // === АВТОРИЗАЦИЯ ===
const currentUser = localStorage.getItem('currentUser');
const authBlock = document.getElementById('authBlock');

if (!authBlock) return;

const isInPagesFolder = window.location.pathname.includes('/pages/');

if (currentUser) {
    const profilePath = isInPagesFolder ? 'profile.html' : 'pages/profile.html';
    const adminPath = isInPagesFolder ? 'admin.html' : 'pages/admin.html';
    const iconPath = isInPagesFolder ? '../images/profile-icon.png' : 'images/profile-icon.png';

    let authHTML = `
        <a href="${profilePath}" class="profile-link">
            <img src="${iconPath}" alt="Профиль" class="profile-icon">
            <span class="user-name">${currentUser}</span>
        </a>
    `;

    // Показываем "Админ-панель" только если логин = "admin"
    if (currentUser === 'admin') {
        authHTML += `<a href="${adminPath}" class="btn-login">Админ-панель</a>`;
    } else {
        authHTML += `<a href="#" id="logoutLink" class="btn-login">Выход</a>`;
    }

    authBlock.innerHTML = authHTML;

    // Выход только для обычных пользователей
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            location.reload();
        });
    }
} else {
    const loginPath = isInPagesFolder ? 'login.html' : 'pages/login.html';

    authBlock.innerHTML = `
        <a href="${loginPath}">Регистрация</a>
        <a href="${loginPath}" class="btn-login">Войти</a>
    `;
}
    
});
