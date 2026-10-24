# Employee Dashboard (React)

A responsive React employee dashboard built with Vite and React Router.

## Features
- Navbar/sidebar navigation for Home and Employee Form.
- Home dashboard fetches employee data from `https://jsonplaceholder.typicode.com/users`.
- Employee table displays ID, name, email, and a demo status.
- Employee form contains Name, Designation, Location, and Salary.
- Form validation and a local preview. As requested, it does not POST data to a server.
- Responsive custom CSS.

## Requirements
Install Node.js (LTS) from https://nodejs.org/ if it is not already installed.

## Run locally
1. Extract the ZIP file.
2. Open the extracted `employee-dashboard` folder in VS Code.
3. Open Terminal in VS Code (`Terminal` → `New Terminal`).
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local URL printed in the terminal (usually `http://localhost:5173`).

## Create a production build
```bash
npm run build
```

## Push to GitHub
Create an empty repository on GitHub, then run these commands in the project folder (replace the URL with your repository URL):

```bash
git init
git add .
git commit -m "Create employee dashboard"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

The employee form is intentionally frontend-only; the preview confirms the entered values locally and does not save them after a page refresh.
