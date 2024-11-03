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
  const searchInput = document.getElementById("pop-up-search-input"); // Поле поиска
  const searchContentPages = document.querySelector(".pop-up-search__content-pages");
  const cleanButton = document.getElementById("pop-up-search-clean-btn"); // Кнопка очистки

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

document.addEventListener("DOMContentLoaded", function () {
  const coursesBlock = document.getElementById("header-courses-block");
  const coursesButton = document.getElementById("header-courses-open");
  const coursesMenu = document.getElementById("courses-menu");

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


/* Листание листов с пагинацией */

document.addEventListener('DOMContentLoaded', function () {
  // Константы
  let totalPages = document.querySelectorAll('[id^="page-"]').length; // Подсчитываем количество страниц
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


/* Страница поиска */

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


/* Страница продукта переключение изоражений */

document.addEventListener('DOMContentLoaded', function () {
  const mainImage = document.querySelector(".productPage-hero__content-images__img img");
  const buttons = document.querySelectorAll(".productPage-hero__content-images__btns button");

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
  const questionsCount = document.querySelectorAll('.pageTest-test__content-questions__question').length;

  const prevButtons = document.querySelectorAll('.prev-button');
  const nextButtons = document.querySelectorAll('.next-button');
  const finishButton = document.querySelector('.finish-button');
  const restartButton = document.querySelector('.restart-button');

  function renderSteps() {
      const stepsContainer = document.getElementById('pageTest-steps');
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
          button.classList.toggle('current', index === currentQuestionIndex); // Добавляем класс current
      });
  }

  function updateQuestionVisibility() {
      const questions = document.querySelectorAll('.pageTest-test__content-questions__question');
      questions.forEach((question, index) => {
          question.classList.toggle('active', index === currentQuestionIndex);
          question.classList.toggle('fade-out', index !== currentQuestionIndex);
      });

      updateQuestionCount();
      updateContainerHeight();
      markCompleted();
      updateStepButtons(); // Обновляем состояние кнопок шагов
  }

  function updateContainerHeight() {
      const activeQuestion = document.querySelector('.pageTest-test__content-questions__question.active');
      const resultBlock = document.getElementById('result');
      const container = document.getElementById('question-container');
      container.style.height = activeQuestion ? `${activeQuestion.offsetHeight}px` : `${resultBlock.offsetHeight}px`;
  }

  function updateQuestionCount() {
      const questionCountElement = document.querySelector('.pageTest-test__content-questions__question.active .question-count');
      questionCountElement.textContent = `Вопрос ${currentQuestionIndex + 1} из ${questionsCount}`;
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
      const questions = document.querySelectorAll('.pageTest-test__content-questions__question');
      questions.forEach(q => q.classList.remove('active'));
      document.getElementById('result').style.display = 'block';
      updateContainerHeight();
  }

  function restartTest() {
      currentQuestionIndex = 0;
      updateStepButtons();
      updateQuestionVisibility();
      document.getElementById('result').style.display = 'none';

      const questions = document.querySelectorAll('.pageTest-test__content-questions__question');
      questions.forEach(q => {
          const radios = q.querySelectorAll('input[type="radio"]');
          radios.forEach(radio => {
              radio.checked = false;
          });
      });

      document.querySelectorAll('.step-button').forEach(button => button.classList.remove('completed'));

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

  prevButtons.forEach(button => button.onclick = prevQuestion);
  nextButtons.forEach(button => {
      button.onclick = () => {
          if (currentQuestionIndex === questionsCount - 1) {
              showResult();
          } else {
              nextQuestion();
          }
      };
  });

  finishButton.onclick = showResult;
  restartButton.onclick = restartTest;

  renderSteps();
  updateQuestionVisibility();
  updateContainerHeight();
});



/* Карта таро */

document.addEventListener('DOMContentLoaded', () => {
  const cardCount = 15;
  const cardsContainer = document.getElementById('cards');
  let cards = [];

  const cardLinks = [
      "https://example.com/card1", "https://example.com/card2", "https://example.com/card3",
      "https://example.com/card4", "https://example.com/card5", "https://example.com/card6",
      "https://example.com/card7", "https://example.com/card8", "https://example.com/card9",
      "https://example.com/card10", "https://example.com/card11", "https://example.com/card12",
      "https://example.com/card13", "https://example.com/card14", "https://example.com/card15"
  ];

  function createCards() {
      for (let i = 0; i < cardCount; i++) {
          const card = document.createElement('div');
          card.classList.add('card');
          card.dataset.index = i;
          card.dataset.link = cardLinks[i];
          card.style.zIndex = cardCount - i;
          card.style.opacity = 1 - i * 0.06;

          const offset = (i % 2 === 0 ? -1 : 1) * Math.floor((i + 1) / 2) * 40;
          card.style.transform = `translateX(${offset}px) translateZ(-${i * 15}px)`;

          cards.push(card);
          cardsContainer.appendChild(card);
      }
      updateCentralCardLink();
  }

  function bringToFront(index) {
      const selectedCard = cards.splice(index, 1)[0];
      cards.unshift(selectedCard);
      updateCards();
  }

  function updateCards() {
      cards.forEach((card, i) => {
          card.style.zIndex = cardCount - i;
          card.style.opacity = 1 - i * 0.06;

          const offset = (i % 2 === 0 ? -1 : 1) * Math.floor((i + 1) / 2) * 40;
          card.style.transform = `translateX(${offset}px) translateZ(-${i * 15}px)`;
      });
      updateCentralCardLink();
  }

  function updateCentralCardLink() {
      cards.forEach(card => card.style.pointerEvents = 'none');
      const frontCard = cards[0];
      frontCard.style.pointerEvents = 'auto';
      frontCard.onclick = () => window.open(frontCard.dataset.link, "_blank");
  }

  function shuffleAndPick() {
      cards.sort(() => Math.random() - 0.5);
      const randomIndex = Math.floor(Math.random() * cards.length);
      bringToFront(randomIndex);
  }

  function setupSwipe() {
      let startX = 0;
      let endX = 0;

      cardsContainer.addEventListener('mousedown', (e) => startX = e.clientX);
      cardsContainer.addEventListener('mouseup', (e) => {
          endX = e.clientX;
          handleSwipe();
      });

      cardsContainer.addEventListener('touchstart', (e) => startX = e.touches[0].clientX);
      cardsContainer.addEventListener('touchend', (e) => {
          endX = e.changedTouches[0].clientX;
          handleSwipe();
      });

      function handleSwipe() {
          if (startX - endX > 50) {
              bringToFront(1); // Свайп влево: следующая карта на передний план
          } else if (endX - startX > 50) {
              bringToFront(cards.length - 1); // Свайп вправо: последняя карта вперед
          }
      }
  }

  createCards();
  setupSwipe();
  document.getElementById('shuffleBtn').addEventListener('click', shuffleAndPick);
});


/* Карта таро - перемещение изображения при листании */

document.addEventListener("scroll", function () {
  // Выбираем элементы
  const imgContainer = document.getElementById('pageCardDay-hero__content-img');
  const heroContent = document.getElementById('pageCardDay-hero__content');

  // Проверяем, существуют ли оба элемента на странице
  if (imgContainer && heroContent) {
    // Получаем начальное значение top из CSS
    const computedStyle = window.getComputedStyle(imgContainer);
    const initialTop = parseInt(computedStyle.top, 10); // Преобразуем значение top в число

    // Функция для управления положением изображения
    function handleScroll() {
      if (window.innerWidth >= 1024) { // Условие для экранов шириной 1024px и больше
        const heroContentRect = heroContent.getBoundingClientRect();
        const imgContainerHeight = imgContainer.clientHeight;

        // Проверяем, если блок находится в зоне фиксации
        if (heroContentRect.top <= initialTop && heroContentRect.bottom > imgContainerHeight + initialTop) {
          imgContainer.classList.add('fixed'); // Добавляем класс фиксации
        }
        // Если блок выходит из зоны фиксации (прокручиваем вверх)
        else {
          imgContainer.classList.remove('fixed'); // Убираем класс фиксации
        }
      } else {
        imgContainer.classList.remove('fixed'); // Убираем класс для экранов меньше 1024px
      }
    }

    // Добавляем обработчик событий
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // Перепроверка при изменении размера окна
  }
});

/* Карта таро - листание блока */

document.addEventListener("DOMContentLoaded", function () {
  const cardList = document.querySelector(".pageCardDay-hero__content-scroll__list");
  const cards = document.querySelectorAll(".product-card");
  const btnPrev = document.getElementById("pageCardDay-btn-prev");
  const btnNext = document.getElementById("pageCardDay-btn-next");

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
  const contentBlock = categoriesBlock.querySelector('.blogs-hero__content-left__block-choice');
  let isExpanded = false;

  function setInitialHeight() {
    if (window.innerWidth <= 768) {
      categoriesBlock.style.height = `${toggleButton.offsetHeight}px`;
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

  window.addEventListener('resize', setInitialHeight);
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
  const contentBlock = categoriesBlock.querySelector('.courses-hero__content-left__block-choice');
  let isExpanded = false;

  function setInitialHeight() {
    if (window.innerWidth <= 768) {
      categoriesBlock.style.height = `${toggleButton.offsetHeight}px`;
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

  window.addEventListener('resize', setInitialHeight);
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
  const contentBlock = categoriesBlock.querySelector('.shops-hero__content-left__block');
  let isExpanded = false;

  function setInitialHeight() {
    if (window.innerWidth <= 768) {
      categoriesBlock.style.height = `${toggleButton.offsetHeight}px`;
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

  window.addEventListener('resize', setInitialHeight);
  setInitialHeight();
});

























