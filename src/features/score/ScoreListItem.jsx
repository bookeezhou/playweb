export default function ScoreListItem() {
  return (
    <div className="overflow-x-auto">
      <table className="table table-lg">
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Subject</th>
            <th>Semester</th>
            <th>Score</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Littel, Schaden and Vandervort</td>
            <td>Canada</td>
            <td>98.5</td>
            <td>
              <button className="btn btn-ghost btn-sm">details</button>
              <button className="btn btn-error btn-sm">delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
