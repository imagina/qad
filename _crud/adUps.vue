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
        entityName: config("main.qad.entityNames.ad"),
        apiRoute: 'apiRoutes.qad.adUps',
        permission: 'iad.ups',
        extraFormFields: 'iad.crud-fields.ad',
        create: false,
        read: {
          columns: [
            {name: 'id', label: 'id', field: 'id', align: 'left'},
            {
              name: 'ad', label: this.$tr('iad.cms.form.ad'), field: 'ad', align: 'left',
              classes: 'ellipsis', style: 'max-width : 250px',
              format: val => val ? `(${val.id}) ${val.title}` : '-'
            },
            {name: 'daysLimit', label: this.$tr('iad.cms.form.daysLimit'), field: 'daysLimit', align: 'left'},
            {name: 'daysCounter', label: this.$tr('iad.cms.form.daysCounter'), field: 'daysCounter', align: 'left'},
            {name: 'upsDaily', label: this.$tr('iad.cms.form.upsDaily'), field: 'upsDaily', align: 'left'},
            {name: 'upsCounter', label: this.$tr('iad.cms.form.upsCounter'), field: 'upsCounter', align: 'left'},
            {
              name: 'statusField', label: this.$tr('isite.cms.form.status'), field: 'status', align: 'left',
              format: val => val ? this.$tr('isite.cms.label.enabled') : this.$tr('isite.cms.label.disabled')
            },
            {
              name: 'rangeMinutes',
              label: this.$tr('iad.cms.form.rangeMinutes'),
              field: 'rangeMinutes',
              align: 'left',
            },
            {
              name: 'nextUpload', label: this.$tr('iad.cms.form.nextUpAt'), field: 'nextUpload', align: 'left',
              format: val => val ? this.$trd(val, {type: 'long'}) : '-'
            },
            {
              name: 'fromDate', label: this.$tr('iad.cms.form.fromDate'), field: 'fromDate', align: 'left',
              format: val => val ? this.$trd(val) : '-'
            },
            {
              name: 'toDate', label: this.$tr('iad.cms.form.toDate'), field: 'toDate', align: 'left',
              format: val => val ? this.$trd(val) : '-'
            },
            {
              name: 'fromHour', label: this.$tr('iad.cms.form.fromHour'), field: 'fromHour', align: 'left',
              format: val => val ? this.$trd(`2021-01-01 ${val}`, {type: 'time'}) : '-'
            },
            {
              name: 'toHour', label: this.$tr('iad.cms.form.toHour'), field: 'toHour', align: 'left',
              format: val => val ? this.$trd(`2021-01-01 ${val}`, {type: 'time'}) : '-'
            },
            {
              name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'right',
              format: val => val ? this.$trd(val) : '-',
            },
            {
              name: 'updated_at', label: this.$tr('isite.cms.form.updatedAt'), field: 'updatedAt', align: 'right',
              format: val => val ? this.$trd(val) : '-',
            },
            {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'},
          ],
          requestParams: {
            include: 'ad',
            filter: {allTranslations: true}
          },
          filters: {
            status: {
              value: null,
              type: 'select',
              props: {
                label: `${this.$tr('isite.cms.form.status')}:`,
                options: [
                  {label: this.$tr('isite.cms.label.enabled'), value: '1'},
                  {label: this.$tr('isite.cms.label.disabled'), value: '0'},
                ],
                clearable: true
              }
            },
          },
          actions: []
        },
        update: false,
        delete: true,
        formLeft: {},
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  }
}
</script>
