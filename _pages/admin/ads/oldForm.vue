<template>
  <div id="pageId">
    <div class="content-box">

      <div class="q-container">
        <div class="row">
          <div class="col-12">
            <q-card-section class="q-pa-xl form-general">

              <div class="text-h5 text-primary q-mb-xs font-family-secondary capitalize">
                {{ $tr('iad.cms.sidebar.admin.ads') }}
              </div>
              <div class="q-my-lg line-grey full-width"></div>

              <div class="q-mt-lg q-mb-xl line-grey full-width"></div>

              <div class="row q-col-gutter-xl">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">

                  <div class="q-mb-xl">
                    <p class="caption q-mb-sm">
                      Título
                    </p>
                    <q-input dense v-model="form.title" placeholder=""/>


                  </div>


                  <!--Description-->
                  <div class="q-mb-xl">
                    <p class="caption q-mb-sm">
                      Descripción
                    </p>
                    <dynamic-field :field="{type : 'html'}"/>
                    <q-editor v-model="form.description" class="full-width"
                              :toolbar="editorText.toolbar" content-class="text-grey-9" toolbar-text-color="grey-9"/>
                  </div>

                  <div class="q-mb-xl">
                    <p class="caption q-mb-sm">
                      Dirección
                    </p>
                    <q-input dense v-model="fields.address" placeholder="">
                      <template v-slot:prepend>
                        <q-icon name="fas fa-map-marker-alt" color="primary"/>
                      </template>
                    </q-input>
                  </div>

                  <div class="q-mb-xl">
                    <p class="caption q-mb-sm">
                      Teléfono
                    </p>
                    <q-input dense v-model="fields.phone" placeholder="">
                      <template v-slot:prepend>
                        <q-icon name="fas fa-phone" color="primary"/>
                      </template>
                    </q-input>
                  </div>

                  <div class="q-mb-xl">
                    <p class="caption q-mb-sm">
                      Nota adicional
                    </p>
                    <q-input dense v-model="fields.note" placeholder="">
                      <template v-slot:prepend>
                        <q-icon name="fas fa-sticky-note" color="primary"/>
                      </template>
                    </q-input>
                  </div>

                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">

                  <div class="q-mb-xl">
                    <p class="caption q-mb-xs">
                      Categoría
                    </p>
                    <tree-select
                      :clearable="false"
                      class="q-mb-md"
                      filter="searchText"
                      :options="categoryOptions"
                      value-consists-of="BRANCH_PRIORITY"
                      v-model="form.categoryId"
                      placeholder=""
                    />

                  </div>

                  <div class="q-mb-xl">
                    <p class="caption q-mb-xs">
                      Servicios
                    </p>
                    <tree-select
                      :clearable="false"
                      class="q-mb-md"
                      multiple
                      filter="searchText"
                      :options="serviceOptions"
                      value-consists-of="BRANCH_PRIORITY"
                      v-model="form.services"
                      placeholder=""
                    />

                  </div>

                  <div class="q-mb-xl">
                    <p class="caption q-mb-sm">
                      Departamento
                    </p>
                    <tree-select
                      :clearable="false"
                      class="q-mb-md"
                      :options="provincesOptions"
                      value-consists-of="BRANCH_PRIORITY"
                      v-model="form.provinceId"
                      @update:modelValue="val => { getCities() }"
                      placeholder=""
                    />
                  </div>

                  <div class="q-mb-xl" v-if="cityOptions.length>1">
                    <p class="caption q-mb-sm">
                      Cuidad
                    </p>
                    <tree-select
                      :clearable="false"
                      class="q-mb-md"
                      :options="cityOptions"
                      value-consists-of="BRANCH_PRIORITY"
                      @update:modelValue="val => { getNeighborhoods() }"
                      v-model="form.cityId"
                      placeholder=""
                    />
                  </div>

                  <div v-if="neighborhoodOptions.length>1" class="q-mb-xl">
                    <p class="caption q-mb-sm">
                      Barrio
                    </p>
                    <tree-select
                      :clearable="false"
                      class="q-mb-md"
                      :options="neighborhoodOptions"
                      value-consists-of="BRANCH_PRIORITY"
                      v-model="form.neighborhoodId"
                      placeholder=""
                    />
                  </div>

                  <div class="q-mb-xl">
                    <p class="caption q-mb-sm">
                      Nombre
                    </p>
                    <q-input dense v-model="fields.name" placeholder=""></q-input>
                  </div>

                  <div class="q-mb-xl">
                    <p class="caption q-mb-sm">
                      Edad
                    </p>
                    <tree-select
                      :clearable="false"
                      class="q-mb-md"
                      :options="agesOptions"
                      value-consists-of="BRANCH_PRIORITY"
                      v-model="fields.age"
                      placeholder=""
                    />
                  </div>

                  <div class="q-mb-xl">
                    <p class="caption q-mb-sm">
                      Twitter
                    </p>
                    <q-input dense v-model="fields.twitter" placeholder=""></q-input>
                  </div>

                  <div class="q-mb-xl">
                    <p class="caption q-mb-sm">
                      WhatsApp
                    </p>
                    <q-input dense v-model="fields.whatsapp" placeholder="(+57)"></q-input>
                  </div>

                </div>
              </div>


            </q-card-section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  watch: {},
  validations() {
    return {}
  },
  mounted() {
    this.$nextTick(function () {
      this.init();
    })
  },
  data() {
    return {
      entityId: null,
      configName: 'apiRoutes.qad.ads',
      data: null,
      form: {
        title: "",
        description: "",
        categoryId: 0,
        provinceId: 0,
        cityId: 0,
        neighborhoodId: 0,
      },
      fields: {
        name: "",
        address: "",
        age: 18,
        whatsapp: "",
        twitter: "",
      },
      agesOptions: [],
      neighborhoodOptions: [],
      cityOptions: [],
      provincesOptions: [],
      categoryOptions: [],
      serviceOptions: [],
      editorText: {
        toolbar: [
          ['bold', 'italic', 'strike', 'underline', 'removeFormat'],
          ['link'],
          [
            {
              label: 'Font Size',
              icon: 'format_size',
              fixedLabel: true,
              fixedIcon: true,
              list: 'no-icons',
              options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7']
            }
          ],
          ['quote', 'unordered', 'ordered'],
          ['fullscreen']
        ]
      }
    }
  },
  methods: {
    async init() {
      if (this.$route.params.id) this.entityId = this.$route.params.id
      if (this.entityId) await this.getData();//Get data if is edit
      await this.getServices();//
      await this.getCategories();//
      await this.getProvinces();//
      for (let i = 18; i <= 80; i++) {
        this.agesOptions.push({
          value: i,
          label: i,
          id: i,
        });
      }
    },
    //Get data item
    getData() {
      return new Promise((resolve, reject) => {
        const itemId = this.$clone(this.entityId)

        if (itemId) {
          //Params
          let params = {
            refresh: true,
            params: {
              include: 'rates,services,tags,fields',
              filter: {allTranslations: true}
            }
          }
          //Request
          this.$crud.show(this.configName, itemId, params).then(response => {
            this.form = this.$clone(response.data);
            //FieldTransformer
            for (const entry of Object.entries(this.fields)) {
              for (let e in response.data.fields) {
                this['fields'][response.data.fields[e]['name']] = response.data.fields[e].value;
              }
            }
            //Services
            var services = [];
            for (var i = 0; i < response.data.services.length; i++) {
              services.push(response.data.services[i].id);
            }//for
            this.form.services = services;
            resolve(true)//Resolve
          }).catch(error => {
            this.$apiResponse.handleError(error, () => {
              this.$alert.error({message: this.$tr('isite.cms.message.errorRequest'), pos: 'bottom'})
              reject(false)//Resolve
            })
          })
        } else {
          resolve(true)//Resolve
        }

      });
    },
    // Get services
    getServices() {
      let params = {
        remember: false,
        params: {
          include: '',
          filter: {
            allTranslations: true,
          }
        }
      };//params

      this.$crud.index("apiRoutes.qad.services", params).then(response => {
        this.serviceOptions = [];
        this.serviceOptions.push({label: "Selecciona los servicios", value: 0, id: 0});
        for (var i = 0; i < response.data.length; i++) {
          this.serviceOptions.push({
            label: response.data[i].title,
            value: response.data[i].id,
            id: response.data[i].id
          });
        }
      });
    },
    // Get categories
    getCategories() {
      let params = {
        remember: false,
        params: {
          include: '',
          filter: {
            allTranslations: true,
          }
        }
      };//params

      this.$crud.index("apiRoutes.qad.categories", params).then(response => {
        this.categoryOptions = [];
        this.categoryOptions.push({label: "Selecciona una categoría", value: 0, id: 0});
        for (var i = 0; i < response.data.length; i++) {
          this.categoryOptions.push({
            label: response.data[i].title,
            value: response.data[i].id,
            id: response.data[i].id
          });
        }
      });
    },
    getProvinces() {
      let params = {
        remember: false,
        params: {
          include: '',
          filter: {
            allTranslations: true,
            country_id: 48
          }
        }
      };//params
      this.$crud.index("apiRoutes.qlocations.provinces", params).then(response => {
        this.provincesOptions = [];
        this.provincesOptions.push({label: "Selecciona una provincia", value: 0, id: 0});
        for (var i = 0; i < response.data.length; i++) {
          this.provincesOptions.push({
            label: response.data[i].name,
            value: response.data[i].id,
            id: response.data[i].id
          });
        }
      });
    },
    getCities() {
      if (this.form.provinceId) {
        let params = {
          remember: false,
          params: {
            include: '',
            filter: {
              allTranslations: true,
              province_id: this.form.provinceId
            }
          }
        };//params
        this.$crud.index("apiRoutes.qlocations.cities", params).then(response => {
          this.cityOptions = [];
          this.cityOptions.push({label: "Selecciona una ciudad", value: 0, id: 0});
          if (!this.entityId) {
            this.form.cityId = 0;
            this.form.neighborhoodId = 0;
            this.getNeighborhoods();
          }
          for (var i = 0; i < response.data.length; i++) {
            this.cityOptions.push({label: response.data[i].name, value: response.data[i].id, id: response.data[i].id});
          }
        });
      }
    },
    getNeighborhoods() {
      if (this.form.cityId) {
        let params = {
          remember: false,
          params: {
            include: '',
            filter: {
              allTranslations: true,
              city: this.form.cityId
            }
          }
        };//params
        this.$crud.index("apiRoutes.qlocations.neighborhoods", params).then(response => {
          this.neighborhoodOptions = [];
          this.neighborhoodOptions.push({label: "Selecciona un barrio", value: 0, id: 0});
          if (!this.entityId)
            this.form.neighborhoodId = 0;
          for (var i = 0; i < response.data.length; i++) {
            this.neighborhoodOptions.push({
              label: response.data[i].name,
              value: response.data[i].id,
              id: response.data[i].id
            });
          }
        });
      }
    },

  }
}
</script>
<style lang="scss">
</style>
