<template>
  <div class="container">
    <div class="header-actions">
      <h1>📖 Gestion de Libros Bíblicos</h1>
      <button @click="cerrarSesion" class="btn-logout">Cerrar Sesión 🚪</button>
    </div>

    <!-- 🔍 SECCIÓN DE BÚSQUEDA Y FILTRO -->
    <div class="filtros-box">
      <input v-model="busqueda" type="text" placeholder="🔎 Buscar libro por nombre..." />
      
      <select v-model="filtroTestamento">
        <option value="">✨ Todos los Testamentos</option>
        <option v-for="t in testamentos" :key="t.id" :value="t.id">{{ t.nombre }}</option>
      </select>
    </div>

    <!-- 📝 FORMULARIO (CREAR / EDITAR) -->
    <div class="form-card">
      <h3>{{ editandoId ? '✏️ Editar Libro' : '➕ Agregar Nuevo Libro' }}</h3>
      <form @submit.prevent="guardarLibro">
        <input v-model="form.nombre" type="text" placeholder="Nombre del libro" required />
        <input v-model.number="form.capitulos" type="number" placeholder="Capítulos" required />
        <select v-model="form.testamentoId" required>
          <option value="" disabled>Selecciona el Testamento</option>
          <option v-for="t in testamentos" :key="t.id" :value="t.id">{{ t.nombre }}</option>
        </select>
        
        <button type="submit" class="btn-primary">{{ editandoId ? 'Actualizar' : 'Guardar' }}</button>
        <button v-if="editandoId" type="button" @click="cancelarEdicion" class="btn-secondary">Cancelar</button>
      </form>
    </div>

    <!-- 🗒 TABLA DE DATOS (LISTAR / ELIMINAR) -->
    <table>
      <thead>
        <tr>
          <th>Libro</th>
          <th>Capítulos</th>
          <th>Testamento</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="libro in librosFiltrados" :key="libro.id">
          <td>{{ libro.nombre }}</td>
          <td>{{ libro.capitulos }}</td>
          <td>{{ obtenerNombreTestamento(libro.testamentoId) }}</td>
          <td>
            <button @click="cargarEdicion(libro)" class="btn-edit">Editar</button>
            <button @click="eliminarLibro(libro.id)" class="btn-delete">Eliminar</button>
          </td>
        </tr>
        <tr v-if="librosFiltrados.length === 0">
          <td colspan="4" class="no-data">No se encontraron libros que coincidan.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const API_URL = import.meta.env.VITE_API_URL
const router = useRouter()

const libros = ref([])
const testamentos = ref([])
const busqueda = ref('')
const filtroTestamento = ref('')
const editandoId = ref(null)

const form = ref({ nombre: '', capitulos: '', testamentoId: '' })

const cargarDatos = async () => {
  try {
    const resT = await fetch(`${API_URL}/testamentos`)
    testamentos.value = await resT.json()
    const resL = await fetch(`${API_URL}/libros`)
    libros.value = await resL.json()
  } catch (error) {
    console.error("Error al conectar con json-server:", error)
  }
}

onMounted(cargarDatos)

const obtenerNombreTestamento = (id) => {
  const t = testamentos.value.find(item => item.id === id)
  return t ? t.nombre : 'Desconocido'
}

const librosFiltrados = computed(() => {
  return libros.value.filter(libro => {
    const coincideNombre = libro.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
    const coincideTestamento = filtroTestamento.value === '' || libro.testamentoId === filtroTestamento.value
    return coincideNombre && coincideTestamento
  })
})

const guardarLibro = async () => {
  if (editandoId.value) {
    await fetch(`${API_URL}/libros/${editandoId.value}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
    editandoId.value = null
  } else {
    await fetch(`${API_URL}/libros`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
  }
  form.value = { nombre: '', capitulos: '', testamentoId: '' }
  cargarDatos()
}

const eliminarLibro = async (id) => {
  if (confirm('¿Estás seguro de eliminar este libro bíblico?')) {
    await fetch(`${API_URL}/libros/${id}`, { method: 'DELETE' })
    cargarDatos()
  }
}

const cargarEdicion = (libro) => {
  editandoId.value = libro.id
  form.value = { ...libro }
}

const cancelarEdicion = () => {
  editandoId.value = null
  form.value = { nombre: '', capitulos: '', testamentoId: '' }
}

const cerrarSesion = () => {
  localStorage.removeItem('user_token')
  router.push('/login')
}
</script>

<style scoped>
.container { max-width: 900px; margin: 0 auto; padding: 20px; font-family: sans-serif; color: #2c3e50; }
.header-actions { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px; }
.filtros-box { margin-bottom: 20px; display: flex; gap: 10px; }
.filtros-box input { flex: 2; padding: 10px; border: 1px solid #ccc; border-radius: 4px; } 
.filtros-box select { flex: 1; padding: 10px; border: 1px solid #ccc; border-radius: 4px; }
.form-card { background: #f9f9f9; padding: 20px; margin-bottom: 20px; border-radius: 6px; border: 1px solid #eee; text-align: left; }
.form-card h3 { margin-top: 0; color: #2c3e50; }
form { display: flex; gap: 10px; flex-wrap: wrap; }
form input, form select { padding: 10px; border: 1px solid #ccc; border-radius: 4px; flex: 1; min-width: 150px; }
table { width: 100%; border-collapse: collapse; margin-top: 10px; }
th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
th { background-color: #42b983; color: white; }
tr:nth-child(even) { background-color: #f2f2f2; }
button { cursor: pointer; padding: 8px 14px; border: none; border-radius: 4px; font-weight: bold; }
.btn-primary { background: #42b983; color: white; }
.btn-secondary { background: #95a5a6; color: white; }
.btn-edit { background: #f39c12; color: white; margin-right: 5px; }
.btn-delete { background: #e74c3c; color: white; }
.btn-logout { background: #34495e; color: white; }
.no-data { text-align: center; color: #7f8c8d; font-style: italic; }
</style>
