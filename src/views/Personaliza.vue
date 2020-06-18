<template>
  <div>   

    <div class="container">        
        <div class="row">
            <div class="col m12 d12">
                <img alt="Imagem Açaí" src="@/assets/taca-acai.jpg" class="topo_produto">
            </div>
        </div>

        <div class="row">            
            <div class="col m12 d12"> 
                <h4><span class="float-left">Açaí Top - Adicionais</span></h4> <br>
            <h6><span class="float-left">Quer incrementar seu açaí? (Opcional)</span></h6>
            </div>
        </div>

<br>
        
        <div class="row">
            <div class="col m12 d12">
                <form @submit.prevent="confirmaPasso2()">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">Opcional</th>
                            <th scope="col">Qtde</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr v-for="adicional in adicionais" v-bind:key="adicional.id">
                            <td>{{ adicional.descricao }} (+ {{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(adicional.valor) }})</td>
                            <td><button type="button" class="btn btn-danger btn-sm" @click="subtraiQuantidade(adicional)">-</button> {{ adicional.quantidade }} <button type="button" class="btn btn-success btn-sm" @click="adicionaQuantidade(adicional)">+</button></td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <br>        

                <button type="button" class="btn btn-secondary" @click="$router.go(-1)">Voltar</button> <span style="margin:5px;"></span>
                <button type="submit" class="btn btn-primary">Avançar</button>
                
                </form>
            </div>
        </div>

         

    </div>

    <br><br>
    
    <div class="meuFooter">
        <strong>Valor Total:</strong> {{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorTotal) }} <br>
        <strong>Tempo de Preparo:</strong> {{ tempoTotal }} minutos
    </div>

  </div>
</template>


<script>

export default {
  name: 'Personaliza',
  components: {},
  
  data(){
      return{
          adicionais:[],
          adicionaisSelecionados:[{id: 0, quantidade: 0, descricao: ""}],
          
          adicional: 0,
          valorTotal:0,
          tempoTotal:0
          
      }
  },

  mounted() {
            //let tamanhoEscolhido = JSON.parse(localStorage.getItem("tamanhoEscolhido"))
            //let saborEscolhido = JSON.parse(localStorage.getItem("saborEscolhido"))
            let tempoTotalParcial = JSON.parse(localStorage.getItem("tempoTotalParcial"))
            let valorTotalParcial = JSON.parse(localStorage.getItem("valorTotalParcial"))

            /* Verifica se escolheu os itens opcionais do açaí */
            if(!valorTotalParcial){
                this.$router.push('/monte');
            }

            this.valorTotal = valorTotalParcial
            this.tempoTotal = tempoTotalParcial
            
            
        },

  created() {

      this.getAdicionais()
      
    
  },

  methods:{

      getAdicionais(){
          fetch("/api/adicionals")
            .then(res => res.json())
            .then(json => {
                this.adicionais = json.adicionals
            })
      }, 

      adicionaQuantidade(adicional){
          adicional.quantidade++;

          this.adicionaisSelecionados[adicional.id] = {id: adicional.id, quantidade: adicional.quantidade, descricao: adicional.descricao}

          this.valorTotal = this.valorTotal + adicional.valor
          this.tempoTotal = this.tempoTotal + adicional.tempoPreparo 

      },

      subtraiQuantidade(adicional){
          adicional.quantidade--;
          
          if(adicional.quantidade < 0){
              adicional.quantidade = 0
              this.adicionaisSelecionados[adicional.id] = {id: adicional.id, quantidade: 0, descricao: adicional.descricao}
              //this.adicionaisSelecionados.splice(adicional.id, 1);

              return true
          }

          this.adicionaisSelecionados[adicional.id] = {id: adicional.id, quantidade: adicional.quantidade, descricao: adicional.descricao}

          this.valorTotal = this.valorTotal - adicional.valor
          this.tempoTotal = this.tempoTotal - adicional.tempoPreparo

      },

      confirmaPasso2(){
          localStorage.setItem("valorTotalParcial", JSON.stringify(this.valorTotal));
          localStorage.setItem("tempoTotalParcial", JSON.stringify(this.tempoTotal));
          localStorage.setItem("adicionaisSelecionados", JSON.stringify(this.adicionaisSelecionados));

          this.$router.push('/confirmacao');
      }


  }
}
</script>

<style>

</style>
