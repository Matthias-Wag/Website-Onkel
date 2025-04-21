// filepath: /Users/philippkempf/Desktop/Websites/Paul-Lein/Website-Onkel/server.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

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
            user: 'plwebservice@gmail.com', // Deine E-Mail
            pass: 'pqxgzcyoviiojhhw', // Dein Passwort (oder App-Passwort)
        },
    });

    const mailOptions = {
        from: 'plwebservice@gmail.com', // Absenderadresse
        to: 'philipp-kempf@gmx.de', // Zieladresse
        subject: `Kontaktformular: ${betreff || 'Kein Betreff'}`,
        text: `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${nachricht}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('E-Mail erfolgreich gesendet!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Fehler beim Senden der E-Mail.');
    }
});

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});