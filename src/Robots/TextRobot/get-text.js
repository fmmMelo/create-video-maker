require('dotenv').config();
const algorithmia = require('algorithmia');
const credentialsApiKey = process.env.CREDENTIALS;

async function robot(content)
    {
        await fetchContentFromWikipedia(content);

    async function fetchContentFromWikipedia(content)
        {
                console.log('> [text-robot] Starting...');

                const textSearch = (content.prefix + content.term);

                const wikiContent = await algorithmia(credentialsApiKey)
                .algo('web/WikipediaParser/0.1.2')
                .pipe(textSearch);
                console.log('> [text-robot] Fetching content from Wikipedia...');

                const wikiResult = wikiContent.result;

                content.originalContent = wikiResult.content;

                console.log(content.originalContent);
        };
    };

module.exports = robot