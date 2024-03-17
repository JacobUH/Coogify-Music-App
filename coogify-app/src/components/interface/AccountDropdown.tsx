import ProfileIcon from '../../../public/images/Profile Icon.svg';

export const AccountDropdown = () => {
  return (
    <div>
      <div className="">
        <img src={ProfileIcon} alt="Profile Icon" className=""></img>
      
        <div className="pt-32 pr-32">
          <div className="bg-gray-700 text-white rounded-lg text-right">
            {/* Work Here */}
            <a href='#' className="block m-2 px-3 py-3 hover:bg-gray-600">Profile</a>
            <a href='#' className="block m-2 px-3 py-3 hover:bg-gray-600">Subscription</a>
            <a href='#' className="block m-2 px-3 py-3 hover:bg-gray-600 border-b-2">Payment</a>
            <a href='#' className="block m-2 px-3 py-3 hover:bg-gray-600">Logout</a>
          </div>
        </div>

      </div>
    </div>
  );
};
