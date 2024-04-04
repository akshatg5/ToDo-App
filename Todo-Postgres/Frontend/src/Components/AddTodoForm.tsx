export const AddTodoForm = () => {
  return (
    <div>
      <div>
        <label>Title: </label>
        <input placeholder="Todo Title"></input>
      </div>
      <div>
        <label>Description: </label>
        <input placeholder="Todo Description"></input>
      </div>
      <div>
        <label>Due Date: </label>
        <input placeholder="Todo Due Date"></input>
      </div>
      <div>
        <label>Priority: </label>
        <input placeholder="Priority"></input>
      </div>
    </div> // 3 options = Low,medium,high
  );
};
