import express, { Express, json, Request, Response } from 'express';
import Cors from 'cors';
import Routes from './routes/index';

interface AppConfig {
    PORT?: number
}

class App {

    public main: Express;

    constructor({ PORT }: AppConfig){
        this.main = express();
        this.config();
        this.connectDatabase();
        this.routes();
        this.listen(PORT ? PORT : 3333);
    }

    private listen(PORT: number): void {
        this.main.listen(PORT, () => {
            console.log(`Server is open in port ${PORT}`);
        });
    }

    private connectDatabase(): void{
        // Logic to connect to database
    }

    private routes(): void{
        this.main.get('/api/v1', (req: Request, res: Response) => {
            return res.status(200).json({
                name: 'pdm-projeto-versao-02',
                version: '1.0.0',
            });
        });
        this.main.use('/api/v1', Routes);
    }

    private config(): void{
        this.main.use(json());
        this.main.use(Cors());
    }

}

export default App;