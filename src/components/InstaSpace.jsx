const InstaSpace = () => {
  return (
    <div className='my-8 py-1 text-center'>
      <h1 className='font-bold text-3xl mb-2'>GiftUnwrap On Instagram</h1>
      <p className='font-normal text-md'>#Anvougetheme</p>
      <div className='flex border bg-[#E9E9E9] my-8 justify-center'>
        <div className='w-[25%] h-[350px] bg-[#A0A0A0]'>

        </div>
        <div className='w-[25%] h-[350px] bg-[#DCDCDC] flex justify-center items-center'>
          {/* <div className='bg-white p-4 rounded-xl'>
                    <InstagramIcon />
                </div> */}
          <script src="https://snapwidget.com/js/snapwidget.js"></script>
          <iframe src="https://snapwidget.com/embed/1093981" class="snapwidget-widget"
            allowtransparency="true"
            frameborder="0"
            scrolling="no"
            style={{ border: 'none', overflow: 'hidden', width: '100%' }}
            title="Posts from Instagram">
          </iframe>
        </div>
        <div className='w-[25%] h-[350px] bg-[#A0A0A0]'>

        </div>
      </div>
    </div>
  )
}

export default InstaSpace