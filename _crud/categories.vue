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
          requestParams: {include: 'parent'}
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
    }
  },
}
</script>
