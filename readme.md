
## Запуск

Клонируйте проект

```bash
  git clone https://github.com/vpvIT/wb-tariffs-updater
```

Перейдите в папку с проектом

```bash
  cd wb-tariffs-updater
```

Настройте .env файл, измените WB_API_KEY на ваш ключ от API Wildberries. В GOOGLE_DOCS_IDS напишите через запятую список id документов, куда вы хотите сохранять тарифы.

Добавьте в папку files файл с названием key.json, который будет содержать ключ от сервисного аккаунта Google Cloud, получить его можно [здесь](https://console.cloud.google.com/iam-admin/serviceaccounts). Дайте доступ сервисному аккаунту во все документы, которые вы указали в GOOGLE_DOCS_IDS. 

Запустите
```bash
  docker compose up
```

