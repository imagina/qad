<template></template>
<script>
//Component
import crud from 'modules/qcrud/_components/crud'

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
        entityName: config("main.qad.entityNames.category"),
        apiRoute: 'apiRoutes.qad.categories',
        permission: 'iad.categories',
        extraFormFields: 'iad.crud-fields.category',
        create: {
          title: this.$tr('iblog.cms.newCategory'),
        },
        read: {
          columns: [
            {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
            {name: 'name', label: this.$tr('isite.cms.form.title'), field: 'title', align: 'rigth'},
            {name: 'slug', label: this.$tr('isite.cms.form.slug'), field: 'slug', align: 'left'},
            {name: 'status', label: this.$tr('isite.cms.form.status'), field: 'status'},
            {
              name: 'parent', label: this.$tr('isite.cms.form.parent'), field: 'parent', align: 'left',
              format: val => val ? (val.title ? val.title : '-') : '-'
            },
            {
              name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
              format: val => val ? this.$trd(val) : '-',
            },
            {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'},
          ],
          requestParams: {include: 'parent,qrs'},
          filters : {
            parentId: {
              value: null,
              type: 'treeSelect',
              props: {
                label: this.$tr('isite.cms.form.parent'),
                clearable: true
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qad.categories',
                select: {label: 'title', id: 'id'},
                requestParams: {include: 'parent'}
              }
            },
          }
        },
        update: {
          title: this.$tr('iblog.cms.updateCategory'),
          requestParams: {include: 'parent,buildable,locatable'}
        },
        delete: true,
        formLeft: {
          id: {value: ''},
          userId: {value: this.$store.state.quserAuth.userId},
          title: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.title')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            },
          },
          slug: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.slug')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            }
          },
          description: {
            value: '',
            type: 'html',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.description')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            }
          },
          type: {
            value: 'general',
            type: 'select',
            name: 'type',
            fakeFieldName: 'buildable',
            props: {
              label: this.$tr('isite.cms.form.type'),
              readonly: !!(!this.$hasAccess('ibuilder.buildables.edit') && this.crudInfo.typeForm == 'update'),
              options: [
                {label: 'General', value: 'general'},
                ...this.typeOptions
              ]
            }
          },
          layoutBuilder: {
            value: null,
            type: 'select',
            name: 'layoutId',
            fakeFieldName: 'buildable',
            props: {
              label: this.$tr('ibuilder.cms.form.layout'),
              clearable: true,
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qbuilder.layouts',
              select: {label: 'title', id: 'id'},
              requestParams: {
                filter: {
                  type: this.crudInfo.buildable?.type ?? '',
                  entity_type: "Modules\\Iad\\Entities\\Category"
                }
              }
            }
          },
        },
        formRight: {
          status: {
            value: '1',
            type: 'select',
            isTranslatable: false,
            props: {
              label: `${this.$tr('isite.cms.form.status')}*`,
              options: [
                {label: this.$tr('isite.cms.label.enabled'), value: '1'},
                {label: this.$tr('isite.cms.label.disabled'), value: '0'}
              ],
            }
          },
          parentId: {
            value: null,
            type: 'select',
            props: {
              label: this.$tr('isite.cms.form.parent'),
              clearable: true
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qad.categories',
              select: {label: 'title', id: 'id'},
              requestParams: {include: 'parent'}
            }
          },
          countryId: {
            value: null,
            type: 'select',
            fakeFieldName: 'locatable',
            props: {
              label: this.$tr('isite.cms.label.country'),
              clearable: true,
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qlocations.countries',
              select: { label: 'name', id: 'id' },
            },
          },
          provinceId: {
            value: null,
            type: 'select',
            fakeFieldName: 'locatable',
            props: {
              label: this.$tr('isite.cms.label.department'),
              readonly: this.crudInfo.locatable?.countryId ? false : true,
              clearable: true,
            },
            loadOptions: {
              apiRoute: this.crudInfo.locatable?.countryId
                ? 'apiRoutes.qlocations.provinces'
                : false,
              select: { label: 'name', id: 'id' },
              requestParams: { filter: { country: this.crudInfo.locatable?.countryId } },
            },
          },
          cityId: {
            value: null,
            type: 'select',
            fakeFieldName: 'locatable',
            props: {
              label: this.$tr('isite.cms.form.city'),
              readonly: this.crudInfo.locatable?.provinceId ? false : true,
              clearable: true,
            },
            loadOptions: {
              apiRoute: this.crudInfo.locatable?.provinceId
                ? 'apiRoutes.qlocations.cities'
                : false,
              select: { label: 'name', id: 'id' },
              requestParams: {
                filter: { province_id: this.crudInfo.locatable?.provinceId },
              },
            },
          },
          mediasSingle: {
            name: 'mediasSingle',
            value: {},
            type: 'media',
            props: {
              label: this.$tr('isite.cms.form.firstImage'),
              zone: 'mainimage',
              entity: "Modules\\Iad\\Entities\\Category",
              entityId: null
            }
          },
          mediasSingle2: {
            name: 'mediasSingle',
            value: {},
            type: 'media',
            props: {
              label: this.$tr('isite.cms.form.secondaryImage'),
              zone: 'secondaryimage',
              entity: "Modules\\Iad\\Entities\\Category",
              entityId: null
            }
          }
        },
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    },
    typeOptions() {
      //configBuilder by module only with values
      let config = this.$store.getters['qsiteApp/getConfigApp']('builder.layout', true)
      let response = {}

      //Filter only items with values
      Object.keys(config).forEach(moduleName => {
        if (config[moduleName]) response[moduleName] = config[moduleName]
      })

      let moduleBuilderConfig = Object.values(response).flat().find(item => item.entity.value == "Modules\\Iad\\Entities\\Category")
      return moduleBuilderConfig?.types || []
    }
  },
}
</script>
