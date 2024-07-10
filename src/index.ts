import { buildQuantumGameServer } from "quantum-game-server-sdk";

const quantumGameServer = buildQuantumGameServer();

quantumGameServer.on("connect", () => {
  console.log("CONNECTED!!!!", quantumGameServer.qsGSServerId);
});

quantumGameServer.on("player-connected", () => {
  console.log("sadasdsa");
});
quantumGameServer.on('generic-message', (message) => {
  console.log(message, 11112222, "This is iT!");
  // quantumGameServer.sendGenericMessage({
  //   data: 'asdasdasd'
  // });
})

quantumGameServer.on("connect", () => {
  quantumGameServer.sendGenericMessage({
    data: "asdasdasd",
  });
});

quantumGameServer.start();
