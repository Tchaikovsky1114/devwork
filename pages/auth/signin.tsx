import { ClientSafeProvider, getProviders, LiteralUnion, signIn, SignInOptions } from 'next-auth/react';
import Header from '../../components/Header';
import Image from 'next/image';
import DevworkLogo from '../../public/devwork-logo.png';
import { BuiltInProviderType } from 'next-auth/providers';
const signin = ({ providers }: { providers: ClientSafeProvider }) => {
  console.log(providers);


  const signInHandler = (id:BuiltInProviderType | undefined,callbackUrl:SignInOptions | undefined) => {
   signIn(id,callbackUrl);
  }

  return (
    <>
      <Header />
      <div className="flex justify-center w-4/5 mx-auto items-center mt-20">
        <div className="mt-8 mr-8">
        <img
          className="hidden object-cover rotate-[9deg] md:inline-flex md:w-48"
          src="https://www.pngkey.com/png/full/338-3387462_image-instagram-feed-mockup.png"
          alt="devwork-auth-image"
        />
        </div>
        <div className="flex flex-col gap-10">
          <p className="text-sm italic my-10 text-center">
            Devwork for developer{"' "}s feedback{' '}
          </p>

          <div className="w-48 object-cover flex justify-center items-center">
            <Image src={DevworkLogo} alt="auth-image" />
          </div>
          <div className='flex flex-col items-center gap-[1px]'>
          {Object.values(providers).map((provider) => (
            <div className="" key={provider.name}>
              <div className="flex items-center space-x-2 p-2 border hover:bg-rose-400 hover:text-white duration-200 ease-out">
                <img
                  src={`${provider.name === 'Google' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png' :'https://cdn-icons-png.flaticon.com/512/25/25231.png'}`}
                  alt="google logo"
                  className='w-6'
                />
              <button onClick={() => signInHandler(provider.id,{callbackUrl:'/'})} className="text-sm font-semibold rounded-md px-6 ">Sign in with {provider.name}</button>
            </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: { providers },
  };
}

export default signin;
