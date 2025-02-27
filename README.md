# readXmlCovid
Given a xml file read and put into a chart the data of Andorra covid cases.
https://data.europa.eu/data/datasets/covid-19-coronavirus-data?locale=es

usar fetch para 
blocked by CORS policy: Cross origin requests are only supported for protocol schemes: chrome, chrome-extension, chrome-untrusted, data, http, https, isolated-app.

error reading xml, cahtgpt sol

Step-by-Step Solution:
Create a Local Web Server: Since you're loading files from the local system (using the file:// protocol), the browser doesn't allow that due to CORS restrictions. You need to serve your files through an HTTP server. You can use simple tools like http-server or live-server.

Here's how to use http-server:

Install http-server globally:
If you don't have Node.js installed, you can download and install it from here.
After installing Node.js, open a terminal (or command prompt) and install http-server globally:
bash
Copia
npm install -g http-server
Start the Local Server:

In the terminal, navigate to the folder where your index.html and xmlCovid.xml files are located.
bash
Copia
cd path/to/your/folder
Start the server by running:
bash
Copia
http-server
This will start a local server, and it will give you a URL like http://127.0.0.1:8080. You can access your index.html by going to that URL in your browser.
Update the fetch() URL: Your current fetch() call is:

javascript
Copia
const response = await fetch("xmlCovid.xml");
With the local server running, the file xmlCovid.xml will be accessible via http://127.0.0.1:8080/xmlCovid.xml. So you can keep the same path in your fetch() call as long as you're running the local server, and the browser will be able to access it correctly.

Test Your Page: After starting the server, open your browser and go to the URL provided by the http-server (e.g., http://127.0.0.1:8080). Your page should now be able to load the xmlCovid.xml file and render the chart correctly.

Additional Notes:
CORS Policy: By serving the files through an HTTP server, you are bypassing the CORS issue because the browser will treat requests to http://127.0.0.1:8080 as local and allow them.
Live Server Alternative: If you prefer, you can use another tool called Live Server for a similar effect. Both tools will work in the same way.