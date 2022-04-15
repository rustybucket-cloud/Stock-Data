const prompt = require("prompt-sync")()
import { searchStock, Match } from "./utils/searchStock";
import { monthlyHistory } from "./utils/monthlyHistory";

(async function main() {
  const search = prompt("What stock do you want to use?\t")
  const options = await searchStock(search)
  const history = await monthlyHistory(options)
  const action = prompt("View high, view low, view start, view end, view average")
})()