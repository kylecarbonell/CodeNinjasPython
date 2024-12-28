
# Python Tracker App

A fully functional online Integrated Development Environment (IDE) designed to help students learn Python programming by writing, running, and testing their code directly from the web.

## Link
[Visit Python Tracker](#) *(Replace `#` with the actual link to your app)*

---

## Technologies Used

- **React.js**: Used for designing and developing the frontend of the application to create a dynamic, responsive user interface.
- **Express.js**: Utilized for building the backend of the app to handle user requests and facilitate interaction with the Python compiler.
- **Python API**: Designed and implemented a custom Python API to act as the Python compiler for running code in real-time.
- **Node.js**: Backend server environment running Express.js.
- **Vercel**: Deployed the application for public access.

---

## Features

- **Code Writing**: Write Python code directly in the web interface, with syntax highlighting and real-time feedback.
- **Real-time Compilation**: Code is compiled and executed on the server, allowing students to see the output of their Python code instantly.
- **Python Compiler**: A fully functional Python compiler integrated into the app, enabling students to run their Python scripts on demand.
- **User-friendly Interface**: A simple and clean user interface built with React.js, designed to be intuitive for new learners.
- **Backend Powered by Express**: The backend server, built with Express.js, processes requests and interacts with the Python API to execute code.

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/python-tracker-app.git
   ```

2. **Navigate into the project directory**:
   ```bash
   cd python-tracker-app
   ```

3. **Install the dependencies for both frontend and backend**:

   - **Frontend (React)**:
     ```bash
     cd frontend
     npm install
     ```

   - **Backend (Express)**:
     ```bash
     cd ../backend
     npm install
     ```

4. **Run the backend server**:
   ```bash
   npm start
   ```

5. **Run the frontend development server**:
   ```bash
   cd ../frontend
   npm start
   ```

---

## Usage

1. **Navigate to the app**: Open Python Tracker in your web browser.
2. **Write your Python code**: Use the editor to write Python code in the provided text area.
3. **Run the code**: After writing your code, press the "Run" button to compile and execute your Python script.
4. **View output**: The output of your code will be displayed below the editor in real-time.

---

## Example

Write a simple Python script to print "Hello, World!":

```python
print("Hello, World!")
```

Click the "Run" button, and you will see the output below:

```
Hello, World!
```

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Make your changes.
4. Commit your changes:
   ```bash
   git commit -am 'Add new feature'
   ```
5. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
6. Open a pull request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
