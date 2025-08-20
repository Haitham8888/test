// Basic Custom Control to show query data in a table
(function () {
    // 'data' is passed by Cognos and contains the query data
    var container = this.container;
    container.innerHTML = ""; // Clear existing content

    if (!this.data || !this.data.rows || this.data.rows.length === 0) {
        container.innerHTML = "<p>No data available.</p>";
        return;
    }

    var table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";
    table.style.marginTop = "10px";

    // Create table header
    var headerRow = document.createElement("tr");
    this.data.metadata.forEach(function (col) {
        var th = document.createElement("th");
        th.style.border = "1px solid #ccc";
        th.style.padding = "5px";
        th.style.backgroundColor = "#f0f0f0";
        th.textContent = col.name;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Create data rows
    this.data.rows.forEach(function (row) {
        var tr = document.createElement("tr");
        row.forEach(function (cell) {
            var td = document.createElement("td");
            td.style.border = "1px solid #ccc";
            td.style.padding = "5px";
            td.textContent = cell ? cell.value : "";
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    container.appendChild(table);
})();
