const tabla = document.querySelector("#tabla");
const btnAgregar = document.querySelector("#btnAgregar");


if (!localStorage.getItem("datosRemeras")) {
    localStorage.setItem("datosRemeras", JSON.stringify(remeras || []));
}

function renderizarTabla() {
    const lista = JSON.parse(localStorage.getItem("datosRemeras")) || [];
    
    if (lista.length === 0) {
        tabla.innerHTML = "<p>No hay datos disponibles.</p>";
        return;
    }

    let tablaHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Modelo</th>
                <th>Color</th>
                <th>Talle</th>
                <th>Precio</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
    `;

    lista.forEach((remera, index) => {
        tablaHTML += `
            <tr>
                <td>${remera.id || '-'}</td>
                <td><img src="${remera.manofacturer?.logo}" alt="logo" />${remera.manofacturer?.name || 'N/A'}</td>
                <td>${remera.color || '-'}</td>
                <td>${remera.size || '-'}</td>
                <td>$${remera.price || '-'}</td>
                <td><a href="#" class="btnEliminar" dato-idx="${index}">Eliminar</a></td>
            </tr>
        `;
    });

    tablaHTML += `</tbody>`;
    tabla.innerHTML = tablaHTML;

    eliminar();
}

btnAgregar.onclick = function() {
    const id = document.querySelector("#txtId").value;
    const marca = document.querySelector("#txtMarca").value;
    const color = document.querySelector("#txtColor").value;
    const talle = document.querySelector("#txtTalle").value;
    const precio = document.querySelector("#txtPrecio").value;

    const nuevaRemera = {
        id: id,
        manofacturer: { name: marca, logo: "https://robohash.org/authicperferendis.bmp?size=50x50&set=set1" },
        color: color,
        size: talle,
        price: precio
    };

    const datos = JSON.parse(localStorage.getItem("datosRemeras"));
    datos.push(nuevaRemera);
    localStorage.setItem("datosRemeras", JSON.stringify(datos));

    renderizarTabla();
    limpiarFormulario();
};

function eliminar() {
    const botones = document.querySelectorAll(".btnEliminar");
    botones.forEach(btn => {
        btn.onclick = function(e) {
            e.preventDefault();
            const index = this.getAttribute("dato-idx");
            
            if (confirm("¿Estás seguro de que deseas eliminar esta remera?")) {
                eliminarRemera(index);
            }
        };
    });
}

function eliminarRemera(index) {
    const datos = JSON.parse(localStorage.getItem("datosRemeras"));
    datos.splice(index, 1);
    localStorage.setItem("datosRemeras", JSON.stringify(datos));
    renderizarTabla();
}

function limpiarFormulario() {
    document.querySelectorAll("#formulario input[type='text']").forEach(input => input.value = "");
}

renderizarTabla();