export default {
  data() {
    return {
      tooltip: {
        show: false
      }
    }
  },
  methods: {
    renderTooltip(h, slot) {
      if (!this.htmlDescription) return
      if (this.fullOptions.hideTooltips) return
      return h('v-tooltip', {
        slot,
        props: { value: this.tooltip.show, bottom: true, openOnHover: true, openOnClick: true, contentClass: 'vjsf-tooltip' },
        scopedSlots: {
          activator: () => h('v-btn', {
            on: {
              mouseover: () => { this.tooltip.show = true },
              mouseleave: () => { this.tooltip.show = false }
            },
            props: { icon: true },
            style: 'pointer-events: auto' // necessary or the tooltip is disabled on readOnly props
          }, [h('v-icon', { }, this.fullOptions.icons.info)])
        }
      }, [
        h('div', { domProps: { innerHTML: this.htmlDescription } })
      ])
    }
  }
}
