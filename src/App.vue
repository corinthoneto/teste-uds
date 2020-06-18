<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/monte">Monte seu açaí</router-link> | 
      <router-link to="/about">Quem somos</router-link>
      
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.topo_produto {
    height: 160px; width: 100%;
    
    margin-top: -25px;
    margin-bottom: 5px;
    object-fit: cover;
    border-radius: 10px;
}

.meuFooter{
  margin-bottom: 0px; background-color: #d3d3d3; position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   
   color: #00008B;
   text-align: center;
}


</style>
