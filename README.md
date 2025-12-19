# 👥 Employee Management App

A modern, responsive employee management application built with Angular that provides comprehensive employee data management with a beautiful and intuitive interface.

## ✨ Features

- 👤 **Employee Management** - Create, read, update, and delete employee records
- 📱 **Fully Responsive** - Perfect experience on desktop, tablet, and mobile devices
- 🎨 **Beautiful UI** - Clean and modern interface with PrimeNG components
- 📊 **Detailed Information** - Employee profiles with complete information
- 🔍 **Search & Filter** - Easily search and filter employee data
- ⚡ **Fast Performance** - Optimized with Angular for lightning-fast load times
- 🎯 **Clean Architecture** - Well-structured code with separation of concerns

## 📸 Screenshots

### Desktop View
Sign In Page
<img width="983" height="631" alt="image" src="https://github.com/user-attachments/assets/b4dc7943-cf65-46ed-b056-4b47ab14e2fd" />

Dashboard Page
<img width="1462" height="394" alt="image" src="https://github.com/user-attachments/assets/e3839195-e0ce-40d2-95dc-f4976f6dd146" />

Employee List Page
<img width="1470" height="410" alt="image" src="https://github.com/user-attachments/assets/36d56046-b872-4a26-a977-98a714eca591" />

Employee Create Page
<img width="1470" height="729" alt="image" src="https://github.com/user-attachments/assets/19a7c522-bc23-4c62-8dcc-ddb09ce4e5c7" />

Employee Detail page
<img width="1470" height="627" alt="image" src="https://github.com/user-attachments/assets/57c8a11a-cbde-456d-bd05-e966b6c46e9b" />

## 🛠️ Tech Stack

- **Framework:** [Angular 20](https://angular.dev/) - Modern web framework
- **Language:** [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **UI Library:** [PrimeNG](https://primeng.org/) - Rich UI components for Angular
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + SCSS - Modern styling approach
- **Testing:** [Vitest](https://vitest.dev/) - Fast unit test framework
- **Package Manager:** [pnpm](https://pnpm.io/) - Fast, disk space efficient
- **Architecture:** Clean Architecture with MVVM pattern

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/leonaldopasaribu/employee-management-app.git
   cd employee-management-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   ng serve
   # or
   pnpm start
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:4200](http://localhost:4200) to see the application.

## 🧪 Testing

Run the test suite:

```bash
ng test
# or
pnpm test
```

## 📝 Development

The application uses:
- **Clean Architecture** - Separation of concerns with entities, repositories, and use cases (Reference https://medium.com/@leonaldopasaribu/front-end-architecture-with-angular-74ffa922ca8f)
- **MVVM Pattern** - View Models for presentation logic
- **Signal Store** - State management with Angular signals
- **TypeScript** - Full type safety across the codebase
- **Vitest** - Unit and integration testing
- **ESLint & Prettier** - Code quality and consistency

### Project Structure

```
src/
├── app/
│   ├── core/           # Core business logic (entities, repositories)
│   ├── data/           # Data layer (DTOs, mappers, implementations)
│   ├── layout/         # Layout components (sidebar, topbar, menu)
│   ├── presentations/  # Feature modules (employee, dashboard, sign-in)
│   └── shared/         # Shared utilities, pipes, and services
├── assets/             # Static assets and styles
└── environments/       # Environment configurations
```

## 🏗️ Building

To build the project for production:

```bash
ng build
# or
pnpm build
```

The build artifacts will be stored in the `dist/` directory.

## 🌐 Deployment

The application can be deployed to various platforms:

- **Vercel** - Zero-config deployment
- **Netlify** - Easy Angular deployment
- **Firebase Hosting** - Google's hosting solution
- **AWS S3 + CloudFront** - Scalable static hosting

## 📚 Learn More

To learn more about the technologies used in this project:

- [Angular Documentation](https://angular.dev/overview) - Learn about Angular features and API
- [PrimeNG Documentation](https://primeng.org/) - UI component library
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript documentation

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Leonaldo Pasaribu**

- GitHub: [@leonaldopasaribu](https://github.com/leonaldopasaribu)
- LinkedIn: [Leonaldo Pasaribu](https://linkedin.com/in/leonaldo-pasaribu)

---

<div align="center">
  Made with ❤️ using Angular
</div>
