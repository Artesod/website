import { useState } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { builds, channelUrl, type Build } from '../../data/builds'
import { thockIfOn } from '../../lib/thock'
import { KeyTray, Reveal, Title, dropKey } from '../ui/motion'

export function Builds() {
  const featured = builds.filter((b) => b.featured)
  const [lead, ...rest] = featured
  const bench = builds.filter((b) => !b.featured)

  return (
    <section id="builds" className="bg-panel text-blush">
      <div className="mx-auto max-w-page px-4 py-24 sm:px-8 sm:py-32">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Title className="text-[clamp(2.75rem,7vw,5.5rem)]">Builds</Title>
            <Reveal as="p" className="mt-5 max-w-[56ch] text-lg leading-relaxed text-muted" delay={0.1}>
              The keyboard on this page isn't a costume. {builds.length} boards built by hand and recorded so you can hear
              them. Specs and mods are straight from each video.
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <a href={channelUrl} target="_blank" rel="noopener noreferrer" className="cap cap-rose legend">
              <span className="inline-flex items-center gap-2 px-1">
                <Icon icon="mdi:youtube" className="h-5 w-5" aria-hidden />
                Full channel
                <Icon icon="mdi:arrow-top-right" className="h-4 w-4" aria-hidden />
              </span>
            </a>
          </Reveal>
        </header>

        {lead && (
          <Reveal className="mt-16 grid gap-8 rounded-[28px] border border-line bg-ground p-5 sm:mt-20 sm:p-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12 lg:p-10">
            <SoundTest build={lead} hq />
            <div className="flex flex-col">
              <h3 className="display text-[clamp(2rem,3.6vw,3rem)]">{lead.name}</h3>
              <p className="mt-3 text-muted">
                The board this site's colorway comes from. <span className="text-rose">Olivia Dark, {lead.year}.</span>
              </p>
              <Specs build={lead} />
              <Mods build={lead} />
            </div>
          </Reveal>
        )}

        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {rest.map((b, i) => (
            <Reveal key={b.videoId} delay={i * 0.08} className="flex flex-col rounded-[22px] border border-line bg-ground p-4 sm:p-5">
              <SoundTest build={b} />
              <h3 className="display mt-5 text-2xl">{b.name}</h3>
              <Specs build={b} compact />
              <Mods build={b} />
            </Reveal>
          ))}
        </div>

        {bench.length > 0 && (
          <Reveal className="mt-16">
            <h3 className="text-xl font-bold">More from the bench</h3>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {bench.map((b) => (
                <li key={b.videoId}>
                  <a
                    href={`https://www.youtube.com/watch?v=${b.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-4 sm:grid-cols-[14rem_1fr_auto]"
                  >
                    <span className="font-bold group-hover:text-rose">{b.name}</span>
                    <span className="col-span-2 text-muted sm:col-span-1">
                      {b.switches} · {b.mods.join(', ')}
                    </span>
                    <span className="legend row-start-1 inline-flex items-center gap-1 text-sm tabular-nums text-muted group-hover:text-rose sm:row-start-auto">
                      {b.year}
                      <Icon icon="mdi:play-circle-outline" className="h-4 w-4" aria-hidden />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  )
}

/** Thumbnail first; the YouTube player only loads when someone presses play. */
function SoundTest({ build: b, hq = false }: { build: Build; hq?: boolean }) {
  const [playing, setPlaying] = useState(false)
  const title = `${b.name} sound test`
  return (
    <div className="relative aspect-video overflow-hidden rounded-xl bg-well shadow-[0_24px_50px_-16px_rgb(0_0_0/0.9)]">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${b.videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            thockIfOn(true)
            setPlaying(true)
          }}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Play ${title}`}
        >
          <img
            src={`https://i.ytimg.com/vi/${b.videoId}/${hq ? 'maxresdefault' : 'hqdefault'}.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden />
          <span className="cap cap-rose legend absolute bottom-4 left-4 text-sm group-hover:[--travel:1px] group-active:[--travel:3px]">
            <span className="inline-flex items-center gap-1.5 px-1">
              <Icon icon="mdi:play" className="h-5 w-5" aria-hidden />
              Hear it
            </span>
          </span>
        </button>
      )}
    </div>
  )
}

function Specs({ build: b, compact = false }: { build: Build; compact?: boolean }) {
  const rows: [string, string | undefined][] = [
    ['Switches', b.switches],
    ['Plate', b.plate],
    ['Stabs', b.stabs],
    ['Keycaps', b.keycaps],
    ...(compact ? [] : ([['Case', b.case]] as [string, string][])),
  ]
  return (
    <dl className={`grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-2 ${compact ? 'mt-4 text-sm' : 'mt-6'}`}>
      {rows
        .filter(([, v]) => v)
        .map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-muted">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
    </dl>
  )
}

function Mods({ build: b }: { build: Build }) {
  return (
    <div className="mt-auto pt-6">
      <p className="text-sm text-muted">Mods</p>
      <KeyTray className="mt-2 flex flex-wrap gap-2">
        {b.mods.map((m) => (
          <motion.span key={m} variants={dropKey} className="cap cap-alpha legend text-xs sm:text-sm">
            <span>{m}</span>
          </motion.span>
        ))}
      </KeyTray>
    </div>
  )
}
