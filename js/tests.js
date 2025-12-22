document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const difficultyFilter = document.getElementById('difficultyFilter');
    const grid = document.getElementById('testsGrid');

    // Проверяем, что элементы существуют (на случай, если скрипт подключён на других страницах)
    if (!searchInput || !difficultyFilter || !grid) return;

    const cards = grid.querySelectorAll('.test-card');

    // Функция фильтрации
    const filterTests = () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedDifficulty = difficultyFilter.value;

        let visibleCount = 0;

        cards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const description = card.querySelector('.test-description')?.textContent.toLowerCase() || '';
            const fullText = title + ' ' + description;
            const cardDifficulty = card.getAttribute('data-difficulty') || '';

            const matchesSearch = fullText.includes(searchTerm);
            const matchesDifficulty = selectedDifficulty === 'all' || cardDifficulty === selectedDifficulty;

            if (matchesSearch && matchesDifficulty) {
                card.style.display = '';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Опционально: можно добавить сообщение "Ничего не найдено"
        // if (visibleCount === 0) { ... }
    };

    // Дебонсинг для поиска (чтобы не фильтровать на каждый символ)
    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(filterTests, 300); // ждём 300мс после ввода
    });

    difficultyFilter.addEventListener('change', filterTests);

    // Изначальный фильтр
    filterTests();
});