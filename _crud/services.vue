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
               apiRoute: 'apiRoutes.qad.services',
               permission: 'iads.services',
               create: {
                  title: this.$tr('qad.layout.create.service'),
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
                        name: 'createdAt', label: this.$tr('ui.form.createdAt'), field: 'createdAt', align: 'left',
                        format: val => val ? this.$trd(val) : '-',
                     },
                     {name: 'actions', label: this.$tr('ui.form.actions'), align: 'left'},
                  ],
                  requestParams: {
                     include: '',
                     filter: {
                        allTranslations: true,
                     }
                  },
                  filters: {}
               },
               update: {
                  title: this.$tr('qad.layout.edit.service'),
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

                  }
               },
               formRight: {
                  parentId: {
                     value: 0,
                     type: 'select',
                     props: {
                        label: this.$tr('ui.form.parent'),
                        options: [
                           {label: this.$tr('ui.label.disabled'), value: 0},
                        ],
                     },
                     loadOptions: {
                       apiRoute: 'apiRoutes.qad.services',
                       select: {label: 'title', id: 'id'},
                       requestParams: {}
                     }
                  },
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
