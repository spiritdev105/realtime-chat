import { ChevronDownIcon } from '@heroicons/react/outline'

export default function Accordion({ name, setOpen, open }) {
    return (
        <div className="flex items-center gap-2 cursor-pointer mb-1" onClick={() => setOpen(state => !state)}>
            <ChevronDownIcon className={`w-6 h-6 stroke-gray-500 transition-all ${open ? 'rotate-0' : '-rotate-90'}`} />
            <p className="text-xl text-gray-500 uppercase">{name}</p>
        </div>
    )
}
