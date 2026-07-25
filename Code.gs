/**
 * BACKEND DO CONTROLE FINANCEIRO — Google Apps Script
 *
 * Como instalar:
 * 1. Abra sua planilha no Google Sheets.
 * 2. Renomeie a primeira aba para "Lancamentos".
 * 3. Na linha 1, crie as colunas: Data | Descricao | Categoria | Tipo | Valor
 * 4. Menu Extensões > Apps Script.
 * 5. Apague o conteúdo padrão e cole todo este arquivo.
 * 6. Clique em "Implantar" > "Nova implantação".
 *    - Tipo: "App da Web"
 *    - Executar como: "Eu"
 *    - Quem pode acessar: "Qualquer pessoa"
 * 7. Copie a URL gerada (termina em /exec) — é ela que vai no site.
 * 8. Toda vez que editar este código, faça "Gerenciar implantações" > editar > nova versão.
 */

const SHEET_NAME = "Lancamentos";

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const rows = data.slice(1); // remove cabeçalho

  const lancamentos = rows
    .filter(r => r[0] !== "") // ignora linhas vazias
    .map((r, i) => ({
      linha: i + 2, // linha real na planilha (pra permitir excluir depois)
      data: formatDate(r[0]),
      descricao: r[1],
      categoria: r[2],
      tipo: r[3],
      valor: Number(r[4])
    }));

  return respond({ ok: true, lancamentos });
}

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const body = JSON.parse(e.postData.contents);

  if (body.acao === "excluir") {
    sheet.deleteRow(Number(body.linha));
    return respond({ ok: true });
  }

  // acao padrão: adicionar
  sheet.appendRow([
    body.data,
    body.descricao,
    body.categoria,
    body.tipo, // "receita" ou "despesa"
    Number(body.valor)
  ]);

  return respond({ ok: true });
}

function formatDate(value) {
  if (Object.prototype.toString.call(value) === "[object Date]") {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), "yyyy-MM-dd");
  }
  return value;
}

function respond(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
