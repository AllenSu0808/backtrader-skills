# Backtrader 文件轉 Markdown 工具 — 設計文件

- 日期：2026/07/17
- 狀態：已核准（待實作）

## 背景與目標

透過 `/playwright-cli` 抓取 [backtrader 官方文件站](https://www.backtrader.com/docu/) 的全部章節頁面，將每個章節轉存為本地 Markdown（`.md`）檔案，並依 [llms.txt](https://pagerank.ing/what-is-llms-txt/) 慣例在 `docs/` 底下產出一份索引檔，方便離線閱讀或提供給其他 LLM 工具使用。

## 範圍

- 抓取範圍：整個文件站（`https://www.backtrader.com/docu/` 底下、左側導覽選單涵蓋的所有章節與子頁面）。
- 不含：非文件內容（部落格、社群討論區、下載頁等）。

## 輸出結構

```
d:/code/backtrader-skills/
├── docs/
│   ├── llms.txt                  # 索引檔，分類 + 連結 + 一句話摘要
│   └── <category>/
│       └── <slug>.md            # 每個章節一個檔案，檔名對應 URL slug
└── raw/                          # 中繼產物（抓取階段的原始資料）
    ├── nav.json
    ├── <category>.json
    └── _failed.json              # 抓取失敗的頁面清單（若有）
```

- `docs/` 底下的資料夾階層對應官網左側導覽的分類/子分類結構。
- 每篇 `.md` 開頭附 YAML frontmatter：

  ```
  ---
  source: <原始頁面網址>
  fetched: 2026-07-17
  ---
  ```

- `docs/llms.txt` 的連結一律指向本地 `.md` 檔案相對於 `docs/` 的路徑（例如 `<category>/quickstart.md`），不指向原始網址。

## 架構：三階段管線

```
[階段 1] 導覽發現              [階段 2] 內容批次抓取                [階段 3] 離線轉換 + 索引產出
playwright-cli run-code        playwright-cli run-code              node convert.mjs
擷取左側導覽的                  依分類批次 goto 每頁，                讀 raw/*.json
{title, url, category} 清單    擷取內容區塊 outerHTML，              → turndown 轉 Markdown
→ raw/nav.json                 寫出 raw/<category>.json             → 寫 docs/<category>/<slug>.md
                                                                      → 產出 docs/llms.txt 索引
```

階段 1、2 只做抓取（透過 playwright-cli 操作瀏覽器），階段 3 是純離線的 Node 腳本 —— 兩者責任分離，轉換規則可以反覆調整、除錯，不需要重跑瀏覽器。

## 元件

| 元件 | 說明 | 依賴 |
|---|---|---|
| `discover-nav.js`（透過 `playwright-cli run-code` 執行） | 開啟 `/docu/`，擷取側邊導覽的所有連結與分類階層，輸出 `raw/nav.json` | playwright-cli |
| `crawl.js`（透過 `playwright-cli run-code` 執行，依 `nav.json` 分類分批呼叫） | 對每個分類的頁面清單逐一 `page.goto`，擷取內容區塊 HTML + 頁面標題，輸出 `raw/<category>.json` | playwright-cli、`nav.json` |
| `convert.mjs`（本地 Node 腳本） | 讀所有 `raw/*.json`，用 `turndown` 套件轉 Markdown，加 YAML frontmatter，依分類寫入 `docs/<category>/<slug>.md` | Node.js、`turndown` |
| `build-llms-txt.mjs`（本地 Node 腳本） | 讀轉換後的 `docs/` 結構與每頁摘要（取內容第一段），產出 `docs/llms.txt` | 前一步輸出 |

此工具為一次性使用，不需要考慮排程重跑或增量更新的機制。

## 資料流

1. `nav.json`：分類 → 頁面清單（`{title, url, category}`）
2. `raw/<category>.json`：每個分類的頁面內容（`{url, title, contentHtml}`）
3. `docs/<category>/<slug>.md`：轉換後含 frontmatter 的 Markdown 內容
4. `docs/llms.txt`：分類標題 + `[標題](<category>/<slug>.md): 摘要` 的清單

## 錯誤處理

- **內容區塊 selector 抓不到**：實作前先用 `playwright-cli snapshot` 對至少一頁人工確認內容區塊的 CSS selector，寫死在 `crawl.js` 中；若某頁擷取結果為空，記錄進 `raw/_failed.json` 並繼續處理下一頁，不中斷整批抓取。
- **單頁載入逾時/失敗**：`crawl.js` 對每頁 `page.goto` 加 try-catch，失敗時記錄 URL 與錯誤訊息到 `_failed.json`，抓取結束後回報失敗清單供人工決定是否重試。
- **速率限制**：批次抓取時每頁間加入約 300~500ms 延遲，避免對文件站造成過大負載。
- **轉換失敗**：`convert.mjs` 對單一頁面轉換包 try-catch，失敗時保留原始 HTML 另存 `.html.bak` 並記錄警告，不中斷整體轉換流程。

## 測試與驗證

- **抓取完整性**：比對 `nav.json` 頁面數與 `docs/` 底下產出的 `.md` 檔案數是否一致，並檢查 `_failed.json` 是否為空。
- **抽樣品質檢查**：轉換完成後隨機挑 3~5 篇（至少各一篇含程式碼區塊、含表格）人工比對原網頁與產出 `.md`，確認程式碼區塊、標題階層、連結未跑掉。
- **llms.txt 連結有效性**：跑一次簡單檢查腳本，確認 `docs/llms.txt` 內每個連結都對應到實際存在的本地檔案。

## 未決定/待實作階段確認事項

- 內容區塊確切的 CSS selector，需在實作階段對照實際頁面 DOM 結構後才能定案。
- 官網目前確切的分類/子分類名稱與頁面數量，需在階段 1 執行 `discover-nav.js` 後才能確認。
