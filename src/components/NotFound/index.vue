<template>
  <div class="not-found">
    <h1 class="heading">404</h1>
    <p class="info">We told you not to stray too far from the ship!</p>
    <img
      src="@/assets/image/404/astronaut.png"
      alt="Moon Man"
      class="astronaut floating"
    >
    <button
      class="button"
      @click="handleToHome"
    >TAKE ME BACK!</button>
    <img
      src="@/assets/image/404/earth.png"
      alt="earth"
      class="earth"
    >
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  setup () {
    const router = useRouter()
    const handleToHome = () => {
      router.push({
        name: 'recommend'
      })
    }

    return {
      handleToHome
    }
  }
}
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  .heading {
    font-size: 95px;
    padding: 20px;
  }
  .astronaut {
    z-index: 1;
    width: 120px;
    margin: 20px auto;
  }
  .info {
    margin-bottom: 20px;
  }
  .button {
    background-color: transparent;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    color: #fff;
    border: 1px solid #fff;
    height: 45px;
    width: 170px;
    line-height: 45px;
    outline: none;
  }
  .floating {
    animation: 5s ease-in-out infinite Floatingx;
    -webkit-animation: 5s ease-in-out infinite Floatingx;
  }
  .earth {
    width: 100%;
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 0;
  }
  @-webkit-keyframes Floatingx {
    0% {
      transform: translate(0px, 0px);
    }
    50% {
      transform: translate(0px, -15px);
    }
    100% {
      transform: translate(0px, 0px);
    }
  }

  @keyframes Floatingx {
    0% {
      transform: translate(0px, 0px);
    }
    50% {
      transform: translate(0px, -15px);
    }
    100% {
      transform: translate(0px, 0px);
    }
  }
}
</style>