/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => CoderPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");

// Base64.ts
var Base64Encoder = class {
  constructor() {
    this.from = "text";
    this.to = "base64";
  }
  transform(text) {
    return btoa(text);
  }
  checkInput(text) {
    return typeof text === "string" && text.length > 0;
  }
};
var Base64Decoder = class {
  constructor() {
    this.from = "base64";
    this.to = "text";
  }
  transform(text) {
    try {
      return atob(text);
    } catch (e) {
      throw new Error("Invalid Base64 input");
    }
  }
  checkInput(text) {
    const base64Regex = /^[A-Za-z0-9+/=]+$/;
    return typeof text === "string" && base64Regex.test(text) && text.length % 4 === 0;
  }
};

// Base85.ts
var Base85Encoder = class {
  constructor() {
    this.from = "text";
    this.to = "base85";
  }
  transform(text) {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(text);
    let base85 = "";
    for (let i = 0; i < bytes.length; i += 4) {
      let chunk = 0;
      for (let j = 0; j < 4; j++) {
        chunk = chunk << 8 | (bytes[i + j] || 0);
      }
      for (let j = 4; j >= 0; j--) {
        base85 += String.fromCharCode(chunk / 85 ** j % 85 + 33);
      }
    }
    return base85;
  }
  checkInput(text) {
    return typeof text === "string" && text.length > 0;
  }
};
var Base85Decoder = class {
  constructor() {
    this.from = "base85";
    this.to = "text";
  }
  transform(text) {
    if (!this.checkInput(text)) {
      throw new Error("Invalid Base85 input");
    }
    const decoder = new TextDecoder();
    const chunks = text.match(/.{1,5}/g) || [];
    const bytes = [];
    for (const chunk of chunks) {
      let value = 0;
      for (let i = 0; i < chunk.length; i++) {
        value = value * 85 + (chunk.charCodeAt(i) - 33);
      }
      for (let i = 3; i >= 0; i--) {
        bytes.push(value >> i * 8 & 255);
      }
    }
    return decoder.decode(new Uint8Array(bytes).filter((byte) => byte !== 0));
  }
  checkInput(text) {
    return true;
  }
};

// Rot13.ts
var Rot13Encoder = class {
  constructor() {
    this.from = "text";
    this.to = "rot13";
  }
  rot13(txt) {
    return txt.replace(/[a-z]/gi, (c) => "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm"["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".indexOf(c)]);
  }
  transform(text) {
    return this.rot13(text);
  }
  checkInput(text) {
    return true;
  }
};
var Rot13Decoder = class {
  constructor() {
    this.from = "rot13";
    this.to = "text";
  }
  derot13(txt) {
    return txt.replace(/[a-z]/gi, (c) => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"["NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm".indexOf(c)]);
  }
  transform(text) {
    return this.derot13(text);
  }
  checkInput(text) {
    return true;
  }
};

// Atbash.ts
var AtbashEncoder = class {
  constructor() {
    this.from = "text";
    this.to = "atbash";
  }
  atbash(txt) {
    return txt.replace(/[a-z]/gi, (c) => "ZYXWVUTSRQPONMLKJIHGFEDCBAzyxwvutsrqponmlkjihgfedcba"["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".indexOf(c)]);
  }
  transform(text) {
    return this.atbash(text);
  }
  checkInput(text) {
    return true;
  }
};
var AtbashDecoder = class {
  constructor() {
    this.from = "atbash";
    this.to = "text";
  }
  deatbash(txt) {
    return txt.replace(/[a-z]/gi, (c) => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"["ZYXWVUTSRQPONMLKJIHGFEDCBAzyxwvutsrqponmlkjihgfedcba".indexOf(c)]);
  }
  transform(text) {
    return this.deatbash(text);
  }
  checkInput(text) {
    return true;
  }
};

// main.ts
var CoderPlugin = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    // List of coders
    this.coders = [
      new Base64Encoder(),
      new Base64Decoder(),
      new Base85Encoder(),
      new Base85Decoder(),
      new Rot13Encoder(),
      new Rot13Decoder(),
      new AtbashEncoder(),
      new AtbashDecoder()
    ];
  }
  async onload() {
    this.coders.forEach((coder) => {
      this.registerMarkdownCodeBlockProcessor(
        `transform-${coder.from}-${coder.to}`,
        async (content, el, ctx) => {
          this.processText(content, el, coder);
        }
      );
    });
  }
  // function to get a coder by from and to types
  getCoder(from, to) {
    return this.coders.find((coder) => coder.from === from && coder.to === to) || null;
  }
  onunload() {
  }
  processText(content, el, coder) {
    var destination;
    if (content.endsWith("\n")) {
      content = content.substring(0, content.length - 1);
    }
    if (coder != null) {
      if (coder.checkInput(content)) {
        destination = document.createTextNode(coder.transform(content));
      } else {
        destination = document.createTextNode("Invalid input for coder " + coder.from + " to " + coder.to);
      }
    } else {
      destination = document.createTextNode("No coder found!");
    }
    el.appendChild(destination);
    return;
  }
};

/* nosourcemap */