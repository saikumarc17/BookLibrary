# Book Library

A dynamic and responsive **Book Library** built with **HTML**,**CSS** and **JavaScript** that fetches Books data from an API and displays them in beautifully designed cards.

## Features

- **Search**: Filter books by title or author using the search bar.
- **Sort**: Sort books by title or published date in ascending or descending order.
- **Pagination**: Navigate through pages of books with customizable items per page.
- **Responsive Design**: The app is designed to work on various screen sizes.

## 🚀 Live Demo

[Click here to check it out!](https://chaicodebooklibaray.netlify.app/)

## 🛠️ Tech Stack

- **HTML5**
- **CSS3 & Bootstrap 5**
- **JavaScript (ES6+)**
- **Fetch API & Async/Await**

## 🔧 Installation

1. **Clone the Repository**

   ```sh
   git clone https://github.com/saikumarc17/BookLibrary.git
   ```

2. **Navigate to the Project Folder**

   ```sh
   cd BookLibrary
   ```

3. **Open `index.html` in a browser**  
   You can simply double-click on the `index.html` file or use Live Server in VS Code.

## API Details

The app fetches data from the following API endpoint:

```
https://api.freeapi.app/api/v1/public/books
```

Parameters:

- `page`: Current page number.
- `limit`: Number of items per page.

## Known Issues

- Ensure the API endpoint is accessible; otherwise, the app may not load data.
- Sorting and pagination rely on the data fetched from the API.

## Future Enhancements

- Add more filters (e.g., by publisher or genre).
- Improve error handling for API failures.
- Enhance the UI/UX for better usability.
