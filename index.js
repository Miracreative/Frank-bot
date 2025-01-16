require('dotenv').config();
const TelegramApi = require('node-telegram-bot-api');


let token = process.env.TOKEN;

const bot = new TelegramApi(token, {polling: true});

// const chats = {}

// const startGame = async(chatId) => {

// }
// let messageForMe = false
const link = `<a href="https://frank.creativecom.org/">Go to site</a>`

const startBotBtn = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'About', callback_data: 'about'}],
            [{text: 'Mission', callback_data: 'mission'}],
            [{text: 'Impact', callback_data: 'impact'}],
            [{text: 'Our programes', callback_data: 'programes'}],
            [{text: 'Our programes 2', callback_data: 'programes2'}],
            [{text: 'Сontact us', callback_data: 'contacts'}],
        ]
    }),
    parse_mode: 'HTML'
}

const thanksBotBtn = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Back', callback_data: 'back'}]
        ]
    }),
    parse_mode: 'HTML',
    disable_web_page_preview: true
}

const startMessage = `<b>Drivers of digital science and research: leading change</b>\n\nFrank Fund is committed to accelerating scientific and technological breakthroughs by supporting cutting-edge research and educational programmes in quantum and photonic technologies. Our mission is to inspire innovation that will change the world for the better.\n\n${link}`;

const aboutMessage = `<b>About</b>\n\nThe Frank Fund is uniquely positioned at the intersection of science, technology and innovation. Established to stimulate progress in quantum and photonic technologies, the fund plays a key role in shaping the future of scientific research.\n\n${link}`;

const missionMessage = `<b>Mission</b>\n\n<b>Innovation</b>\nWe encourage risk-taking and experimentation that can lead to meaningful scientific discoveries.\n\n<b>Collaboration</b>\nWe encourage risk-taking and experimentation that can lead to meaningful scientific discoveries.\n\n<b>Education</b>\nThe education and development of young scientists and professionals is at the centre of our mission as we strive to train the next generation of innovators.\n\n<b>Transparency and accountability</b>\nWe are committed to openness in our research and results, with a particular focus on the ethical aspects of scientific work.\n\n${link}`;

const impactMessage = `<b>Impact</b>\n\nThe Frank Fund is uniquely positioned at the intersection of science, technology and innovation. Established to stimulate progress in quantum and photonic technologies, the fund plays a key role in shaping the future of scientific research.\n\n${link}`;

const programesMessage = `<b>Our Programes</b>\n\n<b>Quantum encryption and security Programme Objective:</b>\nThe programme focuses on quantum cryptography research and the development of quantum attack-resistant encryption systems. Programme participants work on technologies that can be integrated into existing communication networks, protecting information from cyber threats of the present and future.\n\n<b>Quantum informatics and computing</b>\nUsing photonic technologies to create new diagnostic tools and therapies in medicine.\nThis programme explores the potential of photonic materials to create advanced medical devices. The focus is on developing devices for non-invasive diagnostics, precise drug delivery at the molecular level and therapies that use light waves to activate drugs in tissues.\n\n<b>Quantum informatics and computing</b>\nDeveloping quantum algorithms and creating quantum computers that can solve problems inaccessible to classical computers.\nThe programme aims to overcome technical barriers in quantum computing and informatics, including increasing the number of qubits, minimising errors and creating new quantum algorithms. The results of this research can radically change approaches to data processing and solving complex scientific, technological and economic problems.\n\n${link}`;

const programesMessage2 = `<b>Our Programes 2</b>\n\nFrank Fund is committed to creating and disseminating knowledge in quantum and photonic technologies by providing educational opportunities that are accessible to everyone. Our approach to education is based on the following principles\n\n<b>Accessibility</b>\nWe believe that education should be accessible to everyone, regardless of background, age or professional background. Our programmes are designed to appeal to people with varying levels of prior knowledge, from beginners to professionals looking to further their knowledge.\n\n<b>Practical relevance</b>\nOur educational programmes aim not only to provide theoretical knowledge, but also to show how this knowledge can be applied in real life. We emphasise the practical aspects of quantum and photonic technologies, providing students with the opportunity to work on real projects and experiments.\n\n<b>Co-operation</b>\nThe Foundation actively collaborates with leading educational institutions and research centres around the world. This allows us to incorporate cutting-edge science into our educational programmes and provide students with access to the international scientific community.\n\n<b>Continuous learning</b>\nWe support the concept of continuous education and self-improvement. In a world where science and technology are advancing at an incredible rate, continuous learning is the key to success. Our programmes are designed to stimulate an ongoing interest in learning and self-development.\n\n<b>Ethical standards</b>\nTeaching emphasises not only the acquisition of knowledge but also the development of an ethical attitude towards science. We train our students to be socially responsible scientists who recognise the potential impact of their discoveries and developments.\n\n${link}`;

const contactsMessage = `<b>Сontact us</b>\n\n<a href="https://medium.com/@frankfundd">MEDIUM</a>\n\n<a href="https://teletype.in/@frankfund">TELETYPE</a>\n\n<a href="https://www.reddit.com/user/frankfundation/">REDDIT</a>\n\n<a href="www.t.me/frankfundation">TELEGRAM</a>\n\n<a href="www.t.me/frankfundchat">CHAT</a>${link}`

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Start Bot'},
    ])
   
    bot.on("message", async (msg) => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if(text === '/start') {
            try {
                return await bot.sendMessage(chatId, startMessage, startBotBtn)
            } catch(e) {
                return await bot.sendMessage(chatId, e.message);
            }
        } else {
            try {
                return  bot.sendMessage(chatId, "I don't understand you", thanksBotBtn)
            } catch(e) {
                return await bot.sendMessage(chatId, e.message);
            }
            
        }
    })

    bot.on('callback_query', async(msg) => {
        try {
            const data = msg.data;
            const chatId = msg.message.chat.id;
            if(data === 'about') {
                return await bot.sendMessage(chatId, aboutMessage, thanksBotBtn);
            } else
            if(data === 'back') {
                return await bot.sendMessage(chatId, startMessage, startBotBtn);
            } else
            if(data === 'mission') {
                bot.sendMessage(chatId, missionMessage, thanksBotBtn);
            } else
            if(data === 'impact') {
                bot.sendMessage(chatId, impactMessage, thanksBotBtn);
            } else
            if(data === 'programes') {
                bot.sendMessage(chatId, programesMessage, thanksBotBtn);
            } else
            if(data === 'programes2') {
                bot.sendMessage(chatId, programesMessage2, thanksBotBtn);
            } else
            if(data === 'contacts') {
                bot.sendMessage(chatId, contactsMessage, thanksBotBtn);
            } else {
                return bot.sendMessage(chatId, "I don't understand you", thanksBotBtn)
            }
           
        } catch (e) {
            return await bot.sendMessage(chatId, e.message)
        }
    })
    
}
start()