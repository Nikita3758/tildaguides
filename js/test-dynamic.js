document.addEventListener('DOMContentLoaded', () => {
    const testContainer = document.getElementById('testContainer');

    // Загружаем тесты из админки (localStorage)
    const adminTests = JSON.parse(localStorage.getItem('adminTests')) || [];

    let tests = {};

    if (adminTests.length > 0) {
        // Если есть тесты от админа — используем их
        adminTests.forEach(test => {
            tests[test.level] = {
                level: test.level,
                title: test.title,
                description: `Проверьте знания по теме "${test.title}".`,
                info: `${test.questions.length} вопросов • ~${Math.ceil(test.questions.length * 0.8)} минут`,
                total: test.questions.length,
                questions: test.questions
            };
        });
    } else {
        // Fallback — старые встроенные тесты (если админка пустая)
        tests = {
            beginner: {
                level: 'beginner',
                title: 'Основы Tilda',
                description: 'Проверьте базовые знания платформы Tilda: интерфейс, блоки, публикация и основные инструменты.',
                info: '10 вопросов • ~8 минут',
                total: 10,
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
            intermediate: {
                level: 'intermediate',
                title: 'Формы и интеграции',
                description: 'Проверьте знания по созданию форм, интеграциям с сервисами и автоматизации.',
                info: '12 вопросов • ~10 минут',
                total: 12,
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
            advanced: {
                level: 'advanced',
                title: 'Zero Block',
                description: 'Проверьте знания по свободному позиционированию, сложным макетам и кастомным элементам в Zero Block.',
                info: '15 вопросов • ~15 минут',
                total: 15,
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
        };
    }

    // Получаем выбранный тест из URL
    const urlParams = new URLSearchParams(window.location.search);
    const selectedTestKey = urlParams.get('test') || 'beginner';

    const test = tests[selectedTestKey];

    if (!test) {
        testContainer.innerHTML = '<p style="text-align:center; font-size:24px; color:#142D4B;">Тест не найден.</p>';
        return;
    }

    // Генерация вопросов
    let questionsHTML = '';
    test.questions.forEach((q, idx) => {
        let optionsHTML = '';
        q.options.forEach((opt) => {
            const value = opt.charAt(0);
            const text = opt.substring(3);
            optionsHTML += `<label><input type="radio" name="q${idx + 1}" value="${value}"> <span>${opt}</span></label>`;
        });

        questionsHTML += `
            <div class="question">
                <p class="question-text">${idx + 1}. ${q.text}</p>
                ${optionsHTML}
            </div>
        `;
    });

    testContainer.innerHTML = `
        <div class="test-header">
            <span class="test-level ${test.level}">${test.level.charAt(0).toUpperCase() + test.level.slice(1)}</span>
            <h1>${test.title}</h1>
            <p class="test-description">${test.description}</p>
            <p class="test-info">${test.info}</p>
        </div>

        <form id="quizForm" class="quiz-form">
            ${questionsHTML}
            <button type="submit" class="btn-submit-large">Проверить ответы</button>
        </form>

        <div id="result" class="test-result" style="display: none;">
            <h2>Ваш результат: <span id="score">0</span>/${test.total}</h2>
            <p id="resultMessage"></p>
            <button class="btn-try-again">Пройти заново</button>
        </div>
    `;

    // Логика проверки и сохранения результата
    const form = document.getElementById('quizForm');
    const resultDiv = document.getElementById('result');
    const scoreSpan = document.getElementById('score');
    const messageP = document.getElementById('resultMessage');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let score = 0;
        test.questions.forEach((q, idx) => {
            const selected = document.querySelector(`input[name="q${idx + 1}"]:checked`);
            if (selected && selected.value === q.correct) score++;
        });

        scoreSpan.textContent = score;
        resultDiv.style.display = 'block';
        form.style.display = 'none';

        if (score === test.total) {
            messageP.textContent = 'Поздравляем! Идеальный результат!';
            messageP.style.color = '#00acc1';
        } else if (score >= test.total * 0.7) {
            messageP.textContent = 'Отличный результат!';
            messageP.style.color = '#F5B237';
        } else {
            messageP.textContent = 'Есть куда расти. Попробуйте повторить материал.';
            messageP.style.color = '#142D4B';
        }

        resultDiv.scrollIntoView({ behavior: 'smooth' });

        // Сохранение только лучшего результата
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            let results = JSON.parse(localStorage.getItem(`tests_${currentUser}`)) || [];
            const resultData = {
                testName: test.title,
                score: score,
                total: test.total,
                date: new Date().toISOString()
            };

            const existingIndex = results.findIndex(r => r.testName === test.title);
            if (existingIndex !== -1) {
                if (score > results[existingIndex].score) {
                    results[existingIndex] = resultData;
                }
            } else {
                results.push(resultData);
            }

            localStorage.setItem(`tests_${currentUser}`, JSON.stringify(results));
        }
    });

    // Пройти заново
    document.querySelector('.btn-try-again').addEventListener('click', () => {
        form.reset();
        form.style.display = 'block';
        resultDiv.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});