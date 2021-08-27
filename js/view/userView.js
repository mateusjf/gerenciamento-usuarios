class UserView{
    constructor(){
        this.form = document.querySelector('form')
        this.btnSubmit = document.querySelector('#btn-submit')
        this.tbody = document.querySelector('tbody')
        this.inputFile = document.querySelector('#foto');
        this.imgProfile = document.querySelector('.img-profile img')
        this.settingsDisplay = document.querySelector('.settings')
        this.tableDisplay = document.querySelector('.user')
        this.formDisplay = document.querySelector('.register')
        this.updateDisplay = document.querySelector('.update')
    }

    resetFormulario(){
        this.form.reset()
        this.imgProfile.src = ''
    }

    resetStyle(){
        [...this.form.elements].forEach(input => {
            let parent = input.parentElement
            parent.classList.remove('required-field')
        })
    }

    getDadosFormulario(){
        const obj = {};
        [...this.form.elements].forEach(input => {
            if (input.name === 'sexo'){
                if (input.checked){
                    obj[input.name] = input.value
                }
            }else if (input.id === 'admin'){
                obj[input.name] = input.checked
            }else{
                obj[input.id] = input.value
            }
        })

        return obj 
    }

    validaFormulario(){
        let ok = true
        const REQUIRED = ['nome', 'data-nascimento', 'email', 'senha'];
        [...this.form.elements].forEach(item => {
            if (REQUIRED.indexOf(item.id) > -1){
                if (!item.value){
                    const parent = item.parentElement
                    parent.classList.add('required-field');
                    ok = false
                }
            }
        })

        return ok
    }

    toggleForm(){
        //this.updateDisplay.classList.remove('update')
        this.updateDisplay.classList.toggle('visible')
        let registerDisplay = document.querySelector('.register');
        //registerDisplay.classList.remove('register')
        registerDisplay.classList.toggle('hide')
    }

    adicionarLinha(dados){
        const tr = document.createElement('tr');

        tr.innerHTML = `<tr>
        <td class="col-img">
            <div class="img-tabela">
                <img src="${dados.foto}" alt="">
            </div>
        </td>
        <td>${dados.nome}/td>
        <td>${dados.email}</td>
        <td>${(dados.admin) ? 'Sim' : 'Não'}</td>
        <td class="botoes">
            <button class="action-button button-edit">
                <i class="far fa-edit"></i>
            </button>
            <button class="action-button button-delete">
                <i class="far fa-trash-alt"></i>
            </button>
        </td>
    </tr>`

        tr.dataset.dataAtributos = JSON.stringify(dados)

        const btnEdit = tr.querySelector('.button-edit')

        btnEdit.addEventListener('click', () => {
            btnEdit.disabled = true
            btnEdit.style.opacity = 0.3
            this.toggleForm()
        })

        this.tbody.appendChild(tr)
    }
}