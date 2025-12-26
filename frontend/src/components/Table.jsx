const Table = ({ columns, data }) => (
  <table className="min-w-full table-auto border-collapse border border-gray-200">
    <thead>
      <tr className="bg-gray-100">
        {columns.map(col => <th key={col} className="px-4 py-2 border">{col}</th>)}
      </tr>
    </thead>
    <tbody>
      {data.map((row, i) => (
        <tr key={i} className="text-center border">
          {columns.map(col => <td key={col} className="px-4 py-2 border">{row[col]}</td>)}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
