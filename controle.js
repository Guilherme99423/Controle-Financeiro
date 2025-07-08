let registros = [];

window.onload = function() {
    let dadosSalvos = localStorage.getItem('registros');
    if (dadosSalvos) {
        registros = JSON.parse(dadosSalvos);
        registros.forEach(reg => {
            adicionarLinha(reg);
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
    adicionarLinha(registro);
    limparCampos();
    calcular();
}

function adicionarLinha(registro) {
    let tabela = document.querySelector("tbody");
    let linha = document.createElement("tr");

    linha.innerHTML = `
        <td>${registro.desc}</td>
        <td>R$ ${registro.valor.toFixed(2)}</td>
        <td>${registro.tipo}</td>
        <td><i class="fa-solid fa-trash" style="cursor:pointer; color:red;"></i></td>
    `;

    linha.querySelector("i").addEventListener("click", function() {
        let linhaClicada = this.closest('tr');
        let descLinha = linhaClicada.children[0].textContent;
        let valorLinha = parseFloat(linhaClicada.children[1].textContent.replace('R$ ', ''));
        let tipoLinha = linhaClicada.children[2].textContent;

        let idx = registros.findIndex(r => 
            r.desc === descLinha &&
            r.valor === valorLinha &&
            r.tipo === tipoLinha
        );

        if (idx > -1) {
            registros.splice(idx, 1);
            salvarLocalStorage();
            linhaClicada.remove();
            calcular();
        }
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


