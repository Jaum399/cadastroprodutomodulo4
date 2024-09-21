class Produto {
    constructor() {
        this.id = 1;
        this.arrayprodutos = [];
    }

    Adiciona() {
        let produto = this.lerdados();
        if (this.Validar(produto)) {
            this.Salvar(produto);
            this.id++;  // Incrementa o ID para o próximo produto
        }
        this.Listar();  // Atualiza a lista após salvar
        this.LimparCampos();  // Limpa os campos após adicionar
    }

    lerdados() {
        let produto = {};

        produto.id = this.id;
        produto.nomeproduto = document.getElementById('nome').value;
        produto.precoproduto = document.getElementById('preco').value;

        return produto;
    }

    Validar(produto) {
        let msg = '';

        if (produto.nomeproduto === '') {
            msg += 'Por favor, insira corretamente o nome do produto! \n';
        }
        if (produto.precoproduto === '') {
            msg += 'Por favor, insira o preço do produto! \n';
        }
        if (msg !== '') {
            alert(msg);
            return false;
        }
        return true;
    }

    Salvar(produto) {
        this.arrayprodutos.push(produto);
    }

    Listar() {
        let tbody = document.getElementById('tbody');
        tbody.innerHTML = '';  // Limpa o corpo da tabela antes de atualizar

        for (let i = 0; i < this.arrayprodutos.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_nome = tr.insertCell();
            let td_preco = tr.insertCell();
            let td_del = tr.insertCell();

            // Preenche as células com os dados do produto
            td_id.innerText = this.arrayprodutos[i].id;
            td_nome.innerText = this.arrayprodutos[i].nomeproduto;
            td_preco.innerText = this.arrayprodutos[i].precoproduto;

            // Adiciona o ícone de lixeira para remover o produto
            let imagen = document.createElement('img');
            imagen.src = 'lixeira.svg';
            imagen.setAttribute('onclick', `produto.Remover(${this.arrayprodutos[i].id})`);  // Função para remover o produto
            td_del.appendChild(imagen);
        }
    }

    Remover(id) {
        this.arrayprodutos = this.arrayprodutos.filter(produto => produto.id !== id);  // Remove o produto pelo ID
        this.Listar();  // Atualiza a lista após remover
    }
    
    // Função para remover o último produto adicionado
    remover() {
        if (this.arrayprodutos.length === 0) {
            alert('Nenhum produto para remover!');
            return;
        }

        this.arrayprodutos.pop(); // Remove o último produto do array
        this.Listar(); // Atualiza a lista de produtos na tabela
        this.LimparCampos(); // Limpa os campos de entrada após remover
    }

    // Função para limpar os campos de input
    LimparCampos() {
        document.getElementById('nome').value = '';
        document.getElementById('preco').value = '';
    }
}

var produto = new Produto();
