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
        apiRoute: 'apiRoutes.qad.ads',
        permission: 'iad.ads',
        extraFormFields: 'iad.crud-fields.ads',
        create: {
          title: this.$tr('qad.layout.create.ad'),
          to: {name: 'qad.ads.create'}
        },
        read: {
          showAs: 'grid',
          allowToggleView: false,
          columns: [
            {
              name: 'id', field: 'id', style: 'width: 50px',
              label: (config('app.mode') == 'iadmin') ? this.$tr('ui.form.id') : '',
              format: val => (config('app.mode') == 'iadmin') ? val : ''
            },
            {name: 'name', label: this.$tr('ui.form.name'), field: 'title', align: 'left'},
            {
              name: 'user', label: this.$tr('qad.layout.form.user'), field: 'user', align: 'left',
              format: val => (val && val.fullName) ? val.fullName : ''
            },
            {
              name: 'featured', label: this.$tr('ui.label.featured'), field: 'featured', align: 'left',
              format: val => val ? this.$tr('ui.label.yes') : this.$tr('ui.label.no')
            },
            {
              name: 'checked', label: this.$tr('qad.sidebar.checked'), field: 'checked', align: 'left',
              format: val => (val == 1) ? this.$tr('ui.label.yes') : this.$tr('ui.label.no')
            },
            {
              name: 'created_at', label: this.$tr('ui.form.createdAt'), field: 'createdAt', align: 'right',
              format: val => val ? this.$trd(val) : '-',
            },
            {
              name: 'updated_at', label: this.$tr('ui.form.updatedAt'), field: 'updatedAt', align: 'right',
              format: val => val ? this.$trd(val) : '-',
            },
            {name: 'actions', label: this.$tr('ui.form.actions'), align: 'left'},
          ],
          requestParams: {
            include: 'categories,user',
            filter: {allTranslations: true}
          },
          filters: {},
          actions: [
            {
              icon: 'fas fa-eye',
              color: 'info',
              tooltip: this.$tr('ui.label.view'),
              action: (item) => {
                this.$helper.openExternalURL(`${this.$store.state.qsiteApp.baseUrl}/anuncios/${item.slug}`, true)
              },
            },
            {
              icon: 'fas fa-rocket',
              tooltip: this.$tr('ui.label.pay'),
              color: 'blue',
              action: (item) => {
                this.$helper.openExternalURL(`${this.$store.state.qsiteApp.baseUrl}/pins/${item.slug}/buy-up`, true)
              },
            }
          ]
        },
        update: {
          title: this.$tr('qad.layout.edit.ad'),
          to: 'qad.ads.edit'
        },
        delete: true,
        formLeft: {}
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  }
}
</script>
