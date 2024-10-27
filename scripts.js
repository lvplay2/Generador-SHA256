async function generateHash() {
    const text = document.getElementById('text-input').value;
    const salt = document.getElementById('salt-input').value;
    const disableSalt = document.getElementById('disable-salt').checked;

    let combinedText = text;
    if (!disableSalt && salt) {
        combinedText += salt;
    }

    const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(combinedText));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    document.getElementById('output').innerText = 'Hash: ' + hashHex;
}

function copyToClipboard() {
    const output = document.getElementById('output').innerText;
    const tempInput = document.createElement('input');
    tempInput.value = output.replace('Hash: ', '');
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('Hash copiado al portapapeles');
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('body').style.transition = 'transform 0.5s';
    document.addEventListener('scroll', function() {
        document.querySelector('body').style.transform = 'translateY(' + window.scrollY / 2 + 'px)';
    });
});
