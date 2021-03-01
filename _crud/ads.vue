<template></template>
<script>
export default {
  data() {
    return {
      crudId: this.$uid()
    }
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        apiRoute: 'apiRoutes.qad.ads',
        permission: 'iad.ads',
        create: {
          title: this.$tr('qad.layout.create.ad'),
          to: {name: 'qad.admin.ads.create'}
        },
        read: {
          columns: [
            {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
            {
              name: 'name',
              label: this.$tr('ui.form.name'),
              field: 'title',
              style: 'width: 50px',
              align: 'rigth'
            },
            {
              name: 'slug',
              label: this.$tr('ui.form.slug'),
              field: 'slug',
              style: 'width: 50px',
              align: 'rigth'
            },
            {
              name: 'user', label: this.$tr('qad.layout.form.user'), field: 'user', align: 'left',
              format: val => (val && val.fullName) ? val.fullName : ''
            },
            {
              name: 'createdAt', label: this.$tr('ui.form.createdAt'), field: 'createdAt', align: 'left',
              format: val => val ? this.$trd(val) : '-',
            },
            {name: 'actions', label: this.$tr('ui.form.actions'), align: 'left'},
          ],
          requestParams: {
            include: 'user',
            filter: {
              allTranslations: true,
            }
          },
          filters: {}
        },
        update: {
          title: this.$tr('qad.layout.edit.ad'),
          to: {name: 'qad.admin.ads.create'}
        },
        delete: true,
        formLeft: {
          title: {
            value: null,
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('ui.form.name')} *`,
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ]
            }

          },
          slug: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('ui.form.slug')}*`,
              //vIf: (this.crudInfo.typeForm == 'update'),
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
            },
          },
          description: {
            value: '',
            type: 'html',
            isTranslatable: true,
            props: {
              label: `${this.$tr('ui.form.description')}*`,
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
            }
          }
        },
        formRight: {
          status: {
            value: "0",
            type: 'select',
            props: {
              label: this.$tr('qad.layout.form.status'),
              options: [
                {label: this.$tr('qad.layout.options.pending'), value: 0},
                {label: this.$tr('qad.layout.options.approved'), value: 1},
                {label: this.$tr('qad.layout.options.denied'), value: 2},
              ],
            }
          },
          categoryId: {
            value: 0,
            type: 'select',
            props: {
              label: this.$tr('ui.form.category'),
              options: [],
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qad.categories',
              select: {label: 'title', id: 'id'},
              requestParams: {}
            }
          },
          userId: {
            value: "0",
            type: 'select',
            props: {
              label: this.$tr('qad.layout.form.user'),
              options: [
                {label: this.$tr('ui.label.disabled'), value: 0},
              ],
            },
            loadOptions: {
              apiRoute: 'apiRoutes.quser.users',
              select: {label: 'fullName', id: 'id'},
              requestParams: {}
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
              readonly: (this.crudInfo.provinceId ? false : true),
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
            },
            loadOptions: {
              apiRoute: this.crudInfo.provinceId ? 'apiRoutes.qlocations.cities' : false,
              select: {label: 'name', id: 'id'},
              requestParams: {filter: {province_id: this.crudInfo.provinceId}}//only Colombia country
            }
          },
          name: {
            name: 'name',
            value: null,
            type: 'input',
            fakeFieldName: 'fields',
            props: {
              label: this.$tr('qad.layout.form.name')
            }
          },
          age: {
            name: 'age',
            value: null,
            type: 'input',
            fakeFieldName: 'fields',
            props: {
              label: this.$tr('qad.layout.form.age')
            }
          },
          phone: {
            name: 'phone',
            value: null,
            type: 'input',
            fakeFieldName: 'fields',
            props: {
              label: this.$tr('qad.layout.form.phone')
            }
          },
          note: {
            name: 'note',
            value: null,
            type: 'input',
            fakeFieldName: 'fields',
            props: {
              label: this.$tr('qad.layout.form.note')
            }
          },
          address: {
            name: 'address',
            value: null,
            type: 'input',
            fakeFieldName: 'fields',
            props: {
              label: this.$tr('qad.layout.form.address')
            }
          },
          customer_feedback: {
            name: 'customer_feedback',
            value: null,
            type: 'input',
            fakeFieldName: 'fields',
            props: {
              label: this.$tr('qad.layout.form.customerFeedback')
            }
          },
          independent_escort: {
            name: 'independent_escort',
            value: null,
            type: 'checkbox',
            fakeFieldName: 'fields',
            props: {
              label: this.$tr('qad.layout.form.independentEscort')
            }
          },
          tags: {
            value: [],
            type: 'select',
            props: {
              multiple: true,
              label: this.$tr('qad.layout.form.tags'),
              options: [],
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qtag.tags',
              select: {label: 'name', id: 'id'},
              requestParams: {
                namespace: "place"
              }
            }
          },
          // image1: {
          //    name: 'image1',
          //    value: null,
          //    type: 'image',
          //    isFakeField : true,
          //    props: {
          //       label: this.$tr('ui.form.firstImage')
          //    }
          // },
          // mediasSingle: {
          //    name: 'mediasSingle',
          //    value: {},
          //    type: 'media',
          //    props: {
          //       label: this.$tr('ui.form.firstImage'),
          //       zone: 'mainimage',
          //       entity: "Modules\\Iads\\Entities\\Category",
          //       enitityId: null
          //    }
          // },
        },
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  }
}
</script>
