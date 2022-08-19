<template>
    <!-- source: https://codepen.io/regis_011/pen/Yzzgdog -->
    <div class="progressbar">
    <div
      :class="barClass"
      :style="barStyle"
      class="progressbar-bar"
    >
      <slot/>
    </div>
  </div>
</template>

<script>


export default {
name: 'ProgressBar',
props: {
    value: {
        type: Number,
        default: 0
      },
      barClass: {
        type: String,
        default: ''
      },
      origin: {
        type: String,
        default: 'left'
      },
      scale: {
        type: String,
        default: 'X',
        validator: v => ['X', 'Y'].includes(v)
      }
  },
    data() {
        return {
            ready: false
        }
    },
    computed: {
        barStyle() {
            if (!this.ready) {
            return {
                transform: `scale${this.scale}(0)`
            }
            }

            return {
            transform: `scale${this.scale}(${this.value * 0.01})`,
            transformOrigin: `${this.origin}`
            }
        }
        },
    mounted() {
        setTimeout(() => { this.ready = true }, 0)
    },
    
}
    

</script>


<style lang="scss">

$progressbar-height: 1.25rem !default;
$progressbar-background: #e6e6e6 !default;
$progressbar-bar-height: 100% !default;
$progressbar-bar-width: 100% !default;
$progressbar-bar-background: #C4C4C4 !default;
$progressbar-bar-transition: transform 2s ease !default;

.progressbar {
  height: $progressbar-height;
  background: $progressbar-background;

  &-bar {
    height: $progressbar-bar-height;
    background: $progressbar-bar-background;
    transition: $progressbar-bar-transition;
  }
}

.bg-info {
  background-color: #0078D4 !important;
}

</style>