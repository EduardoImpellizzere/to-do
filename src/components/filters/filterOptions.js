import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const FilterOptions = ({
  onFilter,
  filterImportant,
  activeFilter,
  wrapperSetActiveFilter,
}) => {
  const options = {
    all: { text: "All", value: "all" },
    pending: { text: "Pending", value: "pending" },
    completed: { text: "Completed", value: "completed" },
  };

  const handleFilters = (event, newFilter) => {
    wrapperSetActiveFilter(newFilter);
    onFilter(filterImportant);
  };

  return (
    <ToggleButtonGroup
      value={activeFilter}
      color="primary"
      exclusive
      onChange={handleFilters}
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
