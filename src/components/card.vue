<template>
    <v-card>
        <v-card-text>Mierda {{number}}</v-card-text>
				      
        <div id="app">
  <v-app id="inspire">
    <v-layout justify-center>
      <v-flex xs12 sm12>  
        <v-card class="container-card-vue">
          <v-container
            fluid
            grid-list-md
          >
            <v-layout row wrap>
              <v-flex
                 v-for="(item, index) in items" :key="index"								
								 @click="acierta(item.number,item.type, item.state,index)"
              >
                <v-card>
                  <v-img
                    height="250px"
                    width="100%"
										
                  >
                    <v-flex xs12 sm12>
                      <v-card class="container-vue" v-bind:class="{'atras': !items[index].state}" >
                        {{index}}
                        <v-container
                        fluid
                        grid-list-md												                  
                        >
                        <v-layout row wrap class="layout-vue" ><!--   -->
                          <v-icon v-for="i in item.number" :key="i" v-if="item.state" large color="red darken-2"  class="icon">{{item.type}}</v-icon>
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
</div>
    </v-card>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      number: 0,
      min: 0,
			max: 8,
			cantCard: 10,
			typeCard: ['favorite', 'toys', 'edit','home'],
      items: [],
			acierto: false,
			valueOne: 0,
			count: 0,
			ocultarAcierto: false,
			valueType: '',
			cardState: 0
    };
  },
  created() {
		//this.items = this.generarItem()
		//this.aleatorio = this.aleatorioUnico(this.items.length);
		
    const data= JSON.stringify(this.generarCartasAleatorias(), null, this.cantCard)
    this.items = JSON.parse(data) 
		console.log(this.items)
	},
  methods: {
		// genero las cartas de 4 tipos hasta el numero 10
		generarItem(){
			const temp = []
				this.typeCard.forEach(element => {
				for (let i = 0; i < 10; i++) {
					 temp.push({type: element, number: i+1, state: false})
				}
			});
			return temp
		},
		//genero numeros aleatorios :(
    aleatorioUnico(cantidad) {
      let array = [];
      for (let i = 0; i < cantidad; i++) {
        //array=insertarEn(array,i,Math.random()*(cantidad+1) )
        const posición = Math.random() * (cantidad + 1);
        const inicio = array.slice(0, posición); //captura el valor del lado izquierdo
        const medio = i; // indice del array actual
        const fin = array.slice(posición); // array del lado i
        array = inicio.concat(medio).concat(fin);
			}
      return array;
		},
		// modifico el items con los numeros aleatorios
		// tengo items y numers aleatorios
		generarCartasAleatorias(){
			//voy a reccorrer los numeros aleatorios solo hasta la mitad del numero de cartas solicitadas
			const listCard = this.generarItem()//length 40
			const cantTiros = this.aleatorioUnico(listCard.length).slice(0, this.cantCard/2)// length num escogido
			const doblelistCard = cantTiros.concat(cantTiros)// 12
			const aleatorioListCartas = this.aleatorioUnico(doblelistCard.length) //posicion
			aleatorioListCartas.map((element, index) => {
				 aleatorioListCartas[index] = doblelistCard[element]
			});
			aleatorioListCartas.map((position, index) => {			
				aleatorioListCartas[index]=listCard[position]
			})
			return aleatorioListCartas
		},
    acierta(value, valType,st, index){
      
      console.log(this.items[index], index)
      console.log(this.items)
      
      if(this.items[index].state !== true){
        this.items[index].state = true
        this.count++
        const cardAcertada = this.cardState
        this.cardState = index

        const primerAcierto = this.valueOne
        this.valueOne = value

        const type = this.valueType
        this.valueType = valType

			if(this.count === 2){
					if(primerAcierto === this.valueOne && type === this.valueType){											
						console.log('acertaste')
						this.ocultarAcierto = true
						}else{
							const self = this;
							setTimeout(function () {
								console.log(self.cardState, cardAcertada)
								self.items[index].state = false
								self.items[cardAcertada].state = false
							},500)						
					}
					this.count = 0
					console.log(this.valueOne)
			}	
				}
			/*no crean que dire lo mismo que todos -que he cometido errores y no me arrepiento, pues 
			yo digo que durante toda mi puta vida me arrepentire de haber perdido mi tiempo contigo y haber dejado pasar oportunidades
			creendo que tu eres el mejor, me arrepiento de haberlo entregado todo y haber intentando una y otra vez creendo que esto iba funcionar
			No es rencor ni desahogo pero los errores se tienen que pagar y yo lo hare toda mi vida por que desperdicie todo!!!*/
			
		}
  }
};
</script>
<style scoped>
.card-box,
.card-conten {
  display: flex;
}
.card-content {
  border: 1px solid red;
  width: 200px;
  height: 200px;
}
.card-content-all {
  margin: auto;
}
.layaut {
  border: 1px green;
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
  height: 242px;
  display: flex;
  cursor: pointer;
}
.atras {
  background: url(https://scontent.flim6-1.fna.fbcdn.net/v/t1.15752-9/47230104_329031931254301_7159184941643726848_n.jpg?_nc_cat=103&_nc_eui2=AeGUJboYC0sL5RcmcPLa07W8yO92axxC7BzTimjtPcUzdWXJ_uhnA4--4SiSWe2nxMtMpcZEIk_4p9VEZyA9GmIzlJk_M5ew7opD3vGq9qDOxw&_nc_ht=scontent.flim6-1.fna&oh=961516c674aa2bf3adc94cb43b562d13&oe=5CA94D46)
    no-repeat;
}

.container-vue:hover {
  box-shadow: 0px 1px 8px 1px #e91e63;
}
.container-card-vue {
  width: 800px;
  margin: auto;
}
</style>

