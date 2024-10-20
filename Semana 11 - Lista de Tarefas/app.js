function leDados() {
    let strDados = localStorage.getItem('db');
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse(strDados);
    } else {
        objDados = { tarefas: [
                   
                   ] };
    }
    return objDados;
}

function salvaDados(dados) {
    localStorage.setItem('db', JSON.stringify(dados));
}

function incluirTarefa() {
    let objDados = leDados();

    let strNomeTarefa = document.getElementById('campoAdicionarTarefa').value
    if (strNomeTarefa === '')
        return;

    let novaTarefa = { 
        tarefa: strNomeTarefa,
        concluida: false
    };

        objDados.tarefas.push(novaTarefa);

        salvaDados(objDados);

        imprimeTarefas();

        document.getElementById('campoAdicionarTarefa').value = '';
    
}


function imprimeTarefas() {
    let tela = document.getElementById('tela');
    let strHtml = '';
    let objDados = leDados();

    for (let i = 0; i < objDados.tarefas.length; i++) {
        strHtml += `
        <div class="tarefa ${objDados.tarefas[i].concluida ? 'concluida' : ''}"">
        <p>${objDados.tarefas[i].tarefa}</p>
        <button class="concluir" onclick="marcarConcluida(${i})">Concluir</button>
        <button class="deletar" onclick="deletarTarefa(${i})">Deletar</button>
        </div>
        `;
    }
    tela.innerHTML = strHtml;
}

//Marcar como concluido
function marcarConcluida(index) {
    let objDados = leDados();
    objDados.tarefas[index].concluida = true;
    salvaDados(objDados);
    imprimeTarefas();
}

//Deletar tarefas
function deletarTarefa(index) {
    let objDados = leDados();
    objDados.tarefas.splice(index, 1);
    salvaDados(objDados);
    imprimeTarefas();
}
imprimeTarefas();


// Botão
document.getElementById('btnAdicionarTarefa').addEventListener('click', incluirTarefa);
