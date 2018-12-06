<template>
  <v-app>
    <v-toolbar app color="#0b2c0b" class="navbar">
      <v-toolbar-title class="headline text-uppercase">
        <span>Memoria</span>
        <span class="font-weight-light">de cartas</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      
      <v-layout row justify-center>
        <v-dialog
          v-model="dialog"
          max-width="290"
        >
          <v-card>
            <v-card-title class="headline">Qué hacer?</v-card-title>

            <v-card-text>
              Memoria de cartas es un juego que te permite probar tu habilidad mental, consiste en encontrar todos los pares de carta y de acuerdo a la completitud pasarás al siguiente nivel
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="green darken-1"
                flat="flat"
                @click="dialog = false"
              >
                Entendido
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
      <v-btn color="red" fab small dark
          @click="dialog = true"
        >
              <v-icon>help</v-icon>
            </v-btn>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      dialog: false
    }
  }
}
</script>
<style scoped>
  .navbar{
    color: #fff
  }
</style>

