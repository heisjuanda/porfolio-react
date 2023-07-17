//0
//import patitasACasa from './assets/images/projects/patitasACasa.webp';
import patatiasACasaLogo from './assets/images/projects/patitasACasaLogo.webp';
import patitasACasaMain from './assets/images/projects/patitasACasaMain.webp';
import patitasACasaDemo from './assets/images/projects/patitasACasaDemo.webp';
import patitasACasaDetailsPC from './assets/images/projects/patitasACasaDetailsPC.webp';
import patitasACasaDetailsMB from './assets/images/projects/patitasACasaDetailsMB.webp';
//1
import programLanguageLogo from './assets/images/projects/programLanguageLogo.webp';
import programLanguageMain from './assets/images/projects/programLanguageMain.webp';
import programLanguageDemo from './assets/images/projects/programLanguageDemo.webp';
import programLanguageDetailsPC from './assets/images/projects/programLanguageDetailsPC.webp';
import programLanguageDetailsMB from './assets/images/projects/programLanguageDetailsMB.webp';
//2
import portfolioLogo from './assets/images/projects/heisjuandaLogo.webp';
import portfolioMain from './assets/images/projects/portfolioMain.webp';
import portfolioDemo from './assets/images/projects/portfolioDemo.webp';
import portfolioDetailsPC from './assets/images/projects/portfolioDetailsPC.webp';
import portfolioDetailsMB from './assets/images/projects/portfolioDetailsMB.webp';

export const PROJECTS = [
    {
        id: '1',
        title: 'Patitas a Casa ',
        images: [
            patitasACasaMain,
            patatiasACasaLogo,
        ],
        description: `
        Through Patitas a Casa, users can easily navigate a world of wagging tails and whiskered wonders, 
        discovering profiles of pets in need of a caring home. Our app showcases comprehensive information about each pet,
        including their breed, age, personality traits, and heartwarming stories, enabling potential adopters to make well-informed decisions.
        `,
        intro: `
        "Patitas a Casa" is a professional and user-friendly website dedicated to the reporting and recovery of missing pets. Help us reunite lost dogs with their loving owners.
        `,
        about: {
            objetive: [
                `Allow people to identify and interact with pets in need of a loving home by giving detailed profiles and pertinent information about each animal, advocating adoption as a feasible choice.`,
                `Create a platform for pet owners to report their missing pets, allowing others in the community to help with the search by offering sightings, pertinent information, and promoting teamwork for a quick reunion.`,
                `Provide useful information and instructional materials to pet owners and potential adopters, encouraging responsible pet ownership, correct care standards, and best practices for maintaining pets' well-being and happiness.`,
                `Form alliances with local animal shelters, rescue groups, and veterinary clinics to ease the adoption process, share information, and coordinate efforts to enhance the application's reach and effect.`,
            ],
            goal: [
                `Aim to assist a considerable number of successful pet adoptions via the platform, with a goal of a specified number of pets finding loving homes within a specific timeframe.`,
                `Strive to reconnect lost pets with their owners by aggressively promoting and supporting successful reunifications, with a goal of successfully reuniting a particular percentage of reported lost pets within a set timeframe.`,
                `Based on user input, continuously improve the application's features and functioning, with the goal of implementing a specified number of changes or updates within certain development cycles. `,
                `Work on expanding the application's reach to other areas or cities, with the goal of releasing in a particular number of new places within a given timeframe. `,
            ],
            tech: [
                `aos V 2.3.4`,
                `axios V 1.4.0`,
                `react V 18.2.0`,
                `react-slick V 0.29.0`,
                `typescript V 5.0.2`,
                `vite V 4.3.2`,
            ],
        },
        demo: patitasACasaDemo,
        detailsImg: [
            patitasACasaDetailsPC,
            patitasACasaDetailsMB
        ],
        date: '2023',
    },
    {
        id: '2',
        title: 'Program Language ',
        images: [
            programLanguageMain,
            programLanguageLogo,

        ],
        description: `
        The new program language, called "Fundamentals of Programming Languages" (FPL), is a functional programming language that is designed to help users understand how program languages work. 
        FPL is based on the lambda calculus, a formal system of computation that is used to study the semantics of programming languages. 
        FPL provides a number of features that make it well-suited for understanding program languages
        `,
        intro: `
        Set off on a journey of exploration with "FPL", learning about the inner workings of programming languages.
        `,
        about: {
            objetive: [
                `Make a user-friendly functional programming language, making it an effective tool for investigating the principles and concepts underpinning diverse programming paradigms.`,
                `Integrate essential lambda calculus principles into FPL's core, allowing learners to understand the foundations of computing and their relevance in programming language semantics.`,
            ],
            goal: [
                `Implement essential language features like as higher-order functions, closures, pattern matching, and recursion in FPL, ensuring that they are appropriately integrated and work as expected.`,
                `Create a sustainable strategy to assure long-term upkeep, allowing it to remain a vital resource for learners all across the world.`
            ],
            tech: [
                `racket - scheme V 8.6`,
                `eopl V 8.6`,
                `sllgen V 1.0`
            ],
        },
        demo: programLanguageDemo,
        detailsImg: [
            programLanguageDetailsPC,
            programLanguageDetailsMB
        ],
        date: '2022',
    },
    {
        id: '3',
        title: 'Personal Portfolio ',
        images: [
            portfolioMain,
            portfolioLogo,
        ],
        description: `
        Welcome to my personal portfolio, a showcase of my experience as a professional and passionate web developer. My goal with this website is to provide a diverse collection of projects, experiences, and accomplishments that reflect my commitment to excellence and innovation.`,
        intro: `
        This "Personal Portfolio" provides an overview of my many efforts and accomplishments. Each project illustrates my dedication to constant improvement and keeping at the forefront of cutting-edge technology.`,
        about: {
            objetive: [
                `Create a visually appealing and well-organized portfolio area that displays a wide range of projects.`,
                `Through extensive project descriptions and case studies, use the website to exhibit my technical capabilities, problem-solving ability, and creative talents.`,
                `Create a responsive website that adapts to multiple devices and screen sizes effortlessly, offering a seamless user experience for both desktop and mobile users.`,
                `Highlight your essential skills and unique selling elements across the website so that future employers or collaborators may identify my core competencies at a look.`,
                `By ensuring that the website design, style, and content adhere to industry standards and best practices, I can present myself as a polished and professional individual.`
            ],
            goal: [
                `Provide extensive project descriptions, images, and results to illustrate my problem-solving ability and the value I offered.`,
                `Create a visually appealing and professional website design that matches my own brand and adheres to industry standards.`,
                `Ensure that the website has easy navigation throughout, allowing users to readily reach different areas, projects, and your contact information.`,
                `Create a responsive website that provides a consistent user experience across all platforms, including PCs, tablets, and smartphones.`,
                `Track website traffic, user interaction, and the success of your portfolio in generating new possibilities with web analytics tools.`    
            ],
            tech: [
                `react V 18.2.0`,
                `vite V 4.3.9`,
                `fontawesome V 6.4.0`,
                `gsap 3.11.5`,
                `locomotive scroll V 4.1.4`,
                `lodash V 4.17.21`,
                `lottie react V 2.4.0`,
                `split-type V 0.3.3`
            ],
        },
        demo: portfolioDemo,
        detailsImg: [
            portfolioDetailsPC,
            portfolioDetailsMB
        ],
        date: '2023',
    },
];

export const SOCIAL = [
    {
        id: 0,
        name: 'GitHub',
        link: 'https://github.com/heisjuanda',
    },
    {
        id: 1,
        name: 'LinkedIn',
        link: 'https://www.linkedin.com/in/juan-david-moreno-883a46233/',
    },
    {
        id: 2,
        name: 'Instagram',
        link: 'https://www.instagram.com/heisjuanda/',
    },
];
