<template></template>
<script>

export default {
  data() {
    return {
      crudId: this.$uid()
    };
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        entityName: config('main.qad.entityNames.up'),
        apiRoute: 'apiRoutes.qad.ups',
        permission: 'iad.ups',
        extraFormFields: 'iad.crud-fields.up',
        create: {
          title: this.$tr('iad.cms.create.up')
        },
        read: {
          columns: [
            { name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px' },
            { name: 'title', label: this.$tr('isite.cms.form.title'), field: 'title', align: 'rigth' },
            { name: 'days_limit', label: this.$tr('iad.cms.form.daysLimit'), field: 'daysLimit', align: 'left' },
            { name: 'ups_daily', label: this.$tr('iad.cms.form.upsDaily'), field: 'upsDaily', align: 'left' },
            { name: 'status', label: this.$tr('isite.cms.form.status'), field: 'status' },
            {
              name: 'product_id', label: this.$tr('isite.cms.label.product'), field: 'product', align: 'left',
              format: val => val ? val.name : '-'
            },
            {
              name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
              format: val => val ? this.$trd(val) : '-'
            },
            { name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left' }
          ]
        },
        update: {
          title: this.$tr('iad.cms.edit.up')
        },
        delete: true,
        formLeft: {
          id: { value: '' },
          userId: { value: this.$store.state.quserAuth.userId },
          title: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.title')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ]
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
              ]
            }
          }
        },
        formRight: {
          status: {
            value: '1',
            type: 'select',
            isTranslatable: false,
            props: {
              label: `${this.$tr('isite.cms.form.status')}*`,
              options: [
                { label: this.$tr('isite.cms.label.enabled'), value: '1' },
                { label: this.$tr('isite.cms.label.disabled'), value: '0' }
              ]
            }
          },
          daysLimit: {
            value: null,
            type: 'input',
            required: true,
            props: {
              label: this.$tr('iad.cms.form.daysLimit') + '*',
              type: 'number',
              rules: [val => !val || (val >= 1) || this.$tr('isite.cms.message.fieldMinValue', { num: 1 })]
            }
          },
          upsDaily: {
            value: null,
            type: 'input',
            required: true,
            props: {
              label: this.$tr('iad.cms.form.upsDaily') + '*',
              type: 'number',
              rules: [val => !val || (val >= 1) || this.$tr('isite.cms.message.fieldMinValue', { num: 1 })]
            }
          },
          productId: {
            value: null,
            type: 'select',
            props: {
              label: this.$tr('isite.cms.label.product'),
              clearable: true
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qcommerce.products',
              select: { label: 'name', id: 'id' }
            }
          }
        }
      };
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {};
    }
  }
};
</script>
