document.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser !== 'admin') {
        alert('Доступ запрещён');
        window.location.href = '../index.html';
        return;
    }

    const testsList = document.getElementById('testsList');
    const addTestBtn = document.getElementById('addTestBtn');
    const testModal = document.getElementById('testModal');
    const testForm = document.getElementById('testForm');
    const questionsContainer = document.getElementById('questionsContainer');
    const addQuestionBtn = document.getElementById('addQuestionBtn');

    let tests = JSON.parse(localStorage.getItem('adminTests')) || [];

    // Импорт старых тестов при первом открытии админки (если админка пустая)
    if (tests.length === 0) {
        const fallbackTests = [
            {
                title: 'Основы Tilda',
                level: 'beginner',
                questions: [
                    { text: 'Что такое Zero Block в Tilda?', options: ['a) Блок с нулевыми отступами', 'b) Инструмент для свободного дизайна без ограничений сетки', 'c) Блок для вставки кода', 'd) Пустой блок без содержимого'], correct: 'b' },
                    { text: 'Как опубликовать сайт на Tilda?', options: ['a) Нажать кнопку "Export"', 'b) Нажать кнопку "Publish" в правом верхнем углу', 'c) Сохранить проект и ждать автоматической публикации', 'd) Только через подключение домена'], correct: 'b' },
                    { text: 'Что делает кнопка "Preview"?', options: ['a) Показывает сайт как он будет выглядеть после публикации', 'b) Сохраняет изменения', 'c) Экспортирует код', 'd) Открывает настройки проекта'], correct: 'a' },
                    { text: 'Как добавить новый блок на страницу?', options: ['a) Нажать на плюс между блоками', 'b) Перейти в меню "Insert"', 'c) Перетащить из библиотеки блоков', 'd) Все варианты верны'], correct: 'd' },
                    { text: 'Где находятся настройки сайта (домен, SEO, аналитика)?', options: ['a) В панели слева', 'b) В Site Settings (шестерёнка в правом верхнем углу)', 'c) В меню блоков', 'd) Только после публикации'], correct: 'b' },
                    { text: 'Можно ли использовать свои шрифты на Tilda?', options: ['a) Нет, только стандартные', 'b) Да, через подключение Google Fonts или загрузку своих', 'c) Только в Zero Block', 'd) Только на платном тарифе'], correct: 'b' },
                    { text: 'Что такое "Tilda Publishing"?', options: ['a) Отдельный сервис для хостинга', 'b) Это само название платформы Tilda', 'c) Функция экспорта сайта', 'd) Платный тариф'], correct: 'b' },
                    { text: 'Как изменить фон страницы?', options: ['a) В настройках каждого блока', 'b) В настройках страницы (Page Settings)', 'c) Только через Zero Block', 'd) Никак, фон всегда белый'], correct: 'b' },
                    { text: 'Для чего нужен блок "Cover"?', options: ['a) Для создания обложки/первого экрана с заголовком и фоном', 'b) Для скрытия других блоков', 'c) Для вставки видео', 'd) Для навигации'], correct: 'a' },
                    { text: 'Как добавить ссылку на блок?', options: ['a) В настройках блока указать ID и создать меню с якорями', 'b) Перетащить блок выше', 'c) Только через кастомный код', 'd) Ссылки на блоки невозможны'], correct: 'a' }
                ]
            },
            {
                title: 'Формы и интеграции',
                level: 'intermediate',
                questions: [
                    { text: 'Какой блок используется для создания формы в Tilda?', options: ['a) T001', 'b) T123', 'c) T100', 'd) T110'], correct: 'b' },
                    { text: 'Можно ли отправлять данные формы на email?', options: ['a) Да, встроенная функция', 'b) Только через интеграции', 'c) Нет', 'd) Только на Business'], correct: 'a' },
                    { text: 'Как подключить форму к Google Sheets?', options: ['a) Через встроенную интеграцию', 'b) Только через Zapier', 'c) Через кастомный код', 'd) Невозможно'], correct: 'a' },
                    { text: 'Что такое "Приём платежей" в Tilda?', options: ['a) Встроенный модуль для онлайн-оплаты', 'b) Только через внешние виджеты', 'c) Только для Personal тарифа', 'd) Только для Business'], correct: 'a' },
                    { text: 'Какие CRM имеют встроенную интеграцию в Tilda?', options: ['a) amoCRM, Bitrix24', 'b) Только HubSpot', 'c) Только Salesforce', 'd) Нет встроенных'], correct: 'a' },
                    { text: 'Можно ли добавить файл-вложение в форму?', options: ['a) Да, через блок "Upload File"', 'b) Нет', 'c) Только через кастомный код', 'd) Только на Business'], correct: 'a' },
                    { text: 'Что такое Webhook в форме?', options: ['a) Отправка данных на внешний сервер', 'b) Виджет для чата', 'c) Аналитика', 'd) Платёжный шлюз'], correct: 'a' },
                    { text: 'Можно ли сделать многошаговую форму?', options: ['a) Да, через Zero Block', 'b) Нет', 'c) Только через кастомный код', 'd) Только на Business'], correct: 'a' },
                    { text: 'Как добавить капчу в форму?', options: ['a) Автоматически на Business', 'b) Через Google reCAPTCHA', 'c) Через встроенный блок', 'd) Невозможно'], correct: 'b' },
                    { text: 'Можно ли принимать оплату через Apple Pay?', options: ['a) Да, через встроенный модуль', 'b) Нет', 'c) Только через внешний виджет', 'd) Только на Business'], correct: 'a' },
                    { text: 'Как скрыть поле формы от пользователя?', options: ['a) Через настройки поля', 'b) Через CSS', 'c) Невозможно', 'd) Только через Zero Block'], correct: 'a' },
                    { text: 'Что такое "Уведомление по email" в форме?', options: ['a) Письмо администратору при заполнении', 'b) Письмо пользователю', 'c) SMS', 'd) Push'], correct: 'a' }
                ]
            },
            {
                title: 'Zero Block',
                level: 'advanced',
                questions: [
                    { text: 'Что позволяет делать Zero Block?', options: ['a) Только добавлять текст', 'b) Свободно позиционировать элементы без сетки', 'c) Только вставлять видео', 'd) Создавать формы'], correct: 'b' },
                    { text: 'Как войти в режим редактирования Zero Block?', options: ['a) Клик по блоку → "Edit in Zero Block"', 'b) Через меню Insert', 'c) Через кнопку "Z"', 'd) Автоматически'], correct: 'a' },
                    { text: 'Можно ли использовать сетку в Zero Block?', options: ['a) Нет, только свободное позиционирование', 'b) Да, можно включить', 'c) Только 12 колонок', 'd) Только на Business'], correct: 'b' },
                    { text: 'Как зафиксировать элемент на экране?', options: ['a) В настройках Position → Fixed', 'b) Через CSS', 'c) Невозможно', 'd) Только для текста'], correct: 'a' },
                    { text: 'Что такое "Shape" в Zero Block?', options: ['a) Фигуры для фона', 'b) Текст', 'c) Кнопка', 'd) Форма'], correct: 'a' },
                    { text: 'Можно ли анимировать элементы в Zero Block?', options: ['a) Да, пошаговая анимация', 'b) Нет', 'c) Только через кастомный код', 'd) Только на Business'], correct: 'a' },
                    { text: 'Как добавить кастомный HTML в Zero Block?', options: ['a) Через блок T123', 'b) Через "Add HTML"', 'c) Невозможно', 'd) Только через внешний код'], correct: 'a' },
                    { text: 'Что такое "Layer" в Zero Block?', options: ['a) Слои для порядка элементов', 'b) Цвет фона', 'c) Шрифт', 'd) Отступы'], correct: 'a' },
                    { text: 'Можно ли перекрывать элементы друг другом?', options: ['a) Да, через z-index', 'b) Нет', 'c) Только через код', 'd) Только для изображений'], correct: 'a' },
                    { text: 'Как сделать адаптивность в Zero Block?', options: ['a) Через настройки на разных устройствах', 'b) Автоматически', 'c) Только через код', 'd) Невозможно'], correct: 'a' },
                    { text: 'Можно ли использовать SVG в Zero Block?', options: ['a) Да, как изображение или shape', 'b) Нет', 'c) Только через код', 'd) Только на Business'], correct: 'a' },
                    { text: 'Что такое "Artboard" в Zero Block?', options: ['a) Рабочая область', 'b) Цветовая палитра', 'c) Шрифты', 'd) Анимации'], correct: 'a' },
                    { text: 'Можно ли копировать элементы между Zero Block?', options: ['a) Да, через копи-паст', 'b) Нет', 'c) Только через шаблоны', 'd) Только на Business'], correct: 'a' },
                    { text: 'Как добавить тень элементу?', options: ['a) В настройках Shadow', 'b) Через CSS', 'c) Невозможно', 'd) Только для текста'], correct: 'a' },
                    { text: 'Можно ли делать 3D-трансформации?', options: ['a) Да, через transform', 'b) Нет', 'c) Только через код', 'd) Только на Business'], correct: 'a' }
                ]
            }
        ];

        tests = fallbackTests;
        localStorage.setItem('adminTests', JSON.stringify(tests));
    }

    // Рендер списка тестов
    function renderTests() {
        testsList.innerHTML = '';
        if (tests.length === 0) {
            testsList.innerHTML = '<p style="text-align:center; font-size:24px; color:#666;">Тестов пока нет</p>';
            return;
        }

        tests.forEach((test, index) => {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.innerHTML = `
                <h3>${test.title}</h3>
                <p><strong>Уровень:</strong> ${test.level}</p>
                <p><strong>Вопросов:</strong> ${test.questions.length}</p>
                <div class="item-actions">
                    <button class="edit-btn" data-index="${index}">Редактировать</button>
                    <button class="delete-btn" data-index="${index}">Удалить</button>
                </div>
            `;
            testsList.appendChild(card);
        });
    }

    renderTests();

    // Добавление полей вопроса
    function addQuestionFields(q = null) {
        const block = document.createElement('div');
        block.className = 'question-block';
        block.innerHTML = `
            <input type="text" class="question-text" placeholder="Текст вопроса" value="${q ? q.text : ''}" required>
            <input type="text" class="option" placeholder="a) Вариант A" value="${q && q.options[0] ? q.options[0] : ''}" required>
            <input type="text" class="option" placeholder="b) Вариант B" value="${q && q.options[1] ? q.options[1] : ''}" required>
            <input type="text" class="option" placeholder="c) Вариант C" value="${q && q.options[2] ? q.options[2] : ''}" required>
            <input type="text" class="option" placeholder="d) Вариант D" value="${q && q.options[3] ? q.options[3] : ''}" required>
            <select class="correct-answer">
                <option value="a" ${q && q.correct === 'a' ? 'selected' : ''}>a</option>
                <option value="b" ${q && q.correct === 'b' ? 'selected' : ''}>b</option>
                <option value="c" ${q && q.correct === 'c' ? 'selected' : ''}>c</option>
                <option value="d" ${q && q.correct === 'd' ? 'selected' : ''}>d</option>
            </select>
            <button type="button" class="delete-question">Удалить вопрос</button>
        `;
        questionsContainer.appendChild(block);
    }

    addQuestionBtn.addEventListener('click', () => addQuestionFields());

    questionsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-question')) {
            e.target.parentElement.remove();
        }
    });

    function openTestModal(index = null) {
        document.getElementById('testModalTitle').textContent = index === null ? 'Добавить тест' : 'Редактировать тест';
        testForm.reset();
        questionsContainer.innerHTML = '';
        document.getElementById('testIndex').value = index === null ? '' : index;

        if (index !== null) {
            const test = tests[index];
            document.getElementById('testTitle').value = test.title;
            document.getElementById('testLevel').value = test.level;
            test.questions.forEach(q => addQuestionFields(q));
        } else {
            addQuestionFields();
        }

        testModal.classList.add('active');
    }

    addTestBtn.addEventListener('click', () => openTestModal());

    testForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const index = document.getElementById('testIndex').value;
        const title = document.getElementById('testTitle').value.trim();
        const level = document.getElementById('testLevel').value;

        const questions = [];
        document.querySelectorAll('.question-block').forEach(block => {
            const text = block.querySelector('.question-text').value.trim();
            const options = Array.from(block.querySelectorAll('.option')).map(input => input.value.trim());
            const correct = block.querySelector('.correct-answer').value;

            if (text && options.every(o => o)) {
                questions.push({ text, options, correct });
            }
        });

        const test = { title, level, questions };

        if (index === '') {
            tests.push(test);
        } else {
            tests[index] = test;
        }

        localStorage.setItem('adminTests', JSON.stringify(tests));
        renderTests();
        testModal.classList.remove('active');
    });

    testsList.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);

        if (e.target.classList.contains('edit-btn')) {
            openTestModal(index);
        }

        if (e.target.classList.contains('delete-btn')) {
            if (confirm('Удалить тест?')) {
                tests.splice(index, 1);
                localStorage.setItem('adminTests', JSON.stringify(tests));
                renderTests();
            }
        }
    });

    document.querySelector('.modal-close').addEventListener('click', () => testModal.classList.remove('active'));
    testModal.addEventListener('click', (e) => {
        if (e.target === testModal) testModal.classList.remove('active');
    });
});