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
                            <td>{{ adicional.descricao }}</td>
                            <td><button type="button" class="btn btn-danger btn-sm">-</button> 0 <button type="button" class="btn btn-success btn-sm">+</button></td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>

         <br>        

        <button type="button" class="btn btn-secondary" @click="$router.go(-1)">Voltar</button> <span style="margin:5px;"></span>
        <button type="submit" class="btn btn-primary">Avançar</button>

    </div>
    
    <div class="fixed-bottom" style="margin-bottom: 10px; background-color: #d3d3d3;">
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

      confirmaPasso1(){
          if(this.tamanhoSelecionado.id > 0 && this.saborSelecionado.id > 0){
              localStorage.setItem("tamanhoEscolhido", JSON.stringify(this.tamanhoSelecionado));
              localStorage.setItem("saborEscolhido", JSON.stringify(this.saborSelecionado));
              localStorage.setItem("tempoTotalParcial", JSON.stringify(this.tempoTotal));
              this.$router.push('/personaliza');
          }else{
              alert("Tamanho e Sabor são obrigatórios!");
          }
      }


  }
}
</script>

<style>

.topo_produto{
    height: 260px; width: 100%;
    
    margin-bottom: 5px;
    object-fit: cover;
    border-radius: 10px;
}

</style>
