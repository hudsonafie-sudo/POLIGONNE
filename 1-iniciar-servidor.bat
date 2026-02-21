@echo off
echo ========================================
echo   INICIANDO SERVIDOR E ABRINDO JOGO
echo ========================================
cd /d "%~dp0"
echo Aguarde... iniciando servidor Python...
echo.

REM Inicia servidor em background
start /B python -m http.server 8080

REM Aguarda 5 segundos para servidor inicializar
echo Servidor iniciando... aguarde 5 segundos
timeout /t 5 /nobreak >nul

REM Abre o jogo
echo Abrindo jogo no navegador...
start "" "http://localhost:8080/jogo/dev.html"

echo.
echo ========================================
echo   SERVIDOR RODANDO COM SUCESSO!
echo ========================================
echo.
echo Servidor rodando em: http://localhost:8080
echo.
echo Para reabrir o jogo: clique em "2-abrir-jogo.bat"
echo Para pausar servidor: clique em "3-fechar-servidor.bat"
echo Ou feche esta janela para encerrar
echo.
echo ========================================
echo.
pause
