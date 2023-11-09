export default function CustomButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-primary border-2 border-secondary px-5 py-1 rounded-md text-sm hover:bg-secondary hover:text-primary w-fit cursor-pointer shadow-md shadow-secondary hover:shadow-none  self-center"
    >
      {text}
    </button>
  );
}
