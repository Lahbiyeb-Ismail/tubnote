import express from 'express';

const app = express();

const hello = 'hello';

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
