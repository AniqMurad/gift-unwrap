

const Category = ({image}) => {
    return (
        <div className="relative rounded-lg overflow-hidden shadow-lg">
            <img src={image} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex flex-col justify-center px-6 ">
                <h2 className="text-lg font-semibold text-black">Special Baby Moments</h2>
                <button className="text-sm text-start font-semibold text-black underline">
                    Shop Gifts Now
                </button>
            </div>
        </div>
    )
}

export default Category