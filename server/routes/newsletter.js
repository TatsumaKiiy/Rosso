var express = require('express');
var { getDb, save } = require('../db/init');

var router = express.Router();

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

router.post('/', async function (req, res) {
  try {
    var { email } = req.body;

    if (!email || !isValidEmail(email.trim())) {
      return res.status(400).json({ success: false, message: 'Email invalide.' });
    }

    email = email.trim().toLowerCase();

    var db = await getDb();

    // Check duplicate
    var existing = db.exec('SELECT id FROM subscribers WHERE email = ?', [email]);
    if (existing.length > 0 && existing[0].values.length > 0) {
      return res.status(409).json({ success: false, message: 'Cet email est deja inscrit.' });
    }

    db.run('INSERT INTO subscribers (email) VALUES (?)', [email]);
    save();

    res.json({ success: true, message: 'Inscription reussie ! Bienvenue dans la communaute.' });
  } catch (err) {
    console.error('Erreur newsletter:', err);
    res.status(500).json({ success: false, message: 'Erreur serveur. Reessayez plus tard.' });
  }
});

module.exports = router;
