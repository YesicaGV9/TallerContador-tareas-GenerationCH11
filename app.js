let tareas = []

function usarOtraCategoria() {
    const select = document.getElementById("categoria");
    const otra = document.getElementById("otraCategoria");

    if (select.value == "Otra") {
        otra.style.display = "inline";
    } else {
        otra.style.display = "none";
    }
}

function categoriaConTexto(valor) {
    const categoria = {
        Trabajo: "💼 Trabajo",
        Estudio: "📚 Estudio",
        Personal: "🏠 Personal",
        Urgente: "🔴 Urgente"
    };
    return categoria[valor] || valor;
}


function agregarTarea() {
    const input = document.getElementById("tareaIngresada");
    const select = document.getElementById("categoria");
    const otra = document.getElementById("otraCategoria");
    const error = document.getElementById("error");

    let texto = input.value.trim();
    let categoria = select.value;

    if (texto === "") {
        error.textContent = "La tarea no puede estar vacia";
        return;
    }

    error.textContent = "";

    if (categoria === "otra") {
        categoria = otra.value.trim();

        if (categoria === "") {
            error.textContent = "Escribe una categoria";
            return;
        }
    }

    const nuevaTarea = {
        texto: texto,
        categoria: categoria,
        completada: false,
        urgente: false
    };

    tareas.push(nuevaTarea);

    console.log("Tarea agregada:", nuevaTarea);

    input.value = "";
    otra.value = "";

    renderizarTareas();
}


function renderizarTareas() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    let completadas = 0;

    tareas.forEach((tarea, index) => {
        if (tarea.completada) completadas++;

        const plantilla = document.getElementById("template-tarea");
        const clon = plantilla.content.cloneNode(true);

        const li = clon.querySelector("li");

        li.classList.add("tarea");

        if (tarea.completada) {
            li.classList.add("tarea-hecha");
        }

        if (tarea.urgente) {
            li.classList.add("tarea-urgente");
        }

        const texto = clon.querySelector(".texto-tarea");
        texto.textContent = categoriaConTexto(tarea.categoria) + " - " + tarea.texto;

        clon.querySelector(".btnHecho").onclick = () => marcarHecha(index);
        clon.querySelector(".btnUrgente").onclick = () => marcarUrgente(index);
        clon.querySelector(".btnEliminar").onclick = () => eliminarTarea(index);

        lista.appendChild(clon);
    });

    document.getElementById("total").textContent = tareas.length;
    document.getElementById("completado").textContent = completadas;
}


function marcarHecha(index) {
    tareas[index].completada = !tareas[index].completada;
    renderizarTareas();
}


function marcarUrgente(index) {
    console.log("urgente clicked", index);
    tareas[index].urgente = !tareas[index].urgente;
    renderizarTareas();
}


function eliminarTarea(index) {
    const confirmar = confirm("¿Seguro que deseas eliminar esta tarea?");

    if (confirmar) {
        tareas.splice(index, 1);
        renderizarTareas();
    }
}


function limpiarCompletadas() {
    const cantidad = tareas.filter(t => t.completada).length;

    if (cantidad === 0) return;

    const confirmar = confirm(`Se eliminarán ${cantidad} tareas ¿Continuar?`);

    if (confirmar) {
        tareas = tareas.filter(t => !t.completada);
        renderizarTareas();
    }
}


document.getElementById("categoria").addEventListener("change", usarOtraCategoria);