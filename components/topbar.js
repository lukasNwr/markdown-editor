const TopBar = () => {
  return (
    <>
      <div className="flex bg-slate-400 h-16">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="w-20 h-auto p-5 bg-slate-500 "
        >
          <path
            fill="#ffffff"
            d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
          />
        </svg>
        <div className="flex items-center w-full px-4  gap-4">
          <span className="uppercase text-white text-bold">Markdown</span>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              className="h-5 m-3 mx-4"
            >
              <path
                fill="#ffffff"
                d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48z"
              />
            </svg>
            <div className="flex flex-col">
              <span className="text-gray-300 text-sm">Document Name</span>
              <span className="text-sm text-white">New_Document.md</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
