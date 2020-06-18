import { Server, Model } from 'miragejs'

export function makeServer({ environment = "development" } = {}) {

let server = new Server({
  environment,

    models: {
      tamanho: Model,
      sabor: Model,
      adicional: Model,
    },

  /* Tempo de preparo = tempoPreparo / Valor em minutos*/
  seeds(server) {
    server.create("tamanho", {id: 1, valor: 10.00, descricao: "pequeno (300ml)", tempoPreparo: 5 })
    server.create("tamanho", {id: 2, valor: 13.00, descricao: "médio   (500ml)", tempoPreparo: 7 })
    server.create("tamanho", {id: 3, valor: 15.00, descricao: "grande  (700ml)", tempoPreparo: 10 })

    /* Tempo Adicional = tempoAdicional / Valor em minutos*/
    server.create("sabor", {id: 1, descricao: "Morango", tempoAdicional: 0 })
    server.create("sabor", {id: 2, descricao: "Banana",  tempoAdicional: 0 })
    server.create("sabor", {id: 3, descricao: "Kiwi",  tempoAdicional: 5 })

    /* Tempo de preparo = tempoPreparo / Valor em minutos*/
    server.create("adicional", {id: 1, valor: 3.00, descricao: "Leite Ninho", tempoPreparo: 0 })
    server.create("adicional", {id: 2, valor: 0.00, descricao: "Granola", tempoPreparo: 0 })
    server.create("adicional", {id: 3, valor: 3.00, descricao: "Paçoca", tempoPreparo: 3 })
  },

  routes() {

    this.namespace = "api"

    this.get("/tamanhos", schema => {
      return schema.tamanhos.all()
    })

    this.get("/sabors", schema => {
        return schema.sabors.all()
    })

    this.get("/adicionals", schema => {
      return schema.adicionals.all()
  })
    
  },
  })

  return server
}