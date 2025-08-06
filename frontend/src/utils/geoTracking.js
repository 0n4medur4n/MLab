/**
 * Sistema de seguimiento para Generative Engine Optimization (GEO)
 * Permite monitorear apariciones en IA, interacciones con contenido estructurado y otros indicadores clave
 */

class GEOTracking {
  constructor() {
    this.isInitialized = false;
    this.eventQueue = [];
  }

  /**
   * Inicializa el sistema de seguimiento
   */
  init() {
    if (this.isInitialized) return;
    
    // Verificar si estamos en un entorno de navegador
    if (typeof window !== 'undefined') {
      // Registrar evento de carga de página
      this.trackPageLoad();
      
      // Configurar listeners para interacciones
      this.setupEventListeners();
      
      // Procesar eventos en cola
      this.processEventQueue();
      
      this.isInitialized = true;
    }
  }

  /**
   * Registra la carga de página con datos GEO
   */
  trackPageLoad() {
    const pageData = {
      url: window.location.href,
      title: document.title,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      language: navigator.language,
      referrer: document.referrer,
      // Parámetros UTM específicos para GEO
      utm_source: this.getURLParameter('utm_source'),
      utm_medium: this.getURLParameter('utm_medium'),
      utm_campaign: this.getURLParameter('utm_campaign'),
      utm_content: this.getURLParameter('utm_content'),
      utm_term: this.getURLParameter('utm_term')
    };
    
    this.sendEvent('page_load', pageData);
  }

  /**
   * Configura listeners para interacciones del usuario
   */
  setupEventListeners() {
    // Seguimiento de clics en FAQ
    document.addEventListener('click', (e) => {
      const faqToggle = e.target.closest('[data-faq-toggle]');
      if (faqToggle) {
        this.trackFAQInteraction({
          question: faqToggle.textContent,
          action: 'toggle'
        });
      }
    });
    
    // Seguimiento de interacciones con esquemas estructurados
    document.addEventListener('click', (e) => {
      const structuredContent = e.target.closest('[data-structured-content]');
      if (structuredContent) {
        this.trackStructuredContentInteraction({
          type: structuredContent.dataset.structuredContent,
          id: structuredContent.dataset.id,
          action: 'click'
        });
      }
    });
    
    // Seguimiento de tiempo en página
    window.addEventListener('beforeunload', () => {
      this.trackPageUnload();
    });
  }

  /**
   * Registra interacción con FAQ
   */
  trackFAQInteraction(data) {
    this.sendEvent('faq_interaction', {
      ...data,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Registra interacción con contenido estructurado
   */
  trackStructuredContentInteraction(data) {
    this.sendEvent('structured_content_interaction', {
      ...data,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Registra el tiempo total en página
   */
  trackPageUnload() {
    const timeOnPage = Math.round((new Date().getTime() - performance.timing.loadEventEnd) / 1000);
    
    this.sendEvent('page_unload', {
      timeOnPage,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Registra una aparición en motores de búsqueda o asistentes de IA
   */
  trackAIAppearance(data) {
    this.sendEvent('ai_appearance', {
      ...data,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Registra una conversión específica de GEO
   */
  trackGEOConversion(data) {
    this.sendEvent('geo_conversion', {
      ...data,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Envía un evento al endpoint de seguimiento
   */
  sendEvent(eventType, data) {
    // Si no estamos inicializados, encolar el evento
    if (!this.isInitialized) {
      this.eventQueue.push({ eventType, data });
      return;
    }
    
    // En un entorno real, esto enviaría datos a un endpoint de análisis
    // Por ahora, solo lo registramos en consola
    console.log(`[GEO Tracking] ${eventType}:`, data);
    
    // En un entorno de producción, implementar:
    /*
    fetch('/api/geo-tracking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventType,
        data
      })
    }).catch(err => {
      console.error('Error sending GEO tracking event:', err);
    });
    */
  }

  /**
   * Procesa eventos en cola cuando se inicializa el sistema
   */
  processEventQueue() {
    while (this.eventQueue.length > 0) {
      const event = this.eventQueue.shift();
      this.sendEvent(event.eventType, event.data);
    }
  }

  /**
   * Obtiene parámetros de URL
   */
  getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  /**
   * Marca una página como optimizada para GEO
   */
  markAsGEOOptimized() {
    const geoMeta = document.createElement('meta');
    geoMeta.name = 'geo-optimized';
    geoMeta.content = 'true';
    document.head.appendChild(geoMeta);
  }
}

// Crear instancia global
const geoTracking = new GEOTracking();

// Exportar para uso en la aplicación
export default geoTracking;

// Inicializar automáticamente cuando el DOM esté listo
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      geoTracking.init();
    });
  } else {
    geoTracking.init();
  }
}
