# SocialApp — Tam Layihə İzahı

> Bu sənəd layihənin **hər faylını, hər sətrini** izah edir.  
> Junior developer olaraq oxuyub başa düşmək üçün nəzərdə tutulub.

---

## Mündəricat

1. [Layihənin Ümumi Strukturu](#1-layihənin-ümumi-strukturu)
2. [Texnologiyalar niyə seçildi?](#2-texnologiyalar-niyə-seçildi)
3. [vite.config.js — Alias sistemi](#3-viteconfigjs--alias-sistemi)
4. [.env — Mühit dəyişənləri](#4-env--mühit-dəyişənləri)
5. [src/services — API qatı](#5-srcservices--api-qatı)
6. [src/utils — Köməkçi funksiyalar](#6-srcutils--köməkçi-funksiyalar)
7. [src/shared/reducers — State məntiqi](#7-srcsharedreducers--state-məntiqi)
8. [src/shared/hooks — Custom hooklar](#8-srcsharedhooks--custom-hooklar)
9. [src/components — UI komponentlər](#9-srccomponents--ui-komponentlər)
10. [src/app/App.jsx — Kök komponent](#10-srcappappjsx--kök-komponent)

---

## 1. Layihənin Ümumi Strukturu

```
src/
  app/
    App.jsx          ← Bütün komponentləri birləşdirən ANA komponent
    main.jsx         ← React-in başladığı yer (entry point)
  components/
    Header/          ← Yuxarı navbar (axtarış, bildiriş, avatar)
    Sidebar/         ← Sol panel (nav, profil, dark mode)
      ProfileCard/   ← Avatar + ad + handle
      StatsBar/      ← Posts / Followers / Following
    Feed/            ← Postların siyahısı
      CreatePostBox/ ← "What's on your mind?" input qutusu
    PostCard/        ← Tək bir postun kartı
      PostCardHeader/   ← Post kartın yuxarı hissəsi
      PostCardActions/  ← Like / Share / Delete düymələri
      PostDeleteConfirm/← Silmə təsdiq modalı
    RightPanel/      ← Sağ panel (dostlar, şəkillər, söhbətlər)
      OnlineFriends/    ← Online olan dostlar
      LatestPhotos/     ← Son şəkillər grid-i
      LatestConversations/ ← Son söhbətlər
    CreatePostModal/ ← Yeni post yaratma pəncərəsi
  services/
    api.js           ← Axios instance (bütün HTTP sorğuların bazası)
    postsService.js  ← Post-a aid API funksiyaları
    usersService.js  ← İstifadəçi API funksiyaları
  shared/
    hooks/           ← Custom React hookları
    reducers/        ← useReducer üçün reducer + action types
  utils/
    formatDate.js    ← Tarixi oxunaqlı formata çevirir
    getAvatarColor.js← Avatar üçün rəng hesablayır
    currentUser.js   ← Giriş etmiş istifadəçi məlumatları
  global.css         ← Qlobal CSS dəyişənləri (light/dark theme)
```

**Niyə belə qurulub?**  
Bu struktur **"separation of concerns"** (məsuliyyətlərin ayrılması) prinsipinə əsaslanır.  
Hər qovluq öz işini görür:
- `services/` — serverə sorğu göndərir, başqa heç nə bilmir
- `shared/hooks/` — state məntiqi saxlanır, UI bilmir
- `components/` — yalnız ekranda nə görünəcəyini bilir

---

## 2. Texnologiyalar niyə seçildi?

| Texnologiya | Niyə? |
|---|---|
| **React 19** | Komponent əsaslı UI kitabxanası. UI-ni kiçik, təkrar istifadə olunan hissələrə bölmək üçün. |
| **Vite** | Çox sürətli development server. `create-react-app`-dən daha sürətlidir. |
| **CSS Modules** | Hər komponentin öz `.module.css` faylı var. CSS class adları avtomatik unikal olur, başqa komponentlə toqquşmur. |
| **Axios** | HTTP sorğuları üçün. Native `fetch`-dən daha rahat — avtomatik JSON parse, error handling, base URL. |
| **react-toastify** | Bildiriş (toast) göstərmək üçün. Özümüz yazmağa ehtiyac yoxdur. |
| **react-icons** | Minlərlə hazır SVG ikonu. Komponent kimi istifadə olunur: `<MdHome size={20} />` |

---

## 3. vite.config.js — Alias sistemi

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
    },
  },
})
```

**Sətir-sətir izah:**

```js
import { defineConfig } from 'vite'
```
> `defineConfig` — Vite-ın konfiqurasiya funksiyasıdır. TypeScript tip yoxlaması üçün lazımdır, olmasa da işləyir, amma IDE-də autocomplete işləmir.

```js
import { fileURLToPath, URL } from 'node:url'
```
> `node:url` — Node.js-in daxili URL modulu. `fileURLToPath` URL-i fayl yoluna çevirir.  
> `node:` prefiksi qəsdən yazılıb — bu, third-party paket deyil, Node.js-in daxili modulu olduğunu bildirir.

```js
'@': fileURLToPath(new URL('./src', import.meta.url)),
```
> `import.meta.url` — Bu faylın öz URL-i (vite.config.js harada yerləşir).  
> `new URL('./src', import.meta.url)` — `vite.config.js`-in yanında `src/` qovluğunun URL-i.  
> `fileURLToPath(...)` — URL-i `D:/Praqramlasdirma/Homeworks/Sosial_APP/src` kimi absolut yola çevirir.

**Nəticə nədir?**  
Bu alias-lar sayəsində:
```js
// Alias olmadan (uzun, kövrək)
import PostCard from '../../../components/PostCard/PostCard'

// Alias ilə (qısa, dəyişməz)
import PostCard from '@components/PostCard/PostCard'
```
Qovluq strukturu dəyişsə belə, `@components/...` yazısı doğru yerə işarə edir.

---

## 4. .env — Mühit dəyişənləri

```
VITE_API_BASE_URL=https://blog-api-t6u0.onrender.com
```

**Niyə bu fayl var?**  
API URL-i birbaşa koda yazmaq pis praktikadır:
```js
// YANLIŞ — URL koda yazılıb (hardcoded)
baseURL: 'https://blog-api-t6u0.onrender.com'

// DOĞRU — mühit dəyişəni ilə
baseURL: import.meta.env.VITE_API_BASE_URL
```

**Niyə `VITE_` prefiksi?**  
Vite təhlükəsizlik üçün yalnız `VITE_` ilə başlayan dəyişənləri brauzerdə görünən koda daxil edir.  
Məsələn, `DB_PASSWORD=secret` yazsanız, bu brauzerə getməz (görünməz).  
Amma `VITE_API_BASE_URL` brauzerə gedir, çünki front-end-ə lazımdır.

**`.env.example` faylı niyə var?**  
`.env` faylı `.gitignore`-a əlavə edilir (gizli saxlanılır).  
`.env.example` — komanda üzvlərinin hansı dəyişənlərə ehtiyacı olduğunu bilmək üçündür. Real dəyərlər olmadan şablondur.

---

## 5. src/services — API qatı

### api.js

```js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
```

**Sətir-sətir izah:**

```js
import axios from 'axios'
```
> `axios` — HTTP sorğuları üçün xarici kitabxana. `npm install axios` ilə qurulub.

```js
const api = axios.create({ ... })
```
> `axios.create()` — özəlləşdirilmiş bir Axios nüsxəsi yaradır.  
> Bu nüsxə hər sorğuda avtomatik `baseURL` və `headers` əlavə edir.  
> Yəni `api.get('/posts')` yazdıqda, arxa planda `GET https://blog-api-t6u0.onrender.com/posts` göndərilir.

```js
baseURL: import.meta.env.VITE_API_BASE_URL,
```
> `import.meta.env` — Vite-in mühit dəyişənlərini oxuma üsulu.  
> Bu sətir `.env` faylındakı `VITE_API_BASE_URL` dəyərini götürür.

```js
headers: { 'Content-Type': 'application/json' }
```
> Hər sorğuda serverə deyir: "Mən sənə JSON göndərəcəm".  
> Bu olmasa, server `POST` sorğusunun body-sini başa düşə bilməz.

---

### postsService.js

```js
import api from './api'

export const getPosts = () => {
  return api.get('/posts', { params: { id_gte: 101 } })
}

export const createPost = (data) => {
  return api.post('/posts', data)
}

export const removePost = (id) => {
  return api.delete(`/posts/${id}`)
}
```

**Sətir-sətir izah:**

```js
export const getPosts = () => {
  return api.get('/posts', { params: { id_gte: 101 } })
}
```
> `api.get('/posts')` — GET sorğusu göndərir: `GET /posts`  
> `{ params: { id_gte: 101 } }` — URL-ə query string əlavə edir: `/posts?id_gte=101`  
> `id_gte: 101` — "id-si 101-dən böyük olan postları gətir" deməkdir (test API-si üçün).  
> Bu funksiya `Promise` qaytarır — yəni nəticəsi gələnə qədər gözləyir.

```js
export const createPost = (data) => {
  return api.post('/posts', data)
}
```
> `api.post('/posts', data)` — POST sorğusu göndərir.  
> `data` — yaradılacaq postun məlumatları (title, body, imageUrl).  
> Server bu məlumatları alır, yeni post yaradır, yaradılan postu qaytarır.

```js
export const removePost = (id) => {
  return api.delete(`/posts/${id}`)
}
```
> `` `/posts/${id}` `` — Template literal (şablon sətri). `id` dəyişəninin dəyəri sətirə daxil edilir.  
> Məsələn: `id = 5` olarsa, sorğu: `DELETE /posts/5`

---

### usersService.js

```js
import api from './api'

const RANDOM_USER_URL = 'https://randomuser.me/api'

export const getRandomUsers = (results = 6) => {
  return api
    .get(RANDOM_USER_URL, { params: { results, inc: 'name,picture,login' } })
    .then(({ data }) => data.results)
}
```

**Sətir-sətir izah:**

```js
const RANDOM_USER_URL = 'https://randomuser.me/api'
```
> URL dəyişən kimi ayrıca saxlanılır. Böyük hərflərlə yazılır — bu, dəyişməyən sabit (constant) olduğunu göstərir.  
> Əgər URL dəyişsə, yalnız bu bir yeri dəyişmək kifayət edir.

```js
export const getRandomUsers = (results = 6) => {
```
> `results = 6` — default parametr. Funksiya çağıranda `results` ötürülməsə, avtomatik `6` olur.

```js
.get(RANDOM_USER_URL, { params: { results, inc: 'name,picture,login' } })
```
> `params` — URL-ə `?results=6&inc=name,picture,login` əlavə edir.  
> `{ results }` — `{ results: results }` yazısının qısaldılmış forması (shorthand property).  
> `inc: 'name,picture,login'` — API-yə deyirik: "Yalnız bu sahələri gönder, hamısını deyil." Bu, trafiki azaldır.

```js
.then(({ data }) => data.results)
```
> `.then()` — Promise resolve olduqda işləyir.  
> `{ data }` — Axios cavabının `data` hissəsini destructure edirik.  
> `data.results` — API `{ results: [...] }` formatında qaytarır, biz yalnız array-i götürürük.

---

## 6. src/utils — Köməkçi funksiyalar

### currentUser.js

```js
export const CURRENT_USER = {
  name: 'Sarkhan Rahimli',
  handle: '@sarkhandev',
  avatar: 'https://...',
}
```

**Niyə ayrı faylda?**  
Əgər Header, Sidebar, Feed hər biri öz içində `name = 'Sarkhan'` yazsa, dəyişiklik lazım olduqda 3 yeri dəyişmək lazım gəlir.  
Bu konstant — **"single source of truth"** (tək həqiqət mənbəyi) prinsipini tətbiq edir.

---

### formatDate.js

```js
export const formatDate = (dateStr) => {
  if (!dateStr) return 'just now'

  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return 'just now'

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours   = Math.floor(minutes / 60)
  const days    = Math.floor(hours   / 24)

  if (seconds < 60)  return 'just now'
  if (minutes < 60)  return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  if (hours   < 24)  return `${hours} hour${hours > 1 ? 's' : ''} ago`
  if (days    < 7)   return `${days} day${days > 1 ? 's' : ''} ago`

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
```

**Sətir-sətir izah:**

```js
if (!dateStr) return 'just now'
```
> `!dateStr` — `dateStr` `null`, `undefined`, ya da boş sətir olarsa `true` olur.  
> Belə halda heç bir hesablama etmədən dərhal `'just now'` qaytarırıq.

```js
const date = new Date(dateStr)
if (isNaN(date.getTime())) return 'just now'
```
> `new Date(dateStr)` — sətri JavaScript `Date` obyektinə çevirir.  
> `date.getTime()` — tarixi millisaniyəyə çevirir.  
> `isNaN(...)` — "Is Not a Number?" — əgər tarix düzgün format deyilsə, `NaN` qaytarır.  
> Bu müdafiəvi proqramlaşdırmadır — yanlış tarix gəlsə, proqram çökmür.

```js
const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
```
> `Date.now()` — hazırkı vaxt (millisaniyə ilə).  
> `date.getTime()` — postu yazılan vaxt (millisaniyə ilə).  
> Fərqi `1000`-ə böldük çünki `1000 ms = 1 saniyə`.  
> `Math.floor()` — aşağı yuvarlaqlaşdırır (2.9 → 2).

```js
const minutes = Math.floor(seconds / 60)
const hours   = Math.floor(minutes / 60)
const days    = Math.floor(hours   / 24)
```
> Saniyədən dəqiqəyə, saata, günə keçid. Hər biri öncəkinin bölməsindən hesablanır.

```js
return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
```
> `minutes > 1 ? 's' : ''` — ternary operator.  
> `1 minute ago` (tək), `5 minutes ago` (cəm) — ingiliscə qrammatikaya görə.

---

### getAvatarColor.js

```js
const COLORS = [
  '#e53935', '#d81b60', '#8e24aa', '#3949ab',
  '#1e88e5', '#00897b', '#43a047', '#fb8c00',
]

export const getAvatarColor = (id) => {
  const index = Math.abs(Number(id) || String(id).charCodeAt(0) || 0) % COLORS.length
  return COLORS[index]
}
```

**Sətir-sətir izah:**

```js
const COLORS = [ ... ]
```
> 8 fərqli rəng. Array-da saxlanılır çünki indeks ilə seçmək asandır.

```js
Math.abs(Number(id) || String(id).charCodeAt(0) || 0) % COLORS.length
```
> `Number(id)` — `id`-ni rəqəmə çevirməyə çalışır. Uğursuz olsa `NaN` qaytarır.  
> `||` — OR operatoru. `NaN || ...` ifadəsi növbəti seçənəkə keçir.  
> `String(id).charCodeAt(0)` — `id` sətirdirsə, ilk simvolun ASCII kodunu götürür. Məs: `'a'` → `97`.  
> `|| 0` — hər ikisi uğursuz olsa, `0` istifadə edilir.  
> `Math.abs(...)` — mənfi ədədləri müsbətə çevirir (array indeksi mənfi ola bilməz).  
> `% COLORS.length` — bölmənin qalığı (modulo). Nəticə həmişə `0`-dan `7`-yə qədər olur.  
> **Nəticə:** Eyni `id` həmişə eyni rəngi verir → deterministic (sabit).

---

## 7. src/shared/reducers — State məntiqi

### postsReducer.js

```js
export const POST_ACTIONS = {
  FETCH_START:   'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR:   'FETCH_ERROR',
  ADD_POST:      'ADD_POST',
  DELETE_POST:   'DELETE_POST',
  TOGGLE_LIKE:   'TOGGLE_LIKE',
}
```

**Niyə bu object var?**  
Belə yazmaq olar: `dispatch({ type: 'FETCH_START' })`  
Amma `'FETCH_START'` sətirini 10 yerdə yazsaq, birini yanlış yazsaq (`'FETCH_STRAT'`), heç bir xəta görünmür — kod sadəcə işləmir.

`POST_ACTIONS.FETCH_START` yazdıqda:
- IDE avtomatik tamamlayır (autocomplete)  
- Yanlış yazsaq, IDE xəbərdarlıq edir  
- Bütün istifadə yerlərini axtarmaq asandır

---

```js
export const initialState = {
  posts: [],
  loading: false,
  error: null,
}
```

> `initialState` — proqram başladığında state-in ilk dəyəri.  
> `posts: []` — başlanğıcda siyahı boşdur.  
> `loading: false` — yüklənmir.  
> `error: null` — xəta yoxdur.

---

```js
export const postsReducer = (state, action) => {
  switch (action.type) {
    case POST_ACTIONS.FETCH_START:
      return { ...state, loading: true, error: null }
    ...
  }
}
```

**`reducer` nədir?**  
Reducer — `(köhnə state, nə baş verdi) → yeni state` formulunu tətbiq edən funksiyadır.  
`state` — köhnə məlumatlar.  
`action` — nə baş verdiyini bildirən obyekt (`{ type: 'FETCH_START' }`).

```js
return { ...state, loading: true, error: null }
```
> `...state` — spread operator. Köhnə state-in bütün xassələrini kopyalayır.  
> `loading: true` — yalnız `loading` dəyişir, `posts` toxunulmaz qalır.  
> **Niyə kopyalayırıq?** React state-i birbaşa dəyişdirsək (`state.loading = true`), dəyişikliyi görüb yenidən render etmir. Yeni obyekt qaytarmalıyıq.

```js
case POST_ACTIONS.ADD_POST:
  return { ...state, posts: [action.payload, ...state.posts] }
```
> `[action.payload, ...state.posts]` — yeni postu siyahının başına əlavə edir.  
> `action.payload` — `dispatch({ type: 'ADD_POST', payload: yeniPost })` ilə göndərilən məlumat.

```js
case POST_ACTIONS.DELETE_POST:
  return { ...state, posts: state.posts.filter((p) => String(p.id) !== String(action.payload)) }
```
> `.filter()` — şərtə uymayan elementləri atır, yeni array qaytarır.  
> `String(p.id) !== String(action.payload)` — hər iki tərəfi sətirə çeviririk çünki `id` bəzən rəqəm, bəzən sətir ola bilər. `5 !== '5'` yanlışdır, amma `'5' !== '5'` doğrudur.

```js
case POST_ACTIONS.TOGGLE_LIKE: {
  const isLiked = state.posts.find((p) => String(p.id) === String(action.payload))?.liked
  return {
    ...state,
    posts: state.posts.map((p) =>
      String(p.id) === String(action.payload)
        ? { ...p, liked: !p.liked, likeCount: (p.likeCount || 0) + (isLiked ? -1 : 1) }
        : p
    ),
  }
}
```
> `{ }` — case blokunu ayrı scope-a alırıq çünki `const isLiked` dəyişəni yalnız bu bloka aid olmalıdır.  
> `?.liked` — optional chaining. `find()` `undefined` qaytararsa, `.liked`-ə çatmağa çalışmaq xəta verər. `?.` operatoru bunu önləyir.  
> `.map()` — hər elementi gəzir. Yalnız like edilən postu dəyişir, qalanlarını `p` (dəyişmədən) qaytarır.  
> `!p.liked` — məntiqi tersini alır: `true` → `false`, `false` → `true`.  
> `(p.likeCount || 0)` — `likeCount` `undefined` olarsa, `0` qəbul edir.

---

## 8. src/shared/hooks — Custom hooklar

### usePosts.js

```js
const usePosts = () => {
  const [state, dispatch] = useReducer(postsReducer, initialState)
  ...
}
```

**`useReducer` nədir?**  
`useState`-in güclü versiyası. Çox sahəli state-i idarə etmək üçündür.  
`useState` ilə hər sahə üçün ayrı dəyişən lazımdır:
```js
const [posts, setPosts] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
```
`useReducer` ilə hamısı bir yerdədir: `state.posts`, `state.loading`, `state.error`.

---

```js
const fetchPosts = useCallback(async () => {
  dispatch({ type: POST_ACTIONS.FETCH_START })
  try {
    const { data } = await getPosts()
    const raw = Array.isArray(data) ? data : (data.posts ?? [])
    const posts = raw.map((p, i) => ({
      ...p,
      id: p.id ?? (100 + i),
      createdAt: p.createdAt ?? new Date(Date.now() - (i + 1) * 43 * 60000).toISOString(),
    }))
    dispatch({ type: POST_ACTIONS.FETCH_SUCCESS, payload: posts })
  } catch (err) {
    dispatch({ type: POST_ACTIONS.FETCH_ERROR, payload: err.message })
    toast.error('Failed to load posts')
  }
}, [])
```

**Sətir-sətir izah:**

```js
const fetchPosts = useCallback(async () => { ... }, [])
```
> `useCallback` — funksiyayı yaddaşda saxlayır. Hər render-də yeni funksiya obyekti yaratmır.  
> `async` — funksiyanın içindəki `await` üçün lazımdır. `await` yalnız `async` funksiyada işlədilə bilər.  
> `[]` — boş dependency array. Funksiya heç vaxt yenidən yaradılmır.

```js
dispatch({ type: POST_ACTIONS.FETCH_START })
```
> Sorğu başlamazdan əvvəl `loading: true` edirik. UI-da spin/skeleton göstərilsin deyə.

```js
const { data } = await getPosts()
```
> `await` — Promise-in resolve olmasını gözləyir.  
> `{ data }` — Axios cavabının `data` hissəsini çıxarırıq (destructuring).

```js
const raw = Array.isArray(data) ? data : (data.posts ?? [])
```
> API bəzən array, bəzən `{ posts: [...] }` qaytarır.  
> `Array.isArray(data)` — array-dirsə birbaşa götür.  
> `data.posts ?? []` — `data.posts` mövcud deyilsə, boş array istifadə et.  
> `??` — nullish coalescing operator. Yalnız `null` və `undefined` üçün işləyir (`||`-dən fərqli olaraq `0` və `''` keçmir).

```js
id: p.id ?? (100 + i),
createdAt: p.createdAt ?? new Date(Date.now() - (i + 1) * 43 * 60000).toISOString(),
```
> API bəzən bu sahələri göndərmir. `??` — olmasa, özümüz yaradırıq.  
> `(i + 1) * 43 * 60000` — hər post 43 dəqiqə fərqli görünər deyə tarixi fərqləndirir.  
> `.toISOString()` — tarixi `"2024-01-15T10:30:00.000Z"` formatına çevirir.

---

### useModal.js

```js
const useModal = (initial = false) => {
  const [isOpen, setIsOpen] = useState(initial)

  const open   = useCallback(() => setIsOpen(true), [])
  const close  = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

  return { isOpen, open, close, toggle }
}
```

**Niyə ayrı hook?**  
Modal vəziyyəti (açıq/bağlı) tez-tez lazım olur: `PostCard`-da silmə modalı, `App`-da post yaratma modalı.  
Bu hook-u bir dəfə yazırıq, hər yerdə istifadə edirik.

```js
const toggle = useCallback(() => setIsOpen((prev) => !prev), [])
```
> `setIsOpen((prev) => !prev)` — funksional update forması.  
> `prev` — state-in əvvəlki dəyəri.  
> Niyə bu formada? Çünki `toggle` funksiyasını `useCallback` ilə memoize edirik.  
> `setIsOpen(!isOpen)` yazsaq, `isOpen` dəyişəni closure-da "köhnə" qalır. Funksional form hər zaman son dəyəri götürür.

---

### useDarkMode.js

```js
const useDarkMode = () => {
  const [dark, setDark] = useState(() => localStorage.getItem('darkMode') === 'true')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('darkMode', dark)
  }, [dark])

  const toggle = useCallback(() => setDark((p) => !p), [])

  return { dark, toggle }
}
```

**Sətir-sətir izah:**

```js
useState(() => localStorage.getItem('darkMode') === 'true')
```
> `useState` içinə funksiya ötürülüb — bu **lazy initialization** adlanır.  
> `localStorage.getItem('darkMode')` — brauzerin yaddaşından dəyəri oxuyur.  
> Həmişə sətir qaytarır, buna görə `=== 'true'` ilə boolean-a çeviririk.  
> Niyə funksiya? Çünki `localStorage.getItem()` hər render-də çağırılmasın — yalnız ilk render-də çağırılsın.

```js
document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
```
> `document.documentElement` — HTML-in `<html>` elementi.  
> `setAttribute('data-theme', 'dark')` — `<html data-theme="dark">` edir.  
> `global.css`-dəki CSS dəyişənləri `[data-theme="dark"]` selectoruna bağlıdır.  
> Yəni bu bir sətir bütün rəng palitrəsini dəyişir.

```js
localStorage.setItem('darkMode', dark)
```
> Brauzerin yaddaşına yazır. Səhifə yenidən açılanda `useState` bu dəyəri oxuyur → seçim qorunur.

---

### useDebounce.js

```js
const useDebounce = (value, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
```

**Debounce nədir?**  
İstifadəçi "react" yazdıqda, hər hərf dəyişdikdə axtarış edilsə — 5 dəfə əməliyyat edilər.  
Debounce — son dəyişiklikdən `delay` millisaniyə sonra işləyir.  
Yalnız "react" tam yazıldıqdan 400ms sonra axtarış edilir.

```js
const timer = setTimeout(() => {
  setDebouncedValue(value)
}, delay)

return () => clearTimeout(timer)
```
> `setTimeout` — `delay` ms sonra funksiyanı çağırır.  
> `return () => clearTimeout(timer)` — **cleanup funksiya**.  
> `value` dəyişdikdə `useEffect` yenidən işləyir. Öncəki timer silinir, yeni başlar.  
> Beləliklə yalnız son dəyişiklikdən sonra axtarış edilir.

---

### useTitle.js

```js
const BASE_TITLE = 'SocialApp'

const useTitle = (title) => {
  useEffect(() => {
    const prev = document.title
    document.title = title ? `${title} | ${BASE_TITLE}` : BASE_TITLE
    return () => {
      document.title = prev
    }
  }, [title])
}
```

```js
const prev = document.title
```
> Başlığı dəyişməzdən əvvəl köhnəsini saxlayırıq.

```js
document.title = title ? `${title} | ${BASE_TITLE}` : BASE_TITLE
```
> `title` varsa: `"react" axtarışı | SocialApp`  
> `title` yoxdursa: `SocialApp`

```js
return () => { document.title = prev }
```
> Komponent unmount olduqda başlığı əvvəlki halinə qaytarır.  
> Bu, hook-un "təmizlik" işidir — yaddaş sızmasının qarşısını alır.

---

### usePostForm.js

```js
const INITIAL_FORM = { title: '', body: '', imageUrl: '' }

const usePostForm = ({ addPost, onClose, open }) => {
  const [form, setForm]       = useState(INITIAL_FORM)
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open) {
      setForm(INITIAL_FORM)
      setErrors({})
    }
  }, [open])
  ...
}
```

```js
const INITIAL_FORM = { title: '', body: '', imageUrl: '' }
```
> Formanın boş başlanğıc dəyəri. Sabit kimi çıxarılıb çünki `reset` funksiyasında da istifadə olunur.

```js
useEffect(() => {
  if (open) { ... }
}, [open])
```
> `open` prop-u `false → true` dəyişdikdə (yəni modal açıldıqda) form sıfırlanır.  
> Niyə lazımdır? Modal bağlandıqda formda yazdıqlarınız qaldı. Növbəti açılışda təmiz forma başlamaq üçün.

```js
const handleChange = useCallback((e) => {
  const { name, value } = e.target
  setForm((prev) => ({ ...prev, [name]: value }))
  setErrors((prev) => ({ ...prev, [name]: undefined }))
}, [])
```
> `e.target` — dəyişən `<input>` elementi.  
> `{ name, value }` — input-un `name` atributu və daxil edilən dəyər.  
> `[name]: value` — hesablanmış xassə adı (computed property). `name = 'title'` olarsa, `{ title: value }` yaranır.  
> İstifadəçi yazmağa başlayanda o sahənin xətası silinir.

---

### useUsers.js

```js
const useUsers = (count = 8) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    getRandomUsers(count)
      .then((data) => {
        if (!cancelled) setUsers(data)
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [count])

  return { users, loading }
}
```

```js
let cancelled = false
...
return () => { cancelled = true }
```
> **Race condition** qarşısını alan pattern.  
> Problem: Komponent silindi (unmount), amma API cavabı hələ gəlmedi. Cavab gəldikdə `setUsers(data)` çağırılır — amma komponent artıq yoxdur. Bu xəta verir.  
> `cancelled = true` etməklə: API cavabı gəldikdə `if (!cancelled)` yoxlanır, komponent yoxdursa state dəyişmir.

---

## 9. src/components — UI komponentlər

### PostCard/PostCard.jsx

```js
const PostCard = memo(({ post, deletePost, toggleLike }) => {
  const avatarColor  = useMemo(() => getAvatarColor(post.userId ?? post.id), [post.userId, post.id])
  const avatarLetter = useMemo(() => String(post.userId ?? post.id ?? '?').charAt(0).toUpperCase(), [post.userId, post.id])
  const { isOpen: confirmOpen, open: openConfirm, close: closeConfirm } = useModal()
  ...
})
PostCard.displayName = 'PostCard'
```

**`memo` nədir?**  
`React.memo` — komponentin props-u dəyişməyibsə, yenidən render etmir.  
20 post var. Birini like etdikdə, yalnız o post yenidən render olur. Digər 19-u dəyişmir.  
`memo` olmasa, bütün 20 post yenidən render edilir.

```js
const { isOpen: confirmOpen, open: openConfirm, close: closeConfirm } = useModal()
```
> Destructuring ilə yenidən adlandırma: `isOpen` → `confirmOpen`  
> Niyə? Eyni komponentdə bir neçə modal ola bilər. `confirmOpen` hansı modal olduğunu bildirir.

```js
PostCard.displayName = 'PostCard'
```
> React DevTools-da (brauzer extension) komponent adı görünür.  
> `memo` ilə sarıldıqda, DevTools-da `Memo(Component)` yazır — bu adı düzəldir.

---

### PostCardHeader.jsx

```js
const PostCardHeader = memo(({ avatarColor, avatarLetter, author, userId, createdAt }) => (
  <div className={styles.header}>
    <div className={styles.avatar} style={{ background: avatarColor }}>
      {avatarLetter}
    </div>
    ...
  </div>
))
```

```js
style={{ background: avatarColor }}
```
> `style` prop-u JavaScript obyekti qəbul edir. `{{ }}` — xarici `{}` JSX-dədir, daxili `{}` obyektdir.  
> `avatarColor` — `'#1e88e5'` kimi hex rəng kodu. Hər istifadəçi üçün fərqlidir.

---

### Feed/Feed.jsx

```js
const filteredPosts = useMemo(() => {
  const q = searchQuery.trim().toLowerCase()
  const filtered = q
    ? posts.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.body?.toLowerCase().includes(q)
      )
    : posts
  return [...filtered].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )
}, [posts, searchQuery])
```

```js
const q = searchQuery.trim().toLowerCase()
```
> `.trim()` — baş-sondakı boşluqları silir: `'  react  '` → `'react'`  
> `.toLowerCase()` — kiçik hərfə çevirir: `'React'` → `'react'`  
> İstifadəçi böyük-kiçik hərflə yazmaqdan asılı olmayaraq axtarış işləyir.

```js
p.title?.toLowerCase().includes(q)
```
> `?.` — optional chaining. `p.title` `undefined`-dirsə, `.toLowerCase()` çağırılmır, xəta olmur.  
> `.includes(q)` — sətirin içində `q`-nu axtarır. Tapılarsa `true` qaytarır.

```js
return [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
```
> `[...filtered]` — `filtered` array-inin kopyasını yaradır. Originalı dəyişmirik.  
> `.sort((a, b) => ...)` — müqayisə funksiyası ilə sıralayır.  
> `new Date(b.createdAt) - new Date(a.createdAt)` — `b - a` mənfi olarsa, `a` önə keçir.  
> `b.createdAt` daha böyük (yeni) tarixdirsə, bu müsbət ədəd verir → `b` önə keçir.  
> **Nəticə:** Ən yeni postlar siyahının başında görünür.

---

### CreatePostModal/CreatePostModal.jsx

```js
const handleBackdrop = (e) => {
  if (e.target === e.currentTarget) handleClose()
}
```

> `e.target` — click edilən real element.  
> `e.currentTarget` — event handler-in bağlı olduğu element (backdrop `div`-i).  
> `e.target === e.currentTarget` — yalnız backdrop-a birbaşa kliklənibsə modalu bağla.  
> Modal içinə (`<div className={styles.modal}>`) kliklənibsə, event bubble up edir, amma `e.target` modal olur, `e.currentTarget` backdrop olur → bərabər deyil → modal bağlanmır.

```js
if (!open) return null
```
> **Early return** pattern. `open` false olarsa komponent heç nə render etmir.  
> React `null` render edərsə, DOM-da heç bir element görünmür.

---

## 10. src/app/App.jsx — Kök komponent

```js
function App() {
  const { posts, loading, error, fetchPosts, addPost, deletePost, toggleLike } = usePosts()
  const { dark, toggle: toggleDark } = useDarkMode()
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearch = useDebounce(searchQuery, 500)
  const { isOpen: modalOpen, open: openModal, close: closeModal } = useModal()

  useTitle(debouncedSearch ? `"${debouncedSearch}" axtarışı` : null)

  const handleSearch = useCallback((q) => setSearchQuery(q), [])
  ...
}
```

**Niyə bütün hooklar burada?**  
`App` — bütün uşaq komponentlərin atasıdır. State burada saxlanır, props vasitəsilə uşaqlara ötürülür.  
Bu "prop drilling" adlanır. Layihə böyüdükdə `Context` və ya `Redux` istifadə edilir.

```js
const debouncedSearch = useDebounce(searchQuery, 500)
```
> `searchQuery` — istifadəçinin hər hərf yazdığında dəyişir.  
> `debouncedSearch` — yalnız 500ms fasilədən sonra yenilənir.  
> `Feed`-ə `debouncedSearch` ötürülür, yəni hər hərfdə axtarış olmur.

```js
<ToastContainer position="top-right" autoClose={3000} theme={dark ? 'dark' : 'light'} />
```
> `ToastContainer` — `toast.success(...)`, `toast.error(...)` çağırıldıqda bildirişin göründüyü yer.  
> Yalnız bir dəfə, `App`-ın içinə qoyulur — tüm layihə üçün işləyir.  
> `autoClose={3000}` — 3 saniyə sonra bildiriş avtomatik bağlanır.

---

## Ümumi Arxitektura Diaqramı

```
App.jsx
│
├── usePosts()       → posts, loading, error, fetchPosts, addPost, deletePost, toggleLike
├── useDarkMode()    → dark, toggleDark
├── useDebounce()    → debouncedSearch
├── useModal()       → modalOpen, openModal, closeModal
├── useTitle()       → document.title dəyişir
│
├── <Header onSearch={handleSearch} />
│
├── <Sidebar onCreatePost={openModal} darkMode={dark} onToggleDark={toggleDark}>
│     ├── <ProfileCard />         ← CURRENT_USER məlumatları
│     └── <StatsBar />            ← Posts/Followers/Following
│
├── <Feed posts={posts} ... onCreatePost={openModal}>
│     ├── <CreatePostBox onClick={openModal} />
│     └── {posts.map(post => <PostCard ... />)}
│           ├── <PostCardHeader />
│           ├── <PostCardActions />
│           └── <PostDeleteConfirm />
│
├── <RightPanel>
│     ├── <OnlineFriends />        ← useUsers() hook-u ilə
│     ├── <LatestPhotos />         ← statik şəkillər
│     └── <LatestConversations />
│
└── <CreatePostModal open={modalOpen} onClose={closeModal} addPost={addPost}>
      └── usePostForm() → form, errors, loading, handleSubmit
```

---

## Əsas Prinsiplər (Xülasə)

| Prinsip | Nə deməkdir | Harada görünür |
|---|---|---|
| **Single Source of Truth** | Hər məlumat bir yerdə saxlanılır | `CURRENT_USER`, `initialState` |
| **Separation of Concerns** | Hər modul öz işini görür | `services/`, `hooks/`, `components/` |
| **DRY** (Don't Repeat Yourself) | Eyni kodu iki dəfə yazmırıq | `useModal`, `COLORS` sabitləri |
| **Composition** | Kiçik komponentlər birləşir | `PostCard` → `Header + Actions + Confirm` |
| **Immutability** | State-i birbaşa dəyişmirik | `{ ...state, loading: true }` |
| **Defensive Programming** | Gözlənilməz hallar üçün müdafiə | `isNaN()`, `?.`, `?? []` |


The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
