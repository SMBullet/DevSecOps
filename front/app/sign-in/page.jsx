function page() {


  return (
    
      <div className='bg-[#1A1A1B] h-screen flex justify-center items-center overflow-hidden relative'>
        <div className='absolute w-[120px] h-[120px] blur-3xl rounded-full bg-[#555555] -top-0 -right-0 lg:w-[450px] lg:h-[450px] lg:-top-40 lg:-right-32'></div>
        <div className='absolute w-[120px] h-[120px] blur-3xl rounded-full bg-[#555555] -bottom-0 -left-0 lg:w-[450px] lg:h-[450px] lg:-bottom-40 lg:-left-32'></div>
        <div className='flex flex-col text-center gap-2 text-white mx-auto'>
          <h1 className='text-3xl md:text-4xl'>Yoo, welcome back!</h1>
          <p className='text-xs'><span className='text-[#8F8F91]'>First time here?</span> Sign up for free</p>
          <form action="#" className='flex flex-col gap-3 my-5 mx-6 lg:mx-0'>
            <input type="text" name="" placeholder='Your email' className='rounded-xl  p-2 pl-5 bg-[#1C1C1E] border border-[#2C2B2E] placeholder:text-[#8F8F91]'/>
            <input type="password" name=""  placeholder='**********' className='rounded-xl p-2 pl-5  bg-[#1C1C1E] border border-[#2C2B2E] placeholder:text-[#8F8F91]'/>
            <button className='rounded-xl bg-white text-black p-2'>Sign in</button>
          </form>
          <p className='text-xs mb-10'>Sign in using magic link</p>
          <div className='flex justify-between items-center'>
            <div className='h-0.5 w-36 bg-[#2C2B2E]'></div>
            <p className='text-[#8F8F91] mx-4 text-xs'>or</p>
            <div className='h-0.5 w-36 bg-[#2C2B2E]'></div>
          </div>
          <button className='rounded-xl bg-[#1C1C1E] border border-[#2C2B2E] text-white p-2 mt-2'>Single sign-on (SSO)</button>
          
          <p className='text-xs text-[#87878A] max-w-xs text-center mx-auto  px-5 lg:mt-10'>You acknowledge that you read, and agree, to our <span className='underline'>Terms of Service</span> and our <span className='underline'>Privacy Policy</span>.</p>
        </div>
      </div>
        
      
    
  )
}

export default page
