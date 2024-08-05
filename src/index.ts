import { QuantumGameServer, buildSocketServer } from 'quantum-game-server-sdk';



const quantumGameServer = buildSocketServer();


quantumGameServer.start();


quantumGameServer.observable.subscribe((a) => {
  console.log(1111, a)
})
