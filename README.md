# Currency Converter

A simple, modern, and beginner-friendly currency converter web application built with HTML5, CSS3, and Vanilla JavaScript.

## Features

- Convert amounts between different currencies
- Real-time conversion with live exchange rates (using a static dataset for demonstration)
- Swap button to easily switch between currencies
- Input validation for amount (positive numbers only)
- Responsive design for mobile, tablet, and desktop
- Clear error messages and loading states
- Accessible and user-friendly interface

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript

## How It Works

1. The user enters an amount in the input field.
2. The user selects the source and target currencies from the dropdowns.
3. When the "Convert" button is clicked, the application:
   - Validates the input amount
   - Fetches the latest exchange rates (from a static dataset in this demo)
   - Calculates the converted amount
   - Displays the result with the exchange rate used
4. The "Swap" button allows the user to quickly switch the source and target currencies.

## Project Structure

```
Currency-Converter/
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to Run

1. Clone or download this repository.
2. Open the `index.html` file in your web browser.
3. The application is ready to use.

## API Information

This demo application uses a static exchange rate dataset for demonstration purposes. In a real-world application, you would replace the static data with a call to a reliable exchange rate API such as:
- [exchangerate.host](https://exchangerate.host/)
- [Frankfurter.app](https://www.frankfurter.app/)
- [ExchangeRate-API](https://www.exchangerate-api.com/)

**Note:** To use a live API, you would need to:
1. Obtain an API key (if required by the service)
2. Replace the `fetchExchangeRates` function in `script.js` with an actual API call
3. Handle the API response format accordingly

Since this is a frontend-only project for educational purposes, we've used static rates to avoid API key exposure and network dependencies.

## Future Improvements

- Integrate with a live exchange rate API
- Add more currencies
- Implement conversion history
- Add favorite currencies feature
- Implement dark mode toggle
- Add offline support using service workers
- Improve accessibility features
- Add currency flags or icons

## Author

**Reniel Demafelis**

Bachelor of Science in Information Technology
Central Philippines State University – Moises Padilla Campus
