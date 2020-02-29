import Vue from 'vue'
import Vuetify from 'vuetify'
import Draggable from 'vuedraggable'
import Swatches from 'vue-swatches'
import { Sketch } from 'vue-color'

import { createLocalVue, mount } from '@vue/test-utils'
import VJsf from '../lib/VJsfNoDeps.js'
import ExampleForm from './example-form.vue'
import { examples, defaultTemplate } from '../doc/examples'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.component('v-jsf', VJsf)
localVue.component('swatches', Swatches)
localVue.component('draggable', Draggable)
localVue.component('color-picker', Sketch)

describe('Examples used as simple test cases', () => {
  examples.forEach(example => {
    test(example.title, () => {
      const vuetify = new Vuetify({ mocks: { $vuetify: { theme: { themes: {} } } } })

      // localVue.use(Vuetify)

      // const wrapper = mount(VJsf, { vuetify, propsData: example })
      // Vue.options.components.VForm.$options.components = Vue.options.components
      // const wrapper = mount(localVue.options.components.VForm, {
      const template = (example.template || defaultTemplate)
        .replace('"model"', '"props.model"')
        .replace('"schema"', '"props.schema"')
        .replace('"options"', '"props.options"')
      const wrapper = mount(ExampleForm, {
        localVue,
        vuetify,
        scopedSlots: {
          default: template
        },
        propsData: {
          model: example.model || {},
          schema: example.schema,
          options: example.options || {}
        }
      })
      expect(wrapper.isVueInstance()).toBeTruthy()
      expect(wrapper.element).toMatchSnapshot()
      if (example.test) example.test(wrapper)
    })
  })
})
