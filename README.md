
## 🏁 Memulai (Getting Started)

Ikuti langkah-langkah ini untuk menjalankan proyek secara lokal di mesin Anda.

### Prasyarat

Pastikan Anda telah menginstal perangkat lunak berikut:
*   [Node.js](https://nodejs.org/) (versi LTS direkomendasikan)
*   [pnpm](https://pnpm.io/installation) (manajer paket yang digunakan dalam proyek ini)
*   [Expo Go](https://expo.dev/go) (aplikasi di perangkat seluler Anda untuk pengujian)
*   [Git](https://git-scm.com/)

### Instalasi

1.  **Clone repositori ini:**
    ```bash
    git clone https://github.com/username/pandai.git
    cd pandai
    ```

2.  **Instal dependensi proyek:**
    ```bash
    pnpm install
    ```

3.  **Jalankan server pengembangan:**
    ```bash
    pnpm start
    ```
    atau
    ```bash
    npx expo start
    ```

4.  **Jalankan aplikasi:**
    *   Pindai kode QR yang muncul di terminal menggunakan aplikasi Expo Go di ponsel Anda.
    *   Atau, tekan `a` untuk membuka di emulator Android, atau `i` untuk membuka di simulator iOS.

## 📂 Struktur Proyek

Proyek ini mengikuti struktur direktori yang diorganisir oleh Expo Router.

```
/
├── app/                # Direktori utama untuk semua rute aplikasi
│   ├── (auth)/         # Grup rute untuk alur autentikasi
│   ├── (onboarding)/   # Grup rute untuk alur onboarding
│   └── (tabs)/         # Grup rute untuk tata letak tab utama
├── assets/             # Aset statis seperti gambar dan font
├── components/         # Komponen UI yang dapat digunakan kembali
├── store/              # Kode manajemen state (misalnya, Zustand)
└── utils/              # Fungsi utilitas (misalnya, konfigurasi Firebase)
```

---

## Collaboration & Contribution Guidelines

### Commit Message Convention
- Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for all commit messages.
- Prefix your commit with one of the following types:
  - `feat`: New feature
  - `fix`: Bug fix
  - `docs`: Documentation only changes
  - `chore`: Maintenance, build, or tooling changes
  - `refactor`: Code change that neither fixes a bug nor adds a feature
  - `test`: Adding or updating tests
  - `style`: Formatting, missing semi colons, etc; no code change
  - `perf`: Performance improvement
- Example:
  ```
  feat(auth): add OAuth login with Google
  fix(product): correct price calculation bug
  docs: update README with setup instructions
  ```

### Branch Naming Convention
- Use the format: `<devname>.<feature>`
- Example: `nafhan.auth`, `alex.product-listing`, `sarah.fix-login`
- Use short, descriptive feature names. Use hyphens for multi-word features: `john.product-table-fix`

### Pull Request (PR) Rules
- PR titles should be clear and reference the main change (e.g., `feat: add Kanban drag-and-drop`)
- Link related issues in the PR description if applicable.
- Provide a concise summary of changes and any special instructions for reviewers.
- Ensure all checks (CI, lint, tests) pass before requesting review.
- Assign at least one reviewer; self-merge is discouraged unless urgent.
- Use draft PRs for work-in-progress.

### General Collaboration Rules
- Sync with the latest `main` before starting new work.
- Keep PRs focused and as small as possible; large PRs should be split if feasible.
- Use code comments for complex logic or non-obvious decisions.
- Document new environment variables or configuration changes in the README.
- Discuss breaking changes or architectural decisions in issues before implementation.
- Be respectful and constructive in code reviews and discussions.

### Push/Pull Workflow

This project uses two main branches:
- **main**: Production branch (deploys to production)
- **dev**: Staging branch (for development and staging/testing)

> **All feature/fix branches must be merged into `dev`, _not_ `main`. Only maintainers should merge `dev` into `main` for production releases.**

#### Step-by-Step Workflow for Contributors
<picture><img alt="Sentry" src=".github/images/git_workflow.png">
        </picture>

1. **Sync your local repository**
   - Make sure you have the latest `dev` branch:
     ```sh
     git checkout dev
     git pull origin dev
     ```
2. **Create your feature/fix branch**
   - Use the branch naming convention:
     ```sh
     git checkout -b <devname>.<feature>
     # Example: git checkout -b nafhan.auth
     ```
3. **Work on your changes**
   - Commit using the [conventional commit](#commit-message-convention) format.
4. **Sync with `dev` before pushing**
   - Before pushing, always pull the latest `dev` to avoid conflicts:
     ```sh
     git checkout dev
     git pull origin dev
     git checkout <your-branch>
     git merge dev
     # Resolve any conflicts if needed
     ```
5. **Push your branch**
   ```sh
   git push origin <your-branch>
   ```
6. **Open a Pull Request**
   - Target the `dev` branch (not `main`).
   - Fill out the PR template, link issues if applicable, and request review.