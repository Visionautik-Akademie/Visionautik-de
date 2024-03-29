<template>
  <div
    class="va-mo--Video"
    :style="`padding-bottom: ${100 / (aspectRatio || calculatedAspectRatio)}%`"
  >
    <video
      class="va-mo--Video__video"
      :poster="thumbnail"
      v-if="src"
      ref="video"
      @timeupdate="handleVideoTimeUpdate"
    >
      <source :src="src" type="video/mp4" />
    </video>
    <div
      class="va-mo--Video__controls initial"
      @click="handleVideoClick"
      ref="controls"
    >
      <va-at--Icon
        :name="playStateIconName"
        size="5rem"
        class="va-mo--Video__controls__play-state-icon"
      />
      <div
        class="va-mo--Video__controls__bottom-controls"
        @mousemove="handleBottomControlsMouseover"
        @click.stop="handleBottomControlsClick"
      >
        <div class="va-mo--Video__controls__bottom-controls__progress-bar">
          <div
            class="va-mo--Video__controls__bottom-controls__progress-bar__elapsed-indicator"
            :style="`width: ${progress}%;`"
          />
          <div
            class="va-mo--Video__controls__bottom-controls__progress-bar__remaining-indicator"
          />
          <div
            class="va-mo--Video__controls__bottom-controls__progress-bar__mouse-position-indicator"
            :style="`width: ${bottomControlsMouseoverProgress}%`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/atoms/Icon.vue'
export default {
  name: 'va-mo--Video',
  components: { 'va-at--Icon': Icon },
  props: {
    src: String,
    thumbnail: String,
    aspectRatio: String | Number,
  },

  data() {
    return {
      calculatedAspectRatio: 1.778,
      playStateIconName: 'play',
      currentTime: 0,
      duration: null,
      bottomControlsMouseoverProgress: 0,
    }
  },

  computed: {
    progress() {
      return (this.currentTime / this.duration) * 100
    },
  },

  methods: {
    handleVideoClick() {
      this.$refs.controls.classList.remove('initial')
      const video = this.$refs.video
      const playStateIcon = this.$refs.controls.querySelector(
        '.va-mo--Video__controls__play-state-icon'
      )
      playStateIcon.classList.remove('fade')
      requestAnimationFrame(() => {
        playStateIcon.classList.add('fade')
      })

      if (video.currentTime > 0 && !video.paused && !video.ended) {
        video.pause()
        this.playStateIconName = 'pause'
      } else {
        video.play()
        this.playStateIconName = 'play'
      }
    },

    handleVideoTimeUpdate(event) {
      this.currentTime = event.target.currentTime
    },

    handleBottomControlsMouseover(event) {
      this.bottomControlsMouseoverProgress =
        (event.offsetX / event.target.offsetWidth) * 100
    },

    handleBottomControlsClick(event) {
      this.$refs.video.currentTime =
        (event.offsetX / event.target.offsetWidth) * this.duration
    },
  },

  mounted() {
    const video = this.$refs.video
    this.calculatedAspectRatio = video.videoWidth / video.videoHeight

    this.duration = video.duration

    video.addEventListener(
      'loadedmetadata',
      () => (this.duration = video.duration)
    )

    const bottomControls = this.$refs.controls.querySelector(
      '.va-mo--Video__controls__bottom-controls'
    )
  },
}
</script>

<style lang="scss" scoped>
.va-mo--Video {
  position: relative;
  padding-bottom: 50px;
  -webkit-tap-highlight-color: transparent;

  &__video {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  &__controls {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    background-color: transparentize($color: black, $amount: 0.5);
    color: white;
    justify-content: center;
    align-items: center;

    opacity: 0;

    &:hover {
      opacity: 1;
    }

    &__play-state-icon {
      opacity: 0;

      &.fade {
        animation-name: fadePlayStateIcon;
        animation-duration: $duration--slow;
        animation-timing-function: ease;

        @keyframes fadePlayStateIcon {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      }
    }

    &.initial {
      opacity: 1;
      background-color: transparent;

      &:hover {
        background-color: transparentize($color: black, $amount: 0.75);
      }
    }

    &.initial &__play-state-icon {
      opacity: 1;
    }

    &.initial &__bottom-controls {
      opacity: 0;
    }

    &__bottom-controls {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: $spacing__micro--xl 0;
      margin: 0 $spacing__micro--xl;
      cursor: pointer;

      &__progress-bar {
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        pointer-events: none;

        &__elapsed-indicator,
        &__remaining-indicator {
          height: $spacing__micro--xs;
        }

        &__elapsed-indicator {
          background-color: red;
          transition: width $duration--medium;
        }

        &__remaining-indicator {
          background-color: rgba(255, 255, 255, 0.15);
          flex-grow: 1;
        }

        &__mouse-position-indicator {
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.15);
          display: none;
        }
      }

      &:hover &__progress-bar__mouse-position-indicator {
        display: initial;
      }
    }
  }
}
</style>