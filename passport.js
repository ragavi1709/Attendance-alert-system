const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('../db'); // Database connection

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            const query = 'SELECT * FROM students WHERE email = ?';
            db.query(query, [email], (err, results) => {
                if (err) {
                    return done(err);
                }

                if (results.length === 0) {
                    return done(null, false, { message: 'No user found with this email.' });
                }

                const user = results[0];
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        return done(err);
                    }

                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                });
            });
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.student_id); // Use student_id as the session identifier
    });

    passport.deserializeUser((id, done) => {
        const query = 'SELECT * FROM students WHERE student_id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return done(err);
            }
            done(null, results[0]);
        });
    });
};
