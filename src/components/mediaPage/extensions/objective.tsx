export interface ObjectiveProps {
    objectiveList: string[];
}

const Objective: React.FC<ObjectiveProps> = ({ objectiveList }) => {
    return (
      <ul>
        {objectiveList.map((objective, index) => (
          <li key={index}>{objective}</li>
        ))}
      </ul>
    );
  }

export default Objective;