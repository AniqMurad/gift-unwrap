import React, { useState } from 'react'
import { TickIcon } from '@/components/icons'

const RememberIcon = () => {
    const [checked, setChecked] = useState(false);

    return (
        <div
            className={`w-[20px] h-[20px] flex items-center justify-center border border-black mr-2 transition-all ${checked ? "bg-black" : "bg-white"}`}
            onClick={() => setChecked(!checked)}
        >
            {checked && <TickIcon />}
        </div>
    )
}

export default RememberIcon