# Deployment Guide: GitHub & Vercel

Follow this step-by-step guide to push your code and deploy the application.

### 📋 Prerequisites Checklist
- [ ] A GitHub account.
- [ ] A Vercel account.
- [ ] A cloud database account (Neon.tech or Supabase).

---

### 🚀 Phase 1: GitHub Setup
Run these commands in your project root directory:

**1. Initialize Git & First Commit**
```bash
git init
git add .
git commit -m "Initial commit for IMS"
```

**2. Push to GitHub**
1. Go to [github.com/new](https://github.com/new) and create a repository named `Institute_Management_system`.
2. Copy the repository URL (e.g., `https://github.com/username/repo.git`).
3. Run these commands:
```bash
git remote add origin <YOUR_REPO_URL>
git branch -M main
git push -u origin main
```

---

### ☁️ Phase 2: Cloud Database Setup
Vercel cannot run your local Docker database.
1. Sign up at [Neon.tech](https://neon.tech) (recommended for Postgres).
2. Create a new project/database.
3. Copy the **Connection String** (it starts with `postgres://...`).
4. Keep this string ready for the backend deployment.

---

### 🎨 Phase 3: Vercel Deployment (Frontend)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard) -> **Add New** -> **Project**.
2. Import your GitHub repository.
3. **Configure Project Settings**:
   - **Framework Preset**: Vite.
   - **Root Directory**: `frontend`.
4. **Environment Variables**:
   - Add `VITE_API_URL`: `https://your-backend-url.com/api` (You will get this after backend deployment).
5. Click **Deploy**.

---

### ⚙️ Phase 4: Backend Deployment (Render/Railway)
*Vercel is best for Frontend. For the Express Backend:*
1. Sign up at [Render.com](https://render.com).
2. Create a **New Blue Service**.
3. Point to your GitHub repo.
4. Set **Root Directory** to `backend`.
5. Add **Environment Variables**:
   - `DB_URL`: (Paste your Neon Connection String).
   - `JWT_SECRET`: (Your secret key).
   - `PORT`: `5001`.
6. Click **Deploy**.

---

### ✅ Final Picklist
- [ ] Code pushed to GitHub.
- [ ] Neon/Supabase DB initialized.
- [ ] Backend deployed on Render/Railway.
- [ ] Frontend deployed on Vercel.
- [ ] API URLs updated in environment variables.
