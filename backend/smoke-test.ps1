$BaseUrl = if ($env:BASE_URL) { $env:BASE_URL } else { "http://localhost:3001" }
$AdminKey = if ($env:ADMIN_KEY) { $env:ADMIN_KEY } else { "change_this_admin_key" }

Write-Host "Testing backend at $BaseUrl"

Write-Host "1/3 Checking health..."
$health = Invoke-RestMethod -Uri "$BaseUrl/api/health" -Method Get
$health | ConvertTo-Json -Depth 10
if ($health.status -ne "ok") {
    throw "Health check failed."
}

Write-Host "2/3 Creating a sample inquiry..."
$body = @{
    name = "Smoke Test User"
    email = "smoke-test@example.com"
    projectTypes = @("Cloud & DevOps")
    budget = "5-15k"
    message = "This is a smoke test submission for the backend API."
} | ConvertTo-Json -Depth 10

$post = Invoke-RestMethod -Uri "$BaseUrl/api/inquiries" -Method Post -ContentType "application/json" -Body $body
$post | ConvertTo-Json -Depth 10
if (-not $post.id) {
    throw "Inquiry submission failed."
}

Write-Host "3/3 Fetching inquiries with admin key..."
$headers = @{ Authorization = "Bearer $AdminKey" }
$inquiries = Invoke-RestMethod -Uri "$BaseUrl/api/inquiries" -Method Get -Headers $headers
$inquiries | ConvertTo-Json -Depth 10

Write-Host "Smoke test succeeded."
