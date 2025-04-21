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

    const mailOptions = {
        from: 'plwebservice@gmail.com',
        to: 'philipp-kempf@gmx.de',
        subject: `Kontaktformular: ${betreff || 'Kein Betreff'}`, // Standardwert für Betreff
        text: `Name: ${name || 'Unbekannt'}\nE-Mail: ${email || 'Keine E-Mail angegeben'}\n\nNachricht:\n${nachricht || 'Keine Nachricht angegeben'}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('E-Mail erfolgreich gesendet!');
        res.status(200).send('E-Mail erfolgreich gesendet!');
    } catch (error) {
        console.error('Fehler beim Senden der E-Mail:', error.message);
        res.status(500).send(`Fehler beim Senden der E-Mail: ${error.message}`);
    }
});

const client = net.createConnection({ host: 'smtp.gmail.com', port: 587 }, () => {
    console.log('Verbindung zu Gmail SMTP erfolgreich!');
});
client.on('error', (err) => {
    console.error('Fehler bei der Verbindung zu Gmail SMTP:', err.message);
});

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});