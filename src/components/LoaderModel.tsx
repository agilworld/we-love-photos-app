export default function LoaderModel({
  text = "Loading background removal model",
}: {
  text: string;
}) {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-gray-800 mb-4"></div>
        <p className="text-lg">{text}</p>
      </div>
    </div>
  );
}
