import nodemailer from "nodemailer"; // Nodemailer importálása
import "dotenv/config"; // Dotenv konfigurálása a környezeti változókhoz

// Email küldés: "nodemailer" csomaggal és Gmail fiók használatával.


async function sendMail(emailAddress, emailContent) {
    // Nodemailer transporter létrehozása
    const transporter = nodemailer.createTransport({
        service: "gmail", // Gmail szolgáltatás használata
        host: "smtp.gmail.com", // SMTP host
        port: 587, // SMTP port
        secure: false, // Nem biztonságos kapcsolat
        auth: {
            user: process.env.EMAIL_SENDER, // Email cím a környezeti változóból
            pass: process.env.APP_PASSWORD, // Alkalmazásjelszó a környezeti változóból
        },
    });

    try {
        // Email küldése
        const info = await transporter.sendMail({
            from: process.env.EMAIL_SENDER, // Feladó email cím
            to: emailAddress, // Címzett email cím
            subject: "Email teszt", // Email téma
            text: emailContent, // Email tartalom
        });
        console.log(`Email sent ${info.response}`); // Sikeres küldés üzenet
    } catch (err) {
        console.log(`Email error: ${err}`); // Hibaüzenet
    }
};

sendMail(
  "milan.kondor05@gmail.com",
  "This is a test email sent using Nodemailer and Gmail!"
);

// APP_PASSWORD generálás:
// Google-fiók kezelése
// Biztonság
// Kétlépcsős azonosítás (Kapcsold be, ha még nincs. Add meg a telefonszámod. Utána megjelenik az Alkalmazásjelszavak rész.)
// Alkalmazásjelszavak
// Saját alkalmazásjelszavak -> Létrehozás

// A generált jelszót kimásolod és a szóközöket kiszeded belőle, majd elmented a .env fájlba.

// A .env fájl:
// PORT=3000
// EMAIL_SENDER="your.email@gmail.com"
// APP_PASSWORD="generatedAppPassword"

// Telepítés:
// npm install dotenv 
// npm install nodemailer 

// Használat:
// import nodemailer from "nodemailer";
// import "dotenv/config";