# Email Scripts

Този директорий съдържа скриптове за изпращане на имейли до регистрираните участници.

## Изпращане на Welcome Emails

### Предварителни изисквания:

1. Убедете се, че имате конфигуриран **Resend API key** в `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxx
   ```

2. Убедете се, че **Supabase credentials** са правилно настроени в `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=xxxxx
   ```

3. Инсталирайте dependencies (ако не сте):
   ```bash
   npm install
   ```

### Стъпки за изпращане:

1. **Отворете терминал** в root директорията на проекта

2. **Пуснете скрипта**:
   ```bash
   npm run send-emails
   ```

   Или директно:
   ```bash
   npx tsx scripts/send-welcome-emails.ts
   ```

3. **Скриптът ще**:
   - Извади всички записи от базата данни
   - Покаже колко имейла ще изпрати
   - Даде ви 5 секунди да откажете (Ctrl+C за отказ)
   - Изпрати имейли един по един с 1 секунда пауза между тях
   - Покаже прогрес и статус за всеки имейл
   - Покаже финално резюме (успешни/неуспешни)

### Важни бележки:

⚠️ **ВНИМАНИЕ**: Този скрипт ще изпрати имейли на ВСИЧКИ регистрирани потребители в базата!

- Скриптът автоматично добавя 1 секунда пауза между имейлите за да спази rate limits на Resend
- Ако някой имейл фейлне, скриптът ще продължи със следващия
- Всички грешки се логват в конзолата
- Може да спрете процеса по всяко време с Ctrl+C

### Пример изход:

```
🚀 Starting email sending process...

📊 Fetching all giveaway entries from database...
✅ Found 25 entries in database.

⚠️  IMPORTANT: This will send emails to all registered users!
   Total emails to send: 25
   Press Ctrl+C to cancel, or wait 5 seconds to continue...

[1/25] Sending email to Иван Петров (ivan@example.com)...
  ✅ Email sent successfully!
[2/25] Sending email to Мария Георгиева (maria@example.com)...
  ✅ Email sent successfully!
...

==================================================
📊 EMAIL SENDING SUMMARY
==================================================
Total entries: 25
✅ Successfully sent: 24
❌ Failed: 1
==================================================

✅ Script completed successfully!
```

### Troubleshooting:

- **"Email service not configured"**: Проверете дали `RESEND_API_KEY` е зададен в `.env.local`
- **"Missing NEXT_PUBLIC_SUPABASE_URL"**: Проверете Supabase credentials
- **"No entries found"**: Няма регистрирани потребители в базата данни
- **Rate limit errors**: Увеличете `DELAY_BETWEEN_EMAILS` в скрипта (default 1000ms)

### Modification:

Ако искате да промените Facebook URL в имейлите:
1. Отворете `lib/email.ts`
2. Намерете line 35: `const facebookUrl = '...'`
3. Сменете с директния линк към поста за раздаването
