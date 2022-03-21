import express, { Request, Response, NextFunction } from "express";
import { BrokerAsPromised } from "rascal";
import config from "../config";

const app = express();
const PORT = 5000;

let broker: BrokerAsPromised;

(async () => {
  broker = await BrokerAsPromised.create(config);
})();

app.get(
  "/send/query1",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const publication = await broker.publish("demo_pub", {
        id: 1,
        message: "first message 1",
      });
      publication.on("error", console.error);
      res.status(200).send({ data: "message send" });
    } catch (e) {
      res.status(500).send({ message: "something went wrong" });
    }
  }
);

app.get(
  "/send/query2",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const publication = await broker.publish("demo1_pub", {
        id: 2,
        message: "second message 2",
      });
      publication.on("error", console.error);
      res.status(200).send({ data: "message send" });
    } catch (e) {
      res.status(500).send({ message: "something went wrong" });
    }
  }
);

app.listen(PORT, () =>
  console.log(`App has been started on http://localhost:${PORT}`)
);
