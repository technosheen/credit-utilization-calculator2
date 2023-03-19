Credit Utilization App

This app calculates credit utilization using current credit card balance and limit.
Users may add up to 5 credit cards by clicking the '+card' button.
When all information has been added, the total and individual credit usages are calculated.
Individual credit usage is the the percent usage for a single card, while
total credit usage is percentage usage across all credit cards

Credit utilizations greater than 30% will be displayed in red text, since credit bureaus reccomend keeping credit utilization below 30%.

The calculations are derived with the following formulas:

    Individual:
    (balance * 100) / limit

    Total:
    (total balance * 100) / total limit

    EXAMPLE:
    card 1 - balance: 100, limit: 1000
    card 2 - balance: 200, limit: 2400
    card 3 - balance: 300, limit: 4000

    card 1 usage: (100 * 100) / 1000 = 10.00%
    card 2 usage: (200 * 100) / 2400 =  8.33%
    card 3 usage: (300 * 100) / 4000 =  7.50%

    total usage: [(100 + 200 + 300) * 100] / (1000 + 2400 + 4000) = 8.11%


Installation steps
1. git clone git@github.com:kdevay/credit-utilization-calculator.git
2. cd credit-utilization-calculator
3. npm install - install dependencies
4. npm start - run the app in development mode