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
                <h4><span class="float-left">Açaí Top - Confirme seu pedido</span></h4> <br>
            </div>
        </div>

<br>
        
        <div class="row">
            <div class="col m12 d12">
                
                <div class="table-responsive">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th colspan="2" scope="col">Detalhes do Pedido</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>                            
                            <td>Tamanho</td>
                            <td>{{ tamanhoEscolhido.descricao }}</td>
                        </tr>
                        <tr>                            
                            <td>Sabor</td>
                            <td>{{ saborEscolhido.descricao }}</td>
                        </tr>
                        <tr>                            
                            <td>Tempo de Preparo</td>
                            <td>{{ tempoTotal }} minutos</td>
                        </tr>
                        <tr>                            
                            <td>Adicionais</td>
                            <td>
                                <ul class="list-group">
                                    <li v-for="adicional in adicionaisSelecionados" v-bind:key="adicional.id" class="list-group-item d-flex justify-content-between align-items-center">
                                        {{ adicional.descricao }}
                                        <span class="badge badge-primary badge-pill">{{ adicional.quantidade }}</span>
                                    </li>
                                    
                                </ul>
                            </td>
                        </tr>

                        <tr>                            
                            <td>Valor total a Pagar</td>
                            <td>{{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorTotal) }}</td>
                        </tr>
                        
                        </tbody>
                    </table>
                </div>

                <br>        

                <button type="button" class="btn btn-secondary" @click="refazerPedido">Refazer</button> <span style="margin:5px;"></span>
                <button type="button" class="btn btn-primary" @click="confirmarPedido">Confirmar Pedido</button>
                
                
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
  name: 'Confirma',
  components: {},
  
  data(){
      return{

          tamanhoEscolhido:{},
          saborEscolhido: {},
          valorTotal:0,
          tempoTotal:0,
          adicionaisSelecionados:[],
      }
  },

  mounted() {

    this.tamanhoEscolhido = JSON.parse(localStorage.getItem("tamanhoEscolhido"))
    this.saborEscolhido = JSON.parse(localStorage.getItem("saborEscolhido"))
    this.tempoTotal = JSON.parse(localStorage.getItem("tempoTotalParcial"))
    this.valorTotal = JSON.parse(localStorage.getItem("valorTotalParcial"))
    this.adicionaisSelecionados = JSON.parse(localStorage.getItem("adicionaisSelecionados"))

    this.adicionaisSelecionados.splice(0,1);

    /* Verifica se escolheu os itens opcionais do açaí */
    if(!this.valorTotal){
        this.$router.push('/monte');
    }
            
},

  

  methods:{

      refazerPedido(){
          /* this.valorTotal = 0.0
          this.tempoTotal = 0
          localStorage.setItem("valorTotalParcial", JSON.stringify(this.valorTotal));
          localStorage.setItem("tempoTotalParcial", JSON.stringify(this.tempoTotal)); */
          this.$router.push('/monte');
      },

      confirmarPedido(){
          alert('Seu pedido foi confirmado com sucesso! Em breve você receberá seu açaí top!');

          this.$router.push('/');
      }


  }
}
</script>

<style>

</style>
