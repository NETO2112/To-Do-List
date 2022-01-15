let dados; //mais para frente virará a matriz que salvará os dados

//sempre que a página for carregada/recarregada serão chamadas as duas funções para carregar os arquivos no local storage e, caso haja, imprimirá na tela a lista salva
carregar();
mostrar();

//função que adiciona os inputs ao local storage
function adicionar() {
    let entrada = document.getElementById("input").value; //pega a entrada enviada

    carregar(); //chama a função que carrega os dados salvos no local storage

    let tarefa = new Object(); //criando um objeto para armazenar os dados
    tarefa.input = entrada; //armazena a tarefa digitada
    tarefa.check = false; //armazena se está checked ou não (por padrão, não está)

    dados.push(tarefa); //armazena o objeto com os dados na matriz

    salvar(dados); //chama a função que salvará os dados no local storage
    limpar(); //chama a função que limpará o campo de texto
    mostrar(); //chama a função que fará aparecer as tarefas na tela
    ativar();
}

//função que limpa o campo de texto
function limpar() {
    document.getElementById("input").value = ""; //limpa o campo de texto
}

//função que carrega os dados no local storage
function carregar() {
    let dadosLocais = localStorage.getItem("Lista"); //chama a lista armazenada

    if (dadosLocais != null) { //se houver algo nos dados locais a matriz "dados" receberá esses valores
        dados = JSON.parse(dadosLocais);
    }
    else { //se não houver, "dados" será definido como uma matriz vazia
        dados = [];
    }
}

//função que salva os dados no local storage
function salvar(input) {
    localStorage.setItem("Lista", JSON.stringify(input));
}

//função que mostra as tarefas na tela. Obs.: talvez fazer o if/else com o .appendChild seja mais fácil e/ou fique mais simples o código
function mostrar() {
    let novaLI = ""; //variável que salvará todo o HTML contendo as li's
    dados.forEach((element, index) => { //cria as li's baseado no checkbox true/false. Lembrar de perguntar ao professor o porquê de não funcionar sem esse "element" sendo que não está sendo usado
        if (dados[index].check == true) {
            novaLI += `<li class="check"><input type="checkbox" id="cb${index}" class="cb" onchange="checar(${index})" checked>${dados[index].input}<button class="lixo" onclick="deletar(${index})"><i class="fas fa-trash"></i></button></li>`;
        }
        else {
            novaLI += `<li><input type="checkbox" id="cb${index}" class="cb" onchange="checar(${index})">${dados[index].input}<button class="lixo" onclick="deletar(${index})"><i class="fas fa-trash"></i></button></li>`;
        }
    });

    let lista = document.getElementById("lista"); //pega a ul
    lista.innerHTML = novaLI; //injeta as li's criadas no html
}
//no if/else já salva o checkbox com uma id única na forma cbi onde i é um número. Essa id única servirá para usar nas funções seguintes, assim consegue-se pegar a li específica 
//na verdade já está salvo o valor "index" que será usado nas funções quando chamadas
//me parece que a cada vez que a função "mostrar()" é chamada, está recriando todas as li's. Ainda não entendi muito bem esse forEach. Talvez haja uma maneira melhor de fazer isso, pois deve ficar lento caso houvesse um número muito grande de li's

//função para deletar a tarefa
function deletar(index) {
    let confirma = window.confirm("Certeza que queres excluir a tarefa?"); //lembrar de procurar uma forma de fazer isso com uma janelinha mais bonitinha que um window.confirm
    if (confirma) { //se a pessoa confirmar, a li será excluída
        dados.splice(index, 1); //deleta a li
        salvar(dados);
        mostrar();
    }
}

//função para salvar o check do checkbox
function checar(index) {
    if (dados[index].check == true) {
        dados[index].check = false;
    }
    else {
        dados[index].check = true;
    }
    document.getElementById(`cb${index}`).parentElement.classList.toggle("check"); //alterna se a li parent do checkbox clicado terá a class "check" ou não
    salvar(dados);
}

//função para ativar o botão adicionar
function ativar() {
    let entrada = document.getElementById("input").value;
    let btnadicionar = document.getElementById("btnadd");
    if (entrada.trim() != 0) {
        btnadicionar.classList.add("ativado");
    }
    else {
        btnadicionar.classList.remove("ativado");
    }
}

//função para voltar ao topo da página
function topo() {
    window.scrollTo(0, 0);
}