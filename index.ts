const express = require('express');

const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
