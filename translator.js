const apiKey = '----'
const detectLanguage = (text) => {
    return new Promise((resolve, reject) => {
        const apiUrl =
            'https://language-detection3.p.rapidapi.com/detect-language'

        const request = new XMLHttpRequest()
        request.withCredentials = true
        const data = JSON.stringify({
            text: text,
        })

        request.addEventListener('readystatechange', () => {
            if (request.readyState === 4 && request.status === 200) {
                let data = JSON.parse(request.responseText)
                resolve(data['language-iso'])
            } else if (request.readyState === 4) {
                reject('bağlantı sağlam ama gelen veri boş')
            }
        })
        request.open('POST', apiUrl)
        request.setRequestHeader('content-type', 'application/json')
        request.setRequestHeader('x-rapidapi-key', apiKey)
        request.setRequestHeader(
            'x-rapidapi-host',
            'language-detection3.p.rapidapi.com'
        )
        request.send(data)
    })
}

const googleTranslate = (language, text) => {
    return new Promise((resolve, reject) => {
        const apiUrl =
            'https://google-translate1.p.rapidapi.com/language/translate/v2'

        const request = new XMLHttpRequest()
        request.withCredentials = true

        request.addEventListener('readystatechange', () => {
            if (request.readyState === 4 && request.status === 200) {
                let data = JSON.parse(request.responseText)
                resolve(data.data.translations[0].translatedText)
            } else if (request.readyState === 4) {
                reject('bağlantı sağlam ama gelen veri boş')
            }
        })
        const data = `q=${text}&source=${language}&target=en`

        request.open('POST', apiUrl)
        request.setRequestHeader(
            'content-type',
            'application/x-www-form-urlencoded'
        )
        request.setRequestHeader('accept-encoding', 'application/gzip')
        request.setRequestHeader('x-rapidapi-key', apiKey)
        request.setRequestHeader(
            'x-rapidapi-host',
            'google-translate1.p.rapidapi.com'
        )

        request.send(data)
    })
}
const justTranslate = (text) => {
    return new Promise((resolve, reject) => {
        const apiUrl = 'https://just-translated.p.rapidapi.com/'

        const request = new XMLHttpRequest()

        request.addEventListener('readystatechange', () => {
            if (request.readyState === 4 && request.status == 200) {
                let translatedText = JSON.parse(request.responseText).text
                resolve(translatedText)
            } else if (request.readyState === 4) {
                reject('justTranslate', 'bağlantı sağlam ama gelen veri boş')
            }
        })

        request.open('GET', `${apiUrl}?lang=en&text=${text}`)
        request.setRequestHeader('x-rapidapi-key', apiKey)
        request.setRequestHeader(
            'x-rapidapi-host',
            'just-translated.p.rapidapi.com'
        )
        request.send()
    })
}

const kiarasTranslate = (text) => {
    const apiUrl = 'https://kiara-translate.p.rapidapi.com/get_translated/'
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'kiara-translate.p.rapidapi.com',
        },
        body: {
            input: 'We make the world a better place',
            lang: 'ja',
        },
    })
        .then((response) => {
            console.log('response', response)
            // console.log(response.json());
            return response.json()
        })
        .then((data) => {
            console.log(data)
        })
        .catch((err) => {
            console.log(err)
        })
}

const myMemoryTranslate = async (text) => {
    const apiUrl =
        'https://translated-mymemory---translation-memory.p.rapidapi.com/api/'

    const request = await fetch(
        `${apiUrl}get?langpair=tr%7C` +
            'en' +
            `&q=${text}&mt=1&onlyprivate=0&de=a%40b.c`,
        {
            method: 'GET',
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host':
                    'translated-mymemory---translation-memory.p.rapidapi.com',
            },
        }
    )
    const data = await request.json()
    console.log(data.responseData.translatedText)
    return data.responseData.translatedText
}
// let text = 'neye baktın bilader';

// detectLanguage(text)
//     .then(data => {
//         console.log(data);
//         return translate(data, text);
//     }).then(data => {
//         console.log(data);
//         s
//     }).catch(err => {
//         console.log(err);
//     });

// translate((err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// });
// translate2();
