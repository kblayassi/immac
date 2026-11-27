# =============================================================
#  IMMAC KOXO - Configuration automatique du proxy
#  Lancer avec : powershell -ExecutionPolicy Bypass -File install-proxy-immac.ps1
# =============================================================

$PROXY_SERVER   = "10.0.0.1"
$PROXY_PORT     = "3128"
$WORK_SSID      = "IMMAC KOXO"
$WORK_GW_MAC    = "00-0c-29-1d-62-78"   # MAC passerelle réseau école
$TASK_NAME      = "IMMAC_ProxySwitch"
$SCRIPT_DIR     = "$env:APPDATA\IMMAC"
$SCRIPT_PATH    = "$SCRIPT_DIR\proxy-switch.ps1"
$LOG_PATH       = "$SCRIPT_DIR\proxy-switch.log"

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

# Here-string entre apostrophes : rien n'est interprété ici, les valeurs
# réelles remplacent les marqueurs __XXX__ juste après.
$switchScript = @'
# IMMAC KOXO - Proxy Switch (ne pas modifier)
$PROXY_SERVER = "__PROXY_SERVER__"
$PROXY_PORT   = "__PROXY_PORT__"
$WORK_SSID    = "__WORK_SSID__"
$WORK_GW_MAC  = "__WORK_GW_MAC__"
$LOG_PATH     = "__LOG_PATH__"
$regPath      = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings"

# Laisser à Windows le temps d'identifier le réseau
Start-Sleep -Seconds 5

# 1) Nom du réseau : pour le Wi-Fi, c'est le nom (SSID) ; Windows peut ajouter
#    un numéro (« IMMAC KOXO 2 »), d'où le -like.
$profils = @(Get-NetConnectionProfile -ErrorAction SilentlyContinue | ForEach-Object { $_.Name })
$parNom  = [bool]($profils | Where-Object { $_ -like "$WORK_SSID*" })

# 2) Adresse MAC de la passerelle (utile en filaire, sans nom de Wi-Fi)
$gateway = (Get-NetRoute -DestinationPrefix "0.0.0.0/0" -ErrorAction SilentlyContinue |
    Sort-Object RouteMetric | Select-Object -First 1).NextHop
$gatewayMAC = ""
if ($gateway) {
    ping -n 1 -w 500 $gateway | Out-Null
    $voisin = Get-NetNeighbor -IPAddress $gateway -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($voisin) { $gatewayMAC = $voisin.LinkLayerAddress }
}
$parMAC = ($gatewayMAC -and ($gatewayMAC -eq $WORK_GW_MAC))   # -eq ignore la casse

# Appliquer le changement de proxy à Windows sans redémarrer
function Set-ProxyRefresh {
    $sig = '[DllImport("wininet.dll")] public static extern bool InternetSetOption(IntPtr h, int o, IntPtr b, int l);'
    $t = Add-Type -MemberDefinition $sig -Name WinInet -Namespace Win32 -PassThru -ErrorAction SilentlyContinue
    if ($t) {
        $t::InternetSetOption([IntPtr]::Zero, 39, [IntPtr]::Zero, 0) | Out-Null
        $t::InternetSetOption([IntPtr]::Zero, 37, [IntPtr]::Zero, 0) | Out-Null
    }
}

if ($parNom -or $parMAC) {
    Set-ItemProperty -Path $regPath -Name ProxyEnable -Value 1
    Set-ItemProperty -Path $regPath -Name ProxyServer -Value "${PROXY_SERVER}:${PROXY_PORT}"
    $decision = "proxy ACTIVE"
} else {
    Set-ItemProperty -Path $regPath -Name ProxyEnable -Value 0
    $decision = "proxy desactive"
}
Set-ProxyRefresh

# Journal (50 dernières lignes) pour comprendre une bascule ratée
$ligne = "{0} | reseaux: {1} | passerelle: {2} ({3}) | {4}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"),
    ($profils -join ", "), $gateway, $gatewayMAC, $decision
$anciennes = @()
if (Test-Path $LOG_PATH) { $anciennes = @(Get-Content $LOG_PATH -Tail 49) }
($anciennes + $ligne) | Set-Content -Path $LOG_PATH -Encoding UTF8
'@

$switchScript = $switchScript.Replace("__PROXY_SERVER__", $PROXY_SERVER)
$switchScript = $switchScript.Replace("__PROXY_PORT__",   $PROXY_PORT)
$switchScript = $switchScript.Replace("__WORK_SSID__",    $WORK_SSID)
$switchScript = $switchScript.Replace("__WORK_GW_MAC__",  $WORK_GW_MAC)
$switchScript = $switchScript.Replace("__LOG_PATH__",     $LOG_PATH)

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
    -MultipleInstances IgnoreNew `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries

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
$etat = (Get-ItemProperty "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings").ProxyEnable
if ($etat -eq 1) {
    Write-OK "Réseau de l'école détecté : proxy activé ($PROXY_SERVER`:$PROXY_PORT)"
} else {
    Write-Fail "Réseau de l'école non détecté : proxy désactivé"
    if (Test-Path $LOG_PATH) { Write-Host "    $(Get-Content $LOG_PATH -Tail 1)" -ForegroundColor Gray }
}

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
