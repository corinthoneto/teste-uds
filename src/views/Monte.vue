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
                <h4><span class="float-left">Açaí Top - Tamanho e Sabor</span></h4> <br>
            <h6><span class="float-left">Escolha qual seu açaí (Obrigatório)</span></h6>
            </div>
        </div>

        <form @submit.prevent="confirmaPasso1()">
        <div class="row">
            <div class="col m12 d12">
                <div class="form-group">
                    <label for="selTamanho">Escolha o tamanho</label>
                    <select class="form-control" id="selTamanho" @change="changeTamanho($event)" required v-model="tamanhoSelecionado">
                        <option v-for="tamanho in tamanhos" v-bind:key=tamanho.id :value="tamanho">
                            {{tamanho.descricao}} / {{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(tamanho.valor)}}
                        </option>
                    </select>
                </div>
            </div>
        </div>

         <div class="row">
            <div class="col m12 d12">
                <div class="form-group">
                    <label for="selSabor">Escolha o sabor</label>
                    <select class="form-control" id="selSabor" @change="changeTamanho($event)" required v-model="saborSelecionado">
                        <option v-for="sabor in sabores" v-bind:key=sabor.id :value="sabor">
                            {{sabor.descricao}}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        

        <button type="submit" class="btn btn-primary">Avançar</button>

        </form>
        
    </div>
    
    <div class="fixed-bottom" style="margin-bottom: 10px; background-color: #d3d3d3;">
        <strong>Valor Total:</strong> {{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorTotal) }} <br>
        <strong>Tempo de Preparo:</strong> {{ tempoTotal }} minutos
    </div>

  </div>
</template>


<script>

//import BoasVindas from '@/components/BoasVindas.vue'

export default {
  name: 'Monte',
  components: {},
  
  data(){
      return{
          tamanhos:[],
          sabores:[],
          tamanhoSelecionado: {id: 0, valor: 0, descricao: "Selecione", tempoPreparo: 5 },
          saborSelecionado: {id: 0, descricao: "Selecione", tempoAdicional: 0 },
          adicional: 0,
          valorTotal:0,
          tempoTotal:0
          
      }
  },

  created() {

      this.getTamanhos()
      this.getSabores()
    
  },

  methods:{

      getTamanhos(){
          fetch("/api/tamanhos")
            .then(res => res.json())
            .then(json => {
                this.tamanhos = json.tamanhos
            })
      },

      getSabores(){
          fetch("/api/sabors")
            .then(res => res.json())
            .then(json => {
                this.sabores = json.sabors
            })
      },
      
      changeTamanho(event){
          console.log(event)
          this.calculaTotalValor()
          this.calculaTempoPreparo()
      },

      calculaTotalValor(){
          let total = 0.0
          total = this.tamanhoSelecionado.valor + this.adicional

          this.valorTotal = total
      },

      calculaTempoPreparo(){
          let tempoTotal = 0

          if(this.saborSelecionado.tempoAdicional > 0){
              alert("O sabor " + this.saborSelecionado.descricao + " adiciona +" + this.saborSelecionado.tempoAdicional + 
              " minutos ao preparo ok?");
          }

          tempoTotal = tempoTotal + this.tamanhoSelecionado.tempoPreparo + this.saborSelecionado.tempoAdicional
          this.tempoTotal = tempoTotal
      },

      confirmaPasso1(){
          if(this.tamanhoSelecionado.id > 0 && this.saborSelecionado.id > 0){
              localStorage.setItem("tamanhoEscolhido", JSON.stringify(this.tamanhoSelecionado));
              localStorage.setItem("saborEscolhido", JSON.stringify(this.saborSelecionado));
              localStorage.setItem("valorTotalParcial", JSON.stringify(this.valorTotal));
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
    
    margin-bottom: 24px;
    object-fit: cover;
    border-radius: 4px;
}

</style>
