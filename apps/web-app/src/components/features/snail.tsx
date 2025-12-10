'use client'
import { useViewportSize } from '_/hooks/use-viewport-size'
import { tv } from '_/lib/tv'
import { animate, createScope, type Scope } from 'animejs'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

// Define animation states
type AnimationState = 'idle' | 'run' | 'fast' | 'swipe' | 'ball'
const LEFT = 'left' as const
const RIGHT = 'right' as const
const CENTER = 'center' as const
const DURATION = 3500
type Direction = typeof LEFT | typeof RIGHT | typeof CENTER

type SnailAnimationProps = {
	initialPosition?: number // optional initial position from 0 to 1
	idleChance?: number // probability of idle state (0-1), default higher now
	ballChance?: number // probability of ball state (0-1), default higher now
	centerChance?: number // probability of staying in center (0-1)
	stateChangeDuration?: number // milliseconds between state changes
}

const snailClasses = tv({
	base: ['absolute aspect-square w-24 hover:bg-red-400'],
	variants: {
		direction: {
			left: '-scale-x-100',
			right: 'scale-x-100',
			center: 'scale-x-100',
		},
	},
})

const calculatePercentage = (value: number, percent: number): number => {
	if (typeof value !== 'number' || Number.isNaN(value)) {
		throw new Error('Value must be a valid number')
	}

	if (typeof percent !== 'number' || Number.isNaN(percent)) {
		throw new Error('Percent must be a valid number')
	}
	return (value * percent) / 100
}

export const Snail = ({
	initialPosition = 0.6,
	idleChance = 0.4,
	ballChance = 0.3,
	centerChance = 0.25,
	stateChangeDuration = DURATION + 50,
}: SnailAnimationProps) => {
	const [pose, setPose] = useState<AnimationState>('ball')
	const [direction, setDirection] = useState<Direction>(CENTER)
	const [position, setPosition] = useState<number>(initialPosition)
	const snailRef = useRef<HTMLImageElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const scopeRef = useRef<Scope | null>(null)
	const root = useRef(null)
	const { width } = useViewportSize()

	const snailImages = {
		idle: '/static/snail/brown_idle_8fps.gif',
		run: '/static/snail/brown_walk_8fps.gif',
		fast: '/static/snail/brown_walk_fast_8fps.gif',
		swipe: '/static/snail/brown_swipe_8fps.gif',
		ball: '/static/snail/brown_with_ball_8fps.gif',
	}

	useEffect(() => {
		if (!containerRef.current) {
			return
		}

		const container = containerRef.current
		const centerPosition = width / 2 - 50 // Center position (adjusted for snail width)

		scopeRef.current = createScope({ root }).add(scope => {
			if (!scope) {
				return
			}

			const quarter = calculatePercentage(width, 10)

			scope.add(LEFT, () => {
				animate(container, {
					x: quarter,
					duration: DURATION,
					easing: 'easeInOutQuad',
					onBegin: () => setPose('run'),
					onComplete: () => setPose('idle'),
				})
			})

			scope.add(RIGHT, () => {
				animate(container, {
					x: width - quarter,
					duration: DURATION,
					easing: 'easeInOutQuad',
					onBegin: () => setPose('run'),
					onComplete: () => setPose('ball'),
				})
			})

			scope.add(CENTER, () => {
				animate(container, {
					x: centerPosition,
					duration: DURATION / 2,
					easing: 'easeOutQuad',
					onBegin: () => setPose('run'),
					onComplete: () => setPose('idle'),
				})
			})
		})

		return () => {
			if (scopeRef.current) {
				scopeRef.current.revert()
			}
		}
	}, [width])

	useEffect(() => {
		if (scopeRef?.current?.methods) {
			const method = scopeRef.current.methods[direction]
			if (method) {
				method()
			}
		}
	}, [direction])

	const determineNextState = useCallback(() => {
		const random = Math.random()

		if (random < idleChance) {
			setPose('idle')
			return
		}

		if (position < 0.2 || (position < 0.3 && random < ballChance)) {
			setPose('ball')
			return
		}

		if (random < centerChance) {
			setTimeout(() => {
				setDirection(dir => {
					if (dir === LEFT) {
						return CENTER
					}
					return dir
				})
			}, 220)
			return
		}

		const leftRight = position > 0.6 || random > 0.7

		if (leftRight) {
			setPose('swipe')

			setTimeout(() => {
				setDirection(dir => {
					if (dir === LEFT && random > 0.5) {
						return RIGHT
					}
					return LEFT
				})
			}, 220)
		}
	}, [centerChance, position, ballChance, idleChance])

	useEffect(() => {
		const interval = setInterval(() => {
			setPosition(Math.random())
			determineNextState()
		}, stateChangeDuration)

		return () => clearInterval(interval)
	}, [stateChangeDuration, determineNextState])

	return (
		<div ref={root} className='pointer-events-none absolute bottom-0 left-0 z-10 h-24 w-full select-none'>
			<div ref={containerRef} className='absolute aspect-square w-24' style={{ transform: 'translateX(50%)' }}>
				<Image
					ref={snailRef}
					className={snailClasses({ direction })}
					src={snailImages[pose]}
					alt={`Snail ${pose}`}
					height={100}
					width={100}
					unoptimized={true}
				/>
			</div>
		</div>
	)
}
