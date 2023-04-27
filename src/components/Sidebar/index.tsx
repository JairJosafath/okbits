export default function Sidebar() {
  return (
    <div className="w-40  bg-red-200 ">
      <div>
        <input className="w-11/12 m-1 rounded-xl px-2" placeholder="Search" />
      </div>
      <div>
        {["file1", "file2", "file3"].map((file) => (
          <div className="m-1 rounded-md px-2 hover:bg-red-100 hover:cursor-pointer">
            {file}
          </div>
        ))}
      </div>
    </div>
  );
}
