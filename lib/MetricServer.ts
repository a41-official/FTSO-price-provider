import express, { Application } from 'express';
import { Registry, collectDefaultMetrics, Gauge } from 'prom-client';

export class MetricServer {
    app: Application;
    port = 3000;
    registry: Registry;

    constructor() {
        const app = express();

        // Prometheus Registry
        const registry = new Registry();

        // Collect default metrics
        collectDefaultMetrics({ register: registry });

        // add up metric
        const upMetric = new Gauge({
            name: 'ftso_up',
            help: 'FTSO up status (1 = up, 0 = down)',
            registers: [registry],
        });

        // expose metrics
        app.get('/metrics', (req, res) => {
            upMetric.set(1);
            res.set('Content-Type', registry.contentType);
            
            registry.metrics().then((data) => {
                res.end(data);
            }).catch((err) => {
                res.status(500).end(err);
            });
        });

        this.app = app;
        this.registry = registry;
    }

    start() {
        // Server start
        this.app.listen(this.port, () => {
            console.log(`Prometheus Metrics Server is running at http://localhost:${this.port}/metrics`);
        });
    }
}