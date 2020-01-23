let QRCode = require('qrcode');

export function generateQRsrc(elementId, payload) {
    QRCode.toDataURL(payload)
        .then(url => {
            // eslint-disable-next-line no-console
            console.log(payload);
            document.getElementById(elementId).src = url;
        })
        .catch(err => {
            // eslint-disable-next-line no-console
            console.error(err)
        });
}


//---------------------------------------------------------------------------------------------------------------
// ACTUALLY USEFUL CODE
//---------------------------------------------------------------------------------------------------------------


