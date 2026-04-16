@echo off
echo =====================================================
echo  NovaStore - SQL Veritabani Kurulum Scripti
echo  Hazirlayan: Batuhan Tasdemir
echo =====================================================
echo.
echo [1/3] LocalDB instance olusturuluyor...
SqlLocalDB create NovaStore 2>nul
SqlLocalDB start NovaStore
echo.
echo [2/3] SQL dosyasi calistiriliyor...
set SQLFILE=%~dp0BatuhanTasdemir_NovaStore_Veritabani.sql
sqlcmd -S "(localdb)\NovaStore" -i "%SQLFILE%" -o "%~dp0Sonuc.txt" -e
echo.
echo [3/3] Tamamlandi! Sonuclar Sonuc.txt dosyasina yazildi.
echo.
echo Azure Data Studio ile baglanti:
echo   Sunucu: (localdb)\NovaStore
echo   Kimlik Dogrulama: Windows Authentication
echo.
pause
