(function(DOM, win, doc) {
  'use strict';

 
  let app = (function() {
    const $imagem = DOM('[data-js="inputImagem"]');
    const $modeloMarca = DOM('[data-js="inputMarcaModelo"]');
    const $ano = DOM('[data-js="inputAno"]');
    const $placa = DOM('[data-js="inputPlaca"]');
    const $cor = DOM('[data-js="inputCor"]');
    const $form = DOM('[data-js="formCadastro"]');
    const $corpoTabela = DOM('[data-js="tbody"]')
    const $status = DOM('[data-js="statusTable"]');


    let allCamposForm = [$imagem, $modeloMarca, $ano, $placa, $cor]

    return{
      init: function() {
        this.statusTable()
        this.companyInfor()
        this.initEvents()
      },

      initEvents: function initEvents() {
        $form.on('submit', this.handleSubmit, false)
      },

      companyInfor: function companyInfor() {
        let ajax = new XMLHttpRequest();
        ajax.open("GET", "http://localhost/JS_Ninja_Carro/company.json", true);
        ajax.send()
        ajax.addEventListener('readystatechange', this.getCompanyInfor, false)
      },
      getCompanyInfor: function getCompanyInfor() {
        if(!app.isReady.call(this))
          return
        let $title = new DOM('[data-js="company-name"]');
        let $phone = new DOM('[data-js="company-phone"]');
        let data = JSON.parse(this.responseText)
        $title.get().textContent = data.name
        $phone.get().textContent = data.phone
      },

      isReady: function isReady() {
        return this.readyState === 4 && this.status === 200;
      },

      statusTable: function statusTable() {
        $status.get().innerHTML = $corpoTabela.get().firstElementChild === null ? "Nenhum carro cadastrado" : "";
      },

      handleSubmit: function handleSubmit(event) {
        event.preventDefault();
        app.createTable();
        app.statusTable();

      },

      handleDelete: function handleDelete(){
        console.log('clicou deletar')
      },

      handleEditar: function handleEditar(){
        console.log('clicou editar')

      },

      createImgTable: function createImgTable(item) {
        let $fragmentImage = doc.createDocumentFragment()
        let $imgImagem = doc.createElement('img')
        $imgImagem.setAttribute('src', item.get().value);
        $fragmentImage.appendChild($imgImagem);
        return $fragmentImage
      },

      createTable: function createTable() {
        let fragamentTable = doc.createDocumentFragment();
        let trTable = doc.createElement('tr')

        allCamposForm.forEach(function(item) {
          let tdTable = doc.createElement('td')
          let noTexto = doc.createTextNode(item.get().value);

          item === $imagem ? tdTable.appendChild(app.createImgTable(item)) : tdTable.appendChild(noTexto);

          trTable.appendChild(tdTable);
          item.get().value = '';
        })
        let tdButton = doc.createElement('td')
        let buttonEditar = doc.createElement('button')
        let buttonDelete = doc.createElement('button')
        buttonEditar.setAttribute('class', 'btn btn-warning')
        buttonEditar.setAttribute('data-js','button-editar')
        buttonEditar.setAttribute('value','Editar')
        buttonDelete.setAttribute('class', 'btn btn-danger')
        buttonDelete.setAttribute('data-js', 'button-excluir')
        buttonDelete.setAttribute('value','Excluir')
        buttonEditar.textContent = 'Editar'
        buttonDelete.textContent = 'Excluir'
        tdButton.setAttribute('class', 'buttons-table')
        
        tdButton.appendChild(buttonEditar)
        tdButton.appendChild(buttonDelete)
        trTable.appendChild(tdButton)



        fragamentTable.appendChild(trTable)
        $corpoTabela.get().appendChild(fragamentTable)

      },


      



    }
  })()

  app.init()


})(window.DOM, window, document );
