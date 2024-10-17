# ZipCollate

ZipCollate is a web application designed to efficiently compare two ZIP files, helping users quickly identify identical, missing, or different files. This repository contains the frontend of the application, built using React and styled with Tailwind CSS.

## Features

- **Fast and Efficient Comparison**: Utilizes xxHash for rapid file comparison
- **Side-by-Side Comparison**: View results displaying files that are:
  - Identical (same content in both ZIPs)
  - Missing (present in only one ZIP)
  - Different (present in both but with different content)
- **Password-Protected ZIP Support**: Input passwords for protected ZIP files
- **Optional File Type Exclusion**: Exclude specific file types from comparison via dropdown selection
- **Downloadable Comparison Summary**: Generate and download a detailed report of the comparison results
- **User-Friendly Design**: Intuitive interface for easy navigation and use
- **Detailed File Information**: Displays file names, sizes, and comparison status

## User Interface

- The results are displayed in a side-by-side view, showing the contents of both ZIP files.
- Each file is color-coded for easy identification:
  - Green: Identical files
  - Blue: Files present only in one ZIP
  - Yellow: Files present in both ZIPs but with different content
- File sizes are displayed next to each file name.
- Users can hover over or click on file names for more detailed information.

## Live Demo

The application is currently deployed and can be accessed at [https://zipcollate.netlify.app/](https://zipcollate.netlify.app/).

## Installation and Local Setup

To run the frontend locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Preterno/ZipCollate.git
   cd ZipCollate
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root directory and add the following variables:
   ```
   VITE_APP_API_URL=<your_api_url>
   VITE_API_KEY=<your_api_key>
   ```
   Replace `<your_api_url>` with the URL of your backend API and `<your_api_key>` with your API key.

4. **Run the Project**:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`.

## Local Development

For local development, you'll need to set up both the frontend and backend:

1. **Backend Setup**:
   - Clone the backend repository: 
     ```bash
     git clone https://github.com/Preterno/ZipCollateAPI.git
     cd ZipCollateAPI
     ```
   - Install the required Python packages:
     ```bash
     pip install -r requirements.txt
     ```
   - Set up a `.env` file with your `API_KEY`
   - Run the Flask application:
     ```bash
     python app.py
     ```

2. **Frontend Setup**:
   - In your `.env` file, set `VITE_APP_API_URL` to your local backend URL (e.g., `http://localhost:5000`).
   - Ensure you have the correct API key set in `VITE_API_KEY`.

3. **Run Both Services**:
   - Start the backend server as described above.
   - In the frontend directory, run `npm start`.

Now you can develop and test the full application locally.

## Backend API

The backend for this project is a separate Flask API, responsible for the core functionality of ZIP file comparison.

- Backend Repository: [https://github.com/Preterno/ZipCollateAPI](https://github.com/Preterno/ZipCollateAPI)
- Deployed Backend: The API is currently deployed on Railways

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Flask, xxHash
- **File Handling**: Python's `zipfile` module
- **Deployment**: Netlify (Frontend), Railways (Backend)

## Connect with Me

Feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/aslam8483).
