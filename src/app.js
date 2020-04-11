const readline = require('readline-sync');

function startSearch()
{
    const content = {};
    
    content.term = AskSearchTerm();
    content.prefix = QuestionPrefix();

    function AskSearchTerm()
    {
        
        return readline.question('Type a Wikipedia search term: ');      
    }

    function QuestionPrefix()
    {
        const prefixes = ['Who is', 'What is', 'The history of'];
        const selectPrefixIndex = readline.keyInSelect(prefixes);
        const selectPrefixText =  prefixes[selectPrefixIndex];

        return selectPrefixText;
    }
    console.log(content);
}
startSearch();