# Telegram to Google Sheets

Collect posts from public Telegram channel previews and retry saved imports without adding duplicate rows when imports run sequentially.

- [Download the workflow bundle](telegram-to-sheets-v1.0.0.zip)
- [Setup guide](tutorial.txt)
- [Workflow JSON](telegram-to-sheets.json)
- [Captioned demo](telegram-demo-90s.mp4)
- [Telegram Channel Watch on Apify](https://apify.com/humming_cobalt/telegram-channel-watch)

Connect your own Apify and Google credentials. The template uses a manual trigger, matches spreadsheet rows by post ID, and sets a $0.05 cap per new Actor run.

The template is free. The paid Apify Actor costs $0.005 per run plus $0.001 per delivered post. n8n hosting may cost extra. Humming Cobalt maintains the Actor.

Tested with n8n 2.43.5: import, repeat import, missing-tab failure and recovery, empty results, and partial results. Run only one writer per spreadsheet at a time.

Private channels, comments, member lists, and edit/delete tracking are not supported. For help, use the Actor's Issues tab; never include credentials.
