import React from 'react'
import { imageManifest } from '../image-manifest'

export default function ResponsiveImage({
  src,
  alt = '',
  className = '',
  loading = 'lazy',
  sizes = '100vw',
  priority = false,
  objectFit = 'cover',
}) {
  const meta = imageManifest[src]
  const srcSet = meta?.srcSet?.length
    ? meta.srcSet.map(item => `${item.src} ${item.width}w`).join(', ')
    : undefined

  return (
    <img
      className={className}
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      width={meta?.width}
      height={meta?.height}
      loading={priority ? 'eager' : loading}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      style={{ objectFit }}
    />
  )
}
