<template></template>
<script>
export default {
  mounted() {
    this.$nextTick(function () {
      this.init()
    })
  },
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
          title: this.$tr('iad.cms.create.ad'),
          to: {name: 'qad.ads.create'}
        },
        read: {
          showAs: 'grid',
          columns: [
            {
              name: 'id', field: 'id', style: 'width: 50px',
              label: (config('app.mode') == 'iadmin') ? this.$tr('isite.cms.form.id') : '',
              format: val => (config('app.mode') == 'iadmin') ? val : ''
            },
            {name: 'name', label: this.$tr('isite.cms.form.name'), field: 'title', align: 'left'},
            {
              name: 'categories', label: this.$tr('isite.cms.form.category'), field: 'categories', align: 'left',
              format: val => val && val.length ? val.map(x => x.title).join(', ') : '-'
            },
            {
              name: 'user', label: this.$tr('iad.cms.form.user'), field: 'user', align: 'left',
              format: val => val ? `${val.firstName || ''} ${val.lastName || ''}` : '-'
            },
            {
              name: 'featured', label: this.$tr('isite.cms.label.featured'), field: 'featured', align: 'left',
              format: val => val ? this.$tr('isite.cms.label.yes') : this.$tr('isite.cms.label.no')
            },
            {
              name: 'checked', label: this.$tr('iad.cms.sidebar.checked'), field: 'checked', align: 'left',
              format: val => (val == 1) ? this.$tr('isite.cms.label.yes') : this.$tr('isite.cms.label.no')
            },
            {
              name: 'sortOrder',
              label: this.$tr('isite.cms.label.order'),
              field: 'sortOrder',
              align: 'left',
              sortable: true
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
            include: 'categories,user,qrs',
            filter: {allTranslations: true}
          },
          filters: {
            userId: {
              value: null,
              type: 'select',
              props: {
                label: this.$tr('isite.cms.form.createdBy'),
                clearable: true
              },
              loadOptions: {
                apiRoute: 'apiRoutes.quser.users',
                select: {label: 'fullName', id: 'id'},
                filterByQuery: true
              }
            }
          },
          actions: [
            {
              icon: 'fas fa-eye',
              color: 'info',
              tooltip: this.$tr('isite.cms.label.view'),
              action: (item) => {
                this.$helper.openExternalURL(item.url, true)
              },
            },
            {
              icon: 'fas fa-rocket',
              tooltip: this.$tr('isite.cms.label.pay'),
              color: 'blue',
              action: (item) => {
                this.$helper.openExternalURL(`${this.$store.state.qsiteApp.baseUrl}/pins/${item.slug}/buy-up`, true)
              },
            }
          ]
        },
        update: {
          title: this.$tr('iad.cms.edit.ad'),
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
  },
  methods: {
    init() {
      //trigger get ip actions
      this.$store.dispatch('qsiteApp/GET_IP_ADDRESS')
    }
  }
}
</script>
