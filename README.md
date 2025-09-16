<div align="center">

#  Portfolio

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=22&duration=3000&pause=1000&color=6366F1&center=true&vCenter=true&width=435&lines=Full+Stack+Developer;React+%26+TypeScript+Expert;UI%2FUX+Enthusiast;Always+Learning+%F0%9F%92%A1" alt="Typing SVG" />

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.11-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="700">

</div>

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎨 **Modern UI/UX**
- **Responsive Design** - Looks great on all devices
- **Dark/Light Theme** - Toggle between themes
- **Smooth Animations** - Framer Motion powered
- **Interactive Elements** - Engaging user experience
- **AI Chat Interface** - Interactive AI assistant with multiple models

</td>
<td width="50%">

### ⚡ **Performance**
- **Lightning Fast** - Vite build system
- **Optimized Bundle** - Code splitting & lazy loading
- **SEO Friendly** - Meta tags and structured data
- **Accessibility** - WCAG compliant components

</td>
</tr>
</table>

## 🛠️ Tech Stack

<div align="center">

| Frontend | Styling | Tools | Libraries |
|----------|---------|-------|-----------|
| ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=white) | ![Tailwind](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) | ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | ![Framer Motion](https://img.shields.io/badge/-Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white) |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | ![Radix UI](https://img.shields.io/badge/-Radix_UI-161618?style=flat-square&logo=radix-ui&logoColor=white) | ![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white) | ![React Query](https://img.shields.io/badge/-React_Query-FF4154?style=flat-square&logo=react-query&logoColor=white) |

</div>## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/raazi29/portfolio.git

# Navigate to project directory
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212284087-bbe7e430-757e-4901-90bf-4cd2ce3e1852.gif" width="100">
</div>

## 📁 Project Structure

```
portfolio/
├── 📁 public/              # Static assets
├── 📁 src/
│   ├── 📁 components/      # Reusable UI components
│   │   ├── 🎨 ui/         # Shadcn/ui components
│   │   ├── 🏠 Hero.tsx    # Hero section
│   │   ├── 👤 About.tsx   # About section
│   │   ├── 💼 Projects.tsx # Projects showcase
│   │   └── 📞 Contact.tsx # Contact form
│   │   ├── 🤖 AIChatbot.tsx # AI Chatbot button component
│   ├── 📁 pages/          # Route components
│   │   ├── 🤖 AIChat.tsx  # AI Chat page component
│   │   └── 📞 Contact.tsx # Contact form
│   ├── 📁 contexts/       # React contexts
│   ├── 📁 lib/           # Utility functions
│   └── 📄 App.tsx        # Main app component
├── 📄 package.json       # Dependencies
└── 📄 README.md          # You are here!
```

## 🎯 Key Components

<details>
<summary><b>🏠 Hero Section</b></summary>

- Animated typing effect
- Particle background
- Call-to-action buttons
- Responsive design

</details>

<details>
<summary><b>👤 About Section</b></summary>

- Personal introduction
- Skills showcase
- Interactive elements
- Professional timeline

</details>

<details>
<summary><b>💼 Projects Section</b></summary>

- Project cards with hover effects
- Technology tags
- Live demo links
- GitHub repository links

</details>

<details>
<summary><b>📞 Contact Section</b></summary>

- Contact form with validation
- EmailJS integration
- Social media links
- Interactive animations

</details>

<details>
<summary><b>🤖 AI Chat Interface</b></summary>

- **Multi-Model Support** - Choose from 40+ AI models including vision models
- **Image Analysis** - Analyze uploaded images with vision-enabled models
- **Code Highlighting** - Automatic syntax highlighting for code blocks
- **Streaming Responses** - Real-time response generation with typing indicators
- **Conversation History** - Save and revisit previous conversations
- **Model Switching** - Easily switch between different AI models
- **File Attachments** - Upload images, PDFs, and text files for analysis
- **Session Management** - Create and manage multiple chat sessions
- **Advanced Modes** - Deep thinking, web search, and creative modes
- **Responsive Design** - Works seamlessly on all device sizes

</details>##
 🎨 Customization

### Theme Configuration
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        // Add your custom colors
      }
    }
  }
}
```

### Animation Settings
```typescript
// framer-motion variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}
```

## 📱 Responsive Design

<div align="center">

| Device | Breakpoint | Status |
|--------|------------|--------|
| 📱 Mobile | < 768px | ✅ Optimized |
| 📟 Tablet | 768px - 1024px | ✅ Optimized |
| 💻 Desktop | > 1024px | ✅ Optimized |
| 🖥️ Large Screen | > 1440px | ✅ Optimized |

</div>

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build in development mode
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🌟 Features Showcase

<div align="center">

### 🎭 **Animations**
Smooth transitions and micro-interactions powered by Framer Motion

### 🎨 **Modern Design**
Clean, professional design with attention to detail

### ⚡ **Performance**
Optimized for speed with lazy loading and code splitting

### 📱 **Mobile First**
Responsive design that works on all devices

### 🤖 **AI Chat Interface**
Interactive AI assistant with multi-model support and advanced features

</div>## 🤝
 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide React](https://lucide.dev/) for the icon library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

<div align="center">

### 💫 **Made with ❤️ by [Raazi](https://github.com/raazi29)**

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="100">

**⭐ Star this repo if you like it!**

</div>