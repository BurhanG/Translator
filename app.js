const form = document.querySelector('.card-form');
const textarea = document.querySelector('.card-textarea');
const googleTranslateText = document.querySelector('.translated-text.google');
const justTranslateText = document.querySelector('.translated-text.justTranslate');
const myMemoryText = document.querySelector('.translated-text.myMemoryTranslate');


//icons 
const icons = document.querySelectorAll('.translated-body');

//notification
const notification = document.querySelector('.notification');

// saved Cards
const savedCardContainer = document.querySelector('.saved-card-container');
const deleteSavedCards = document.querySelector('.saved-text-delete-btn');

const getSavedCards = getStorage('savedText');
if (getSavedCards) {
    getStorage('savedText').forEach(item => {
        let htmlTemplate = `<div class="saved-card">${item}</div>`;
        savedCardContainer.innerHTML += htmlTemplate;
    });
}

textarea.addEventListener('keyup', (data) => {
    console.log('textarea event listener worked');

    let text = textarea.value.trim();
    if (text.length > 0) {
        console.log(text);
        justTranslateText.innerHTML = `çeviriliyor...`
        googleTranslateText.innerHTML = `çeviriliyor...`
        myMemoryText.innerHTML = `çeviriliyor...`

        detectLanguage(text)
            .then(lang => {
                console.log('metinin dili', lang);
                return googleTranslate(lang, text);
            }).then(data => {
                console.log('google tr', data);
                googleTranslateText.innerHTML = data;
            }).catch(err => {
                console.log(err);
            });
        justTranslate(text).then(data => {
            justTranslateText.innerHTML = data[0];

        }).catch(err => {
            console.log(err);
        });

        myMemoryTranslate(text).then(data => {
            myMemoryText.innerHTML = `${data}`;
        });


    } else {
        justTranslateText.innerHTML = `metin bekleniyor...`
        googleTranslateText.innerHTML = `metin bekleniyor...`
        myMemoryText.innerHTML = `metin bekleniyor...`
    }
});

icons.forEach(body => {
    body.addEventListener('click', e => {

        if (e.target.classList.contains('translated-copy-icon') || e.target.classList.contains('fa-clone')) {
            let node = body.children[0];
            copyToClipboard(node);
        } else if (e.target.classList.contains('translated-save-icon') || e.target.classList.contains('fa-bookmark')) {
            let text = body.children[0].innerHTML.trim();
            console.log('text', text);
            storage = setStorage('savedText', text);
            sendNotification('Metin Kaydedildi');
            let htmlTemplate = `<div class="saved-card">${text}</div>`;
            savedCardContainer.innerHTML += htmlTemplate;
        }


        // e.stopPropagation();
        if (e.target.nodeName == 'SPAN') {}
    });
})

const copyToClipboard = (node) => {
    var range = document.createRange();
    range.selectNode(node);
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges(); // to deselect
    let text = 'Metin Kopyalandı';
    sendNotification(text);
    textarea.removeAttribute('autofocus');
    //textarea.focus();
};

const sendNotification = (text) => {
    notification.innerHTML = `${text}`;
    notification.classList.remove('hidden');
    notification.classList.add('visible');
    setTimeout(() => {
        notification.classList.remove('visible');
        notification.classList.add('hidden');
    }, 2000)
}
deleteSavedCards.addEventListener('click', () => {
    deleteStorage('savedText');
    sendNotification('Metinler başarılı bir şekilde silindi');
    savedCardContainer.innerHTML = ``;

})