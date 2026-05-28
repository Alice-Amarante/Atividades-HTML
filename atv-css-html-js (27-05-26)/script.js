
function adicionarTarefa(){
    //elementos HTML
    const inputElement = document.getElementById('nova_tarefa');
    const mensagemElement = document.getElementById("mensagem");
    const listaTarefas = document.getElementById('lista_tarefas');
    const contagemTarefas = document.getElementById("contador");  
    
    //Variáveis
    let tarefa = inputElement.value;
    let mensagem, cor;
    
    
    if (tarefaValida(tarefa)){
        let novaTarefa = document.createElement("li");
        novaTarefa.textContent = tarefa;
        listaTarefas.appendChild(novaTarefa);
        
        contagemTarefas.textContent = listaTarefas.children.length;
        controlarBotaoLimpar();

        mensagem = "Adicionado com sucesso";
        cor = 'green';
        
    } 
    else {
        mensagem = "Tarefa Invalida, redigite.";
        cor = 'red';  
    }
    
    //elementos de estilo
    mensagemElement.textContent = mensagem;
    mensagemElement.style.color = cor;
    
    inputElement.value = '';
    inputElement.focus();
}

function tarefaValida(tarefa) {
     return tarefa.trim().length >=5;
}

function excluirTarefas(tarefa) {
    
    const listaTarefas = document.getElementById('lista_tarefas');
    const contagemTarefas = document.getElementById("contador");
     
     while (listaTarefas.firstElementChild) {
        listaTarefas.removeChild(listaTarefas.firstElementChild);
    }
    
    contagemTarefas.textContent = 0;
    controlarBotaoLimpar();
}
function controlarBotaoLimpar() {
    const listaTarefas = document.getElementById('lista_tarefas');
    const botaoLimpar = document.getElementById('btnLimpar');
    
    if (listaTarefas.children.length === 0) {
        botaoLimpar.style.display = "none";  // some com o botão
    } else {
        botaoLimpar.style.display = "inline-block";  // mostra o botão
    }
}


