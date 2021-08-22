class UserController{
    constructor(){
        this.form = document.querySelector('form')
        this.tabela = document.querySelector('table')
        this.user = document.querySelector('.user')
        this.registro = document.querySelector('.register')
        this.btnsView = document.querySelectorAll('.settings a')
        this.iconsBtnView = document.querySelectorAll('.settings a i')

        this.initEvents()
    }

    initEvents(){
        this.form.addEventListener('submit', event => {
            event.preventDefault()


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
}