import * as express from 'express';
import * as http from 'http';
import * as socketIo from 'socket.io';

import { Message } from "./model";

class Server {
    public static readonly PORT = 8080;
    public app: any;
    private server: any;
    private io: any;
    private port: number;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }

    private createApp(): void {
        this.app = express();
    }

    private createServer(): void {
        this.server = http.createServer(this.app);
    }

    private config(): void {
        this.port = Server.PORT;
    }

    private sockets(): void {
        this.io = socketIo(this.server);
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.io.on('connect', (socket: any) => {
            let self = this;
            const adsArray = ['Thirsty? Get a Coca Cola!', 'I just drank Redbull', 'Mmmm... Mars Chocolate', 'Melting cheeeeeeese, Pizza Hut'];
            setInterval(function () {
                let randomAd = adsArray[Math.floor(Math.random() * adsArray.length)];

                self.io.emit('ad', randomAd);
            }, 5000);
            console.log('Connected client on port %s.', this.port);

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }
}

let server = Server.bootstrap();
export = server.app;