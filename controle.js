let registros = [];


window.onload = function() {
    let dadosSalvos = localStorage.getItem('registros');
    if (dadosSalvos) {
        registros = JSON.parse(dadosSalvos);
        registros.forEach((reg, index) => {
            adicionarLinha(reg, index);
        });
        calcular();
    }
}


function incluir() {
    let desc = document.getElementById("desc").value.trim();
    let valor = document.getElementById("valor").value.trim();
    let tipo = document.getElementById("tipo").value;

    if (!desc || !valor || !tipo) {
        alert("Preencha todos os campos.");
        return;
    }

    let registro = {
        desc: desc,
        valor: Number(valor),
        tipo: tipo
    };

    registros.push(registro);
    salvarLocalStorage();

    adicionarLinha(registro, registros.length - 1);

    limparCampos();
    calcular();
}


function adicionarLinha(registro, index) {
    let tabela = document.querySelector("tbody");
    let linha = document.createElement("tr");

    linha.innerHTML = `
        <td>${registro.desc}</td>
        <td>R$ ${registro.valor.toFixed(2)}</td>
        <td>${registro.tipo}</td>
        <td><i class="fa-solid fa-trash" style="cursor:pointer; color:red;"></i></td>
    `;


    linha.querySelector("i").addEventListener("click", function() {
        registros.splice(index, 1);
        salvarLocalStorage();
        linha.remove();
        recalcularTudo();
    });

    tabela.appendChild(linha);
}


function salvarLocalStorage() {
    localStorage.setItem('registros', JSON.stringify(registros));
}


function limparCampos() {
    document.getElementById("desc").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("tipo").value = "";
}


function recalcularTudo() {
    let tabela = document.querySelector("tbody");
    tabela.innerHTML = "";
    registros.forEach((reg, idx) => {
        adicionarLinha(reg, idx);
    });
    calcular();
}


function calcular() {
    let totalEntrada = 0;
    let totalSaida = 0;

    registros.forEach(reg => {
        if (reg.tipo === "Entrada") {
            totalEntrada += reg.valor;
        } else {
            totalSaida += reg.valor;
        }
    });

    let totalGeral = totalEntrada - totalSaida;

    document.getElementById("entrada").textContent = "R$ " + totalEntrada.toFixed(2);
    document.getElementById("saida").textContent = "R$ " + totalSaida.toFixed(2);
    document.getElementById("total").textContent = "R$ " + totalGeral.toFixed(2);
}

