import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const Dashboard = () => {
  const { boards } = useSelector((state) => state.board);
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Aggregate all tasks from all lists in the active board
  const allTasks = boards.length > 0
    ? boards.flatMap(board => board.list.flatMap(list => ({...list, boardName: board.name})).flatMap(list => list.items.map(item => ({...item, listTitle: list.title, boardName: board.name}))))
    : [];

  // Metrics
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter(t => t.completed).length;
  const incompleteTasks = totalTasks - completedTasks;

  // Tasks per user
  const tasksPerUser = users.map(user => ({
    name: user.username,
    value: allTasks.filter(t => t.assignee === user.id).length,
  })).filter(u => u.value > 0);

  // Tasks per status (list)
  const statusCounts = boards.length > 0
    ? boards[0].list.map(list => ({
        name: list.title,
        value: list.items.length,
      }))
    : [];

  // Pie data for completed/incomplete
  const completionPie = [
    { name: 'Completed', value: completedTasks },
    { name: 'Incomplete', value: incompleteTasks },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard Metrics</h2>
      <div className="mb-4 flex flex-wrap gap-8">
        <div className="bg-zinc-800 text-white rounded p-4 min-w-[180px]">
          <div className="text-lg font-semibold">Total Tasks</div>
          <div className="text-2xl">{totalTasks}</div>
        </div>
        <div className="bg-zinc-800 text-white rounded p-4 min-w-[180px]">
          <div className="text-lg font-semibold">Completed</div>
          <div className="text-2xl">{completedTasks}</div>
        </div>
        <div className="bg-zinc-800 text-white rounded p-4 min-w-[180px]">
          <div className="text-lg font-semibold">Incomplete</div>
          <div className="text-2xl">{incompleteTasks}</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-8">
        <div className="bg-white rounded p-4 shadow min-w-[320px]">
          <h3 className="font-semibold mb-2">Completion Ratio</h3>
          <ResponsiveContainer width={300} height={200}>
            <PieChart>
              <Pie data={completionPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                {completionPie.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded p-4 shadow min-w-[320px]">
          <h3 className="font-semibold mb-2">Tasks per User</h3>
          <ResponsiveContainer width={300} height={200}>
            <BarChart data={tasksPerUser}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded p-4 shadow min-w-[320px]">
          <h3 className="font-semibold mb-2">Tasks per Status</h3>
          <ResponsiveContainer width={300} height={200}>
            <BarChart data={statusCounts}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
