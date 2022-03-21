export default {
  vhosts: {
    "/": {
      connection: {
        url: "amqp://localhost:5672",
      },
      exchanges: ["e1", "e2"],
      queues: ["q1", "q2"],
      bindings: ["e1 -> q1", "e2 -> q2"],
      publications: {
        demo_pub: {
          exchange: "e1",
        },
        demo1_pub: {
          exchange: "e2",
        },
      },
      subscriptions: {
        demo_sub: {
          queue: "q1",
        },
        demo1_sub: {
          queue: "q2",
        },
      },
    },
  },
};
