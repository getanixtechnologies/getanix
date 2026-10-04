import wordmark from '../assets/getanix-wordmark.png'
import wordmarkLight from '../assets/getanix-wordmark-light.png'

// Transparent wordmark cut from the original logo; `light` swaps the black "technologies" to white for dark grounds.
export default function Logo({ light = false, className = '' }) {
  return (
    <img
      className={`logo ${className}`}
      src={light ? wordmarkLight : wordmark}
      alt="Getanix Technologies"
      width="640"
      height="284"
    />
  )
}
