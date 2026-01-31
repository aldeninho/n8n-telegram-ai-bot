\# n8n Telegram AI Market Bot 🤖📈



An AI-powered Telegram bot built using n8n that performs multi-timeframe market analysis and delivers automated technical trading recommendations in real time.



The system integrates live market data APIs, custom JavaScript logic, and a generative AI model to convert raw price data into actionable insights delivered through Telegram.



---



\## Features



\- Telegram bot interface

\- Multi-timeframe market analysis (1m, 15m, 1h)

\- Automated BUY / SELL / NEUTRAL signal generation

\- Dynamic calculation of entry, stop-loss, and target

\- AI-generated market insights

\- Formatted Telegram responses (Markdown)

\- Event-driven workflow using n8n

\- Docker-ready architecture



---



\## How It Works



Telegram → n8n → Market Data APIs → JavaScript Analysis → AI Model → Telegram



---



\## Tech Stack



\- n8n

\- JavaScript

\- Telegram Bot API

\- Market Data API

\- Google Gemini

\- Docker

\- Git \& GitHub



---



\## Repository Structure



n8n-telegram-ai-bot/

├── workflow.json

├── README.md

├── .gitignore

└── code/

&nbsp;   └── analysis.js



---



\## Security



\- API keys and credentials are not stored in the repository

\- Secrets are managed using environment variables

\- Runtime data is excluded via .gitignore



---



\## Disclaimer



This project is for educational purposes only and does not constitute financial advice.



---



\## Author



Alden Crasta  

GitHub: https://github.com/aldeninho



---



\## Status



Local development complete. Cloud deployment in progress.



