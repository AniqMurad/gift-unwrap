const InstaSpace = () => {
  return (
    <div className='my-8 py-1 text-center'>
      <h1 className='font-bold text-3xl mb-2'>GiftUnwrap On Instagram</h1>
      <p className='font-normal text-md'>#Anvougetheme</p>
      <div className='flex bg-[#E9E9E9] my-8 justify-center'>

        {/* Center - Instagram Widget */}
        <div className='w-[50%] h-[350px] bg-[#DCDCDC] flex justify-center items-center'>
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
