const robots = {
            userInput : require('./Robots/UserInput/user-input.js'),
            text: require('./Robots/TextRobot/get-text.js'),
    }
async function start()
    {
        const content = robots.userInput();
        await robots.text(content); 

        console.log(content);
    }
start();
    
        

        