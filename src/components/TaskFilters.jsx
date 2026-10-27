export default function TaskFilters({
  searchQuery,
  setSearchQuery,
  priorityFilter,
  setPriorityFilter,
  onResetBoard
}) {
  return (
    <div className ="filters-bar">
      <div className ="filter-group">
        <input
          type ="text"
          className ="input-search"
          placeholder ="Search tasks by title..."
          value ={searchQuery}
          onChange ={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className ="select-priority"
          value ={priorityFilter}
          onChange ={(e) => setPriorityFilter(e.target.value)}
        >
          <option value ="All">All Priorities</option>
          <option value ="High">High Only</option>
          <option value ="Medium">Medium Only</option>
          <option value ="Low">Low Only</option>
        </select>
        {(searchQuery || priorityFilter !== "All") && (
          <button
            type ="button"
            className ="btn-secondary"
            onClick ={() => {
              setSearchQuery("");
              setPriorityFilter("All");
            }}
          >
            Clear Filters
          </button>
        )}
      </div>
      <button
        type ="button"
        className ="btn-secondary"
        onClick ={onResetBoard}
        title ="Restore default demo tasks"
      >
        Reset Demo Data
      </button>
    </div>
  );
}
