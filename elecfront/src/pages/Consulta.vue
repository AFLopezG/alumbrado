<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-img src="logo.png" style="width: 30px"/>
        </q-toolbar-title>
        <div>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
  <q-page class="">

    <div class="row">
      <div class="col-12">
        <q-form @submit.prevent="buscar">
          <div class="row">
            <div class="col-12 col-md-8 q-pa-xs">
              <q-input  outlined dense label="Ingrese numero de carnet / nro Poste" v-model="codigo" autofocus />
            </div>
            <div class="col-12 col-md-2 q-pa-xs flex flex-center">
              <q-btn class="full-width" label="Buscar" color="primary" icon="send" type="submit" />
              <q-btn class="full-width" label="Ir Registro" color="green" icon="location_on" @click="$router.replace({ path: '/reclamoalumbrado' })" />
            </div>
          </div>
        </q-form>
      </div>
      <div class="col-12 col-md-12">
        <q-banner dense class="bg-primary text-white">
          Datos Reclamos por {{persona.nombre}}
        </q-banner>
      </div>
      <div class="col-12 col-md-12">
        <q-table title="Datos del poste" :data="datos" :columns="columns">
          <template v-slot:body-cell-estado="props">
            <q-td :props="props">
              <q-badge :color="props.row.estado=='EN ESPERA'?'warning':'positive'" :label="props.row.estado"/>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>

</q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'ConsultaPage',
  data(){
    return{
      columns:[
        {label:'Nro',field:row=>row.poste.nroposte,name:'nroposte'},
        {label:'Reclamo',field:'reclamo',name:'reclamo'},
        {label:'Estado',field:'estado',name:'estado'},
        {label:'Fecha',field:'fecha',name:'fecha',sortable:true},
        {label:'Tecnico',field:'tecnico',name:'tecnico'},
        {label:'Actividad',field:'actividad',name:'actividad'},
        {label:'Fecha mantenimiento',field:'fechaman',name:'fechaman',sortable:true},

      ],
      cedula: this.$route.params.cedula,
      url:process.env.API,
      codigo:'',
      email:{},
      mails:[],
      mails2:[],
      datos:[],
      persona:{},
    }
  },

  mounted() {
    if(this.cedula!=undefined || this.cedula=='')
      {this.codigo=this.cedula
      this.buscar()}
  },
  methods:{
    buscar(){
      if (this.codigo==''){
        return false
      }
      this.$q.loading.show()
      this.$axios.get(process.env.API+'consultaReclamo/'+this.codigo).then(res=>{
        console.log(res.data)
        this.datos=res.data
        this.$q.loading.hide()
      })
        .catch(err=>{
          this.$q.loading.hide()
          console.error(err.response.data.message)
        })
    },
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.mails = this.mails2
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.mails = this.mails2.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    }
  }
}
</script>
