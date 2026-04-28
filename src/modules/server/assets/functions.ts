
import dayjs, { unix } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";

dayjs.extend(relativeTime);

export const getSkinImageURL = (id: number) => {
  const ERROR_ASSET_URL = "https://media.discordapp.net/attachments/694311001696370739/1207958001911341066/error.png?ex=65e1898e&is=65cf148e&hm=1361327facf94b4b42803986caf9ec0405dd64382e11f1ba05c5532bb6936dc1";

  if (!id || id < 0) {
      return ERROR_ASSET_URL; // Retorna la URL de error si `id` no es válido
  }

  return `https://assets.open.mp/assets/images/skins/${id}.png`;
};



export const genCode = (length: number) => Array(length).fill('').map(() => Math.random().toString(36).charAt(2)).join('');


export const generateUserId = (length: number) => Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");


export const Sleep = (ms: number): Promise<void> => {
    return new Promise<void>((resolve) => {
      setTimeout(() => { resolve() }, ms);
    });
};


export const formatDate = (date: number) => {
  const unixDate = unix(date / 1000 | 0);
  
  return unixDate.format("DD/MM/YYYY - HH:mm a");
};


export const getTimeAgo = (timestamp: number) => {
  return dayjs(timestamp).fromNow();
}