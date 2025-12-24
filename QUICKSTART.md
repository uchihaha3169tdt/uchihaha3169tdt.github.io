# 🚀 HƯỚNG DẪN NHANH - QUICK START

## Chạy ứng dụng ngay trên máy tính của bạn

### 1️⃣ Cài đặt Node.js (nếu chưa có)
- Tải và cài đặt Node.js từ: https://nodejs.org/
- Chọn phiên bản LTS (Long Term Support)
- Sau khi cài xong, mở Terminal/Command Prompt và chạy:
  ```bash
  node --version
  npm --version
  ```

### 2️⃣ Tải code về máy

**Cách 1: Dùng Git (khuyên dùng)**
```bash
git clone https://github.com/uchihaha3169tdt/uchihaha3169tdt.github.io.git
cd uchihaha3169tdt.github.io
```

**Cách 2: Tải ZIP**
1. Vào https://github.com/uchihaha3169tdt/uchihaha3169tdt.github.io
2. Click nút "Code" màu xanh
3. Chọn "Download ZIP"
4. Giải nén file ZIP
5. Mở Terminal/Command Prompt tại thư mục vừa giải nén

### 3️⃣ Cài đặt các thư viện cần thiết

```bash
npm install
```

Đợi khoảng 2-3 phút để npm tải và cài đặt tất cả dependencies.

### 4️⃣ Chạy ứng dụng

```bash
npm start
```

Trình duyệt sẽ tự động mở ứng dụng tại địa chỉ: http://localhost:3000

🎉 **Xong! Ứng dụng đang chạy trên máy của bạn!**

---

## Deploy lên server miễn phí - 3 CÁCH ĐƠN GIẢN NHẤT

### 🟢 CÁCH 1: GitHub Pages (Tự động - Dễ nhất)

**Chỉ cần làm 1 LẦN:**

1. **Bật GitHub Pages:**
   - Vào https://github.com/uchihaha3169tdt/uchihaha3169tdt.github.io/settings/pages
   - Trong phần "Build and deployment" > "Source", chọn **"GitHub Actions"**
   - Click **Save**

2. **Push code lên GitHub:**
   ```bash
   git add .
   git commit -m "Enable deployment"
   git push origin main
   ```

3. **Đợi 3-5 phút** - Vào tab "Actions" để xem tiến trình

4. **Xong!** Website của bạn sẽ có tại: **https://uchihaha3169tdt.github.io**

**Sau này mỗi khi bạn push code, website tự động cập nhật!**

---

### 🔵 CÁCH 2: Vercel (Nhanh nhất - 1 phút)

1. **Đăng ký Vercel:**
   - Vào https://vercel.com
   - Click "Sign Up" và đăng nhập bằng GitHub

2. **Import Project:**
   - Click "Add New..." > "Project"
   - Chọn repository `uchihaha3169tdt/uchihaha3169tdt.github.io`
   - Click "Import"

3. **Deploy:**
   - Để nguyên cấu hình mặc định
   - Click "Deploy"
   - Đợi 1-2 phút

4. **Xong!** Bạn sẽ có URL dạng: `https://your-app.vercel.app`

**Tính năng thêm:**
- Tự động deploy khi push code
- Tạo preview link cho mỗi Pull Request
- SSL miễn phí

---

### 🟣 CÁCH 3: Netlify (Nhiều tính năng)

1. **Đăng ký Netlify:**
   - Vào https://app.netlify.com
   - Click "Sign Up" và đăng nhập bằng GitHub

2. **Thêm site mới:**
   - Click "Add new site" > "Import an existing project"
   - Chọn "Deploy with GitHub"
   - Chọn repository `uchihaha3169tdt/uchihaha3169tdt.github.io`

3. **Cấu hình build:**
   - Build command: `npm run build`
   - Publish directory: `build`
   - Click "Deploy site"

4. **Đợi 2-3 phút**

5. **Xong!** Bạn sẽ có URL dạng: `https://random-name.netlify.app`

**Đổi tên domain:**
- Vào Site settings > Domain management
- Click "Options" > "Edit site name"
- Nhập tên mới (ví dụ: `bus-booking`)
- URL mới: `https://bus-booking.netlify.app`

---

## 📊 So sánh 3 cách

| Tiêu chí | GitHub Pages | Vercel | Netlify |
|----------|--------------|---------|---------|
| Tốc độ setup | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Tốc độ deploy | 3-5 phút | 1-2 phút | 2-3 phút |
| Tự động deploy | ✅ | ✅ | ✅ |
| Bandwidth | 100GB/tháng | Không giới hạn | 100GB/tháng |
| Custom domain | ✅ | ✅ | ✅ |

**Khuyên dùng:**
- **GitHub Pages**: Nếu bạn muốn mọi thứ ở một chỗ (GitHub)
- **Vercel**: Nếu bạn muốn deploy nhanh nhất
- **Netlify**: Nếu bạn muốn nhiều tính năng nhất

---

## ❓ Gặp vấn đề?

### Lỗi khi npm install
```bash
# Xóa và cài lại
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 bị chiếm
```bash
# Dùng port khác
PORT=3001 npm start
```

### Build bị lỗi
```bash
# Xóa cache và build lại
rm -rf build
npm run build
```

### Cần trợ giúp thêm?
- Đọc hướng dẫn chi tiết: [README.md](README.md)
- Đọc hướng dẫn deploy chi tiết: [DEPLOYMENT.md](DEPLOYMENT.md)
- Tạo issue trên GitHub: https://github.com/uchihaha3169tdt/uchihaha3169tdt.github.io/issues

---

## 📚 Tài liệu khác

- [README.md](README.md) - Hướng dẫn đầy đủ về dự án
- [DEPLOYMENT.md](DEPLOYMENT.md) - Hướng dẫn deploy chi tiết từng bước
- [package.json](package.json) - Cấu hình dự án và dependencies

---

**Chúc bạn thành công! 🎉**

Nếu hướng dẫn này hữu ích, hãy cho repo một ⭐ star trên GitHub!
