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
        create: {
          title: this.$tr('qad.layout.create.ad'),
          to: {name: 'qad.ads.create'}
        },
        read: {
          columns: [
            {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
            {name: 'name', label: this.$tr('ui.form.name'), field: 'title', align: 'left'},
            {name: 'slug', label: this.$tr('ui.form.slug'), field: 'slug', align: 'left'},
            {
              name: 'user', label: this.$tr('qad.layout.form.user'), field: 'user', align: 'left',
              format: val => (val && val.fullName) ? val.fullName : ''
            },
            {name: 'statusName', label: this.$tr('ui.form.status'), field: 'statusName', align: 'left'},
            {
              name: 'featured', label: this.$tr('ui.label.featured'), field: 'featured', align: 'left',
              format: val => val ? this.$tr('ui.label.yes') : this.$tr('ui.label.no')
            },
            {
              name: 'checked', label: this.$tr('qad.sidebar.checked'), field: 'checked', align: 'left',
              format: val => (val == 1) ? this.$tr('ui.label.yes') : this.$tr('ui.label.no')
            },
            {
              name: 'category', label: this.$trp('ui.label.category'), field: 'categories',
              align: 'left', classes: 'ellipsis', style: 'max-width : 250px',
              format: val => val ? val.map(item => {
                return item.title
              }).join(', ') : ''
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
              icon: 'fas fa-rocket',
              tooltip: this.$tr('ui.label.boost'),
              color: 'blue',
              action: (item) => {
                this.$helper.openExternalURL(`${this.$store.state.qsiteApp.baseUrl}/pins/${item.slug}/buy-up`, true)
              }
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
