let entrada = []
let saida = []

function incluir() {
    let desc = document.getElementById("desc").value
    let valor = document.getElementById("valor").value
    let tipo = document.getElementById("tipo").value

    if (!desc || !valor || !tipo) {
        alert("Preencha todos os campos antes de incluir.");
        return;
    }

    let tabela = document.querySelector("tbody")
    tabela.innerHTML += `
    <tr>
        <td>${desc}</td>
        <td>R$ ${valor}</td>
        <td>${tipo}</td>
    </tr>
`;

    if (tipo === "Entrada") {
        entrada.push(valor)
    } else {
        saida.push(valor)
    }

    document.getElementById("desc").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("tipo").value = "";

    calcular()
}

function calcular(){
    let totalEntrada = 0
    for (cont = 0; cont < entrada.length; cont++){
        totalEntrada += Number(entrada[cont]);
    }

    let totalSaida = 0
    for (cont = 0; cont < saida.length; cont++){
        totalSaida += Number(saida[cont]);
        console.log(totalSaida)
    }

    totalGeral = totalEntrada - totalSaida
    console.log(totalGeral)

    document.getElementById("entrada").innerHTML = "R$ " + totalEntrada 
    document.getElementById("saida").innerHTML = "R$ " + totalSaida 
    document.getElementById("total").innerHTML = "R$ " + totalGeral 
}