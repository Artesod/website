import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useTypewriter } from '../../hooks/useTypewriter'

describe('useTypewriter', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('starts with an empty string', () => {
    const { result } = renderHook(() =>
      useTypewriter({ words: ['Hello'], typeSpeed: 50, deleteSpeed: 30, pauseMs: 100 })
    )
    expect(result.current).toBe('')
  })

  it('types out the first word character by character', () => {
    const { result } = renderHook(() =>
      useTypewriter({ words: ['Hi'], typeSpeed: 50, deleteSpeed: 30, pauseMs: 500 })
    )
    act(() => { vi.advanceTimersByTime(50) })
    expect(result.current).toBe('H')
    act(() => { vi.advanceTimersByTime(50) })
    expect(result.current).toBe('Hi')
  })

  it('deletes after pause and moves to next word', () => {
    const { result } = renderHook(() =>
      useTypewriter({ words: ['AB', 'CD'], typeSpeed: 10, deleteSpeed: 10, pauseMs: 50 })
    )
    act(() => { vi.advanceTimersByTime(10) })
    act(() => { vi.advanceTimersByTime(10) })
    expect(result.current).toBe('AB')
    act(() => { vi.advanceTimersByTime(50) })
    act(() => { vi.advanceTimersByTime(10) })
    expect(result.current).toBe('A')
    act(() => { vi.advanceTimersByTime(10) })
    expect(result.current).toBe('')
  })
})
