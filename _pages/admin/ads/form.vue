<template>
  <div id="AdFormPage" :key="pageId">
    <!--Content-->
    <div id="contentAdFormPage" class="relative-position">
      <!--Form-->
      <div class="row q-col-gutter-md">
        <!--Main Fields-->
        <div class="col-12 col-md-7">
          <div class="box">
            <dynamic-field v-for="(field, keyField) in formFields.main" :key="keyField" :field="field"
                           v-model="form[field.name || keyField]"/>
          </div>
        </div>
        <!--Groups Fields-->
        <div class="col-12 col-md-5">
          <!--Categories-->
          <q-expansion-item icon="fas fa-layer-group" :label="$trp('ui.form.category')" class="box-collapse q-mb-md"
                            header-class="header-container">
            <!--Category block-->
            <div v-for="(category, keyCategory) in categories" class="category-content">
              <!--Title-->
              <div class="category-title row items-center">
                <q-icon name="fas fa-circle" size="10px" class="q-mr-xs"/>
                {{ category.title }}
              </div>
              <!--Children categories-->
              <div v-for="(cCategory, indexCCategory) in category.children" :key="indexCCategory"
                   :class="`category-children ${form.categories.indexOf(cCategory.id) != -1 ? 'active' : ''}`"
                   @click="toggleSelectCategory(cCategory)">
                {{ cCategory.title }}
              </div>
            </div>
          </q-expansion-item>
          <!--Schedules-->
          <q-expansion-item icon="fas fa-clock" :label="$tr('ui.form.schedule')" class="box-collapse q-mb-md"
                            header-class="header-container" expand-separator>
            <dynamic-field v-for="(field, keyField) in formFields.schedules" :key="keyField" :field="field"
                           v-model="form[field.name || keyField]"/>
          </q-expansion-item>
          <!--Map-->
          <q-expansion-item icon="fas fa-map-marker-alt" :label="$tr('ui.label.map')" class="box-collapse q-mb-md"
                            header-class="header-container" expand-separator>
            <dynamic-field v-for="(field, keyField) in formFields.map" :key="keyField" :field="field"
                           v-model="form[field.name || keyField]"/>
          </q-expansion-item>
        </div>
      </div>
      <!--Inner loading-->
      <inner-loading :visible="loading"/>
    </div>
  </div>
</template>
<script>
//Components
export default {
  beforeDestroy() {
    this.$root.$off('page.data.refresh')
  },
  props: {},
  components: {},
  watch: {},
  mounted() {
    this.$nextTick(function () {
      this.init()
    })
  },
  data() {
    return {
      pageId: this.$uid(),
      loading: false,
      data: [],
      categories: [],
      form: {
        categories: []
      }
    }
  },
  computed: {
    formFields() {
      return {
        main: {
          title: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('ui.form.title')}*`,
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
            },
          },
          slug: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('ui.form.slug')}*`,
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
            },
          },
          description: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('ui.form.description')}*`,
              type: 'textarea',
              rows: "3",
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
            },
          },
          userId: {
            value: null,
            type: 'select',
            props: {
              label: `${this.$tr('ui.label.user')}*`,
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
            },
            loadOptions: {
              apiRoute: 'apiRoutes.quser.users',
              select: {label: 'fullName', id: 'id'}
            }
          },
          provinceId: {
            value: null,
            type: 'select',
            props: {
              label: this.$tr('ui.label.department') + '*',
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qlocations.provinces',
              select: {label: 'name', id: 'id'},
              requestParams: {filter: {country: 48}}//only Colombia country
            }
          },
          cityId: {
            value: null,
            type: 'select',
            props: {
              label: this.$tr('ui.form.city') + '*',
              readonly: (this.form.provinceId ? false : true),
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
            },
            loadOptions: {
              apiRoute: this.form.provinceId ? 'apiRoutes.qlocations.cities' : false,
              select: {label: 'name', id: 'id'},
              requestParams: {filter: {province_id: this.form.provinceId}}//only Colombia country
            }
          },
          status: {
            value: '1',
            type: 'select',
            props: {
              label: `${this.$tr('ui.form.status')}*`,
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qad.adStatus',
              select: {label: 'name', id: 'id'}
            }
          },
          featured: {
            value: 0,
            type: 'checkbox',
            props: {
              label: `${this.$tr('ui.label.featured')}`,
              trueValue: 1,
              falseValue: 0,
            }
          },
        },
        schedules: {
          schedules: {
            value: null,
            type: 'schedule',
            props: {
              //label: `${this.$tr('ui.label.schedules')}`,
            }
          },
        },
        map: {
          coordinates: {
            value: null,
            type: 'positionMarkerMap',
          },
        },
      }
    }
  },
  methods: {
    init() {
      //Get data
      this.getData()
      //Listen refresh page
      this.$root.$on('page.data.refresh', () => {
        this.pageId = this.$uid()
        this.getData(true)
      })
    },
    //Get data
    async getData(refresh = false) {
      this.loading = true
      await Promise.all([
        this.getCategories(refresh)
      ])
      this.loading = false
    },
    //Get data
    getCategories(refresh = false) {
      return new Promise((resolve, reject) => {
        //Requets params
        let requestParams = {
          refresh: refresh
        }
        //Request
        this.$crud.index('apiRoutes.qad.categories', requestParams).then(response => {
          this.categories = this.$array.builTree(response.data)
          resolve(response.data)
        }).catch(error => {
          resolve(false)
        })
      })
    },
    //Toogle select category
    toggleSelectCategory(category) {
      let index = this.form.categories.findIndex(item => item == category.id)//Search item in array
      if (index == -1) this.form.categories.push(category.id)//Add item
      else this.form.categories.splice(index, 1)//Remove item
    }
  }
}
</script>
<style lang="stylus">
#AdFormPage
  .category-content
    padding 10px

    .category-title
      font-weight bold
      color $blue-grey
      margin-bottom 5px
      text-transform uppercase

    .category-children
      display inline-block
      background $grey-3
      border-radius 5px
      padding 3px
      cursor pointer
      margin 4px

      &.active
        background $green
        color white
</style>
