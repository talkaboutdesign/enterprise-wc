// Setup a simple express server used only for running tests
const express = require('express');

const app = express();
const port = process.env.PORT || 4444;

app.use('/', express.static(`${__dirname}/build/development`));

// Listen on port 4444
app.listen(port, () => {
  console.log(`Dev server listening on port ${port}`);
});
