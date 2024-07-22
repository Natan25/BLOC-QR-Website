
var urlObj = new URL(window.location.href)

$(document).ready(initPage)

async function initPage(){
    initQrCode()
    animateQrLoad()
}

function initQrCode(){
    let isDarkMode = window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches
    createQR(isDarkMode)

    //Add event listner to change color when system changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event)=>{
        createQR(event.matches)
    });
}

async function createQR(isDarkMode){
    let moduleColor = isDarkMode? "#F25F5C": "#1B445F"
    let ringColor =  isDarkMode? "#247BA0": "#509BCE"
    let centerColor = isDarkMode? "#FFEB99": "#397F78"

    let qr = $(`
        <qr-code
            id="qr"
            module-color="${moduleColor}"
            position-ring-color="${ringColor}"
            position-center-color="${centerColor}"
            mask-x-to-y-ratio="1"
        >
    `)

    $('body').empty()
    $('body').append(qr)
    setTimeout(animateQrLoad, 1)
    
    setQrToUrlKey()
}

function setQrToUrlKey(){
    let key = urlObj.searchParams.toString().split("=")[1]
    $('#qr').prop('contents', key)
}

function animateQrLoad(){
    $('#qr')[0].animateQRCode('MaterializeIn');
}
