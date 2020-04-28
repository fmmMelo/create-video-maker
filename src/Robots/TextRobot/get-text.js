require('dotenv').config();
const algorithmia = require('algorithmia');
const sentencesDetection = require('sbd');

const credentialsApiKey = process.env.CREDENTIALS;


async function robot(content)
    {
        await fetchContentFromWikipedia(content);
        sanitizeContent(content);
        breakSentencesDetection(content);

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
        }


        function sanitizeContent(content)
        {
            const withoutBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(content.originalContent);
            const withoutDatesInParentheses = removeDatesInParentheses(withoutBlankLinesAndMarkdown);

            content.sourceContentSanitized = withoutDatesInParentheses;

                function removeBlankLinesAndMarkdown(text)
                {
                    const allLines = text + '';
                    const lineSanitize = allLines.split('\n');

                    const withoutBlankLinesAndMarkdown = lineSanitize.filter((line) => 
                    {
                        if(line.trim().length === 0 || line.trim().startsWith('='))
                        {
                            return false
                        }
                        return true
                    });
                    return withoutBlankLinesAndMarkdown.join(' ')
                }
            }

            function removeDatesInParentheses(text) {
                return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
              }
              
              function breakSentencesDetection(content)
              {
                    content.sentences = [];
                    const sentences = sentencesDetection.sentences(content.sourceContentSanitized);
                        
                    sentences.forEach((sentence) => {
                        content.sentences.push({
                            text: sentence,
                            keywords: [],
                            image: [],
        
                        });
                    });
              }

    }


module.exports = robot