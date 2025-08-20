(function () {
    var container = this.container;
    container.innerHTML = "";

    if (!this.data || !this.data.rows || this.data.rows.length === 0) {
        container.innerHTML = "<p>No data available.</p>";
        return;
    }

    var table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";

    // Table header
    var header = document.createElement("tr");
    this.data.metadata.forEach(function (col) {
        var th = document.createElement("th");
        th.style.border = "1px solid #ccc";
        th.style.padding = "5px";
        th.textContent = col.name;
        header.appendChild(th);
    });
    table.appendChild(header);

    // Table rows
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
