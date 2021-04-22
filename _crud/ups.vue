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
        entityName: config("main.qad.entityNames.up"),
        apiRoute: 'apiRoutes.qad.ups',
        permission: 'iad.ups',
        create: {
          title: this.$tr('qad.layout.create.up'),
        },
        read: {
          columns: [
            {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
            {name: 'title', label: this.$tr('ui.form.title'), field: 'title', align: 'rigth'},
            {name: 'days_limit', label: this.$tr('qad.layout.form.daysLimit'), field: 'daysLimit', align: 'left'},
            {name: 'ups_daily', label: this.$tr('qad.layout.form.upsDaily'), field: 'upsDaily', align: 'left'},
            {name: 'status', label: this.$tr('ui.form.status'), field: 'status'},
            {
              name: 'product_id', label: this.$tr('ui.label.product'), field: 'product', align: 'left',
              format: val => val ? val.name : '-',
            },
            {
              name: 'created_at', label: this.$tr('ui.form.createdAt'), field: 'createdAt', align: 'left',
              format: val => val ? this.$trd(val) : '-',
            },
            {name: 'actions', label: this.$tr('ui.form.actions'), align: 'left'},
          ]
        },
        update: {
          title: this.$tr('qad.layout.edit.up')
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
          daysLimit: {
            value: null,
            type: 'input',
            props: {
              label: this.$tr('qad.layout.form.daysLimit'),
              type: 'number',
              rules: [val => !val || (val >= 1) || this.$tr('ui.message.fieldMinValue', {num: 1})]
            }
          },
          upsDaily: {
            value: null,
            type: 'input',
            props: {
              label: this.$tr('qad.layout.form.upsDaily'),
              type: 'number',
              rules: [val => !val || (val >= 1) || this.$tr('ui.message.fieldMinValue', {num: 1})]
            }
          },
          productId: {
            value: null,
            type: 'select',
            props: {
              label: this.$tr('ui.label.product'),
              clearable: true
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qcommerce.products',
              select: {label: 'name', id: 'id'}
            }
          },
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
