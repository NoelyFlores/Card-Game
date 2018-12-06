<template>
    <v-card>        	
        <div id="app">          
          <v-app id="inspire" v-if="!notification">
            <v-card-text class="description">Nivel {{nivel}}</v-card-text>
            <v-layout justify-center>
              <v-flex xs12 sm12 class="content">  
                <v-card class="container-card-vue">
                  <v-container
                    fluid
                    grid-list-md
                  >
                    <v-layout row wrap>
                      <v-flex
                        v-for="(item, index) in items" :key="index"								
                        @click="choose(item.number,item.type, item.state,index)"
                      >
                        <v-card>
                          <v-img
                            height="232px"
                            width="100%"										
                          >
                            <v-flex xs12 sm12>
                              <v-card class="container-vue" v-bind:class="{'upside': !items[index].state}"><!-- :id='`successful${index}`' -->
                                <span class="numero" v-if="items[index].state"  :class="`successful${index}`">{{item.number}}</span>
                                  <v-container
                                  fluid
                                  grid-list-md												                  
                                  >
                                  <v-layout row wrap class="layout-vue" ><!--   -->
                                    <v-icon v-for="i in item.number" :key="i" v-if="item.state" large color="red darken-2" :class="`icon successful${index}`" >{{item.type}}</v-icon>
                                  </v-layout>
                                </v-container>                   
                              </v-card>
                            </v-flex>
                          </v-img>
                        </v-card>
                      </v-flex>              
                    </v-layout>
                  </v-container>
                </v-card>
              </v-flex>
            </v-layout>
          </v-app>
          <notification-component v-else :level="nivel"></notification-component>
        </div>
    </v-card>
</template>
<script>
import {EventBus} from '@/plugins/EventBus.js'
import notification from '@/components/notification'
export default {
  name: "",
  data() {
    return {
      number: 0,
			numberLetters: 4,
			typeLetter: ['favorite', 'toys', 'sentiment_satisfied_alt','star'],
      items: [],
      temp: [],      
      nivel: 0,
      success: 0,
      notification: true   
    };
  },
  created() {
    EventBus.$on('show-levelOne', value => {
      this.notification = false
      this.numberLetters = this.numberLetters + 4
      const data= JSON.stringify(this.generateRandomLetters(), null, this.numberLetters)
      this.items = JSON.parse(data)
    })
	},
  methods: {
		// genero las cartas de 4 tipos hasta el numero 10
		generateItem(){
			const temp = []
			this.typeLetter.forEach(element => {
        for (let i = 0; i < 10; i++) {
          temp.push({type: element, number: i+1, state: false})
        }
			});
			return temp
		},
		//genero numeros aleatorios :(
    randomOnly(cantidad) {
      let array = [];
      for (let i = 0; i < cantidad; i++) {
        const position = Math.random() * (cantidad + 1);
        array = array.slice(0, position).concat(i).concat(array.slice(position));
			}
      return array;
		},
		generateRandomLetters(){
			//voy a reccorrer los numeros aleatorios solo hasta la mitad del numero de cartas solicitadas
			const listLetters = this.generateItem()// Array de objetos con información de la carta
			const cantTiros = this.randomOnly(listLetters.length).slice(0, this.numberLetters/2)// numero de cartas en aleatorio a mostrar
			const doublelistLetters = cantTiros.concat(cantTiros)// lista con el doble de cartas 
			const randomListCartas = this.randomOnly(doublelistLetters.length) // doble lista de cartas en aleatorio
			randomListCartas.map((element, index) => {
				 randomListCartas[index] = doublelistLetters[element]
			});
			randomListCartas.map((position, index) => {			
				randomListCartas[index]=listLetters[position]
			})
			return randomListCartas
		},
    choose(value, valType,st, index){
      if(this.items[index].state !== true){
        this.items[index].state = true
        this.temp.push({numero: value, figura: valType, posicion: index})  // array de de 2 aciertos a comparar   
        if(this.temp.length === 2){
          this.showTime()
          .then(() => {
            this.temp = []
            })
          }	
			}		
    },
    showTime(){
      return new Promise((resolve, reject) => {
        if(this.temp[0].numero === this.temp[1].numero && this.temp[0].figura === this.temp[1].figura) {
          const listIcons = document.getElementsByClassName(`successful${this.temp[0].posicion}`)
          const listIcons2 = document.getElementsByClassName(`successful${this.temp[1].posicion}`)          
          setTimeout(function () {
            for (let index = 0; index <= 10; index++) {// numero maximo de figuras en la carta
              listIcons[index]?listIcons[index].style.display = 'none': ''              
              listIcons2[index]?listIcons2[index].style.display = 'none': ''
            }            
          },200)
          this.success++ // acumulo los aciertos
          if(this.success === (this.numberLetters)/2){
            this.success = 0
            this.nivel++
            this.notification = true            
          }  
          resolve()
        } else{
          const self = this;
					setTimeout(function () {
					  self.items[self.temp[0].posicion].state = false
            self.items[self.temp[1].posicion].state = false
            resolve()
					},500)
        }        
      })
    }
  },
  components:{
    'notification-component': notification
  }
}
</script>
<style scoped>
content{
  background: #064206;
}
.card-box,
.card-conten {
  display: flex;
}
.icon {
  width: auto;
  height: 50px;
  flex-grow: 1;
  margin: auto;
}
.container.grid-list-md :not(:only-child) .layout:last-child {
  margin-bottom: -4px;
  width: 108px;
  margin: auto;
  display: flex;
}
.layaut-vue {
  width: 110px;
  height: auto;
  margin: auto;
  display: flex;
}
.container-vue {
  height: 222px;
  display: flex;
  cursor: pointer;
}
.upside {
  background: url(https://scontent.flim6-1.fna.fbcdn.net/v/t1.15752-9/47230104_329031931254301_7159184941643726848_n.jpg?_nc_cat=103&_nc_eui2=AeGUJboYC0sL5RcmcPLa07W8yO92axxC7BzTimjtPcUzdWXJ_uhnA4--4SiSWe2nxMtMpcZEIk_4p9VEZyA9GmIzlJk_M5ew7opD3vGq9qDOxw&_nc_ht=scontent.flim6-1.fna&oh=961516c674aa2bf3adc94cb43b562d13&oe=5CA94D46)
    no-repeat;
}
.successful{
  background: #e91e63 !important
}
.container-vue:hover {
  box-shadow: 0px 1px 8px 1px #e91e63;
}
.container-card-vue {
  width: 735px;
  margin: auto;
  background: transparent !important;
}
.numero{
  color: #17171b;
  font-size: 30px;
  padding: 0px 0px 0px 4px;
  margin-top: -5px;
  font-weight: 800;
  position: absolute;
}
.container-title{
  background: transparent;
  box-shadow: none !important;
}
/* .theme--light.v-card{
    background: transparent;
    box-shadow: none; 
} */
.theme--light.application, .description{
  background: #064206; 
}
.description{
  color: yellow;
}

</style>

