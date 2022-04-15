import axios from "axios"
import readline from "readline";
const prompt = require('prompt-sync')()

export type Match = {
  "1. symbol": string,
  "2. name": string,
  "3. type": string,
  "4. region": string,
  "5. marketOpen": string,
  "6. marketClose": string,
  "7. timezone": string,
  "8. currency": string,
  "9. matchScore": string
}

type SearchResult = {
  data: {
    "bestMatches": Match[]
  }
}

export async function searchStock(search: string) : Promise<string> {
  const matches = await request(search)
  if (matches.length === 0) return "No matching stock found"
  else {
    const promptString = createPromptFromMatches(matches)
    let choice : string
    choice = prompt(promptString)
    if (choice) {
      const symbol = selectStockFromOptions(matches, choice)
      return symbol 
    } else return "Error"
  }
}

export const request = async (search: string) : Promise<Match[]> => {
  const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=${process.env['API_KEY']}`
  let matches
  try {
    const data : SearchResult = await axios.get(url)
    matches = data?.data["bestMatches"]
  } catch(err) {
    console.error(err)
    throw err
  }
  return matches
}

export function createPromptFromMatches(matches: Match[]) : string {
  let string = "Did you mean:\n"
  matches.forEach((match : Match, i) => {
    string += match["2. name"] + "\n"
  }) 
  string += "$\t"
  return string
}

/**
* Asks user to select the correct stock
* @params {Match[]} options Stocks that were fetched from API
* @returns A string that is the symbol of desired stock
*/
export function selectStockFromOptions(options: Match[], selection : string) : string {
  let symbol = "Stock not found"
  let isSymbolFound = false
  options.forEach((option : Match) => {
    if (!isSymbolFound) {
      if (option['2. name'].toLowerCase() === selection.toLowerCase()) {
        symbol = option['1. symbol']
        isSymbolFound = true
      }
    }
  })
  return symbol
}