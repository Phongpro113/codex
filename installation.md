# Hướng dẫn chạy dự án sau khi clone từ Git
// https://github.com/Phongpro113/codex.git
// git@github.com:Phongpro113/codex.git
Tài liệu này mô tả các bước chuẩn để cài đặt và chạy ứng dụng Next.js **codex** trên máy local.

## Yêu cầu trước khi bắt đầu

- **Node.js** phiên bản **20** trở lên (khuyến nghị bản LTS mới nhất).
- **npm** (đi kèm Node; dự án dùng `package-lock.json`).
- **PostgreSQL** có thể truy cập được (local hoặc dịch vụ cloud).

## 1. Clone repository

```bash
git clone <URL-repository-của-bạn>.git
cd codex
```

Thay `<URL-repository-của-bạn>` bằng URL thật của remote (HTTPS hoặc SSH).

## 2. Cài dependency

```bash
npm install
```

Lệnh `postinstall` sẽ tự chạy `prisma generate` để tạo Prisma Client.

## 3. Cấu hình biến môi trường

Tạo file **`.env`** ở thư mục gốc dự án (cùng cấp với `package.json`) với nội dung tối thiểu:

```env
# Chuỗi kết nối PostgreSQL (ứng dụng Next.js dùng biến này)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# Chuỗi kết nối cho migration Prisma (trong repo dùng DIRECT_URL trong prisma.config.ts)
# Với Postgres local, thường có thể đặt giống DATABASE_URL.
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

- Thay `USER`, `PASSWORD`, `HOST`, `PORT`, `DATABASE` bằng thông tin thật của bạn.
- Nếu dùng nhà cung cấp có **connection pooling** (ví dụ Neon), thường `DATABASE_URL` là URL pooled còn `DIRECT_URL` là URL trực tiếp (non-pooled) để chạy migration.

### Biến tùy chọn (API redeem)

Các API redeem có thể dùng URL và số lần thử mặc định; chỉ cần thêm vào `.env` nếu bạn muốn ghi đè:

```env
OPENCODEX_REDEEM_ACTIVATE_URL="https://opencodex.plus/api/redeem/activate"
OPENCODEX_ACTIVATE_MAX_RETRIES="30"
```

## 4. Áp dụng migration cơ sở dữ liệu

Sau khi PostgreSQL đã chạy và `DATABASE_URL` / `DIRECT_URL` đúng:

```bash
npx prisma migrate deploy
```

Lệnh này tạo/ cập nhật bảng theo thư mục `prisma/migrations`. Khi **phát triển** schema mới, có thể dùng `npx prisma migrate dev` thay cho `deploy`.

## 5. Chạy server phát triển

```bash
npm run dev
```

Mở trình duyệt tại [http://localhost:3000](http://localhost:3000).

## 6. Các lệnh hữu ích khác

| Lệnh | Mô tả |
|------|--------|
| `npm run build` | Build production |
| `npm start` | Chạy bản build (chạy sau `npm run build`) |
| `npm run lint` | Chạy ESLint |
| `npm run clean` | Xóa thư mục `.next` |

## Xử lý sự cố thường gặp

- **`DATABASE_URL is not set`**: Kiểm tra file `.env` ở đúng thư mục gốc và tên biến chính xác.
- **Lỗi kết nối Postgres**: Kiểm tra firewall, Postgres đã listen đúng host/port, user có quyền trên database.
- **Migration thất bại**: Xác nhận `DIRECT_URL` trỏ tới instance cho phép DDL (một số URL pooled không dùng được cho migration).

---

Nếu repository có thêm quy ước riêng (branch mặc định, biến môi trường bắt buộc khác), hãy bổ sung vào file này hoặc vào `README.md` cho đồng bộ với team.
