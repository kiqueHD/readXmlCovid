<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    document.write(<canvas id="covidChart"></canvas>);

async function loadXML() {
    try {
        const response = await fetch("xmlCovid.xml");
        const text = await response.text();
        console.log("Se ha cargado");
        // Parsear el XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");
        console.log("Parseado");
        // Extraer registros y filtrar solo Andorra
        let casesByDate = [];
        const records = xmlDoc.getElementsByTagName("record");

        for (let record of records) {
            let country = record.getElementsByTagName("countriesAndTerritories")[0].textContent;
            if (country === "Andorra") {
                let date = record.getElementsByTagName("dateRep")[0].textContent;
                let cases = parseInt(record.getElementsByTagName("cases")[0].textContent);
                casesByDate.push({ date, cases });
            }
        }

        // Ordenar por fecha (de más antiguo a más reciente)
        casesByDate.sort((a, b) => new Date(a.date.split('/').reverse().join('-')) - new Date(b.date.split('/').reverse().join('-')));

        // Extraer fechas y casos ordenados
        const labels = casesByDate.map(entry => entry.date);
        const casesData = casesByDate.map(entry => entry.cases);

        // Crear gráfico con Chart.js
        const ctx = document.getElementById('covidChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Casos diarios en Andorra',
                    data: casesData,
                    borderColor: 'blue',
                    backgroundColor: 'rgba(0, 0, 255, 0.2)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: { title: { display: true, text: "Fecha" } },
                    y: { title: { display: true, text: "Casos" }, beginAtZero: true }
                }
            }
        });

    } catch (error) {
        console.error("Error cargando el archivo XML:", error);
    }
}

loadXML();