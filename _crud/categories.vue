<template></template>
<script>
//Component
import crud from '@imagina/qcrud/_components/crud'

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
          title: this.$tr('qblog.layout.newCategory'),
        },
        read: {
          columns: [
            {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
            {name: 'name', label: this.$tr('ui.form.title'), field: 'title', align: 'rigth'},
            {name: 'slug', label: this.$tr('ui.form.slug'), field: 'slug', align: 'left'},
            {name: 'status', label: this.$tr('ui.form.status'), field: 'status'},
            {
              name: 'parent', label: this.$tr('ui.form.parent'), field: 'parent', align: 'left',
              format: val => val ? (val.title ? val.title : '-') : '-'
            },
            {
              name: 'created_at', label: this.$tr('ui.form.createdAt'), field: 'createdAt', align: 'left',
              format: val => val ? this.$trd(val) : '-',
            },
            {name: 'actions', label: this.$tr('ui.form.actions'), align: 'left'},
          ],
          requestParams: {include: 'parent'},
          filters : {
            parentId: {
              value: null,
              type: 'treeSelect',
              props: {
                label: this.$tr('ui.form.parent'),
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
          title: this.$tr('qblog.layout.updateCategory'),
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
            }
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
          },
        },
        formRight: {
          status: {
            value: '1',
            type: 'select',
            isTranslatable: false,
            props: {
              label: `${this.$tr('ui.form.status')}*`,
              options: [
                {label: this.$tr('ui.label.enabled'), value: '1'},
                {label: this.$tr('ui.label.disabled'), value: '0'}
              ],
            }
          },
          parentId: {
            value: null,
            type: 'select',
            props: {
              label: this.$tr('ui.form.parent'),
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
              label: this.$tr('ui.form.firstImage'),
              zone: 'mainimage',
              entity: "Modules\\Iblog\\Entities\\Category",
              entityId: null
            }
          },
          mediasSingle2: {
            name: 'mediasSingle',
            value: {},
            type: 'media',
            props: {
              label: this.$tr('ui.form.secondaryImage'),
              zone: 'secondaryimage',
              entity: "Modules\\Iblog\\Entities\\Category",
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
