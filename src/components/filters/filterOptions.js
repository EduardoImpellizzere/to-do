import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const FilterOptions = ({ onUpdateActiveFilter, activeFilter }) => {
  const options = {
    all: { text: "All", value: "all" },
    pending: { text: "Pending", value: "pending" },
    completed: { text: "Completed", value: "completed" },
  };

  const handleFilterChange = (event, newFilter) => {
    onUpdateActiveFilter(newFilter);
  };

  return (
    <ToggleButtonGroup
      onChange={handleFilterChange}
      value={activeFilter}
      exclusive
      color="primary"
      aria-label="tasks filters"
    >
      <ToggleButton value={options.all.value} aria-label="all tasks">
        {options.all.text}
      </ToggleButton>
      <ToggleButton value={options.pending.value} aria-label="pending tasks">
        {options.pending.text}
      </ToggleButton>
      <ToggleButton
        value={options.completed.value}
        aria-label="completed tasks"
      >
        {options.completed.text}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default FilterOptions;
