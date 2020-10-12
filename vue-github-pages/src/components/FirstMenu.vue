<template>
  <div class="first">
      <h2 class="title-text">TITLE</h2>

      <ul class="obj-list">
          <li class="obj"></li>
          <li class="obj"></li>
          <li class="obj"></li>
      </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

.first {
    background-color: violet;
    width: 100%;
    height: 100%;
    display: flex;
    margin: 0 auto;
}

.title-text {
    margin-left: 30px;
}

.obj-list {
    list-style: none;
    width: 100%;
    margin: 0 auto;
    margin-top: 70px;
    position: absolute;
    background-color: wheat;
    padding: 0;
    display: flex;
}

.obj {
    width: 200px;
    height: 200px;
    background-color: turquoise;
    margin: 10px;
}

</style>