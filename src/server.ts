import { app } from './app';

const port = 3000;

const server = app.listen(port, () => console.log(`Server started at http://localhost:${port}`));

process.on('SIGINT', () => {
  server.close();
})
