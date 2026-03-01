import { createI18n } from 'vue-i18n'

const messages = {
  es: {
    nav: {
      medication: 'Medicamentos',
      inventory: 'Inventario',
      dashboard: 'Panel de Control'
    },
    auth: {
      login: 'Iniciar Sesión',
      adminAccess: 'Acceso Admin',
      logout: 'Cerrar Sesión'
    },
    admin: {
      medicationTitle: 'Medicamentos',
      newMedication: 'Nuevo Medicamento',
      totalMedications: 'Total Medicamentos',
      confirmDeleteMed: '¿Seguro que quieres eliminar este medicamento?',
      
      inventoryTitle: 'Gestión de Inventario',
      newBatch: 'Nuevo Lote',
      totalBatches: 'Total Lotes',
      confirmDeleteBatch: '¿Seguro que quieres eliminar este lote?',
      
      loading: 'Cargando datos...'
    },
    home: {
      badge: 'v1.0 - Sistema de Gestión Farmacéutica',
      title: 'Control Inteligente de',
      subtitle: 'Inventario Médico',
      description: 'Optimiza la gestión de medicamentos, controla lotes de inventario y garantiza la seguridad en el suministro farmacéutico.',
      btnExplore: 'Explorar Catálogo',
      repository: 'Repositorio',
      btnPanel: 'Ir al Panel de Control',
      exploreBadge: 'Base de Datos Farmacéutica',
      exploreTitle: 'Enciclopedia',
      exploreTitleAccent: 'Pública',
      exploreDesc: 'Acceso a información técnica de referencia. El control de stock y lotes es de uso exclusivo administrativo.',
      cardMore: 'Saber más',
      infoBottom: 'Inicia sesión para gestionar tu inventario',
    },
    footer: {
      subtitle: 'Sistema de Gestión Médica Avanzada',
      rights: 'Todos los derechos reservados',
      external: 'Sistema Admin PharmaLogic - Todos los derechos reservados'
    }
  },
  en: {
    nav: {
      medication: 'Medication',
      inventory: 'Inventory',
      dashboard: 'Dashboard'
    },
    auth: {
      login: 'Login',
      adminAccess: 'Admin Access',
      logout: 'Logout'
    },
    admin: {
      medicationTitle: 'Medication',
      newMedication: 'New Medication',
      totalMedications: 'Total Medications',
      confirmDeleteMed: 'Are you sure you want to delete this medication?',
      
      inventoryTitle: 'Inventory Management',
      newBatch: 'New Batch',
      totalBatches: 'Total Batches',
      confirmDeleteBatch: 'Are you sure you want to delete this batch?',
      
      loading: 'Loading data...'
    },
    home: {
      badge: 'v1.0 - Pharmaceutical Management System',
      title: 'Intelligent Control of',
      subtitle: 'Medical Inventory',
      description: 'Optimize medication management, control inventory batches and guarantee safety in the pharmaceutical supply.',
      btnExplore: 'Explore Catalog',
      repository: 'Repository',
      btnPanel: 'Go to Dashboard',
      exploreBadge: 'Pharmaceutical Database',
      exploreTitle: 'Public',
      exploreTitleAccent: 'Encyclopedia',
      exploreDesc: 'Access to technical reference information. Stock and batch control is for exclusive administrative use.',
      cardMore: 'Learn more',
      infoBottom: 'Log in to manage your inventory',
    },
    footer: {
      subtitle: 'Advanced Medical Management System',
      rights: 'All rights reserved',
      external: 'Sistema Admin PharmaLogic - All rights reserved'
    }
  }
}

export default createI18n({
  legacy: false, 
  locale: localStorage.getItem('user-locale') || 'es', 
  fallbackLocale: 'en',
  messages,
})