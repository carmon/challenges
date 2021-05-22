export default function getMockText() {
    return new Promise(function (resolve, reject){
        resolve("A year ago I was in the audience at a gathering of designers in San Francisco. There were four designers on stage, and two of them worked for me. I was there to support them. The topic of design responsibility came up, possibly brought up by one of my designers, I honestly don’t remember the details. What I do remember is that at some point in the discussion I raised my hand and suggested, to this group of designers, that modern design problems were very complex. And we ought to need a license to solve them.");
    })
}

export const getSynonyms = word =>
    new Promise((res, error) => {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
                res(JSON.parse(xmlHttp.responseText).map(w => w.word));
        }
        xmlHttp.open("GET", `https://api.datamuse.com/words?rel_syn=${word}`, true); // true for asynchronous 
        xmlHttp.send(null);
    });