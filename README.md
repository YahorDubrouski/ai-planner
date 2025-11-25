# ⚡ n8n Automation Collection

This repository now collects multiple **n8n automations**. It started with the **AI Planner** and continues to grow with additional flows like the Prompt Hub.

## 📋 Prerequisites

- Ubuntu (or compatible Linux distribution)
- Docker installed and running
- Basic Linux OS knowledge

---

## 🧩 Available Automations
- **AI Planner (Voice assistant ↔ Notion)** — Talk to Telegram, sync tasks to Notion via n8n.
- **Prompt Hub (Semantic prompt search)** — GPT auto-finds the right prompt using Notion + HuggingFace embeddings. Read more in [`documentation/prompt-hub/README.md`](documentation/prompt-hub/README.md).

---

# 🧠 AI Planner - Voice Assistant to Notion via Telegram & n8n

This project is a no-cost, AI-powered task planner that connects **Telegram**, **OpenAI**, and **Notion** via **n8n**, all hosted using **Docker**. You can talk to your Telegram bot, and it will automatically create, update, or analyze your Notion-based tasks using AI.

---

## 🚀 Features

- 🎤 Voice or text message support via Telegram
- 🧠 Natural language intent detection (create, update, analyze)
- 📝 Smart task creation in Notion (title, description, priority, tags, date)
- 🔁 Task update with bullet lists and tag inference
- 📊 Task analysis with awareness of your goals and workload
- 🐳 Runs locally via Docker with zero cost

---

## 📁 Project Structure

```
/ai-planner/
├── docker-compose.yml          # Dockerized local setup (Postgres + n8n)
├── n8n_data/                   # Persistent volume for n8n
└── templates/
    └── AI Planner.json         # Importable n8n workflow
```

---

## 🛠️ Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/YahorDubrouski/ai-planner.git
   cd ai-planner
   ```

2. Create a `.env` file:
   ```env
   DB_POSTGRESDB_USER=youruser
   DB_POSTGRESDB_PASSWORD=yourpass
   ```

3. Start the stack:
   ```bash
   docker-compose up -d
   ```

4. Open n8n at [http://localhost:5678](http://localhost:5678)

5. Import the template:  
   Go to `Templates` > `Import` and load `templates/AI Planner.json`

---

## 🔐 Secrets Required

Before running, set up the following credentials in n8n:

- Telegram Bot Token (create via BotFather)
- OpenAI API Key (or self-hosted model)
- Notion Integration Token + Database ID

---

## ✨ Prompt Highlights

- Create prompt auto-detects:
  - Tags: `health`, `sport`, `family`, `money`, `career`, etc.
  - Lists: converted into bullet points
- Update prompt:
  - Merges AI output into original task
  - Reflects new tags/content cleanly
- Analyze prompt:
  - Detects alignment with goals

---

## 📦 Technologies

- [n8n](https://n8n.io)
- [Notion API](https://developers.notion.com/)
- [OpenAI](https://platform.openai.com/)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- Docker + Postgres

---

## 👤 Author

<div align="left">

**Yahor Dubrouski**

[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@ProDevOpsTraining)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/yahor-dubrouski/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/YahorDubrouski)

</div>

---

**Custom License** — Free for personal and non-commercial use. See [LICENSE](LICENSE).
