(function(DOM, win, doc) {
  'use strict';

 
  let app = (function() {
    let $imagem = DOM('[data-js="inputImagem"]');
    let $modeloMarca = DOM('[data-js="inputMarcaModelo"]');
    let $ano = DOM('[data-js="inputAno"]');
    let $placa = DOM('[data-js="inputPlaca"]');
    let $cor = DOM('[data-js="inputCor"]');
    let $form = DOM('[data-js="formCadastro"]');
    let $corpoTabela = DOM('[data-js="tbody"]')
    let $status = DOM('[data-js="statusTable"]');

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

        fragamentTable.appendChild(trTable)
        $corpoTabela.get().appendChild(fragamentTable)

      },

      



    }
  })()

  app.init()


})(window.DOM, window, document );
