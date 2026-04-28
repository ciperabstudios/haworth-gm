import __module from "module";
import fetch from "node-fetch";

const __load = __module._load;
__module._load = function (request) {
  if (request === "process" || request === "node:process")
    return global.process;
  return __load.apply(this, arguments);
};

global.fetch = fetch;