const otpData = document.getElementById('otpData');
const signupData = document.getElementById('signupData');
const loginData = document.getElementById('loginData');

export function sendEmail(otp, userName, email) {
    (function () {
        emailjs.init({
            publicKey: "gXI8mBrTUZJw4g_KH",
        });
    })();

    const templateParams = {
        from_name: "Keshav",
        to_name: userName.value,
        to_email: email.value,
        message: `Your OTP is : ${otp}`
    };
    emailjs.send('service_7856tyn', 'template_7g22xh9', templateParams).then(
        (response) => {
            console.log('SUCCESS!', response.status, response.text);
        },
        (error) => {
            console.log('FAILED...', error);
        },
    );

}


export function Verification(event, otpInput, otp, userData) {
    event.preventDefault();
    if (Number(otpInput.value) === otp) {
        const obj = JSON.parse(localStorage.getItem('userData') || '[]')
        obj.push(userData)
        localStorage.setItem('userData', JSON.stringify(obj));
        alert("Succesfully signed up!!");
        loginData.style.display = "block";
        otpData.style.display = "none";
        signupData.style.display = "none";

    }
    else {
        alert("wrong OTP!! Try again");
    }

}