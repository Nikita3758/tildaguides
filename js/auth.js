document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterLinks = document.querySelectorAll('#showRegister');
    const showLoginLinks = document.querySelectorAll('#showLogin');
    const message = document.getElementById('message');

    // Переключение на регистрацию
    showRegisterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            message.innerHTML = '';
        });
    });

    // Переключение на вход
    showLoginLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
            message.innerHTML = '';
        });
    });

    // Регистрация + автоматический вход
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('regUsername').value.trim();
        const password = document.getElementById('regPassword').value;
        const confirm = document.getElementById('regConfirm').value;

        if (password !== confirm) {
            showMessage('Пароли не совпадают!', 'error');
            return;
        }

        if (localStorage.getItem(username)) {
            showMessage('Пользователь с таким логином уже существует!', 'error');
            return;
        }

        localStorage.setItem(username, password);
        localStorage.setItem('currentUser', username);

        showMessage('Регистрация успешна! Перенаправление в профиль...', 'success');

        setTimeout(() => {
            window.location.href = 'profile.html';
        }, 1500);
    });

    // Вход
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        const savedPassword = localStorage.getItem(username);

        if (savedPassword && savedPassword === password) {
            localStorage.setItem('currentUser', username);
            showMessage('Вход успешен! Перенаправление в профиль...', 'success');

            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 1500);
        } else {
            showMessage('Неверный логин или пароль!', 'error');
        }
    });

    function showMessage(text, type) {
        message.textContent = text;
        message.className = 'auth-message ' + type;
    }
});