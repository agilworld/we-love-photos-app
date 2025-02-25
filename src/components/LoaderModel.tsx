export default function LoaderModel({
  text = "Loading background removal model",
  subtext = "",
}: {
  text: string;
  subtext?: string;
}) {
  return (
    <div className="min-h-fit	bg-white text-gray-800 flex items-center justify-center">
      <div className="flex flex-col text-center items-center">
        <svg
          className="animate-spin h-8 w-8 text-black"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p className="text-lg">{text}</p>
        {subtext != "" && <p className="text-sm text-slate-800">{subtext}</p>}
      </div>
    </div>
  );
}
