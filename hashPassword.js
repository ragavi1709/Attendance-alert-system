const bcrypt = require('bcryptjs');

// Plain password
const plainPassword = '1234';

// Hash the password
bcrypt.hash(plainPassword, 10, (err, hash) => {
    if (err) {
        console.error('Error hashing password:', err);
    } else {
        console.log('Hashed password:', hash);
    }
});
