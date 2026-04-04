var express = require('express');
var nodemailer = require('nodemailer');
var { getDb, save } = require('../db/init');

var router = express.Router();

// Rate limiting simple
var submissions = new Map();
var RATE_LIMIT = 5;
var RATE_WINDOW = 60000; // 1 minute

function isRateLimited(ip) {
  var now = Date.now();
  var entry = submissions.get(ip);
  if (!entry) {
    submissions.set(ip, { count: 1, start: now });
    return false;
  }
  if (now - entry.start > RATE_WINDOW) {
    submissions.set(ip, { count: 1, start: now });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

router.post('/', async function (req, res) {
  try {
    var ip = req.ip || req.connection.remoteAddress;
    if (isRateLimited(ip)) {
      return res.status(429).json({
        success: false,
        message: 'Trop de messages envoyes. Reessayez dans une minute.'
      });
    }

    var { name, email, subject, message } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Le nom est requis.' });
    }
    if (!email || !isValidEmail(email.trim())) {
      return res.status(400).json({ success: false, message: 'Email invalide.' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Le message est requis.' });
    }

    // Sanitize
    name = escapeHtml(name.trim());
    email = email.trim().toLowerCase();
    subject = subject ? escapeHtml(subject.trim()) : '';
    message = escapeHtml(message.trim());

    // Store in DB
    var db = await getDb();
    db.run(
      'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]
    );
    save();

    // Send email if SMTP configured
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      try {
        var transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT) || 587,
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM || 'noreply@pepiterouge.ch',
          to: process.env.CONTACT_TO || 'bonjour@pepiterouge.ch',
          subject: '[Pepite Rouge] ' + (subject || 'Nouveau message de ' + name),
          text: 'De: ' + name + ' (' + email + ')\n\n' + message,
          html: '<p><strong>De:</strong> ' + name + ' (' + email + ')</p><p>' + message.replace(/\n/g, '<br>') + '</p>'
        });
      } catch (mailErr) {
        console.error('Email non envoye:', mailErr.message);
      }
    }

    res.json({ success: true, message: 'Message envoye avec succes !' });
  } catch (err) {
    console.error('Erreur contact:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur. Reessayez plus tard.' });
  }
});

module.exports = router;
