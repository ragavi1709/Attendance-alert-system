const express = require('express');
const router = express.Router();

// Define your routes
router.get('/', (req, res) => {
    res.send('Index route works!');
});

// Export the router instance
module.exports = router;
