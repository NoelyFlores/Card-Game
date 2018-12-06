<template>
    <div id="app">
            <v-app id="inspire">
              <v-layout row justify-center>
                <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                  <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>
                  <v-card class="container-modal">
                      <v-card
                          class="mx-auto container-title"
                          max-width="600"
                        >
                          <v-card-title class="title font-weight-regular justify-space-between">
                          </v-card-title>
                      
                          <v-window v-model="step">
                      
                            <v-window-item :value="1">
                              <div class="pa-3 text-xs-center">
                                <v-img
                                  class="mb-3"
                                  contain
                                  height="250"
                                  :src="img"
                                ></v-img>
                                <h3 class="title font-weight-light mb-2">{{description}}</h3>
                                <span class="caption grey--text">{{mensaje}}</span>
                              </div>
                            </v-window-item>
                          </v-window>
                      
                        </v-card>
                        <v-flex class="text-xs-center">
                          <v-btn
                              color="primary"
                              @click="play()"
                            >
                              {{txtButton}}
                            </v-btn>
                        </v-flex>                    
                  </v-card>
                </v-dialog>
              </v-layout>
            </v-app>
          </div>
</template>
<script>
import {EventBus} from '@/plugins/EventBus'
import data from '@/plugins/data'
export default {
    name: 'notifications',
    props: ['level'],
    data(){
        return{
            dialog: true,
            step: 1,
            img:'',
            description: '',
            txtButton:'',
            mensaje: ''
        }
    },
    created(){
        const levels = this.level // 8 por defecto la primera vez
        const objectDataLevel = data.levels[levels]
        this.img = objectDataLevel.img
        this.description = objectDataLevel.descripcion
        this.txtButton = objectDataLevel.txtButton
        this.mensaje = objectDataLevel.mensaje
    },
    methods: {
        play(){
            if(this.level <= 4){
                EventBus.$emit('show-levelOne', false)
            }           
        }
    }
}
</script>
<style scoped>
.container-modal{
  background: url(http://3.bp.blogspot.com/-__D3Dw1tujQ/Td483KDwdWI/AAAAAAAAAOk/A-AOBAdhBCo/s1600/watermelon.png) no-repeat;
  height: 100vh;
  box-sizing: border-box;
  background-position: center;
  background-size: cover;
}
.font-weight-light{
    font-weight: 800!important;
    color: #FFEB3B;
    font-size: 80px !important;
    text-shadow: 4px 1px 0px #FF9800;
}
.container-title{
  background: transparent;
  box-shadow: none !important;
}
/* .theme--light.v-card{
    background: transparent;
    box-shadow: none; 
} */

</style>

