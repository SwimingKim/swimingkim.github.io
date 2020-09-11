<template>
  <div>
    <div class="menu">
      <img class="log-img" src="../src/assets/logo.png">

      <ul class="menu-list">
        <router-link class="menu-item" to="/1">
          Menu1
        </router-link>
        <router-link class="menu-item" to="/2">
          Menu2
        </router-link>
        <router-link class="menu-item" to="/3">
          Menu3
        </router-link>
        <router-link class="menu-item" to="/4">
          Menu4
        </router-link>
        <router-link class="menu-item" to="/5">
          Menu5
        </router-link>
        <router-link class="menu-item" to="/6">
          Menu6
        </router-link>
      </ul>
    </div>

    <div class="contents">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>

const value = 10;
console.log("sss", value)

export default {
  name: 'App',
  components: {
  }
}
</script>

<style> 
body {
  margin: 0;
}

.log-img {
  width: 50px;
  height: 50px;
  padding-top: 50px;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  margin: 0 auto;
}

.menu {
  margin: 0;
  padding: 0;
  /* background: steelblue; */
  position: absolute;
  width: 150px;
  height: 100%;
}

.menu-list {
  list-style: none;
  position: sticky;
  padding: 0;
}

.menu-item {
  color: azure;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 20px;
}

.contents {
  float: right;
  background-color: darkgrey;
  margin: 0 auto;
  display: flex;
  position: absolute;
  margin-left: 150px;
  height: 100%;
  width: calc(100% - 150px);
}

</style>
