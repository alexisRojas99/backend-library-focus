/* eslint-disable lines-between-class-members */
import express, { Application } from 'express';
import { createServer, Server as ServerHTTP } from 'http';
import cors from 'cors';
import router from '../../routes/api';
import openapi from '../../routes/openapi';
import Handler from '../../handlers/Handler';

class Server {
  app: Application;
  port: string;
  server: ServerHTTP;
  host: string;
  path: string;

  constructor() {
    this.app = express();
    this.port = process.env.API_PORT || '8000';
    this.server = createServer(this.app);
    this.host = process.env.API_HOST || 'localhost';
    this.path = '/api';

    // Lectura y Parseo del body
    this.app.use(express.json());

    // Middleware
    this.middleWares();

    // Ejecuta el metodo de las rutas
    this.routes();

    // Configuracion de las excepciones
    this.ExceptionConfig();
  }

  middleWares() {
    // CORS
    this.app.use(cors());

    // Directorio publico
    this.app.use(express.static('public'));

    // OpenAPI Documentation
    if (process.env.APP_ENV === 'development') this.app.use('/', openapi);
  }

  routes() {
    this.app.use(this.path, router);
  }

  ExceptionConfig() {
    this.app.use(Handler.handlerErrorMiddleware);
    this.app.use(Handler.handleError);
  }

  listen() {
    this.server.listen(this.port, parseInt(this.host, 10), () => {
      // eslint-disable-next-line no-console
      console.log(`API-REST listening at http://${this.host}:${this.port}`);
    });
  }
}

export default new Server();
