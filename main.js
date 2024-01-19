document.addEventListener('DOMContentLoaded', () => {
    var canvas = document.getElementById('captchaCanvas');
    var ctx = canvas.getContext('2d');
    var captchaText = generateCaptchaText(6);
    const captchaStatus = document.getElementById('captcha-status');

    drawCaptcha(captchaText);

    function verifyCaptcha() {
        var inputText = document.getElementById('captcha-input').value.toLowerCase();
    var captchaTextLower = captchaText.toLowerCase();

    if (inputText === captchaTextLower) {
        captchaStatus.innerHTML = 'Status : Correct';
        captchaStatus.style.color = 'green';
    } else if (inputText.length < 6) {
        captchaStatus.innerHTML = 'Status : Please enter all characters';
        captchaStatus.style.color = 'red';
    } else {
        captchaStatus.innerHTML = 'Status : Incorrect';
        captchaStatus.style.color = 'red';
    }
        setTimeout(() => {
            captchaStatus.innerHTML = 'Status : IDLE';
            captchaStatus.style.color = 'black';
        }, 3000);
        document.getElementById('captcha-input').value = '';
        captchaText = generateCaptchaText(6);
        drawCaptcha(captchaText);
    }

    // add event listener for check button
    document.getElementById('check-captcha').addEventListener('click', verifyCaptcha);

    // add event listener for reload button
    document.getElementById('reload-captcha').addEventListener('click', () => {
        captchaText = generateCaptchaText(6);
        drawCaptcha(captchaText);
        document.getElementById('captcha-input').value = '';
        captchaStatus.innerHTML = 'Status : IDLE';
    });

    function generateCaptchaText(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function drawCaptcha(text) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '24px Arial';
        ctx.fillStyle = '#06108c';
        ctx.fillText(text, 10, 30);
        // add noise
        addNoise(ctx);
    }

    function addNoise(ctx) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] = Math.random() * 255;
        }
        ctx.putImageData(imageData, 0, 0);
    }
});
