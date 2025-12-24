# 📚 HƯỚNG DẪN DEPLOY CHI TIẾT

## Mục lục
1. [Chuẩn bị trước khi deploy](#1-chuẩn-bị-trước-khi-deploy)
2. [Deploy lên GitHub Pages (Khuyên dùng)](#2-deploy-lên-github-pages)
3. [Deploy lên Vercel](#3-deploy-lên-vercel)
4. [Deploy lên Netlify](#4-deploy-lên-netlify)
5. [Deploy lên Render](#5-deploy-lên-render)
6. [So sánh các platform](#6-so-sánh-các-platform)

---

## 1. Chuẩn bị trước khi deploy

### Kiểm tra ứng dụng hoạt động local

```bash
# Clone repository (nếu chưa có)
git clone https://github.com/uchihaha3169tdt/uchihaha3169tdt.github.io.git
cd uchihaha3169tdt.github.io

# Cài đặt dependencies
npm install

# Chạy ứng dụng
npm start
```

Mở trình duyệt và truy cập http://localhost:3000 để kiểm tra.

### Test build production

```bash
# Build ứng dụng
npm run build

# Test build (cài serve nếu chưa có)
npx serve -s build
```

Truy cập http://localhost:3000 (hoặc port khác mà serve hiển thị) để kiểm tra build.

---

## 2. Deploy lên GitHub Pages

### ✅ Ưu điểm:
- **Miễn phí hoàn toàn**
- Tích hợp sẵn với GitHub
- Tự động deploy khi push code
- Domain dạng: `username.github.io`

### 📝 Các bước thực hiện:

#### Bước 1: Kích hoạt GitHub Pages

1. Vào repository trên GitHub: https://github.com/uchihaha3169tdt/uchihaha3169tdt.github.io
2. Click tab **Settings**
3. Trong menu bên trái, click **Pages**
4. Trong phần **Source**, chọn **GitHub Actions**

#### Bước 2: Push code để trigger deployment

Workflow đã được cấu hình sẵn trong `.github/workflows/deploy.yml`. Chỉ cần push code:

```bash
git add .
git commit -m "Enable GitHub Pages deployment"
git push origin main
```

#### Bước 3: Theo dõi deployment

1. Vào tab **Actions** trên GitHub repository
2. Bạn sẽ thấy workflow "Deploy to GitHub Pages" đang chạy
3. Đợi khoảng 2-5 phút để build và deploy hoàn tất
4. Sau khi xong, truy cập: https://uchihaha3169tdt.github.io

### 🔧 Cấu hình Custom Domain (Optional)

Nếu bạn có domain riêng (như `bink3169.me` trong CNAME):

1. Vào **Settings** > **Pages**
2. Trong phần **Custom domain**, nhập domain của bạn
3. Click **Save**
4. Cấu hình DNS tại nhà cung cấp domain:
   - Thêm CNAME record trỏ tới: `uchihaha3169tdt.github.io`

---

## 3. Deploy lên Vercel

### ✅ Ưu điểm:
- Miễn phí với bandwidth không giới hạn
- Deploy cực nhanh (< 1 phút)
- Tự động preview cho mỗi Pull Request
- SSL miễn phí
- Domain dạng: `your-app.vercel.app`

### 📝 Các bước thực hiện:

#### Phương pháp 1: Deploy từ giao diện web (Dễ nhất)

1. Truy cập https://vercel.com
2. Click **Sign Up** hoặc **Log In** (đăng nhập bằng GitHub)
3. Sau khi đăng nhập, click **Add New** > **Project**
4. Click **Import Git Repository**
5. Chọn repository: `uchihaha3169tdt/uchihaha3169tdt.github.io`
6. Vercel sẽ tự động phát hiện React app
7. Để nguyên cấu hình mặc định:
   - Framework Preset: **Create React App**
   - Build Command: `npm run build`
   - Output Directory: `build`
8. Click **Deploy**
9. Đợi 1-2 phút, Vercel sẽ build và deploy
10. Bạn sẽ nhận được URL dạng: `https://uchihaha3169tdt.vercel.app`

#### Phương pháp 2: Deploy với Vercel CLI

```bash
# Cài đặt Vercel CLI
npm install -g vercel

# Đăng nhập
vercel login

# Deploy (chạy trong thư mục project)
vercel

# Làm theo hướng dẫn:
# - Set up and deploy? Y
# - Which scope? [chọn account của bạn]
# - Link to existing project? N
# - What's your project's name? [nhập tên hoặc Enter để dùng mặc định]
# - In which directory is your code located? ./
# - Want to override the settings? N

# Deploy lên production
vercel --prod
```

### 🔄 Tự động deploy khi push code

Sau lần deploy đầu tiên, Vercel sẽ tự động:
- Deploy mỗi khi bạn push lên branch `main`
- Tạo preview deployment cho mỗi Pull Request

---

## 4. Deploy lên Netlify

### ✅ Ưu điểm:
- Miễn phí với 100GB bandwidth/tháng
- Có form handling, functions, identity
- Deploy nhanh
- SSL miễn phí
- Domain dạng: `your-app.netlify.app`

### 📝 Các bước thực hiện:

#### Phương pháp 1: Deploy từ giao diện web

1. Truy cập https://app.netlify.com
2. Click **Sign Up** hoặc **Log In** (đăng nhập bằng GitHub)
3. Click **Add new site** > **Import an existing project**
4. Click **Deploy with GitHub**
5. Authorize Netlify truy cập GitHub của bạn
6. Chọn repository: `uchihaha3169tdt/uchihaha3169tdt.github.io`
7. Cấu hình build settings:
   - Branch to deploy: `main`
   - Build command: `npm run build`
   - Publish directory: `build`
8. Click **Deploy site**
9. Đợi 2-3 phút để deploy
10. Bạn sẽ nhận được URL dạng: `https://random-name.netlify.app`

#### Đổi tên domain trên Netlify

1. Vào **Site settings** > **Domain management**
2. Click **Options** > **Edit site name**
3. Nhập tên mới (ví dụ: `bus-ticket-booking`)
4. URL mới: `https://bus-ticket-booking.netlify.app`

#### Phương pháp 2: Deploy với Netlify CLI

```bash
# Cài đặt Netlify CLI
npm install -g netlify-cli

# Đăng nhập
netlify login

# Build ứng dụng
npm run build

# Deploy
netlify deploy --prod --dir=build

# Làm theo hướng dẫn:
# - Create & configure a new site? Y
# - Team: [chọn team của bạn]
# - Site name: [nhập tên hoặc để trống]
# - Publish directory: build
```

### 🔄 Tự động deploy

Netlify sẽ tự động deploy khi bạn push code lên branch `main`.

---

## 5. Deploy lên Render

### ✅ Ưu điểm:
- Miễn phí cho static sites
- 100GB bandwidth/tháng
- SSL tự động
- Domain dạng: `your-app.onrender.com`

### 📝 Các bước thực hiện:

1. Truy cập https://render.com
2. Click **Get Started** hoặc **Sign In** (đăng nhập bằng GitHub)
3. Sau khi đăng nhập, click **New** > **Static Site**
4. Click **Connect a repository**
5. Authorize Render truy cập GitHub
6. Chọn repository: `uchihaha3169tdt/uchihaha3169tdt.github.io`
7. Cấu hình:
   - Name: `bus-ticket-booking` (hoặc tên bạn muốn)
   - Branch: `main`
   - Build Command: `npm run build`
   - Publish Directory: `build`
8. Click **Create Static Site**
9. Đợi 3-5 phút để deploy
10. Bạn sẽ nhận được URL dạng: `https://bus-ticket-booking.onrender.com`

### 🔄 Tự động deploy

Render sẽ tự động deploy khi bạn push code lên branch `main`.

---

## 6. So sánh các platform

| Tính năng | GitHub Pages | Vercel | Netlify | Render |
|-----------|--------------|---------|---------|--------|
| **Giá** | Miễn phí | Miễn phí | Miễn phí | Miễn phí |
| **Bandwidth** | 100GB/tháng | Unlimited | 100GB/tháng | 100GB/tháng |
| **Build time** | 3-5 phút | 1-2 phút | 2-3 phút | 3-5 phút |
| **SSL** | ✅ | ✅ | ✅ | ✅ |
| **Custom Domain** | ✅ | ✅ | ✅ | ✅ |
| **Auto Deploy** | ✅ | ✅ | ✅ | ✅ |
| **Preview Deploys** | ❌ | ✅ | ✅ | ✅ |
| **Easy Setup** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

### 🎯 Khuyến nghị:

1. **GitHub Pages**: Tốt nhất nếu bạn muốn giữ mọi thứ trên GitHub
2. **Vercel**: Tốt nhất về tốc độ và tính năng (khuyên dùng)
3. **Netlify**: Tốt nhất nếu cần form handling và functions
4. **Render**: Thay thế tốt, dễ dùng

---

## 🔍 Troubleshooting

### Lỗi build trên các platform

**Vấn đề**: Build failed with "out of memory"

**Giải pháp**:
```bash
# Thêm vào package.json > scripts
"build": "react-scripts --max_old_space_size=4096 build"
```

### Lỗi 404 khi refresh trang

**Vấn đề**: Khi refresh trang trên các route, bị lỗi 404

**Giải pháp**:

- **Vercel**: Tạo file `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

- **Netlify**: Tạo file `public/_redirects`:
```
/*    /index.html   200
```

### Environment Variables

Nếu cần thêm biến môi trường:

- **GitHub Pages**: Thêm vào workflow file
- **Vercel**: Settings > Environment Variables
- **Netlify**: Site settings > Build & deploy > Environment
- **Render**: Environment > Environment Variables

---

## 📞 Cần trợ giúp?

Nếu gặp vấn đề, hãy:
1. Kiểm tra logs trên platform
2. Đọc lại hướng dẫn
3. Tạo issue trên GitHub repository

**Chúc bạn deploy thành công! 🚀**
