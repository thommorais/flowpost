'use client'
import { useIdleQueue } from '_/components/hooks/use-idle-queue'
import { createContext } from 'react'

const IdleQueueContext = createContext<ReturnType<typeof useIdleQueue> | null>(null)

export const IdleQueueProvider = ({ children }: { children: React.ReactNode }) => {
	const queue = useIdleQueue({
		ensureTasksRun: true,
		onError: error => {
			console.error('Global queue error:', error)
		},
	})

	return <IdleQueueContext.Provider value={queue}>{children}</IdleQueueContext.Provider>
}
