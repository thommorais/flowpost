import { useId, useState } from 'react'
import './App.css'
import { AnimatedCount } from './CountUp'

function App() {
  const [count, setCount] = useState(0)

  const onSubmit = (formData: FormData) => {
    const query = formData.get('number')
    setCount(Number(query))
  }

  const inputId = useId()

  return (
    <div className='min-h-screen bg-black text-white'>
      {/* Main Content */}
      <main className='mx-auto w-dvw max-w-7xl px-6 pt-32'>
        {/* Counter Display Card */}
        <div className='mx-auto mb-8 max-w-3xl'>
          <div className='rounded-2xl border border-white/10 from-white/5 to-white/0 p-12 backdrop-blur-sm'>
            <div className='mb-8 text-center'>
              <AnimatedCount
                number={count}
                duration={200}
                className='text-2xl font-bold tabular-nums tracking-tight flex gap-10 justify-between'
              />
            </div>

            {/* Input Control */}
            <form className='mx-auto max-w-md' action={onSubmit}>
              <input
                id={inputId}
                name='number'
                type='text'
                className='block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-lg text-white transition-colors placeholder:text-gray-600 hover:bg-white/[0.07] focus:border-white/20 focus:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-white/10'
                placeholder='0'
              />
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
