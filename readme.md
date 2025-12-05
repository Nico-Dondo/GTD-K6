# GTD K6 Performance Test

This project contains a k6 script to measure the performance of the **GTD offers page** (`https://contratacion.gtd.cl/ofertas`).

## How to run the test

k6 run gtd.js


## Generate HTML report

Run these commands in the terminal (PowerShell or CMD):

set K6_WEB_DASHBOARD=true
set K6_WEB_DASHBOARD_EXPORT=html-report.html
k6 run gtd.js


After the test finishes, an `html-report.html` file will be generated in the project folder.

## View the HTML report

- Open `html-report.html` in your browser  
  or  
- In VS Code, right‑click the file and select **“Open with Live Server”** (if you have the Live Server extension installed).