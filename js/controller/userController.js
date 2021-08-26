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
                console.log(this)
                this._view.btnSubmit.disabled = true
                let dados = this._view.getDadosFormulario();
                let fotoFile = [...this._view.form.elements].filter(item => {
                    if (item.id === 'foto')
                        return item
                })

                fotoFile = fotoFile[0]
                console.log(fotoFile.files[0])
                this.getFoto(fotoFile.files[0]).then(resultado => {
                    dados.foto = resultado
                    this._view.adicionarLinha(dados)
                    this._view.resetFormulario()
                    this.view.resetStyle()
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