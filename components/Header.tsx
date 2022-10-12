import Link from "next/link";
import Image from 'next/image'
function Header() {
  return (
    <header className="flex justify-between p-5 max-w-7xl mx-auto">



      {/* <---------- Left div ---------->*/}


      {/* items center will center them on y-axis */}


      {/* Tailwind:  object-contain. Resize an element’s content to stay contained within its container. */}


      <div className="flex items-center space-x-5 ">
        <Link href="/">
          <img
            className="w-44 object-contain cursor-pointer"
            src="https://links.papareact.com/yvf"
            alt=""
            width='44'
          />
        </Link>

        {/* Tailwind: Hidden by default i.e on small div items will not be visible, at medium screen div items will get visible and inlined-flexed  */}


        {/* Everything should be made keeping in mind mobile first rule  */}


        {/* we want these three to be hidden by default i.e on mobile screen and on md screen */}

        <div className="hidden md:inline-flex items-center space-x-5 ">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3>Membership</h3>
          <h3 className="text-white bg-green-600 px-4 py-1 rounded-full">
            Follow
          </h3>
        </div>
      </div>


      {/* second div */}
      {/* <---------- right div ------------->*/}
      <div className="flex items-center space-x-5 text-green-600">
        <h3>Sign In</h3>
        <h3 className="border px-4 py-1 rounded-full border-green-600">
          Get started
        </h3>
      </div>
    </header>
  );
}

export default Header;
