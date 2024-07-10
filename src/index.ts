import {
  BaseMessage,
  TickType,
  ToGSGenericMessage,
  buildQuantumGameServer,
} from "quantum-game-server-sdk";

type OurStateField = {
  messagesSent: number;
};

const tick: TickType<
  {
    newField?: OurStateField;
  },
  BaseMessage
> = async (gameInstance, gameServer) => {
  
  if (!gameInstance.state.newField) {
    gameInstance.state.newField = {
      messagesSent: 0,
    };
  }

  if(gameInstance.messages.length){
    gameInstance.state.newField.messagesSent += gameInstance.messages.length;
    // const aaa = await gameServer.getConnectedPlayers(gameInstance.players.map(p => p.id));
    
    const oldMessages = gameInstance.messages as ToGSGenericMessage[];
    const newMessages = oldMessages.map((m) => { 
      return {
      data: m.data,
      playerId: m.playerId
    }});
    

    gameInstance.players.forEach((p) => {
      gameServer.sendMessage({
        gameInstanceId: gameInstance.id,
        playerId: p.id,
        type: "generic-message",
        data: newMessages
      })
    })


  }

  // console.log(gameInstance.id, gameInstance.state.newField.messagesSent);
  return gameInstance.state;
};

const quantumGameServer = buildQuantumGameServer({
  tick,
  loopRate: 30
});

quantumGameServer.start();
