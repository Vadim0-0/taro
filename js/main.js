/* воспроизведение видео */
document.addEventListener("DOMContentLoaded", () => {
  // Получаем все контейнеры с видео
  const videoContainers = document.querySelectorAll('.reviews-video-block');

  if (videoContainers.length === 0) {
    return;
  }

  videoContainers.forEach(container => {
    const video = container.querySelector('.reviews-video'); // Выбираем видео в контейнере
    const playButton = container.querySelector('.reviews-video-btn'); // Выбираем кнопку запуска в контейнере

    if (!video || !playButton) {
      return;
    }

    // Обработчик для кнопки запуска
    playButton.addEventListener('click', () => {
      video.style.display = 'block'; // Показать видео с элементами управления
      video.play(); // Запуск видео
      playButton.classList.add('hidden'); // Скрыть кнопку запуска
    });
  });
});


/* Отзывы - переключение высоты блока с текстом */
document.addEventListener('DOMContentLoaded', () => {
  // Получаем все кнопки
  const buttons = document.querySelectorAll('.reviews-read-block__btn');

  if (buttons.length === 0) {
    return;
  }

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      // Находим блок с текстом по классу внутри родительского элемента
      const descriptionBlock = button.parentElement.querySelector('.reviews-read-block__descr');

      if (!descriptionBlock) {
        return;
      }

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
  const container = document.querySelector(".container"); // Контейнер для отслеживания отступа

  if (!btnVideo || !btnRead || !reviewsVideoBlocks || !reviewsReadBlocks || !btnPrev || !btnNext || !container) {
    return;
  }

  // Начальные настройки
  let activeBlock = reviewsVideoBlocks; // По умолчанию показываем reviewsVideoBlocks
  let cardWidth = activeBlock.querySelector("div").offsetWidth;
  let marginRight = parseInt(window.getComputedStyle(activeBlock.querySelector("div")).marginRight);
  let scrollWidth = cardWidth + marginRight;

  // Функция для обновления ширины блоков, левого отступа и translate
  function updateBlockStyles() {
    const containerLeftMargin = parseInt(window.getComputedStyle(container).marginLeft);
    const screenWidth = window.innerWidth;

    // Устанавливаем ширину блоков равной ширине экрана
    reviewsVideoBlocks.style.width = `${screenWidth}px`;
    reviewsReadBlocks.style.width = `${screenWidth}px`;

    // Обновляем отступы
    reviewsVideoBlocks.style.paddingLeft = `${containerLeftMargin}px`;
    reviewsReadBlocks.style.paddingLeft = `${containerLeftMargin}px`;

    // Сдвиг блоков в начало экрана
    const translateX = -containerLeftMargin;
    reviewsVideoBlocks.style.transform = `translateX(${translateX - 15}px)`;
    reviewsReadBlocks.style.transform = `translateX(${translateX - 15}px)`;
  }

  // Вызываем функцию при загрузке страницы и при изменении размера окна
  updateBlockStyles();
  window.addEventListener("resize", updateBlockStyles);

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
  const header = document.getElementById('header');

  if (!header) {
    return;
  }

  let lastScrollY = window.scrollY;
  let scrollThreshold = 30; // Adjust threshold for hiding the header
  let accumulatedScroll = 0;

  window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - lastScrollY;

      if (scrollDifference > 0) {
          // Scrolling down
          accumulatedScroll += scrollDifference;
          if (accumulatedScroll > scrollThreshold) {
              header.classList.add('hidden');
          }
      } else {
          // Scrolling up
          accumulatedScroll = 0;
          header.classList.remove('hidden');
      }

      lastScrollY = currentScrollY;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Находим элементы кнопок и блока
  const headerMenuOpen = document.getElementById("pop-up-favorite-open");
  const headerMenuClose = document.getElementById("pop-up-favorite-colse");
  const headerContentMobile = document.querySelector(".pop-up-favorite");
  const body = document.body;

  if (!headerMenuOpen || !headerMenuClose || !headerContentMobile) {
    return;
  }

  // Добавляем класс при нажатии на кнопку открытия
  headerMenuOpen.addEventListener("click", () => {
    headerContentMobile.classList.add("active");
    body.style.overflow = "hidden";
  });

  // Удаляем класс при нажатии на кнопку закрытия
  headerMenuClose.addEventListener("click", () => {
    headerContentMobile.classList.remove("active");
    body.style.overflow = '';
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Находим элементы кнопок и блока
  const headerMenuOpen = document.getElementById("header-menu-open");
  const headerMenuClose = document.getElementById("header-menu-close");
  const headerContentMobile = document.querySelector(".header__content-mobile");

  if (!headerMenuOpen || !headerMenuClose || !headerContentMobile) {
    return;
  }

  // Добавляем класс при нажатии на кнопку открытия
  headerMenuOpen.addEventListener("click", () => {
    headerContentMobile.classList.add("active");
  });

  // Удаляем класс при нажатии на кнопку закрытия
  headerMenuClose.addEventListener("click", () => {
    headerContentMobile.classList.remove("active");
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const coursesContainer = document.getElementById("header-courses-courses");
  const coursesButton = document.getElementById("header-courses-btn");
  const coursesList = document.querySelector(".header-courses-list");

  if (!coursesContainer || !coursesButton || !coursesList) {
    return;
  }

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

document.addEventListener("DOMContentLoaded", function () {
  const coursesBlock = document.getElementById("header-courses-block");
  const coursesButton = document.getElementById("header-courses-open");
  const coursesMenu = document.getElementById("courses-menu");

  if (!coursesBlock || !coursesButton || !coursesMenu) {
    return;
  }

  // Функция для переключения класса
  function toggleCoursesBlock() {
    coursesBlock.classList.toggle("active");
  }

  // Обработчик на кнопку, чтобы добавить/убрать класс
  coursesButton.addEventListener("click", function (event) {
    event.stopPropagation(); // Останавливаем всплытие, чтобы не закрыть меню сразу
    toggleCoursesBlock();
  });

  // Обработчик на документ, чтобы закрыть меню при клике вне его
  document.addEventListener("click", function (event) {
    if (!coursesBlock.contains(event.target)) {
      coursesBlock.classList.remove("active");
    }
  });

  // Обработчик для закрытия меню при уходе курсора из меню
  coursesMenu.addEventListener("mouseleave", function () {
    coursesBlock.classList.remove("active");
  });
});

/* pop-up-search */
document.addEventListener("DOMContentLoaded", function () {
  const popUpSearch = document.querySelector(".pop-up-search");
  const popUpSearchContent = document.querySelector(".pop-up-search__content");
  const openButtons = document.querySelectorAll(".header-search-open");
  const closeButton = document.getElementById("pop-up-search-close");
  const body = document.body;
  const searchInput = document.getElementById("pop-up-search-input"); // Поле поиска
  const searchContentPages = document.querySelector(".pop-up-search__content-pages");
  const cleanButton = document.getElementById("pop-up-search-clean-btn"); // Кнопка очистки

  if (!popUpSearch || !popUpSearchContent || !openButtons || !closeButton || !body || !searchContentPages || !searchInput || !cleanButton) {
    return;
  }

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

  // Проверяем, что searchInput и searchContentPages существуют
  if (searchInput && searchContentPages) {
    // Показ блока pop-up-search__content-pages при вводе текста в поле поиска для экранов < 768px
    function toggleSearchContentPages() {
      if (window.innerWidth < 768) {
        // Показываем блок только если введён текст
        if (searchInput.value.trim() !== "") {
          searchContentPages.classList.add("visible");
        } else {
          searchContentPages.classList.remove("visible");
        }
      } else {
        // Для экранов >= 768px блок всегда виден
        searchContentPages.classList.add("visible");
      }
    }

    // Обработчик для ввода текста
    searchInput.addEventListener("input", toggleSearchContentPages);

    // Обработчик для изменения размера окна
    window.addEventListener("resize", toggleSearchContentPages);

    // Устанавливаем видимость блока при загрузке страницы в зависимости от ширины экрана
    toggleSearchContentPages();
  }

  // Проверяем, что кнопка очистки существует и добавляем обработчик для очистки поля поиска
  if (cleanButton && searchInput) {
    cleanButton.addEventListener("click", function () {
      searchInput.value = ""; // Очищаем поле ввода
      toggleSearchContentPages(); // Обновляем видимость блока `pop-up-search__content-pages`
      searchInput.focus(); // Фокус на поле после очистки
    });
  }
});


/* Index - faq */
document.addEventListener('DOMContentLoaded', function() {
  // Получаем все элементы заголовков FAQ
  const faqHeaders = document.querySelectorAll('.index-faq__content-faq__item-header');

  if (!faqHeaders) {
    return;
  }

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

  if (!form || !nameInput || !telInput) {
    return;
  }

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


/* Листание листов с пагинацией */
document.addEventListener('DOMContentLoaded', function () {
  // Проверяем наличие контейнеров для страниц и пагинации
  const paginationContainer = document.getElementById('pagination');
  const cardContainer = document.getElementById('cardContainer');
  const pages = document.querySelectorAll('[id^="page-"]');

  // Прерываем выполнение, если элементы отсутствуют
  if (!paginationContainer || !cardContainer || pages.length === 0) {
    return;
  }

  // Константы
  let totalPages = pages.length; // Подсчитываем количество страниц
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
      cardContainer.style.height = `${activePage.offsetHeight}px`;
    }
  }

  // Генерация кнопок пагинации
  function renderPagination() {
    paginationContainer.innerHTML = '';

    // Кнопка "Назад"
    const prevButton = document.createElement('button');
    prevButton.innerHTML = leftArrowSVG;
    prevButton.className = currentPage === 1 ? 'disabled' : '';
    prevButton.onclick = () => goToPage(currentPage - 1);
    paginationContainer.appendChild(prevButton);

    // Кнопки для страниц
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.className = i === currentPage ? 'active' : '';
        pageButton.onclick = () => goToPage(i);
        paginationContainer.appendChild(pageButton);
      } else if (i === currentPage - 3 || i === currentPage + 3) {
        const dotsButton = document.createElement('button');
        dotsButton.innerText = '...';
        dotsButton.className = 'dots';
        dotsButton.disabled = true; // Делаем кнопку неактивной
        paginationContainer.appendChild(dotsButton);
      }
    }

    // Кнопка "Вперед"
    const nextButton = document.createElement('button');
    nextButton.innerHTML = rightArrowSVG;
    nextButton.className = currentPage === totalPages ? 'disabled' : '';
    nextButton.onclick = () => goToPage(currentPage + 1);
    paginationContainer.appendChild(nextButton);
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


/* Страница поиска */
document.addEventListener('DOMContentLoaded', function () {
  // Получаем элементы по их идентификаторам
  const searchInput = document.getElementById('search-input');
  const clearButton = document.getElementById('clear-btn');
  const searchButton = document.getElementById('search-btn');

  if (!searchInput || !clearButton || !searchButton) {
    return;
  }

  if (clearButton && searchInput) {
    clearButton.addEventListener('click', function() {
      searchInput.value = '';
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

/* Страница продукта переключение изоражений */
document.addEventListener('DOMContentLoaded', function () {
  const mainImage = document.querySelector(".productPage-hero__content-images__img img");
  const buttons = document.querySelectorAll(".productPage-hero__content-images__btns button");

  if (!mainImage || !buttons) {
    return;
  }

  let currentIndex = 0;

  // Функция для обновления основного изображения и класса "active"
  function updateMainImage(index) {
    const newImageSrc = buttons[index].querySelector("img").getAttribute("src");
    mainImage.setAttribute("src", newImageSrc);

    // Удаляем класс active у всех кнопок и добавляем его к текущей
    buttons.forEach((button) => button.classList.remove("active"));
    buttons[index].classList.add("active");
  }

  // Обработчик нажатия на кнопку
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      currentIndex = index;
      updateMainImage(index);
    });
  });

  // Свайп для переключения изображений
  let startX = 0;

  mainImage.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  mainImage.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const threshold = 50; // минимальное расстояние для распознавания свайпа

    if (endX - startX > threshold) {
      // свайп вправо
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : buttons.length - 1;
    } else if (startX - endX > threshold) {
      // свайп влево
      currentIndex = (currentIndex < buttons.length - 1) ? currentIndex + 1 : 0;
    }

    updateMainImage(currentIndex);
  });
});


/* Прохожждение теста */
document.addEventListener("DOMContentLoaded", () => {
  let currentQuestionIndex = 0;
  const questions = document.querySelectorAll('.pageTest-test__content-questions__question');
  const questionsCount = questions.length;

  // Проверка на наличие вопросов
  if (!questionsCount) {
    return;
  }

  const prevButtons = document.querySelectorAll('.prev-button');
  const nextButtons = document.querySelectorAll('.next-button');
  const finishButton = document.querySelector('.finish-button');
  const restartButton = document.querySelector('.restart-button');
  const stepsContainer = document.getElementById('pageTest-steps');
  const resultBlock = document.getElementById('result');
  const container = document.getElementById('question-container');

  function renderSteps() {
      if (!stepsContainer) {
        return;
      }

      for (let i = 0; i < questionsCount; i++) {
          const stepButton = document.createElement('button');
          stepButton.classList.add('step-button');
          stepButton.textContent = i + 1;
          stepButton.onclick = () => goToQuestion(i);
          stepsContainer.appendChild(stepButton);
      }
  }

  function updateStepButtons() {
      const stepButtons = document.querySelectorAll('.step-button');
      stepButtons.forEach((button, index) => {
          button.classList.toggle('completed', index < currentQuestionIndex);
          button.classList.toggle('active', index === currentQuestionIndex);
          button.classList.toggle('current', index === currentQuestionIndex); // Класс для текущего шага
      });
  }

  function updateQuestionVisibility() {
      questions.forEach((question, index) => {
          question.classList.toggle('active', index === currentQuestionIndex);
          question.classList.toggle('fade-out', index !== currentQuestionIndex);
      });

      updateQuestionCount();
      updateContainerHeight();
      markCompleted();
      updateStepButtons();
  }

  function updateContainerHeight() {

    if (!container) {
      return;
    }

    const activeQuestion = document.querySelector('.pageTest-test__content-questions__question.active');
    container.style.height = activeQuestion ? `${activeQuestion.offsetHeight}px` : (resultBlock ? `${resultBlock.offsetHeight}px` : 'auto');
  }

  function updateQuestionCount() {
      const questionCountElement = document.querySelector('.pageTest-test__content-questions__question.active .question-count');
      if (questionCountElement) {
          questionCountElement.textContent = `Вопрос ${currentQuestionIndex + 1} из ${questionsCount}`;
      }
  }

  function nextQuestion() {
      if (currentQuestionIndex < questionsCount - 1) {
          currentQuestionIndex++;
          updateQuestionVisibility();
      } else {
          showResult();
      }
  }

  function prevQuestion() {
      if (currentQuestionIndex > 0) {
          currentQuestionIndex--;
          updateQuestionVisibility();
      }
  }

  function showResult() {
      questions.forEach(q => q.classList.remove('active'));
      if (resultBlock) {
          resultBlock.style.display = 'block';
      }
      updateContainerHeight();
  }

  function restartTest() {
      currentQuestionIndex = 0;
      updateStepButtons();
      updateQuestionVisibility();
      if (resultBlock) {
          resultBlock.style.display = 'none';
      }

      questions.forEach(q => {
          const radios = q.querySelectorAll('input[type="radio"]');
          radios.forEach(radio => {
              radio.checked = false;
          });
      });

      const stepButtons = document.querySelectorAll('.step-button');
      stepButtons.forEach(button => button.classList.remove('completed'));

      updateContainerHeight();
  }

  function markCompleted() {
      const stepButtons = document.querySelectorAll('.step-button');
      stepButtons.forEach((button, index) => {
          if (index < currentQuestionIndex) {
              button.classList.add('completed');
          } else if (index === currentQuestionIndex) {
              button.classList.remove('completed');
          }
      });
  }

  function goToQuestion(index) {
      currentQuestionIndex = index;
      updateQuestionVisibility();
  }

  // Добавляем обработчики
  prevButtons.forEach(button => button.onclick = prevQuestion);
  nextButtons.forEach(button => button.onclick = nextQuestion);

  if (finishButton) {
      finishButton.onclick = showResult;
  }

  if (restartButton) {
      restartButton.onclick = restartTest;
  }

  renderSteps();
  updateQuestionVisibility();
  updateContainerHeight();
});


/* Карта таро */
document.addEventListener('DOMContentLoaded', function () {
  const carouselItems = document.querySelectorAll('.carousel-item');

  if (!carouselItems) {
    return;
  }

  carouselItems.forEach(item => {
    item.addEventListener('click', function () {
      if (item.classList.contains('active')) {
        const link = item.getAttribute('data-link');
        if (link) {
          window.location.href = link;
        }
      }
    });
  });
});


/* Карта таро - перемещение изображения при листании */
document.addEventListener("DOMContentLoaded", function () {
  const imgContainer = document.getElementById('pageCardDay-hero__content-img');
  const heroContent = document.getElementById('pageCardDay-hero__content');

  if (!imgContainer || !heroContent) {
    return;
  }

  if (imgContainer && heroContent) {
    const computedStyle = window.getComputedStyle(imgContainer);
    const initialTop = parseInt(computedStyle.top, 10);
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    function handleScroll() {
      if (window.innerWidth >= 1024) {
        const heroContentRect = heroContent.getBoundingClientRect();
        const imgContainerHeight = imgContainer.clientHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        const isScrollingDown = scrollTop > lastScrollTop;
        lastScrollTop = scrollTop;

        if (heroContentRect.top <= initialTop && heroContentRect.bottom > imgContainerHeight + initialTop) {
          if (isScrollingDown) {
            imgContainer.style.top = "0px";
          } else {
            imgContainer.style.top = "67px";
          }
          imgContainer.classList.add('fixed');
        } else {
          imgContainer.classList.remove('fixed');
          imgContainer.style.top = "";
        }
      } else {
        imgContainer.classList.remove('fixed');
        imgContainer.style.top = "";
      }
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
  }
});

/* Карта таро - листание блока */
document.addEventListener("DOMContentLoaded", function () {
  const cardList = document.querySelector(".pageCardDay-hero__content-scroll__list");
  const cards = document.querySelectorAll(".product-card");
  const btnPrev = document.getElementById("pageCardDay-btn-prev");
  const btnNext = document.getElementById("pageCardDay-btn-next");

  if (!cardList || !cards || !btnPrev || !btnNext ) {
    return;
  }

  let currentIndex = 0;
  let isAnimating = false;

  // Calculate card width and margin dynamically
  const getCardWidth = () => {
    const cardStyle = window.getComputedStyle(cards[0]);
    const cardWidth = cards[0].offsetWidth;
    const cardMarginRight = parseInt(cardStyle.marginRight, 10);
    return cardWidth + cardMarginRight;
  };

  // Apply smooth transition effect to the card list
  const setTransition = (enable) => {
    cardList.style.transition = enable ? 'transform 0.5s ease' : 'none';
  };

  // Function to scroll to a specific index with animation
  const scrollToIndex = (index) => {
    if (isAnimating) return;
    isAnimating = true;
    setTransition(true);

    const scrollAmount = getCardWidth() * index;
    cardList.style.transform = `translateX(-${scrollAmount}px)`;

    // Remove transition after animation to reset for next interaction
    cardList.addEventListener('transitionend', () => {
      isAnimating = false;
      setTransition(false);
    }, { once: true });
  };

  // Move to the next card
  const nextCard = () => {
    if (isAnimating || currentIndex >= cards.length - 1) return;
    currentIndex++;
    scrollToIndex(currentIndex);
  };

  // Move to the previous card
  const prevCard = () => {
    if (isAnimating || currentIndex <= 0) return;
    currentIndex--;
    scrollToIndex(currentIndex);
  };

  // Swipe functionality
  let startX = 0;
  let isSwiping = false;

  cardList.addEventListener("touchstart", (e) => {
    if (isAnimating) return; // Prevent swipe while animating
    startX = e.touches[0].clientX;
    isSwiping = true;
  });

  cardList.addEventListener("touchmove", (e) => {
    if (!isSwiping) return;

    const moveX = e.touches[0].clientX - startX;

    if (moveX > 50) {
      prevCard();
      isSwiping = false;
    } else if (moveX < -50) {
      nextCard();
      isSwiping = false;
    }
  });

  cardList.addEventListener("touchend", () => {
    isSwiping = false;
  });

  // Event listeners for buttons
  btnNext.addEventListener("click", nextCard);
  btnPrev.addEventListener("click", prevCard);
});


/* Блог - открытие категории в мобильной версии */
document.addEventListener('DOMContentLoaded', function() {
  const categoriesBlock = document.getElementById('blogs-categories-block');
  const toggleButton = document.getElementById('blogs-categories-title');
  const contentBlock = categoriesBlock?.querySelector('.blogs-hero__content-left__block-choice');
  let isExpanded = false;

  if (!categoriesBlock || !toggleButton || !contentBlock) {
    return;
  }

  function setInitialHeight() {
    if (window.innerWidth <= 768) {
      if (!isExpanded) {
        categoriesBlock.style.height = `${toggleButton.offsetHeight}px`;
      }
    } else {
      categoriesBlock.style.height = '';
      categoriesBlock.classList.remove('active');
      isExpanded = false;
    }
  }

  function toggleBlock() {
    if (window.innerWidth <= 768) {
      if (isExpanded) {
        categoriesBlock.style.height = `${toggleButton.offsetHeight}px`;
        categoriesBlock.classList.remove('active');
      } else {
        categoriesBlock.style.height = `${toggleButton.offsetHeight + contentBlock.scrollHeight}px`;
        categoriesBlock.classList.add('active');
      }
      isExpanded = !isExpanded;
    }
  }

  toggleButton.addEventListener('click', toggleBlock);

  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      setInitialHeight();
    } else if (isExpanded) {
      categoriesBlock.style.height = `${toggleButton.offsetHeight + contentBlock.scrollHeight}px`;
    } else {
      setInitialHeight();
    }
  });

  setInitialHeight();
});

/* Блог - комментарии */
document.addEventListener("DOMContentLoaded", () => {
  const getDeclension = (number, singular, few, many) => {
    const mod10 = number % 10;
    const mod100 = number % 100;
    if (mod100 >= 11 && mod100 <= 14) return many;
    if (mod10 === 1) return singular;
    if (mod10 >= 2 && mod10 <= 4) return few;
    return many;
  };

  const initializeBlocks = () => {
    document.querySelectorAll('.blogs-hero__content-info__comments-bloсks__block').forEach(block => {
      const topBlock = block.querySelector('.blogs-hero__content-info__comments-bloсks__block-top');
      const bottomBlock = block.querySelector('.blogs-hero__content-info__comments-bloсks__block-bottom');
      const answersButton = block.querySelector('.pageBlog-comments-answers');

      if (!topBlock || !bottomBlock || !answersButton) {
        return;
      }

      if (topBlock && answersButton) {
        block.style.height = `${topBlock.getBoundingClientRect().height}px`;

        if (bottomBlock) {
          const replyCount = bottomBlock.querySelectorAll('.blogs-hero__content-info__comments-bloсks__block-top').length;
          const replyText = getDeclension(replyCount, 'ответ', 'ответа', 'ответов');
          answersButton.textContent = `Показать ${replyCount} ${replyText}`;
        }
      }
    });
  };

  const updateBlockHeight = (block, delay = 0) => {
    setTimeout(() => {
      const topBlock = block.querySelector('.blogs-hero__content-info__comments-bloсks__block-top');
      const bottomBlock = block.querySelector('.blogs-hero__content-info__comments-bloсks__block-bottom');
      const respondInput = topBlock.querySelector('.pageBlogs-comments-respond');

      // Определяем текущие высоты
      const topHeight = topBlock ? topBlock.getBoundingClientRect().height : 0;
      const bottomHeight = bottomBlock && block.classList.contains('expanded')
        ? bottomBlock.getBoundingClientRect().height
        : 0;
      const respondHeight = respondInput && respondInput.classList.contains('visible')
        ? respondInput.scrollHeight
        : 0;

      // Устанавливаем итоговую высоту
      block.style.height = `${topHeight + bottomHeight + respondHeight}px`;
    }, delay);
  };

  document.querySelectorAll('.pageBlog-comments-answers').forEach(button => {
    button.addEventListener('click', () => {
      const block = button.closest('.blogs-hero__content-info__comments-bloсks__block');
      const topBlock = block.querySelector('.blogs-hero__content-info__comments-bloсks__block-top');
      const bottomBlock = block.querySelector('.blogs-hero__content-info__comments-bloсks__block-bottom');

      if (!bottomBlock) return;

      if (block.classList.contains('expanded')) {
        block.classList.remove('expanded');
        updateBlockHeight(block);
        const replyCount = bottomBlock.querySelectorAll('.blogs-hero__content-info__comments-bloсks__block-top').length;
        const replyText = getDeclension(replyCount, 'ответ', 'ответа', 'ответов');
        button.textContent = `Показать ${replyCount} ${replyText}`;
      } else {
        block.classList.add('expanded');
        updateBlockHeight(block, 100); // Задержка в 100 мс для корректного пересчета высоты
        button.textContent = "Скрыть ответы";
      }
    });
  });

  document.querySelectorAll('.pageBlog-comments-respond').forEach(button => {
    button.addEventListener('click', () => {
      const topBlock = button.closest('.blogs-hero__content-info__comments-bloсks__block-top');
      const block = button.closest('.blogs-hero__content-info__comments-bloсks__block');
      const respondInput = topBlock.querySelector('.pageBlogs-comments-respond');

      if (respondInput) {
        respondInput.classList.toggle('visible');

        // Даем браузеру отрисовать изменение класса перед пересчетом высоты
        updateBlockHeight(block, 100); // Устанавливаем задержку в 100 мс для точного пересчета
      }
    });
  });

  initializeBlocks();
});


/* Курсы - открытие категории в мобильной версии */
document.addEventListener('DOMContentLoaded', function() {
  const categoriesBlock = document.getElementById('courses-categories-block');
  const toggleButton = document.getElementById('courses-categories-title');
  const contentBlock = categoriesBlock?.querySelector('.courses-hero__content-left__block-choice');
  let isExpanded = false;

  if (!categoriesBlock || !toggleButton || !contentBlock) {
    return;
  }

  function setInitialHeight() {
    if (window.innerWidth <= 768) {
      if (!isExpanded) {
        categoriesBlock.style.height = `${toggleButton.offsetHeight}px`;
      }
    } else {
      categoriesBlock.style.height = '';
      categoriesBlock.classList.remove('active');
      isExpanded = false;
    }
  }

  function toggleBlock() {
    if (window.innerWidth <= 768) {
      if (isExpanded) {
        categoriesBlock.style.height = `${toggleButton.offsetHeight}px`;
        categoriesBlock.classList.remove('active');
      } else {
        categoriesBlock.style.height = `${toggleButton.offsetHeight + contentBlock.scrollHeight}px`;
        categoriesBlock.classList.add('active');
      }
      isExpanded = !isExpanded;
    }
  }

  toggleButton.addEventListener('click', toggleBlock);

  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      setInitialHeight();
    } else if (isExpanded) {
      categoriesBlock.style.height = `${toggleButton.offsetHeight + contentBlock.scrollHeight}px`;
    } else {
      setInitialHeight();
    }
  });

  setInitialHeight();
});


/* Магазин - сброс фильра */
document.addEventListener("DOMContentLoaded", function() {
  // Function to clear category checkboxes
  const clearCategories = () => {
    const checkboxes = document.querySelectorAll(".shops-hero__content-left__block-categories input[type='checkbox']");
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
  };

  // Function to clear price input fields
  const clearPrice = () => {
    const priceFrom = document.getElementById("categories-price-from");
    const priceBefore = document.getElementById("categories-price-before");

    if (priceFrom) priceFrom.value = "";
    if (priceBefore) priceBefore.value = "";
  };

  // Event listener for "Сбросить" button in categories
  const categoriesResetButton = document.getElementById("shops-btn-clean-categories");
  if (categoriesResetButton) {
    categoriesResetButton.addEventListener("click", clearCategories);
  }

  // Event listener for "Сбросить" button in price
  const priceResetButton = document.getElementById("shops-btn-clean-price");
  if (priceResetButton) {
    priceResetButton.addEventListener("click", clearPrice);
  }
});

/* Магазин - открытие фильтра в мобильной версии */
document.addEventListener('DOMContentLoaded', function() {
  const categoriesBlock = document.getElementById('shops-categories-block');
  const toggleButton = document.getElementById('shops-categories-title');
  const contentBlock = categoriesBlock?.querySelector('.shops-hero__content-left__block');
  let isExpanded = false;

  if (!categoriesBlock || !toggleButton || !contentBlock) {
    return;
  }

  function setInitialHeight() {
    if (window.innerWidth <= 768) {
      if (!isExpanded) {
        categoriesBlock.style.height = `${toggleButton.offsetHeight}px`;
      }
    } else {
      categoriesBlock.style.height = '';
      categoriesBlock.classList.remove('active');
      isExpanded = false;
    }
  }

  function toggleBlock() {
    if (window.innerWidth <= 768) {
      if (isExpanded) {
        categoriesBlock.style.height = `${toggleButton.offsetHeight}px`;
        categoriesBlock.classList.remove('active');
      } else {
        categoriesBlock.style.height = `${toggleButton.offsetHeight + contentBlock.scrollHeight}px`;
        categoriesBlock.classList.add('active');
      }
      isExpanded = !isExpanded;
    }
  }

  toggleButton.addEventListener('click', toggleBlock);

  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      setInitialHeight();
    } else if (isExpanded) {
      categoriesBlock.style.height = `${toggleButton.offsetHeight + contentBlock.scrollHeight}px`;
    } else {
      setInitialHeight();
    }
  });

  setInitialHeight();
});


document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll(".authorization__content-form");

  const invalidSvg = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.4" d="M3.5 12C3.5 16.9699 7.52908 21 12.5 21C17.4709 21 21.5 16.9699 21.5 12C21.5 7.02908 17.4709 3 12.5 3C7.52908 3 3.5 7.02908 3.5 12Z" stroke="#FF0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M12.5057 15.6932V11.3936M12.5 8.35426V8.29102" stroke="#FF0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`;

  const validateInput = (input, type) => {
    const value = input.value.trim();

    switch (type) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      case "password":
        return value.length >= 6;
      case "phone":
        const phoneRegex = /^\+7\d{10}$/;
        return phoneRegex.test(value);
      case "name":
        return value.length > 1 && /^[A-Za-zА-Яа-яЁё\s'-]+$/.test(value);
      default:
        return false;
    }
  };

  const createErrorMessage = (input, message) => {
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains("error-message")) {
      errorElement = document.createElement("div");
      errorElement.classList.add("error-message");
      input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    errorElement.textContent = message;
  };

  const removeErrorMessage = (input) => {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains("error-message")) {
      errorElement.remove();
    }
  };

  const setError = (input, message) => {
    input.style.border = "1px solid rgba(255, 0, 0, 0.8)";
    input.style.color = "red";
    createErrorMessage(input, message);
    if (input.type === "password") {
      const passwordShowButton = input.parentNode.querySelector(".password-show");
      if (passwordShowButton) passwordShowButton.innerHTML = invalidSvg;
    }
  };

  const clearError = (input) => {
    input.style.border = "";
    input.style.color = "";
    removeErrorMessage(input);
    if (input.type === "password") {
      const passwordShowButton = input.parentNode.querySelector(".password-show");
      if (passwordShowButton) passwordShowButton.innerHTML = passwordShowButton.dataset.defaultSvg;
    }
  };

  const handlePhoneInput = (input) => {
    if (!input.value.startsWith("+7")) {
      input.value = "+7";
    } else {
      input.value = input.value.replace(/[^\d+]/g, "").substring(0, 12);
    }
  };

  const handleNameInput = (input) => {
    input.value = input.value.replace(/\d/g, "");
  };

  forms.forEach((form) => {
    const emailInput = form.querySelector(".authorization-email");
    const passwordInput = form.querySelector(".authorization-password");
    const passwordInputRepeat = form.querySelector(".authorization-password-repeat");
    const passwordShowButton = form.querySelector(".password-show");
    const passwordShowButtonRepeat = document.getElementById("password-show-repeat");
    const phoneInput = form.querySelector(".authorization-phone");
    const nameInput = form.querySelector(".authorization-name");

    if (passwordShowButton) {
      passwordShowButton.dataset.defaultSvg = passwordShowButton.innerHTML;
      passwordShowButton.addEventListener("click", () => {
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
      });
    }

    if (passwordShowButtonRepeat) {
      passwordShowButtonRepeat.dataset.defaultSvg = passwordShowButtonRepeat.innerHTML;
      passwordShowButtonRepeat.addEventListener("click", () => {
        passwordInputRepeat.type = passwordInputRepeat.type === "password" ? "text" : "password";
      });
    }

    if (phoneInput) {
      phoneInput.addEventListener("input", () => handlePhoneInput(phoneInput));
    }

    if (nameInput) {
      nameInput.addEventListener("input", () => handleNameInput(nameInput));
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      let isValid = true;

      if (emailInput && !validateInput(emailInput, "email")) {
        setError(emailInput, "Некорректный email");
        isValid = false;
      } else if (emailInput) {
        clearError(emailInput);
      }

      if (passwordInput && !validateInput(passwordInput, "password")) {
        setError(passwordInput, "Некорректный пароль");
        isValid = false;
      } else if (passwordInput) {
        clearError(passwordInput);
      }

      if (passwordInputRepeat && !validateInput(passwordInputRepeat, "password")) {
        setError(passwordInputRepeat, "Некорректный пароль");
        isValid = false;
      } else if (passwordInputRepeat) {
        clearError(passwordInputRepeat);
      }

      if (phoneInput && !validateInput(phoneInput, "phone")) {
        setError(phoneInput, "Некорректный номер телефона. Формат: +7XXXXXXXXXX");
        isValid = false;
      } else if (phoneInput) {
        clearError(phoneInput);
      }

      if (nameInput && !validateInput(nameInput, "name")) {
        setError(nameInput, "Имя должно содержать только буквы и быть не короче двух символов");
        isValid = false;
      } else if (nameInput) {
        clearError(nameInput);
      }

      if (isValid) {
        form.submit();
      }
    });

    if (emailInput) {
      emailInput.addEventListener("input", () => {
        if (validateInput(emailInput, "email")) {
          clearError(emailInput);
        } else {
          setError(emailInput, "Некорректный email");
        }
      });
    }

    if (passwordInput) {
      passwordInput.addEventListener("input", () => clearError(passwordInput));
    }

    if (passwordInputRepeat) {
      passwordInputRepeat.addEventListener("input", () => clearError(passwordInput));
    }

    if (phoneInput) {
      phoneInput.addEventListener("input", () => {
        handlePhoneInput(phoneInput);
        if (validateInput(phoneInput, "phone")) {
          clearError(phoneInput);
        } else {
          setError(phoneInput, "Некорректный номер телефона. Формат: +7XXXXXXXXXX");
        }
      });
    }

    if (nameInput) {
      nameInput.addEventListener("input", () => {
        handleNameInput(nameInput);
        if (validateInput(nameInput, "name")) {
          clearError(nameInput);
        } else {
          setError(nameInput, "Имя должно содержать только буквы и быть не короче двух символов");
        }
      });
    }
  });
});
