import { useLocalization } from './LocalizationContext.jsx';

// ====== HEADER TRANSLATIONS ======
const headerText = [
    ["About Us", "Authors", "Sponsors", "Support", "Contacts"], 
    ["О нас", "Авторы", "Спонсоры", "Поддержка", "Контакты" ], 
    ["Біз туралы", "Авторлар", "Спонсордар", "Көмектеседі", "Байланыс"]
];

// ====== MAIN WEBSITE TEXT CONTENT ======
const textContent = [
    [ // Eng
        "DANA Smart City - Greenhouse",
        "Here you can watch growing plants in DIY greenhouse system  in DANA High School!",
        "Environment Parameters",
        "Information about us",
        "What is this?",
        "This is an automatic greenhouse model for the ",
        "You can observe the growing plants in our greenhouse in real time and also get the actual internal environment parameters.",
        "How it works?",
        "In a greenhouse, plants are planted. We monitor them thanks to a camera and a Databot™ sensor, which give us up-to-date information about the state of the greenhouse. The data is displayed on the website and saved in separate reports, which helps in conducting various experiments and experiences.",
        "What is our purpose?",
        "We want to create a fully-functional smart greenhouse model for conducting a variety of experiments and research, and also to provide an easy and interesting platform for getting young people interested in science.",
        "Authors",
        "Our Sponsors",
        "Dana School, a private school, nurtures students' talents and recognizes the spark within each student. Dana's goal is to instill the value of learning in every student and prepare them for society's future leaders.",
        "Databot™ is presented as a versatile wireless scientific instrument and laboratory designed for studying data, artificial intelligence, and programming within STEM education.",
        "Support Us",
        //"Having donated, you support our project and help us to bring the most thrilling ideas to life. Also,
        "You can suggest your idea or leave a report in our Telegram Bot. We're looking forward to your feedback!",
        "Contacts",
    ],
    [ // Rus
        "DANA Smart City - Теплица",
        "Здесь вы можете посмотреть за ростом растений в самодельной системе теплицы в DANA High School!",
        "Параметры среды",
        "Информация о нас",
        "Что это такое?",
        "Мы создали автоматическую теплицу, что является частью нашего общего проекта ",
        "На этом сайте вы можете наблюдать за растущими растениями в реальном времени и получать актуальные параметры внутренней среды.",
        "Как это работает?",
        "В теплице посажены растения. Мы следим за ними благодаря камере и датчику Databot™, которые дают нам актуальную информацию о состоянии теплицы. Данные выводятся на сайт и сохраняются в отдельных отчетах, что помогает проводить различные эксперименты и опыты.",
        "Какова наша цель?",
        "Мы стремимся создать полнофункциональную умную модель теплицы для проведения разнообразных экспериментов и исследований, а также предоставить легкую и интересную платформу для увлечения молодежи наукой",
        "Авторы",
        "Наши спонсоры",
        "Частная школа Dana School развивает таланты учащихся и распознает искру в каждом из них. Цель Dana — привить каждому ученику ценность обучения и подготовить их к роли будущих лидеров общества",
        "Databot™ представлен как универсальный беспроводной научный инструмент и лаборатория, предназначенный для изучения данных, искусственного интеллекта и программирования в рамках STEM-образования",
        "Поддержать Нас",
        //"Отправив деньги, вы поддерживаете наш проекти помогаете нам воплотить самые захватывающие идеи в жизнь. К тому же,
        "Вы можете предложить вашу идею или оставить отзыв в нашем Telegram боте. Мы очень ценим вашу обратную связь!",
        "Контакты",
    ],
    [
        "DANA Smart City - Жылыжай",
        "Мұнда сіз DANA High School-дағы қолдан жасалған жылыжай жүйесінде өсімдіктердің өсуін бақылай аласыз!",
        "Қоршаған орта параметрлері",
        "Біз туралы ақпарат",
        "Бұл не?",
        "Біз жалпы жобамыздың бір бөлігі болып табылатын автоматтандырылған жылыжай жасадық ",
        "Осы сайттан сіз өсімдіктерді нақты уақытта бақылап, ішкі орта жайлы өзекті ақпарат ала аласыз.",
        "Бұл қалай жұмыс істейді?",
        "Жылыжайға өсімдіктер отырғызылған. Біз оларды камера мен Databot™ датчигінің көмегімен бақылаймыз, бұл бізге жылыжайдың жай-күйі туралы нақты ақпарат береді. Мәліметтер сайтта көрсетіліп, бөлек есептерде сақталады, бұл түрлі тәжірибелер мен зерттеулер жүргізуге көмектеседі.",
        "Біздің мақсатымыз қандай?",
        "Біз түрлі тәжірибелер мен зерттеулер жүргізуге арналған толыққанды ақылды жылыжай үлгісін жасауды, сондай-ақ жастарды ғылымға қызықты және қолжетімді түрде тартуды мақсат етеміз",
        "Авторлар",
        "Біздің демеушілер",
        "Dana School жеке мектебі оқушылардың таланттарын дамытып, әрқайсысындағы ұшқынды ашады. Dana-ның мақсаты — әр оқушыға білім алудың құндылығын сіңіріп, оларды қоғамның болашақ көшбасшысы ретінде тәрбиелеу",
        "Databot™ — STEM-білім беру аясында деректерді зерттеу, жасанды интеллект және бағдарламалауды үйренуге арналған әмбебап сымсыз ғылыми құрал және зертхана ретінде таныстырылады",
        "Көмектеседі",
        //"Ақша аудару арқылы сіз біздің жобаны қолдап, ең қызықты идеяларды жүзеге асыруға көмектесесіз. Сонымен қатар, 
        "Өз идеяңызды ұсынуға немесе пікір қалдыруға біздің Telegram боты арқылы мүмкіндік бар. Біз сіздің кері байланысты жоғары бағалаймыз!",
        "Байланыс"
    ]
];

// ====== PARTICIPANTS ======

const participantsDataEng = [
    { type: "spacer"},
    { name: 'Schelakov Vladimyr',   role: 'Project Author, Sponsor' },
    { name: 'Kassenova Aynash',     role: 'Project Manager'         },
    { name: 'Pastak Olga',          role: 'Biologist, Mentor'       },
    { name: 'Abdrakhmanova Dinara', role: 'Physist, Mentor'         },
    { name: 'Shirbekov Yusuf',      role: 'Engineer'                },
    { name: 'Volkov Arseniy',       role: 'Engineer-constructor'    },
    { name: 'Kim Danil',            role: 'Support'                 },
    { name: 'Kopityn Yaroslav',     role: 'Lead Engineer'           },
    { name: 'Metsler Albert',       role: 'Lead Developer'          },
    { name: 'Skopa Vyacheslav',     role: 'Developer'               },
    { name: 'Pudel Roman',          role: 'Engineer, Developer'     },
    { name: 'Chernov Rustam',       role: 'Developer'               },
    { name: 'Dorofeyev Maksim',     role: 'Developer'               },    
    { name: 'Sembin Amir',          role: 'Biologist'               },
    { name: 'Tabayev Aljan',        role: 'Biologist'               },
    { type: "spacer"},
];
const participantsDataRus = [
    { type: "spacer"},
    { name: 'Щелаков Владимир',     role: 'Автор Проекта, Спонсор'  },
    { name: 'Кассенова Айнаш',      role: 'Проджект-менеджер'       },
    { name: 'Пастак Ольга',         role: 'Биолог, Ментор'          },
    { name: 'Абдрахманова Динара',  role: 'Физик, Ментор'           },
    { name: 'Ширбеков Юсуф',        role: 'Инженер'                 },
    { name: 'Волков Арсений',       role: 'Инженер-конструктор'     },
    { name: 'Ким Данил',            role: 'Помощник'                },
    { name: 'Копытин Ярослав',      role: 'Главный Инженер'         },
    { name: 'Мецлер Альберт',       role: 'Главный Разработчик'     },
    { name: 'Скопа Вячеслав',       role: 'Разработчик'             },
    { name: 'Пудель Роман',         role: 'Инженер, Разработчик'    },
    { name: 'Чернов Рустам',        role: 'Разработчик'             },
    { name: 'Дорофеев Максим',      role: 'Разработчик'             },
    { name: 'Сембин Амир',          role: 'Биолог'                  },
    { name: 'Табаев Альжан',        role: 'Биолог'                  },
    { type: "spacer"},
];
const participantsDataKaz = [
    { type: "spacer" },
    { name: 'Щелаков Владимир',     role: 'Жоба авторы, Демеуші'    },
    { name: 'Кассенова Айнаш',      role: 'Жоба Менеджерi'          },
    { name: 'Пастак Ольга',         role: 'Биолог, Ментор'          },
    { name: 'Абдрахманова Динара',  role: 'Физик, Ментор'           },
    { name: 'Ширбеков Юсуф',        role: 'Инженер'                 },
    { name: 'Волков Арсений',       role: 'Инженер-кұрастырушы'     },
    { name: 'Ким Данил',            role: 'Көмекші'                 },
    { name: 'Копытин Ярослав',      role: 'Бас Инженер'             },
    { name: 'Мецлер Альберт',       role: 'Бас Әзірлеуші'           },
    { name: 'Скопа Вячеслав',       role: 'Әзірлеуші'               },
    { name: 'Пудель Роман',         role: 'Инженер, Әзірлеуші'      },
    { name: 'Чернов Рустам',        role: 'Әзірлеуші'               },
    { name: 'Дорофеев Максим',      role: 'Әзірлеуші'               },
    { name: 'Сембин Амир',          role: 'Биолог'                  },
    { name: 'Табаев Альжан',        role: 'Биолог'                  },
    { type: "spacer" },
];

const participantsImg = [
    "Vd.png",
    'KA.jpeg',
    'PO.png',
    'AD.png',
    'SY.png',
    'VA.png',
    'KD.png',
    'KY.png',
    'MA.png',
    'SV.png',
    'PR.png',
    'CR.png',
    'DM.png',
    'SA.png',
    'TA.png',
]

const participantsData = [
    participantsDataEng,
    participantsDataRus,
    participantsDataKaz
];

// ====== LOCALIZATION FUNCTIONS ======

function get_local_id(){
    const { local } = useLocalization();
    let x = 0;

    if(local === "Eng"){ x = 0; }
    else if (local === "Rus") { x = 1; }
    else { x = 2; }

    return(x);
}
  
export { headerText, textContent, participantsData, participantsImg, get_local_id };  
