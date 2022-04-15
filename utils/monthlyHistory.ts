import axios from "axios";

type PriceData = {
  price: number,
  date: string
}

type MonthData = {
  date: string,
  open: number,
  high: number,
  low: number,
  close: number,
  volume: number
}

interface RequestData {
  "Monthly Time Series" : {
    [key: string]: {
      "1. open": string,
      "2. high": string,
      "3. low": string,
      "4. close": string,
      "5. volume": string
    }
  }
}

export class MonthHistory {
  private data: MonthData[]

  constructor(data: MonthData[]) {
    this.data = data
  }

  high() : PriceData {
    let highestValue = { price: 0, date: "" }
    this.data.forEach(month => {
      if (month.high > highestValue.price) {
        highestValue.price = month.high
        highestValue.date = month.date
      }
    })
    return highestValue
  }
  
  low() : PriceData {
    let lowestValue = { price: 100000000, date: "" }
    this.data.forEach(month => {
      if (month.low < lowestValue.price) {
        lowestValue.price = month.low
        lowestValue.date = month.date
      }
    })
    return lowestValue
  }

  start() : PriceData {
    const startMonth = this.data[this.data.length - 1]
    return {
      price: startMonth.open,
      date: startMonth.date
    }
  }

  end() : PriceData {
    const endMonth = this.data[0]
    return {
      price: endMonth.close,
      date: endMonth.date
    }
  }

  average() : string {
    const numberOfMonths = this.data.length
    let total = 0
    this.data.forEach(month => {
      total += month.close
    })
    return (total / numberOfMonths).toFixed(2)
  }

  largestChange(): { change: number, date: string } {
    let largestChange = { change: 0, date: "" }
    this.data.forEach((month, i) => {
      const change = month.close - month.open
      const difference = Math.abs(change)
      if(difference > Math.abs(largestChange.change)) {
        largestChange.change = change
        largestChange.date = month.date
      }
    })
    return largestChange
  }

  calculatePastInvestment({amount, start, end} : { amount: number, start: string, end: string | null }) : number {
    let startPrice = 0
    let endPrice = 0
    this.data.forEach((month) => {
      if (month.date === start) startPrice = month.open
      if (month.date === end) endPrice = month.close
    })
    if (!startPrice || !endPrice) return 0 
    const sharesOwned = amount / startPrice
    const endValue = sharesOwned * endPrice
    return endValue
  }
}

export function convertResponseData(data: RequestData) : MonthData[] {
  let monthObject = []
  const months = data["Monthly Time Series"]
  for (const [key, value] of Object.entries(months)) {
    const date = new Date(key)
    const month = date.getMonth() + 1
    let monthString = month.toString()
    if (monthString.length === 1) monthString = `0${month}`
    const dateString = `${monthString}/${date.getFullYear()}`
    const object = {
      date: dateString,
      open: parseFloat(value["1. open"]),
      close: parseFloat(value["4. close"]),
      low: parseFloat(value["3. low"]),
      high: parseFloat(value["2. high"]),
      volume: parseFloat(value["5. volume"])
    }
    monthObject.push(object)
  }
  return monthObject
}

export async function monthlyHistory(stock : string) : Promise<MonthHistory> {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${stock}&apikey=${process.env['API_KEY']}`
  const res = await axios.get(url)
  const data = convertResponseData(res.data)
  const history = new MonthHistory(data)
  return history
}