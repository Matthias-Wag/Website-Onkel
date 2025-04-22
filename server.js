require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const net = require('net');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (e.g., index.html)
app.use(express.static(__dirname));

// POST route for the contact form
app.post('/send-email', async (req, res) => {
    const { name, email, betreff, nachricht } = req.body;

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Beispiel: Gmail
        auth: {
            user: process.env.EMAIL_USER, // Deine E-Mail
            pass: process.env.EMAIL_PASS, // Dein Passwort (oder App-Passwort)
        },
        debug: true, // Aktiviert Debugging
        logger: true, // Protokolliert SMTP-Kommunikation
    });

    // E-Mail an den Empfänger (z. B. dich)
    const mailToRecipient = {
        from: process.env.EMAIL_USER,
        to: 'philipp-kempf@gmx.de', // Empfängeradresse
        subject: `Kontaktformular: ${betreff || 'Kein Betreff'}`, // Standardwert für Betreff
        text: `Name: ${name || 'Unbekannt'}\nE-Mail: ${email || 'Keine E-Mail angegeben'}\n\nNachricht:\n${nachricht || 'Keine Nachricht angegeben'}`,
    };

    // Bestätigungs-E-Mail an den Absender
    const mailToSender = {
        from: process.env.EMAIL_USER,
        to: email, // Absenderadresse aus dem Formular
        subject: 'Bestätigung: Ihre Nachricht ist eingegangen',
        text: `Hallo ${name || 'Unbekannt'},\n\nvielen Dank für Ihre Nachricht. Wir haben Ihre Anfrage erhalten und werden uns so schnell wie möglich bei Ihnen melden.\n\nIhre Nachricht:\n${nachricht || 'Keine Nachricht angegeben'}\n\nMit freundlichen Grüßen,\nPL Bau`,
    };

    try {
        // Sende die E-Mail an den Empfänger
        await transporter.sendMail(mailToRecipient);
        console.log('E-Mail an den Empfänger erfolgreich gesendet!');

        // Sende die Bestätigungs-E-Mail an den Absender
        await transporter.sendMail(mailToSender);
        console.log('Bestätigungs-E-Mail an den Absender erfolgreich gesendet!');

        res.status(200).send('E-Mails erfolgreich gesendet!'); // Antwort an den Client
    } catch (error) {
        console.error('Fehler beim Senden der E-Mails:', error.message);
        res.status(500).send(`Fehler beim Senden der E-Mails: ${error.message}`); // Fehlerantwort an den Client
    }
});

/*const client = net.createConnection({ host: 'smtp.gmail.com', port: 587 }, () => {
    console.log('Verbindung zu Gmail SMTP erfolgreich!');
});
client.on('error', (err) => {
    console.error('Fehler bei der Verbindung zu Gmail SMTP:', err.message);
});*/

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});