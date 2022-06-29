import defaultOptions from '../data/optionData'
import Quantity from './Quantity'

export default function DefaultOptions() {
    return (
        <div className="py-8">
            {
                defaultOptions.map(({ id, name, Icon }) => {
                    return (
                        <div key={id} className="flex items-center justify-between rounded-xl cursor-pointer py-3 px-4 hover:bg-gray-900">
                            <div className="flex items-center gap-5">
                                {<Icon className="w-7 h-7 stroke-gray-300" />}
                                <p className="text-xl text-gray-300">{name}</p>
                            </div>
                            {id === '1' && (
                                <Quantity total="600" />
                            )}
                        </div>
                    )
                })
            }
        </div>
    )
}
