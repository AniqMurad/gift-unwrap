import React from 'react'
import ramadanimage from '../assets/ramadan.png'
import eidimage from '../assets/eid.png'
import birthdayimage from '../assets/birthday.png'
import anniversaryimage from '../assets/anniversary.png'
import flowersimage from '../assets/flowers.png'

const Trending = () => {
    return (
        <div className='bg-[#FCFCFC]'>
            <div className='m-4 p-4 px-16'>
                <div className='text-4xl flex justify-center'>Trending Right Now</div>
                <div className='flex m-5 justify-between'>
                    <div className=''>
                        <div className='rounded-[100px] overflow-hidden'>
                            <img src={ramadanimage} />
                        </div>
                        <div className='flex justify-center m-2 font-bold'>
                            <p>Ramadan <span className='text-[#A0A0A0] text-xs'>(12)</span></p>
                        </div>
                    </div>

                    <div>
                        <div className='rounded-[100px] overflow-hidden'>
                            <img src={eidimage} />
                        </div>
                        <div className='flex justify-center m-2 font-bold'>
                        <p>Eid-ul-Fitr <span className='text-[#A0A0A0] text-xs'>(12)</span></p>
                        </div>
                    </div>

                    <div>
                        <div className='rounded-[100px] overflow-hidden'>
                            <img src={birthdayimage} />
                        </div>
                        <div className='flex justify-center m-2 font-bold'>
                        <p>Birthday <span className='text-[#A0A0A0] text-xs'>(12)</span></p>
                        </div>
                    </div>

                    <div>
                        <div className='rounded-[100px] overflow-hidden'>
                            <img src={anniversaryimage} />
                        </div>
                        <div className='flex justify-center m-2 font-bold'>
                        <p>Anniversary <span className='text-[#A0A0A0] text-xs'>(12)</span></p>
                        </div>
                    </div>

                    <div>
                        <div className='rounded-[100px] overflow-hidden'>
                            <img src={flowersimage} />
                        </div>
                        <div className='flex justify-center m-2 font-bold'>
                        <p>Flowers & Bouquets <span className='text-[#A0A0A0] text-xs'>(12)</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Trending