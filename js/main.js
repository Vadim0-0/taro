/* воспроизведение видео */

document.addEventListener("DOMContentLoaded", () => {
  // Получаем все контейнеры с видео
  const videoContainers = document.querySelectorAll('.reviews-video-block');

  videoContainers.forEach(container => {
      const video = container.querySelector('.reviews-video'); // Выбираем видео в контейнере
      const playButton = container.querySelector('.reviews-video-btn'); // Выбираем кнопку запуска в контейнере

      // Обработчик для кнопки запуска
      playButton.addEventListener('click', () => {
          video.style.display = 'block'; // Показать видео с элементами управления
          video.play(); // Запуск видео
          playButton.classList.add('hidden'); // Скрыть кнопку запуска
      });
  });
});

/* Отзывы - переключение высоты блока с текстом */

document.querySelectorAll('.reviews-read-block__btn').forEach(button => {
  button.addEventListener('click', function() {
    // Находим блок с текстом по классу внутри родительского элемента
    const descriptionBlock = button.parentElement.querySelector('.reviews-read-block__descr');

    if (descriptionBlock.style.maxHeight) {
      // Сбрасываем высоту для сворачивания текста
      descriptionBlock.style.maxHeight = null;
      button.textContent = 'Прочитать всё';
    } else {
      // Устанавливаем высоту по содержимому
      descriptionBlock.style.maxHeight = descriptionBlock.scrollHeight + 'px';
      button.textContent = 'Показать меньше';
    }
  });
});

/* Отзывы - переключение блоков и  листание */

document.addEventListener("DOMContentLoaded", function () {
// Элементы для навигации
const btnVideo = document.getElementById("reviews-video");
const btnRead = document.getElementById("reviews-read");
const reviewsVideoBlocks = document.querySelector(".reviews-video-blocks");
const reviewsReadBlocks = document.querySelector(".reviews-read-blocks");
const btnPrev = document.getElementById("reviews-btn-prev");
const btnNext = document.getElementById("reviews-btn-next");

// Начальные настройки
let activeBlock = reviewsVideoBlocks; // По умолчанию показываем reviewsVideoBlocks
let cardWidth = activeBlock.querySelector("div").offsetWidth;
let marginRight = parseInt(window.getComputedStyle(activeBlock.querySelector("div")).marginRight);
let scrollWidth = cardWidth + marginRight;

// Функция для переключения видимых блоков
function toggleActiveBlock(showElement, hideElement, activeButton, inactiveButton) {
  // Показать нужный блок и скрыть другой
  showElement.style.display = "flex";
  hideElement.style.display = "none";

  // Обновляем активную кнопку
  activeButton.classList.add("active");
  inactiveButton.classList.remove("active");

  // Переназначаем активный блок для прокрутки
  activeBlock = showElement;

  // Обновление ширины карточек
  cardWidth = activeBlock.querySelector("div").offsetWidth;
  marginRight = parseInt(window.getComputedStyle(activeBlock.querySelector("div")).marginRight);
  scrollWidth = cardWidth + marginRight;

  activeBlock.scrollTo({ left: 0 }); // Сброс прокрутки
}

// Переключение блоков по клику на кнопки "Посмотреть" и "Прочитать"
btnVideo.addEventListener("click", () => toggleActiveBlock(reviewsVideoBlocks, reviewsReadBlocks, btnVideo, btnRead));
btnRead.addEventListener("click", () => toggleActiveBlock(reviewsReadBlocks, reviewsVideoBlocks, btnRead, btnVideo));

// Функция для плавного скроллинга
let isScrolling = false; // Флаг для предотвращения повторного нажатия

function smoothScroll(direction) {
  if (isScrolling) return; // Если уже происходит скроллинг, выходим из функции
  isScrolling = true; // Устанавливаем флаг, что скроллинг начался

  activeBlock.scrollBy({
    left: direction * scrollWidth,
    behavior: "smooth"
  });

  // Сбрасываем флаг через небольшую задержку
  setTimeout(() => {
    isScrolling = false;
  }, 400); // Подождем 400 мс перед тем, как разрешить новый скроллинг
}

// Обработчики для кнопок "предыдущий" и "следующий"
btnPrev.addEventListener("click", () => smoothScroll(-1));
btnNext.addEventListener("click", () => smoothScroll(1));

// Добавление свайпа для прокрутки на мобильных устройствах
let startX = 0;
let currentX = 0;

activeBlock.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

activeBlock.addEventListener("touchmove", (e) => {
  currentX = e.touches[0].clientX;
});

activeBlock.addEventListener("touchend", () => {
  if (startX - currentX > 50) {
    smoothScroll(1); // Прокрутка вправо
  } else if (currentX - startX > 50) {
    smoothScroll(-1); // Прокрутка влево
  }
});

});



/* Header - открыте меню */

document.addEventListener("DOMContentLoaded", () => {
  // Находим элементы кнопок и блока
  const headerMenuOpen = document.getElementById("header-menu-open");
  const headerMenuClose = document.getElementById("header-menu-close");
  const headerContentMobile = document.querySelector(".header__content-mobile");

  // Добавляем класс при нажатии на кнопку открытия
  headerMenuOpen.addEventListener("click", () => {
    headerContentMobile.classList.add("active");
  });

  // Удаляем класс при нажатии на кнопку закрытия
  headerMenuClose.addEventListener("click", () => {
    headerContentMobile.classList.remove("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const popUpSearch = document.querySelector(".pop-up-search");
  const popUpSearchContent = document.querySelector(".pop-up-search__content");
  const openButtons = document.querySelectorAll(".header-search-open");
  const closeButton = document.getElementById("pop-up-search-close");
  const body = document.body;

  // Открытие pop-up при нажатии на любую кнопку с классом header-search-open
  openButtons.forEach(button => {
    button.addEventListener("click", function () {
      popUpSearch.classList.add("active");
      body.style.overflow = 'hidden'; // Блокируем скролл
    });
  });

  // Закрытие pop-up по кнопке
  closeButton.addEventListener("click", function () {
    popUpSearch.classList.remove("active");
    body.style.overflow = ''; // Разблокируем скролл
  });

  // Закрытие pop-up при клике вне pop-up-search__content
  document.addEventListener("click", function (event) {
    if (popUpSearch.classList.contains("active") &&
        !popUpSearchContent.contains(event.target) &&
        !Array.from(openButtons).some(button => button.contains(event.target))) {
      popUpSearch.classList.remove("active");
      body.style.overflow = ''; // Разблокируем скролл
    }
  });

  // Закрытие pop-up при выходе курсора из pop-up-search__content
  popUpSearchContent.addEventListener("mouseleave", function () {
    popUpSearch.classList.remove("active");
    body.style.overflow = ''; // Разблокируем скролл
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const coursesContainer = document.getElementById("header-courses-courses");
  const coursesButton = document.getElementById("header-courses-btn");
  const coursesList = document.querySelector(".header-courses-list");

  // Функция для установки высоты блока в зависимости от состояния
  function toggleCourses() {
      // Высота кнопки
      const buttonHeight = coursesButton.offsetHeight;
      // Высота списка
      const listHeight = coursesList.scrollHeight;

      if (coursesContainer.classList.contains("active")) {
          // Возвращаем высоту на высоту кнопки
          coursesContainer.style.height = `${buttonHeight}px`;
          coursesContainer.classList.remove("active");
      } else {
          // Устанавливаем высоту блока на высоту кнопки + высоту списка
          coursesContainer.style.height = `${buttonHeight + listHeight}px`;
          coursesContainer.classList.add("active");
      }
  }

  // Начальная высота равна высоте кнопки
  coursesContainer.style.height = `${coursesButton.offsetHeight}px`;

  // Добавляем обработчик клика на кнопку
  coursesButton.addEventListener("click", toggleCourses);
});




/* Index - листание блока */

document.addEventListener("DOMContentLoaded", () => {
  const productLists = document.querySelectorAll('.index-products-list'); // Находим все элементы с этим классом
  const maxScrollStep = 40; // Максимальная длина шага прокрутки

  // Функция плавного скроллинга для одного элемента
  function startSmoothScroll(container, targetScrollPosition) {
    let isScrolling = false;
    let animationFrameId;

    function smoothScrollStep() {
      const currentScrollPosition = container.scrollLeft;
      const difference = targetScrollPosition - currentScrollPosition;

      if (Math.abs(difference) > 1) {
        const scrollStep = Math.sign(difference) * Math.min(maxScrollStep, Math.abs(difference));
        container.scrollLeft += scrollStep;
        animationFrameId = requestAnimationFrame(smoothScrollStep);
      } else {
        isScrolling = false;
        container.scrollLeft = targetScrollPosition;
        cancelAnimationFrame(animationFrameId);
      }
    }

    if (!isScrolling) {
      isScrolling = true;
      animationFrameId = requestAnimationFrame(smoothScrollStep);
    }
  }

  // Проверка переполнения контейнера
  function isOverflowing(container) {
    return container.scrollWidth > container.clientWidth;
  }

  // Добавление обработчиков событий для всех контейнеров
  productLists.forEach((container) => {
    let targetScrollPosition = 0;

    // Обработчик колеса мыши
    container.addEventListener('wheel', (event) => {
      if (isOverflowing(container)) {
        event.preventDefault();
        targetScrollPosition += event.deltaY;
        targetScrollPosition = Math.max(
          0,
          Math.min(targetScrollPosition, container.scrollWidth - container.clientWidth)
        );
        startSmoothScroll(container, targetScrollPosition);
      }
    });

    // Обработчик для свайпа на мобильных устройствах
    let startX;

    container.addEventListener('touchstart', (event) => {
      if (isOverflowing(container)) {
        startX = event.touches[0].clientX;
        cancelAnimationFrame(animationFrameId); // Останавливаем предыдущее движение
      }
    });

    container.addEventListener('touchmove', (event) => {
      if (isOverflowing(container) && startX) {
        const touchX = event.touches[0].clientX;
        const scrollDelta = startX - touchX;
        targetScrollPosition += scrollDelta;
        targetScrollPosition = Math.max(
          0,
          Math.min(targetScrollPosition, container.scrollWidth - container.clientWidth)
        );
        startX = touchX;
        startSmoothScroll(container, targetScrollPosition);
      }
    });

    container.addEventListener('touchend', () => {
      startX = null;
    });
  });
});


/* Index - faq */

document.addEventListener('DOMContentLoaded', function() {
  // Получаем все элементы заголовков FAQ
  const faqHeaders = document.querySelectorAll('.index-faq__content-faq__item-header');

  faqHeaders.forEach(header => {
    // Добавляем обработчик события клика на каждый заголовок
    header.addEventListener('click', function() {
      // Получаем родительский элемент FAQ item
      const faqItem = header.parentElement;
      // Получаем блок с ответом
      const answer = faqItem.querySelector('.index-faq__content-faq__item-answer');

      // Если блок уже открыт (класс active), то сворачиваем его
      if (faqItem.classList.contains('active')) {
        faqItem.style.height = `${header.offsetHeight}px`; // Ставим высоту только заголовка
        faqItem.classList.remove('active');
      } else {
        // Закрываем все остальные блоки, если нужно сделать аккордеон
        document.querySelectorAll('.index-faq__content-faq__item.active').forEach(activeItem => {
          activeItem.style.height = `${activeItem.querySelector('.index-faq__content-faq__item-header').offsetHeight}px`;
          activeItem.classList.remove('active');
        });

        // Получаем полную высоту: высота заголовка + высота ответа
        const fullHeight = header.offsetHeight + answer.scrollHeight;
        // Задаем новую высоту блоку FAQ item
        faqItem.style.height = `${fullHeight}px`;
        // Добавляем класс active
        faqItem.classList.add('active');
      }
    });
  });

  // Устанавливаем начальную высоту для всех блоков FAQ item
  document.querySelectorAll('.index-faq__content-faq__item').forEach(item => {
    const header = item.querySelector('.index-faq__content-faq__item-header');
    item.style.height = `${header.offsetHeight}px`;
  });
});

/* Index - форма обратной связи */

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('feedback-form');
  const nameInput = document.getElementById('feedback-name');
  const telInput = document.getElementById('feedback-tel');

  // Ограничение на ввод только букв в поле "Имя"
  nameInput.addEventListener('input', function (e) {
    this.value = this.value.replace(/[^а-яА-ЯёЁa-zA-Z]/g, '');
  });

  // Маска для телефона без пробелов
  telInput.addEventListener('input', function () {
    let val = this.value.replace(/\D/g, ''); // Удаление всех нечисловых символов
    if (val.length > 1) {
      this.value = '+7' + val.substring(1, 11); // Форматируем номер без пробелов
    } else {
      this.value = '+7'; // Когда поле очищено, оставляем только +7
    }
  });

  // Ограничение на ввод только цифр в поле "Телефон"
  telInput.addEventListener('keydown', function (e) {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (!/\d/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  });

  // Функция для проверки правильности формата телефона
  function validatePhone(phone) {
    const phoneRegex = /^\+7\d{10}$/; // Регулярное выражение для проверки номера без пробелов
    return phoneRegex.test(phone);
  }

  // Проверка формы при отправке
  form.addEventListener('submit', function (e) {
    let isValid = true;

    // Проверка поля "Имя"
    if (!nameInput.value.trim()) {
      nameInput.style.borderColor = 'red'; // Окрашиваем бордер в красный, если поле пустое
      isValid = false;
    } else {
      nameInput.style.borderColor = ''; // Возвращаем стандартный бордер
    }

    // Проверка телефона
    if (!validatePhone(telInput.value)) {
      telInput.style.borderColor = 'red';
      isValid = false;
    } else {
      telInput.style.borderColor = '';
    }

    if (!isValid) {
      e.preventDefault(); // Предотвращаем отправку формы, если есть ошибки
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
    // Константы
  const totalPages = 14;
  let currentPage = 1;

  // SVG-иконки для стрелок
  const leftArrowSVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 5L8.5 12L15.5 19" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>`;
  const rightArrowSVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.5 5L15.5 12L8.5 19" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>`;

  // Функция отображения выбранной страницы
  function showPage(page) {
    for (let i = 1; i <= totalPages; i++) {
      const pageElement = document.getElementById(`page-${i}`);
      if (pageElement) pageElement.classList.remove('active');
    }

    const activePage = document.getElementById(`page-${page}`);
    if (activePage) {
      activePage.classList.add('active');
      const cardContainer = document.getElementById('cardContainer');
      cardContainer.style.height = `${activePage.offsetHeight}px`;
    }
  }

  // Генерация кнопок пагинации
  function renderPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    // Кнопка "Назад"
    const prevButton = document.createElement('button');
    prevButton.innerHTML = leftArrowSVG;
    prevButton.className = currentPage === 1 ? 'disabled' : '';
    prevButton.onclick = () => goToPage(currentPage - 1);
    pagination.appendChild(prevButton);

    // Кнопки для страниц
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.className = i === currentPage ? 'active' : '';
        pageButton.onclick = () => goToPage(i);
        pagination.appendChild(pageButton);
      } else if (i === currentPage - 3 || i === currentPage + 3) {
        const dotsButton = document.createElement('button');
        dotsButton.innerText = '...';
        dotsButton.className = 'dots';
        dotsButton.disabled = true; // Делаем кнопку неактивной
        pagination.appendChild(dotsButton);
      }
    }

    // Кнопка "Вперед"
    const nextButton = document.createElement('button');
    nextButton.innerHTML = rightArrowSVG;
    nextButton.className = currentPage === totalPages ? 'disabled' : '';
    nextButton.onclick = () => goToPage(currentPage + 1);
    pagination.appendChild(nextButton);
  }

  // Переключение на указанную страницу
  function goToPage(page) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    showPage(currentPage);
    renderPagination();
  }

  // Инициализация
  showPage(currentPage);
  renderPagination();

});

document.addEventListener('DOMContentLoaded', function () {
  // Получаем элементы по их идентификаторам
  const searchInput = document.getElementById('search-input');
  const clearButton = document.getElementById('clear-btn');
  const searchButton = document.getElementById('search-btn');

  // Проверяем, что элементы существуют перед добавлением обработчиков событий
  if (clearButton && searchInput) {
    clearButton.addEventListener('click', function() {
      searchInput.value = ''; // Очистка поля ввода
    });
  }

  if (searchButton && searchInput) {
    searchButton.addEventListener('click', function() {
      const query = searchInput.value.trim(); // Получаем и обрезаем значение
      if (query) {
        console.log('Выполнение поиска для запроса:', query);
        // Добавьте здесь код для отправки запроса на сервер или выполнения поиска
      } else {
        alert('Пожалуйста, введите запрос для поиска');
      }
    });
  }
});












