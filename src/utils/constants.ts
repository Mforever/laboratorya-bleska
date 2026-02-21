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

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    category: 'polish',
    title: 'BMW X5',
    beforeAfter: 'До/После',
    image: '/images/gallery/bmw-polish.jpg',
    carModel: 'BMW X5'
  },
  {
    id: 2,
    category: 'polish',
    title: 'Mercedes E-Class',
    beforeAfter: 'До/После',
    image: '/images/gallery/mercedes-polish.jpg',
    carModel: 'Mercedes E-Class'
  },
  {
    id: 3,
    category: 'ceramic',
    title: 'Audi Q7',
    beforeAfter: 'После',
    image: '/images/gallery/audi-ceramic.jpg',
    carModel: 'Audi Q7'
  },
  {
    id: 4,
    category: 'ceramic',
    title: 'Lexus LX',
    beforeAfter: 'После',
    image: '/images/gallery/lexus-ceramic.jpg',
    carModel: 'Lexus LX'
  },
  {
    id: 5,
    category: 'ppf',
    title: 'Porsche Cayenne',
    beforeAfter: 'До/После',
    image: '/images/gallery/porsche-ppf.jpg',
    carModel: 'Porsche Cayenne'
  },
  {
    id: 6,
    category: 'ppf',
    title: 'Range Rover',
    beforeAfter: 'До/После',
    image: '/images/gallery/rang rover-ppf.jpg',
    carModel: 'Range Rover'
  },
  {
    id: 7,
    category: 'polish',
    title: 'Toyota Camry',
    beforeAfter: 'До/После',
    image: '/images/gallery/toyota-polish.jpg',
    carModel: 'Toyota Camry'
  },
  {
    id: 8,
    category: 'ceramic',
    title: 'Kia K5',
    beforeAfter: 'После',
    image: '/images/gallery/kia-ceramic.jpg',
    carModel: 'Kia K5'
  },
  {
    id: 9,
    category: 'ppf',
    title: 'Tesla Model 3',
    beforeAfter: 'До/После',
    image: '/images/gallery/tesla-ppf.jpg',
    carModel: 'Tesla Model 3'
  }
];