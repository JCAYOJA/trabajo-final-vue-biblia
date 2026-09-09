<template>
  <div class="login-container">
    <div class="login-card">
      <h2>🔐 Iniciar Sesión</h2>
      <p class="subtitle">Acceso al Panel de Administración Bíblico</p>

      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label>Usuario:</label>
          <input v-model="usuario" type="text" placeholder="Usuario (ej. admin)" required />
        </div>

        <div class="input-group">
          <label>Contraseña:</label>
          <input v-model="password" type="password" placeholder="Contraseña (ej. 1234)" required />
        </div>

        <p v-if="errorMsg" class="error-text">{{ errorMsg }}</p>

        <button type="submit" class="btn-login">Ingresar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const usuario = ref('')
const password = ref('')
const errorMsg = ref('')

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
.login-container { display: flex; justify-content: center; align-items: center; min-height: 60vh; }
.login-card { background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); width: 100%; max-width: 400px; }
.subtitle { color: #666; font-size: 14px; margin-bottom: 20px; }
.input-group { margin-bottom: 15px; text-align: left; }
.input-group label { display: block; margin-bottom: 5px; font-weight: bold; color: #2c3e50; }
.input-group input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
.error-text { color: #ff5252; font-size: 14px; margin-bottom: 15px; }
.btn-login { width: 100%; padding: 12px; background: #42b983; color: white; border: none; border-radius: 4px; font-size: 16px; cursor: pointer; font-weight: bold; }
.btn-login:hover { background: #35495e; }
</style>
