const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../db'); // Import the database connection


// Test route
router.get('/', (req, res) => {
    res.send('Index route works!');
});

// Update password for a specific user
router.get('/update-password', (req, res) => {
    const plainPassword = '1234'; // Your plain password
    const email = 'ragavi.e2022@vitstudent.ac.in'; // The email to update

    // Hash the password and update the database
    bcrypt.hash(plainPassword, 10, (err, hash) => {
        if (err) throw err;

        const query = 'UPDATE students SET password = ? WHERE email = ?';
        db.query(query, [hash, email], (err, results) => {
            if (err) throw err;
            res.send('Password updated successfully.');
        });
    });
});
// Dashboard Route
router.get('/dashboard', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/');
    }

    const studentId = req.session.userId;
    const query = 'SELECT * FROM courses WHERE student_id = ?';

    db.query(query, [studentId], (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching attendance data.');
        }

        // Render the dashboard with course data
        res.render('dashboard', { courses: results });
    });
});


module.exports = router;
