<template>
  <div class="song-list_wrapper">
    <ul>
      <li
        v-for="(song, index) in songList"
        :key="song.mid"
        class="item"
        @click="selectSong(song, index)"
      >
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    songList: {
      type: Array,
      default: () => []
    }
  },
  setup (props, { emit }) {
    const getDesc = song => `${song.singer}·${song.album}`

    const selectSong = (song, index) => { emit('selectSong', song, index) }
    return {
      getDesc,
      selectSong
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/mixin.scss';
.song-list_wrapper {
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: $font-size-medium;
    .content {
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name {
        @include no-wrap;
        color: $color-text;
      }
      .desc {
        @include no-wrap;
        margin-top: 4px;
        color: $color-text-d;
      }
    }
  }
}
</style>