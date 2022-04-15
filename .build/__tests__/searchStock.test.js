var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
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
var import_searchStock = __toModule(require("../utils/searchStock"));
jest.mock("./searchStock.ts");
const mockData = [
  {
    "1. symbol": "APLE",
    "2. name": "Apple Hospitality REIT Inc",
    "3. type": "Equity",
    "4. region": "United States",
    "5. marketOpen": "09:30",
    "6. marketClose": "16:00",
    "7. timezone": "UTC-04",
    "8. currency": "USD",
    "9. matchScore": "0.8889"
  },
  {
    "1. symbol": "AAPL",
    "2. name": "Apple Inc",
    "3. type": "Equity",
    "4. region": "United States",
    "5. marketOpen": "09:30",
    "6. marketClose": "16:00",
    "7. timezone": "UTC-04",
    "8. currency": "USD",
    "9. matchScore": "0.7143"
  },
  {
    "1. symbol": "AAPL34.SAO",
    "2. name": "Apple Inc",
    "3. type": "Equity",
    "4. region": "Brazil/Sao Paolo",
    "5. marketOpen": "10:00",
    "6. marketClose": "17:30",
    "7. timezone": "UTC-03",
    "8. currency": "BRL",
    "9. matchScore": "0.7143"
  },
  {
    "1. symbol": "APC.DEX",
    "2. name": "Apple Inc",
    "3. type": "Equity",
    "4. region": "XETRA",
    "5. marketOpen": "08:00",
    "6. marketClose": "20:00",
    "7. timezone": "UTC+02",
    "8. currency": "EUR",
    "9. matchScore": "0.7143"
  },
  {
    "1. symbol": "APC.FRK",
    "2. name": "Apple Inc",
    "3. type": "Equity",
    "4. region": "Frankfurt",
    "5. marketOpen": "08:00",
    "6. marketClose": "20:00",
    "7. timezone": "UTC+02",
    "8. currency": "EUR",
    "9. matchScore": "0.7143"
  },
  {
    "1. symbol": "AGPL",
    "2. name": "Apple Green Holding Inc",
    "3. type": "Equity",
    "4. region": "United States",
    "5. marketOpen": "09:30",
    "6. marketClose": "16:00",
    "7. timezone": "UTC-04",
    "8. currency": "USD",
    "9. matchScore": "0.6667"
  },
  {
    "1. symbol": "0R2V.LON",
    "2. name": "Apple Inc.",
    "3. type": "Equity",
    "4. region": "United Kingdom",
    "5. marketOpen": "08:00",
    "6. marketClose": "16:30",
    "7. timezone": "UTC+01",
    "8. currency": "USD",
    "9. matchScore": "0.6667"
  },
  {
    "1. symbol": "APRU",
    "2. name": "Apple Rush Company Inc",
    "3. type": "Equity",
    "4. region": "United States",
    "5. marketOpen": "09:30",
    "6. marketClose": "16:00",
    "7. timezone": "UTC-04",
    "8. currency": "USD",
    "9. matchScore": "0.4444"
  },
  {
    "1. symbol": "500014.BSE",
    "2. name": "Apple Finance Limited",
    "3. type": "Equity",
    "4. region": "India/Bombay",
    "5. marketOpen": "09:15",
    "6. marketClose": "15:30",
    "7. timezone": "UTC+5.5",
    "8. currency": "INR",
    "9. matchScore": "0.3846"
  },
  {
    "1. symbol": "603020.SHH",
    "2. name": "Apple Flavor Fragrance Group Company Ltd",
    "3. type": "Equity",
    "4. region": "Shanghai",
    "5. marketOpen": "09:30",
    "6. marketClose": "15:00",
    "7. timezone": "UTC+08",
    "8. currency": "CNY",
    "9. matchScore": "0.2222"
  }
];
test("Return the stock symbol from the selected stock", () => {
  const validSelection = "Apple Inc";
  const invalidSelection = "tesla inc";
  const options = mockData;
  const validResponseValue = "AAPL";
  const invalidResponseValue = "Stock not found";
  const validSearchValue = (0, import_searchStock.selectStockFromOptions)(options, validSelection);
  const invalidSearchValue = (0, import_searchStock.selectStockFromOptions)(options, invalidSelection);
  expect(validSearchValue).toBe(validResponseValue);
  expect(invalidSearchValue).toBe(invalidResponseValue);
});
//# sourceMappingURL=searchStock.test.js.map
