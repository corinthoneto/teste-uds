<template>
  <div class="home">
    <img alt="logotipo" src="../assets/acai-logo2.png">
    <BoasVindas msg="Bem vindo ao Açaí Personalizado" />
  </div>
</template>

<script>
// @ is an alias to /src
import BoasVindas from '@/components/BoasVindas.vue'

export default {
  name: 'Home',
  components: {
    BoasVindas
  }
}
</script>
