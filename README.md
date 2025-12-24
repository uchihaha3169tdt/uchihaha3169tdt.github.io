# 🚌 Hệ Thống Đặt Vé Xe Khách

Ứng dụng web đặt vé xe khách được xây dựng với React, Firebase và Tailwind CSS.

## 🚀 Bắt đầu nhanh

**Mới bắt đầu?** Đọc [Hướng dẫn nhanh (QUICKSTART.md)](QUICKSTART.md) - Chỉ 3 bước đơn giản để chạy và deploy!

---

## 📋 Mục Lục
- [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
- [Cài đặt và chạy local](#cài-đặt-và-chạy-local)
- [Build ứng dụng](#build-ứng-dụng)
- [Deploy lên server miễn phí](#deploy-lên-server-miễn-phí)
  - [GitHub Pages](#1-github-pages-miễn-phí)
  - [Vercel](#2-vercel-miễn-phí)
  - [Netlify](#3-netlify-miễn-phí)
  - [Render](#4-render-miễn-phí)
- [Cấu hình](#cấu-hình)

## 🔧 Yêu cầu hệ thống

- Node.js (phiên bản 14.x trở lên)
- npm hoặc yarn
- Git

## 🚀 Cài đặt và chạy local

### Bước 1: Clone repository

```bash
git clone https://github.com/uchihaha3169tdt/uchihaha3169tdt.github.io.git
cd uchihaha3169tdt.github.io
```

### Bước 2: Cài đặt dependencies

```bash
npm install
```

hoặc nếu bạn dùng yarn:

```bash
yarn install
```

### Bước 3: Chạy ứng dụng ở môi trường development

```bash
npm start
```

hoặc:

```bash
yarn start
```

Ứng dụng sẽ tự động mở tại địa chỉ [http://localhost:3000](http://localhost:3000)

## 🏗️ Build ứng dụng

Để build ứng dụng cho production:

```bash
npm run build
```

hoặc:

```bash
yarn build
```

Sau khi build xong, các file tĩnh sẽ được tạo trong thư mục `build/`. Bạn có thể deploy thư mục này lên bất kỳ web server nào.

### Test build local

Để test build local trước khi deploy:

```bash
# Cài đặt serve (chỉ cần làm 1 lần)
npm install -g serve

# Chạy build
serve -s build
```

## 🌐 Deploy lên server miễn phí

### 1. GitHub Pages (Miễn phí)

#### Cách 1: Tự động với GitHub Actions (Khuyên dùng)

Repository này đã được cấu hình GitHub Actions để tự động deploy. Mỗi khi bạn push code lên branch `main`, ứng dụng sẽ tự động được build và deploy lên GitHub Pages.

**Bước cài đặt:**

1. Vào repository trên GitHub
2. Vào **Settings** > **Pages**
3. Trong phần **Source**, chọn **GitHub Actions**
4. Push code lên branch `main`:

```bash
git add .
git commit -m "Update"
git push origin main
```

Ứng dụng sẽ tự động được deploy tại: `https://uchihaha3169tdt.github.io`

#### Cách 2: Deploy thủ công với gh-pages

```bash
# Cài đặt gh-pages
npm install --save-dev gh-pages

# Thêm scripts vào package.json
# "homepage": "https://uchihaha3169tdt.github.io",
# "predeploy": "npm run build",
# "deploy": "gh-pages -d build"

# Deploy
npm run deploy
```

### 2. Vercel (Miễn phí)

Vercel cung cấp hosting miễn phí với CI/CD tự động.

**Các bước:**

1. Tạo tài khoản tại [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Import repository từ GitHub
4. Vercel sẽ tự động detect React app
5. Click **"Deploy"**

**Hoặc dùng Vercel CLI:**

```bash
# Cài đặt Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel
```

URL: Vercel sẽ tự động tạo URL miễn phí (vd: `your-app.vercel.app`)

### 3. Netlify (Miễn phí)

Netlify cung cấp hosting tĩnh miễn phí với nhiều tính năng.

**Cách 1: Deploy từ Git**

1. Tạo tài khoản tại [netlify.com](https://netlify.com)
2. Click **"Add new site"** > **"Import an existing project"**
3. Chọn GitHub và chọn repository
4. Cấu hình build:
   - **Build command:** `npm run build`
   - **Publish directory:** `build`
5. Click **"Deploy"**

**Cách 2: Deploy với Netlify CLI**

```bash
# Cài đặt Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=build
```

URL: Netlify sẽ tạo URL miễn phí (vd: `your-app.netlify.app`)

### 4. Render (Miễn phí)

Render cung cấp hosting tĩnh miễn phí.

**Các bước:**

1. Tạo tài khoản tại [render.com](https://render.com)
2. Click **"New"** > **"Static Site"**
3. Connect GitHub repository
4. Cấu hình:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `build`
5. Click **"Create Static Site"**

URL: Render sẽ tạo URL miễn phí (vd: `your-app.onrender.com`)

## ⚙️ Cấu hình

### Cấu hình API Backend

File cấu hình API: `src/configs/env.js`

```javascript
const API_URL = 'http://57.155.219.49/';
const REACT_URL = 'http://localhost:3000/';
export { API_URL, REACT_URL };
```

**Lưu ý:** Khi deploy lên production, bạn cần cập nhật `REACT_URL` thành URL thực của website.

### Cấu hình Firebase

File cấu hình Firebase: `src/configs/firebase.js`

Ứng dụng sử dụng Firebase Storage để lưu trữ hình ảnh. Cấu hình Firebase đã được thiết lập sẵn.

### Cấu hình Custom Domain (Optional)

File `CNAME` chứa domain tùy chỉnh: `bink3169.me`

Nếu bạn có domain riêng và muốn sử dụng:

1. Cập nhật file `CNAME` với domain của bạn
2. Cấu hình DNS records tại nhà cung cấp domain:
   - Tạo CNAME record trỏ tới `uchihaha3169tdt.github.io`

## 🛠️ Công nghệ sử dụng

- **React** 18.3.1 - Frontend framework
- **React Router** 6.23.0 - Routing
- **Tailwind CSS** 3.4.3 - Styling
- **Firebase** 10.12.1 - Storage
- **Axios** 0.24.0 - HTTP client
- **ApexCharts** 4.7.0 - Charts
- **Day.js** 1.11.13 - Date manipulation
- **Flowbite** 2.3.0 - UI components

## 📝 Scripts có sẵn

```bash
npm start          # Chạy app ở chế độ development
npm run build      # Build app cho production
npm test           # Chạy tests
npm run eject      # Eject từ Create React App (không khuyến khích)
```

## 🐛 Troubleshooting

### Lỗi khi cài đặt dependencies

```bash
# Xóa node_modules và package-lock.json
rm -rf node_modules package-lock.json

# Cài lại
npm install
```

### Lỗi khi build

```bash
# Clear cache
npm run build -- --reset-cache
```

### Port 3000 đã được sử dụng

```bash
# Dùng port khác
PORT=3001 npm start
```

## 📞 Hỗ trợ

Nếu gặp vấn đề khi deploy, vui lòng tạo issue trên GitHub repository.

## 📄 License

Dự án này thuộc về tác giả repository.

---

**Chúc bạn deploy thành công! 🎉**