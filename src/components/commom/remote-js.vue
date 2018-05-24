<template>
  <remote-js src></remote-js>
</template>
<script>
  export default {
    components: {
      'remote-js': {
        render(createElement) {
          return createElement('script', { attrs: { type: 'text/javascript', src: this.src }});
        },
        props: {
          src: { type: String, required: true },
        },
      },
    },
  }
</script>
