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
var import_monthlyHistory = __toModule(require("../utils/monthlyHistory"));
const mockData = [
  {
    date: "03/2022",
    open: 100,
    close: 110,
    high: 120,
    low: 90,
    volume: 1e3
  },
  {
    date: "02/2022",
    open: 80,
    close: 90,
    high: 110,
    low: 70,
    volume: 1e3
  },
  {
    date: "01/2022",
    open: 70,
    close: 80,
    high: 100,
    low: 70,
    volume: 1e3
  },
  {
    date: "12/2021",
    open: 50,
    close: 70,
    high: 100,
    low: 50,
    volume: 1e3
  }
];
const mockObject = new import_monthlyHistory.MonthHistory(mockData);
test("Calculates the average", () => {
  const expectedValue = 87.5;
  const actualValue = mockObject.average();
  expect(actualValue).toBe(actualValue);
});
test("Calculate high and low", () => {
  const expectedLow = { "date": "12/2021", price: 50 };
  const expectedHigh = { "date": "03/2022", price: 120 };
  const actualHigh = mockObject.high();
  const actualLow = mockObject.low();
  expect(actualHigh).toEqual(expectedHigh);
  expect(actualLow).toEqual(expectedLow);
});
test("Get the start and end", () => {
  const expectedStart = { price: 50, date: "12/2021" };
  const expectedEnd = { price: 110, date: "03/2022" };
  const actualStart = mockObject.start();
  const actualEnd = mockObject.end();
  expect(actualStart).toEqual(expectedStart);
  expect(actualEnd).toEqual(expectedEnd);
});
test("Find the month with the highest change of price", () => {
  const expectedValue = { change: 20, date: "12/2021" };
  const actualValue = mockObject.largestChange();
  expect(actualValue).toEqual(expectedValue);
});
test("Calculate the value that an investment would have had", () => {
  const validStartingInvestment = 1e4;
  const validStartMonth = "12/2021";
  const validEndMonth = "03/2022";
  const expectedValidEndValue = 22e3;
  const actualValue = mockObject.calculatePastInvestment({ amount: validStartingInvestment, start: validStartMonth, end: validEndMonth });
  expect(actualValue).toBe(expectedValidEndValue);
});
test("Convert data from request", () => {
  const mockRequest = {
    "Monthly Time Series": {
      "2022-03-31": {
        "1. open": "100",
        "2. high": "120",
        "3. low": "90",
        "4. close": "110",
        "5. volume": "1000"
      },
      "2022-02-28": {
        "1. open": "80",
        "2. high": "110",
        "3. low": "70",
        "4. close": "90",
        "5. volume": "1000"
      },
      "2022-01-31": {
        "1. open": "70",
        "2. high": "100",
        "3. low": "70",
        "4. close": "80",
        "5. volume": "1000"
      },
      "2021-12-31": {
        "1. open": "50",
        "2. high": "100",
        "3. low": "50",
        "4. close": "70",
        "5. volume": "1000"
      }
    }
  };
  const expectedValue = mockData;
  const actualValue = (0, import_monthlyHistory.convertResponseData)(mockRequest);
  expect(actualValue).toEqual(expectedValue);
});
//# sourceMappingURL=monthlyHistory.test.js.map
