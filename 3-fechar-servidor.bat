@echo off
echo Procurando servidor Python na porta 8080...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8080 ^| findstr LISTENING') do (
    echo Encerrando processo %%a...
    taskkill /F /PID %%a >nul 2>&1
)
echo.
echo ========================================
echo   SERVIDOR ENCERRADO
echo ========================================
echo.
echo Para reiniciar, clique em "1-iniciar-servidor.bat"
echo.
timeout /t 3
