// App imports
import { Charts } from './charts';
import { Loading } from './loading';
import './styles.scss';

// Context imports
import { useRoads } from 'context/llm/roads';

export const RoadsChart = () => {
  const { roadData } = useRoads();

  // Don't render if no road data is available
  if (!roadData || !roadData.features || roadData.features.length === 0) {
    return (
      <Loading/>
    );
  }

  return (
    <div>
      <div className="roads-title">Road Classification Distribution</div>
      <Charts data={roadData} name="class" colorLabel="road-color"/>
    </div>
  );
};

RoadsChart.displayName = "RoadsChart";