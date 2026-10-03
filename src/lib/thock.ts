// Recorded switch sounds (CC0, Benjamin Burnes, see public/sounds/SOURCES.txt).
// Decoded once on first use; each press picks a random sample with a small pitch
// shift so fast typing never sounds like one clip on repeat.
const SAMPLES = ['/sounds/key1.mp3', '/sounds/key2.mp3', '/sounds/key3.mp3', '/sounds/key4.mp3']

let ctx: AudioContext | null = null
let buffers: AudioBuffer[] = []
let loading: Promise<void> | null = null

function context(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctor) return null
  if (!ctx) ctx = new Ctor()
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

/** Fetch and decode the samples. Safe to call repeatedly. */
export function loadThock(): Promise<void> {
  const ac = context()
  if (!ac) return Promise.resolve()
  loading ??= Promise.all(
    SAMPLES.map(async (url) => {
      const res = await fetch(url)
      return ac.decodeAudioData(await res.arrayBuffer())
    }),
  )
    .then((b) => {
      buffers = b
    })
    .catch(() => {
      loading = null
    })
  return loading
}

/** Play one keystroke. Wide keys (space, enter, backspace) sit lower. */
export function thock(wide = false) {
  const ac = context()
  if (!ac) return
  if (buffers.length === 0) {
    void loadThock()
    return
  }
  const src = ac.createBufferSource()
  src.buffer = buffers[Math.floor(Math.random() * buffers.length)]
  src.playbackRate.value = (wide ? 0.82 : 1) * (0.95 + Math.random() * 0.1)
  const gain = ac.createGain()
  gain.gain.value = wide ? 0.9 : 0.7
  src.connect(gain).connect(ac.destination)
  src.start()
}

// Page-wide switch: once the visitor turns sound on in the hero, every keycap on the page clicks.
let enabled = false
export function setSoundOn(on: boolean) {
  enabled = on
  if (on) void loadThock()
}
export function thockIfOn(wide = false) {
  if (enabled) thock(wide)
}
