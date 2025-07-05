const InstaSpace = () => {
  return (
    <div className='my-4 sm:my-6 lg:my-8 py-1 text-center px-4 sm:px-6 lg:px-0'>
      <h1 className='font-bold text-xl sm:text-2xl lg:text-3xl mb-2'>GiftUnwrap On Instagram</h1>
      <p className='font-normal text-sm sm:text-md'>#Anvougetheme</p>
      <div className='flex bg-[#E9E9E9] my-4 sm:my-6 lg:my-8 justify-center px-2 sm:px-4 lg:px-0'>

        {/* Center - Instagram Widget */}
        <div className='w-full sm:w-[80%] lg:w-[50%] h-[250px] sm:h-[300px] lg:h-[350px] bg-[#DCDCDC] flex justify-center items-center'>
          {/* LightWidget Instagram Embed */}
          <iframe
            src="//lightwidget.com/widgets/fb6cdf5a8aed578ea0f77754c441adba.html"
            scrolling="no"
            allowtransparency="true"
            className="lightwidget-widget"
            style={{
              width: '100%',
              height: '100%',
              border: 0,
              overflow: 'hidden'
            }}
            title="Instagram Feed"
          ></iframe>
        </div>

      </div>
    </div>
  );
};

export default InstaSpace;
