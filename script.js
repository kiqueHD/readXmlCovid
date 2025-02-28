/*
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
*/




document.addEventListener("DOMContentLoaded", function () {
    function generarNumeroAleatorio() {
        return Math.floor(Math.random() * 1501); // Número entre 0 y 1500
    }
    function generarNombreAleatorio() {
        let nombre = Math.floor(Math.random() * 1501);
        return nombre; // Número entre 0 y 1500
    }
    function generarTabla() {
        
        const categorias = [generarNombreAleatorio(), generarNombreAleatorio(), "Tumblr", "Facebook", "Youtube", "LinkedIn", "Twitter", "Other"];

        let datos = categorias.map(nombre => ({
            nombre,
            puntuacion: generarNumeroAleatorio()
        }));

        let maxPuntuacion = Math.max(...datos.map(d => d.puntuacion));

        datos = datos.map(d => ({
            ...d,
            porcentaje: Math.round((d.puntuacion / maxPuntuacion) * 100)
        }));

        // Crear la tabla
        const tabla = document.createElement("table");
        tabla.classList.add("graph");

        // Crear la caption
        const caption = document.createElement("caption");
        caption.textContent = "Puntuaciones Generadas";
        tabla.appendChild(caption);

        // Crear thead
        const thead = document.createElement("thead");
        const trHead = document.createElement("tr");

        const thCategoria = document.createElement("th");
        thCategoria.textContent = "Categoría";
        thCategoria.setAttribute("scope", "col");

        const thPorcentaje = document.createElement("th");
        thPorcentaje.textContent = "Porcentaje";
        thPorcentaje.setAttribute("scope", "col");

        trHead.appendChild(thCategoria);
        trHead.appendChild(thPorcentaje);
        thead.appendChild(trHead);
        tabla.appendChild(thead);

        // Crear tbody
        const tbody = document.createElement("tbody");
        tbody.classList.add("horizontal");

        datos.forEach(row => {
            const tr = document.createElement("tr");
            tr.style.height = `${row.porcentaje}%`;

            const th = document.createElement("th");
            th.setAttribute("scope", "row");
            th.textContent = row.nombre;

            const td = document.createElement("td");
            const span = document.createElement("span");
            span.textContent = `${row.porcentaje}%`;
            td.appendChild(span);

            tr.appendChild(th);
            tr.appendChild(td);
            tbody.appendChild(tr);
        });

        tabla.appendChild(tbody);

        // Agregar la tabla al body
        document.body.appendChild(tabla);
    }

    generarTabla(); // Llamamos a la función para generar la tabla
});
