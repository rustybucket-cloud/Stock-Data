import { MonthHistory, convertResponseData } from "../utils/monthlyHistory";

const mockData = [
  {
    date: "03/2022",
    open: 100,
    close: 110,
    high: 120,
    low: 90,
    volume: 1000
  },
  {
    date: "02/2022",
    open: 80,
    close: 90,
    high: 110,
    low: 70,
    volume: 1000
  },
  {
    date: "01/2022",
    open: 70,
    close: 80,
    high: 100,
    low: 70,
    volume: 1000
  },
  {
    date: "12/2021",
    open: 50,
    close: 70,
    high: 100,
    low: 50,
    volume: 1000
  }
]
const mockObject = new MonthHistory(mockData)

test("Calculates the average", () => {
  // arrange
  const expectedValue = 87.50

  // act
  const actualValue = mockObject.average()

  // assertions
  expect(actualValue).toBe(actualValue)
})

test("Calculate high and low", () => {
  // arrange
  const expectedLow = { "date": "12/2021", price: 50 }
  const expectedHigh = { "date": "03/2022", price: 120 }

  // act 
  const actualHigh = mockObject.high()
  const actualLow = mockObject.low()

  // assert
  expect(actualHigh).toEqual(expectedHigh)
  expect(actualLow).toEqual(expectedLow)
})

test("Get the start and end", () => {
  // arrange
  const expectedStart = { price: 50, date: "12/2021" }
  const expectedEnd = { price: 110, date: "03/2022" }

  // act
  const actualStart = mockObject.start()
  const actualEnd = mockObject.end()

  // assert
  expect(actualStart).toEqual(expectedStart)
  expect(actualEnd).toEqual(expectedEnd)
})

test("Find the month with the highest change of price", () => {
  // arrange
  const expectedValue = { change: 20, date: "12/2021" }

  // act
  const actualValue = mockObject.largestChange()

  // assert
  expect(actualValue).toEqual(expectedValue)
})

test("Calculate the value that an investment would have had", () => {
  // arrange
  const validStartingInvestment = 10000
  const validStartMonth = "12/2021"
  const validEndMonth = "03/2022"
  const expectedValidEndValue = 22000

  // act
  const actualValue = mockObject.calculatePastInvestment({amount: validStartingInvestment, start: validStartMonth, end: validEndMonth})

  // assetions
  expect(actualValue).toBe(expectedValidEndValue)
})

test("Convert data from request", () => {
  // arrange
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
  }
  const expectedValue = mockData

  // act
  const actualValue = convertResponseData(mockRequest)

  // arrange
  expect(actualValue).toEqual(expectedValue)
})