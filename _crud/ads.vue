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
               apiRoute: 'apiRoutes.qad.ads',
               permission: 'iads.ads',
               create: {
                  title: this.$tr('qad.layout.create.ad'),
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
                        name: 'slug',
                        label: this.$tr('ui.form.slug'),
                        field: 'slug',
                        style: 'width: 50px',
                        align: 'rigth'
                     },
                     {
                       name: 'user', label: this.$tr('qad.layout.form.user'), field: 'user', align: 'left',
                       format: val => (val && val.fullName) ? val.fullName : ''
                     },
                     {
                        name: 'createdAt', label: this.$tr('ui.form.createdAt'), field: 'createdAt', align: 'left',
                        format: val => val ? this.$trd(val) : '-',
                     },
                     {name: 'actions', label: this.$tr('ui.form.actions'), align: 'left'},
                  ],
                  requestParams: {
                     include: 'user',
                     filter: {
                        allTranslations: true,
                     }
                  },
                  filters: {}
               },
               update: {
                  title: this.$tr('qad.layout.edit.ad'),
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

                  },
                  slug: {
                     value: '',
                     type: 'input',
                     isTranslatable: true,
                     props: {
                        label: `${this.$tr('ui.form.slug')}*`,
                        //vIf: (this.crudInfo.typeForm == 'update'),
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
                  categoryId: {
                     value: 0,
                     type: 'select',
                     props: {
                        label: this.$tr('ui.form.category'),
                        options: [
                           {label: this.$tr('ui.label.disabled'), value: 0},
                        ],
                     },
                     loadOptions: {
                       apiRoute: 'apiRoutes.qad.categories',
                       select: {label: 'title', id: 'id'},
                       requestParams: {}
                     }
                  },
                  userId: {
                     value: 0,
                     type: 'select',
                     props: {
                        label: this.$tr('qad.layout.form.user'),
                        options: [
                           {label: this.$tr('ui.label.disabled'), value: 0},
                        ],
                     },
                     loadOptions: {
                       apiRoute: 'apiRoutes.quser.users',
                       select: {label: 'fullName', id: 'id'},
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
