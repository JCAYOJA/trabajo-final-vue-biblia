<template>
  <v-app>
    <!-- Barra Superior (Header) -->
    <v-app-bar color="white" elevation="1" class="px-4">
      <div class="d-flex align-center">
        <!-- Imagen del logo desde assets -->
        <img src="../assets/usip.png" alt="Logo USIP" class="mr-3" style="height: 45px; object-fit: contain;" />
        <v-app-bar-title class="text-h5 font-weight-bold text-grey-darken-4">
          Gestión de Libros Bíblicos
        </v-app-bar-title>
      </div>
      <v-spacer></v-spacer>
      <v-btn color="blue-grey-darken-4" variant="flat" append-icon="mdi-logout" class="text-none" @click="cerrarSesion">
        Cerrar Sesión
      </v-btn>
    </v-app-bar>

    <!-- Contenido Principal -->
    <v-main class="bg-grey-lighten-4">
      <v-container class="mt-6" style="max-width: 1100px;">
        
        <!-- 🔍 SECCIÓN DE BÚSQUEDA Y FILTRO -->
        <v-row class="mb-4">
          <v-col cols="12" md="8">
            <v-text-field
              v-model="busqueda"
              prepend-inner-icon="mdi-magnify"
              placeholder="Buscar libro por nombre..."
              variant="outlined"
              bg-color="white"
              density="comfortable"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="filtroTestamento"
              :items="testamentos"
              item-title="nombre"
              item-value="id"
              label="Todos los Testamentos"
              variant="outlined"
              bg-color="white"
              density="comfortable"
              hide-details
              clearable
            ></v-select>
          </v-col>
        </v-row>

        <!-- 📝 FORMULARIO (CREAR / EDITAR) -->
        <v-card class="mb-6 pa-4" elevation="1">
          <div class="text-subtitle-1 font-weight-bold text-indigo-darken-4 mb-4 d-flex align-center">
            <v-icon :icon="editandoId ? 'mdi-pencil' : 'mdi-plus'" class="mr-1"></v-icon>
            {{ editandoId ? 'Editar Libro' : 'Agregar Nuevo Libro' }}
          </div>
          
          <v-form @submit.prevent="guardarLibro">
            <v-row align="center">
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="form.nombre"
                  label="Nombre del libro"
                  variant="outlined"
                  density="comfortable"
                  required
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field
                  v-model.number="form.capitulos"
                  label="Capítulos"
                  type="number"
                  variant="outlined"
                  density="comfortable"
                  required
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  v-model="form.testamentoId"
                  label="Selecciona el Testamento"
                  :items="testamentos"
                  item-title="nombre"
                  item-value="id"
                  variant="outlined"
                  density="comfortable"
                  required
                  hide-details
                ></v-select>
              </v-col>
              <v-col cols="12" md="3" class="d-flex align-center">
                <v-btn 
                  type="submit" 
                  color="emerald" 
                  class="text-white text-none font-weight-bold flex-grow-1" 
                  height="48" 
                  style="background-color: #3cb371;"
                >
                  {{ editandoId ? 'Actualizar' : 'Guardar' }}
                </v-btn>
                <v-btn 
                  v-if="editandoId" 
                  type="button" 
                  color="grey-darken-1" 
                  class="text-white text-none font-weight-bold ml-2" 
                  height="48" 
                  @click="cancelarEdicion"
                >
                  Cancelar
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>

        <!-- 🗒 TABLA DE DATOS (LISTAR / ELIMINAR) -->
        <v-card elevation="1" class="overflow-hidden">
          <v-table class="biblia-table">
            <thead>
              <tr style="background-color: #3cb371;">
                <th class="text-white font-weight-bold text-subtitle-1 text-left">Libro</th>
                <th class="text-white font-weight-bold text-subtitle-1 text-left">Capítulos</th>
                <th class="text-white font-weight-bold text-subtitle-1 text-left">Testamento</th>
                <th class="text-white font-weight-bold text-subtitle-1 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="libro in librosFiltrados" :key="libro.id">
                <td class="text-body-1 py-3 font-weight-medium text-grey-darken-4">{{ libro.nombre }}</td>
                <td class="text-body-1 py-3">{{ libro.capitulos }}</td>
                <td class="text-body-1 py-3">
                  <!-- Libro Cerrado para el Antiguo Testamento (ID 1) con comparación flexible -->
                  <span v-if="libro.testamentoId == 1 || String(libro.testamentoId) === '1'" class="d-flex align-center text-amber-darken-3 font-weight-bold">
                    <v-icon icon="mdi-book" class="mr-2"></v-icon>
                    {{ obtenerNombreTestamento(libro.testamentoId) }}
                  </span>
                  
                  <!-- Libro Abierto para el Nuevo Testamento (ID 2) -->
                  <span v-else-if="libro.testamentoId == 2 || String(libro.testamentoId) === '2'" class="d-flex align-center text-teal-darken-2 font-weight-bold">
                    <v-icon icon="mdi-book-open-variant" class="mr-2"></v-icon>
                    {{ obtenerNombreTestamento(libro.testamentoId) }}
                  </span>

                  <!-- Caso base de respaldo -->
                  <span v-else class="d-flex align-center text-grey">
                    <v-icon icon="mdi-book-cross" class="mr-2"></v-icon>
                    {{ obtenerNombreTestamento(libro.testamentoId) }}
                  </span>
                </td>
                <td class="py-3">
                  <v-btn color="orange-darken-1" size="small" class="text-white text-none mr-2 font-weight-bold" min-width="80" @click="cargarEdicion(libro)">
                    Editar
                  </v-btn>
                  <v-btn color="red-darken-1" size="small" class="text-white text-none font-weight-bold" min-width="80" @click="eliminarLibro(libro.id)">
                    Eliminar
                  </v-btn>
                </td>
              </tr>
              <tr v-if="librosFiltrados.length === 0">
                <td colspan="4" class="text-center text-grey py-4 italic">No se encontraron libros que coincidan.</td>
              </tr>
            </tbody>
          </v-table>
        </v-card>

      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const API_URL = import.meta.env.VITE_API_URL
const router = useRouter()

const libros = ref([])
const testamentos = ref([])
const busqueda = ref('')
const filtroTestamento = ref(null) 
const editandoId = ref(null)

// El formulario inicia con testamentoId en null para Vuetify
const form = ref({ nombre: '', capitulos: '', testamentoId: null })

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
  const t = testamentos.value.find(item => item.id == id)
  return t ? t.nombre : 'Desconocido'
}

const librosFiltrados = computed(() => {
  return libros.value.filter(libro => {
    const coincideNombre = libro.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
    const coincideTestamento = !filtroTestamento.value || libro.testamentoId == filtroTestamento.value
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
  // Limpieza total utilizando null para el selector de Vuetify
  form.value = { nombre: '', capitulos: '', testamentoId: null }
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
  // Reseteo limpio al cancelar
  form.value = { nombre: '', capitulos: '', testamentoId: null }
}

const cerrarSesion = () => {
  localStorage.removeItem('user_token')
  router.push('/login')
}
</script>

<style scoped>
.biblia-table :deep(th) {
  height: 50px !important;
}
.biblia-table :deep(td) {
  border-bottom: 1px solid #e0e0e0 !important;
}
</style>
