import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import express, { Application } from "express";
import { RootRoutes } from "./modules/_root/_root.routes";
import { uploadsDirExists } from "./utils/my-file-upload";

export class Server {
  // Propiedades privadas de la clase Server
  private app: Application;
  private port: number;
  private apiPrefix: string;

  // Constructor que inicializa la aplicación
  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || "4000", 10) || 4000;
    this.apiPrefix = process.env.API_PREFIX || "/api/v1";
    this.middlewares(); // Llama al método de middlewares
    this.routes(); // Llama al método de rutas
  }

  // Método privado para configurar los middlewares
  private middlewares(): void {
    this.app.use(morgan("dev")); // Logger para las peticiones HTTP
    this.app.use(cors()); // Habilitar CORS para las solicitudes
    this.app.use(helmet()); // Seguridad adicional en los headers HTTP
    this.app.use(express.json()); // Analizar el cuerpo de las peticiones en formato JSON
    this.app.use(express.urlencoded({ extended: true })); // Analizar el cuerpo de las peticiones codificado como urlencoded
    this.app.use(uploadsDirExists);
  }

  // Método privado para configurar las rutas
  private routes(): void {
    const routes: RootRoutes = new RootRoutes(); // Instancia las rutas del Root
    this.app.use("/", routes.router); // Usar las rutas definidas
  }

  // Método público para iniciar el servidor
  public listen(): void {
    try {
      this.app.listen(this.port, () => {
        console.log(`Server Running on: http://localhost:${this.port}${this.apiPrefix}`);
      });
    } catch (error: unknown) {
      console.error("Error Starting Server", error);
    }
  }
}
