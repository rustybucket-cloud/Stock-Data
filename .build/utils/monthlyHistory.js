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
  MonthHistory: () => MonthHistory,
  convertResponseData: () => convertResponseData,
  monthlyHistory: () => monthlyHistory
});
var import_axios = __toModule(require("axios"));
class MonthHistory {
  data;
  constructor(data) {
    this.data = data;
  }
  high() {
    let highestValue = { price: 0, date: "" };
    this.data.forEach((month) => {
      if (month.high > highestValue.price) {
        highestValue.price = month.high;
        highestValue.date = month.date;
      }
    });
    return highestValue;
  }
  low() {
    let lowestValue = { price: 1e8, date: "" };
    this.data.forEach((month) => {
      if (month.low < lowestValue.price) {
        lowestValue.price = month.low;
        lowestValue.date = month.date;
      }
    });
    return lowestValue;
  }
  start() {
    const startMonth = this.data[this.data.length - 1];
    return {
      price: startMonth.open,
      date: startMonth.date
    };
  }
  end() {
    const endMonth = this.data[0];
    return {
      price: endMonth.close,
      date: endMonth.date
    };
  }
  average() {
    const numberOfMonths = this.data.length;
    let total = 0;
    this.data.forEach((month) => {
      total += month.close;
    });
    return (total / numberOfMonths).toFixed(2);
  }
  largestChange() {
    let largestChange = { change: 0, date: "" };
    this.data.forEach((month, i) => {
      const change = month.close - month.open;
      const difference = Math.abs(change);
      if (difference > Math.abs(largestChange.change)) {
        largestChange.change = change;
        largestChange.date = month.date;
      }
    });
    return largestChange;
  }
  calculatePastInvestment({ amount, start, end }) {
    let startPrice = 0;
    let endPrice = 0;
    this.data.forEach((month) => {
      if (month.date === start)
        startPrice = month.open;
      if (month.date === end)
        endPrice = month.close;
    });
    if (!startPrice || !endPrice)
      return 0;
    const sharesOwned = amount / startPrice;
    const endValue = sharesOwned * endPrice;
    return endValue;
  }
}
function convertResponseData(data) {
  let monthObject = [];
  const months = data["Monthly Time Series"];
  for (const [key, value] of Object.entries(months)) {
    const date = new Date(key);
    const month = date.getMonth() + 1;
    let monthString = month.toString();
    if (monthString.length === 1)
      monthString = `0${month}`;
    const dateString = `${monthString}/${date.getFullYear()}`;
    const object = {
      date: dateString,
      open: parseFloat(value["1. open"]),
      close: parseFloat(value["4. close"]),
      low: parseFloat(value["3. low"]),
      high: parseFloat(value["2. high"]),
      volume: parseFloat(value["5. volume"])
    };
    monthObject.push(object);
  }
  return monthObject;
}
async function monthlyHistory(stock) {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${stock}&apikey=${process.env["API_KEY"]}`;
  const res = await import_axios.default.get(url);
  const data = convertResponseData(res.data);
  const history = new MonthHistory(data);
  return history;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MonthHistory,
  convertResponseData,
  monthlyHistory
});
//# sourceMappingURL=monthlyHistory.js.map
