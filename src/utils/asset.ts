/**
 * Resolve o caminho de uma imagem vinda do painel de conteúdo contra a base do site.
 *
 * O painel grava caminhos a partir da raiz (ex.: /images/uploads/foto.jpg). Como o
 * site é publicado numa subpasta (/prototipo-hilariom), esse caminho não existe:
 * o arquivo real responde em /prototipo-hilariom/images/uploads/foto.jpg.
 *
 * Guardar o caminho SEM a base e prefixá-lo só na renderização mantém o conteúdo
 * independente de onde o site está publicado — ao migrar para o domínio próprio,
 * nenhum dado precisa ser reescrito.
 *
 * É idempotente de propósito: um caminho que já venha com a base (dado antigo, ou
 * colado à mão por quem edita) não recebe uma segunda.
 */
export function asset(path: string | null | undefined): string {
  if (!path) return '';

  // URLs completas (http://, https://, //cdn..., data:) passam intactas.
  if (/^([a-z][a-z0-9+.-]*:|\/\/)/i.test(path)) return path;

  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;

  if (base && (clean === base || clean.startsWith(`${base}/`))) return clean;
  return `${base}${clean}`;
}
