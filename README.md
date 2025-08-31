# Healthcare System Web Application

A modern, responsive healthcare management system built with React, TypeScript, and Tailwind CSS. This application provides comprehensive healthcare management features including patient management, appointment booking, medical records, and administrative tools.

**🚀 Deployment Status: Active and Ready for GitHub Pages**

## 🚀 Features

- **Patient Management**: Complete patient profiles and medical history
- **Appointment Booking**: Easy appointment scheduling system
- **Medical Records**: Secure medical record management
- **Doctor Dashboard**: Comprehensive doctor interface
- **Admin Panel**: Administrative tools and user management
- **Responsive Design**: Mobile-first, modern UI/UX
- **TypeScript**: Full type safety and better development experience

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Radix UI Components
- **Build Tool**: Vite
- **State Management**: React Hooks
- **Forms**: React Hook Form
- **Charts**: Recharts
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

## 🚀 Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/kenjilugatiman16-rgb/HEALTHCARE123.git
   cd HEALTHCARE123
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🌐 Deployment

### GitHub Pages (Recommended)

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

#### Setup Steps:

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**

3. **Automatic Deployment**
   - The GitHub Actions workflow will automatically build and deploy your app
   - Every push to `main` branch triggers a new deployment
   - Your app will be available at: `https://kenjilugatiman16-rgb.github.io/HEALTHCARE123/`

#### Manual Deployment

If you prefer manual deployment:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   - Go to repository **Settings** → **Pages**
   - Select **GitHub Actions** as the source
   - The deployment will happen automatically on every push to `main` branch

### Other Deployment Options

#### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on every push

#### Vercel
1. Import your GitHub repository to Vercel
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy automatically on every push

## 📁 Project Structure

```
HEALTHCARE123/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── AdminPanel.tsx  # Admin interface
│   │   ├── Homepage.tsx    # Landing page
│   │   └── ...             # Other components
│   ├── styles/             # Global styles
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── .github/                 # GitHub Actions workflows
├── public/                  # Static assets
├── dist/                    # Build output (generated)
├── package.json             # Dependencies and scripts
├── vite.config.ts          # Vite configuration
└── README.md               # This file
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url_here
VITE_APP_NAME=Healthcare System
```

### Vite Configuration

The project uses Vite with the following key configurations:
- React SWC plugin for fast refresh
- TypeScript support
- Path aliases for clean imports
- Optimized build settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/kenjilugatiman16-rgb/HEALTHCARE123/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

## 🚀 Quick Deploy

**Current Status**: The application is configured to deploy automatically via GitHub Actions. Each push to the `main` branch triggers a new deployment. Last updated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')

To get this running quickly:

1. **Fork this repository**
2. **Enable GitHub Pages** in repository settings
3. **Push any change** to trigger the first deployment
4. **Your app will be live** in a few minutes!

---

**Note**: Remember to update the repository URL in `vite.config.ts` if you change the repository name from `HEALTHCARE123`.
  