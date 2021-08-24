class UserController{
    constructor(){
        this.form = document.querySelector('form')
        this.tabela = document.querySelector('table tbody')
        this.user = document.querySelector('.user')
        this.registro = document.querySelector('.register')
        this.btnsView = document.querySelectorAll('.settings a')
        this.iconsBtnView = document.querySelectorAll('.settings a i')

        this.initEvents()
    }

    initEvents(){
        
        this.form.addEventListener('submit', event => {
            event.preventDefault()
            const dados = this.getData()
            const elemento = [...this.form.elements].filter(item => {
                if (item.id === 'foto')
                    return item;
            });

            this.getPhoto(elemento[0].files[0]).then(result => {
                dados.foto = result
                this.newRow(dados)
            }).catch(e => {
                console.log(e);
            });
        })

        this.btnsView.forEach((btn, indice) => {
            btn.addEventListener('click', event => {
                event.preventDefault()
                let indiceTroca = (indice == 0) ? 1: 0;
                if (!btn.classList.contains('selected')){
                    let aux = this.iconsBtnView[indice].classList.value
                    this.iconsBtnView[indice].classList.value = this.iconsBtnView[indiceTroca].classList.value
                    this.iconsBtnView[indiceTroca].classList.value = aux
                    this.btnsView[indiceTroca].classList.remove('selected')
                    this.btnsView[indice].classList.add('selected')
                    
                    if (indice == 0){
                        this.user.style.display = 'initial'
                        this.registro.style.display = 'none'
                    }else{
                        this.user.style.display = 'none'
                        this.registro.style.display = 'initial'
                    }
                }
            })
        })
    }

    getData(){
        let user = {};
        [...this.form.elements].forEach(input => {
            if (input.name === 'sexo'){
                if (input.checked){
                    user[input.name] = input.value
                }
            }else{
                user[input.id] = input.value

                if (input.name === 'admin')
                    user[input.id] = input.checked
            }
        })

        return new User(
            user.nome,
            user.sexo,
            user.data,
            user.pais,
            user.email,
            user.senha,
            user.foto,
            user.admin
        );
    }

    getPhoto(file){
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader()

            fileReader.onload = () => {
                resolve(fileReader.result)
            }

            fileReader.onerror = () => {
                reject();
            }

            if (file)
                fileReader.readAsDataURL(file)
            else
                resolve('img/user.png');    
            
        })
    }

    newRow(user){
        let row = `
        <tr>
        <td class="col-img">
            <div class="img-tabela">
                <img src="${user.foto}" alt="">
            </div>
        </td>
        <td>${user.nome}</td>
        <td>${user.email}</td>
        <td>${(user.admin) ? 'Sim' : 'Não'}</td>
        <td>
            <button class="action-button button-edit">
                <i class="far fa-edit"></i>
            </button>
            <button class="action-button button-delete">
                <i class="far fa-trash-alt"></i>
            </button>
        </td>
    </tr>
        `
    this.tabela.innerHTML += row
    }
}