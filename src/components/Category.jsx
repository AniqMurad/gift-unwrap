import { useNavigate } from 'react-router-dom';

const Category = ({image, navigateTo, heading }) => {

    const navigate = useNavigate(); 

    const handleClick = () => {
        if (navigateTo) {
            navigate(navigateTo); 
        } else {
            console.warn("Category is missing 'navigateTo' prop.");
        }
    };

    return (
        <div className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer" onClick={handleClick}>
            <img src={image} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex flex-col justify-center px-6 ">
                <h2 className="text-lg font-semibold text-black">{heading}</h2>
                <button className="text-sm text-start font-semibold text-black underline cursor-pointer">
                    Shop Gifts Now
                </button>
            </div>
        </div>
    )
}

export default Category