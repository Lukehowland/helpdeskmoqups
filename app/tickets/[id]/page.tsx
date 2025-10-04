/**
 * Explicación de la necesidad de generateStaticParams:
 *
 * Cuando se utiliza la opción `output: 'export'` en `next.config.mjs`, Next.js genera un sitio
 * completamente estático durante el proceso de build. Para las rutas dinámicas como `/tickets/[id]`,
 * Next.js necesita saber de antemano todos los posibles valores del parámetro `id` para poder
 * generar un archivo HTML para cada página de ticket.
 *
 * La función `generateStaticParams` resuelve este problema. Se ejecuta en el servidor durante el build,
 * y su propósito es devolver un array con todos los segmentos de la ruta dinámica. En este caso,
 * un array de objetos, donde cada objeto contiene el `id` de un ticket.
 *
 * De esta forma, Next.js puede iterar sobre la lista y generar `/tickets/ticket-101.html`,
 * `/tickets/ticket-102.html`, etc., permitiendo que la exportación estática se complete con éxito.
 */

// 1. Implementación de generateStaticParams
// Esta función se ejecuta en el momento del build en el servidor.
// Obtiene todos los tickets y genera las rutas estáticas para cada uno.
export async function generateStaticParams() {
  // NOTA: La llamada fetch original a 'https://api.example.com/tickets' se ha comentado
  // porque la URL no es real y causaría un error 'ENOTFOUND' durante el build.
  // En su lugar, utilizamos datos de ejemplo (mock data) para demostrar que la lógica
  // de generación de páginas estáticas funciona correctamente.
  //
  // **Para producción, debes reemplazar estos datos de ejemplo con tu llamada fetch real.**

  // Datos de ejemplo que simulan la respuesta de la API.
  const mockTickets = [
    { id: 'ticket-101' },
    { id: 'ticket-102' },
    { id: 'ticket-103' },
  ];

  // Mapeamos los datos de ejemplo al formato que Next.js espera: [{ id: '...' }, ...].
  return mockTickets.map((ticket) => ({
    id: ticket.id.toString(),
  }));
}

// 2. Componente de página de ejemplo (React Server Component)
// Este componente ahora es un Server Component. Se ha eliminado la directiva "use client".
// Recibe `params` como props, que contienen el `id` de la ruta dinámica extraído de la URL.
export default function TicketDetailPage({ params }: { params: { id: string } }) {
  // Extraemos el id de los parámetros de la página.
  const { id } = params;

  // Renderizamos una estructura simple para demostrar que los params se reciben correctamente.
  // Este componente se renderiza en el servidor para cada ticket durante el build.
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <header style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '1rem' }}>
        <h1>Detalles del Ticket</h1>
      </header>
      <main style={{ paddingTop: '1rem' }}>
        <p style={{ fontSize: '1.1rem' }}>
          Mostrando información para el ticket ID: <strong style={{ color: '#0070f3' }}>{id}</strong>
        </p>
        <p style={{ marginTop: '2rem', color: '#666', fontSize: '0.9rem' }}>
          Esta página fue generada estáticamente en el momento del build gracias a la función{' '}
          <code>generateStaticParams</code>. Al inspeccionar el código fuente de esta página en el
          navegador, verás que es un archivo HTML puro, ideal para un rendimiento máximo y un
          consumo de recursos casi nulo en el servidor.
        </p>
      </main>
    </div>
  );
}