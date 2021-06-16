<template>
  <div id="AdFormPage" :key="pageId">
    <!--Content-->
    <div id="contentAdFormPage" class="relative-position">
      <!--Form-->
      <div class="row q-col-gutter-md">
        <!--Main Fields-->
        <q-form autocorrect="off" autocomplete="off" ref="formAd" class="col-12 col-lg-8 offset-lg-2"
                @submit="adId ? updateItem() : createItem()"
                @validation-error="$alert.error($tr('ui.message.formInvalid'))">
          <!--Language-->
          <div v-show="locale.fieldsTranslatable && Object.keys(locale.fieldsTranslatable).length">
            <locales v-model="locale" ref="localeComponent" :form="$refs.formContent"/>
          </div>
          <!--Main Fields-->
          <div class="box q-mb-md">
            <!--Title-->
            <div class="text-blue-grey text-weight-bold text-subtitle1 row items-center">
              <q-icon name="fas fa-bullhorn" class="q-mr-sm"/>
              {{ $trp('qad.layout.form.newAd') }}
              <label v-if="adId" class="q-ml-sm">#{{ adId }}</label>
            </div>
            <q-separator class="q-mt-sm q-mb-md"/>
            <!--Fields-->
            <div v-if="locale.success">
              <dynamic-field v-for="(field, keyField) in formFields.main" :key="keyField" :field="field"
                             v-model="locale.formTemplate[field.name || keyField]" :language="locale.language"
                             @input="handlerInputChange((field.name || keyField))"/>
            </div>
          </div>
          <!--Extra Fields-->
          <div class="box q-mb-md" v-if="extraFields">
            <dynamic-field v-for="(field, keyField) in extraFields" :key="keyField" :field="field"
                           v-model="form[field.fakeFieldName || 'options'][field.name || keyField]"/>
          </div>
          <!--Locations-->
          <q-expansion-item icon="fas fa-map-marker-alt" :label="$trp('qad.layout.form.whereLocation')"
                            class="box-collapse q-mb-md" default-opened
                            header-class="header-container" group="fromAdExpansion">
            <div class="q-pa-md" v-if="locale.success">
              <dynamic-field v-for="(field, keyField) in formFields.location" :key="keyField" :field="field"
                             v-model="locale.formTemplate[field.name || keyField]"/>
            </div>
          </q-expansion-item>
          <!--Categories-->
          <q-expansion-item icon="fas fa-layer-group" :label="$trp('qad.layout.form.aboutAd')"
                            class="box-collapse q-mb-md"
                            header-class="header-container" group="fromAdExpansion">
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
          <!--Schedule-->
          <q-expansion-item icon="fas fa-clock" :label="$trp('qad.layout.form.availableSchedule')"
                            class="box-collapse q-mb-md"
                            header-class="header-container" expand-separator group="fromAdExpansion">
            <dynamic-field :field="formFields.schedule" v-model="form.options.schedule"
                           @converted="value => form.schedule = value"/>
          </q-expansion-item>
          <!--Contact-->
          <q-expansion-item icon="fas fa-address-book" :label="$trp('qad.layout.form.howContact')"
                            class="box-collapse q-mb-md"
                            header-class="header-container" expand-separator group="fromAdExpansion">
            <div class="q-pa-md">
              <dynamic-field v-for="(field, keyField) in formFields.contact" :key="keyField" :field="field"
                             v-model="form.options[field.name || keyField]"/>
            </div>
          </q-expansion-item>
          <!--Media-->
          <q-expansion-item icon="fas fa-photo-video" class="box-collapse q-mb-md" group="fromAdExpansion"
                            header-class="header-container" expand-separator
                            :label="$trp('qad.layout.form.photosAndVideo')">
            <div class="q-pa-md">
              <dynamic-field v-for="(field, keyField) in formFields.media" :key="keyField" :field="field"
                             v-model="form[field.name || keyField]" :item-id="adId"/>
            </div>
          </q-expansion-item>
          <!--Prices-->
          <q-expansion-item icon="fas fa-hand-holding-usd" :label="$trp('qad.layout.form.rates')"
                            class="box-collapse q-mb-md"
                            header-class="header-container" expand-separator group="fromAdExpansion">
            <div class="q-pa-md row q-col-gutter-x-sm">
              <!--Fields-->
              <dynamic-field v-for="(field, keyField) in pricesFields" :key="keyField" class="col-6"
                             :field="field" v-model="form.prices[field.name]"/>
              <!--Actions-->
              <div class="col-12 text-right">
                <q-btn @click="setPricesFields()" :label="$tr('ui.label.add')" color="green" rounded unelevated
                       size="10px"/>
              </div>
            </div>
          </q-expansion-item>
          <!--Ups-->
          <q-expansion-item icon="fas fa-rocket" :label="$trp('qad.layout.form.adUps')"
                            class="box-collapse q-mb-md" v-if="adInfo"
                            header-class="header-container" expand-separator group="fromAdExpansion">
            <div class="q-pa-md row q-col-gutter-x-sm">
              <!--Ups info-->
              <div class="col-12" v-if="adUps && adUps.length">
                <!--Title-->
                <div class="text-blue-grey text-weight-bold text-center">
                  {{ $tr('qad.layout.message.automaticUploads') }}
                </div>
                <!--Ups-->
                <q-list separator class="q-py-sm q-mb-md">
                  <q-item v-for="(up, upKey) in adUps" :key="upKey">
                    <q-item-section>
                      <!--Ups-->
                      <q-item-label>
                        <q-icon name="fas fa-arrow-alt-circle-up" class="q-mr-sm" color="blue-grey"/>
                        <label class="text-caption text-blue-grey">{{ $tr('qad.layout.form.upsDaily') }}</label>
                        {{ up.upsCounter }}/{{ up.upsDaily }},
                        <label class="text-caption text-blue-grey">{{ $tr('qad.layout.form.daysLimit') }}</label>
                        {{ up.daysCounter }}/{{ up.daysLimit }}
                      </q-item-label>
                      <!--Time-->
                      <q-item-label>
                        <q-icon name="fas fa-clock" class="q-mr-sm" color="blue-grey"/>
                        <label class="text-caption text-blue-grey">{{ $tr('ui.label.since') }}</label>
                        {{ $trd(`${up.fromDate} ${up.fromHour}`, {type: 'time'}) }}
                        <label class="text-caption text-blue-grey">{{ $tr('ui.label.until') }}</label>
                        {{ $trd(`${up.toDate} ${up.toHour}`, {type: 'time'}) }}
                      </q-item-label>
                      <!--Date-->
                      <q-item-label>
                        <q-icon name="fas fa-calendar" class="q-mr-sm" color="blue-grey"/>
                        <label class="text-caption text-blue-grey">{{ $tr('ui.label.since') }}</label>
                        {{ $trd(up.fromDate) }}
                        <label class="text-caption text-blue-grey">{{ $tr('ui.label.until') }}</label>
                        {{ $trd(up.toDate) }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
              <!--Actions-->
              <div class=" col-12 text-right">
                <q-btn :label="$tr('ui.label.boost')" color="green" rounded unelevated size="10px" icon="fas fa-rocket"
                       @click="$helper.openExternalURL(`${$store.state.qsiteApp.baseUrl}/pins/${adInfo.slug}/buy-up`, true)"/>
              </div>
            </div>
          </q-expansion-item>
        </q-form>
        <!--Action-->
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn :label="$tr('ui.label.save')" color="green" unelevated rounded @click="$refs.formAd.submit()"/>
        </q-page-sticky>
      </div>
      <!--Inner loading-->
      <inner-loading :visible="loading"/>
    </div>
  </div>
</template>
<script>
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
      adId: this.$route.params.id,
      adInfo: false,
      loading: false,
      renderMap: false,
      categories: [],
      extraFields: false,
      pricesFields: [],
      form: {
        categories: [],
        options: {},
        prices: {},
        mediasMulti: {},
        mediasSingle: {},
      },
      locale: {
        form: {},
        fields: {
          userId: this.$store.state.quserAuth.userId,
          countryId: null,
          provinceId: null,
          cityId: null,
          status: '2',
          checked: null,
          featured: null,
          lat: null,
          lng: null,
          map: null
        },
        fieldsTranslatable: {
          title: null,
          slug: null,
          description: null,
        }
      },
    }
  },
  computed: {
    //Form fields
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
              vIf: (config('app.mode') == 'iadmin') ? true : false,
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
              rows: "5",
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
              readonly: true,
              vIf: (config('app.mode') == 'iadmin') ? true : false,
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
            },
            loadOptions: {
              apiRoute: 'apiRoutes.quser.users',
              select: {label: 'fullName', id: 'id'}
            }
          },
          status: {
            value: '2',
            type: 'select',
            props: {
              label: `${this.$tr('ui.form.status')}*`,
              vIf: (config('app.mode') == 'iadmin') ? true : false,
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
              vIf: (config('app.mode') == 'iadmin') ? true : false,
              trueValue: 1,
              falseValue: 0,
            }
          },
          checked: {
            value: '0',
            type: 'checkbox',
            props: {
              label: `${this.$tr('qad.sidebar.checked')}`,
              vIf: (config('app.mode') == 'iadmin') ? true : false,
              trueValue: '1',
              falseValue: '0',
            }
          },
        },
        location: {
          countryId: {
            value: null,
            type: 'select',
            props: {
              label: this.$tr('ui.label.country') + '*',
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qlocations.countries',
              select: {label: 'name', id: 'id'},
            }
          },
          provinceId: {
            value: null,
            type: 'select',
            props: {
              label: this.$tr('ui.label.department') + '*',
              readonly: (this.locale.form.countryId ? false : true),
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
            },
            loadOptions: {
              apiRoute: this.locale.form.countryId ? 'apiRoutes.qlocations.provinces' : false,
              select: {label: 'name', id: 'id'},
              requestParams: {filter: {country: this.locale.form.countryId}}
            }
          },
          cityId: {
            value: null,
            type: 'select',
            props: {
              label: this.$tr('ui.form.city') + '*',
              readonly: (this.locale.form.provinceId ? false : true),
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
            },
            loadOptions: {
              apiRoute: this.locale.form.provinceId ? 'apiRoutes.qlocations.cities' : false,
              select: {label: 'name', id: 'id'},
              requestParams: {filter: {province_id: this.locale.form.provinceId}}
            }
          },
          map: {
            value: null,
            type: 'positionMarkerMap',
            props: {
              label: `${this.$tr('ui.label.search')}...`
            }
          }
        },
        schedule: {
          value: null,
          type: 'schedule',
          props: {
            //label: `${this.$tr('ui.label.schedules')}`,
          }
        },
        contact: {
          phone: {
            value: null,
            type: 'input',
            props: {
              label: this.$tr('ui.label.phone'),
              mask: 'phone',
              clearable: true,
              unmaskedValue: true
            }
          },
          whatsapp: {
            value: null,
            type: 'input',
            props: {
              label: 'Whatsapp',
              mask: 'phone',
              clearable: true,
              unmaskedValue: true
            }
          },
          facebook: {
            value: null,
            type: 'input',
            props: {
              label: 'Facebook',
              clearable: true,
            }
          },
          instagram: {
            value: null,
            type: 'input',
            props: {
              label: 'Instagram',
              clearable: true
            }
          },
          twitter: {
            value: null,
            type: 'input',
            props: {
              label: 'Twitter',
              clearable: true
            }
          },
          youtube: {
            value: null,
            type: 'input',
            props: {
              label: 'YouTube',
              clearable: true
            }
          }
        },
        media: {
          mediasSingle: {
            value: {},
            type: 'media',
            props: {
              label: this.$tr('ui.label.mainImage'),
              zone: 'mainimage',
              entity: "Modules\\Iad\\Entities\\Ad",
              entityId: null
            }
          },
          gallery: {
            name: 'mediasMulti',
            value: {},
            type: 'media',
            props: {
              label: `${this.$tr('ui.form.gallery')} (jpg,png,jpeg)`,
              zone: 'gallery',
              entity: "Modules\\Iad\\Entities\\Ad",
              entityId: null,
              multiple: true
            }
          },
          videos: {
            name: 'mediasMulti',
            value: {},
            type: 'media',
            props: {
              label: `Videos (mp4,avi)`,
              zone: 'videos',
              entity: "Modules\\Iad\\Entities\\Ad",
              entityId: null,
              multiple: true
            }
          }
        },
        map: {
          value: null,
          type: 'positionMarkerMap',
          props: {
            label: `${this.$tr('ui.label.search')}...`
          }
        },
      }
    },
    //Ups data
    adUps() {
      //Default response
      let response = []
      //Parse ad ups
      this.adInfo.adUps.forEach(up => {
        if (up.status) response.push(up)
      })
      //Response
      return response
    }
  },
  methods: {
    async init() {
      await Promise.all([
        this.getData(),//Get data
        this.$hook.dispatchEvent(
            (this.adId ? 'isUpdating' : 'isCreating'),
            {entityName: config('main.qad.entityNames.ad')}
        )
      ])
      //Set first price inputs
      let pricesValues = Object.keys(this.form.prices).length
      this.setPricesFields(pricesValues ? (pricesValues / 2) : 1)
      //Listen refresh page
      this.$root.$on('page.data.refresh', () => {
        this.pageId = this.$uid()
        this.getData(true)
      })
    },
    //Get data
    async getData(refresh = false) {
      this.loading = true
      //Get required data to form
      await Promise.all([
        this.getCategories(refresh),
        this.getExtraFields(refresh),
      ])
      //Get ad data
      await this.getAdData(refresh)
      this.loading = false
    },
    //Get ad data
    getAdData() {
      return new Promise(resolve => {
        if (!this.adId) return resolve(true)
        //Request Params
        let requestParams = {
          refresh: true,
          params: {
            include: 'fields,categories,adUps',
            filter: {allTranslations: true}
          }
        }
        //Request
        this.$crud.show('apiRoutes.qad.ads', this.adId, requestParams).then(response => {
          this.locale.form = response.data//Set locale data
          //Save ad info
          this.adInfo = response.data
          //Set fields data
          if (response.data.fields) response.data.fields.map((item, key) => this.form.fields[item.name] = item.value)
          //Set options fields
          if (response.data.options) this.form.options = response.data.options
          //Set categories
          if (response.data.categories) this.form.categories = response.data.categories.map(item => item.id)
          //Set prices
          if (response.data.options.prices) {
            response.data.options.prices.map((item, key) => {
              this.form.prices[`description${key}`] = item.description
              this.form.prices[`price${key}`] = item.value
            })
          }
          if (response.data.options.map) {
            this.locale.form.map = this.form.options.map
            this.locale.form.lat = this.form.options.map.lat
            this.locale.form.lng = this.form.options.map.lng
          }
          resolve(response.data)
        }).catch(error => {
          resolve(false)
        })
      })
    },
    //Get Categories
    getCategories(refresh = false) {
      return new Promise((resolve, reject) => {
        //Request params
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
    //Get extra fields
    getExtraFields(refresh = false) {
      return new Promise((resolve, reject) => {
        //Request params
        let requestParams = {
          refresh: refresh,
          params: {filter: {configName: 'Iad.crud-fields.ads'}}
        }
        //Request
        this.$crud.index('apiRoutes.qsite.configs', requestParams).then(response => {
          if (response.data) this.extraFields = response.data
          //Set fake fields
          Object.values(response.data).forEach(field => {
            if (field.fakeFieldName) this.$set(this.form, field.fakeFieldName, {})
          })
          //Resolve
          resolve(response.data)
        }).catch(error => resolve(false))
      })
    },
    //Set prices fields
    setPricesFields(quantity = 1) {
      let fieldNum = this.pricesFields.length ? this.pricesFields.length / 2 : 0

      for (var i = 0; i < quantity; i++) {
        this.pricesFields = [...this.pricesFields,
          {
            value: null,
            type: 'input',
            name: 'description' + (fieldNum + i),
            props: {
              label: this.$tr('ui.label.description')
            }
          },
          {
            value: null,
            name: 'price' + (fieldNum + i),
            type: 'input',
            props: {
              label: this.$tr('ui.label.price'),
              type: 'number',
              rules: [val => !val || (val >= 10) || this.$tr('ui.message.fieldMinValue', {num: 10})]
            }
          }
        ]
      }
    },
    //Toggle select category
    toggleSelectCategory(category) {
      let index = this.form.categories.findIndex(item => item == category.id)//Search item in array
      if (index == -1) this.form.categories.push(category.id)//Add item
      else this.form.categories.splice(index, 1)//Remove item
    },
    //Listen input change
    handlerInputChange(fieldName) {
      switch (fieldName) {
        case 'title':
          if (!this.adId)
            this.locale.formTemplate.slug = this.$helper.getSlug(this.locale.formTemplate.title)
          break
      }
    },
    //Get form data
    getFormData() {
      let formLocale = this.$clone(this.locale.form)
      let formData = this.$clone(this.form)

      //Transform prices
      let pricesData = []
      let adMinPrice = 0
      let adMaxPrice = 0
      if (Object.keys(formData.prices || {}).length) {
        for (var i = 0; i < (Object.keys(formData.prices).length / 2); i++) {
          let itemPrice = parseInt(formData.prices[`price${i}`])

          if (formData.prices[`description${i}`] && formData.prices[`price${i}`]) {
            //Add to prices date
            pricesData.push({description: formData.prices[`description${i}`], value: itemPrice})
            //Validate if is min price
            if ((adMinPrice == 0) || (itemPrice < adMinPrice)) adMinPrice = itemPrice
            //Validate if is max price
            if (itemPrice > adMaxPrice) adMaxPrice = itemPrice
          }
        }
      }

      //Transform fields
      let fieldsData = []
      if (Object.keys(formData.fields || {}).length) {
        for (var itemName in formData.fields)
          fieldsData.push({name: itemName, value: formData.fields[itemName]})
      }

      //Response
      return {
        ...formLocale,
        categories: formData.categories,
        options: {
          ...formData.options,
          prices: pricesData,
          map: formLocale.map
        },
        minPrice: adMinPrice,
        maxPrice: adMaxPrice,
        fields: fieldsData,
        mediasSingle: formData.mediasSingle,
        mediasMulti: formData.mediasMulti,
        schedule: formData.schedule
      }
    },
    //Create Ad
    createItem() {
      return new Promise(resolve => {
        this.loading = true
        this.$crud.create('apiRoutes.qad.ads', this.getFormData()).then(response => {
          this.$alert.info({message: `${this.$tr('ui.message.recordCreated')}`})
          this.$hook.dispatchEvent('wasCreated', {entityName: config('main.qad.entityNames.ad')})
          this.loading = false
          this.$router.push({name: 'qad.ads.index'})
        }).catch(error => {
          this.$alert.error({message: `${this.$tr('ui.message.recordNoCreated')}`})
          this.loading = false
        })
      })
    },
    //Update Ad
    updateItem() {
      return new Promise(resolve => {
        this.loading = true
        this.$crud.update('apiRoutes.qad.ads', this.adId, this.getFormData()).then(response => {
          this.$alert.info({message: `${this.$tr('ui.message.recordUpdated')}`})
          this.$hook.dispatchEvent('wasUpdated', {entityName: config('main.qad.entityNames.ad')})
          this.loading = false
          this.$router.push({name: 'qad.ads.index'})
        }).catch(error => {
          this.$alert.error({message: `${this.$tr('ui.message.recordNoUpdated')}`})
          this.loading = false
        })
      })
    },
  }
}
</script>
<style lang="stylus">
#contentAdFormPage
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
