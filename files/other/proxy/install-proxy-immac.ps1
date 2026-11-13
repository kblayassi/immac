# =============================================================
#  IMMAC KOXO - Configuration automatique du proxy
#  Double-cliquer sur ce fichier pour installer
# =============================================================

$PROXY_SERVER   = "10.0.0.1"
$PROXY_PORT     = "3128"
$WORK_SSID      = "IMMAC KOXO"
$WORK_GW_MAC    = "00-0c-29-1d-62-78"   # MAC passerelle réseau école
$TASK_NAME      = "IMMAC_ProxySwitch"
$SCRIPT_DIR     = "$env:APPDATA\IMMAC"
$SCRIPT_PATH    = "$SCRIPT_DIR\proxy-switch.ps1"

# --- Couleurs console ---
function Write-Step  { param($msg) Write-Host "  > $msg" -ForegroundColor Cyan }
function Write-OK    { param($msg) Write-Host "  v $msg" -ForegroundColor Green }
function Write-Fail  { param($msg) Write-Host "  x $msg" -ForegroundColor Red }

Clear-Host
Write-Host ""
Write-Host "  ================================================" -ForegroundColor Blue
Write-Host "   IMMAC KOXO - Installation proxy automatique" -ForegroundColor Blue
Write-Host "  ================================================" -ForegroundColor Blue
Write-Host ""

# --- 1. Créer le dossier ---
Write-Step "Création du dossier de configuration..."
New-Item -ItemType Directory -Force -Path $SCRIPT_DIR | Out-Null
Write-OK "Dossier créé : $SCRIPT_DIR"

# --- 2. Écrire le script de détection/bascule ---
Write-Step "Écriture du script de bascule proxy..."

$switchScript = @"
# IMMAC KOXO - Proxy Switch (ne pas modifier)
`$PROXY_SERVER = "$PROXY_SERVER"
`$PROXY_PORT   = "$PROXY_PORT"
`$WORK_GW_MAC  = "$WORK_GW_MAC"
`$regPath      = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings"

Start-Sleep -Seconds 3

# Récupérer la passerelle par défaut
`$gateway = (Get-NetRoute -DestinationPrefix "0.0.0.0/0" -ErrorAction SilentlyContinue |
    Sort-Object RouteMetric | Select-Object -First 1).NextHop

# Récupérer la MAC de la passerelle via ARP
`$gatewayMAC = ""
if (`$gateway) {
    # Forcer une entrée ARP
    ping -n 1 -w 500 `$gateway | Out-Null
    `$arpLine = arp -a `$gateway 2>`$null | Select-String `$gateway
    if (`$arpLine) {
        `$gatewayMAC = (`$arpLine.ToString().Trim() -split "\s+")[1]
    }
}

# Fonction pour appliquer le changement de proxy à Windows
function Set-ProxyRefresh {
    `$sig = '[DllImport("wininet.dll")] public static extern bool InternetSetOption(IntPtr h, int o, IntPtr b, int l);'
    `$t = Add-Type -MemberDefinition `$sig -Name WinInet -Namespace Win32 -PassThru -ErrorAction SilentlyContinue
    if (`$t) {
        `$t::InternetSetOption([IntPtr]::Zero, 39, [IntPtr]::Zero, 0) | Out-Null
        `$t::InternetSetOption([IntPtr]::Zero, 37, [IntPtr]::Zero, 0) | Out-Null
    }
}

if (`$gatewayMAC -eq `$WORK_GW_MAC) {
    Set-ItemProperty -Path `$regPath -Name ProxyEnable -Value 1
    Set-ItemProperty -Path `$regPath -Name ProxyServer -Value "`${PROXY_SERVER}:`${PROXY_PORT}"
    Set-ProxyRefresh
} else {
    Set-ItemProperty -Path `$regPath -Name ProxyEnable -Value 0
    Set-ProxyRefresh
}
"@

$switchScript | Out-File -FilePath $SCRIPT_PATH -Encoding UTF8
Write-OK "Script écrit : $SCRIPT_PATH"

# --- 3. Créer la tâche planifiée (déclenchée sur événement réseau) ---
Write-Step "Création de la tâche planifiée..."

# Supprimer si elle existe déjà
Unregister-ScheduledTask -TaskName $TASK_NAME -Confirm:$false -ErrorAction SilentlyContinue

$action = New-ScheduledTaskAction `
    -Execute "powershell.exe" `
    -Argument "-WindowStyle Hidden -ExecutionPolicy Bypass -File `"$SCRIPT_PATH`""

# Déclencheur : connexion réseau (Event ID 10000 = réseau connecté)
$triggerXml = @"
<QueryList>
  <Query Id="0" Path="Microsoft-Windows-NetworkProfile/Operational">
    <Select Path="Microsoft-Windows-NetworkProfile/Operational">
      *[System[EventID=10000 or EventID=10001]]
    </Select>
  </Query>
</QueryList>
"@

$triggerEvent = New-CimInstance -Namespace Root/Microsoft/Windows/TaskScheduler `
    -ClassName MSFT_TaskEventTrigger -ClientOnly -Property @{
        Subscription = $triggerXml
        Enabled      = $true
    }

# Déclencheur : au démarrage de session
$triggerLogon = New-ScheduledTaskTrigger -AtLogOn

$settings = New-ScheduledTaskSettingsSet `
    -ExecutionTimeLimit (New-TimeSpan -Minutes 1) `
    -MultipleInstances IgnoreNew

$principal = New-ScheduledTaskPrincipal `
    -UserId $env:USERNAME `
    -LogonType Interactive `
    -RunLevel Highest

Register-ScheduledTask `
    -TaskName  $TASK_NAME `
    -Action    $action `
    -Trigger   @($triggerEvent, $triggerLogon) `
    -Settings  $settings `
    -Principal $principal `
    -Force | Out-Null

Write-OK "Tâche planifiée créée : $TASK_NAME"

# --- 4. Appliquer le proxy maintenant ---
Write-Step "Application immédiate des paramètres..."
& powershell.exe -WindowStyle Hidden -ExecutionPolicy Bypass -File "$SCRIPT_PATH"
Write-OK "Paramètres appliqués"

# --- Résumé ---
Write-Host ""
Write-Host "  ================================================" -ForegroundColor Green
Write-Host "   Installation terminée avec succès !" -ForegroundColor Green
Write-Host "  ================================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Le proxy s'activera automatiquement quand tu" -ForegroundColor White
Write-Host "  te connectes au Wi-Fi IMMAC KOXO, et se" -ForegroundColor White
Write-Host "  désactivera sur tous les autres réseaux." -ForegroundColor White
Write-Host ""
Write-Host "  Appuie sur Entrée pour fermer..." -ForegroundColor Gray
Read-Host
