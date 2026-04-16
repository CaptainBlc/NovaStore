param(
  [string]$WorkspaceRoot = 'c:\Users\Pc\Desktop\Batuhan_Tasdemir_NovaStore_StajProjesi'
)

$ErrorActionPreference = 'Stop'

$docsDir = (Get-ChildItem -Directory $WorkspaceRoot | Where-Object { $_.Name -like 'Dok*manlar' } | Select-Object -First 1).FullName
$srcMd = Join-Path $WorkspaceRoot '2_Figma_UIUX\BatuhanTasdemir_FigmaUIUX_Aciklama_RaporMetni.md'
$outDocx = Join-Path $docsDir 'Batuhan_Tasdemir_FigmaUIUX_Aciklama.docx'

if (!(Test-Path -LiteralPath $srcMd)) {
  throw ('Source report markdown not found: ' + $srcMd)
}

$text = Get-Content -LiteralPath $srcMd -Raw
$text = $text -replace "`r`n", "`n"
$lines = $text -split "`n"

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0

$doc = $null
try {
  $doc = $word.Documents.Add()

  function Add-Paragraph([string]$content, [string]$style) {
    $p = $doc.Paragraphs.Add()
    $p.Range.Text = $content
    if ($style -and $style.Trim().Length -gt 0) {
      try { $p.Range.set_Style($style) | Out-Null } catch {}
    }
    $p.Range.InsertParagraphAfter() | Out-Null
  }

  Add-Paragraph 'Batuhan Taşdemir – NovaStore | Figma UI/UX Açıklama Raporu' 'Title'
  Add-Paragraph 'Tarih: Nisan 2026' 'Subtitle'
  Add-Paragraph 'Platform: Mobil (iOS ve Android)' ''
  Add-Paragraph 'Ekranlar: Login / Home / Detail' ''
  Add-Paragraph '' ''

  foreach ($line in $lines) {
    if ([string]::IsNullOrWhiteSpace($line)) { continue }
    if ($line -match '^\#\s') { continue }
    if ($line -match '^\#\#\s+(.*)') { Add-Paragraph $matches[1] 'Heading 1'; continue }
    if ($line -match '^\#\#\#\s+(.*)') { Add-Paragraph $matches[1] 'Heading 2'; continue }
    if ($line -match '^\-\-\-\s*$') { continue }

    if ($line -match '^\-\s+(.*)') {
      $item = $matches[1]
      $p = $doc.Paragraphs.Add()
      $p.Range.Text = $item
      try { $p.Range.ListFormat.ApplyBulletDefault() | Out-Null } catch {}
      $p.Range.InsertParagraphAfter() | Out-Null
      continue
    }

    $clean = $line
    $clean = $clean -replace '\*\*', ''
    $clean = $clean.Replace(([string][char]96), '')
    Add-Paragraph $clean 'Normal'
  }

  try {
    $doc.PageSetup.PaperSize = 7
    $doc.PageSetup.TopMargin = $word.CentimetersToPoints(2.5)
    $doc.PageSetup.BottomMargin = $word.CentimetersToPoints(2.5)
    $doc.PageSetup.LeftMargin = $word.CentimetersToPoints(2.5)
    $doc.PageSetup.RightMargin = $word.CentimetersToPoints(2.5)
  } catch {}

  $wdFormatDocumentDefault = 16
  try {
    $doc.SaveAs2($outDocx, $wdFormatDocumentDefault) | Out-Null
  } catch {
    $doc.SaveAs($outDocx, $wdFormatDocumentDefault) | Out-Null
  }
}
finally {
  if ($doc) { $doc.Close([ref]$false) | Out-Null }
  $word.Quit() | Out-Null
  if ($doc) { [System.Runtime.Interopservices.Marshal]::ReleaseComObject($doc) | Out-Null }
  [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
  [GC]::Collect()
  [GC]::WaitForPendingFinalizers()
}

Get-Item -LiteralPath $outDocx | Select-Object FullName,Length

