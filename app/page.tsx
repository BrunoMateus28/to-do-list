
export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen" style={{ backgroundColor: '#8A9FB8' }}>
      <div className="bg-#9F6D6A rounded-lg shadow-lg p-6" style={{ backgroundColor: '#9F6D6A' }}>
        <div className="bg-#B0B78A rounded-lg p-4 mb-4" style={{ backgroundColor: '#B0B78A' }}>
          <h1 className="text-2xl font-semibold text-center text-black">To Do List</h1>
        </div>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Adicionar novo afazer"
            className="p-2 border rounded-l-md"
            style={{ backgroundColor: '#B88D8A'}}
          />
          <button className="px-4 py-2 bg-#B6B88A text-black rounded-r-md "style={{ backgroundColor: '#B0B78A' }}>
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
