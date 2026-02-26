# Camjacking
CamJacking is an enterprise-grade security awareness training framework designed to simulate realistic phishing attacks targeting camera permissions and user awareness

<div align="center">
  
![Logo](https://github.com/Cappricio-Securities/camjacking/blob/main/images/camjacking.png?raw=true)
[![GitHub Stars](https://img.shields.io/github/stars/karthi-the-hacker/camjacking?style=for-the-badge&logo=github&color=00ff41&logoColor=white)](https://github.com/karthi-the-hacker/camjacking)
[![MIT License](https://img.shields.io/badge/License-MIT-00ff41?style=for-the-badge)](https://choosealicense.com/licenses/mit/)
[![npm version](https://img.shields.io/npm/v/camjacking?style=for-the-badge&color=00ff41)](https://www.npmjs.com/package/camjacking)
[![Node Version](https://img.shields.io/badge/Node.js-v14+-00ff41?style=for-the-badge&logo=node.js)](https://nodejs.org/)



</div>
<br>

## 🎯 What is CamJacking?

**CamJacking** is an enterprise-grade **security awareness training framework** designed to simulate realistic phishing attacks targeting camera permissions and user awareness. Built for ethical hackers, penetration testers, and security professionals, CamJacking enables organizations to:

✅ **Assess** employee awareness and susceptibility to social engineering  
✅ **Train** teams on camera security risks and best practices  
✅ **Simulate** realistic attack scenarios in controlled lab environments  
✅ **Measure** security posture with detailed analytics and reporting  
✅ **Educate** through hands-on, practical cybersecurity training  

> 🚨 **DISCLAIMER**: This tool is strictly for **authorized security training**, **educational purposes**, and **lab environments only**. Unauthorized use is **illegal** and **unethical**. Always obtain proper authorization before testing.

---

## 📌 Features

- 📸 **Camera Phishing**  Create realistic camera capture pages for security awareness and testing.
- 🖥️ **Admin Dashboard (GUI Panel)**  Manage campaigns, view logs, and monitor activity through a web-based interface.
- 🤖 **Telegram Bot Integration**  Receive real-time alerts and captured data directly on Telegram.
- 🔄 **Template Auto-Updating**  Automatically fetch and update phishing templates with the latest designs.
- 🗂️ **Campaign History & Logs**  View and manage previous campaigns with detailed activity records.
- 🌐 **Automatic Port Forwarding (Local → Internet)**  Expose local services to the internet automatically for testing and demos.

<br>

## ⚠️ Requirements

- GIT CLI
- Node JS
- npm
- cloudflared (CLI)
---

### ✅ Supported Platforms

| Platform        | Supported | Notes |
|-----------------|-----------|-------|
| **Debian / Kali / Ubuntu** | ✅ | Recommended for best compatibility |
| **macOS**       | ✅ | Works well with Homebrew setup |
| **Windows**     | ⚠️ Partial | Use WSL for best experience |

---

### 📦 Libraries Used

The project relies on the following Node.js packages:

- `axios` – HTTP client for API requests  
- `bcrypt` – Secure password hashing  
- `body-parser` – Parse incoming request bodies  
- `cors` – Cross-origin request handling  
- `crypto` – Cryptographic utilities  
- `dotenv` – Environment variable management  
- `express` – Web server framework  
- `form-data` – Multipart form handling  
- `jsonwebtoken` – JWT-based authentication  
- `lowdb` – Lightweight JSON database  
- `md5` – Legacy hashing (for compatibility)  
- `multer` – File upload handling  
- `uuid` – Unique ID generation  

> 💡 **Tip:** Make sure you’re running a recent **Node.js LTS version (v18 or later)** for best stability and security.



<br>

## ⚡Installation and Config

```bash
# Install globally
npm install camjacking -g
````

```bash
# Start the Camjacking tool
camjacking
```

* Open the Admin page: `https://cappriciosec.com/camjacking`
  👉 [Click here to open](https://cappriciosec.com/camjacking) and log in.

| Parameter  | Type     | Default Credentials   |
| :--------- | :------- | :-------------------- |
| `username` | `string` | `cappriciosec`        |
| `password` | `string` | `cappriciosec@hacker` |

> 🚨 **Note:**
> Before opening the webpage, make sure the **Camjacking tool is running locally**.
> This URL internally checks `http://localhost:5000` to verify whether the service is running.
>
> * If the local service is running, the **login page** will be displayed.
> * If it is not running, you will be **redirected to the landing page**.

After logging in with the default credentials, you can **update your username and password** from the Admin Dashboard.

<br>

## 🤖 Configure Telegram Bot

* Open Telegram and search for
  👉 [`@CappricioSecuritiesTools_bot`](https://web.telegram.org/k/#@CappricioSecuritiesTools_bot)

* Click **Start** or send `/start`, then tap the **Get Chat ID** button.
* Copy the **Chat ID** shown by the bot.
* Go back to the **Admin Dashboard** → Profile / Settings →
  Paste the Chat ID and **save** your profile.

> 💡 **Tip:** Once configured, you’ll receive real-time notifications and alerts from Camjacking directly in Telegram.



<br>


## 📝 Adding Custom Templates

When the Camjacking tool starts, it automatically clones the template repository from:  
`https://github.com/Cappricio-Securities/camjacking-templates`  
into the local directory: `~/camjacking-templates/`


If you already have custom templates in this folder, **they will not be deleted**.  
Your existing templates will be preserved, and newly updated templates from the repository will be added automatically.

---

### 📂 Template Structure

You can add your own custom templates by creating a new folder inside:

```
~/camjacking-templates/
```

Example structure:

```
camjacking-templates/
├── your-template-name/
│   ├── index.html
│   └── index.css
```

---
You can find the complete setup instructions in this repository: `https://github.com/Cappricio-Securities/camjacking-templates`  👉 [`Clickme`](https://github.com/Cappricio-Securities/camjacking-templates)
### ⚠️ Naming Rules

- Template folder names **must not contain spaces or special characters**.  
- Only the following characters are supported:  
  `A–Z`, `a–z`, `0–9`, `_` (underscore), `-` (hyphen)
- Do **not** use the same name for multiple templates.

---

### ⚙️ How Templates Work

- The server automatically loads the correct template based on user input or the default configuration.
- You **do not need to write any extra code** to access the camera or collect data.  
- Camjacking dynamically injects the required camera access logic into your templates and automatically handles routing to receive captured images.

> 💡 **Tip:** Focus only on the HTML/CSS design of your template. The tool handles camera access and data collection for you.






## ⚡ Quick Start

To start a new campaign, simply run:

```bash
camjacking
````

You will be greeted with the main menu:

```bash
┌──(Hacker@linux)-[~]
└─$ camjacking
                                                                         v2.0

 ██████╗ █████╗ ███╗   ███╗     ██╗ █████╗  ██████╗██╗  ██╗██╗███╗   ██╗ ██████╗
██╔════╝██╔══██╗████╗ ████║     ██║██╔══██╗██╔════╝██║ ██╔╝██║████╗  ██║██╔════╝
██║     ███████║██╔████╔██║     ██║███████║██║     █████╔╝ ██║██╔██╗ ██║██║  ███╗
██║     ██╔══██║██║╚██╔╝██║██   ██║██╔══██║██║     ██╔═██╗ ██║██║╚██╗██║██║   ██║
╚██████╗██║  ██║██║ ╚═╝ ██║╚█████╔╝██║  ██║╚██████╗██║  ██╗██║██║ ╚████║╚██████╔╝
 ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝ ╚════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝
                                                         Author: @karthithehacker
                                                         Website: karthithehacker.com

            Main Menu
┏━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ No. ┃ Option                   ┃
┡━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━┩
│ 1   │🎯 Create new Target      │
│ 2   │📂 Select Existing Target │
│ 0   │❌ Quit                   │
└─────┴──────────────────────────┘

👉 Select an option: 1
👉 Enter target name: Bob
```

### 🧭 Step 1: Create a New Target

* Choose option **`1` – Create New Target**
* Enter a name for your target (e.g., `Bob`)

---

### 🎨 Step 2: Select a Template

After creating a target, you will be prompted to choose a phishing template:

```bash
                                                                         v2.0

 ██████╗ █████╗ ███╗   ███╗     ██╗ █████╗  ██████╗██╗  ██╗██╗███╗   ██╗ ██████╗
██╔════╝██╔══██╗████╗ ████║     ██║██╔══██╗██╔════╝██║ ██╔╝██║████╗  ██║██╔════╝
██║     ███████║██╔████╔██║     ██║███████║██║     █████╔╝ ██║██╔██╗ ██║██║  ███╗
██║     ██╔══██║██║╚██╔╝██║██   ██║██╔══██║██║     ██╔═██╗ ██║██║╚██╗██║██║   ██║
╚██████╗██║  ██║██║ ╚═╝ ██║╚█████╔╝██║  ██║╚██████╗██║  ██╗██║██║ ╚████║╚██████╔╝
 ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝ ╚════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝
                                                         Author: @karthithehacker
                                                         Website: karthithehacker.com


       Select Template
┏━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━┓
┃ No. ┃ Templates             ┃
┡━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━┩
│ 1   │ GoogleMeet            │
│ 2   │ TikTok                │
│ 3   │ instagram             │
│ 4   │ instagramCamera       │
│ 5   │ instagram_videocall   │
│ 6   │ telegramCamera        │
│ x   │ Previous Menu         │
│ 0   │ ❌ Quit               │
└─────┴───────────────────────┘

👉 Select a template: 3
Starting server ⠸
```

* Select the template number you want to use (e.g., `3` for Instagram).
* Once selected, the phishing server will start automatically.

---

### 🚀 Step 3: Server Started

After the server starts, you will see output similar to the following:

```bash
                                                                         v2.0

 ██████╗ █████╗ ███╗   ███╗     ██╗ █████╗  ██████╗██╗  ██╗██╗███╗   ██╗ ██████╗
██╔════╝██╔══██╗████╗ ████║     ██║██╔══██╗██╔════╝██║ ██╔╝██║████╗  ██║██╔════╝
██║     ███████║██╔████╔██║     ██║███████║██║     █████╔╝ ██║██╔██╗ ██║██║  ███╗
██║     ██╔══██║██║╚██╔╝██║██   ██║██╔══██║██║     ██╔═██╗ ██║██║╚██╗██║██║   ██║
╚██████╗██║  ██║██║ ╚═╝ ██║╚█████╔╝██║  ██║╚██████╗██║  ██╗██║██║ ╚████║╚██████╔╝
 ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝ ╚════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝
                                                         Author: @karthithehacker
                                                         Website: karthithehacker.com

[+] New Target Created: Bob
[+] Bob UUID: 8ad78792-827e-43c0-b36e-4397c0b96e88
[+] Template selected: instagram
[+] Admin page URL: https://cappriciosec.com/camjacking/
[+] Camjacking server running at: http://localhost:8080/?uuid=8ad78792-827e-43c0-b36e-4397c0b96e88
[+] Camjacking server Target URL: https://convert-findings-founder-abroad.trycloudflare.com?uuid=8ad78792-827e-43c0-b36e-4397c0b96e88
[+] Serving files from: /home/Hacker/camjacking-templates/instagram
[+] Created At: 2026-02-25 01:11:11

[+] Enter x to stop the server
[✓] Server running on port 8080
```

* **Local URL:** Used for local testing
* **Public URL:** Share this link with the target
* **Admin Panel:** Monitor logs and captured data from the web dashboard

---

### 📸 Step 4: Capture Logs & Media

When a user opens the target URL, activity will be logged automatically:

```bash
[+] User opened url /?uuid=03ed244c-c5d3-496d-becd-99ad13c00778
[+] IP Address: ███████████████████
[+] User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36
[+] Log Timestamp: 2026-02-24T19:44:21.751Z
[+] Saved file: /home/Hacker/camjacking-photos/8ad78792-827e-43c0-b36e-4397c0b96e88/1771962261751.jpg
```

* Captured images are saved under:

```bash
~/camjacking-photos/<TARGET-UUID>/
```

* All logs and media can also be viewed in the **Admin Dashboard**.

---

### ⛔ Stopping the Server

To stop the running server at any time: `x`


---

## 🔮 Planned Features

> Coming Soon:

* AI integration for webcloing and prompt to template designing

---

## 🎯 Our Mission

Our mission is to make **cybersecurity simple, accessible, and easy for everyone**.

We believe that while experienced hackers and security professionals may love the command line, **powerful tools shouldn’t be limited to complex commands and scripts**. Our goal is to build cybersecurity tools that are:

- ✅ Easy to install  
- 🧭 Simple to navigate  
- 🔢 Menu-driven (numeric options instead of hard commands)  
- 🖥️ Friendly for beginners with a clean GUI  
- 🎓 Designed to help learners understand cybersecurity concepts easily  

We aim to bridge the gap between **beginners and professionals** by creating tools that combine the **power of CLI** with the **simplicity of modern user interfaces**, making cybersecurity learning and practice more approachable for everyone.

> 💡 *“Cybersecurity should be powerful, but it should also be simple.”*


## 👨‍💻 Authors

**KarthiTheHacker**  
- 🌐 Website: [karthithehacker.com](https://karthithehacker.com)  
- 🐙 GitHub: [@karthi-the-hacker](https://github.com/karthi-the-hacker)  
- 🛠️ Contributions: Core CLI, database layer, APIs, authentication, and core backend logic  

**Akash K**  
- 🐙 GitHub: [@Ak4sh2523](https://github.com/Ak4sh2523)  
- 💼 LinkedIn: [Akash K](https://www.linkedin.com/in/akash-k-83223b224/)  
- 🎨 Contributions: GUI/UI design, phishing templates, and Admin Dashboard frontend  


<hr />

<p align="center">
<  <em>Built by hackers who care about security — Team Cappricio Securities.</em> /><br/> 
  <a href="https://www.cappriciosec.com">www.cappriciosec.com</a>
</p>



