// src/utils/constants.ts
import { Advantage, GalleryItem, Review, FAQItem, CarZone } from '../types';

export const ADVANTAGES: Advantage[] = [
  {
    icon: 'medal',
    title: 'Опыт 10 лет',
    description: 'Более 10 лет успешной работы в детейлинге'
  },
  {
    icon: 'users',
    title: '5 профессионалов',
    description: 'Команда сертифицированных специалистов'
  },
  {
    icon: 'car',
    title: '300+ клиентов',
    description: 'Довольных клиентов ежегодно'
  },
  {
    icon: 'flask',
    title: 'Премиум материалы',
    description: 'Только профессиональная химия и оборудование'
  }
];

export const SERVICES = [
  {
    id: 'polish',
    title: 'Полировка кузова',
    description: 'Восстановление лакокрасочного покрытия, удаление царапин и голограмм',
    price: 5000,
    image: '/images/services/polish.jpg',
    link: '/polish'
  },
  {
    id: 'ceramic',
    title: 'Керамическое покрытие',
    description: 'Надежная защита кузова на срок до 3 лет',
    price: 15000,
    image: '/images/services/ceramic.jpg',
    link: '/ceramic'
  },
  {
    id: 'ppf',
    title: 'Бронирование пленкой',
    description: 'Защита кузова от сколов, царапин и реагентов',
    price: 10000,
    image: '/images/services/ppf.jpg',
    link: '/ppf'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Александр Петров',
    photo: '/images/reviews/review1.jpg',
    text: 'Отличная работа! Сделали полировку моему BMW X5. Машина блестит как новая. Очень доволен результатом!',
    carModel: 'BMW X5',
    rating: 5
  },
  {
    id: 2,
    name: 'Дмитрий Иванов',
    photo: '/images/reviews/review2.jpg',
    text: 'Наносил керамическое покрытие на Mercedes. Ребята профессионалы своего дела. Держится отлично уже полгода.',
    carModel: 'Mercedes E-Class',
    rating: 5
  },
  {
    id: 3,
    name: 'Сергей Смирнов',
    photo: '/images/reviews/review3.jpg',
    text: 'Забронировал переднюю часть авто пленкой. Качество отличное, пленка незаметна, но защищает хорошо.',
    carModel: 'Audi Q7',
    rating: 5
  }
];

export const PROCESS_STEPS = [
  'Заявка',
  'Осмотр авто',
  'Согласование',
  'Выполнение работ',
  'Выдача авто'
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Как долго держится покрытие?',
    answer: 'Срок службы покрытия зависит от типа услуги: полировка держится 6-12 месяцев, керамика до 3 лет, бронирование пленкой до 5-7 лет.'
  },
  {
    question: 'Нужно ли записываться заранее?',
    answer: 'Да, мы работаем строго по предварительной записи. Это позволяет нам уделить максимум времени каждому автомобилю.'
  },
  {
    question: 'Как подготовить авто к детейлингу?',
    answer: 'Достаточно пригнать чистый автомобиль. Все остальные работы (мойка, обезжиривание) мы выполняем сами.'
  },
  {
    question: 'Есть ли гарантия на работы?',
    answer: 'Да, мы даем гарантию на все виды работ. Срок гарантии зависит от типа услуги и обсуждается индивидуально.'
  },
  {
    question: 'Можно ли оплатить картой?',
    answer: 'Да, мы принимаем наличные и безналичный расчет. Для юридических лиц предоставляем все закрывающие документы.'
  }
];

export const CAR_ZONES: CarZone[] = [
  { id: 'hood', name: 'Капот', price: 5000 },
  { id: 'bumper_front', name: 'Передний бампер', price: 7000 },
  { id: 'bumper_rear', name: 'Задний бампер', price: 7000 },
  { id: 'fenders', name: 'Крылья (пара)', price: 8000 },
  { id: 'doors', name: 'Двери (комплект)', price: 15000 },
  { id: 'mirrors', name: 'Зеркала', price: 3000 },
  { id: 'headlights', name: 'Фары', price: 4000 },
  { id: 'roof', name: 'Крыша', price: 6000 },
  { id: 'trunk', name: 'Багажник', price: 5000 }
];

// Обновленный массив галереи с новыми типами
export const GALLERY_ITEMS: GalleryItem[] = [
  // Полировка BMW
  {
    id: 1,
    title: 'Глубокая полировка',
    carModel: 'BMW X5 (2022)',
    mediaType: 'image',
    beforeImage: '/images/gallery/bmw-x5-before.jpg',
    afterImage: '/images/gallery/bmw-x5-after.jpg',
    description: 'Полное восстановление ЛКП, удаление голограмм и царапин'
  },
  {
    id: 2,
    title: 'Керамическое покрытие',
    carModel: 'Porsche Cayenne',
    mediaType: 'image',
    beforeImage: '/images/gallery/porsche-before.jpg',
    afterImage: '/images/gallery/porsche-after.jpg',
    description: 'Нанесение керамики премиум-класса, гидрофобный эффект'
  },
  {
    id: 3,
    title: 'Процесс бронирования пленкой',
    carModel: 'Tesla Model 3',
    mediaType: 'video',
    videoPlatform: 'vk',
    videoUrl: 'https://vk.com/video_ext.php?oid=-99576867&id=456239018&hd=2&autoplay=1',
    videoThumbnail: '/images/gallery/tesla-ppf-preview.jpg',
    description: 'Пошаговый процесс оклейки защитной пленкой'
  },
  {
    id: 4,
    title: 'Восстановление после зимы',
    carModel: 'Mercedes E-Class',
    mediaType: 'image',
    beforeImage: '/images/gallery/mercedes-before.jpg',
    afterImage: '/images/gallery/mercedes-after.jpg',
    description: 'Удаление зимних дефектов, защитная полировка'
  },
  {
    id: 5,
    title: 'Керамическое покрытие',
    carModel: 'Lexus LX 600',
    mediaType: 'video',
    videoPlatform: 'rutube',
    videoUrl: 'https://rutube.ru/play/embed/9e4cd81a6b2566e9d949881dbb53905e/',
    videoThumbnail: '/images/gallery/lexus-ceramic-preview.jpg',
    description: 'Двухслойное керамическое покрытие, защита на 3 года'
  },
  {
    id: 6,
    title: 'Полная оклейка пленкой',
    carModel: 'BMW X7',
    mediaType: 'image',
    beforeImage: '/images/gallery/bmw-x7-before.jpg',
    afterImage: '/images/gallery/bmw-x7-after.jpg',
    description: 'Бронирование всего кузова премиальной пленкой'
  }
];