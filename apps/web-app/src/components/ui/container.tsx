import { Slot } from '@radix-ui/react-slot'
import { tv, type VariantProps } from '_/lib/third-party/tv'
import type React from 'react'

const containerClasses = tv({
	base: ['content-grid', 'space-y-8', 'px-4 py-4 xl:px-24 xl:py-24', 'xl:space-y-12', 'grid-flow-row auto-rows-max'],
})

type ContainerProps = React.ComponentPropsWithRef<'div'> & {
	asChild: boolean
}

const Container = ({ asChild, className, ...props }: ContainerProps & VariantProps<typeof containerClasses>) => {
	const Comp = asChild ? Slot : 'section'
	return <Comp {...props} className={containerClasses({ class: className })} />
}

export { Container, type ContainerProps }
