var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
__export(exports, {
  createPromptFromMatches: () => createPromptFromMatches,
  request: () => request,
  searchStock: () => searchStock,
  selectStockFromOptions: () => selectStockFromOptions
});
var import_axios = __toModule(require("axios"));
const prompt = require("prompt-sync")();
async function searchStock(search) {
  const matches = await request(search);
  if (matches.length === 0)
    return "No matching stock found";
  else {
    const promptString = createPromptFromMatches(matches);
    let choice;
    choice = prompt(promptString);
    if (choice) {
      const symbol = selectStockFromOptions(matches, choice);
      return symbol;
    } else
      return "Error";
  }
}
const request = async (search) => {
  const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=${process.env["API_KEY"]}`;
  let matches;
  try {
    const data = await import_axios.default.get(url);
    matches = data == null ? void 0 : data.data["bestMatches"];
  } catch (err) {
    console.error(err);
    throw err;
  }
  return matches;
};
function createPromptFromMatches(matches) {
  let string = "Did you mean:\n";
  matches.forEach((match, i) => {
    string += match["2. name"] + "\n";
  });
  string += "$	";
  return string;
}
function selectStockFromOptions(options, selection) {
  let symbol = "Stock not found";
  let isSymbolFound = false;
  options.forEach((option) => {
    if (!isSymbolFound) {
      if (option["2. name"].toLowerCase() === selection.toLowerCase()) {
        symbol = option["1. symbol"];
        isSymbolFound = true;
      }
    }
  });
  return symbol;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createPromptFromMatches,
  request,
  searchStock,
  selectStockFromOptions
});
//# sourceMappingURL=searchStock.js.map
