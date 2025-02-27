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

        
       
    } catch (error) {
        console.error("Error cargando el archivo XML:", error);
    }
}

loadXML();