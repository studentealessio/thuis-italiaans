/* worker-amazon-locale.js — snippet FACOLTATIVO per il Worker Cloudflare.
 * Aggiunge data-paese="XX" sull'<html> usando request.cf.country (paese
 * derivato dall'IP al tuo edge: nessun servizio terzo, nessun cookie).
 * Lo script amazon-locale.js lo legge come segnale prioritario; senza
 * Worker, cade automaticamente su fuso orario + lingua.
 *
 * Integra questa logica nel fetch handler del tuo Worker esistente:
 */
export default {
  async fetch(request, env) {
    // Se servi asset statici con Workers Assets/Sites:
    const risposta = await env.ASSETS.fetch(request);

    const paese = request.cf && request.cf.country; // es. "NL"
    const tipo = risposta.headers.get("content-type") || "";
    if (!paese || !tipo.includes("text/html")) return risposta;

    return new HTMLRewriter()
      .on("html", {
        element(el) { el.setAttribute("data-paese", paese); }
      })
      .transform(risposta);
  }
};
