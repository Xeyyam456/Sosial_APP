import { memo } from 'react'
import styles from './RightPanel.module.css'

const LATEST_PHOTOS = [
  'https://picsum.photos/seed/flower1/120/120',
  'https://picsum.photos/seed/burger1/120/120',
  'https://picsum.photos/seed/camera1/120/120',
  'https://picsum.photos/seed/honey1/120/120',
]

const LatestPhotos = memo(() => (
  <section className={styles.section}>
    <h3 className={styles.sectionTitle}>Latest Photos</h3>
    <div className={styles.photoGrid}>
      {LATEST_PHOTOS.map((src, i) => (
        <img key={i} src={src} alt={`photo ${i + 1}`} className={styles.photo} />
      ))}
    </div>
  </section>
))

LatestPhotos.displayName = 'LatestPhotos'

export default LatestPhotos
