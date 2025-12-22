document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('testsGrid');
    const searchInput = document.getElementById('searchInput');
    const difficultyFilter = document.getElementById('difficultyFilter');

    let tests = JSON.parse(localStorage.getItem('adminTests')) || [];

    // Fallback если админка пустая
    if (tests.length === 0) {
        tests = [
            { title: 'Основы Tilda', level: 'beginner', questions: [] },
            { title: 'Формы и интеграции', level: 'intermediate', questions: [] },
            { title: 'Zero Block', level: 'advanced', questions: [] }
        ];
    }

    function renderTests(filtered = tests) {
        grid.innerHTML = '';
        if (filtered.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">Тестов не найдено</p>';
            return;
        }

        filtered.forEach(test => {
            const card = document.createElement('div');
            card.className = 'test-card';
            card.setAttribute('data-difficulty', test.level);
            card.innerHTML = `
                <span class="test-level ${test.level}">${test.level.charAt(0).toUpperCase() + test.level.slice(1)}</span>
                <h3>${test.title}</h3>
                <p class="test-description">Проверьте свои знания по теме "${test.title}".</p>
                <p class="test-info">${test.questions.length} вопросов • ~${Math.ceil(test.questions.length * 0.8)} мин</p>
                <a href="test.html?test=${test.level}" class="btn-test">Пройти тест</a>
            `;
            grid.appendChild(card);
        });
    }

    function filterTests() {
        const term = searchInput.value.toLowerCase().trim();
        const level = difficultyFilter.value;

        const filtered = tests.filter(test => {
            const matchesSearch = test.title.toLowerCase().includes(term);
            const matchesLevel = level === 'all' || test.level === level;
            return matchesSearch && matchesLevel;
        });

        renderTests(filtered);
    }

    renderTests();
    searchInput.addEventListener('input', filterTests);
    difficultyFilter.addEventListener('change', filterTests);
});