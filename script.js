async function pesquisar() {
    const cidadeInput = document.getElementById("inputCidade");
    
    if (!cidadeInput) {
        console.error("ERRO: elemento #inputCidade não existe no HTML");
        return;
    }

    const cidade = cidadeInput.value;

    if (!cidade.trim()) {
        alert("Digite o nome da cidade!");  // acho que vou tirar isso, melhor, acho feio o alert na tela
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/clima/${cidade}`); // so lembra que o ${cidade}` é o nome da cidade que vai ser pesquisada
        const data = await response.json();

        if (data.erro) {
            alert("Cidade não encontrada!");
            return;
        }

        document.getElementById("cidadeResultado").textContent = "Cidade: " + data.cidade;
        document.getElementById("temperatura").textContent = "Temperatura: " + data.temperatura + "°C";
        document.getElementById("descricao").textContent = "Descrição: " + data.descricao;
        document.getElementById("minimo").textContent = "Mínima: " + data.minima + "°C";
        document.getElementById("maximo").textContent = "Máxima: " + data.maxima + "°C";
        document.getElementById("humidade").textContent = "Humidade: " + data.humidade + "%";

    } catch (error) {
        alert("Erro ao buscar clima!");
        console.error(error);
    }
}
