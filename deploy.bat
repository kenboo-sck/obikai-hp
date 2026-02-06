@echo off
chcp 65001
echo ==========================================
echo  帯会HP ビルド＆デプロイツール
echo ==========================================

echo.
echo [1/3] プロジェクトをビルドしています...
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] ビルドに失敗しました。エラーを確認してください。
    pause
    exit /b %errorlevel%
)
echo [OK] ビルド成功

echo.
echo [2/3] 変更をGitにコミットします...
set /p commit_msg="コミットメッセージを入力してください (未入力で 'Update site'): "
if "%commit_msg%"=="" set commit_msg=Update site

git add .
git commit -m "%commit_msg%"

echo.
echo [3/3] GitHubへプッシュしています...
git push origin main
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Git Pushに失敗しました。ブランチ名などを確認してください。
    echo (現在の設定では origin main にプッシュします)
    pause
    exit /b %errorlevel%
)

echo.
echo ==========================================
echo  処理が完了しました。
echo  Vercel/Firebase等の自動デプロイが開始されます。
echo ==========================================
pause