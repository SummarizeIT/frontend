interface objectiveProps {
    objectiveList: string[];
}

const Objective: React.FC<objectiveProps> = ({ objectiveList }) => {
    return (
      <ul>
        {objectiveList.map((objective, index) => (
          <li key={index}>{objective}</li>
        ))}
      </ul>
    );
  }

export default Objective;