class UserController{
    constructor(view, model){
        this._view = view
        this._model = model

        this.initEvents()
    }

    set view(value){
        this._view = value
    }

    set model(value){
        this._model = value
    }

    initEvents(){
        this.onSubmit()
        this.onToggleDisplay()

        this._view.inputFile.addEventListener('change', ()=> {
            let foto = this._view.inputFile.files[0]
            this.getFoto(foto).
            then(resultado => {
                this._view.imgProfile.src = resultado
            }).
            catch(e => console.log)
        })
    }

    onSubmit(){
        this._view.form.addEventListener('submit', evento => {
            evento.preventDefault()
            if (this._view.validaFormulario()){
                this._view.btnSubmit.disabled = true
                let dados = this._view.getDadosFormulario();
                let fotoFile = [...this._view.form.elements].filter(item => {
                    if (item.id === 'foto')
                        return item
                })

                fotoFile = fotoFile[0]
                this.getFoto(fotoFile.files[0]).then(resultado => {
                    dados.foto = resultado
                    this._view.adicionarLinha(dados)
                    this._view.resetFormulario()
                    this._view.resetStyle()
                    this._view.btnSubmit.disabled = false
                }).catch(e => {
                    console.log(e)
                })
            }
        })
    }

    onUpdate(){
        
    }

    onDelete(){

    }

    onToggleDisplay(){
        let buttons = this._view.settingsDisplay.querySelectorAll('a')
        let icons = this._view.settingsDisplay.querySelectorAll('i')

        buttons.forEach((btn, indice) => {

            btn.addEventListener('click', (event) => {
                event.preventDefault()
                let indiceTroca = (indice === 0) ? 1 : 0
                if(!btn.classList.contains('selected')){
                    let aux = icons[indice].classList.value
                    icons[indice].classList.value = icons[indiceTroca].classList.value
                    icons[indiceTroca].classList.value = aux
                    buttons[indiceTroca].classList.remove('selected')
                    buttons[indice].classList.add('selected')
        
                    if (indice == 0){
                        this._view.tableDisplay.style.display = 'initial'
                        this._view.formDisplay.style.display = 'none'
                        
                    }else{
                        this._view.tableDisplay.style.display = 'none'
                        this._view.formDisplay.style.display = 'initial'
                    }
                }
            })
        })
    }

    getFoto(file){
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader()
            
            fileReader.onload = ()=> {
                resolve(fileReader.result)
            }

            fileReader.onerror = () => {
                reject()
            }
            if (!file)
                resolve('img/user.png')

            fileReader.readAsDataURL(file);
        })
    }
}