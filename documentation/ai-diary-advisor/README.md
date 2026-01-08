# 📔 AI Diary / Advisor

Tired of keeping a diary but never reflecting on it? Need daily guidance to achieve your goals? Here is the **AI Diary / Advisor** — an intelligent diary system that stores your thoughts and provides personalized daily AI-powered advice.

---

## 🎬 Demo

*Demo video coming soon*

---

## ✨ Features

- 🎤 **Voice & Text Support** — Send diary entries via Telegram (voice messages are automatically transcribed)
- 📝 **Automatic Storage** — All entries saved to Notion with timestamps
- 🧠 **Daily AI Analysis** — Receive personalized advice every morning at 6 AM
- 💡 **Goal-Oriented Guidance** — AI analyzes your priorities and suggests concrete actions
- 🔔 **Telegram Integration** — Get confirmations and daily reports directly in Telegram

---

## 💡 Why It's Valuable

Without AI Diary / Advisor, you have to:
- Manually write diary entries in multiple places
- Remember to review your entries regularly
- Figure out what actions to take on your own
- Miss patterns and insights in your daily life

**With AI Diary / Advisor:**
- Just send a message to Telegram (voice or text) — it's stored automatically
- Get daily personalized advice based on your last 7 days
- Receive actionable steps to achieve your goals
- Track your emotional state and priorities over time

---

## 📋 Prerequisites

- n8n installed and running

---

## 🔗 Integrations

- **Telegram Bot** — Send diary entries via voice or text messages
- **OpenAI** — Voice transcription and AI-powered analysis
- **Notion** — Centralized diary storage and organization

---

## 🛠️ Installation

1. **Import the workflow:**
   - Download the workflow file from `templates/AI Diary _ Advisor.json` - [AI Diary _ Advisor.json](../../templates/AI%20Diary%20_%20Advisor.json) in this repository
   - In n8n, go to `Templates` > `Import` and load the workflow file

2. **Set up credentials in n8n:**
   - Telegram Bot Token (create via BotFather)
   - OpenAI API Key
   - Notion Integration Token

3. **Create your Diary database in Notion:**
   Create a new database with the following columns:
   - `Text` (Title property) — for your diary entries
   - `Created time` (automatically included) — used to filter last 7 days of entries

4. **Configure n8n workflow:**
   - Set your Notion Database ID in these nodes: "Get Dairy Info" and "Create a diary note"
   - Configure your Telegram Chat ID in the "Send Daily Report" node (replace the hardcoded chat ID)
   - Customize the AI advisor's priorities in the "Message a model" node system prompt to match your goals (default: Health, Career, Relationships, Personal Growth)

5. **Activate the workflow:**
   - Activate the workflow in n8n
   - Start sending messages to your Telegram bot

6. **Enjoy!**
   Send voice or text messages to your Telegram bot, and receive daily AI-powered advice every morning at 6 AM.

---

## 🎯 How It Works

The workflow has two main functions:

1. **Message Storage** — When you send a message (voice or text) via Telegram, it automatically:
   - Transcribes voice messages to text using OpenAI
   - Stores everything in your Notion diary
   - Sends you a confirmation with the diary entry link

2. **Daily Advice** — Every day at 6 AM, the workflow:
   - Retrieves your last 7 days of diary entries from Notion
   - Analyzes them using AI based on your priorities
   - Provides an emotional summary, observations, and 0-3 concrete actions
   - Sends personalized advice via Telegram

---

## ⚙️ Customization

### AI Priorities

You can customize the AI's focus areas by editing the system prompt in the "Message a model" node. The default priorities are:

1. **Health** — physical and mental wellness
2. **Career** — professional growth and work-life balance
3. **Relationships** — family, friends, and meaningful connections
4. **Personal Growth** — learning, hobbies, and self-improvement

Replace these with your own priorities to get personalized guidance.

### Schedule Time

The default schedule is 6 AM daily. You can change this in the "Schedule Trigger" node.

---

## 📦 Technologies

- [n8n](https://n8n.io) — Workflow automation
- [Notion API](https://developers.notion.com/) — Database storage
- [OpenAI](https://platform.openai.com/) — Voice transcription and AI analysis
- [Telegram Bot API](https://core.telegram.org/bots/api) — Message handling

---

## 👤 Author

<div align="left">

**Yahor Dubrouski**

[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@ProDevOpsTraining)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/yahor-dubrouski/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/YahorDubrouski)

</div>

---

**Custom License** — Free for personal and non-commercial use. See [LICENSE](../../LICENSE).
