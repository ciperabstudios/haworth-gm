import Command from "@commands/Command";
import { Player } from "@infernus/core";
import { Colors, Darken } from "../colors";
import levenshteinDistance from "@utils/levenshteinDistance";

export const SendSplitMessage = (player: Player, color: string | number, message: string) => {
    const MAX_MESSAGE_LENGTH = 118;
    const messageLength = message.length;

    if (messageLength <= MAX_MESSAGE_LENGTH) {
        player.sendClientMessage(color, message);
        return true;
    }

    const maxMessageLength = MAX_MESSAGE_LENGTH;

    let startPos = 0;
    let endPos = maxMessageLength;
    let lastColor = color;
    const result = true;

    while (startPos < messageLength) {
        let tempMessage = message.slice(startPos, endPos);

        // Ensure the message doesn't cut off in the middle of a word
        if (endPos < messageLength && message[endPos] !== ' ') {
            const lastSpace = tempMessage.lastIndexOf(' ');
            if (lastSpace !== -1) {
                tempMessage = tempMessage.slice(0, lastSpace);
                endPos = startPos + lastSpace;
            }
        }

        // Send the message
        //const fullMessage = startPos === 0 ? `${nameAndPrefix}${tempMessage}` : tempMessage;
        player.sendClientMessage(lastColor, tempMessage);

        // Update positions for the next chunk
        startPos = endPos + 1;
        endPos = startPos + maxMessageLength;

        // Preserve the color for the next message part
        lastColor = color;
    }

    return result;
};

export const SendSplitMessage2 = (player: Player, actor: string, color: string, message: string) => {
  const MAX_MESSAGE_LENGTH = 118;
  const messageLength = message.length;

  if (messageLength <= MAX_MESSAGE_LENGTH) {
      player.sendClientMessage(color, message);
      return true;
  }

  const nameAndPrefix = `${actor} dice: `;
  const prefixLength = nameAndPrefix.length;
  const maxMessageLength = MAX_MESSAGE_LENGTH - prefixLength;

  let startPos = 0;
  let endPos = maxMessageLength;
  let lastColor = color;
  const result = true;

  while (startPos < messageLength) {
      let tempMessage = message.slice(startPos, endPos);

      // Ensure the message doesn't cut off in the middle of a word
      if (endPos < messageLength && message[endPos] !== ' ') {
          const lastSpace = tempMessage.lastIndexOf(' ');
          if (lastSpace !== -1) {
              tempMessage = tempMessage.slice(0, lastSpace);
              endPos = startPos + lastSpace;
          }
      }

      // Send the message
      const fullMessage = startPos === 0 ? `${tempMessage}` : tempMessage;
      player.sendClientMessage(lastColor, fullMessage);

      // Update positions for the next chunk
      startPos = endPos + 1;
      endPos = startPos + maxMessageLength;

      // Preserve the color for the next message part
      lastColor = color;
  }

  return result;
};

export const ClearChat = (player: Player, lines = 20) => {
  
      for (let i = 0; i < lines; i++) player.sendClientMessage(Colors.White, "");
    
      return true;
};


export const ProximityDetector = ({ radius, player, color, message }: { radius: number; player: Player; color: string; message: string; }) => {
  const { x, y, z } = player.getPos();

  const colorShades = [0, 10, 20, 35].map(amount => Darken(color, amount));
  const radiusChances = [radius/8, radius/4, radius/2, radius];

  //SendSplitMessage(player, colorShades[0], message);

  for (const p of Player.getInstances()) {

    if (/*p === player || */p.getVirtualWorld() !== player.getVirtualWorld()) continue;

    const closestRadiusIndex = radiusChances.findIndex(rad => p.isInRangeOfPoint(rad, x, y, z));

    if (closestRadiusIndex !== -1) {
      SendSplitMessage(p, colorShades[p === player ? 0 : closestRadiusIndex], message);
    }

  }

};

export const ProximityDetector2 = ({ radius, player, actor, color, message }: { radius: number; player: Player; actor: string; color: string; message: string; }) => {
  const { x, y, z } = player.getPos();

  const colorShades = [0, 10, 20, 35].map(amount => Darken(color, amount));
  const radiusChances = [radius/8, radius/4, radius/2, radius];

  SendSplitMessage2(player, actor, colorShades[0], message);

  for (const p of Player.getInstances()) {

    if (p === player || p.getVirtualWorld() !== player.getVirtualWorld()) continue;

    const closestRadiusIndex = radiusChances.findIndex(rad => p.isInRangeOfPoint(rad, x, y, z));

    if (closestRadiusIndex !== -1) {
      SendSplitMessage2(p, actor, colorShades[closestRadiusIndex], message);
    }

  }

};


export const correctCommand = async (input: string): Promise<string> => {
  const inputCommand = input.trim().toLowerCase();
  
  const suggestion = Command.getCommands().find(cmd => levenshteinDistance(inputCommand, cmd.name.toLowerCase()) <= 2);  

  return suggestion ? `Comando incorrecto. ¿Quisiste decir "/${suggestion.name}"?` : "Comando no reconocido.";
};