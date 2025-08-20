(function () {
    var container = this.container;
    container.innerHTML = "";

    var select = document.createElement("select");

    if (this.data && this.data.rows) {
        this.data.rows.forEach(function (row) {
            var option = document.createElement("option");
            option.value = row[0].value;
            option.textContent = row[0].value;
            select.appendChild(option);
        });
    }

    container.appendChild(select);
})();
