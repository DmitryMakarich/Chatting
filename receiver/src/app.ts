import { BrokerAsPromised } from "rascal";
import config from "../../sender/config";

(async () => {
  try {
    const broker = await BrokerAsPromised.create(config);
    broker.on("error", console.error);

    const subscription1 = await broker.subscribe("demo_sub");
    subscription1
      .on("message", (_, content, ackOrNack) => {
        console.log("from first queue", content);
        ackOrNack();
      })
      .on("error", console.error);

    const subscription2 = await broker.subscribe("demo1_sub");
    subscription2
      .on("message", (_, content, ackOrNack) => {
        console.log("from second queue", content);
      })
      .on("error", console.error)
      .on("redeliveries_exceeded", (err, _, ackOrNack) => {
        ackOrNack(err, [
          { strategy: "republish", defer: 1000, attempts: 5 },
          { strategy: "nack" },
        ]);
      });
  } catch (err) {
    console.error(err);
  }
})();
