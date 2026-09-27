<template>
  <v-app>
    <!-- Contenedor centrado para el Login -->
    <v-container class="fill-height justify-center align-center bg-grey-lighten-4" fluid>
      <v-responsive max-width="420" class="mx-auto">
        
        <!-- Tarjeta de Login -->
        <v-card class="pa-6 pb-8" elevation="2" rounded="lg">
          
          <!-- Encabezado con Logo y Título -->
          <div class="d-flex flex-column align-center mb-6">
            <img src="../assets/usip.png" alt="Logo USIP" class="mb-3" style="height: 65px; object-fit: contain;" />
            <div class="text-h5 font-weight-bold text-grey-darken-4">🔐 Iniciar Sesión</div>
            <div class="text-subtitle-2 text-grey-darken-1 mt-1 text-center">
              Acceso al Panel de Administración Bíblico
            </div>
          </div>

          <!-- Mensaje de Error en caso de credenciales incorrectas -->
          <v-alert
            v-if="errorMsg"
            type="error"
            variant="tonal"
            density="compact"
            class="mb-4 text-body-2"
            closable
            @click:close="errorMsg = ''"
          >
            {{ errorMsg }}
          </v-alert>

          <!-- Formulario Interactivo -->
          <v-form @submit.prevent="handleLogin">
            
            <!-- Campo Usuario -->
            <div class="text-subtitle-2 text-grey-darken-3 font-weight-bold mb-1">Usuario:</div>
            <v-text-field
              v-model="usuario"
              placeholder="Usuario (ej. admin)"
              prepend-inner-icon="mdi-account"
              variant="outlined"
              density="comfortable"
              class="mb-4"
              required
              hide-details="auto"
            ></v-text-field>

            <!-- Campo Contraseña -->
            <div class="text-subtitle-2 text-grey-darken-3 font-weight-bold mb-1">Contraseña:</div>
            <v-text-field
              v-model="password"
              :append-inner-icon="mostrarContrasena ? 'mdi-eye-off' : 'mdi-eye'"
              :type="mostrarContrasena ? 'text' : 'password'"
              placeholder="Contraseña (ej. 1234)"
              prepend-inner-icon="mdi-lock"
              variant="outlined"
              density="comfortable"
              class="mb-5"
              required
              hide-details="auto"
              @click:append-inner="mostrarContrasena = !mostrarContrasena"
            ></v-text-field>

            <!-- Botón Ingresar -->
            <v-btn
              type="submit"
              color="emerald"
              block
              size="large"
              class="text-white text-none font-weight-bold"
              style="background-color: #3cb371;"
            >
              Ingresar
            </v-btn>

          </v-form>
        </v-card>

      </v-responsive>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const usuario = ref('')
const password = ref('')
const errorMsg = ref('')
const mostrarContrasena = ref(false) // Controla el ojito de la contraseña

const handleLogin = () => {
  if (usuario.value === 'admin' && password.value === '1234') {
    localStorage.setItem('user_token', 'token_bíblico_secreto_123789')
    router.push('/dashboard')
  } else {
    errorMsg.value = '❌ Usuario o contraseña incorrectos. Usa admin / 1234'
  }
}
</script>

<style scoped>
.fill-height {
  min-height: 100vh !important;
}
</style>
